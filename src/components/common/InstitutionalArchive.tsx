import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import './InstitutionalArchive.css';

interface ArchiveContent {
  title: string;
  subtitle: string;
  body: string[];
  cta?: string;
}

const archiveData: Record<string, ArchiveContent> = {
  'about-full': {
    title: 'The Shrutijatak Chronicle',
    subtitle: 'From Heritage to Horizon',
    body: [
      'Founded in the heart of Kolkata, Shrutijatak was born from a realization: that the microtonal beauty of Indian classical music was being flattened by the digital age. Our founder, Piu Biswas Das, envisioned a "Digital Monument"—a space where the ancient discipline of the Guru-Shishya parampara could be preserved through modern high-fidelity engineering.',
      'Our journey began with a single Esraj and a commitment to precision. Today, we stand as a beacon for those who seek not just to learn, but to inhabit the soundscapes of our ancestors.',
      'We believe that the "Shruti" (the heard sound) is the bridge between the physical and the spiritual. Every program we offer is a brick in this monument.'
    ]
  },
  'syllabus-vocal': {
    title: 'Vocal Heritage Syllabus',
    subtitle: 'Mastering the Breath of Bengal',
    body: [
      'Level 1: The Alap. Focus on breath control (Pranayama) and the fundamental Sa-Pa harmonic relationship.',
      'Level 2: Raganga Study. Exploration of early morning Prahar ragas including Bhairav and Todi.',
      'Level 3: The Composition. Introduction to Bandish and the rhythmic cycles of Teental and Ektal.',
      'Advanced: The Gat. Dynamic improvisations and the architecture of a full classical performance.'
    ],
    cta: 'Register for Audition'
  },
  'syllabus-instrumental': {
    title: 'Instrumental Mastery Syllabus',
    subtitle: 'The Discipline of the Esraj & Sitar',
    body: [
      'Module A: Tuning the Soul. The technical engineering of instrument maintenance and harmonic resonance.',
      'Module B: Fingers & Fretwork. Developing the calloused precision required for microtonal slides (Meend).',
      'Module C: Tala Integration. Melodic interplay with complex rhythmic structures.',
      'Masterclass: Performance Aesthetics. The stagecraft of institutional heritage.'
    ],
    cta: 'Register for Audition'
  },
  'syllabus-classical': {
    title: 'Classical Rhythm Syllabus',
    subtitle: 'The Language of Movement',
    body: [
      'Phase I: Angika. The geometry of the body and the geometry of Kathak/Odissi.',
      'Phase II: Abhinaya. The narrative power of expression and storytelling.',
      'Phase III: Tatkar. Mastering the rhythmic footwork that echoes the universe.',
      'Phase IV: Performance. The final synthesis of sound, movement, and silence.'
    ],
    cta: 'Register for Audition'
  }
};

interface InstitutionalArchiveProps {
  contentKey: string | null;
  onClose: () => void;
}

const InstitutionalArchive: React.FC<InstitutionalArchiveProps> = ({ contentKey, onClose }) => {
  const content = contentKey ? archiveData[contentKey] : null;

  useEffect(() => {
    if (contentKey) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [contentKey]);

  if (!contentKey) return null;

  return (
    <div className={`archive-overlay ${content ? 'active' : ''}`} onClick={onClose}>
      <div className="archive-drawer" onClick={e => e.stopPropagation()}>
        <button className="archive-close" onClick={onClose} aria-label="Close Archive">
          <X size={24} />
        </button>
        
        <div className="archive-scroll-area" data-lenis-prevent>
          <header className="archive-header">
            <span className="eyebrow">{content?.subtitle || 'Institutional Archive'}</span>
            <h2>{content?.title || 'Loading Archive...'}</h2>
          </header>

          <div className="archive-body">
            {content?.body.map((para, i) => (
              <p key={i} className="mb-20">{para}</p>
            ))}
          </div>

          {content?.cta && (
            <div className="archive-footer">
              <a href="#contact" onClick={onClose} className="btn btn-primary w-full">
                {content.cta}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstitutionalArchive;
