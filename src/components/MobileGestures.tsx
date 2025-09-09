import { useEffect } from 'react';
import { websiteActions } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const sections = ['home', 'services', 'products', 'about', 'contact'] as const;

export default function MobileGestures() {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) return;

    let startY = 0;
    let startX = 0;
    let touchTime = 0;
    let startTarget: EventTarget | null = null;

    const isInScrollableArea = (target: EventTarget | null) => {
      let el = (target as HTMLElement) || null;
      // Walk up the DOM to see if any ancestor can scroll vertically
      while (el && el !== document.body) {
        const style = window.getComputedStyle(el);
        const overflowY = style.overflowY;
        const canScroll = el.scrollHeight > el.clientHeight;
        if (canScroll && (overflowY === 'auto' || overflowY === 'scroll')) {
          return true;
        }
        el = el.parentElement as HTMLElement | null;
      }
      return false;
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      startY = t.clientY;
      startX = t.clientX;
      touchTime = Date.now();
      startTarget = e.target;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const dt = Date.now() - touchTime;
      if (dt > 300) return; // quicker gestures only

      // Ignore if the interaction started inside a scrollable area
      if (isInScrollableArea(startTarget)) return;

      const touch = e.changedTouches[0];
      const dy = touch.clientY - startY;
      const dx = touch.clientX - startX;

      // Stricter horizontal filter
      if (Math.abs(dx) > 30) return;

      // Threshold (increase to reduce accidental triggers)
      if (Math.abs(dy) < 140) return;

      // Determine current section by nearest element in viewport
      const currentIndex = (() => {
        const tops = sections.map((id) => {
          const el = document.getElementById(id);
          if (!el) return Number.POSITIVE_INFINITY;
          return Math.abs((el.getBoundingClientRect().top || 0));
        });
        let minIdx = 0;
        let minVal = tops[0];
        for (let i = 1; i < tops.length; i++) {
          if (tops[i] < minVal) { minVal = tops[i]; minIdx = i; }
        }
        return minIdx;
      })();

      const nextIndex = dy < 0 ? Math.min(currentIndex + 1, sections.length - 1) : Math.max(currentIndex - 1, 0);
      const nextId = sections[nextIndex];
      websiteActions.scrollToSection(nextId);
    };

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [isMobile]);

  return null;
}

