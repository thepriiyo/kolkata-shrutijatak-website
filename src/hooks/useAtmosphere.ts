import { useState, useEffect } from 'react';

export type Prahar = 'bhairav' | 'bilawal' | 'yaman' | 'malkauns';

/**
 * useAtmosphere — The Raga Hora engine.
 * Calculates current Prahar (time-of-day state) based on institutional music theory.
 * 
 * Dawn (06:00 - 10:00)  → Bhairav (Clear, Awakening)
 * Day  (10:00 - 16:00)  → Bilawal (Neutral, Institutional)
 * Dusk (16:00 - 21:00)  → Yaman (Contemplative, Warm)
 * Night(21:00 - 06:00)  → Malkauns (Intimate, Focused)
 */
export function useAtmosphere() {
  const [prahar, setPrahar] = useState<Prahar>('bilawal');

  useEffect(() => {
    const calculatePrahar = () => {
      const hour = new Date().getHours();
      
      if (hour >= 6 && hour < 10) return 'bhairav';
      if (hour >= 10 && hour < 16) return 'bilawal';
      if (hour >= 16 && hour < 21) return 'yaman';
      return 'malkauns';
    };

    setPrahar(calculatePrahar());

    // Update hourly
    const interval = setInterval(() => {
      setPrahar(calculatePrahar());
    }, 60000 * 60);

    return () => clearInterval(interval);
  }, []);

  return prahar;
}
