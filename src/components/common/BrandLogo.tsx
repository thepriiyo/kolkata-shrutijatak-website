import { useRef } from 'react';
import './BrandLogo.css';

interface BrandLogoProps {
  className?: string;
  progress?: number; // 0 to 1
}

/**
 * BrandLogo — The high-fidelity institutional identity.
 * Uses CSS filters to transform the master asset into a gilded artifact.
 * Controlled by the parent's scroll timeline.
 */
const BrandLogo = ({ className = '', progress = 0 }: BrandLogoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter interpolation logic (conceptual, but handled by progress prop)
  // progress 0: blur(20px), opacity 0, sepia(0)
  // progress 1: blur(0), opacity 1, sepia(0.8) gold treatment
  
  return (
    <div 
      ref={containerRef}
      className={`brand-logo-container ${className}`}
      style={{
        '--logo-progress': progress,
        opacity: Math.min(1, progress * 2),
        transform: `scale(${0.95 + progress * 0.05})`,
      } as any}
    >
      <div className="logo-artwork-wrapper">
        <img 
          src="/assets/brand/logo-master.jpg" 
          alt="Kolkata Shrutijatak" 
          className="logo-artwork-img"
        />
        <div className="logo-gold-overlay"></div>
      </div>

      <div className="logo-aura"></div>
    </div>
  );
};

export default BrandLogo;
