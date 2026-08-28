import type { Config } from '@react-router/dev/config';
import fs from 'node:fs';
import path from 'node:path';

type GeneratedPost = {
  id: string;
  tags?: string[];
  category?: string;
  lock?: boolean;
};

const staticPaths = [
  '/',
  '/posts',
  '/archives',
  '/tags',
  '/categories',
  '/toolbox',
  '/toolbox/menu',
  '/toolbox/unicode',
  '/toolbox/ipa-input',
  '/media',
  '/friends',
  '/about',
  '/404',
];

function getPrerenderPaths() {
  const postsPath = path.resolve(process.cwd(), 'public/json/posts.json');
  const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8')) as GeneratedPost[];
  const publicPosts = posts.filter(post => !post.lock);
  const tags = new Set(publicPosts.flatMap(post => post.tags ?? []));
  const categories = new Set(publicPosts.map(post => post.category).filter(Boolean) as string[]);

  return [
    ...staticPaths,
    ...posts.map(post => `/post/detail/${post.id}`),
    ...Array.from(tags, tag => `/tags/${tag}`),
    ...Array.from(categories, category => `/categories/${category}`),
  ];
}

export default {
  // Every public URL is still emitted as a static HTML file. Keeping SSR mode
  // enabled makes the prerendered route data and metadata hydrate identically
  // in the browser; only build/client is deployed to GitHub Pages.
  ssr: true,
  prerender: {
    paths: getPrerenderPaths(),
    concurrency: 4,
  },
  routeDiscovery: {
    mode: 'initial',
  },
} satisfies Config;
