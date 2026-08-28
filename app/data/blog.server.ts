import fs from 'node:fs';
import path from 'node:path';
import type { Categories, FriendUrl, PostConfig, PostContent, Tags } from '@/utils/types';
import type { StoreBootstrapData } from '@/redux/store';

const publicDirectory = path.resolve(process.cwd(), 'public');

function readJson<T>(relativePath: string): T {
  const decodedPath = decodeURIComponent(relativePath).replace(/^\/+/, '');
  const filePath = path.resolve(publicDirectory, decodedPath);

  if (!filePath.startsWith(`${publicDirectory}${path.sep}`)) {
    throw new Error(`Invalid generated data path: ${relativePath}`);
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
}

export function getBootstrapData(): StoreBootstrapData {
  return {
    posts: readJson<PostConfig[]>('json/posts.json'),
    tags: readJson<Tags>('json/tags.json'),
    categories: readJson<Categories>('json/categories.json'),
    friends: readJson<FriendUrl[]>('json/friends.json'),
  };
}

export function getPost(postId: string) {
  const posts = readJson<PostConfig[]>('json/posts.json');
  const exactMatch = posts.find(post => post.id === postId);

  if (exactMatch) return exactMatch;

  if (!postId.includes('/')) {
    const legacyMatches = posts.filter(
      post => post.id.slice(post.id.lastIndexOf('/') + 1) === postId,
    );
    if (legacyMatches.length === 1) return legacyMatches[0];
  }

  return undefined;
}

export function getPostContent(post: PostConfig) {
  return readJson<PostContent>(post.contentPath);
}

export function getAboutContent() {
  return readJson<PostContent>('generated/about.json');
}
