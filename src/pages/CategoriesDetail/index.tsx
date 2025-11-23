import { useParams } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import { PostConfig } from '../../utils/types';
import { saveSelectedPostConfig } from '../../redux/slices/postSlice';
// import actions from "../../redux/actions";
import PostCard from '../../components/PostCard';

import './index.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export default function CategoriesDetail() {
  const { category } = useParams();
  const categoriesDetail = useAppSelector(state => state.taxonomy.categoriesList)[
    category as string
  ];
  const dispatch = useAppDispatch();

  const setSelectedPost = (post: PostConfig) => {
    dispatch(saveSelectedPostConfig(post));
  };

  const createPostCards = () => {
    if (categoriesDetail && categoriesDetail.length > 0) {
      return categoriesDetail.map((post: PostConfig) => {
        return (
          <div
            style={{ width: '100%', marginBottom: '3vh' }}
            onClick={() => setSelectedPost(post)}
            key={post.id}
          >
            <PostCard config={post} key={post.id} limit={250} showLimitContent={true} />
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
