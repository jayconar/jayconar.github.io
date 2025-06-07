import { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import projects from '../data/projects.json';

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef(null);
  const gap = 32;

  const updateCardWidth = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      let newVisibleCount = 3;
      
      if (window.innerWidth <= 768) {
        newVisibleCount = 1;
      } else if (window.innerWidth <= 1024) {
        newVisibleCount = 2;
      }
      
      setVisibleCount(newVisibleCount);
      const calculatedWidth = (containerWidth - (newVisibleCount - 1) * gap) / newVisibleCount;
      setCardWidth(calculatedWidth);
    }
  };

  useEffect(() => {
    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  const maxIndex = Math.max(projects.length - visibleCount, 0);

  const handleNext = () => {
    setActiveIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setActiveIndex(prev => Math.max(prev - 1, 0));
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">Featured Projects</h2>
      
      <div {...handlers} className="carousel-container" ref={containerRef}>
        <div 
          className="carousel-track" 
          style={{ 
            transform: `translateX(-${activeIndex * (cardWidth + gap)}px)`,
            transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
            display: 'flex',
            gap: `${gap}px`,
          }}
        >
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="project-card" 
              style={{ width: `${cardWidth}px`, flexShrink: 0 }}
              data-active={index >= activeIndex && index < activeIndex + visibleCount}
            >
              <div className="image-container">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-image"
                />
                <div className="image-overlay"></div>
              </div>
              
              <div className="card-content">
                <h3>{project.title}</h3>
                <p className="description">{project.description}</p>
                
                <div className="tech-stack">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="card-links">
                  <a 
                    href={project.demo} 
                    className="demo-link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <FiExternalLink /> Live Demo
                  </a>
                  <a 
                    href={project.code} 
                    className="code-link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <FiGithub /> Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="carousel-controls">
        <button 
          onClick={handlePrev} 
          disabled={activeIndex === 0} 
          className="nav-button"
        >
          ←
        </button>
        
        <div className="pagination">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <span 
              key={i} 
              className={`dot ${i === activeIndex ? 'active' : ''}`} 
            />
          ))}
        </div>
        
        <button 
          onClick={handleNext} 
          disabled={activeIndex >= maxIndex} 
          className="nav-button"
        >
          →
        </button>
      </div>
    </section>
  );
};

export default Projects;