import { Button, ConfigProvider, Input, message, Space } from "antd"
import Card from "../../../components/Card"
import { useRef, useState, useEffect } from "react"

import "./index.scss"
import store from "../../../redux/store"
import { useAppSelector } from "../../../redux/hooks"

type Props = {
  onClose:Function
  password:string
}

export default function LockCard({onClose,password}: Props) {
  const [messageApi, contextHolder] = message.useMessage();
  // const [isDarkMode,setIsDarkMode]=useState<boolean>(store.getState().darkMode);
  const darkMode=useAppSelector(state=>state.darkMode);

  const inputRef=useRef<any>(null);

  const verifyPassword=()=>{
    const inputContent=inputRef.current?.input.value;
    if(inputContent==password){
      onClose();
    }else{
      messageApi.open({
        type:"error",
        content:"密码错误！"
      });
    }
  }

  const getToken=()=>{
    if(darkMode){
      return ({
        colorPrimary:'#393958',
      })
    }else{
      return ({
        colorPrimary:"#4086db"
      })
    }
  }

  return (
    <Card darkMode={darkMode}>
      <div className="lock-card-main">
        <div className={darkMode?"lock-card-title-dark":"lock-card-title"}>
          请输入密码
        </div>

        <div className="wave-divider"/>

        <div className="lock-card-input-line">
          <ConfigProvider
          theme={{
            components:{
              Input:{
                activeBg:"#f6f6f6aa"
              },
              Message:{
                contentBg:"#ffffffda"
              }
            },
            token:getToken()
          }}
          >
            {contextHolder}
            <Space.Compact style={{width:"100%"}}>
              <Input ref={inputRef} type="password" placeholder="password"/>
              <Button onClick={verifyPassword} type="primary">Submit</Button>
            </Space.Compact>
          </ConfigProvider>
        </div>
      </div>
    </Card>
  )
}