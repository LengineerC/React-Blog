const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const getCurrentTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Usage: npm run create-post <filename>');
  process.exit(1);
}
const filename = args[0];

const postsDir = path.join(process.cwd(), 'public', 'posts');
const newFilePath = path.join(postsDir, `${filename}.md`);

if (fs.existsSync(newFilePath)) {
  console.error(`Error: File ${newFilePath} already exists.`);
  process.exit(1);
}

const postData = {
  id: filename,
  title: "",
  author: "",
  time: getCurrentTime(),
  lock: false,
  top: false,
  categories:null,
  tags:null,
  content:""
};

const frontMatter = matter.stringify(postData.content, {
  title: postData.title,
  author: postData.author,
  time: postData.time,
  lock: postData.lock,
  password:'',
  top: postData.top,
//   categories: postData.categories,
//   tags: postData.tags,
});

if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

fs.writeFileSync(newFilePath, frontMatter);

console.log(`Generated new Markdown file at: ${newFilePath}`);