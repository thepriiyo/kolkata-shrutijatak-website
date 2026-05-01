import { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useImageLoad } from '../../hooks/useImageLoad';
import { useProximityGlow } from '../../hooks/useProximityGlow';
import './Section.css';

const programs = [
  {
    title: 'Vocal Heritage',
    category: 'Music',
    description: 'Mastering the nuances of Khayal and Rabindra Sangeet.',
    image: '/assets/gallery/gallery-1.png'
  },
  {
    title: 'Instrumental Mastery',
    category: 'Instruments',
    description: 'The sacred discipline of Esraj, Sitar, and Sarod.',
    image: '/assets/gallery/gallery-2.png'
  },
  {
    title: 'Classical Rhythm',
    category: 'Dance',
    description: 'The expressive language of Kathak and Odissi.',
    image: '/assets/gallery/gallery-3.png'
  }
];

const ProgramCard = ({ program, index }: { program: typeof programs[0]; index: number }) => {
  const cardRef = useProximityGlow<HTMLDivElement>();
  const imgRef = useRef<HTMLImageElement>(null);
  const imgLoaded = useImageLoad(imgRef);

  return (
    <div ref={cardRef} className={`program-card reveal-delay-${index + 1}`}>
      <div className="program-image image-container">
        <img 
          ref={imgRef}
          src={program.image} 
          alt={program.title} 
          className={`img-reveal ${imgLoaded ? 'loaded' : ''}`}
        />
      </div>
      <div className="program-content">
        <span className="eyebrow" style={{marginBottom: '8px'}}>{program.category}</span>
        <h3>{program.title}</h3>
        <p>{program.description}</p>
        <div className="mt-20">
          <a href={`#program-${index}`} className="btn btn-tertiary">View Syllabus →</a>
        </div>
      </div>
    </div>
  );
};

const ProgramsPreview = () => {
  // Standard threshold — not hero-adjacent
  const headerRef = useScrollReveal<HTMLDivElement>(0.2);
  const gridRef = useScrollReveal<HTMLDivElement>(0.12);

  return (
    <section id="programs" className="section-padding bg-warm">
      <div className="container">
        <div ref={headerRef} className="text-center mb-40 reveal">
          <span className="eyebrow">Disciplines</span>
          <h2>The Architecture of Art</h2>
        </div>
        
        <div ref={gridRef} className="programs-grid reveal">
          {programs.map((program, index) => (
            <ProgramCard key={index} program={program} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsPreview;
