import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-motif mb-20"></div>
            <h2 className="footer-logo">KOLKATA <br />SHRUTIJATAK</h2>
            <p className="mt-20">
              The Digital Monument of Bengali Heritage. <br />
              Near-future institutional sanctuary.
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-col">
              <h4>INSTITUTION</h4>
              <a href="#about">About Us</a>
              <a href="#faculty">Faculty</a>
              <a href="#contact">Careers</a>
              <a href="#events">News</a>
            </div>
            
            <div className="footer-col">
              <h4>PROGRAMS</h4>
              <a href="#programs">Music</a>
              <a href="#programs">Dance</a>
              <a href="#programs">Theatre</a>
              <a href="#programs">Heritage Arts</a>
            </div>
            
            <div className="footer-col">
              <h4>CONNECT</h4>
              <a href="#contact">Contact</a>
              <a href="#contact">Visit Us</a>
              <a href="#contact">Support</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {currentYear} Kolkata Shrutijatak. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
