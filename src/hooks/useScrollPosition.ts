import { useState, useEffect } from 'react';
import { debounce } from '../utils';

interface ScrollPosition {
  scrollY: number;
  scrollX: number;
  isScrolling: boolean;
}

/**
 * Hook to track scroll position
 * @param debounceTime - Time to debounce scroll events in milliseconds
 * @returns Current scroll position
 */
export const useScrollPosition = (debounceTime = 150): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: window.scrollY,
    scrollX: window.scrollX,
    isScrolling: false,
  });
  
  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;
    
    const handleScroll = debounce(() => {
      setScrollPosition({
        scrollY: window.scrollY,
        scrollX: window.scrollX,
        isScrolling: true,
      });
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setScrollPosition(prev => ({
          ...prev,
          isScrolling: false,
        }));
      }, 100);
    }, debounceTime);
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [debounceTime]);
  
  return scrollPosition;
};

export default useScrollPosition;
