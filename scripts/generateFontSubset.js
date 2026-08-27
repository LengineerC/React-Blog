const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { spawnSync } = require('child_process');

const projectRoot = process.cwd();
const sourceFontPath = path.join(projectRoot, 'src', 'assets', 'fonts', 'font.woff2');
const outputFontPath = path.join(projectRoot, 'public', 'generated', 'font-subset.woff2');
const outputMetadataPath = path.join(projectRoot, '.font-subset-cache.json');
const textExtensions = new Set([
  '.css',
  '.html',
  '.js',
  '.jsx',
  '.json',
  '.md',
  '.scss',
  '.ts',
  '.tsx',
]);
const scanTargets = [
  path.join(projectRoot, 'src'),
  path.join(projectRoot, 'public', 'posts'),
  path.join(projectRoot, 'public', 'aboutme.md'),
  path.join(projectRoot, 'public', 'index.html'),
  path.join(projectRoot, 'public', 'manifest.json'),
  path.join(projectRoot, 'public', 'json', 'friends.json'),
];

function collectText(targetPath) {
  if (!fs.existsSync(targetPath)) return '';

  const stat = fs.statSync(targetPath);
  if (stat.isDirectory()) {
    return fs
      .readdirSync(targetPath)
      .map(entry => collectText(path.join(targetPath, entry)))
      .join('');
  }

  return textExtensions.has(path.extname(targetPath)) ? fs.readFileSync(targetPath, 'utf8') : '';
}

function formatBytes(bytes) {
  return `${(bytes / 1024).toFixed(1)} KiB`;
}

function main() {
  if (!fs.existsSync(sourceFontPath)) {
    throw new Error(`Source font not found: ${sourceFontPath}`);
  }

  // Always retain printable ASCII. Dynamic non-ASCII text that is not present at
  // build time falls back to the configured local/system font stack.
  const printableAscii = Array.from({ length: 95 }, (_, index) =>
    String.fromCodePoint(0x20 + index),
  ).join('');
  const text = printableAscii + scanTargets.map(collectText).join('');
  const uniqueCharacters = Array.from(new Set(Array.from(text))).join('');
  const fingerprint = crypto
    .createHash('sha256')
    .update(fs.readFileSync(sourceFontPath))
    .update('\0')
    .update(uniqueCharacters)
    .digest('hex');

  if (fs.existsSync(outputFontPath) && fs.existsSync(outputMetadataPath)) {
    const metadata = JSON.parse(fs.readFileSync(outputMetadataPath, 'utf8'));
    if (metadata.fingerprint === fingerprint) {
      console.log(`Font subset is up to date: ${formatBytes(fs.statSync(outputFontPath).size)}`);
      return;
    }
  }

  const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'react-blog-font-'));
  const characterFilePath = path.join(temporaryDirectory, 'characters.txt');
  const temporaryFontPath = path.join(temporaryDirectory, 'font-subset.woff2');

  try {
    fs.writeFileSync(characterFilePath, uniqueCharacters, 'utf8');

    const result = spawnSync(
      'pyftsubset',
      [
        sourceFontPath,
        `--text-file=${characterFilePath}`,
        '--flavor=woff2',
        '--layout-features=*',
        '--notdef-glyph',
        '--recommended-glyphs',
        `--output-file=${temporaryFontPath}`,
      ],
      { encoding: 'utf8' },
    );

    if (result.error?.code === 'ENOENT') {
      throw new Error(
        'pyftsubset was not found. Install FontTools and Brotli first: pip install fonttools brotli',
      );
    }
    if (result.status !== 0) {
      throw new Error(result.stderr || result.stdout || 'pyftsubset failed');
    }

    fs.mkdirSync(path.dirname(outputFontPath), { recursive: true });
    fs.copyFileSync(temporaryFontPath, outputFontPath);
    fs.writeFileSync(
      outputMetadataPath,
      JSON.stringify({ fingerprint, characterCount: Array.from(uniqueCharacters).length }),
    );

    const sourceSize = fs.statSync(sourceFontPath).size;
    const subsetSize = fs.statSync(outputFontPath).size;
    const reduction = ((1 - subsetSize / sourceSize) * 100).toFixed(1);

    console.log(
      `Generated font subset with ${Array.from(uniqueCharacters).length} characters: ` +
        `${formatBytes(subsetSize)} (${reduction}% smaller than the full WOFF2)`,
    );
  } finally {
    fs.rmSync(temporaryDirectory, { recursive: true, force: true });
  }
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error('Failed to generate font subset:', error);
    process.exitCode = 1;
  }
}

module.exports = { collectText };
