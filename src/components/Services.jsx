import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, PenTool, Code2, Wrench, Search } from 'lucide-react';

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
  { icon: <PenTool size={28} />, title: 'Design' },
  { icon: <Code2 size={28} />, title: 'Development' },
  { icon: <Search size={28} />, title: 'R & D' },
  { icon: <Monitor size={28} />, title: 'Quality' },
  { icon: <Wrench size={28} />, title: 'Maintain' },
];

const Services = () => {
  return (
    <section id="services" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-2" style={{ gap: '4rem', alignItems: 'flex-start' }}>
          
          {/* Left Column — Skills */}
          <div>
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
              SERVICES
            </span>

            <h2 style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
              lineHeight: 1.2,
            }}>
              I offer a Full-cycle of Web Development Services
            </h2>

            <p className="text-muted" style={{ 
              fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem',
              fontFamily: "'Inter', sans-serif" 
            }}>
              From ideation to deployment and maintenance, I deliver end-to-end web solutions that are scalable, performant, and visually stunning.
            </p>

            {/* Progress Bar Skills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {skills.map((skill, i) => (
                <div key={skill.name}>
                  <div style={{ 
                    display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem',
                    fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '0.9rem',
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
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Service Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.25rem',
            paddingTop: '3rem',
          }}>
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="chunky-card clickable"
                style={{
                  textAlign: 'center',
                  padding: '2rem 1.5rem',
                  marginTop: i % 2 !== 0 ? '2rem' : '0',
                }}
              >
                <div style={{
                  width: '56px', height: '56px', borderRadius: '12px',
                  border: '2px solid var(--border-color)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  color: 'var(--accent-primary)',
                  background: 'var(--bg-primary)',
                  boxShadow: 'var(--box-shadow-chunky)'
                }}>
                  {service.icon}
                </div>
                <h4 style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800, fontSize: '1rem',
                  color: 'var(--text-primary)',
                }}>
                  {service.title}
                </h4>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default Services;
