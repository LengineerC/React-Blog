import { Suspense, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Loading from '../Loading';
import FloatBtnGroup from '../FloatBtnGroup';

import './index.scss';

export default function Main() {
  const location = useLocation();
  const navigation = useNavigation();

  const [loadingVisible, setLoadingVisible] = useState(true);
  const startTime = useRef(0);
  const hideTimer = useRef<number | undefined>(undefined);
  const initialRender = useRef(true);
  const navigationInitialized = useRef(false);
  const navigationWasActive = useRef(false);
  const minimum = 700;

  useEffect(() => {
    initialRender.current = false;

    startTime.current = Date.now();
    document.body.style.overflow = 'hidden';
    hideTimer.current = window.setTimeout(() => {
      startTime.current = 0;
      hideTimer.current = undefined;
      setLoadingVisible(false);
      document.body.style.overflow = '';
    }, minimum);
  }, []);

  useEffect(() => {
    if (!navigationInitialized.current) {
      navigationInitialized.current = true;
      return;
    }

    if (hideTimer.current !== undefined) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = undefined;
    }

    if (navigation.state !== 'idle') {
      if (!navigationWasActive.current) startTime.current = Date.now();
      navigationWasActive.current = true;
      setLoadingVisible(true);
      document.body.style.overflow = 'hidden';
      return;
    }

    if (!navigationWasActive.current) return;
    navigationWasActive.current = false;

    const used = Date.now() - startTime.current;
    const remain = Math.max(minimum - used, 0);

    hideTimer.current = window.setTimeout(() => {
      startTime.current = 0;
      hideTimer.current = undefined;
      setLoadingVisible(false);
      document.body.style.overflow = '';
      window.scrollTo({ left: 0, top: 0 });
    }, remain);

    return () => {
      if (hideTimer.current !== undefined) window.clearTimeout(hideTimer.current);
    };
  }, [navigation.state]);

  useEffect(
    () => () => {
      if (hideTimer.current !== undefined) window.clearTimeout(hideTimer.current);
      document.body.style.overflow = '';
    },
    [],
  );

  return (
    <main style={{ position: 'relative' }}>
      <AnimatePresence>
        {loadingVisible && (
          <motion.div
            key="loading"
            initial={initialRender.current ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="route-loading-overlay"
          >
            <Loading />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={location.key}
          initial={initialRender.current ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </motion.div>
      </AnimatePresence>

      {!loadingVisible && <FloatBtnGroup />}
    </main>
  );
}
