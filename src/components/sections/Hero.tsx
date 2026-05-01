import { useEffect, useRef, useState } from 'react';
import { useParallax } from '../../hooks/useParallax';
import { useImageLoad } from '../../hooks/useImageLoad';
import './Hero.css';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const objectRef = useParallax<HTMLDivElement>(0.05); // 5% max, within 6% cap
  const imgRef = useRef<HTMLImageElement>(null);
  const imgLoaded = useImageLoad(imgRef);

  // Single mount trigger — one class, CSS handles all delays
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={heroRef} className={`hero ${loaded ? 'hero-loaded' : ''}`}>
      <div className="hero-container container">
        <div className="hero-content">
          <span className="eyebrow hero-reveal hero-reveal-1">Digital Monument of Heritage</span>
          <h1 className="hero-title hero-reveal hero-reveal-2">
            KOLKATA <br />
            <span className="bengali-heading">শ্রুতিজাতক</span>
          </h1>
          <p className="hero-description hero-reveal hero-reveal-3">
            Preserving and evolving the timeless traditions of Bengali classical arts. 
            A near-future sanctuary for music, dance, and culture.
          </p>
          <div className="hero-actions hero-reveal hero-reveal-4">
            <a href="#apply" className="btn btn-primary">Begin Your Journey</a>
            <a href="#programs" className="btn btn-secondary">Explore Disciplines</a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-object-container" ref={objectRef}>
            <img 
              ref={imgRef}
              src="/assets/hero/objects/esraj-transparent.png" 
              alt="Esraj - Traditional Bengali Instrument" 
              className={`hero-object hero-reveal hero-reveal-obj ${imgLoaded ? 'loaded' : ''}`}
            />
            <div className="hero-object-shadow"></div>
          </div>
          <div className="hero-texture-overlay"></div>
        </div>
      </div>
      
      <div className="hero-scroll-indicator hero-reveal hero-reveal-5">
        <div className="scroll-line"></div>
        <span>SCROLL</span>
      </div>
    </section>
  );
};

export default Hero;
