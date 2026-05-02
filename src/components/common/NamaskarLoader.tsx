import React, { useEffect, useState } from 'react';
import './NamaskarLoader.css';

interface NamaskarLoaderProps {
  onComplete: () => void;
}

const NamaskarLoader: React.FC<NamaskarLoaderProps> = ({ onComplete }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fading out at 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2500);

    // Call onComplete at 3.3 seconds (after fade animation)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`namaskar-portal ${isFading ? 'fading' : ''}`}>
      <div className="namaskar-hands-wrapper">
        <img 
          src="/assets/ceremony/namaskar.png" 
          alt="Namaskar Greeting" 
          className="namaskar-hands-img"
        />
      </div>
      <div className="namaskar-text">
        নমস্কার
      </div>
    </div>
  );
};

export default NamaskarLoader;
