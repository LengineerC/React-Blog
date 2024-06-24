import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/Card";
import PageTitle from "../../components/PageTitle";
import { useEffect, useRef, useState } from "react";
import store from "../../redux/store";
import Tag from "../../components/Tag";
import * as echarts from 'echarts/core';
import 'echarts-wordcloud';

import "./index.scss";

export default function TagsPage() {
  const [tags,setTags]=useState<any>();
  const chartRef=useRef(null);
  const navigate=useNavigate();
  
  useEffect(()=>{
    const {tagsListReducer}=store.getState();
    setTags(tagsListReducer);

    const unsubscribe=store.subscribe(()=>{
      const {tagsListReducer={}}=store.getState();
      setTags(tagsListReducer);
    })

    return ()=>{
      unsubscribe();
    }
  },[])
  
  useEffect(()=>{
    if(tags){
      createWordCloud();
    }
      
  },[tags])

  const createWordCloud=()=>{
    let wordcloud=echarts.init(chartRef.current);
    const option = {
      series: [
        {
          type: 'wordCloud',
          gridSize: 2,
          sizeRange: [20, 60],
          rotationRange: [0, 0],
          shape: 'pentagon',
          textStyle: {
            normal: {
              color: ()=>{
                return (
                  'rgb(' +
                  [
                    Math.round(Math.random() * 255),
                    Math.round(Math.random() * 255),
                    Math.round(Math.random() * 255),
                  ].join(',') +
                  ')'
                );
              },
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333',
            },
          },
          data:Object.keys(tags).map(tagName=>{
            return ({
              name:tagName,
              value:parseInt(tags[tagName].length),
              link:`/tags/${tagName}`,
            })
          })
        }
      ]
    };
    
    wordcloud.setOption(option);
    wordcloud.on('click', function (params:any) {
      if (params.data && params.data.link) {
        navigate(`${params.data.link}`)
      }
    });
  }

  const createTags=():React.ReactNode=>{
    if(tags){
      return Object.keys(tags).map((tag:any)=>{
        return (
          <div className="tag-container" key={tag}>
            <Tag tag={tag} />
          </div>
        )
      })
    }
  }

  return (
    <div className="page-main">

      <div className="page-main-title">
        <PageTitle title="Tags"/>
      </div>

      <div className="page-main-content">
          <Card>
            <div className="tags-page-card-tags">
              {createTags()}
            </div>
          </Card>

          <div className="tags-page-chart-main">
            <Card>
              <div className="tags-page-chart-block" ref={chartRef} />
            </Card>
          </div>
      </div>

    </div>
  )
}