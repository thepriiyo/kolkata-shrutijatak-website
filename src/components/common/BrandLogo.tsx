import { useEffect, useRef, useState } from 'react';
import './BrandLogo.css';

interface BrandLogoProps {
  className?: string;
}

const BrandLogo = ({ className = '' }: BrandLogoProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [processedLogo, setProcessedLogo] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Process the logo to extract white lines and turn them gold
    const img = new Image();
    img.src = '/assets/brand/logo-master.jpg';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Luminance threshold for white/light lines
        const luminance = (r + g + b) / 3;
        
        if (luminance > 160) {
          // It's a line — map to Gold (#D4AF37)
          data[i] = 212;     // R
          data[i + 1] = 175; // G
          data[i + 2] = 55;  // B
          // Keep alpha proportional to luminance for soft edges
          data[i + 3] = Math.min(255, (luminance - 140) * 4);
        } else {
          // Background — make transparent
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setProcessedLogo(canvas.toDataURL());
      
      // Trigger reveal after processing
      setTimeout(() => setIsRevealed(true), 300);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Parallax intensities
  const auraTransform = `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`;
  const treeTransform = `translate(${mousePos.x * 60}px, ${mousePos.y * 60}px)`;

  return (
    <div 
      ref={containerRef}
      className={`brand-logo-container ${className} ${isRevealed ? 'revealed' : ''}`}
    >
      {/* Layer 1: Crimson Soul Aura (Intensified) */}
      <div className="logo-aura" style={{ transform: auraTransform }}></div>
      
      <div className="logo-wrapper">
        {/* Layer 2: The Gilded Artwork (Now contains the authentic Moon) */}
        <div 
          className="logo-artwork-parallax" 
          style={{ transform: treeTransform }}
        >
          <div className="logo-artwork-reveal-mask">
            {processedLogo && (
              <img 
                src={processedLogo} 
                alt="Gilded Kolkata Shrutijatak Mark" 
                className="logo-artwork-img"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandLogo;
