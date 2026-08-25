import { LRUCache } from '@lengineerc/utils';
import axios from 'axios';

const MAX_CACHE_ENTRIES = 6;
const MAX_CACHEABLE_CHARACTERS_PER_POST = 200_000;

const contentCache = new LRUCache<string, string>(MAX_CACHE_ENTRIES);
const pendingRequests = new Map<string, Promise<string>>();

function cacheContent(path: string, content: string) {
  if (content.length <= MAX_CACHEABLE_CHARACTERS_PER_POST) {
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
    .get<string>(path)
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
