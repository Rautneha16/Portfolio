import React from 'react';
import { motion } from 'framer-motion';
import { Download, ThumbsUp } from 'lucide-react';

const About = () => {
  const highlights = [
    "Responsive & mobile-first design approach",
    "Clean code with scalable architecture",
    "Strong UI/UX design sensibility",
    "API integration & performance optimization",
    "Collaborative team player with agile experience",
  ];

  return (
    <section id="about" className="section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-2" style={{ gap: '4rem', alignItems: 'center' }}>

          {/* Left Column — Experience Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ position: 'relative' }}>
              {/* Decorative background shape */}
              <div style={{
                width: '320px',
                height: '380px',
                borderRadius: '16px',
                background: 'var(--card-bg)',
                border: '2px solid var(--border-color)',
                boxShadow: 'var(--box-shadow-chunky)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{
                  textAlign: 'center',
                  padding: '2rem',
                }}>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    style={{
                      fontSize: '5rem',
                      fontWeight: 900,
                      fontFamily: "'Poppins', sans-serif",
                      color: 'var(--accent-primary)',
                      lineHeight: 1,
                    }}
                  >
                    1+
                  </motion.div>
                  <p style={{
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginTop: '0.5rem',
                    fontFamily: "'Poppins', sans-serif",
                    maxWidth: '200px',
                  }}>
                    Year of Best & Successful Work Experience
                  </p>
                </div>
              </div>

              {/* Floating accent badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  bottom: '-15px',
                  right: '-15px',
                  background: 'var(--accent-primary)',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '70px',
                  height: '70px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid var(--border-color)',
                  boxShadow: 'var(--box-shadow-chunky)',
                }}
              >
                <ThumbsUp size={28} />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column — Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
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
              ABOUT ME
            </span>

            <h2 style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
              lineHeight: 1.2,
            }}>
              Web Developer & Designer
            </h2>

            <p className="text-muted" style={{
              fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem',
              fontFamily: "'Mulish', sans-serif"
            }}>
              Hello! I'm Neha, an aspiring web developer passionate about crafting exceptional digital experiences. With a BE in Information Technology from Savitribai Phule Pune University and hands-on industry experience, I specialize in building responsive, interactive frontend applications.
            </p>

            <p className="text-muted" style={{
              fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem',
              fontFamily: "'Mulish', sans-serif"
            }}>
              I don't just build websites — I craft experiences that make a difference.
            </p>

            {/* Highlight bullets */}
            <div style={{ marginBottom: '2rem' }}>
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    marginBottom: '0.6rem',
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    fontFamily: "'Mulish', sans-serif",
                  }}
                >
                  <span style={{ color: 'var(--accent-primary)', fontSize: '1.1rem' }}>👍</span>
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default About;
