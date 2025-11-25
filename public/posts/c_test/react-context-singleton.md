---
title: 'React使用Context创建对象单例'
author: 'LengineerC'
time: '2025-01-02 12:07:58'
lock: false
password: ''
top: false
tags: 
  - 前端
  - React
---

## 前言
单例模式在许多工程中被大幅使用，其提供了一个全局访问点来操作一个实例，从而节省资源。在`React`中有许多知名第三方库也采用了这种设计模式，比如`Redux`。最近就碰到一个需求，要求实现的就是整个`React`项目中只能创建一个`WebSocket`实例，并且还要给不同组件调用。翻了翻`React`官方文档，发现使用`useContext`可以很好的满足该需求，于是记录下单例的一个固定写法。
## 构建单例
创建类
```javascript
export default class Singleton{
	#value;
	
	constructor(){
		this.#value=0;
	}
	
	get value(){
		return this.#value;
	}
	
	set value(val){
		this.#value=val;
	}
}
```
使用`createContext`创建上下文，参数则为上下文初始化时的默认值
```js
export const SingletonContext=createContext(null);
```
简单封装`useContext`钩子，便于函数式组件调用
```JSX
export function useSingleton(){
	return useContext(SingletonContext);
}
```
简单封装`SingletonContext`的`Provider`用于提供上下文的值，同时创建实例对象
```JSX
export function SingletonProvider({children}){
	const singleton=new Singleton();
	
	return(
		<SingletonContext.Provider value={singleton}>
			{children}
		</SingletonContext.Provider>
	);
}
```
这样就创建了一个单例对象了
### 测试准备
因为函数式组件和类式组件调用方式不同，因此分别创建创建两个测试组件

函数式组件
```JSX
import React from 'react';

export default function FunctionComponent() {
	return (
		<div>
			FunctionComponent
		</div>
	);
}
```
类式组件
```JSX
import React, { Component } from 'react';

export default class ClassComponent extends Component {
	render() {
		return (
			<div>ClassComponent</div>
		);
	}
}
```
使用刚刚创建的`SingletonProvider`包裹需要读取上下文的所有组件即可
```JSX
import ClassComponent from './components/ClassComponent';
import FunctionComponent from './components/FunctionComponent';

import "./App.css";

function App() {
	return (
		<div className='app'>
			<SingletonProvider>
				<FunctionComponent />
				<ClassComponent />
			</SingletonProvider>
		</div>	
	);
}

export default App;
```
## 使用单例
### 函数式组件
函数式组件使用刚刚创建的`useSingleton`钩子即可，该函数的返回值便是之前创建的实例对象，并且添加按钮用于改变`singleton.value`的值
```JSX
import React from 'react';
import { useSingleton } from '../singleton/context';

export default function FunctionComponent() {
	const singleton=useSingleton();
	
	const handleIncrease=()=>{
		singleton.value++;
	}
	
	const handleShowValue=()=>{
		console.log("rfc:",singleton.value);
	}
	
	return (
	<div>
		FunctionComponent
		
		<button
			onClick={handleShowValue}
	    >	
			show value
		</button>
		
		<button
			onClick={handleIncrease}
	    >				
			increase
		</button>
	</div>
	);
}
```
### 类式组件
类式组件调用单例相对函数式组件有点复杂，因为**类式组件不能使用钩子函数**。但是类式组件继承的父类：`React.Component`中有一个静态属性`contextType`用于设置组件的上下文，设置上下文之后便可以使用`this.context`来获取上下文的值了
`React.Component`的部分源码：
```typescript
class Component<P, S> {
	// tslint won't let me format the sample code in a way that vscode likes it :(
	/**	
	* If set, `this.context` will be set at runtime to the current value of the given Context.
	*
	* Usage:
	*
	* ```ts
	* type MyContext = number
	* const Ctx = React.createContext<MyContext>(0)
	*
	* class Foo extends React.Component {
	*   static contextType = Ctx
	*   context!: React.ContextType<typeof Ctx>
	*   render () {
	*     return <>My context's value: {this.context}</>;
	*   }
	* }
	* ```
	*
	* @see https://react.dev/reference/react/Component#static-contexttype
	*/
	static contextType?: Context<any> | undefined;

	/**
	* If using the new style context, re-declare this in your class to be the
	* `React.ContextType` of your `static contextType`.
	* Should be used with type annotation or static contextType.
	*
	* ```ts
	* static contextType = MyContext
	* // For TS pre-3.7:
	* context!: React.ContextType<typeof MyContext>
	* // For TS 3.7 and above:
	* declare context: React.ContextType<typeof MyContext>
	* ```
	*
	* @see https://react.dev/reference/react/Component#context
	*/
	context: unknown;
	
	// 其余代码...
}
```
在类式组件中操作单例
```JSX
import React, { Component } from 'react';
import { SingletonContext } from '../singleton/context';

export default class ClassComponent extends Component {
  static contextType=SingletonContext;

  handleShowValue=()=>{
    console.log("rcc:",this.context.value);
  }

  handleIncrease=()=>{
    this.context.value++;
  }

  render() {
    return (
      <div>
        ClassComponent

        <button
          onClick={this.handleShowValue}
        >
          show value
        </button>

        <button
          onClick={this.handleIncrease}
        >
          increase
      </button>
    </div>
    );
  }
}
```
## 开始测试
首先分别查看两个组件中的单例初始值
![1.png](https://s2.loli.net/2025/05/06/Umaw3WTGfxC8ADz.png)

点击类式组件的`increase`按钮，再次查看单例初始值，两个组件中打印的值都变为了1
![2.png](https://s2.loli.net/2025/05/06/mI8brlLsiCQMfd5.png)

再次点击类式组件的`increase`按钮进行测试
![3.png](https://s2.loli.net/2025/05/06/95MwdK318yjCpes.png)

两个组件中的值都变为了2，由此可以说明它们使用的是同一个对象
> **需要注意的是上下文的值并不是响应式变量，不能触发页面更新！**

## 参考链接
https://zh-hans.react.dev/reference/react/createContext
