import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import InstitutionalIntro from './components/sections/InstitutionalIntro';
import ProgramsPreview from './components/sections/ProgramsPreview';
import CulturalImmersion from './components/sections/CulturalImmersion';
import FacultyPreview from './components/sections/FacultyPreview';
import AdmissionsCTA from './components/sections/AdmissionsCTA';
import EventsPreview from './components/sections/EventsPreview';
import GalleryPreview from './components/sections/GalleryPreview';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import NamaskarLoader from './components/common/NamaskarLoader';
import ParamparaThread from './components/common/ParamparaThread';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useAtmosphere } from './hooks/useAtmosphere';
import InstitutionalArchive from './components/common/InstitutionalArchive';
import AlponaMatrix from './components/common/AlponaMatrix';
import OpticalAtmosphere from './components/common/OpticalAtmosphere';
import SacredSpotlight from './components/common/SacredSpotlight';
import FluidFilter from './components/common/FluidFilter';
import SyllabusPage from './pages/SyllabusPage';
import './components/common/ParamparaThread.css';

const isSyllabusRoute = () => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  return path.includes('syllabus') || hash.includes('syllabus');
};

const getDisciplineFromUrl = (): string | null => {
  if (typeof window === 'undefined') return null;
  const searchParams = new URLSearchParams(window.location.search);
  const fromQuery = searchParams.get('discipline');
  if (fromQuery) return fromQuery;
  const hash = window.location.hash.toLowerCase();
  if (hash.includes('vocal')) return 'vocal';
  if (hash.includes('instrumental')) return 'instrumental';
  if (hash.includes('classical')) return 'classical';
  return null;
};

function App() {
  useScrollProgress();
  const prahar = useAtmosphere();
  
  const [currentPage, setCurrentPage] = useState<'home' | 'syllabus'>(() => 
    isSyllabusRoute() ? 'syllabus' : 'home'
  );
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(getDisciplineFromUrl);
  const [isIntroComplete, setIsIntroComplete] = useState(() => isSyllabusRoute());
  const [archiveKey, setArchiveKey] = useState<string | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scroll for Home view
  useEffect(() => {
    if (currentPage !== 'home') {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [currentPage]);

  // Handle Browser Back / Forward History
  useEffect(() => {
    const handlePopState = () => {
      if (isSyllabusRoute()) {
        setCurrentPage('syllabus');
        setSelectedDiscipline(getDisciplineFromUrl());
        setIsIntroComplete(true);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleIntroComplete = () => {
    setIsIntroComplete(true);
    
    // Auto-scroll automation: Swift manifestation of the full Hero identity
    setTimeout(() => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(window.innerHeight * 0.7, {
          duration: 1.5,
          easing: (t) => 1 - Math.pow(1 - t, 4), 
        });
      }
    }, 100);
  };

  // Navigation Handlers
  const navigateToSyllabus = (disciplineId?: string) => {
    setSelectedDiscipline(disciplineId || null);
    setCurrentPage('syllabus');
    setIsIntroComplete(true);
    
    const targetUrl = disciplineId ? `/syllabus#syllabus-${disciplineId}` : '/syllabus';
    window.history.pushState({ page: 'syllabus', discipline: disciplineId }, '', targetUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = (sectionId?: string) => {
    setCurrentPage('home');
    const targetUrl = sectionId ? `/#${sectionId}` : '/';
    window.history.pushState({ page: 'home' }, '', targetUrl);

    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(el, { offset: -70 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Helper to open drawer archive for other content
  const openArchive = (key: string) => setArchiveKey(key);

  return (
    <div className={`app-wrapper raga-${prahar}`}>
      <div className="manuscript-grain-system" aria-hidden="true" />
      <ParamparaThread />
      <FluidFilter />
      <OpticalAtmosphere />
      <SacredSpotlight />
      <AlponaMatrix />
      <InstitutionalArchive contentKey={archiveKey} onClose={() => setArchiveKey(null)} />
      
      {currentPage === 'syllabus' ? (
        <SyllabusPage 
          initialDiscipline={selectedDiscipline} 
          onNavigateHome={navigateToHome} 
        />
      ) : (
        <>
          {!isIntroComplete && (
            <NamaskarLoader onComplete={handleIntroComplete} />
          )}
          
          <div className={`main-content-system ${isIntroComplete ? 'visible' : 'hidden'}`}>
            <div className="scroll-progress"></div>
            <div className="grain-overlay"></div>
            <div className="vignette"></div>
            
            <Navbar 
              onOpenSyllabus={() => navigateToSyllabus()} 
              onNavigateHome={navigateToHome}
              currentPage={currentPage}
            />
            
            <main>
              <div className="phase-alap">
                <Hero />
                <InstitutionalIntro onReadMore={() => openArchive('about-full')} />
              </div>
              
              <div className="section-breath"></div>
              
              <div className="phase-jod">
                <ProgramsPreview onOpenSyllabus={navigateToSyllabus} />
                <div className="section-breath"></div>
                <CulturalImmersion />
                <div className="section-breath"></div>
                <FacultyPreview />
              </div>
              
              <div className="section-breath"></div>
              
              <div className="phase-gat">
                <EventsPreview />
                <div className="section-breath"></div>
                <GalleryPreview />
                <div className="section-breath"></div>
                <Contact />
              </div>
              
              <div className="phase-tihai">
                <AdmissionsCTA />
              </div>
            </main>
            
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
