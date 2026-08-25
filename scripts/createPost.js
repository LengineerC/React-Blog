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
  console.error('Usage: npm run create-post <category/filename>');
  process.exit(1);
}
const requestedPath = args[0].replace(/\\/g, '/').replace(/\.md$/i, '').trim();
const pathSegments = requestedPath.split('/');

if (
  !requestedPath ||
  path.isAbsolute(requestedPath) ||
  pathSegments.some(segment => !segment || segment === '.' || segment === '..')
) {
  console.error('Error: post path must be a relative category/filename path.');
  process.exit(1);
}

const relativePostPath = pathSegments
  .map(segment => segment.trim().replace(/\s+/g, '_'))
  .join('/');
const filename = path.posix.basename(relativePostPath);

const postsDir = path.join(process.cwd(), 'public', 'posts');
const postImagesDir = path.join(process.cwd(), 'public', 'post-images', relativePostPath);
const newFilePath = path.join(postsDir, `${relativePostPath}.md`);

if (fs.existsSync(newFilePath)) {
  console.error(`Error: File ${newFilePath} already exists.`);
  process.exit(1);
}

const postData = {
  id: filename,
  title: '',
  author: '',
  time: getCurrentTime(),
  abstract: '',
  lock: false,
  top: false,
  tags: [],
  content: '',
};

const frontMatter = matter.stringify(postData.content, {
  title: postData.title,
  author: postData.author,
  time: postData.time,
  abstract: '',
  lock: postData.lock,
  password: '',
  top: postData.top,
});

fs.mkdirSync(path.dirname(newFilePath), { recursive: true });
fs.writeFileSync(newFilePath, frontMatter);
fs.mkdirSync(postImagesDir, { recursive: true });

console.log(`Generated new Markdown file at: ${newFilePath}`);
console.log(`Created post image library at: ${postImagesDir}`);
