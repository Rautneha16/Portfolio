import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from './images/logo.png';

const Navbar = ({ installPromptEvent, setInstallPromptEvent }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  // Track if app is already installed
  useEffect(() => {
    const mql = window.matchMedia('(display-mode: standalone)');
    setIsInstalled(mql.matches);
    const handler = (e) => setIsInstalled(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!installPromptEvent) return;
    installPromptEvent.prompt();
    const { outcome } = await installPromptEvent.userChoice;
    if (outcome === 'accepted') {
      setInstallPromptEvent(null);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setIsPastHero(window.scrollY > (window.innerHeight * 0.75));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: isScrolled ? '1rem' : 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      transition: 'padding 0.4s ease, background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease, top 0.4s ease',
      padding: isScrolled ? '0.5rem 0' : '1.25rem 0',
      background: 'transparent',
      backdropFilter: 'none',
      WebkitBackdropFilter: 'none',
      borderBottom: 'none',
      boxShadow: 'none',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#" className="heading-md navbar-logo-text"
          style={{
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontWeight: 900,
            letterSpacing: '0.08em',
            color: isScrolled ? 'var(--text-primary)' : '#ffffff',
            textShadow: isScrolled ? 'none' : '0 0 20px rgba(255,42,122,0.7)',
            filter: isScrolled ? 'none' : 'drop-shadow(0 0 8px rgba(255,42,122,0.4))',
            transition: 'color 0.3s ease, text-shadow 0.3s ease',
            textDecoration: 'none'
          }}
        >
          <img 
            src={logoImage.src ? logoImage.src : logoImage} 
            alt="Neha Raut logo" 
            className="navbar-logo-img"
            style={{ borderRadius: '50%', objectFit: 'cover' }} 
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <AnimatePresence>
            {!isPastHero && (
              <motion.div
                initial={{ opacity: 0, width: 0, scale: 0.8, filter: 'blur(4px)' }}
                animate={{ opacity: 1, width: 'auto', scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, width: 0, scale: 0.8, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}
              >
                <span className="text-gradient">Neha</span>&nbsp;Raut
              </motion.div>
            )}
          </AnimatePresence>
        </a>

        {/* Desktop Menu */}
        <ul style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                aria-label={`Navigate to ${link.name} section`}
                style={{ 
                  transition: 'color 0.2s ease, text-shadow 0.2s ease',
                  fontWeight: 500,
                  fontSize: '0.78rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: isScrolled ? 'var(--text-primary)' : 'rgba(255,255,255,0.75)',
                }}
                onMouseOver={(e) => {
                  e.target.style.color = '#00ffff';
                  e.target.style.textShadow = '0 0 12px rgba(0,255,255,0.8)';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = isScrolled ? 'var(--text-primary)' : 'rgba(255,255,255,0.75)';
                  e.target.style.textShadow = 'none';
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
          {installPromptEvent && !isInstalled && (
            <li>
              <motion.button
                id="pwa-install-btn"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleInstallClick}
                className="btn"
                style={{
                  padding: '0.5rem 1.1rem',
                  fontSize: '0.82rem',
                  background: 'var(--accent-gradient)',
                  color: '#fff',
                  borderColor: 'var(--border-color)',
                  gap: '0.4rem',
                }}
                title="Install as App"
              >
                <Download size={14} />
                Install App
              </motion.button>
            </li>
          )}
        </ul>

        {/* Mobile Menu Toggle & ThemeToggle combo */}
        <div style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }} className="mobile-actions">
          <button 
            className="mobile-nav-toggle"
            type="button"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '8px' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        /* Desktop Default (Laptop and up) */
        .navbar-logo-img { width: 52px; height: 52px; }
        .navbar-logo-text { font-size: 1.4rem; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-actions { display: flex !important; }
          
          /* Mobile sizes */
          .navbar-logo-img { width: 42px; height: 42px; }
          .navbar-logo-text { font-size: 1.15rem; }
        }
      `}</style>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'rgba(5, 2, 20, 0.75)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(0,255,255,0.2)',
              padding: '1.5rem',
            }}
          >
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
              {navLinks.map((link) => (
                <li key={link.name} style={{ width: '100%', textAlign: 'center' }}>
                  <a 
                    href={link.href} 
                    style={{
                      display: 'block',
                      padding: '0.5rem',
                      fontWeight: 500,
                      fontSize: '0.8rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.8)',
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
