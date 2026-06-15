import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import lockImage from './images/lock.jpg';
import otpImage from './images/otp.jpg';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Alpha Identification Based OTP System",
      description: "A secure authentication system using unique alphanumeric patterns for OTP generation, minimizing unauthorized access. Published in IRJAEH (2024).",
      tech: ["Node.js", "Express.js", "MongoDB", "Twilio", "ReactJS"],
      image: lockImage,
      liveLink: "#",
      githubLink: "#"
    },
    {
      id: 2,
      title: "J-ScriptPlug-in (Android Pattern Lock)",
      description: "A web-based solution replacing traditional passwords with an Android-style pattern lock, enhancing usability and security.",
      tech: ["HTML", "CSS", "JavaScript", "Research"],
      image: otpImage,
      liveLink: "#",
      githubLink: "#"
    }
  ];

  return (
    <section id="projects" className="section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Section label */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: '0.85rem',
            color: 'var(--accent-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: '0.75rem',
            display: 'block',
          }}>
            PORTFOLIO
          </span>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            color: 'var(--text-primary)',
            lineHeight: 1.2,
          }}>
            Featured Creations
          </h2>
        </div>

        <div className="grid grid-2" style={{ gap: '2.5rem' }}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div
                className="chunky-card clickable"
                style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden', borderBottom: '2px solid var(--border-color)' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.08)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  {/* Overlay on hover */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)',
                    pointerEvents: 'none',
                  }} />
                </div>
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 800, fontSize: '1.25rem',
                    color: 'var(--text-primary)',
                    marginBottom: '0.75rem',
                  }}>
                    {project.title}
                  </h3>
                  <p className="text-muted" style={{ marginBottom: '1.5rem', flexGrow: 1, lineHeight: 1.7, fontSize: '0.95rem', fontFamily: "'Inter', sans-serif" }}>
                    {project.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                    {project.tech.map(tech => (
                      <span
                        key={tech}
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.25rem 0.75rem',
                          background: 'var(--accent-light)',
                          color: 'var(--accent-primary)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
