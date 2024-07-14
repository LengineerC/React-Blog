import { useEffect, useRef, useState } from "react";
import PageTitle from "../../components/PageTitle"
import Card from "../../components/Card"
import avatar from "../../assets/image/avatar.webp";
import { AUTHOR } from "../../utils/constants";
import axios from "axios";
import store from "../../redux/store";
import MDRender from "../../components/MDRender";
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

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

  const getFormatCategoriesData=()=>{
    let data=[];
    const {categoriesList}=store.getState();
    data=Object.keys(categoriesList).map(key=>{
      return({
        name:key,
        value:categoriesList[key].length,
      })
    });
    return data;
  }

  useEffect(()=>{
    axios.get('/aboutme.md')
    .then(res=>{
      const {data}=res;
      setMarkdown(data);
    }).catch(err=>{
      console.log(err);
    });

    let categoriesData=getFormatCategoriesData();
    // console.log(categoriesData);
    // const unsubscribe=store.subscribe(()=>{
    //   categoriesData=getFormatCategoriesData();
    // });
    

    const pieChartDom=pieChartRef.current;
    const pieChart=echarts.init(pieChartDom);
    let option={
      tooltip:{
        triger:"item"
      },
      // legend: {
      //   orient: 'vertical',
      //   left: 'left'
      // },
      series: [
        {
          name: 'Categories',
          type: 'pie',
          radius: '50%',
          data: categoriesData,
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

  },[])

  return (
    <div className="page-main">
      <div className="page-main-title">
        <PageTitle title="About" />
      </div>

      <div className="page-main-content" style={{marginTop:"15vh"}}>
        <Card>
          <div className="about-main">
            <div className="about-avatar">
              <img src={avatar}/>
            </div>

            <div className="about-content">
              <div className="about-content-title">
                {AUTHOR}
              </div>

              <div className="about-content-text">
                <MDRender 
                markdown={markdown}
                showLimitContent={false}
                />
              </div>

              <div className="about-chart-title">
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