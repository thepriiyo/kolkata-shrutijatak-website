import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ParamparaThread — The lineage line.
 * A single golden thread that grows with scroll, representing the unbroken chain
 * of knowledge transmission (Guru-Shishya Parampara).
 */
const ParamparaThread = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    // The thread is desktop-only for museum-tier marginalia
    const isDesktop = window.innerWidth > 1024;
    if (!isDesktop) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    // Initial state: hidden
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    });

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        }
      });
      
      // Branch markers reveal when they enter viewport
      gsap.utils.toArray<SVGLineElement>('.parampara-branch').forEach((branch) => {
        gsap.fromTo(branch, 
          { scaleX: 0, opacity: 0 },
          { 
            scaleX: 1, 
            opacity: 0.4, 
            duration: 1, 
            scrollTrigger: {
              trigger: branch,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <svg 
      ref={svgRef}
      className="parampara-thread-system" 
      width="80" 
      height="100%" 
      viewBox="0 0 80 10000" /* Approximate full page height */
      fill="none" 
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* The Spine */}
      <path
        ref={pathRef}
        d="M 40 0 L 40 10000"
        stroke="var(--heritage-gold)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* Branch Markers (Conceptual - manual placement for key sections) */}
      {/* These will be refined in CSS/layout later */}
      <line x1="40" y1="1200" x2="60" y2="1200" className="parampara-branch" stroke="var(--heritage-gold)" strokeWidth="1" />
      <line x1="40" y1="2800" x2="60" y2="2800" className="parampara-branch" stroke="var(--heritage-gold)" strokeWidth="1" />
      <line x1="40" y1="4500" x2="60" y2="4500" className="parampara-branch" stroke="var(--heritage-gold)" strokeWidth="1" />
      <line x1="40" y1="6500" x2="60" y2="6500" className="parampara-branch" stroke="var(--heritage-gold)" strokeWidth="1" />
      <line x1="40" y1="8200" x2="60" y2="8200" className="parampara-branch" stroke="var(--heritage-gold)" strokeWidth="1" />
    </svg>
  );
};

export default ParamparaThread;
