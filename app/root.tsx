import { useRef } from 'react';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from 'react-router';
import App from '@/App';
import { PostProvider } from '@/context/PostContext';
import { createAppStore, type AppStore } from '@/redux/store';
import { CUSTOM_FONT_FAMILY } from '@/utils/constants';
import { getBootstrapData } from '~/data/blog.server';
import { absoluteUrl } from '~/seo';

import '@/index.css';

export function loader() {
  return getBootstrapData();
}

export const meta = () => [
  { title: "LengineerC's Blog | 笔记&生活" },
  {
    name: 'description',
    content: 'LengineerC 的个人博客，记录笔记和个人感兴趣的内容。',
  },
  { name: 'author', content: 'LengineerC' },
  { name: 'robots', content: 'index,follow,max-image-preview:large' },
  { property: 'og:type', content: 'website' },
  { property: 'og:locale', content: 'zh_CN' },
  { property: 'og:site_name', content: "LengineerC's Blog" },
  { property: 'og:title', content: "LengineerC's Blog | 笔记&生活" },
  { property: 'og:description', content: '记录笔记和个人感兴趣的内容。' },
  { property: 'og:url', content: 'https://blog.lengineerc.com/' },
  { name: 'twitter:card', content: 'summary' },
  {
    'script:ld+json': {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: "LengineerC's Blog",
      url: 'https://blog.lengineerc.com/',
      description: 'LengineerC 的个人博客，记录笔记和个人感兴趣的内容。',
      inLanguage: 'zh-CN',
      author: {
        '@type': 'Person',
        name: 'LengineerC',
      },
    },
  },
];

function CanonicalLink() {
  const { pathname } = useLocation();

  return <link rel="canonical" href={absoluteUrl(pathname)} />;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
        <Meta />
        <CanonicalLink />
        <Links />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="preload"
          href="/generated/font-subset.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <style id="bodyStyle" />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  const bootstrapData = useLoaderData<typeof loader>();
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) storeRef.current = createAppStore(bootstrapData);

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: CUSTOM_FONT_FAMILY,
        },
      }}
    >
      <Provider store={storeRef.current}>
        <PostProvider>
          <App />
        </PostProvider>
      </Provider>
    </ConfigProvider>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  const title = isRouteErrorResponse(error) && error.status === 404 ? '404' : '页面加载失败';
  const detail =
    error instanceof Error
      ? error.message
      : isRouteErrorResponse(error)
        ? error.statusText
        : '发生了未知错误';

  return (
    <main>
      <h1>{title}</h1>
      <p>{detail}</p>
      <a href="/">返回首页</a>
    </main>
  );
}
