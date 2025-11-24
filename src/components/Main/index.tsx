import { Suspense, useEffect, useRef, useState } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import routes from '../../routes';
import Loading from '../Loading';

export default function Main() {
  const elements = useRoutes(routes);
  const location = useLocation();

  const [loadingVisible, setLoadingVisible] = useState(false);
  const startTime = useRef(0);
  const minimum = 700;

  useEffect(() => {
    startTime.current = Date.now();
    setLoadingVisible(true);
    document.body.style.overflow = 'hidden';
  }, [location.key]);

  const handleFinish = () => {
    const used = Date.now() - startTime.current;
    const remain = Math.max(minimum - used, 0);

    window.scrollTo({
      left: 0,
      top: 0,
    });

    setTimeout(() => {
      setLoadingVisible(false);
      document.body.style.overflow = '';
    }, remain);
  };

  return (
    <main className="relative">
      <AnimatePresence>
        {loadingVisible && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur"
          >
            <Loading />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={location.key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <Suspense fallback={null}>
            <LoadingTracker onFinish={handleFinish} />
            {elements}
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

function LoadingTracker({ onFinish }: { onFinish: () => void }) {
  useEffect(() => onFinish(), []);
  return null;
}
