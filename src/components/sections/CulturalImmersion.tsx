import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Section.css';

const CulturalImmersion = () => {
  // Shock Moment 2 — slow reveal, standard threshold for reliability
  const contentRef = useScrollReveal<HTMLDivElement>(0.15);

  return (
    <section ref={contentRef} className="cultural-immersion reveal">
      <div className="immersion-bg">
        <img src="/assets/textures/manuscript.png" alt="" className="immersion-texture" />
        <div className="immersion-overlay"></div>
      </div>
      <div className="container immersion-content">
        <div className="immersion-statement text-center">
          <span className="eyebrow gold reveal-delay-1">The Philosophy</span>
          <h2 className="bengali-heading immersion-quote light">
            {"সুর আর শ্রুতি, আত্মার পরম গতি।".split(' ').map((word, i, arr) => (
              <span key={i} className={`word-reveal reveal-delay-${i + 2}`}>
                {word}{i < arr.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h2>
          <p className="reveal-delay-5 muted mx-auto mt-20">
            Melody and rhythm are the ultimate path of the soul. At Shrutijatak, we don't just teach art; 
            we cultivate the spiritual resonance of a civilization.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CulturalImmersion;
