import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen } from 'lucide-react';

const Certifications = () => {
  const certifications = [
    {
      id: 1,
      title: "BE - Information Technology",
      issuer: "Savitribai Phule Pune University",
      date: "2021 - 2024",
      icon: <BookOpen size={24} color="var(--accent-secondary)" />
    },
    {
      id: 2,
      title: "Tech Navinya - 1st Rank Gold Medalist",
      issuer: "Tech Project Competition",
      date: "2024",
      icon: <Award size={24} color="var(--accent-primary)" />
    },
    {
      id: 3,
      title: "Super 20 Scholarship Program",
      issuer: "Work with Dignity Foundation",
      date: "2024",
      icon: <Award size={24} color="var(--accent-primary)" />
    }
  ];

  return (
    <section id="certifications" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="heading-lg">Education & <span className="text-gradient">Certifications</span></h2>
        
        <div className="grid grid-3">
          {certifications.map((cert, index) => (
            <motion.div 
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="chunky-card clickable"
              style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1.75rem' }}
            >
              <div style={{ 
                background: 'var(--accent-light)', 
                padding: '0.85rem', 
                border: '2px solid var(--border-color)',
                boxShadow: '2px 2px 0 var(--border-color)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cert.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.25rem' }}>{cert.title}</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.25rem', fontFamily: "'Inter', sans-serif" }}>{cert.issuer}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}>{cert.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Certifications;
