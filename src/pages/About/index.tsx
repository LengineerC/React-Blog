import { useEffect, useRef, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Card from '../../components/Card';
import avatar from '../../assets/image/avatar.webp';
import { AUTHOR, CUSTOM_FONT_FAMILY } from '../../utils/constants';
// import store from "../../redux/store";
import MDRenderer from '../../components/MDRenderer';
import * as echarts from 'echarts/core';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useAppSelector } from '../../redux/hooks';
import { loadPostContent } from '../../services/postContentCache';
import { PostContent } from '../../utils/types';

import './index.scss';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

export default function About() {
  const [content, setContent] = useState<PostContent>();
  const pieChartRef = useRef<HTMLDivElement>(null);
  // const [isDarkMode,setIsDarkMode]=useState<boolean>(store.getState().darkMode);
  const darkMode = useAppSelector(state => state.ui.darkMode);
  const categoriesList = useAppSelector(state => state.taxonomy.categoriesList);

  useEffect(() => {
    let active = true;

    loadPostContent('/generated/about.json')
      .then(aboutContent => {
        if (active) setContent(aboutContent);
      })
      .catch(err => {
        if (active) console.log('About: 内容获取失败', err);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!pieChartRef.current || Object.keys(categoriesList).length === 0) return;

    const categoriesData = Object.keys(categoriesList).map(key => ({
      name: key,
      value: categoriesList[key].length,
    }));
    const pieChart = echarts.init(pieChartRef.current);

    const option = {
      tooltip: {
        triger: 'item',
        textStyle: {
          fontFamily: CUSTOM_FONT_FAMILY,
        },
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
          label: {
            color: `${darkMode ? '#ffffffaa' : '#000000aa'}`,
            fontFamily: CUSTOM_FONT_FAMILY,
            fontWeight: 'bold',
            fontSize: '15',
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
    pieChart.setOption(option);

    return () => {
      pieChart.dispose();
    };
  }, [categoriesList, darkMode]);

  return (
    <div className="page-main">
      <div className="page-main-title">
        <PageTitle title="About" />
      </div>

      <div className="page-main-content" style={{ marginTop: '15vh' }}>
        <Card darkMode={darkMode}>
          <div className="about-main">
            <div className="about-avatar">
              <img src={avatar} alt={`${AUTHOR} avatar`} />
            </div>

            <div className="about-content">
              <div className={darkMode ? 'about-content-title-dark' : 'about-content-title'}>
                {AUTHOR}
              </div>

              <div className="about-content-text">
                <MDRenderer darkMode={darkMode} html={content?.html ?? ''} />
              </div>

              <div className={darkMode ? 'about-chart-title-dark' : 'about-chart-title'}>
                文章数据列表
              </div>

              <div className="about-chart">
                <div className="about-chart-item" ref={pieChartRef} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
