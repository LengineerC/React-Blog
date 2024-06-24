import Card from "../../components/Card";
import PageTitle from "../../components/PageTitle";
import { useEffect, useRef, useState } from "react";
import store from "../../redux/store";
import * as echarts from 'echarts/core';
import 'echarts-wordcloud';
import Category from "../../components/Category";

import "./index.scss";

export default function CategoriesPage() {
  const [categories,setCategories]=useState<any>();
  const [postCount,setPostCount]=useState<number>(0);
  const chartRef=useRef(null);
  
  useEffect(()=>{
    const {categoriesListReducer,postListReducer}=store.getState();
    setCategories(categoriesListReducer);
    setPostCount(postListReducer.length);


    const unsubscribe=store.subscribe(()=>{
      const {categoriesListReducer={},postListReducer}=store.getState();
      setCategories(categoriesListReducer);
      setPostCount(postListReducer.length);
    })

    return ()=>{
      unsubscribe();
    }
  },[])
  
  useEffect(()=>{
    // console.log(categories,postCount);
    if(categories && Object.keys(categories).length>0 && postCount!==0){
      createRadarChart();
    }
      
  },[categories,postCount])

  const createRadarChart=()=>{
    const radarChart=echarts.init(chartRef.current);
    const option = {
      radar: {
        indicator: Object.keys(categories).map(categoryName=>({
          name:categoryName,
          max:postCount,
        })),
        name: {
          textStyle: {
            color: '#000000c0'
          }
        }
      },
      series: [
        {
          areaStyle:{opacity:"0.25"},
          label:{show:"true"},
          type: 'radar',
          data: [
            {
              value: Object.keys(categories).map(catagoryName=>{
                const category=categories[catagoryName];
                return category?category.length:0;
              }),
            }
          ]
        }
      ]
    };

    radarChart.setOption(option);
  }

  const createCategories=():React.ReactNode=>{
    if(categories){
      return Object.keys(categories).map((categories:any)=>{
        return (
          <div className="categories-container" key={categories}>
            <Category category={categories}/>
          </div>
        )
      })
    }
  }

  return (
    <div className="page-main">

      <div className="page-main-title">
        <PageTitle title="Categories"/>
      </div>

      <div className="page-main-content">
          <Card>
            <div className="categories-page-card-categories">
              {createCategories()}
            </div>
          </Card>

          <div className="categories-page-chart-main">
            <Card>
              <div className="categories-page-chart-block" ref={chartRef} />
            </Card>
          </div>
      </div>

    </div>
  )
}