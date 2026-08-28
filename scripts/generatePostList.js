const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const currentDirectory = process.cwd();
const postsDir = path.join(currentDirectory, 'public', 'posts');
const jsonDir = path.join(currentDirectory, 'public', 'json');
const generatedDir = path.join(currentDirectory, 'public', 'generated');
const generatedPostsDir = path.join(generatedDir, 'posts');
const postImagesDir = path.join(currentDirectory, 'public', 'post-images');
const aboutFilePath = path.join(currentDirectory, 'public', 'aboutme.md');
const outputFilePath = path.join(jsonDir, 'posts.json');
const outputAboutPath = path.join(generatedDir, 'about.json');
const ABSTRACT_MAX_LENGTH = 250;

function normalizeName(name) {
  return name.trim().replace(/\s+/g, '_');
}

function normalizePlainText(markdown) {
  return markdown
    .replace(/<!--[^]*?-->/g, ' ')
    .replace(/(```|~~~)[^\n]*\n[^]*?\1/g, ' ')
    .replace(/\$\$[^]*?\$\$/g, ' ')
    .replace(/\$[^$\n]+\$/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^\s*\|?(?:\s*:?-+:?\s*\|)+\s*$/gm, ' ')
    .replace(/^\s{0,3}(?:#{1,6}|>|[-+*]|\d+[.)])\s+/gm, '')
    .replace(/[|*_~]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function createAbstract(markdown, maxLength = ABSTRACT_MAX_LENGTH) {
  const plainText = normalizePlainText(markdown);
  const characters = Array.from(plainText);
  return characters.length > maxLength
    ? `${characters.slice(0, maxLength).join('')}...`
    : plainText;
}

function getAllMarkdownFiles(dir, relativePath = '', category = '未分类') {
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
      files.push(...getAllMarkdownFiles(itemPath, subRelativePath, normalizedItem));
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
        category,
      });
    }
  }

  return files;
}

function isExternalOrPublicUrl(href) {
  return /^(?:[a-z][a-z\d+.-]*:|\/\/|\/|#)/i.test(href);
}

function normalizeUrlSegment(value) {
  try {
    return encodeURIComponent(decodeURIComponent(value));
  } catch {
    return encodeURIComponent(value);
  }
}

function normalizeUrlPath(value) {
  return value.split('/').map(normalizeUrlSegment).join('/');
}

function resolvePostImageHref(href, postId) {
  if (!href || isExternalOrPublicUrl(href)) return href;

  const suffixIndex = href.search(/[?#]/);
  const imagePath = suffixIndex === -1 ? href : href.slice(0, suffixIndex);
  const suffix = suffixIndex === -1 ? '' : href.slice(suffixIndex);
  const normalizedPath = imagePath.replace(/\\/g, '/');
  const fileName = path.posix.basename(normalizedPath);

  return `/post-images/${normalizeUrlPath(postId)}/${normalizeUrlSegment(fileName)}${suffix}`;
}

function addTocNumbers(items) {
  if (items.length === 0) return [];

  const firstLevel = Math.min(...items.map(item => item.level));
  const counters = new Array(6).fill(0);

  return items.map(item => {
    const levelIndex = item.level - 1;

    for (let index = firstLevel - 1; index < levelIndex; index += 1) {
      if (counters[index] === 0) counters[index] = 1;
    }

    counters[levelIndex] += 1;
    counters.fill(0, levelIndex + 1);

    return {
      ...item,
      listNo: counters.slice(firstLevel - 1, levelIndex + 1).join('.'),
    };
  });
}

function createContentCompiler(postId, { Marked, Renderer, markedHighlight, hljs, markedKatex }) {
  const toc = [];
  const renderer = new Renderer();
  const defaultImageRenderer = renderer.image;
  let headingIndex = 0;

  renderer.heading = function heading(token) {
    const id = `heading-${headingIndex}`;
    headingIndex += 1;

    const headingHtml = this.parser.parseInline(token.tokens);
    const headingText = normalizePlainText(token.text);
    toc.push({
      id,
      level: token.depth,
      text: headingText,
    });

    return `<h${token.depth} id="${id}" data-id="${id}">${headingHtml}</h${token.depth}>\n`;
  };

  renderer.image = function image(token) {
    const href = resolvePostImageHref(token.href, postId);
    const imageHtml = defaultImageRenderer.call(this, { ...token, href });
    return imageHtml.replace('<img ', '<img data-markdown-image="true" ');
  };

  const marked = new Marked(
    { renderer, useNewRenderer: true },
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        const normalizedCode = code.replace(/\r\n?/g, '\n');
        const highlightedCode = hljs
          .highlight(normalizedCode, { language })
          .value.replace(/\r\n?/g, '\n');

        const rawLines = normalizedCode.split('\n');
        const highlightedLines = highlightedCode.split('\n');
        const spanTagPattern = /<\/?span\b[^>]*>/g;
        let carryStack = [];

        const processedCodeLines = rawLines.map((_, index) => {
          const prefix = carryStack.join('');
          const lineHtml = highlightedLines[index] ?? '';
          const safeLine = lineHtml === '' ? '&nbsp;' : lineHtml;

          for (const tag of safeLine.match(spanTagPattern) ?? []) {
            if (tag.startsWith('</')) carryStack.pop();
            else carryStack.push(tag);
          }

          const suffix = carryStack
            .slice()
            .reverse()
            .map(() => '</span>')
            .join('');

          return `<div class="code-row">
            <span class="line-num" data-num="${index + 1}"></span>
            <span class="code-content">${prefix}${safeLine}${suffix}</span>
          </div>`;
        });

        const raw = encodeURIComponent(code);
        return `<code class="hljs language-${language}" data-raw="${raw}">${processedCodeLines.join('')}</code>`;
      },
    }),
  );
  marked.use(markedKatex());

  return content => {
    const html = marked.parse(content);
    if (typeof html !== 'string') {
      throw new Error(`Unexpected asynchronous Markdown result for ${postId}`);
    }

    return {
      html,
      toc: addTocNumbers(toc),
      characterCount: Array.from(content).length,
    };
  };
}

function writeJson(filePath, value, pretty = false) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(value, null, pretty ? 2 : undefined));
}

async function main() {
  const [markedModule, highlightModule, katexModule, highlightJsModule] = await Promise.all([
    import('marked'),
    import('marked-highlight'),
    import('marked-katex-extension'),
    import('highlight.js'),
  ]);
  const dependencies = {
    Marked: markedModule.Marked,
    Renderer: markedModule.Renderer,
    markedHighlight: highlightModule.markedHighlight,
    markedKatex: katexModule.default,
    hljs: highlightJsModule.default,
  };

  fs.mkdirSync(jsonDir, { recursive: true });
  fs.mkdirSync(generatedDir, { recursive: true });
  fs.mkdirSync(postImagesDir, { recursive: true });
  fs.rmSync(generatedPostsDir, { recursive: true, force: true });
  fs.mkdirSync(generatedPostsDir, { recursive: true });

  const posts = getAllMarkdownFiles(postsDir).map(({ filePath, relativePath, category }) => {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const id = relativePath.slice(0, -path.extname(relativePath).length);
    fs.mkdirSync(path.join(postImagesDir, id), { recursive: true });

    const { categories, abstract: configuredAbstract, title: configuredTitle, ...restData } = data;
    const abstract =
      typeof configuredAbstract === 'string' && configuredAbstract.trim()
        ? configuredAbstract.trim()
        : createAbstract(content);
    const title =
      typeof configuredTitle === 'string' && configuredTitle.trim()
        ? configuredTitle.trim()
        : '无标题';
    const postContent = createContentCompiler(id, dependencies)(content);
    const generatedFileName = `${id}.json`;

    writeJson(path.join(generatedPostsDir, generatedFileName), postContent);

    return {
      id,
      tags: data.tags || [],
      category,
      top: false,
      ...restData,
      title,
      abstract,
      contentPath: `/generated/posts/${normalizeUrlPath(generatedFileName)}`,
    };
  });

  posts.sort((a, b) => new Date(b.time) - new Date(a.time));
  writeJson(outputFilePath, posts, true);

  if (fs.existsSync(aboutFilePath)) {
    const aboutMarkdown = fs.readFileSync(aboutFilePath, 'utf8');
    const { content } = matter(aboutMarkdown);
    writeJson(outputAboutPath, createContentCompiler('about', dependencies)(content));
  }

  console.log(`Generated ${posts.length} post contents and posts.json successfully!`);
}

if (require.main === module) {
  main().catch(error => {
    console.error('Failed to generate post contents:', error);
    process.exitCode = 1;
  });
}

module.exports = {
  addTocNumbers,
  resolvePostImageHref,
};
