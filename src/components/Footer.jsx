import React from 'react';
import { Github, Linkedin, Instagram, Twitter } from 'lucide-react';

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
          <a href="#" className="clickable" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', background: 'var(--card-bg)', border: '2px solid var(--border-color)', borderRadius: '8px', boxShadow: '2px 2px 0 var(--border-color)', color: 'var(--text-primary)', transition: 'var(--transition)' }} onMouseOver={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.background = 'var(--accent-primary)'; }} onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--card-bg)'; }}>
            <Github size={18} />
          </a>
          <a href="#" className="clickable" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', background: 'var(--card-bg)', border: '2px solid var(--border-color)', borderRadius: '8px', boxShadow: '2px 2px 0 var(--border-color)', color: 'var(--text-primary)', transition: 'var(--transition)' }} onMouseOver={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.background = '#0077b5'; }} onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--card-bg)'; }}>
            <Linkedin size={18} />
          </a>
          <a href="#" className="clickable" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', background: 'var(--card-bg)', border: '2px solid var(--border-color)', borderRadius: '8px', boxShadow: '2px 2px 0 var(--border-color)', color: 'var(--text-primary)', transition: 'var(--transition)' }} onMouseOver={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.background = '#E1306C'; }} onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--card-bg)'; }}>
            <Instagram size={18} />
          </a>
          <a href="#" className="clickable" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', background: 'var(--card-bg)', border: '2px solid var(--border-color)', borderRadius: '8px', boxShadow: '2px 2px 0 var(--border-color)', color: 'var(--text-primary)', transition: 'var(--transition)' }} onMouseOver={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.background = '#1DA1F2'; }} onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--card-bg)'; }}>
            <Twitter size={18} />
          </a>
        </div>

        <ul style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
          <li><a href="#about" className="text-muted clickable" style={{ transition: 'var(--transition)', fontWeight: 600 }} onMouseOver={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>About</a></li>
          <li><a href="#projects" className="text-muted clickable" style={{ transition: 'var(--transition)', fontWeight: 600 }} onMouseOver={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>Projects</a></li>
          <li><a href="#services" className="text-muted clickable" style={{ transition: 'var(--transition)', fontWeight: 600 }} onMouseOver={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>Services</a></li>
          <li><a href="#contact" className="text-muted clickable" style={{ transition: 'var(--transition)', fontWeight: 600 }} onMouseOver={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>Contact</a></li>
        </ul>

        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', width: '100%', borderTop: '2px solid var(--border-color)', paddingTop: '1.5rem', fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}>
          <p>© {currentYear} Neha Raut. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
