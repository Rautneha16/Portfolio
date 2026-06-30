import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ThumbsUp } from 'lucide-react';
import { fadeInUpVariant, hoverScale } from '../utils/animations';

const TypewriterText = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsDone(true);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <motion.span
      onViewportEnter={() => {
        setTimeout(() => setStarted(true), delay);
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {displayedText}
      {/* Only show cursor while typing is in progress */}
      {!isDone && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          style={{
            display: 'inline-block',
            width: '8px',
            height: '1em',
            background: 'var(--accent-primary)',
            marginLeft: '4px',
            verticalAlign: 'middle',
            boxShadow: '0 0 8px var(--accent-primary)'
          }}
        />
      )}
    </motion.span>
  );
};


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
      <style>{`
        .about-left-col {
          display: flex;
          justify-content: center;
        }
        @media (min-width: 1024px) {
          .about-left-col {
            justify-content: flex-start !important;
            padding-left: clamp(1rem, 4vw, 4rem) !important;
          }
        }
      `}</style>
      <motion.div
        variants={fadeInUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="heading-lg">About <span className="text-gradient">Me</span></h2>
      </motion.div>

      <motion.div
        variants={fadeInUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-2" style={{ gap: '4rem', alignItems: 'center' }}>

          {/* Left Column — Experience Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="about-left-col"
          >
            <div style={{ position: 'relative' }}>
              {/* Decorative background shape */}
              <div style={{
                width: 'min(100%, 320px)',
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
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    whileHover={{ scale: 1.15, rotate: 5, textShadow: '0 0 20px var(--accent-primary)' }}
                    style={{
                      fontSize: '5rem',
                      fontWeight: 900,
                      color: 'var(--accent-primary)',
                      lineHeight: 1,
                      cursor: 'pointer',
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
                    maxWidth: '200px',
                  }}>
                    Year of Best & Successful Work Experience
                  </p>
                </div>
              </div>

              {/* Floating accent badge */}
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, -5, 5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                whileHover={{ scale: 1.2, rotate: 15 }}
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
            variants={fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 style={{
              fontWeight: 900,
              fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
              lineHeight: 1.2,
            }}>
              Web Developer & Designer
            </h3>

            <p className="text-muted" style={{
              fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem',
              fontFamily: "'Share Tech Mono', 'Mulish', monospace",
              minHeight: '80px' // prevents layout jump while typing
            }}>
              <TypewriterText text="Hello! I'm Neha, an aspiring web developer passionate about crafting exceptional digital experiences. With a BE in Information Technology from Savitribai Phule Pune University and hands-on industry experience, I specialize in building responsive, interactive frontend applications." delay={300} />
            </p>

            <p className="text-muted" style={{
              fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem',
              fontFamily: "'Share Tech Mono', 'Mulish', monospace",
              color: 'var(--accent-primary)'
            }}>
              <TypewriterText text="> I don't just build websites — I craft experiences that make a difference." delay={3500} />
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
                  whileHover={{ x: 10, scale: 1.02, color: 'var(--text-primary)' }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    marginBottom: '0.6rem',
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    cursor: 'default',
                  }}
                >
                  <motion.span
                    whileHover={{ scale: 1.3 }}
                    style={{ 
                      width: '10px', 
                      height: '10px', 
                      borderRadius: '50%', 
                      backgroundColor: 'var(--accent-primary)', 
                      display: 'inline-block',
                      flexShrink: 0
                    }}
                  />
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
