import { useEffect, useRef, useState } from 'react';
import './BrandLogo.css';

interface BrandLogoProps {
  className?: string;
}

const BrandLogo = ({ className = '' }: BrandLogoProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // 500ms delay to match the "Arrival Ceremony" silence
    const timer = setTimeout(() => setIsRevealed(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`brand-logo-container ${className} ${isRevealed ? 'revealed' : ''}`}>
      {/* High-fidelity color isolation filter */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="isolate-logo-lines" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="
            0 0 0 0 1
            0 0 0 0 1
            0 0 0 0 1
            1 1 1 -1.5 0
          "/>
        </filter>
      </svg>
      
      <div className="logo-wrapper">
        {/* The Moon/Sun Reveal */}
        <div className="logo-moon"></div>
        
        {/* The Tree Reveal — Hand-drawn silhouette mask */}
        <div className="logo-artwork-mask">
          <img 
            src="/assets/brand/logo-master.jpg" 
            alt="Kolkata Shrutijatak Logo" 
            className="logo-artwork"
            style={{ filter: 'url(#isolate-logo-lines)' }}
          />
        </div>
        
        {/* Typography reveal layer */}
        <div className="logo-typography-mask"></div>
      </div>
    </div>
  );
};

export default BrandLogo;
