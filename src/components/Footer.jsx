import { useState, useEffect } from 'react';
import { FaArrowUp, FaReact } from 'react-icons/fa';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="copyright">
          &copy; {currentYear} Jay Conar. All rights reserved.
        </div>
        
        <div className="built-with">
          <FaReact className="react-icon" />
          <span>Built with React</span>
        </div>
      </div>
      
      {showScrollTop && (
        <button className="scroll-top" onClick={scrollToTop} aria-label="Back to top">
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;