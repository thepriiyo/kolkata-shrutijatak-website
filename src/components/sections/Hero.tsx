import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import BrandLogo from '../common/BrandLogo';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);


const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [logoProgress, setLogoProgress] = useState(0);

  const requestGyro = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          window.location.reload(); 
        }
      } catch (err) {
        console.error('Gyro permission denied:', err);
      }
    } else {
      // For browsers that don't need explicit permission (some Android)
      alert("Spatial tracking enabled.");
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    // 1. TYPOGRAPHY PREPARATION
    const titleSplit = new SplitType(titleRef.current!, { types: 'lines,words' });
    const descSplit = new SplitType(descRef.current!, { types: 'lines' });
    
    // Initial States
    gsap.set([titleSplit.words, descSplit.lines], { y: 20, opacity: 0 });

    // 2. TIMELINE CONSTRUCTION
    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth > 1024;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: isDesktop ? "+=150%" : "+=100%", // Substantial ceremony for everyone
          pin: !prefersReducedMotion, // Pinning enabled for mobile
          scrub: 0.5,
          onUpdate: (self) => {
            // Unify materialization speed
            setLogoProgress(Math.min(1, self.progress * 2.5));
          }
        }
      });

      // --- THE UNIFIED CEREMONY SEQUENCE ---

      // Phase 1: Logo Materialization & Initial Scale
      tl.to(portalRef.current, {
        scale: isDesktop ? 0.8 : 1.5, // Significant presence on mobile
        y: isDesktop ? 0 : '-5%',
        x: isDesktop ? '25%' : 0, 
        duration: 1,
        ease: "power2.inOut"
      }, 0.2);

      // Phase 2: Narrative Manifestation
      tl.to(narrativeRef.current, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, 0.3);

      // Phase 3: Calligraphy (The Alap)
      tl.to(titleSplit.words, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "power2.out"
      }, 0.4);

      tl.to(descSplit.lines, {
        opacity: 0.7,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
      }, 0.6);

      // Phase 4: Resolution
      tl.to(actionsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6
      }, 0.8);

      tl.to(scrollRef.current, {
        opacity: 1,
        duration: 0.5
      }, 1.0);
    }, sectionRef);

    return () => {
      ctx.revert();
      titleSplit.revert();
      descSplit.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero">
      <div className="hero-atmosphere">
        <div className="hero-texture"></div>
      </div>

      <div ref={containerRef} className="hero-container">
        {/* Layer 1: Identity Portal (Centered then Shifted) */}
        <div ref={portalRef} className="hero-identity-portal">
          <div className="hero-logo-wrapper">
            <BrandLogo progress={logoProgress} />
          </div>
        </div>

        {/* Layer 2: Narrative (Appears as Logo Shifts) */}
        <div className="hero-content-frame">
          <div ref={narrativeRef} className="hero-narrative">
            <span className="eyebrow">Digital Monument of Heritage</span>
            
            <h1 ref={titleRef} className="hero-main-title">
              Preserving and evolving the timeless traditions of Bengali classical arts.
            </h1>
            
            <p ref={descRef} className="hero-description">
              A near-future sanctuary for music, dance, and culture, honoring the past while engineering the continuum of heritage.
            </p>
            
            <div ref={actionsRef} className="hero-actions">
              <a href="#contact" className="btn btn-primary">Begin Your Journey</a>
              <button className="btn btn-secondary" onClick={requestGyro}>Calibrate Spatial Monument</button>
            </div>
          </div>
          
          {/* Empty right column for layout parity in desktop split */}
          <div className="hero-spacer"></div>
        </div>
      </div>
      
      <div ref={scrollRef} className="hero-scroll-ceremony">
        <span>SCROLL TO INITIATE</span>
        <div className="scroll-thread"></div>
      </div>
    </section>
  );
};

export default Hero;
