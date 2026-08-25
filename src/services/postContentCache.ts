import { LRUCache } from '@lengineerc/utils';
import axios from 'axios';
import { PostContent } from '../utils/types';

const MAX_CACHE_ENTRIES = 6;
const MAX_CACHEABLE_CHARACTERS_PER_POST = 200_000;

const contentCache = new LRUCache<string, PostContent>(MAX_CACHE_ENTRIES);
const pendingRequests = new Map<string, Promise<PostContent>>();

function cacheContent(path: string, content: PostContent) {
  if (content.html.length <= MAX_CACHEABLE_CHARACTERS_PER_POST) {
    contentCache.set(path, content);
  }
}

export function getCachedPostContent(path: string) {
  return contentCache.get(path);
}

export function loadPostContent(path: string) {
  const cachedContent = getCachedPostContent(path);
  if (cachedContent !== undefined) return Promise.resolve(cachedContent);

  const pendingRequest = pendingRequests.get(path);
  if (pendingRequest) return pendingRequest;

  const request = axios
    .get<PostContent>(path)
    .then(response => {
      const content = response.data;
      cacheContent(path, content);
      return content;
    })
    .finally(() => {
      pendingRequests.delete(path);
    });

  pendingRequests.set(path, request);
  return request;
}
