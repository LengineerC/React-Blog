import { useEffect, useState } from "react";
import Card from "../../../../../components/Card";
// import store from "../../../../../redux/store";
import { useAppSelector } from "../../../../../redux/hooks";

import './index.scss';

export default function ClockCard() {
  const [date,setDate]=useState<Date>(new Date());
  // const [isDarkMode,setIsDarkMode]=useState<boolean>(store.getState().darkMode);
  const darkMode=useAppSelector(state=>state.darkMode);

  useEffect(()=>{
    const timer=setInterval(()=>{
      setDate(new Date());
    },1000);

    return ()=>{
      clearInterval(timer);
    }
  },[])

  const getFormattedDate = (date: Date): JSX.Element => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return (
      <>
        <span style={{color:"rgb(174, 0, 0)",textShadow:"0 0 3px white"}}>
          {`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`}
        </span>
        <span style={darkMode?{color:"rgb(90, 150, 200)",textShadow:"0 0 3px black"}:{color:"rgb(90, 150, 200)",textShadow:"0 0 3px white"}}>
          {dayOfWeek}
        </span>
        <span style={darkMode?{color:"#ffffffaa",textShadow:"0 0 3px black"}:{color:"rgb(0, 20, 71)",textShadow:"0 0 3px white"}}>
          {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
        </span>
      </>
    );  
  };

  return (
    <Card
    className="aside-card"
    scale={true}
    background={
      darkMode?
      'linear-gradient(90deg,rgba(35, 9, 184, 0.5),rgba(20, 7, 94, 0.5)'
      :"linear-gradient(90deg,rgba(27, 109, 209,0.5),rgba(177, 255, 82, 0.5))"
    }
    darkMode={darkMode}
    >
      <div className="clock-card-main">
        {getFormattedDate(date)}
      </div>
    </Card>
  )
}