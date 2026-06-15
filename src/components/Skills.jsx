import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming & UI",
      skills: [
        { name: "HTML/CSS", level: 90 },
        { name: "React JS / Angular", level: 85 },
        { name: "Java / C++", level: 80 },
        { name: ".NET", level: 75 }
      ]
    },
    {
      title: "Database & Tools",
      skills: [
        { name: "SQL & DBMS", level: 85 },
        { name: "VS Code", level: 95 },
        { name: "GitHub", level: 90 },
        { name: "Data Management", level: 80 }
      ]
    },
    {
      title: "Core Concepts",
      skills: [
        { name: "OOPs", level: 90 },
        { name: "SDLC", level: 85 },
        { name: "Web Development", level: 90 },
        { name: "API Integration", level: 80 }
      ]
    }
  ];

  return (
    <section id="skills" className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="heading-lg">Technical <span className="text-gradient">Skills</span></h2>

        <div className="grid grid-3">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="chunky-card"
            >
              <h3 className="heading-md" style={{ color: 'var(--accent-secondary)', fontWeight: 800 }}>{category.title}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
                {category.skills.map(skill => (
                  <div key={skill.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{skill.name}</span>
                      <span className="text-muted" style={{ fontWeight: 600 }}>{skill.level}%</span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '10px',
                      background: 'var(--bg-tertiary)',
                      border: '2px solid var(--border-color)',
                      borderRadius: '6px',
                      overflow: 'hidden'
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        style={{
                          height: '100%',
                          background: 'var(--accent-gradient)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
