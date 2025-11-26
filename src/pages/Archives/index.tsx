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
import { GITHUB_REPO, USE_GITHUB_COMMITS } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { MOBILE_MAX_WIDTH } from '../../utils/constants';
import { PostConfig } from '@/utils/types';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
    if (!USE_GITHUB_COMMITS) return;

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

  const createTimelines = () => {
    if (postList.length === 0) return null;

    const postsTimeMap = [...postList]
      .sort((a, b) => Date.parse(b.time) - Date.parse(a.time))
      .reduce((acc, cur) => {
        const date = new Date(cur.time);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        if (!acc.has(year)) {
          const monthMap = new Map();
          monthMap.set(month, [cur]);
          acc.set(year, monthMap);
        } else {
          const monthMap = acc.get(year)!;

          if (!monthMap.has(month)) {
            monthMap.set(month, [cur]);
          } else {
            const posts = monthMap.get(month);
            monthMap.set(month, [...(posts ?? []), cur]);
          }

          acc.set(year, monthMap);
        }

        return acc;
      }, new Map<number, Map<number, PostConfig[]>>());

    const nodes: React.ReactNode[] = [];

    postsTimeMap.forEach((monthMap, year) => {
      const monthItems: any[] = [];

      monthMap.forEach((posts, month) => {
        const monthNode = (
          <div className={`month ${darkMode && 'dark'}`} key={month}>
            {month}
          </div>
        );

        const monthItem = {
          children: <div className="month-placeholder" />,
          dot: monthNode,
          color: darkMode ? '#29b839' : '#67abff',
        };
        monthItems.push(monthItem);

        posts.forEach(post => {
          const postNode = (
            <div
              className="post"
              key={post.id}
            >
              <div
                className='post-title'
                onClick={() => {
                  navigate(`/post/detail/${post.id}`);
                }}
              >
                {post.title}
              </div>
            </div>
          );
          const postItem = {
            label: <div className="date">{post.time.split(' ')[0]}</div>,
            children: postNode,
            color: darkMode ? '#29b839' : '#67abff',
          };

          monthItems.push(postItem);
        });
      });

      const yearNode = (
        <div className="year-block" key={year}>
          <div className="year">
            {year}
            <div className='hr-twill' />
          </div>

          <Timeline items={monthItems} mode='left' />
        </div>
      );

      nodes.push(yearNode);
    });

    return <div className={`post-tl ${darkMode && 'dark'}`}>{nodes}</div>;
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
                    dotBg: 'none',
                  },
                },
                token: {
                  fontFamily: 'CustomFont1',
                  fontSize: 17,
                  colorText: `${darkMode ? '#ffffffcc' : '#001447cc'}`,
                },
              }}
            >
              {
                USE_GITHUB_COMMITS ?
                  <Timeline mode="alternate" items={formattedCommits} /> :
                  createTimelines()
              }
            </ConfigProvider>
          </div>
        </Card>
      </div>
    </div>
  );
}
