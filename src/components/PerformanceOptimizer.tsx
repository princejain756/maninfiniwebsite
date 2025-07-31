import { useEffect, useRef } from 'react';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({ children }) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      const criticalResources = [
        '/manlogo.png',
        '/intro.mp3'
      ];

      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = resource.endsWith('.png') ? 'image' : 'audio';
        link.href = resource;
        document.head.appendChild(link);
      });
    };

    // Optimize images with lazy loading
    const setupLazyLoading = () => {
      if ('IntersectionObserver' in window) {
        observerRef.current = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observerRef.current?.unobserve(img);
              }
            }
          });
        });

        // Observe all lazy images
        document.querySelectorAll('img[data-src]').forEach(img => {
          observerRef.current?.observe(img);
        });
      }
    };

    // Optimize Core Web Vitals
    const optimizeCoreWebVitals = () => {
      // Optimize Largest Contentful Paint (LCP)
      const optimizeLCP = () => {
        const lcpElements = document.querySelectorAll('img, video, blockquote, div');
        lcpElements.forEach(element => {
          if (element instanceof HTMLImageElement) {
            element.loading = 'eager';
            element.decoding = 'async';
          }
        });
      };

      // Optimize First Input Delay (FID)
      const optimizeFID = () => {
        // Defer non-critical JavaScript
        const deferScripts = () => {
          const scripts = document.querySelectorAll('script[data-defer]');
          scripts.forEach(script => {
            script.setAttribute('defer', '');
          });
        };
        deferScripts();
      };

      // Optimize Cumulative Layout Shift (CLS)
      const optimizeCLS = () => {
        // Reserve space for images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          if (!img.style.aspectRatio) {
            img.style.aspectRatio = '16/9';
          }
        });
      };

      optimizeLCP();
      optimizeFID();
      optimizeCLS();
    };

    // Setup performance monitoring
    const setupPerformanceMonitoring = () => {
      if ('performance' in window) {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
          try {
            const observer = new PerformanceObserver((list) => {
              list.getEntries().forEach((entry) => {
                if (entry.entryType === 'largest-contentful-paint') {
                  console.log('LCP:', entry.startTime);
                }
                if (entry.entryType === 'first-input') {
                  console.log('FID:', entry.processingStart - entry.startTime);
                }
                if (entry.entryType === 'layout-shift') {
                  console.log('CLS:', entry.value);
                }
              });
            });

            observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
          } catch (e) {
            console.warn('Performance monitoring not supported');
          }
        }
      }
    };

    // Initialize optimizations
    preloadCriticalResources();
    setupLazyLoading();
    optimizeCoreWebVitals();
    setupPerformanceMonitoring();

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return <>{children}</>;
};

export default PerformanceOptimizer; 