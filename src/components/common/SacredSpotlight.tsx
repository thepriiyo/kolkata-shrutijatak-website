import React, { useEffect, useRef } from 'react';
import './SacredSpotlight.css';

const SacredSpotlight: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const container = containerRef.current;
      if (!container) return;

      let x, y;
      if ('clientX' in e) {
        x = e.clientX;
        y = e.clientY;
      } else {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      }

      container.style.setProperty('--x', `${x}px`);
      container.style.setProperty('--y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);

  return (
    <div className="sacred-spotlight-system" ref={containerRef} aria-hidden="true">
      <div className="wisdom-layer">
        <div className="calligraphy-bloom"></div>
        <div className="micro-alpona-grid"></div>
      </div>
    </div>
  );
};

export default SacredSpotlight;
