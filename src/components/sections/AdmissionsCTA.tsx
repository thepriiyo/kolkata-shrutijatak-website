import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Section.css';

const AdmissionsCTA = () => {
  // Shock Moment 3 — high threshold for dramatic reveal
  const cardRef = useScrollReveal<HTMLDivElement>(0.25, '0px 0px -100px 0px');

  return (
    <section id="apply" className="admissions-section">
      <div className="container">
        <div ref={cardRef} className="admissions-card reveal">
          <div className="admissions-content text-center">
            <span className="eyebrow gold reveal-delay-2">Enrolment 2026/27</span>
            <h2 className="reveal-delay-3 light mb-20">Begin Your Cultural Residency</h2>
            <p className="reveal-delay-3 muted mx-auto mb-40">
              Join a community dedicated to the mastery of Bengali classical arts. 
              Our admissions process is a conversation about your journey.
            </p>
            <div className="admissions-actions reveal-delay-4">
              <a href="#apply-now" className="btn btn-primary btn-large">Apply for Admission</a>
              <a href="#prospectus" className="btn btn-secondary gold">Download Prospectus</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionsCTA;
