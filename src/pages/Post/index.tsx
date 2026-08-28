import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../components/Card';
import MDRenderer from '../../components/MDRenderer';
import { ConfigProvider, Skeleton, message } from 'antd';
import PageTitle from '../../components/PageTitle';
import {
  UserOutlined,
  ClockCircleOutlined,
  FileWordOutlined,
  CopyrightOutlined,
  LinkOutlined,
  CopyFilled,
} from '@ant-design/icons';
import Tag from '../../components/Tag';
import Category from '../../components/Category';
import { AUTHOR, DEPLOY_ON_GITHUB_PAGES } from '../../utils/constants';
import TOC from './TOC';
import LockCard from './LockCard';
import { useAppSelector } from '../../redux/hooks';
import { copyText } from '@/utils/functions';
import { usePostContext } from '@/context/PostContext';
import { getCachedPostContent, loadPostContent } from '../../services/postContentCache';
import { PostContent } from '../../utils/types';

import './index.scss';

type LoadedPostContent = {
  path: string;
  value: PostContent;
};

function PostContentSkeleton({ darkMode }: { darkMode: boolean }) {
  return (
    <div
      className={`post-content-skeleton ${darkMode ? 'dark' : ''}`}
      aria-busy="true"
      aria-label="文章内容加载中"
    >
      <Skeleton active paragraph={{ rows: 12 }} title={{ width: '42%' }} />
    </div>
  );
}

export default function Post() {
  const id = useParams()['*'];
  const [loadedContent, setLoadedContent] = useState<LoadedPostContent>();
  const [unlockedPostId, setUnlockedPostId] = useState<string>();
  // const [showTOC, setShowTOC] = useState<boolean>(DEFAULT_SHOW_TOC);
  const { showTOC, setInPost, showTOCDrawer, setShowTOCDrawer } = usePostContext();

  //显示移动端TOC Drawer
  // const [showTOCDrawer, setShowTOCDrawer] = useState<boolean>(false);

  const [messageApi, contextHolder] = message.useMessage();
  const [url, setUrl] = useState<string>(window.location.href);

  const darkMode = useAppSelector(state => state.ui.darkMode);
  const postList = useAppSelector(state => state.post.postList);
  const postConfig = useMemo(() => {
    const exactMatch = postList.find(post => post.id === id);
    if (exactMatch || !id?.includes('/')) {
      if (exactMatch) return exactMatch;

      const legacyMatches = postList.filter(
        post => post.id.slice(post.id.lastIndexOf('/') + 1) === id,
      );
      return legacyMatches.length === 1 ? legacyMatches[0] : undefined;
    }

    return undefined;
  }, [id, postList]);
  const content =
    loadedContent && loadedContent.path === postConfig?.contentPath
      ? loadedContent.value
      : undefined;
  const locked = Boolean(postConfig?.lock && unlockedPostId !== id);
  const characterCount = content?.characterCount ?? 0;

  const navigate = useNavigate();

  useEffect(() => {
    setInPost(Boolean(postConfig && !locked));

    return () => setInPost(false);
  }, [locked, postConfig, setInPost]);

  useEffect(() => {
    if (!postConfig || locked) {
      setLoadedContent(undefined);
      return;
    }

    let active = true;
    const contentPath = postConfig.contentPath;
    const cachedContent = getCachedPostContent(contentPath);

    if (cachedContent !== undefined) {
      setLoadedContent({ path: contentPath, value: cachedContent });
      return;
    }

    setLoadedContent(undefined);
    loadPostContent(contentPath)
      .then(postContent => {
        if (active) setLoadedContent({ path: contentPath, value: postContent });
      })
      .catch(err => {
        if (!active) return;
        console.log('Post: 文章获取失败', err);
        navigate(`/articles/${id}`);
      });

    return () => {
      active = false;
    };
  }, [id, locked, navigate, postConfig]);

  useEffect(() => {
    if (!id) {
      navigate('/');
    }

    //处理因锚点导致的复制链接出错的问题
    if (!DEPLOY_ON_GITHUB_PAGES) {
      const url = window.location.href;
      const hashIndex = url.indexOf('#');
      if (hashIndex !== -1) {
        const newUrl = url.substring(0, hashIndex);
        setUrl(newUrl);
      }
    }
  }, [id, navigate]);

  const createTags = () => {
    if (postConfig) {
      const { tags = [] } = postConfig;
      return tags.map((item, index) => {
        return (
          <div key={index} className="post-page-card-header-symbol-tag-block">
            <Tag tag={item} />
          </div>
        );
      });
    }
  };

  const createCategories = () => {
    if (postConfig) {
      const { category } = postConfig;
      return (
        <div key={category} className="post-page-card-header-symbol-category-block">
          <Category category={category} />
        </div>
      );
    }
  };

  const copyLink = async () => {
    if (await copyText(url)) {
      messageApi.open({
        type: 'success',
        content: '已复制到剪贴板',
      });
    } else {
      message.error('复制链接出错');
    }
  };

  // const handleShowTOC = () => {
  //   setShowTOC(!showTOC);
  //   setShowTOCDrawer(!showTOCDrawer);
  // };

  const callbackCloseDrawer = () => {
    setShowTOCDrawer(false);
  };

  // const getTocBtnToken = () => {
  //   let colorBgElevated = darkMode ? '#46466c7b' : '#ffffff7b';
  //   let colorFillContent = darkMode ? '#686894bb' : '#ffffffbb';
  //   let colorText = '#ffffff99';
  //   let token: any = {
  //     colorBgElevated,
  //     colorFillContent,
  //   };
  //   if (darkMode) {
  //     if (!token.hasOwnProperty('colorText')) {
  //       token['colorText'] = colorText;
  //     }
  //   }
  //   return token;
  // };

  return (
    <div className="post-page-main">
      <ConfigProvider
        theme={{
          token: {
            colorBgElevated: '#ffffff80',
            colorFillContent: '#ffffffbb',
          },
          components: {
            Message: {
              contentBg: '#ffffffda',
            },
          },
        }}
      >
        {contextHolder}
        {postConfig ? (
          <>
            <div className="post-page-title">
              <PageTitle title={postConfig.title} />
            </div>

            <div className="post-page-body">
              {!locked ? (
                <>
                  <div
                    className={
                      showTOC
                        ? 'post-page-body-content-container-showtoc'
                        : 'post-page-body-content-container'
                    }
                  >
                    <Card darkMode={darkMode}>
                      <div className="post-page-card-header">
                        <div className="post-page-card-header-symbol">
                          <div className="post-page-card-header-symbol-categories">
                            {createCategories()}
                          </div>

                          <div className="post-page-card-header-symbol-tags">{createTags()}</div>
                        </div>

                        <div className="post-page-card-header-info">
                          <div style={darkMode ? { color: '#ffffffcc' } : {}}>
                            <span style={{ fontWeight: 'bolder' }}>
                              <UserOutlined />
                              &nbsp;作者：
                            </span>

                            <span style={{ whiteSpace: 'normal' }}>{postConfig?.author}</span>
                          </div>

                          <div style={darkMode ? { color: '#ffffffcc' } : {}}>
                            <span style={{ fontWeight: 'bold' }}>
                              <ClockCircleOutlined />
                              &nbsp;发布时间：
                            </span>

                            <span style={{ whiteSpace: 'normal' }}>{postConfig?.time}</span>
                          </div>

                          <div style={darkMode ? { color: '#ffffffcc' } : {}}>
                            <span style={{ fontWeight: 'bold' }}>
                              <FileWordOutlined />
                              &nbsp;文章字数：
                            </span>

                            <span style={{ whiteSpace: 'normal' }}>
                              {content ? (
                                characterCount
                              ) : (
                                <Skeleton.Input
                                  active
                                  className="post-meta-skeleton"
                                  size="small"
                                />
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      <hr className="hr-twill" />

                      <div className={'post-page-card-container'}>
                        {content ? (
                          <MDRenderer darkMode={darkMode} html={content.html} />
                        ) : (
                          <PostContentSkeleton darkMode={darkMode} />
                        )}
                      </div>

                      {content ? (
                        <>
                          <hr className="hr-twill" />

                          <div
                            className={
                              darkMode ? 'post-page-card-footer-dark' : 'post-page-card-footer'
                            }
                          >
                            <div style={{ marginBottom: '5px' }}>
                              <span style={{ fontWeight: 'bold' }}>
                                <LinkOutlined />
                                文章链接：
                                <CopyFilled
                                  className={darkMode ? 'copy-button-dark' : 'copy-button'}
                                  onClick={copyLink}
                                />
                              </span>
                              <a href={url}>{url}</a>
                            </div>
                            <div style={{ marginBottom: '5px' }}>
                              <span style={{ fontWeight: 'bold' }}>
                                <CopyrightOutlined />
                                版权声明：本博客所有文章除特別声明外，均采用{' '}
                                <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
                                  CC BY-NC-SA 4.0
                                </a>{' '}
                                许可协议。转载请注明来源 <a href="/">{AUTHOR}</a>
                              </span>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </Card>
                  </div>

                  <div
                    className={`toc-container ${showTOC ? 'fade-in' : 'fade-out'}`}
                    // style={showTOC?{}:{display:"none"}}
                  >
                    <TOC
                      showDrawer={showTOCDrawer}
                      items={content?.toc ?? []}
                      loading={!content}
                      callbackOnClose={callbackCloseDrawer}
                    />
                  </div>
                </>
              ) : (
                <LockCard
                  onClose={() => {
                    setUnlockedPostId(id);
                  }}
                  password={postConfig?.password}
                />
              )}
            </div>
          </>
        ) : (
          <div className="post-page-body">
            <div
              className={
                showTOC
                  ? 'post-page-body-content-container-showtoc'
                  : 'post-page-body-content-container'
              }
            >
              <Card darkMode={darkMode}>
                <PostContentSkeleton darkMode={darkMode} />
              </Card>
            </div>

            <div className={`toc-container ${showTOC ? 'fade-in' : 'fade-out'}`}>
              <TOC
                callbackOnClose={callbackCloseDrawer}
                items={[]}
                loading
                showDrawer={showTOCDrawer}
              />
            </div>
          </div>
        )}
        {/* {!locked && (
          <ConfigProvider
            theme={{
              token: getTocBtnToken(),
            }}
          >
            <FloatButton
              className="toc-btn"
              icon={<UnorderedListOutlined />}
              onClick={handleShowTOC}
            />
          </ConfigProvider>
        )} */}
      </ConfigProvider>
    </div>
  );
}
