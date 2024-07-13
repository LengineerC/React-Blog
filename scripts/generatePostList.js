const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const currentDirectory = process.cwd();

const postsDir = path.join(currentDirectory, 'public', 'posts');
const outputFilePath = path.join(currentDirectory, 'public/json', 'posts.json');

const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));

const posts = files.map(file => {
  const filePath = path.join(postsDir, file);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const { data } = matter(fileContents);

  return {
    id: path.basename(file, '.md'),
    tags: [],
    categories: [],
    top: false,
    ...data,
    path: `/posts/${file}`
  };
});

posts.sort((a, b) => new Date(b.time) - new Date(a.time));

fs.writeFileSync(outputFilePath, JSON.stringify(posts, null, 2));

console.log('Generated posts.json succsessfully!');
