import Card from "../../components/Card";
import PageTitle from "../../components/PageTitle";
import { useEffect, useRef } from "react";
// import store from "../../redux/store";
import * as echarts from 'echarts/core';
import 'echarts-wordcloud';
import Category from "../../components/Category";
import { useAppSelector } from "../../redux/hooks";

import "./index.scss";

export default function CategoriesPage() {
  // const [categories,setCategories]=useState<any>();
  const categories=useAppSelector(state=>state.categoriesList);
  const postCount=useAppSelector(state=>state.postList).length || 0;
  // const [postCount,setPostCount]=useState<number>(0);
  // const [isDarkMode,setIsDarkMode]=useState<boolean>(store.getState().darkMode);
  const darkMode=useAppSelector(state=>state.darkMode);

  const chartRef=useRef(null);
  
  // useEffect(()=>{
  //   const {categoriesList,postList}=store.getState();
  //   setCategories(categoriesList);
  //   setPostCount(postList.length);


  //   const unsubscribe=store.subscribe(()=>{
  //     const {categoriesList={},postList,darkMode}=store.getState();
  //     setCategories(categoriesList);
  //     setPostCount(postList.length);
  //     setIsDarkMode(darkMode);
  //   })

  //   return ()=>{
  //     unsubscribe();
  //   }
  // },[])
  
  useEffect(()=>{
    // console.log(categories,postCount);
    if(categories && Object.keys(categories).length>0 && postCount!==0){
      createRadarChart();
    }
      
  },[categories,postCount])

  useEffect(()=>{
    if(categories && Object.keys(categories).length>0 && postCount!==0){
      createRadarChart();
    }
  },[darkMode])

  const createRadarChart=()=>{
    const radarChart=echarts.init(chartRef.current);
    let textStyle={
      fontFamily:"CustomFont1",
      fontSize:15,
      color:`${darkMode?'#ffffffcc':'#000000c0'}`
    };
    let itemStyle={
      color: `${darkMode?'#42cf52':'#67abff'}`
    }
    let axisName={
      fontFamily:"CustomFont1",
      fontSize:15,
      color:`${darkMode?'#ffffffcc':'#000000c0'}`,
      fontWeight:'bold'
    }

    let max=0;
    const getMaxCount=()=>{
      Object.keys(categories).forEach(item=>{
        if(item.length>max){
          max=item.length;
        }
      })
    }
    getMaxCount();

    const option = {
      backgroundColor:"",
      radar: {
        indicator: Object.keys(categories).map(categoryName=>({
          name:categoryName,
          max:max,
        })),
        name: {
          textStyle: textStyle
        },
        axisName,
        center:["50%","65%"],
        radius:"100%"
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
              itemStyle:itemStyle,
              label: {
                show: true, 
                fontSize: 13, 
                position: 'right', 
                color:`${darkMode?'#ffffff':"#000000"}`,
                fontWeight:"bold",
                fontFamily:"CustomFont1",
                // shadowColor:`${isDarkMode?"#000000aa":"#ffffffaa"}`,
                // shadowBlur:5,
                // shadowOffsetX:1,
                // shadowOffsetY:5,
              }
            }
          ]
        }
      ],
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
          <Card darkMode={darkMode}>
            <div className="categories-page-card-categories">
              {createCategories()}
            </div>
          </Card>

          <div className="categories-page-chart-main">
            <Card darkMode={darkMode}>
              <div className="categories-page-chart-block" ref={chartRef} />
            </Card>
          </div>
      </div>

    </div>
  )
}