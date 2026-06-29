import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { fadeInUpVariant, childFadeInUp } from '../utils/animations';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      role: "Intern (Software Developer)",
      company: "X Vector Technologies Pvt. Ltd",
      duration: "Aug 2024 - Sep 2025",
      description: "Assist with tasks such as website development, creating user-friendly and visually appealing frontends. Build websites tailored to meet client requirements. Collaborate with cross-functional teams to ensure objectives are met, from planning to deployment. Deliver responsive, scalable web solutions."
    },
    {
      id: 2,
      role: "Trainee",
      company: "Super 20 Scholarship Program",
      duration: "Apr 2024 - Jul 2024",
      description: "Participated in the SUPER 20 Program by Work with Dignity Foundation. Gained hands-on experience in SQL Server for data management, Python for web development, and JavaScript for advanced scripting and UI development."
    }
  ];

  return (
    <section id="experience" className="section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="heading-lg">Work <span className="text-gradient">Experience</span></h2>
      </motion.div>

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
        {/* Vertical Timeline Line */}
        <div style={{
          position: 'absolute',
          left: '24px',
          top: 0,
          bottom: 0,
          width: '2px',
          background: 'var(--border-color)',
          zIndex: 0
        }} />

        {experiences.map((exp, index) => (
          <motion.div 
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ x: 15, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ position: 'relative', paddingLeft: '4rem', marginBottom: '3rem', zIndex: 1, cursor: 'pointer' }}
          >
              <div style={{
                position: 'absolute',
                left: '8px',
                top: '0',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'var(--card-bg)',
                border: '2px solid var(--border-color)',
                boxShadow: '2px 2px 0px var(--shadow-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Briefcase size={16} color="var(--accent-primary)" />
              </div>
              
              <div className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '1rem', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>{exp.role}</h3>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-secondary)' }}>{exp.company}</h4>
                  </div>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    background: 'var(--accent-light)', 
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--accent-primary)',
                    height: 'fit-content'
                  }}>
                    {exp.duration}
                  </span>
                </div>
                <p className="text-muted" style={{ lineHeight: 1.7, fontSize: '0.95rem' }}>{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
    </section>
  );
};

export default Experience;
