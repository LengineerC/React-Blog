import React from 'react'
import './App.scss';
import PageTitle from "./components/PageTitle/index"
import Nav from './components/Nav';

import store from './redux/store';
import { Button } from 'antd';

//nav hidden test
// import { showNav, hideNav } from './redux/actions';

type Props = {}

export default function App({}: Props) {

  // const show=()=>{
  //   store.dispatch(showNav());
  // }
  // const hidden=()=>{
  //   store.dispatch(hideNav());
  // }

  return (
    <div className={`App`} style={{color:"white"}}>
      <Nav />
      {/* <Button onClick={show}>show</Button>
      <Button onClick={hidden}>hidden</Button> */}
      <PageTitle />
    </div>
  )
}