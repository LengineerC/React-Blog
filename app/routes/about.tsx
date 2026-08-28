import { useLoaderData } from 'react-router';
import About from '@/pages/About';
import { getAboutContent } from '~/data/blog.server';
import { createPageMeta } from '~/seo';

export function loader() {
  return getAboutContent();
}

export const meta = () => createPageMeta('关于', '关于 LengineerC 和这个博客。', '/about');

export default function AboutRoute() {
  const content = useLoaderData<typeof loader>();
  return <About initialContent={content} />;
}
