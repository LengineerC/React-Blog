import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('post/detail/*', 'routes/post.tsx'),
  route('posts', 'routes/posts.tsx'),
  route('archives', 'routes/archives.tsx'),
  route('tags', 'routes/tags.tsx'),
  route('tags/:tag', 'routes/tag-detail.tsx'),
  route('categories', 'routes/categories.tsx'),
  route('categories/:category', 'routes/category-detail.tsx'),
  route('toolbox', 'routes/toolbox.tsx', [
    index('routes/toolbox-index.tsx'),
    route('menu', 'routes/tool-menu.tsx'),
    route('unicode', 'routes/unicode.tsx'),
    route('ipa-input', 'routes/ipa-input.tsx'),
  ]),
  route('media', 'routes/media.tsx'),
  route('friends', 'routes/friends.tsx'),
  route('about', 'routes/about.tsx'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
