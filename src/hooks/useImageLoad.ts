import { useState, useEffect, useCallback, type RefObject } from 'react';

/**
 * useImageLoad — progressive image load transition.
 * Returns [ref, isLoaded] pair.
 * CSS handles the visual: blur(8px) + opacity 0.6 → blur(0) + opacity 1.
 * The hook manages the `loaded` class on the img element.
 */
export function useImageLoad<T extends HTMLImageElement = HTMLImageElement>(
  ref: RefObject<T | null>
): boolean {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const img = ref.current;
    if (!img) return;

    // If already cached / complete
    if (img.complete && img.naturalWidth > 0) {
      setIsLoaded(true);
      return;
    }

    img.addEventListener('load', handleLoad);
    return () => img.removeEventListener('load', handleLoad);
  }, [ref, handleLoad]);

  return isLoaded;
}
