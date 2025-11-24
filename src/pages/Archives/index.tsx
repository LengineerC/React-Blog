import { useEffect, useRef, useState, useMemo } from 'react';
import { ConfigProvider, Timeline } from 'antd';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  CalendarComponent,
  TooltipComponent,
  VisualMapComponent,
} from 'echarts/components';
import { HeatmapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import PageTitle from '../../components/PageTitle';
import Card from '../../components/Card';
import { GITHUB_REPO } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { MOBILE_MAX_WIDTH } from '../../utils/constants';

import './index.scss';

echarts.use([
  TitleComponent,
  CalendarComponent,
  TooltipComponent,
  VisualMapComponent,
  HeatmapChart,
  CanvasRenderer,
]);

export default function Archives() {
  const heatMapRef = useRef<HTMLDivElement>(null);
  const [currentDate] = useState<Date>(new Date());
  const darkMode = useAppSelector(state => state.ui.darkMode);
  const postList = useAppSelector(state => state.post.postList);
  const githubRepoCommits = useAppSelector(state => state.app.githubRepoCommits);

  const dispatch = useAppDispatch();

  const getFormatData = (year: string) => {
    const date = +echarts.time.parse(year + '-01-01');
    const end = +echarts.time.parse(+year + 1 + '-01-01');
    const dayTime = 3600 * 24 * 1000;
    const data: [string, number][] = [];

    for (let time = date; time < end; time += dayTime) {
      data.push([echarts.time.format(time, '{yyyy}-{MM}-{dd}', false), 0]);
    }

    if (postList.length > 0) {
      const postDateArr: [string, number][] = [];
      const postTimeHash: any = {};

      postList.map(post => {
        const postTime = post.time.split(' ');
        if (postTime[0].slice(0, 4) === currentDate.getFullYear().toString()) {
          if (!postTimeHash.hasOwnProperty(postTime[0])) {
            postTimeHash[postTime[0]] = 1;
          } else {
            postTimeHash[postTime[0]]++;
          }
        }
      });

      Object.keys(postTimeHash).map(key => {
        postDateArr.push([key, postTimeHash[key]]);
      });

      return [...data, ...postDateArr];
    }
    return data;
  };

  const formatCommitData = (rawDataArr: any) => {
    if (!rawDataArr || rawDataArr.length === 0) return [];
    return rawDataArr.map((item: any, index: number) => {
      const {
        commit: { message },
        commit: {
          committer: { date },
        },
      } = item;
      let color = 'grey';
      if (index === 0) color = 'green';
      if (index === rawDataArr.length - 1) color = 'blue';

      let dateArr = date.split('T');
      dateArr[1] = dateArr[1].substring(0, dateArr[1].length - 1);
      const dateStr = dateArr.join(' ');
      return {
        children: `${dateStr}\t${message}`,
        color: color,
      };
    });
  };

  const formattedCommits = useMemo(() => {
    return formatCommitData(githubRepoCommits);
  }, [githubRepoCommits]);

  useEffect(() => {
    if (!githubRepoCommits || githubRepoCommits.length === 0) {
      dispatch({
        type: 'getGithubRepoCommits',
        payload: GITHUB_REPO,
      });
    }
  }, [githubRepoCommits, dispatch]);

  useEffect(() => {
    const width = window.innerWidth > MOBILE_MAX_WIDTH ? 1150 : 900;
    const heatMap = echarts.init(heatMapRef.current, null, {
      width,
    });

    renderHeatMap(heatMap);

    return () => {
      heatMap.dispose();
    };
  }, [darkMode, postList]);

  const renderHeatMap = (heatMap: any) => {
    const option = {
      visualMap: {
        min: 0,
        max: 100,
        type: 'piecewise',
        selectedMode: false,
        textStyle: {
          color: `${darkMode ? '#ffffffaa' : '#001447aa'}`,
          fontFamily: 'CustomFont1',
          fontWeight: 'bold',
        },
        pieces: [
          { min: 4, label: '3+', color: `${darkMode ? '#216e39' : '#0943b7'}` },
          { min: 3, max: 3, label: '3', color: `${darkMode ? '#30a14e' : '#2986d2'}` },
          { min: 2, max: 2, label: '2', color: `${darkMode ? '#40c463' : '#80cbe0'}` },
          { min: 1, max: 1, label: '1', color: `${darkMode ? '#9be9a8' : '#cdd8db'}` },
          { min: 0, max: 0, label: '0', color: `${darkMode ? '#333333' : '#f6f6f6'}` },
        ],
        orient: 'horizontal',
        left: 'center',
        // top: 45,
        top: 10,
        percision: 0,
      },
      calendar: {
        // top: 100,
        top: 65,
        left: 30,
        right: 30,
        cellSize: 15,
        range: currentDate.getFullYear(),
        splitLine: {
          lineStyle: {
            type: 'solid',
            width: 2,
            color: '#001447aa',
          },
          show: true,
        },
        itemStyle: {
          borderWidth: 2,
          // borderColor:"#aaaaaa99"
          borderColor: `${darkMode ? '#aaaaaa99' : '#ccc'}`,
        },
        dayLabel: {
          color: `${darkMode ? '#ffffffaa' : '#001447aa'}`,
          fontFamily: 'CustomFont1',
          fontWeight: 'bold',
        },
        monthLabel: {
          color: `${darkMode ? '#ffffffaa' : '#001447aa'}`,
          fontFamily: 'CustomFont1',
          fontWeight: 'bold',
        },
        yearLabel: {
          color: `${darkMode ? '#ffffffaa' : '#001447aa'}`,
          fontFamily: 'CustomFont1',
          fontWeight: 'bold',
        },
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: getFormatData(currentDate.getFullYear().toString()),
        itemStyle: {
          borderRadius: 2,
          borderColor: `${darkMode ? '#aaaaaa99' : '#ccc'}`,
        },
      },
    };

    heatMap.setOption(option);
  };

  return (
    <div className="page-main">
      <div className="page-main-title">
        <PageTitle title="Archives" />
      </div>

      <div className="page-main-content">
        <Card className="card" darkMode={darkMode}>
          <div className="calender-heatmap-container ">
            <div
              style={{
                width: '100%',
                textAlign: 'center',
                fontSize: 20,
                fontFamily: 'CustomFont1',
                color: `${darkMode ? '#ffffffaa' : '#001447aa'}`,
                fontWeight: 'bold',
              }}
            >
              文章日历
            </div>
            <div ref={heatMapRef} className="calender-heatmap-block" />
          </div>

          <div className="time-line-block">
            <ConfigProvider
              theme={{
                components: {
                  Timeline: {
                    tailColor: `${darkMode ? '#ffffff66' : 'rgb(0, 20, 71)'}`,
                  },
                },
                token: {
                  fontFamily: 'CustomFont1',
                  fontSize: 17,
                  colorText: `${darkMode ? '#ffffffcc' : '#001447cc'}`,
                },
              }}
            >
              <Timeline mode="alternate" items={formattedCommits} />
            </ConfigProvider>
          </div>
        </Card>
      </div>
    </div>
  );
}
