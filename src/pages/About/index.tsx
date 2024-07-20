import { useEffect, useRef, useState } from "react";
import PageTitle from "../../components/PageTitle"
import Card from "../../components/Card"
import avatar from "../../assets/image/avatar.webp";
import { AUTHOR } from "../../utils/constants";
import axios from "axios";
// import store from "../../redux/store";
import MDRenderer from "../../components/MDRenderer";
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useAppSelector } from "../../redux/hooks";

import "./index.scss"

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);

export default function About() {
  const [markdown,setMarkdown]=useState<string>('');
  const pieChartRef=useRef<HTMLDivElement>(null);
  // const [isDarkMode,setIsDarkMode]=useState<boolean>(store.getState().darkMode);
  const darkMode=useAppSelector(state=>state.darkMode);
  const categoriesList=useAppSelector(state=>state.categoriesList);

  const getFormatCategoriesData=()=>{
    let data=[];
    // const {categoriesList}=store.getState();

    data=Object.keys(categoriesList).map(key=>{
      return({
        name:key,
        value:categoriesList[key].length,
      })
    });
    return data;
  }

  useEffect(()=>{
    // const unsubscribe=store.subscribe(()=>{
    //   const {darkMode}=store.getState();
    //   setIsDarkMode(darkMode);
    // })

    axios.get('/aboutme.md')
    .then(res=>{
      const {data}=res;
      setMarkdown(data);
    }).catch(err=>{
      console.log(err);
    });

    // console.log(categoriesData);
    // const unsubscribe=store.subscribe(()=>{
    //   categoriesData=getFormatCategoriesData();
    // });
    const pieChartDom=pieChartRef.current;
    const pieChart=echarts.init(pieChartDom);
    // window.addEventListener('resize',()=>{
    //   pieChart.resize();
    // })
    renderPieChart(pieChart);
    
    // return ()=>{
    //   unsubscribe();
    // }

  },[])

  const renderPieChart=(pieChart:any)=>{
    let categoriesData=getFormatCategoriesData();

    let option={
      tooltip:{
        triger:"item",
        textStyle:{
          fontFamily:"CustomFont1",
        }
      },
      // legend: {
      //   orient: 'vertical',
      //   left: 'left'
      // },
      series: [
        {
          name: 'Categories',
          type: 'pie',
          radius: '80%',
          data: categoriesData,
          label:{
            color:`${darkMode?"#ffffffaa":"#000000aa"}`,
            fontFamily:"CustomFont1",
            fontWeight:'bold',
            fontSize:"15"
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    pieChart.setOption(option);
  }

  return (
    <div className="page-main">
      <div className="page-main-title">
        <PageTitle title="About" />
      </div>

      <div className="page-main-content" style={{marginTop:"15vh"}}>
        <Card darkMode={darkMode}>
          <div className="about-main">
            <div className="about-avatar">
              <img src={avatar}/>
            </div>

            <div className="about-content">
              <div className={darkMode?"about-content-title-dark":"about-content-title"}>
                {AUTHOR}
              </div>

              <div className="about-content-text">
                <MDRenderer
                darkMode={darkMode}
                markdown={markdown}
                showLimitContent={false}
                />
              </div>

              <div className={darkMode?"about-chart-title-dark":"about-chart-title"}>
                文章数据列表
              </div>

              <div className="about-chart">
                <div className="about-chart-item" ref={pieChartRef}/>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}