import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import avatarImage from './images/avatar.png';

const techIcons = [
  { label: 'HTML5', color: '#E44D26', symbol: '<>' },
  { label: 'React', color: '#61DAFB', symbol: '⚛' },
  { label: 'JS', color: '#F7DF1E', symbol: 'JS' },
  { label: 'CSS3', color: '#264DE4', symbol: '#' },
  { label: 'Node', color: '#339933', symbol: 'N' },
  { label: 'Git', color: '#F05032', symbol: '⑂' },
];

const codeLines = [
  { indent: 0, text: 'const developer = {', color: '#c678dd' },
  { indent: 1, text: 'name: "Neha Raut",', color: '#98c379' },
  { indent: 1, text: 'role: "Web Developer",', color: '#98c379' },
  { indent: 1, text: 'skills: ["React", "JS", "Node"],', color: '#e5c07b' },
  { indent: 1, text: 'passion: "Building amazing UIs",', color: '#98c379' },
  { indent: 1, text: 'available: true,', color: '#56b6c2' },
  { indent: 0, text: '};', color: '#c678dd' },
];

const Hero = () => {
  const [typedLines, setTypedLines] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTypedLines(prev => {
        if (prev >= codeLines.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      paddingTop: '6rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Signature glowing background blobs */}
      <div className="glow-blob animate-pulse-soft" style={{
        top: '10%', left: '-8%',
        width: '350px', height: '350px',
        background: 'var(--accent-primary)',
      }} />
      <div className="glow-blob animate-pulse-soft" style={{
        bottom: '5%', right: '-5%',
        width: '450px', height: '450px',
        background: 'var(--accent-secondary)',
        animationDelay: '2s'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="grid grid-2" style={{ alignItems: 'center' }}>
          
          {/* Left Column — Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span style={{ 
              display: 'inline-block',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontSize: '0.9rem',
              color: 'var(--accent-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: '1rem'
            }}>
              Hi there, I'm
            </span>
            
            <h1 className="heading-xl" style={{ marginBottom: '1.5rem' }}>
              <span className="text-gradient">Neha Raut</span>
            </h1>
            
            <p className="text-muted" style={{ 
              fontSize: '1.15rem', 
              lineHeight: 1.8, 
              marginBottom: '2.5rem', 
              maxWidth: '520px',
              fontFamily: "'Inter', sans-serif"
            }}>
              A passionate <strong style={{ color: 'var(--text-primary)' }}>Web Developer</strong> based in Pune, India. I craft modern, responsive, and highly interactive applications with clean, user-friendly designs.
            </p>

            {/* Tech stack icons */}
            <div style={{ marginBottom: '2.5rem' }}>
              <span className="text-muted" style={{ 
                fontSize: '0.8rem', fontWeight: 800, 
                textTransform: 'uppercase', letterSpacing: '0.1em',
                display: 'block', marginBottom: '0.75rem',
                fontFamily: "'Poppins', sans-serif"
              }}>
                My Core Toolbox
              </span>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {techIcons.map((tech, i) => (
                  <motion.div
                    key={tech.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1, type: 'spring', stiffness: 200 }}
                    title={tech.label}
                    className="clickable"
                    style={{
                      width: '48px', height: '48px',
                      borderRadius: '12px',
                      background: 'var(--card-bg)',
                      border: '2px solid var(--border-color)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: '1rem',
                      color: tech.color,
                      boxShadow: 'var(--box-shadow-chunky)',
                      fontFamily: "'Poppins', sans-serif",
                    }}
                    whileHover={{ 
                      y: -4, 
                      boxShadow: '6px 6px 0px var(--shadow-color)',
                    }}
                  >
                    {tech.symbol}
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <a href="#projects" className="btn btn-primary clickable">
                View Projects <ArrowRight size={18} />
              </a>
              <a href="#contact" className="btn btn-secondary clickable">
                Let's Talk <Mail size={18} />
              </a>
            </div>
          </motion.div>

          {/* Right Column — Cartoon Avatar & Animated Code Editor */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ display: 'flex', justifyContent: 'center', position: 'relative', minHeight: '460px' }}
          >
            <div style={{
              width: '100%',
              maxWidth: '460px',
              position: 'relative',
            }}>
              {/* Backside Animated Circle decoration (behind the cartoon avatar) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '20px',
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  border: '3px dashed var(--accent-primary)',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  top: '0px',
                  right: '10px',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  border: '1.5px solid var(--accent-teal)',
                  opacity: 0.6,
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              />

              {/* Glowing Background Blob */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '240px',
                height: '240px',
                borderRadius: '50%',
                background: 'var(--accent-gradient)',
                filter: 'blur(40px)',
                opacity: 0.3,
                zIndex: 0,
                pointerEvents: 'none',
              }} className="animate-pulse-soft" />

              {/* Cartoon Avatar (Centered on the right side of the editor or floating) */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '25px',
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  border: '3px solid var(--border-color)',
                  background: 'var(--card-bg)',
                  boxShadow: 'var(--box-shadow-chunky)',
                  overflow: 'hidden',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                whileHover={{
                  scale: 1.08,
                  rotate: [0, -3, 3, 0],
                  boxShadow: 'var(--box-shadow-chunky-hover)',
                }}
                className="clickable"
              >
                <img 
                  src={avatarImage} 
                  alt="Neha Raut Cartoon Avatar" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </motion.div>

              {/* Code Editor Card - shifted slightly down-left */}
              <div style={{
                background: '#120f26',
                border: '2px solid var(--border-color)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: 'var(--box-shadow-chunky)',
                position: 'relative',
                top: '120px',
                left: '-10px',
                width: '90%',
                zIndex: 5,
              }}>
                {/* Title Bar */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '12px 16px',
                  background: '#090714',
                  borderBottom: '2px solid var(--border-color)',
                }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', border: '1px solid rgba(0,0,0,0.2)' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e', border: '1px solid rgba(0,0,0,0.2)' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840', border: '1px solid rgba(0,0,0,0.2)' }} />
                  <span style={{ 
                    marginLeft: '12px', fontSize: '0.75rem', 
                    color: 'rgba(255,255,255,0.4)',
                    fontWeight: 600,
                    fontFamily: "'Inter', monospace" 
                  }}>
                    neha.js
                  </span>
                </div>

                {/* Code Body */}
                <div style={{ 
                  padding: '20px 24px', 
                  fontFamily: "'Courier New', monospace",
                  fontSize: '0.85rem',
                  lineHeight: 1.7,
                  minHeight: '200px',
                  color: '#e5e9f0',
                }}>
                  {codeLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={i < typedLines ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3 }}
                      style={{ 
                        paddingLeft: `${line.indent * 16}px`,
                        color: line.color,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {line.text}
                      {i === typedLines - 1 && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8 }}
                          style={{ 
                            display: 'inline-block', width: '6px', height: '14px',
                            background: 'var(--accent-primary)', marginLeft: '2px',
                            verticalAlign: 'text-bottom'
                          }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
