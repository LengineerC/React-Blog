const SITE_URL = 'https://blog.lengineerc.com';
const SITE_NAME = "LengineerC's Blog";

export function absoluteUrl(pathname: string) {
  const normalizedPath = pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`;

  return new URL(normalizedPath, SITE_URL).toString();
}

export function createPageMeta(title: string, description: string, pathname: string) {
  const pageTitle = `${title} | ${SITE_NAME}`;
  const url = absoluteUrl(pathname);

  return [
    { title: pageTitle },
    { name: 'description', content: description },
    { name: 'robots', content: 'index,follow,max-image-preview:large' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: description },
  ];
}

export function encodeRoutePath(value: string) {
  return value
    .split('/')
    .map(segment => encodeURIComponent(segment))
    .join('/');
}
