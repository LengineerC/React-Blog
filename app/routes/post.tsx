import { useLoaderData, type LoaderFunctionArgs } from 'react-router';
import Post from '@/pages/Post';
import { AUTHOR } from '@/utils/constants';
import { getPost, getPostContent } from '~/data/blog.server';
import { absoluteUrl, encodeRoutePath } from '~/seo';

export function loader({ params }: LoaderFunctionArgs) {
  const postId = params['*']?.replace(/^\/+|\/+$/g, '');
  const post = postId ? getPost(postId) : undefined;

  if (!post) throw new Response('Post not found', { status: 404 });

  return {
    post,
    content: post.lock ? null : getPostContent(post),
  };
}

export const meta = ({ data }: { data?: ReturnType<typeof loader> }) => {
  if (!data) return [{ title: `文章不存在 | LengineerC's Blog` }];

  const { post } = data;
  const pathname = `/post/detail/${encodeRoutePath(post.id)}`;
  const url = absoluteUrl(pathname);
  const pageTitle = `${post.title} | LengineerC's Blog`;
  const robots = post.lock ? 'noindex,nofollow' : 'index,follow,max-image-preview:large';

  return [
    { title: pageTitle },
    { name: 'description', content: post.abstract },
    { name: 'author', content: post.author || AUTHOR },
    { name: 'robots', content: robots },
    { property: 'og:type', content: 'article' },
    { property: 'og:site_name', content: "LengineerC's Blog" },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: post.abstract },
    { property: 'og:url', content: url },
    { property: 'article:published_time', content: post.time.replace(' ', 'T') },
    { property: 'article:author', content: post.author || AUTHOR },
    ...post.tags.map(tag => ({ property: 'article:tag', content: tag })),
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: post.abstract },
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.abstract,
        datePublished: post.time.replace(' ', 'T'),
        inLanguage: 'zh-CN',
        mainEntityOfPage: url,
        author: {
          '@type': 'Person',
          name: post.author || AUTHOR,
        },
        publisher: {
          '@type': 'Person',
          name: AUTHOR,
        },
        keywords: post.tags.join(','),
      },
    },
  ];
};

export default function PostRoute() {
  const { post, content } = useLoaderData<typeof loader>();
  return <Post initialPostConfig={post} initialContent={content ?? undefined} />;
}
