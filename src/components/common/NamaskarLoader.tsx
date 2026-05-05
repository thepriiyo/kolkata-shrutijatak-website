import React, { useEffect, useState } from 'react';
import './NamaskarLoader.css';

interface NamaskarLoaderProps {
  onComplete: () => void;
}

const NamaskarLoader: React.FC<NamaskarLoaderProps> = ({ onComplete }) => {
  const [isFading, setIsFading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (!isImageLoaded) return;

    // High-Velocity Ritual: 1s total duration
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 700);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, isImageLoaded]);

  return (
    <div className={`namaskar-portal ${isFading ? 'fading' : ''} ${isImageLoaded ? 'ready' : 'loading'}`}>
      <div className="namaskar-content">
        <div className="namaskar-hands-wrapper">
          <img 
            src="/assets/ceremony/namaskar.png" 
            alt="Namaskar Greeting" 
            className="namaskar-hands-img"
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
        <div className="namaskar-text">
          নমস্কার
        </div>
      </div>
    </div>
  );
};

export default NamaskarLoader;
