---
title: "auto0"
author: "LengineerC"
time: "2024-06-16 12:13:26"
lock: false
top: true
categories: [c1,c2,c3]
tags: [tag1,tag2,tag3]
---
# h1
text
## h2
text
### h3
text
#### h4
text
##### h5

text
1231123112311231
1232131313
dsajkhdkasjdjhlaskdnosahdiosajhdiosajiodjiojdoalkndklnasld
dsandjksahdadsadjsalkdjsaiodjsaiodjsa
dnjkcnxkzjbcoixzhioqwe
cnxzlkhdiosajdopjaqo

pdnipoaqwhdipowa
dsajkhdkasjdjhlaskdnosahdiosajhdiosajiodjiojdoalkndklnasld
dsandjksahdadsadjsalkdjsaiodjsaiodjsa
dnjkcnxkzjbcoixzhioqwe
cnxzlkhdiosajdopjaqopdnipoaqwhdipowa

|col1|col2|col3|
|----|----|----|
|1|2|3|
|4|5|6|
|7|8|9|

## 2.codeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

```cpp
#include<iostream>
#include<string>
#include<stack>
using namespace std;

bool isOperator(char c){
    return c=='+'||c=='-'||c=='*'||c=='/';
}

bool isNum(char c){
    return c>='0'&&c<='9';
}

int precedence(char c){
    switch (c) {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        default:
            return -1;
    }
}

bool isNegativeSign(const string& str, int index) {
    return str[index] == '-' && (index == 0 || str[index - 1] == '(' || isOperator(str[index - 1]));
}

string changeToRPN(string str){
    stack<char> op;
    string rpnString = "";
    for(int i = 0; i < str.size(); i++) {
        if (isNum(str[i]) || str[i] == '.' || isNegativeSign(str, i)) {
            rpnString += str[i];
            while(i + 1 < str.length() && (isNum(str[i + 1]) || str[i + 1] == '.')) {
                rpnString += str[++i];
            }
            rpnString += ' ';
        } else if (str[i] == '(') {
            op.push(str[i]);
        } else if (str[i] == ')') {
            while(!op.empty() && op.top() != '(') {
                rpnString += op.top();
                rpnString += ' ';
                op.pop();
            }
            op.pop();
        } else if (isOperator(str[i])) {
            while(!op.empty() && precedence(str[i]) <= precedence(op.top())) {
                rpnString += op.top();
                rpnString += ' ';
                op.pop();
            }
            op.push(str[i]);
        }
    }
    while(!op.empty()) {
        rpnString += op.top();
        rpnString += ' ';
        op.pop();
    }
    return rpnString;
}

double handleOperation(double a, double b, char op){
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            return 0;
    }
}

double calculateRpnStr(string str){
    stack<double> res;
    string num;
    for(int i=0;i<str.size();i++) {
        char c=str[i];
        if(c == ' ') {
            if(!num.empty()) {
                res.push(stod(num));
                num.clear();
            }
        } else if (isOperator(c)) {
            if (c == '-' && (i == 0 || str[i - 1] == ' ')) {
                num += c;
            }else{
                double val2 = res.top();
                res.pop();
                double val1 = res.top();
                res.pop();
                res.push(handleOperation(val1, val2, c));
            }
        } else num += c;
    }
    if(!num.empty()) res.push(stod(num));
    return res.top();
}

int main(){
    string str;
    cin >> str;
    string rpnStr = changeToRPN(str);
    cout <<"Rpn: "<< rpnStr << endl;
    cout <<"Result: "<< calculateRpnStr(rpnStr);
    return 0;
}

```

dsandjksahdadsadjsalkdjsaiodjsaiodjsa
dnjkcnxkzjbcoixzhioqwe
cnxzlkhdiosajdopjaqopdnipoaqwhdipowa
dsajkhdkasjdjhlaskdnosahdiosajhdiosajiodjiojdoalkndklnasld
dsandjksahdadsadjsalkdjsaiodjsaiodjsa
dnjkcnxkzjbcoixzhioqwe
cnxzlkhdiosajdopjaqopdnipoaqwhdipowa

|col1|col2|col3|
|----|----|----|
|1|2|3|

[link](/post/detail/test_auto_create1)

line1<br/>
line2

line3

![toki pona](https://jan-ne.github.io/tp/sitelen_pona.png)

`code block`
**asd**
*aaa*
- [ ] select
- [x] sel

> das
> >da222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222

---
1. l1
2. l2

- 1
- 2