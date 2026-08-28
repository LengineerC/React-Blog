import Home from '@/pages/Home';
import { createPageMeta } from '~/seo';

export const meta = () =>
  createPageMeta('首页', 'LengineerC 的个人博客，记录笔记和个人感兴趣的内容。', '/');

export default Home;
