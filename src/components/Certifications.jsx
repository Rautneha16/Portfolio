import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen } from 'lucide-react';
import { fadeInUpVariant, childFadeInUp } from '../utils/animations';

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
    <section id="certifications" className="section">
      <motion.div
        variants={fadeInUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="heading-lg">Education & <span className="text-gradient">Certifications</span></h2>
        
        <div className="grid grid-3">
          {certifications.map((cert, index) => (
            <motion.div 
              key={cert.id}
              variants={childFadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass-card"
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
                <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>{cert.issuer}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 700 }}>{cert.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Certifications;
