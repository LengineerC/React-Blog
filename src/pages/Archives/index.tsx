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

import "./index.scss"
import { PostConfig } from "../../utils/types";

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
  const [postList,setPostList]=useState<PostConfig[]>([]);

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


  useEffect(()=>{
    
    const {postList}=store.getState();
    setPostList(postList);

    const unsubscribe=store.subscribe(()=>{
      const {postList}=store.getState();
      setPostList(postList);
    })

    const heatMap=echarts.init(heatMapRef.current);

    const option={
      title:{
        top:10,
        left:"center",
        text:"文章日历"
      },
      visualMap:{
        min:0,
        max:100,
        type: 'piecewise',
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
        pieces: [
          {min: 4, label: '4+', color: '#0943b7'},
          {min: 3, max: 3, label: '3', color: '#2986d2'},
          {min: 2, max: 2, label: '2', color: '#80cbe0'},
          {min: 1, max: 1, label: '1', color: '#cdd8db'},
          {min: 0, max: 0, label: '0', color: '#ffffff'}
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
        itemStyle: {
          borderWidth: 2,
        },
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: getFormatData(currentDate.getFullYear().toString()),
        itemStyle:{
          borderRadius: 2,
        },
      }
    }
    
    heatMap.setOption(option);

    return ()=>{
      unsubscribe();
    }

  },[postList])

  return (
    <div className="page-main">

      <div className="page-main-title">
        <PageTitle title="Archives"/>
      </div>

      <div className="page-main-content">
        <Card
        className="card"
        >
          <div ref={heatMapRef} className="calender-heatmap-block" />

          <div className="time-line-block">
            <ConfigProvider
            theme={{
              components:{
                Timeline:{
                  tailColor:"rgb(0, 20, 71)",
                }
              }
            }}
            >
              <Timeline 
              mode="alternate"
              items={[
                {
                  children:"构建中",
                  color:"red"
                },
                {
                  children:"立项 2024-06-08",
                  color:"green"
                },
              ]}
              />
            </ConfigProvider>
          </div>
        </Card>
      </div>

    </div>
  )
}