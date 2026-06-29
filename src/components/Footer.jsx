import React from 'react';
import { Github, Linkedin, Instagram, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

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
            { Icon: Github, color: 'var(--accent-primary)', neon: 'var(--accent-primary)', href: 'https://github.com/Rautneha16', label: 'GitHub profile' },
            { Icon: Linkedin, color: '#0077b5', neon: '#00ffff', href: 'https://www.linkedin.com/in/neha-raut0516/', label: 'LinkedIn profile' },
            { Icon: WhatsAppIcon, color: '#25D366', neon: '#25D366', href: 'https://wa.me/917420008485?text=Hi%20Neha!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect.', label: 'WhatsApp chat' },
            { Icon: Instagram, color: '#E1306C', neon: '#ff2a7a', href: 'https://www.instagram.com/nehuu_1619', label: 'Instagram profile' },
            { Icon: Twitter, color: '#1DA1F2', neon: '#00ffff', href: 'https://x.com/Nravixa', label: 'X (Twitter) profile' }
          ].map(({ Icon, color, neon, href, label }, idx) => (
            <motion.a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
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



        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', width: '100%', borderTop: '2px solid var(--border-color)', paddingTop: '1.5rem', fontWeight: 500 }}>
          <p>© {currentYear} Neha Raut. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
