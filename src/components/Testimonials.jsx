import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import TiltCard from './TiltCard';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      content: "Neha completely transformed our online presence. Her attention to detail and design aesthetic are unmatched. She delivered the project ahead of schedule and exceeded all our expectations.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Marketing Director",
      content: "Working with Neha was a breeze. She understands both the technical requirements and the business goals perfectly. The landing page she built increased our conversion rate by 45%.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
    }
  ];

  return (
    <section id="testimonials" className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="heading-lg">Client <span className="text-gradient">Testimonials</span></h2>
        
        <div className="grid grid-2">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.05, 
                rotate: index % 2 === 0 ? 2 : -2, 
                y: -10,
                boxShadow: '0 0 25px rgba(0, 255, 255, 0.3)'
              }}
              whileTap={{ scale: 0.98 }}
              style={{ perspective: '1000px', cursor: 'pointer' }}
            >
              <TiltCard
                className="glass-card"
                style={{ position: 'relative', padding: '2.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{
                  background: 'var(--accent-gradient)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 15px rgba(255, 42, 122, 0.4)',
                  marginBottom: '1.5rem'
                }}>
                  <Quote size={20} color="white" />
                </div>
                
                <p style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  marginBottom: '2rem',
                  color: 'var(--text-primary)',
                  fontStyle: 'italic',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500
                }}>"{testimonial.content}"</p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto' }}>
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    style={{
                      width: '55px',
                      height: '55px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--accent-primary)',
                      padding: '2px',
                      background: 'var(--bg-primary)'
                    }}
                  />
                  <div>
                    <h3 style={{
                      fontFamily: "'Cyberpunk', sans-serif",
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      fontSize: '1.1rem',
                      marginBottom: '0.2rem'
                    }}>{testimonial.name}</h3>
                    <p className="text-muted" style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{testimonial.role}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
