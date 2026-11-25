import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop ensures every route transition scrolls window back to the top (0, 0),
 * resolving the issue where scrolling down on one page carries over to the next page.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instant scroll to the top of the document
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    
    // Fallback for body/documentElement in some browsers
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;
