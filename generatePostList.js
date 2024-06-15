const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 获取当前工作目录
const currentDirectory = process.cwd();

// 定义 posts 目录和输出文件路径
const postsDir = path.join(currentDirectory, 'public', 'posts');
const outputFilePath = path.join(currentDirectory, 'public', 'posts.json');

// 获取所有 Markdown 文件
const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));

// 创建一个数组来存储所有帖子信息
const posts = files.map(file => {
  const filePath = path.join(postsDir, file);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  // 使用 gray-matter 解析 Markdown 文件
  const { data } = matter(fileContents);

  return {
    id: path.basename(file, '.md'),
    ...data,
    path: `/posts/${file}`
  };
});

// 写入 posts.json 文件
fs.writeFileSync(outputFilePath, JSON.stringify(posts, null, 2));

console.log('Generated posts.json with the following posts:', posts);
