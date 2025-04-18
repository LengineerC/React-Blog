const fs = require('fs');
const path = require('path');

const baseUrl = 'https://blog.lengineerc.com/#';

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
  '/about'
];

const posts = require('../public/json/posts.json');

const postRoutes = posts.map(post => `/post/detail/${post.id}`);

const tagSet = new Set();
const categorySet = new Set();

posts.forEach(post => {
  post.tags?.forEach(tag => tagSet.add(tag));
  post.categories?.forEach(cat => categorySet.add(cat));
});

const tagRoutes = Array.from(tagSet).map(tag => `/tags/${encodeURIComponent(tag)}`);
const categoryRoutes = Array.from(categorySet).map(cat => `/categories/${encodeURIComponent(cat)}`);

const allRoutes = [...staticRoutes, ...postRoutes, ...tagRoutes, ...categoryRoutes];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

const outputPath = path.join(process.cwd(), 'public/sitemap.xml');
fs.writeFileSync(outputPath, sitemap, 'utf-8');

console.log('✅ 自动生成 sitemap.xml 成功，共收录路径:', allRoutes.length);
