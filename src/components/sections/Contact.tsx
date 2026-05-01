import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Section.css';

const Contact = () => {
  const headerRef = useScrollReveal<HTMLDivElement>(0.2);
  const contentRef = useScrollReveal<HTMLDivElement>(0.15);

  return (
    <section id="contact" className="section-padding bg-warm">
      <div className="container">
        <div ref={headerRef} className="text-center mb-40 reveal">
          <span className="eyebrow">Connect</span>
          <h2>Institutional Contact</h2>
        </div>
        
        <div ref={contentRef} className="contact-grid reveal">
          <div className="contact-info reveal-delay-1">
            <h4>Kolkata Headquarters</h4>
            <div className="contact-item">
              <span>Location</span>
              <p>12/A Heritage Lane, <br />South Kolkata, WB 700029</p>
            </div>
            <div className="contact-item">
              <span>Inquiries</span>
              <p>office@shrutijatak.org</p>
            </div>
            <div className="contact-item">
              <span>Phone</span>
              <p>+91 33 2456 7890</p>
            </div>
          </div>
          
          <div className="contact-form-stub reveal-delay-2">
            <p className="mb-20">For academic inquiries, performance bookings, or cultural residency applications, please use our primary channel.</p>
            <a href="mailto:office@shrutijatak.org" className="btn btn-primary">Send Formal Inquiry</a>
            <p className="mt-20" style={{fontSize: '12px', color: 'var(--muted-gray)'}}>Response time: 24-48 business hours.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
