import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ theme, toggleTheme, installPromptEvent, setInstallPromptEvent }) => {
  const [isScrolled, setIsScrolled] = useState(false);
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
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease',
      padding: isScrolled ? '0.75rem 0' : '1.25rem 0',
      background: isScrolled ? 'var(--glass-bg)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      borderBottom: isScrolled ? '1px solid var(--glass-border)' : 'none',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#" className="heading-md" style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <span className="text-gradient" style={{ fontWeight: 900 }}>Neha</span> Raut.
        </a>

        {/* Desktop Menu */}
        <ul style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                className="text-muted clickable" 
                style={{ 
                  transition: 'var(--transition)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  fontFamily: "'Poppins', sans-serif"
                }}
                onMouseOver={(e) => e.target.style.color = 'var(--accent-primary)'}
                onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </li>
          {installPromptEvent && !isInstalled && (
            <li>
              <motion.button
                id="pwa-install-btn"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleInstallClick}
                className="btn clickable"
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
          <li>
            <a href="#contact" className="btn btn-primary clickable" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
              Let's Talk
            </a>
          </li>
        </ul>

        {/* Mobile Menu Toggle & ThemeToggle combo */}
        <div style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }} className="mobile-actions">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button 
            className="mobile-nav-toggle"
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '8px' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-actions { display: flex !important; }
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
              background: 'var(--bg-secondary)',
              borderBottom: '2px solid var(--border-color)',
              padding: '1.5rem',
            }}
          >
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
              {navLinks.map((link) => (
                <li key={link.name} style={{ width: '100%', textAlign: 'center' }}>
                  <a 
                    href={link.href} 
                    style={{ display: 'block', padding: '0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li style={{ width: '100%', display: 'flex', justifyContent: 'center', pt: '0.5rem' }}>
                <a 
                  href="#contact" 
                  className="btn btn-primary clickable" 
                  style={{ width: '80%', textAlign: 'center' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Let's Talk
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
