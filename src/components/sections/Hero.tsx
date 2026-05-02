import { useEffect, useState } from 'react';
import BrandLogo from '../common/BrandLogo';
import './Hero.css';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 400); // Faster trigger for the materialization
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`hero hero-centered ${loaded ? 'hero-loaded' : ''}`}>
      <div className="hero-container container">
        <div className="hero-centerpiece">
          {/* Majestic Materializing Mark */}
          <div className="hero-logo-reveal">
            <BrandLogo />
          </div>

          <div className="hero-content-centered">
            <span className="eyebrow hero-reveal hero-reveal-1">Digital Monument of Heritage</span>
            <p className="hero-description hero-reveal hero-reveal-2">
              Preserving and evolving the timeless traditions of Bengali classical arts. <br />
              A near-future sanctuary for music, dance, and culture.
            </p>
            <div className="hero-actions hero-reveal hero-reveal-3">
              <a href="#apply" className="btn btn-primary">Begin Your Journey</a>
              <a href="#programs" className="btn btn-secondary">Explore Disciplines</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero-scroll-indicator hero-reveal hero-reveal-4">
        <div className="scroll-line"></div>
        <span>SCROLL</span>
      </div>
      <div className="hero-texture-overlay"></div>
    </section>
  );
};

export default Hero;
