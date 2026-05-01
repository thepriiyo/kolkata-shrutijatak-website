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
              <a href="#careers">Careers</a>
              <a href="#news">News</a>
            </div>
            
            <div className="footer-col">
              <h4>PROGRAMS</h4>
              <a href="#music">Music</a>
              <a href="#dance">Dance</a>
              <a href="#theatre">Theatre</a>
              <a href="#heritage">Heritage Arts</a>
            </div>
            
            <div className="footer-col">
              <h4>CONNECT</h4>
              <a href="#contact">Contact</a>
              <a href="#visit">Visit Us</a>
              <a href="#support">Support</a>
              <a href="#instagram">Instagram</a>
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
