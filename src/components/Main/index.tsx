import { Suspense, useEffect, useState, useRef } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import routes from '../../routes';
import Loading from '../Loading';

import './index.scss';

export default function Main() {
  const elements = useRoutes(routes);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const loadingStartTime = useRef(0);
  const minimumLoadingTime = 700;

  useEffect(() => {
    setIsLoading(true);
    setShowLoading(true);
    loadingStartTime.current = Date.now();
  }, [location.key]);

  const handleLoadingFinish = () => {
    const elapsed = Date.now() - loadingStartTime.current;
    const remaining = Math.max(minimumLoadingTime - elapsed, 0);

    setTimeout(() => {
      setIsLoading(false);
      setShowLoading(false);
    }, remaining);
  };

  return (
    <main>
      <TransitionGroup>
        {showLoading && (
          <CSSTransition in={isLoading} timeout={500} classNames="loading-transition" unmountOnExit>
            <Loading />
          </CSSTransition>
        )}

        <CSSTransition key={location.key} timeout={500} classNames="page-transition">
          <Suspense fallback={<span style={{ display: 'none' }} />}>
            <LoadingTracker onFinish={handleLoadingFinish} />
            {elements}
          </Suspense>
        </CSSTransition>
      </TransitionGroup>
    </main>
  );
}

type Props = {
  onFinish: () => void;
};
function LoadingTracker({ onFinish }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }

    onFinish();
  }, [isMounted, onFinish]);

  return null;
}
