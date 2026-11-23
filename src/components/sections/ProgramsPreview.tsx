import React, { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useImageLoad } from '../../hooks/useImageLoad';
import { useProximityGlow } from '../../hooks/useProximityGlow';
import './Section.css';

interface ProgramItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

const programs: ProgramItem[] = [
  {
    id: 'vocal',
    title: 'Vocal Heritage Syllabus',
    category: 'Music',
    description: 'Mastering the nuances of Khayal and Rabindra Sangeet through ancient microtonal breathwork.',
    image: '/assets/gallery/gallery-1.png'
  },
  {
    id: 'instrumental',
    title: 'Instrumental Mastery Syllabus',
    category: 'Instruments',
    description: 'The sacred discipline of Esraj, Sitar, and Sarod harmonic resonance and fret agility.',
    image: '/assets/gallery/gallery-2.png'
  },
  {
    id: 'classical',
    title: 'Classical Rhythm Syllabus',
    category: 'Dance',
    description: 'The expressive geometric language and rhythmic Tatkar footwork of Kathak and Odissi.',
    image: '/assets/gallery/gallery-3.png'
  }
];

interface ProgramCardProps {
  program: ProgramItem;
  index: number;
  onOpenSyllabus: (disciplineId?: string) => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, index, onOpenSyllabus }) => {
  const cardRef = useProximityGlow<HTMLDivElement>();
  const imgRef = useRef<HTMLImageElement>(null);
  const imgLoaded = useImageLoad(imgRef);

  return (
    <div ref={cardRef} className={`program-card reveal-delay-${index + 1}`}>
      {/* Clickable Picture - Redirects to View Syllabus Page */}
      <div 
        className="program-image image-container clickable-syllabus-image"
        onClick={() => onOpenSyllabus(program.id)}
        role="button"
        tabIndex={0}
        aria-label={`Click to view full syllabus for ${program.title}`}
        title={`Click to view ${program.title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenSyllabus(program.id);
          }
        }}
      >
        <img 
          ref={imgRef}
          src={program.image} 
          alt={program.title} 
          className={`img-reveal ${imgLoaded ? 'loaded' : ''}`}
        />
        <div className="image-syllabus-hover-badge">
          <span>View Syllabus ↗</span>
        </div>
      </div>

      <div className="program-content">
        <div className="program-header-row">
          <span className="eyebrow" style={{ marginBottom: 0 }}>{program.category}</span>
          <span className="syllabus-badge-pill">Syllabus Available</span>
        </div>
        <h3>{program.title}</h3>
        <p>{program.description}</p>
        
        {/* Highlighted View Syllabus Option */}
        <div className="mt-20">
          <button 
            onClick={() => onOpenSyllabus(program.id)} 
            className="btn-view-syllabus-highlight"
            aria-label={`View Syllabus for ${program.title}`}
          >
            <span className="highlight-text">View Syllabus</span>
            <span className="highlight-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProgramsPreviewProps {
  onOpenSyllabus: (disciplineId?: string) => void;
}

const ProgramsPreview: React.FC<ProgramsPreviewProps> = ({ onOpenSyllabus }) => {
  const headerRef = useScrollReveal<HTMLDivElement>(0.2);
  const gridRef = useScrollReveal<HTMLDivElement>(0.12);

  return (
    <section id="programs" className="section-padding bg-warm">
      <div className="container">
        <div ref={headerRef} className="text-center mb-40 reveal">
          <span className="eyebrow">Disciplines</span>
          <h2>The Architecture of Art</h2>
          <p className="section-subtitle mt-10" style={{ maxWidth: '640px', margin: '12px auto 0', color: 'var(--muted-gray)' }}>
            Select any discipline or click on any picture to view our comprehensive, codified syllabi preserved under Guru-Shishya Parampara.
          </p>
        </div>
        
        <div ref={gridRef} className="programs-grid reveal">
          {programs.map((program, index) => (
            <ProgramCard 
              key={program.id} 
              program={program} 
              index={index} 
              onOpenSyllabus={onOpenSyllabus} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsPreview;
