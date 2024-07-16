import { Button, ConfigProvider, Input, message, Space } from "antd"
import Card from "../../../components/Card"
import { useRef, useState, useEffect } from "react"

import "./index.scss"
import store from "../../../redux/store"

type Props = {
  onClose:Function
  password:string
}

export default function LockCard({onClose,password}: Props) {
  const [messageApi, contextHolder] = message.useMessage();
  const [isDarkMode,setIsDarkMode]=useState<boolean>(store.getState().darkMode);

  const inputRef=useRef<any>(null);

  useEffect(()=>{
    const unsubscribe=store.subscribe(()=>{
      const {darkMode}=store.getState();
      setIsDarkMode(darkMode);
    })

    return ()=>{
      unsubscribe();
    }
  },[])

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
    if(isDarkMode){
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
    <Card>
      <div className="lock-card-main">
        <div className={isDarkMode?"lock-card-title-dark":"lock-card-title"}>
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