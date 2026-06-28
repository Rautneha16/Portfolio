import React from 'react';
import { Github, Linkedin, Instagram, Twitter, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={{ 
      borderTop: '2px solid var(--border-color)', 
      background: 'var(--bg-secondary)',
      padding: '3rem 2rem 1.5rem',
      transition: 'background-color 0.3s ease'
    }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { Icon: Github, color: 'var(--accent-primary)', neon: 'var(--accent-primary)', href: 'https://github.com/Rautneha16' },
            { Icon: Linkedin, color: '#0077b5', neon: '#00ffff', href: 'https://www.linkedin.com/in/neha-raut0516/' },
            { Icon: Instagram, color: '#E1306C', neon: '#ff2a7a', href: 'https://www.instagram.com/nehuu_1619' },
            { Icon: Twitter, color: '#1DA1F2', neon: '#00ffff', href: 'https://x.com/Nravixa' }
          ].map(({ Icon, color, neon, href }, idx) => (
            <motion.a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Social Link"
              whileHover={{ 
                y: -6, 
                scale: 1.15,
                rotate: [0, -10, 10, -5, 5, 0],
              }}
              transition={{ duration: 0.4 }}
              whileTap={{ scale: 0.9 }}
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
                transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s, border-color 0.3s' 
              }}
              onMouseOver={(e) => { 
                e.currentTarget.style.color = 'white'; 
                e.currentTarget.style.background = color;
                e.currentTarget.style.boxShadow = `0 0 15px ${neon}`;
                e.currentTarget.style.borderColor = color;
              }} 
              onMouseOut={(e) => { 
                e.currentTarget.style.color = 'var(--text-primary)'; 
                e.currentTarget.style.background = 'var(--card-bg)';
                e.currentTarget.style.boxShadow = '2px 2px 0 var(--border-color)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>



        <div style={{ position: 'relative', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', width: '100%', borderTop: '2px solid var(--border-color)', paddingTop: '1.5rem', fontWeight: 500, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ flex: 1 }}>© {currentYear} Neha Raut. All rights reserved.</p>
          
          {/* Back to Top Button */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -5, boxShadow: '0 0 15px var(--accent-primary)', backgroundColor: 'var(--accent-primary)', color: '#fff' }}
            whileTap={{ scale: 0.9 }}
            className="glitch-hover"
            style={{
              position: 'absolute',
              right: 0,
              background: 'transparent',
              border: '2px solid var(--accent-primary)',
              color: 'var(--accent-primary)',
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              outline: 'none',
              boxShadow: '0 0 8px rgba(255,42,122,0.3)',
              transition: 'background-color 0.3s, color 0.3s',
            }}
            title="Back to Top"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
