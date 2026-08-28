import { useParams } from 'react-router';
import TagDetail from '@/pages/TagDetail';
import { createPageMeta } from '~/seo';

export const meta = ({ params }: { params: Record<string, string | undefined> }) => {
  const tag = params.tag ?? '标签';
  return createPageMeta(tag, `浏览标签“${tag}”下的博客文章。`, `/tags/${encodeURIComponent(tag)}`);
};

export default function TagDetailRoute() {
  useParams();
  return <TagDetail />;
}
