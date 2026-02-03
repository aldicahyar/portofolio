"use client";

import { useEffect } from "react";

export function ScrollToTop() {
  useEffect(() => {
    // Disable default browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Force scroll to top on mount (refresh)
    window.scrollTo(0, 0);
    
    // Clear the hash from URL without refreshing the page
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    
    // Optional: Reset to auto when component unmounts (if needed)
    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  return null;
}
