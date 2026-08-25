import { useParams } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import { PostConfig } from '../../utils/types';
// import actions from "../../redux/actions";
import PostCard from '../../components/PostCard';

import './index.scss';
import { useAppSelector } from '../../redux/hooks';

export default function CategoriesDetail() {
  const { category } = useParams();
  const categoriesDetail = useAppSelector(state => state.taxonomy.categoriesList)[
    category as string
  ];
  const createPostCards = () => {
    if (categoriesDetail && categoriesDetail.length > 0) {
      return categoriesDetail.map((post: PostConfig) => {
        return (
          <div style={{ width: '100%', marginBottom: '3vh' }} key={post.id}>
            <PostCard config={post} />
          </div>
        );
      });
    }
  };

  return (
    <div className="page-main">
      <div className="page-main-title">
        <PageTitle title={category as string} />
      </div>

      <div className="page-main-content">{createPostCards()}</div>
    </div>
  );
}
