import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — IntersectionObserver-based reveal.
 * Adds '.revealed' class once element enters viewport. One-shot.
 * Respects prefers-reduced-motion (instant reveal).
 *
 * @param threshold — visibility ratio to trigger (0–1). Default 0.15.
 * @param rootMargin — observer rootMargin. Default '0px 0px -60px 0px'.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px'
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion — reveal instantly
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.classList.add('revealed');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el); // One-shot
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
