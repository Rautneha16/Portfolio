import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PWARegistration from './components/PWARegistration';

function App() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineBanner, setShowOfflineBanner] = useState(!navigator.onLine);

  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) return savedTheme;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? 'dark' : 'light';
  });

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Online / Offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineBanner(false);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineBanner(true);
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current && followerRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        followerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.classList.contains('clickable')
      ) {
        if (followerRef.current) {
          followerRef.current.style.width = '48px';
          followerRef.current.style.height = '48px';
          followerRef.current.style.backgroundColor = 'var(--accent-light)';
          followerRef.current.style.borderColor = 'var(--accent-primary)';
        }
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.classList.contains('clickable')
      ) {
        if (followerRef.current) {
          followerRef.current.style.width = '32px';
          followerRef.current.style.height = '32px';
          followerRef.current.style.backgroundColor = 'transparent';
          followerRef.current.style.borderColor = 'var(--accent-secondary)';
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div className="app-container">
      {/* PWA Registration (service worker + install prompt capture) */}
      <PWARegistration onInstallPromptReady={setInstallPromptEvent} />

      {/* Offline Banner */}
      {showOfflineBanner && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99999,
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          borderBottom: '2px solid #ff2a7a',
          padding: '0.6rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          animation: 'slideDown 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}>
          <span style={{ fontSize: '1.1rem' }}>📡</span>
          <p style={{
            color: '#f1edf7',
            fontFamily: "'Poppins', 'Inter', sans-serif",
            fontWeight: 600,
            fontSize: '0.875rem',
            margin: 0,
          }}>
            You're offline — browsing cached content
          </p>
          <button
            onClick={() => setShowOfflineBanner(false)}
            style={{
              position: 'absolute',
              right: '1rem',
              background: 'none',
              border: 'none',
              color: '#a39eb2',
              fontSize: '1.25rem',
              cursor: 'pointer',
              lineHeight: 1,
              padding: '0 0.25rem',
            }}
            aria-label="Dismiss offline notice"
          >×</button>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-100%); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="custom-cursor" ref={cursorRef} />
      <div className="custom-cursor-follower" ref={followerRef} />
      <Navbar theme={theme} toggleTheme={toggleTheme} installPromptEvent={installPromptEvent} setInstallPromptEvent={setInstallPromptEvent} />
      <main style={{ paddingTop: showOfflineBanner ? '2.5rem' : '0' }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Experience />
        <Certifications />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

