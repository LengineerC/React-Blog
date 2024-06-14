const fs = require('fs');
const path = require('path');

// 获取当前工作目录
const currentDirectory = process.cwd();

const postsDir = path.join(currentDirectory, 'public', 'posts');
const outputFilePath = path.join(currentDirectory, 'public', 'posts.json');
const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));

fs.writeFileSync(outputFilePath, JSON.stringify(files, null, 2));

console.log('Generated posts.json with the following files:', files);
