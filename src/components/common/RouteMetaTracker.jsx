import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteMeta } from '../../config/seoConfig';
import { applyPageMeta } from '../../hooks/usePageMeta';

/**
 * RouteMetaTracker automatically listens to route changes and updates
 * document.title and meta tags according to seoConfig.js.
 */
export function RouteMetaTracker() {
  const location = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(location.pathname);
    applyPageMeta(meta);
  }, [location.pathname]);

  return null;
}

export default RouteMetaTracker;
