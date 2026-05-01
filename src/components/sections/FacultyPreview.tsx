import { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useImageLoad } from '../../hooks/useImageLoad';
import { useProximityGlow } from '../../hooks/useProximityGlow';
import './Section.css';

const faculty = [
  {
    name: 'Smt. Piu Biswas Das',
    role: 'Founder & Principal',
    image: '/assets/people/founder/piu-biswas-das-refined.png'
  },
  {
    name: 'Pandit Somnath Roy',
    role: 'Head of Instrumental',
    image: '/assets/people/faculty/faculty-1-refined.png'
  },
  {
    name: 'Guru Sharmila Sen',
    role: 'Lead Dance Instructor',
    image: '/assets/people/faculty/faculty-2-refined.png'
  }
];

const FacultyCard = ({ member, index }: { member: typeof faculty[0]; index: number }) => {
  const cardRef = useProximityGlow<HTMLDivElement>();
  const imgRef = useRef<HTMLImageElement>(null);
  const imgLoaded = useImageLoad(imgRef);

  return (
    <div ref={cardRef} className={`program-card faculty-card reveal-delay-${index + 1}`}>
      <div className="program-image faculty-image image-container">
        <img 
          ref={imgRef}
          src={member.image} 
          alt={member.name}
          className={`img-reveal ${imgLoaded ? 'loaded' : ''}`}
        />
      </div>
      <div className="program-content">
        <h3>{member.name}</h3>
        <span className="eyebrow" style={{marginBottom: '0'}}>{member.role}</span>
      </div>
    </div>
  );
};

const FacultyPreview = () => {
  const headerRef = useScrollReveal<HTMLDivElement>(0.2);
  const gridRef = useScrollReveal<HTMLDivElement>(0.15);

  return (
    <section id="faculty" className="section-padding">
      <div className="container">
        <div ref={headerRef} className="text-center mb-40 reveal">
          <span className="eyebrow">Expertise</span>
          <h2>Guided by Masters</h2>
        </div>
        
        <div ref={gridRef} className="programs-grid reveal">
          {faculty.map((member, index) => (
            <FacultyCard key={index} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacultyPreview;
