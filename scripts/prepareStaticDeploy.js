const fs = require('fs');
const path = require('path');

const clientDirectory = path.resolve(process.cwd(), 'build/client');
const generatedNotFoundPath = path.join(clientDirectory, '404', 'index.html');
const notFoundPath = path.join(clientDirectory, '404.html');

if (!fs.existsSync(generatedNotFoundPath)) {
  throw new Error(`Static 404 page was not generated: ${generatedNotFoundPath}`);
}

fs.copyFileSync(generatedNotFoundPath, notFoundPath);
fs.writeFileSync(path.join(clientDirectory, '.nojekyll'), '');

console.log('Prepared build/client for GitHub Pages deployment.');
