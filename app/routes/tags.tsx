import TagsPage from '@/pages/TagsPage';
import { createPageMeta } from '~/seo';

export const meta = () => createPageMeta('标签', '按照标签浏览博客文章。', '/tags');
export default TagsPage;
