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
import { useScrollReveal } from './hooks/useScrollReveal';
import { useScrollProgress } from './hooks/useScrollProgress';

function App() {
  useScrollProgress();

  return (
    <div className="app-wrapper">
      <div className="scroll-progress"></div>
      <div className="grain-overlay"></div>
      <Navbar />
      <main>
        <Hero />
        <InstitutionalIntro />
        <div className="section-breath"></div>
        <ProgramsPreview />
        <div className="section-breath"></div>
        <CulturalImmersion />
        <div className="section-breath"></div>
        <FacultyPreview />
        <div className="section-breath"></div>
        <EventsPreview />
        <div className="section-breath"></div>
        <GalleryPreview />
        <div className="section-breath"></div>
        <Contact />
        <AdmissionsCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
