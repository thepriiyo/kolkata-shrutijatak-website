import { useEffect, useRef, type RefObject } from 'react';

/**
 * useParallax — lightweight scroll-linked vertical transform.
 * Uses requestAnimationFrame for smooth compositing.
 *
 * Auto-disables on:
 * - Mobile (< 1024px)
 * - prefers-reduced-motion
 *
 * @param speed — displacement factor. Max 0.06 (6%) per user rules.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed = 0.04
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Disable on mobile or reduced motion
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || prefersReduced) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        const offset = (elementCenter - viewportCenter) * speed;
        el.style.transform = `translateY(${offset}px)`;
        ticking = false;
      });
    };

    // Set will-change for GPU compositing
    el.style.willChange = 'transform';

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
      el.style.willChange = '';
      el.style.transform = '';
    };
  }, [speed]);

  return ref;
}
