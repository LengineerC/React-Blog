import { useEffect, useRef, useState } from "react";
import { ConfigProvider, Timeline } from "antd"
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  CalendarComponent,
  TooltipComponent,
  VisualMapComponent
} from 'echarts/components';
import { HeatmapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import PageTitle from "../../components/PageTitle"
import Card from "../../components/Card"
import store from "../../redux/store";
// import { PostConfig } from "../../utils/types";
import { GITHUB_REPO } from "../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import "./index.scss"

echarts.use([
  TitleComponent,
  CalendarComponent,
  TooltipComponent,
  VisualMapComponent,
  HeatmapChart,
  CanvasRenderer
]);

export default function Archives() {
  const heatMapRef=useRef(null);
  const [currentDate]=useState<Date>(new Date());
  // const [postList,setPostList]=useState<PostConfig[]>([]);
  const [githubRepoCommits,setGithubRepoCommits]=useState<[]>([]);
  // const [isDarkMode,setIsDarkMode]=useState<boolean>(store.getState().darkMode);
  const darkMode=useAppSelector(state=>state.darkMode);
  const postList=useAppSelector(state=>state.postList);

  const dispatch=useAppDispatch();

  const getFormatData=(year:string)=>{
    const date=+echarts.time.parse(year+'-01-01');
    const end=+echarts.time.parse(+year+1+'-01-01');
    const dayTime=3600*24*1000;
    const data:[string,number][]=[];

    for(let time=date;time<end;time+=dayTime){
      data.push([
        echarts.time.format(time,'{yyyy}-{MM}-{dd}',false),
        0
      ])
    }

    if(postList.length>0){
      const postDateArr:[string,number][]=[];
      const postTimeHash:any={};

      postList.map(post=>{
        const postTime=post.time.split(' ');
        if(postTime[0].slice(0,4)===currentDate.getFullYear().toString()){
          if(!postTimeHash.hasOwnProperty(postTime[0])){
            postTimeHash[postTime[0]]=1;
          }else{
            postTimeHash[postTime[0]]++;
          }
        }
      });

      Object.keys(postTimeHash).map(key=>{
        postDateArr.push([key,postTimeHash[key]]);
      });

      return [...data, ...postDateArr];
    }
    return data;
  }

  const formatCommitData=(rawDataArr:any)=>{
    const githubRepoCommits=rawDataArr.map((item:any,index:number)=>{
      const {commit:{message},commit:{committer:{date}}}=item;
      let color='grey';
      if(index===0) color="green";
      if(index===rawDataArr.length-1) color="blue";

      let dateArr=date.split("T");
      dateArr[1]=dateArr[1].substring(0,dateArr[1].length-1);
      const dateStr=dateArr.join(' ');
      return({
        children:`${dateStr}\t${message}`,
        color:color,
      })
    })
    setGithubRepoCommits(githubRepoCommits);
  }

  useEffect(()=>{
    const {githubRepoCommits}=store.getState();
    // const unsubscribe=store.subscribe(()=>{
    //   const {darkMode}=store.getState();
    //   setIsDarkMode(darkMode);
    // })

    if(githubRepoCommits || githubRepoCommits.length===0){
      dispatch({
        type:"getGithubRepoCommits",
        payload:GITHUB_REPO,
        callback:(data:any)=>{
          formatCommitData(data);
        }
      })
    }else{
      formatCommitData(githubRepoCommits);
    }

    // return ()=>{
    //   unsubscribe();
    // }
  },[])

  // useEffect(()=>{
    
  //   const {postList}=store.getState();
  //   setPostList(postList);

  //   const unsubscribe=store.subscribe(()=>{
  //     const {postList}=store.getState();
  //     setPostList(postList);
  //   })

  //   return ()=>{
  //     unsubscribe();
  //   }

  // },[postList])

  useEffect(()=>{
    const heatMap=echarts.init(heatMapRef.current);
    renderHeatMap(heatMap);

  },[darkMode,postList])

  const renderHeatMap=(heatMap:any)=>{
    let title={
      top:10,
      left:"center",
      text:"文章日历",
      textStyle:{
        fontFamily:"CustomFont1",
        color:`${darkMode?"#ffffffaa":"#001447aa"}`,
        fontWeight:'bold',
      },
    }

    const option={
      title:title,
      visualMap:{
        min:0,
        max:100,
        type: 'piecewise',
        selectedMode:false,
        // tooltip: {
        //   renderMode: 'richText' ,
        //   position: 'top',
        //   formatter: function (params:any) {
        //     return `${params.value[0]}: ${params.value[1]}`;
        //   }
        // },
        // categories: ['0', '1', '2', '3'],
        // inRange:{
        //   color:['#cdd8db','#80cbe0','#2986d2','#0943b7'],
        // },
        textStyle:{
          color: `${darkMode?"#ffffffaa":"#001447aa"}`,
          fontFamily:"CustomFont1",
          fontWeight:"bold",
        },
        pieces: [
          {min: 4, label: '4+', color: `${darkMode?'#216e39':'#0943b7'}`},
          {min: 3, max: 3, label: '3', color: `${darkMode?'#30a14e':'#2986d2'}`},
          {min: 2, max: 2, label: '2', color: `${darkMode?'#40c463':'#80cbe0'}`},
          {min: 1, max: 1, label: '1', color: `${darkMode?'#9be9a8':'#cdd8db'}`},
          {min: 0, max: 0, label: '0', color: `${darkMode?'#333333':'#f6f6f6'}`}
        ],
        orient: 'horizontal',
        left: 'center',
        top:45,
        percision:0,
      },
      calendar: {
        top: 100,
        left: 30,
        right: 30,
        cellSize: 15,
        range: currentDate.getFullYear(),
        splitLine:{
          lineStyle:{
            type:'solid',
            width:2,
            color:'#001447aa',
          },
          show:true,
        },
        itemStyle: {
          borderWidth: 2,
          // borderColor:"#aaaaaa99"
          borderColor:`${darkMode?'#aaaaaa99':'#ccc'}`
        },
        dayLabel:{
          color: `${darkMode?"#ffffffaa":"#001447aa"}`,
          fontFamily:"CustomFont1",
          fontWeight:"bold",
        },
        monthLabel:{
          color: `${darkMode?"#ffffffaa":"#001447aa"}`,
          fontFamily:"CustomFont1",
          fontWeight:"bold",
        },
        yearLabel:{
          color: `${darkMode?"#ffffffaa":"#001447aa"}`,
          fontFamily:"CustomFont1",
          fontWeight:"bold",
        },
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: getFormatData(currentDate.getFullYear().toString()),
        itemStyle:{
          borderRadius: 2,
          borderColor:`${darkMode?'#aaaaaa99':'#ccc'}`

        },
      }
    }
    
    heatMap.setOption(option);

  }

  return (
    <div className="page-main">

      <div className="page-main-title">
        <PageTitle title="Archives"/>
      </div>

      <div className="page-main-content">
        <Card
        className="card"
        darkMode={darkMode}
        >
          <div ref={heatMapRef} className="calender-heatmap-block" />

          <div className="time-line-block">
            <ConfigProvider
            theme={{
              components:{
                Timeline:{
                  tailColor:`${darkMode?"#ffffff66":"rgb(0, 20, 71)"}`,
                }
              },
              token:{
                fontFamily:"CustomFont1",
                fontSize:17,
                colorText:`${darkMode?"#ffffffcc":"#001447cc"}`
              }
            }}
            >
              <Timeline 
              mode="alternate"
              // items={[
              //   {
              //     children:"构建中",
              //     color:"red"
              //   },
              //   {
              //     children:"立项 2024-06-08",
              //     color:"green"
              //   },
              // ]}
              items={githubRepoCommits}
              />
            </ConfigProvider>
          </div>
        </Card>
      </div>

    </div>
  )
}