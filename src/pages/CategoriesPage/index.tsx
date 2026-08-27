import Card from '../../components/Card';
import PageTitle from '../../components/PageTitle';
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { RadarChart } from 'echarts/charts';
import { RadarComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import Category from '../../components/Category';
import { useAppSelector } from '../../redux/hooks';
import { Categories } from '../../utils/types';
import { CUSTOM_FONT_FAMILY } from '../../utils/constants';

import './index.scss';

echarts.use([RadarChart, RadarComponent, CanvasRenderer]);

function createRadarOption(categories: Categories, darkMode: boolean) {
  const categoryNames = Object.keys(categories);
  const max = Math.max(...categoryNames.map(name => categories[name].length), 1);
  const textColor = darkMode ? '#ffffffcc' : '#000000c0';

  return {
    backgroundColor: '',
    radar: {
      indicator: categoryNames.map(name => ({ name, max })),
      name: {
        textStyle: {
          fontFamily: CUSTOM_FONT_FAMILY,
          fontSize: 15,
          color: textColor,
        },
      },
      axisName: {
        fontFamily: CUSTOM_FONT_FAMILY,
        fontSize: 15,
        color: textColor,
        fontWeight: 'bold',
      },
      center: ['50%', '50%'],
      radius: '70%',
    },
    series: [
      {
        areaStyle: { opacity: 0.25 },
        label: { show: true },
        type: 'radar',
        data: [
          {
            value: categoryNames.map(name => categories[name].length),
            itemStyle: {
              color: darkMode ? '#42cf52' : '#67abff',
            },
            label: {
              show: true,
              fontSize: 13,
              position: 'right',
              color: darkMode ? '#ffffff' : '#000000',
              fontWeight: 'bold',
              fontFamily: CUSTOM_FONT_FAMILY,
            },
          },
        ],
      },
    ],
  };
}

export default function CategoriesPage() {
  const categories = useAppSelector(state => state.taxonomy.categoriesList);
  const darkMode = useAppSelector(state => state.ui.darkMode);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || Object.keys(categories).length === 0) return;

    const radarChart = echarts.init(chartRef.current);
    radarChart.setOption(createRadarOption(categories, darkMode));

    return () => {
      radarChart.dispose();
    };
  }, [categories, darkMode]);

  const createCategories = (): React.ReactNode => {
    return Object.keys(categories).map(category => (
      <div className="categories-container" key={category}>
        <Category category={category} />
      </div>
    ));
  };

  return (
    <div className="page-main">
      <div className="page-main-title">
        <PageTitle title="Categories" />
      </div>

      <div className="page-main-content">
        <Card darkMode={darkMode}>
          <div className="categories-page-card-categories">{createCategories()}</div>
        </Card>

        <div className="categories-page-chart-main">
          <Card darkMode={darkMode}>
            <div className="categories-page-chart-block" ref={chartRef} />
          </Card>
        </div>
      </div>
    </div>
  );
}
