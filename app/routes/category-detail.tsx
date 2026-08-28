import CategoriesDetail from '@/pages/CategoriesDetail';
import { createPageMeta } from '~/seo';

export const meta = ({ params }: { params: Record<string, string | undefined> }) => {
  const category = params.category ?? '分类';
  return createPageMeta(
    category,
    `浏览分类“${category}”下的博客文章。`,
    `/categories/${encodeURIComponent(category)}`,
  );
};

export default CategoriesDetail;
