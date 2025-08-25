import { useCallback } from 'react';

interface SmoothScrollOptions {
  offset?: number;
  duration?: number;
  easing?: (t: number) => number;
}

// Easing functions
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};

const easeOutQuart = (t: number): number => {
  return 1 - (--t) * t * t * t;
};

export const useSmoothScroll = () => {
  const scrollToElement = useCallback((
    elementId: string, 
    options: SmoothScrollOptions = {}
  ) => {
    const {
      offset = 80,
      duration = 800,
      easing = easeInOutCubic
    } = options;

    const element = document.getElementById(elementId.replace('#', ''));
    if (!element) return;

    const targetPosition = element.offsetTop - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      const easedProgress = easing(progress);
      const currentPosition = startPosition + (distance * easedProgress);
      
      window.scrollTo(0, currentPosition);
      
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, []);

  const scrollToTop = useCallback((options: SmoothScrollOptions = {}) => {
    const {
      duration = 600,
      easing = easeOutQuart
    } = options;

    const startPosition = window.pageYOffset;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      const easedProgress = easing(progress);
      const currentPosition = startPosition * (1 - easedProgress);
      
      window.scrollTo(0, currentPosition);
      
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, []);

  return {
    scrollToElement,
    scrollToTop
  };
};

export default useSmoothScroll;
