import experienceData from '../data/experience.json';

const Experience = () => {
  return (
    <section id="experience" className="experience-section">
      <h2 className="section-title">Experience</h2>
      <div className="experience-container">
        {experienceData.map((exp) => (
          <div key={`${exp.company}-${exp.dates}`} className="experience-card">
            <div className="experience-header">
              <h3 className="role">{exp.role}</h3>
              <p className="company">{exp.company}</p>
              <p className="dates">{exp.dates}</p>
            </div>
            <ul className="description-list">
              {exp.description.map((item, index) => (
                <li key={index} className="description-item">
                  {item}
                </li>
              ))}
            </ul>
            <div className="tech-stack">
              {exp.technologies.map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;