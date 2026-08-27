import { useEffect, useMemo, useRef, useState } from 'react';
import { ConfigProvider, Timeline } from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
  LockOutlined,
  TagsOutlined,
} from '@ant-design/icons';
import * as echarts from 'echarts/core';
import { CalendarComponent, TooltipComponent, VisualMapComponent } from 'echarts/components';
import { HeatmapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Card from '../../components/Card';
import { CUSTOM_FONT_FAMILY, GITHUB_REPO, USE_GITHUB_COMMITS } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { PostConfig } from '@/utils/types';

import './index.scss';

echarts.use([
  CalendarComponent,
  TooltipComponent,
  VisualMapComponent,
  HeatmapChart,
  CanvasRenderer,
]);

type ArchiveMonth = {
  month: number;
  posts: PostConfig[];
};

type ArchiveYear = {
  year: number;
  postCount: number;
  months: ArchiveMonth[];
};

const padNumber = (value: number) => value.toString().padStart(2, '0');

const getPostDateParts = (time: string) => {
  const [date] = time.split(' ');
  const [year, month, day] = date.split('-').map(Number);
  return { date, year, month, day };
};

const createArchiveGroups = (posts: PostConfig[]): ArchiveYear[] => {
  const groupedPosts = new Map<number, Map<number, PostConfig[]>>();

  [...posts]
    .sort((a, b) => b.time.localeCompare(a.time))
    .forEach(post => {
      const { year, month } = getPostDateParts(post.time);
      const months = groupedPosts.get(year) ?? new Map<number, PostConfig[]>();
      months.set(month, [...(months.get(month) ?? []), post]);
      groupedPosts.set(year, months);
    });

  return Array.from(groupedPosts, ([year, months]) => ({
    year,
    postCount: Array.from(months.values()).reduce(
      (total, monthPosts) => total + monthPosts.length,
      0,
    ),
    months: Array.from(months, ([month, monthPosts]) => ({ month, posts: monthPosts })),
  }));
};

const createHeatmapData = (year: number, posts: PostConfig[]): [string, number][] => {
  const postCounts = posts.reduce((counts, post) => {
    const { date, year: postYear } = getPostDateParts(post.time);
    if (postYear === year) counts.set(date, (counts.get(date) ?? 0) + 1);
    return counts;
  }, new Map<string, number>());

  const data: [string, number][] = [];
  const date = new Date(year, 0, 1);

  while (date.getFullYear() === year) {
    const dateText = `${year}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`;
    data.push([dateText, postCounts.get(dateText) ?? 0]);
    date.setDate(date.getDate() + 1);
  }

  return data;
};

const formatCommitData = (rawDataArr: any[]) => {
  if (!rawDataArr || rawDataArr.length === 0) return [];

  return rawDataArr.map((item: any, index: number) => {
    const { message } = item.commit;
    const { date } = item.commit.committer;
    const dateText = date.replace('T', ' ').replace(/Z$/, '');

    return {
      children: `${dateText}\t${message}`,
      color: index === 0 ? 'green' : index === rawDataArr.length - 1 ? 'blue' : 'grey',
    };
  });
};

export default function Archives() {
  const heatMapRef = useRef<HTMLDivElement>(null);
  const darkMode = useAppSelector(state => state.ui.darkMode);
  const postList = useAppSelector(state => state.post.postList);
  const githubRepoCommits = useAppSelector(state => state.app.githubRepoCommits);
  const dispatch = useAppDispatch();

  const archiveGroups = useMemo(() => createArchiveGroups(postList), [postList]);
  const availableYears = useMemo(() => archiveGroups.map(group => group.year), [archiveGroups]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (availableYears.length > 0 && !availableYears.includes(selectedYear)) {
      setSelectedYear(availableYears[0]);
    }
  }, [availableYears, selectedYear]);

  const heatmapData = useMemo(
    () => createHeatmapData(selectedYear, postList),
    [postList, selectedYear],
  );
  const selectedYearPostCount = useMemo(
    () => archiveGroups.find(group => group.year === selectedYear)?.postCount ?? 0,
    [archiveGroups, selectedYear],
  );
  const activeMonthCount = useMemo(
    () => archiveGroups.reduce((total, group) => total + group.months.length, 0),
    [archiveGroups],
  );
  const latestPost = archiveGroups[0]?.months[0]?.posts[0];
  const formattedCommits = useMemo(() => formatCommitData(githubRepoCommits), [githubRepoCommits]);

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
    const container = heatMapRef.current;
    if (!container) return;

    const heatMap = echarts.init(container);
    const textColor = darkMode ? '#ffffffb8' : '#18345faa';
    const emptyColor = darkMode ? '#34344a' : '#e8eef5';

    heatMap.setOption({
      tooltip: {
        confine: true,
        textStyle: { fontFamily: CUSTOM_FONT_FAMILY },
        formatter: (params: any) => {
          const [date, count] = params.value;
          return `${date}<br/>发布 ${count} 篇文章`;
        },
      },
      visualMap: {
        min: 0,
        max: 4,
        type: 'piecewise',
        selectedMode: false,
        orient: 'horizontal',
        left: 'center',
        top: 4,
        textStyle: {
          color: textColor,
          fontFamily: CUSTOM_FONT_FAMILY,
          fontWeight: 'bold',
        },
        pieces: [
          { min: 4, label: '4+', color: darkMode ? '#2ea44f' : '#2368b5' },
          { value: 3, label: '3', color: darkMode ? '#3fb950' : '#4b8fd0' },
          { value: 2, label: '2', color: darkMode ? '#56d364' : '#76addb' },
          { value: 1, label: '1', color: darkMode ? '#9be9a8' : '#b2cee5' },
          { value: 0, label: '0', color: emptyColor },
        ],
      },
      calendar: {
        top: 52,
        left: 28,
        right: 28,
        cellSize: [14, 14],
        range: selectedYear,
        splitLine: { show: false },
        itemStyle: {
          borderWidth: 3,
          borderColor: darkMode ? '#242437' : '#f8fbff',
          borderRadius: 3,
        },
        dayLabel: {
          firstDay: 1,
          nameMap: 'EN',
          color: textColor,
          fontFamily: CUSTOM_FONT_FAMILY,
        },
        monthLabel: {
          nameMap: 'EN',
          color: textColor,
          fontFamily: CUSTOM_FONT_FAMILY,
        },
        yearLabel: { show: false },
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: heatmapData,
      },
    });

    const resizeChart = () => heatMap.resize();
    const resizeObserver = new ResizeObserver(resizeChart);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      heatMap.dispose();
    };
  }, [darkMode, heatmapData, selectedYear]);

  const renderPostArchive = () => {
    if (archiveGroups.length === 0) {
      return <div className="archive-empty">文章加载中，时间线马上就好。</div>;
    }

    return archiveGroups.map(group => (
      <section className="archive-year" key={group.year} aria-labelledby={`archive-${group.year}`}>
        <header className="archive-year-header">
          <div className="archive-year-number" id={`archive-${group.year}`}>
            {group.year}
          </div>
          <div className="archive-year-meta">
            {group.postCount} 篇文章 · {group.months.length} 个活跃月份
          </div>
          <div className="archive-year-line" />
        </header>

        <div className="archive-months">
          {group.months.map(monthGroup => (
            <section className="archive-month" key={monthGroup.month}>
              <div className="archive-month-marker" aria-label={`${monthGroup.month}月`}>
                <strong>{padNumber(monthGroup.month)}</strong>
                <span>月</span>
              </div>

              <div className="archive-month-content">
                <header className="archive-month-header">
                  <span>{monthGroup.month} 月</span>
                  <small>{monthGroup.posts.length} 篇</small>
                </header>

                <ul className="archive-post-list">
                  {monthGroup.posts.map(post => {
                    const { day } = getPostDateParts(post.time);

                    return (
                      <li className="archive-post" key={post.id}>
                        <Link className="archive-post-link" to={`/post/detail/${post.id}`}>
                          <time dateTime={post.time.replace(' ', 'T')}>
                            {padNumber(monthGroup.month)}-{padNumber(day)}
                          </time>
                          <span className="archive-post-title">
                            {post.lock ? <LockOutlined aria-label="加密文章" /> : null}
                            <span className="archive-post-title-text">{post.title}</span>
                          </span>
                          <span className="archive-post-meta">
                            <span className="archive-category">
                              <FolderOpenOutlined />
                              <span className="archive-label-text">{post.category}</span>
                            </span>
                            {post.tags.slice(0, 2).map(tag => (
                              <span className="archive-tag" key={`${post.id}-${tag}`}>
                                <span className="archive-label-text">#{tag}</span>
                              </span>
                            ))}
                            {post.tags.length > 2 ? (
                              <span className="archive-tag-more">+{post.tags.length - 2}</span>
                            ) : null}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </section>
    ));
  };

  const overviewItems = [
    { icon: <FileTextOutlined />, label: '文章总数', value: postList.length, suffix: '篇' },
    { icon: <CalendarOutlined />, label: '创作年份', value: availableYears.length, suffix: '年' },
    { icon: <TagsOutlined />, label: '活跃月份', value: activeMonthCount, suffix: '个月' },
    {
      icon: <ClockCircleOutlined />,
      label: '最近更新',
      value: latestPost ? getPostDateParts(latestPost.time).date : '--',
      suffix: '',
    },
  ];

  return (
    <div className="page-main archives-page">
      <div className="page-main-title">
        <PageTitle title="Archives" />
      </div>

      <div className="page-main-content archives-page-content">
        <Card className="card" darkMode={darkMode}>
          <div className={`archives-dashboard ${darkMode ? 'dark' : ''}`}>
            <section className="archive-overview" aria-labelledby="archive-overview-title">
              <div className="archive-overview-copy">
                <span className="archive-eyebrow">ARCHIVO DEL BLOG</span>
                <h2 id="archive-overview-title">Konservu la travivitajn tagojn en la tempo</h2>
                <p>
                  Sieh dir die Erstellungshäufigkeit im Kalender an oder blättere Monat für Monat
                  durch jeden Eintrag.
                </p>
              </div>

              <div className="archive-stats">
                {overviewItems.map(item => (
                  <div className="archive-stat" key={item.label}>
                    <span className="archive-stat-icon">{item.icon}</span>
                    <span className="archive-stat-copy">
                      <small>{item.label}</small>
                      <strong>
                        {item.value}
                        {item.suffix ? <em>{item.suffix}</em> : null}
                      </strong>
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="archive-calendar" aria-labelledby="archive-calendar-title">
              <header className="archive-section-header">
                <div>
                  <span className="archive-section-icon">
                    <CalendarOutlined />
                  </span>
                  <div>
                    <h2 id="archive-calendar-title">文章日历</h2>
                    <p>
                      {selectedYear} 年发布了 {selectedYearPostCount} 篇文章
                    </p>
                  </div>
                </div>

                <div className="archive-year-switcher" aria-label="切换文章日历年份">
                  {(availableYears.length > 0 ? availableYears : [selectedYear]).map(year => (
                    <button
                      type="button"
                      className={year === selectedYear ? 'active' : ''}
                      onClick={() => setSelectedYear(year)}
                      aria-pressed={year === selectedYear}
                      key={year}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </header>

              <div className="archive-calendar-scroll">
                <div ref={heatMapRef} className="archive-calendar-chart" />
              </div>
            </section>

            <section className="archive-timeline" aria-labelledby="archive-timeline-title">
              <header className="archive-section-header archive-timeline-header">
                <div>
                  <span className="archive-section-icon">
                    <ClockCircleOutlined />
                  </span>
                  <div>
                    <h2 id="archive-timeline-title">文章时间线</h2>
                    <p>共 {postList.length} 篇记录，按发布时间由近到远排列</p>
                  </div>
                </div>
              </header>

              {USE_GITHUB_COMMITS ? (
                <ConfigProvider
                  theme={{
                    components: {
                      Timeline: {
                        tailColor: darkMode ? '#ffffff66' : '#18345f66',
                        dotBg: 'transparent',
                      },
                    },
                  }}
                >
                  <Timeline
                    className="archive-commit-timeline"
                    mode="alternate"
                    items={formattedCommits}
                  />
                </ConfigProvider>
              ) : (
                <div className="archive-years">{renderPostArchive()}</div>
              )}
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
}
