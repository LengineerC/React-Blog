const APLAYER_STYLE_ID = 'aplayer-style';
const APLAYER_SCRIPT_ID = 'aplayer-script';
const METING_SCRIPT_ID = 'meting-script';

let assetsPromise: Promise<void> | null = null;

function getAssetUrl(path: string) {
  return `${process.env.PUBLIC_URL || ''}${path}`;
}

function loadStylesheet(id: string, href: string) {
  const existing = document.getElementById(id) as HTMLLinkElement | null;
  if (existing) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => {
      link.remove();
      reject(new Error(`Failed to load stylesheet: ${href}`));
    };
    document.head.appendChild(link);
  });
}

function loadScript(id: string, src: string) {
  const existing = document.getElementById(id) as HTMLScriptElement | null;
  if (existing?.dataset.loaded === 'true') return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const script = existing || document.createElement('script');

    const handleLoad = () => {
      script.dataset.loaded = 'true';
      resolve();
    };
    const handleError = () => {
      script.remove();
      reject(new Error(`Failed to load script: ${src}`));
    };

    script.addEventListener('load', handleLoad, { once: true });
    script.addEventListener('error', handleError, { once: true });

    if (!existing) {
      script.id = id;
      script.src = src;
      script.async = true;
      document.head.appendChild(script);
    }
  });
}

export function loadAPlayerAssets() {
  if (!assetsPromise) {
    assetsPromise = Promise.all([
      loadStylesheet(APLAYER_STYLE_ID, getAssetUrl('/libs/APlayer.min.css')),
      loadScript(APLAYER_SCRIPT_ID, getAssetUrl('/libs/APlayer.min.js')),
    ])
      .then(() => loadScript(METING_SCRIPT_ID, getAssetUrl('/libs/Meting.min.js')))
      .catch(error => {
        assetsPromise = null;
        throw error;
      });
  }

  return assetsPromise;
}
