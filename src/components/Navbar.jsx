import { useState, useRef, useEffect } from "react";
import { name } from '../data/config.json'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav ref={navRef} className={isOpen ? 'active' : ''}>
      <div className="logo">{name}</div>
      <button 
        className={`hamburger ${isOpen ? "active" : ""}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        <a href="#about" onClick={handleNavClick}>About</a>
        <a href="#experience" onClick={handleNavClick}>Experience</a>
        <a href="#projects" onClick={handleNavClick}>Projects</a>
        <a href="#skills" onClick={handleNavClick}>Skills</a>
        <a href="#contact" onClick={handleNavClick}>Contact me</a>
      </div>
    </nav>
  );
}

export default Navbar;
