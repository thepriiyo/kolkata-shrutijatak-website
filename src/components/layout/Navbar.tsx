import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  onOpenSyllabus?: () => void;
  onNavigateHome?: (sectionId?: string) => void;
  currentPage?: 'home' | 'syllabus';
}

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Programs', href: '#programs' },
  { name: 'Syllabus', href: '/syllabus', isSyllabus: true },
  { name: 'Faculty', href: '#faculty' },
  { name: 'Events', href: '#events' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
];

const Navbar: React.FC<NavbarProps> = ({ 
  onOpenSyllabus, 
  onNavigateHome, 
  currentPage = 'home' 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      
      const opacity = Math.min(scrollY / 120, 1);
      document.documentElement.style.setProperty('--nav-opacity', opacity.toFixed(3));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking via IntersectionObserver when on home page
  useEffect(() => {
    if (currentPage !== 'home') {
      setActiveSection('syllabus');
      return;
    }

    const sectionIds = navLinks.filter(l => !l.isSyllabus).map(l => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [currentPage]);

  const handleLinkClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    setIsMobileMenuOpen(false);

    if (link.isSyllabus) {
      e.preventDefault();
      if (onOpenSyllabus) {
        onOpenSyllabus();
      }
      return;
    }

    if (currentPage === 'syllabus') {
      e.preventDefault();
      const sectionId = link.href.replace('#', '');
      if (onNavigateHome) {
        onNavigateHome(sectionId);
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage === 'syllabus' && onNavigateHome) {
      onNavigateHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleApplyClick = (e: React.MouseEvent) => {
    setIsMobileMenuOpen(false);
    if (currentPage === 'syllabus') {
      e.preventDefault();
      if (onNavigateHome) {
        onNavigateHome('contact');
      }
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-container">
        <a href="#" className="nav-logo" onClick={handleLogoClick}>
          <span className="logo-text">KOLKATA SHRUTIJATAK</span>
        </a>

        <div className="nav-links desktop-only">
          {navLinks.map((link) => {
            const isLinkActive = link.isSyllabus 
              ? currentPage === 'syllabus' 
              : activeSection === link.href.replace('#', '');

            return (
              <a 
                key={link.name} 
                href={link.href} 
                className={`nav-link ${isLinkActive ? 'active' : ''} ${link.isSyllabus ? 'nav-link-syllabus' : ''}`}
                onClick={(e) => handleLinkClick(e, link)}
              >
                {link.name}
              </a>
            );
          })}
          <a 
            href="#contact" 
            className="btn btn-primary nav-cta" 
            onClick={handleApplyClick}
          >
            Apply Now
          </a>
        </div>

        <button 
          className="mobile-toggle mobile-only" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-links">
          {navLinks.map((link) => {
            const isLinkActive = link.isSyllabus 
              ? currentPage === 'syllabus' 
              : activeSection === link.href.replace('#', '');

            return (
              <a 
                key={link.name} 
                href={link.href} 
                className={`mobile-link ${isLinkActive ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, link)}
              >
                {link.name}
              </a>
            );
          })}
          <a 
            href="#contact" 
            className="btn btn-primary mobile-cta" 
            onClick={handleApplyClick}
          >
            Apply Now
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
