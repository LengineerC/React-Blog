import PostsPage from '@/pages/PostsPage';
import { createPageMeta } from '~/seo';

export const meta = () => createPageMeta('文章', '浏览博客发布的全部文章。', '/posts');
export default PostsPage;
