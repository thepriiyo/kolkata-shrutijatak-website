import { useState, useEffect } from 'react';

export type PerformanceTier = 'high' | 'low';

export const usePerformance = (): PerformanceTier => {
  const [tier, setTier] = useState<PerformanceTier>('high');

  useEffect(() => {
    // Basic heuristic for low-end devices
    const isLowEnd = 
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || 
      ((navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4) ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isLowEnd) {
      setTier('low');
    }
  }, []);

  return tier;
};
