import { useEffect, useState } from 'react';

/**
 * useScrollProgress — Tracks global scroll depth.
 * Updates --scroll-progress (0-1) and --atmosphere-warmth (0-1).
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = window.scrollY / totalHeight;
          
          setProgress(currentProgress);
          
          // Update CSS global variables
          document.documentElement.style.setProperty('--scroll-progress', currentProgress.toString());
          
          // Atmosphere warmth: maps 0-1 progress to 0-1 warmth variable
          document.documentElement.style.setProperty('--atmosphere-warmth', currentProgress.toString());
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}
