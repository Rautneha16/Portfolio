import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import TiltCard from './TiltCard';
import lockImage from './images/lock.jpg';
import otpImage from './images/otp.jpeg';
import constructionImage from './images/construction.jpeg';
import { fadeInUpVariant } from '../utils/animations';

const Projects = () => {
  const [filter, setFilter] = useState('All');

  const projects = [
    {
      id: 1,
      title: "J-ScriptPlug-in (Android Pattern Lock)",
      description: "A web-based solution replacing traditional passwords with an Android-style pattern lock, enhancing usability and security.",
      tech: ["HTML", "CSS", "JavaScript", "Research"],
      category: "Security",
      image: lockImage,
      githubLink: "https://github.com/Rautneha16/Android-Pattern-Lock"
    },
    {
      id: 2,
      title: "Alpha Identification Based OTP System",
      description: "A secure authentication system using unique alphanumeric patterns for OTP generation, minimizing unauthorized access. Published in IRJAEH (2024).",
      tech: ["Node.js", "Express.js", "MongoDB", "Twilio", "ReactJS"],
      category: "Security",
      image: otpImage,
      githubLink: "https://github.com/Rautneha16/Alpha-Based--Otp-Identification-System"

    },
    {
      id: 3,
      title: "Drive throw",
      description: "An engaging game design and web design project combining interactive gameplay elements with a stunning modern interface.",
      tech: ["ReactJS", "Framer Motion", "TailwindCSS"],
      category: "Web",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      githubLink: "https://github.com/Rautneha16/Drive-Throw"
    },
    {
      id: 4,
      title: "Construction",
      description: "A robust and professional web platform tailored for the construction industry, showcasing building projects and contracting services.",
      tech: ["Next.js", "React", "TailwindCSS"],
      category: "Web",
      image: constructionImage,
      githubLink: "https://github.com/Rautneha16/Construction"
    }
  ];

  const categories = ['All', 'Security', 'Web'];

  const filteredProjects = projects.filter(project =>
    filter === 'All' ? true : project.category === filter
  );

  return (
    <section id="projects" className="section">
      <motion.div
        variants={fadeInUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Section label */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{
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
            fontWeight: 900,
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            color: 'var(--text-primary)',
            lineHeight: 1.2,
          }}>
            Featured Creations
          </h2>
        </div>

        {/* Filter Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className="btn"
              style={{
                background: filter === cat ? 'var(--accent-primary)' : 'var(--glass-bg)',
                border: filter === cat ? '1px solid var(--accent-primary)' : '1px solid var(--glass-border)',
                color: filter === cat ? '#fff' : 'var(--text-primary)',
                padding: '0.5rem 1.5rem',
                borderRadius: '30px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(16px)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-2" style={{ gap: '2.5rem' }}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                style={{ height: '100%' }}
              >
                <TiltCard
                  style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}
                >
                  <div style={{ position: 'relative', height: 'clamp(180px, 25vh, 220px)', overflow: 'hidden', borderBottom: '2px solid var(--border-color)' }}>
                    <img
                      src={project.image.src || project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={220}
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
                  <div style={{ padding: 'clamp(1.25rem, 4vw, 1.75rem)', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <h3 style={{
                        fontWeight: 800, fontSize: '1.25rem',
                        color: 'var(--text-primary)',
                      }}>
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-muted" style={{ marginBottom: '1.5rem', flexGrow: 1, lineHeight: 1.7, fontSize: '0.95rem' }}>
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
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '1.25rem', marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem', transition: 'color 0.2s' }}
                          onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
                          onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                        >
                          <Github size={18} /> Code
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem', transition: 'color 0.2s' }}
                          onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
                          onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                        >
                          <ExternalLink size={18} /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;
