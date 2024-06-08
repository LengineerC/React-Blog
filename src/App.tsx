import React, { Component } from 'react'
import './App.scss';
import PageTitle from "./components/PageTitle/index"

type Props = {}

export default function App({}: Props) {

  return (
    <div className={`App`} style={{color:"white"}}>
      <PageTitle/>
    </div>
  )
}