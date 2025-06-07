import { useState, useEffect, useRef } from 'react';
import {name, summary} from '../data/config.json';

function Hero() {
  const [typedName, setTypedName] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const typingSpeed = 100;
  const cursorRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hasStarted && currentIndex < name.length) {
      const timer = setTimeout(() => {
        setTypedName(prev => {
          const newChar = name[currentIndex] === ' ' ? '\u00A0' : name[currentIndex];
          return prev + newChar;
        });
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timer);
    }
  }, [hasStarted, currentIndex, name]);

  useEffect(() => {
    if (textRef.current && cursorRef.current) {
      const textWidth = textRef.current.getBoundingClientRect().width;
      cursorRef.current.style.left = `${textWidth}px`;
    }
  }, [typedName, hasStarted]);

  useEffect(() => {
    const handleResize = () => {
      if (textRef.current && cursorRef.current) {
        const textWidth = textRef.current.getBoundingClientRect().width;
        cursorRef.current.style.left = `${textWidth}px`;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="about" className="hero">
      <h1>
        <span>Hi, I'm</span>
        <span className="typing-container">
          <span ref={textRef} className="typing-animation">
            {typedName === '' ? '\u200B' : typedName}
          </span>
          <span ref={cursorRef} className="cursor" />
        </span>
      </h1>
      <p className="subtitle">
        {summary}
      </p>
      <button className="cta-button" onClick={() => window.open('https://docs.google.com/document/d/1WnK8mvPki_7ib1dSdFq73629II60__IK/edit?usp=sharing&ouid=108402824406193343297&rtpof=true&sd=true')}>
        View my Resumé
      </button>
    </section>
  );
}

export default Hero;