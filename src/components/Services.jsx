import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, PenTool, Code2, Wrench, Search } from 'lucide-react';
import TiltCard from './TiltCard';
import { fadeInUpVariant, childFadeInUp } from '../utils/animations';

const skills = [
  { name: 'HTML & CSS', level: 90 },
  { name: 'JavaScript', level: 85 },
  { name: 'React JS / Angular', level: 85 },
  { name: '.NET', level: 75 },
  { name: 'SQL & DBMS', level: 85 },
  { name: 'API Integration', level: 80 },
  { name: 'Web Development', level: 90 },
];

const services = [
  { icon: PenTool, title: 'Design', description: 'Crafting visually stunning and intuitive user interfaces focused on user experience.' },
  { icon: Code2, title: 'Development', description: 'Building scalable, robust, and high-performance web applications using modern tech stacks.' },
  { icon: Monitor, title: 'Quality', description: 'Ensuring high-end reliability through comprehensive testing and optimization protocols.' },
  { icon: Wrench, title: 'Maintain', description: 'Providing ongoing support and updates to keep your digital products secure and efficient.' },
];

const Services = () => {
  return (
    <section id="services" className="section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="heading-lg">My <span className="text-gradient">Services</span></h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-2" style={{ gap: '4rem', alignItems: 'flex-start' }}>

          {/* Left Column — Skills */}
          <div>
            <h3 style={{
              fontWeight: 900,
              fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
              lineHeight: 1.2,
            }}>
              I offer a Full-cycle of Web Development Services
            </h3>

            <p className="text-muted" style={{
              fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem'
            }}>
              From ideation to deployment and maintenance, I deliver end-to-end web solutions that are scalable, performant, and visually stunning.
            </p>

            {/* Progress Bar Skills */}
            <div className="skills-mobile-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  whileHover={{ scale: 1.02, x: 10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem',
                    fontWeight: 700, fontSize: '0.9rem',
                    color: 'var(--text-primary)'
                  }}>
                    <span>{skill.name}</span>
                    <span style={{ color: 'var(--accent-primary)' }}>{skill.level}%</span>
                  </div>
                  <div style={{
                    width: '100%', height: '10px',
                    background: 'var(--bg-primary)', border: '2px solid var(--border-color)', borderRadius: '6px', overflow: 'hidden'
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.08 }}
                      style={{
                        height: '100%',
                        background: 'var(--accent-gradient)',
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column — Service Cards */}
          <div className="grid grid-2" style={{
            gap: '1.25rem',
            paddingTop: '3rem',
          }}>
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{
                  scale: 1.08,
                  y: -10,
                  rotate: i % 2 === 0 ? 2 : -2,
                }}
                whileTap={{ scale: 0.95 }}
                style={{ perspective: '1000px', display: 'flex' }}
              >
                <TiltCard
                  className="glass-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    height: '100%',
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.05, transform: 'rotate(-15deg)', pointerEvents: 'none' }}>
                    <service.icon size={120} />
                  </div>

                  <div style={{
                    background: 'var(--bg-primary)',
                    padding: '1rem',
                    borderRadius: '12px',
                    marginBottom: '1.5rem',
                    display: 'inline-flex',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.1)'
                  }}>
                    <service.icon size={28} color="var(--accent-primary)" />
                  </div>

                  <h3 style={{
                    fontWeight: 800,
                    fontSize: '1.4rem',
                    marginBottom: '1rem',
                    color: 'var(--text-primary)'
                  }}>{service.title}</h3>

                  <p className="text-muted" style={{
                    lineHeight: 1.7,
                    fontSize: '0.95rem'
                  }}>{service.description}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default Services;
