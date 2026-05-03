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
import './components/common/ParamparaThread.css';

function App() {
  useScrollProgress();
  const prahar = useAtmosphere();
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
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
  }, []);

  const handleIntroComplete = () => {
    setIsIntroComplete(true);
    
    // Auto-scroll automation: Initiate the Hero Reveal ceremony
    setTimeout(() => {
      if (lenisRef.current) {
        // Scroll to ~40% of the Hero pin duration to manifest the identity
        lenisRef.current.scrollTo(window.innerHeight * 0.4, {
          duration: 3, // Slow, authoritative movement
          easing: (t) => 1 - Math.pow(1 - t, 4), // Smooth magnetic ease-out
        });
      }
    }, 800); // Wait for the Namaskar fade-out to reach peak atmosphere
  };

  return (
    <div className={`app-wrapper raga-${prahar}`}>
      <ParamparaThread />
      {!isIntroComplete && (
        <NamaskarLoader onComplete={handleIntroComplete} />
      )}
      
      <div className={`main-content-system ${isIntroComplete ? 'visible' : 'hidden'}`}>
        <div className="scroll-progress"></div>
        <div className="grain-overlay"></div>
        <div className="vignette"></div>
        
        <Navbar />
        
        <main>
          <div className="phase-alap">
            <Hero forceReveal={isIntroComplete} />
            <InstitutionalIntro />
          </div>
          
          <div className="section-breath"></div>
          
          <div className="phase-jod">
            <ProgramsPreview />
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
    </div>
  );
}

export default App;
