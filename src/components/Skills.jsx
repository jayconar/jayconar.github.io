import { useRef, useEffect } from 'react';
import skillCategories from '../data/skills.json'

const Skills = () => {
  const skillCards = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      skillCards.current.forEach(card => {
        if (!card) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="skills" className="skills-section">
        <h2 className="section-title">Technical Skills</h2>
      
      <div className="hologrid">
        {skillCategories.map((category, index) => (
          <div 
            key={index} 
            className="hologram-card"
            ref={el => skillCards.current[index] = el}
            style={{ '--accent-color': category.accent }}
          >
            <div className="card-content">
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-container">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="skill-tag">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <div className="card-glare" />
            <div className="card-glow" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;