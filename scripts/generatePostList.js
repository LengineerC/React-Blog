const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const currentDirectory = process.cwd();

const postsDir = path.join(currentDirectory, 'public', 'posts');
const outputFilePath = path.join(currentDirectory, 'public/json', 'posts.json');

function normalizeName(name) {
  return name.trim().replace(/\s+/g, '_');
}

function getAllMarkdownFiles(dir, baseDir = dir, relativePath = '', category = '未分类') {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    let itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      const normalizedItem = normalizeName(item);
      if (item !== normalizedItem) {
        const newItemPath = path.join(dir, normalizedItem);
        fs.renameSync(itemPath, newItemPath);
        console.log(`Renamed folder: ${item} -> ${normalizedItem}`);
        itemPath = newItemPath;
      }
      
      const subRelativePath = relativePath ? `${relativePath}/${normalizedItem}` : normalizedItem;
      const subCategory = normalizedItem;
      files.push(...getAllMarkdownFiles(itemPath, baseDir, subRelativePath, subCategory));
    } else if (item.endsWith('.md')) {
      const normalizedItem = normalizeName(item);
      if (item !== normalizedItem) {
        const newItemPath = path.join(dir, normalizedItem);
        fs.renameSync(itemPath, newItemPath);
        console.log(`Renamed file: ${item} -> ${normalizedItem}`);
        itemPath = newItemPath;
      }
      
      const relativeFilePath = relativePath ? `${relativePath}/${normalizedItem}` : normalizedItem;
      files.push({
        filePath: itemPath,
        relativePath: relativeFilePath,
        category: category
      });
    }
  }

  return files;
}

const files = getAllMarkdownFiles(postsDir);

const posts = files.map(({ filePath, relativePath, category }) => {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);

  const { categories, ...restData } = data;

  return {
    id: path.basename(relativePath, '.md'),
    tags: data.tags || [],
    category,
    top: false,
    ...restData,
    path: `/posts/${relativePath}`
  };
});

posts.sort((a, b) => new Date(b.time) - new Date(a.time));

fs.writeFileSync(outputFilePath, JSON.stringify(posts, null, 2));

console.log('Generated posts.json succsessfully!');
