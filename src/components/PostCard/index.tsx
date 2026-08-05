import { NavLink } from 'react-router-dom';
import Card from '../Card';
import { PostConfig } from '../../utils/types';
import Tag from '../Tag';
import Category from '../Category';
import { useAppSelector } from '../../redux/hooks';

import './index.scss';

type Props = {
  config: PostConfig;
  showFooter?: boolean;
};

export default function PostCard({ config, showFooter = true }: Props) {
  const darkMode = useAppSelector(state => state.ui.darkMode);
  const { abstract, category, id, tags, title } = config;

  const createTags = () => {
    return tags.map(item => (
      <div key={item} className="post-card-tag-container">
        <Tag tag={item} />
      </div>
    ));
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
        <div className="post-card-main">
          <NavLink to={`/post/detail/${id}`} style={{ textDecoration: 'none' }}>
            <div className={darkMode ? 'post-card-title-dark' : 'post-card-title'}>{title}</div>

            <hr className={darkMode ? 'hr-dashed-dark' : 'hr-dashed'} />

            <div className={darkMode ? 'post-card-content-dark' : 'post-card-content'}>
              {abstract}
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
      </Card>
    </div>
  );
}
