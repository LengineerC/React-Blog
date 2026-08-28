import Archives from '@/pages/Archives';
import { createPageMeta } from '~/seo';

export const meta = () => createPageMeta('归档', '按照年份和月份浏览博客文章。', '/archives');
export default Archives;
