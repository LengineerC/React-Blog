import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Card from '../Card';
import { PostConfig } from '../../utils/types';
import MDRenderer from '../MDRenderer';
import { Skeleton } from 'antd';
import Tag from '../Tag';
import Category from '../Category';
import { useAppSelector } from '../../redux/hooks';
import { DEPLOY_ON_GITHUB_PAGES } from '../../utils/constants';

import './index.scss';

type Props = {
  config: PostConfig;
  limit: number;
  showLimitContent: boolean;
  showFooter?: boolean;
};

export default function PostCard({ config, limit, showLimitContent, showFooter = true }: Props) {
  const [postConfig] = useState<PostConfig>(config);
  const [postTitle, setPostTitle] = useState<string>('');
  const [markdown, SetMarkdown] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const darkMode = useAppSelector(state => state.ui.darkMode);

  useEffect(() => {
    // console.log(postConfig);
    const { title, path } = postConfig;
    let fullPath = DEPLOY_ON_GITHUB_PAGES
      ? `${process.env.PUBLIC_URL}${path}?timestamp=${Date.now()}`
      : `${process.env.PUBLIC_URL}${path}`;

    axios
      .get(fullPath)
      .then(response => {
        // console.log(response);
        setPostTitle(title);
        SetMarkdown(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(`PostCard:文章获取失败: ${path}`, err);
      });

    if (postConfig && postConfig.tags) {
      setTags([...postConfig.tags]);
    }

    if (postConfig) {
      setCategory(postConfig.category);
    }
  }, []);

  const createTags = () => {
    if (tags) {
      return tags.map((item, index) => {
        return (
          <div key={index} className="post-card-tag-container">
            <Tag tag={item} />
          </div>
        );
      });
    }
  };

  const createCategories = () => {
    if (category) {
      return (
        <div key={category} className="post-card-category-container">
          <Category category={category} />
        </div>
      );
    }
  };

  return (
    <div className="hv-center">
      <Card scale={true} darkMode={darkMode}>
        {loading ? (
          <Skeleton active />
        ) : (
          <div className="post-card-main">
            <NavLink to={`/post/detail/${postConfig.id}`} style={{ textDecoration: 'none' }}>
              <div className={darkMode ? 'post-card-title-dark' : 'post-card-title'}>
                {postTitle}
              </div>

              <hr className={darkMode ? 'hr-dashed-dark' : 'hr-dashed'} />

              <div className={darkMode ? 'post-card-content-dark' : 'post-card-content'}>
                <MDRenderer
                  darkMode={darkMode}
                  limit={limit}
                  markdown={markdown}
                  showLimitContent={showLimitContent}
                />
              </div>

              <hr className={darkMode ? 'hr-double-dark' : 'hr-double'} />
            </NavLink>
            {showFooter && (
              <div className={darkMode ? 'post-card-footer-dark' : 'post-card-footer'}>
                <div className="post-card-tags-block">{createTags()}</div>

                <div className="post-card-categories-block">{createCategories()}</div>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
