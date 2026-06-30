import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import avatarImage from './images/avatar.png';
import heroVideo from './images/video/video.mp4'; 

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
  const sectionRef = useRef(null);

  // Single parallax value — fewer scroll listeners = less main-thread work per frame
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 180]);

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
    <section id="home" ref={sectionRef} style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '100px',
      paddingBottom: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* ===== Background Video ===== */}
      <video
        autoPlay
        loop
        muted
        defaultMuted
        playsInline
        aria-hidden="true"
        tabIndex={-1}
        className="hide-on-mobile"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Dark gradient overlay for readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(10,5,30,0.88) 0%, rgba(20,5,50,0.75) 50%, rgba(10,5,30,0.90) 100%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* Neon scanline effect */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.015) 2px, rgba(0,255,255,0.015) 4px)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* ===== Parallax Floating Elements =====
          Perf rules: no textShadow on animated elements (forces software raster),
          will-change: transform promotes to compositor layer */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' } }}
        style={{ position: 'absolute', top: '20%', left: '10%', y: yParallax, zIndex: 2, opacity: 0.35, color: '#00ffff', fontFamily: "'Share Tech Mono', monospace", fontSize: '2rem', pointerEvents: 'none', display: 'inline-block', willChange: 'transform' }}
      >
        {`</>`}
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ rotate: { duration: 25, repeat: Infinity, ease: 'linear' } }}
        style={{ position: 'absolute', top: '60%', left: '80%', zIndex: 2, opacity: 0.25, color: '#ff2a7a', fontFamily: "'Share Tech Mono', monospace", fontSize: '3.5rem', pointerEvents: 'none', display: 'inline-block', willChange: 'transform' }}
      >
        {`{ }`}
      </motion.div>
      <motion.div
        animate={{ rotate: 180 }}
        transition={{ rotate: { duration: 15, repeat: Infinity, ease: 'linear' } }}
        style={{ position: 'absolute', top: '75%', left: '20%', zIndex: 2, opacity: 0.2, color: '#a855f7', fontFamily: "'Share Tech Mono', monospace", fontSize: '1.8rem', pointerEvents: 'none', display: 'inline-block', willChange: 'transform' }}
      >
        {`[ ]`}
      </motion.div>
      {/* Static decorative shapes — no animation, zero scroll cost */}
      <div style={{ position: 'absolute', top: '15%', right: '15%', zIndex: 2, opacity: 0.25, border: '2px solid #ff5e97', width: '50px', height: '50px', borderRadius: '50%', boxShadow: '0 0 10px #ff5e97', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '35%', zIndex: 2, opacity: 0.15, border: '2px dashed #00ffff', width: '80px', height: '80px', borderRadius: '10%', transform: 'rotate(45deg)', pointerEvents: 'none' }} />

      {/* Static glow blobs — animate-pulse-soft on filtered elements is expensive; static is free */}
      <div className="glow-blob" style={{
        top: '10%', left: '-8%',
        width: '350px', height: '350px',
        background: 'var(--accent-primary)',
        zIndex: 3,
        opacity: 0.12,
      }} />
      <div className="glow-blob" style={{
        bottom: '5%', right: '-5%',
        width: '450px', height: '450px',
        background: 'var(--accent-secondary)',
        zIndex: 3,
        opacity: 0.09,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 4 }}>
        <div className="grid grid-2" style={{ alignItems: 'center' }}>

          {/* Left Column — Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span style={{
              display: 'inline-block',
              fontFamily: "'Share Tech Mono', monospace",
              fontWeight: 400,
              fontSize: '0.9rem',
              color: '#00ffff',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: '1rem',
              textShadow: '0 0 10px rgba(0,255,255,0.8)',
            }}>
              Hi there, I'm
            </span>

            <h1 className="heading-xl" style={{
              marginBottom: '1.5rem',
              textShadow: '0 0 30px rgba(255,42,122,0.5), 0 0 60px rgba(124,59,237,0.3)',
              letterSpacing: '0.06em',
            }}>
              <span className="text-gradient">Neha Raut</span>
            </h1>

            <p style={{
              fontSize: '1.05rem',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
              maxWidth: '520px',
              fontWeight: 500,
              color: 'rgba(220,210,255,0.85)',
              letterSpacing: '0.03em',
            }}>
              A passionate <strong style={{ color: '#00ffff', textShadow: '0 0 8px rgba(0,255,255,0.6)' }}>Web Developer</strong> based in Pune, India. I craft modern, responsive, and highly interactive applications with clean, user-friendly designs.
            </p>

            {/* Tech stack icons */}
            <div style={{ marginBottom: '2.5rem' }}>
              <span style={{
                fontSize: '0.75rem', fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.15em',
                display: 'block', marginBottom: '0.75rem',
                fontFamily: "'Share Tech Mono', monospace",
                color: 'rgba(0,255,255,0.7)',
              }}>
                My Core Toolbox
              </span>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {techIcons.map((tech, i) => (
                  <motion.div
                    key={tech.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ 
                      y: -6, 
                      scale: 1.15,
                      rotate: [0, -10, 10, -5, 5, 0],
                    }}
                    whileTap={{ scale: 0.85, rotate: [0, -15, 15, 0] }}
                    transition={{ 
                      default: { duration: 0.4 },
                      opacity: { delay: 0.8 + i * 0.1 },
                      scale: { delay: 0.8 + i * 0.1, type: 'spring', stiffness: 200 }
                    }}
                    role="img"
                    aria-label={tech.label}
                    title={tech.label}
                    style={{
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      width: '40px', 
                      height: '40px', 
                      background: 'var(--card-bg)', 
                      border: '2px solid var(--border-color)', 
                      borderRadius: '8px', 
                      boxShadow: '2px 2px 0 var(--border-color)', 
                      color: 'var(--text-primary)', 
                      transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s, border-color 0.3s',
                      fontWeight: 700,
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '1rem',
                      cursor: 'default'
                    }}
                    onMouseOver={(e) => { 
                      e.currentTarget.style.color = 'white'; 
                      e.currentTarget.style.background = tech.color;
                      e.currentTarget.style.boxShadow = `0 0 15px ${tech.color}`;
                      e.currentTarget.style.borderColor = tech.color;
                    }} 
                    onMouseOut={(e) => { 
                      e.currentTarget.style.color = 'var(--text-primary)'; 
                      e.currentTarget.style.background = 'var(--card-bg)';
                      e.currentTarget.style.boxShadow = '2px 2px 0 var(--border-color)';
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                    }}
                  >
                    {tech.symbol}
                  </motion.div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <a href="#projects" className="btn btn-primary glitch-hover" style={{
                fontSize: '0.78rem',
                letterSpacing: '0.1em',
                boxShadow: '0 0 20px rgba(255,42,122,0.5)',
              }}>
                View Projects <ArrowRight size={18} />
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
              {/* Background rings removed per request */}

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
              >
                <img
                  src={avatarImage.src}
                  alt="Neha Raut Cartoon Avatar"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </motion.div>

              {/* Code Editor Card */}
              <div className="hero-code-card" style={{
                background: '#120f26',
                border: '2px solid var(--border-color)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: 'var(--box-shadow-chunky)',
                position: 'relative',
                top: '120px',
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
                  fontFamily: "'Share Tech Mono', monospace",
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
