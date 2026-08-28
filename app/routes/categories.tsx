import CategoriesPage from '@/pages/CategoriesPage';
import { createPageMeta } from '~/seo';

export const meta = () => createPageMeta('分类', '按照分类浏览博客文章。', '/categories');
export default CategoriesPage;
