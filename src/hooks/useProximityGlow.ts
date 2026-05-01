import { useEffect, useRef, type RefObject } from 'react';

/**
 * useProximityGlow — Senses cursor proximity.
 * Sets --proximity (0-1) based on distance (max 200px).
 */
export function useProximityGlow<T extends HTMLElement = HTMLDivElement>(
  maxDistance = 200
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Desktop only
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );
      
      const proximity = Math.max(0, 1 - distance / maxDistance);
      el.style.setProperty('--proximity', proximity.toFixed(3));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [maxDistance]);

  return ref;
}
