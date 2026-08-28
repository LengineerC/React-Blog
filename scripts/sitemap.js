const fs = require('fs');
const path = require('path');

const baseUrl = 'https://blog.lengineerc.com';

const staticRoutes = [
  '/',
  '/posts',
  '/archives',
  '/tags',
  '/categories',
  '/toolbox',
  '/toolbox/menu',
  '/toolbox/unicode',
  '/media',
  '/friends',
  '/about',
];

const posts = require('../public/json/posts.json').filter(post => !post.lock);

const encodePath = value => value.split('/').map(encodeURIComponent).join('/');
const postRoutes = posts.map(post => `/post/detail/${encodePath(post.id)}`);

const tagSet = new Set();
const categorySet = new Set();

posts.forEach(post => {
  post.tags?.forEach(tag => tagSet.add(tag));
  if (post.category) categorySet.add(post.category);
});

const tagRoutes = Array.from(tagSet).map(tag => `/tags/${encodeURIComponent(tag)}`);
const categoryRoutes = Array.from(categorySet).map(cat => `/categories/${encodeURIComponent(cat)}`);

const allRoutes = Array.from(
  new Set([...staticRoutes, ...postRoutes, ...tagRoutes, ...categoryRoutes]),
);
const routeUrl = route => `${baseUrl}${route === '/' ? '/' : `${route}/`}`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    route => `
  <url>
    <loc>${routeUrl(route)}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

const outputPath = path.join(process.cwd(), 'public/sitemap.xml');
fs.writeFileSync(outputPath, sitemap, 'utf-8');

console.log('✅ 自动生成 sitemap.xml 成功，共收录路径:', allRoutes.length);
