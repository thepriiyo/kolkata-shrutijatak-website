import { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useImageLoad } from '../../hooks/useImageLoad';
import { useParallax } from '../../hooks/useParallax';
import './Section.css';

interface InstitutionalIntroProps {
  onReadMore: () => void;
}

const InstitutionalIntro: React.FC<InstitutionalIntroProps> = ({ onReadMore }) => {
  // Hero-adjacent: higher threshold (0.25) = reveals later for pacing
  const sectionRef = useScrollReveal<HTMLDivElement>(0.25, '0px 0px -80px 0px');
  const portraitRef = useParallax<HTMLDivElement>(0.02);
  const imgRef = useRef<HTMLImageElement>(null);
  const imgLoaded = useImageLoad(imgRef);

  return (
    <section id="about" className="section-padding">
      <div className="container">
        <div ref={sectionRef} className="section-grid reveal">
          <div className="section-visual">
            <div ref={portraitRef} className="image-container main-portrait reveal-scale">
              <img 
                ref={imgRef}
                src="/assets/people/founder/piu-biswas-das-refined.png" 
                alt="Piu Biswas Das — Founder, Kolkata Shrutijatak" 
                className={`img-reveal ${imgLoaded ? 'loaded' : ''}`}
              />
            </div>
          </div>
          <div className="section-text">
            <span className="eyebrow reveal-delay-1">The Foundation</span>
            <h2 className="reveal-delay-2">Founding a Legacy of Sound</h2>
            <p className="mt-20 reveal-delay-3">
              Kolkata Shrutijatak was established by Piu Biswas Das with a singular vision: 
              to create a digital and physical monument that bridges the gap between 
              ancient Bengali traditions and the near-future global landscape.
            </p>
            <p className="mt-20 reveal-delay-3">
              We are not just a school; we are a cultural sanctuary where the resonance 
              of the Esraj and the discipline of classical dance converge to form 
              a new standard of artistic excellence.
            </p>
            <div className="mt-40 reveal-delay-4">
              <button onClick={onReadMore} className="btn btn-tertiary">Read our full story →</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalIntro;
