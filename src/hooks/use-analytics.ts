import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window { gtag?: (...args: any[]) => void }
}

export function useAnalytics(measurementId: string = (import.meta as any).env?.VITE_GA_ID || 'G-4N0C42TBRL') {
  const location = useLocation();

  useEffect(() => {
    if (!measurementId) return;
    const path = location.pathname + location.search + location.hash;
    const title = document.title;
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: title,
        page_location: window.location.href,
        page_path: path,
        send_to: measurementId,
      });
    }
  }, [location, measurementId]);
}

