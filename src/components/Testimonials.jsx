import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

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
              className="chunky-card clickable"
              style={{ position: 'relative', padding: '3.5rem 2rem 2.25rem' }}
            >
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '2rem',
                background: 'var(--accent-gradient)',
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid var(--border-color)',
                boxShadow: 'var(--box-shadow-chunky)'
              }}>
                <Quote size={18} color="white" fill="white" />
              </div>
              
              <p className="text-muted" style={{ fontSize: '1.05rem', fontStyle: 'italic', marginBottom: '2rem', lineHeight: 1.8, fontFamily: "'Inter', sans-serif" }}>
                "{testimonial.content}"
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color)' }}
                />
                <div>
                  <h4 style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{testimonial.name}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
