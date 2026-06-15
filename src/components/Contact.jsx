import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const contactInfo = [
  {
    icon: <MapPin size={28} />,
    title: 'Location',
    detail: 'Pune, Maharashtra, India',
    link: null,
  },
  {
    icon: <Phone size={28} />,
    title: 'Phone',
    detail: '+91 7420008485',
    link: 'tel:+917420008485',
  },
  {
    icon: <Mail size={28} />,
    title: 'Mail',
    detail: 'gracy.codeanddeploy@gmail.com',
    link: 'https://mail.google.com/mail/?view=cm&fs=1&to=gracy.codeanddeploy@gmail.com',
  },
];

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const subject = `Portfolio Message from ${name || 'Visitor'}`;
    const body = `Name: ${name || 'N/A'}%0D%0AEmail: ${email || 'N/A'}%0D%0A%0D%0A${message || ''}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=gracy.codeanddeploy@gmail.com&su=${encodeURIComponent(subject)}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  return (
    <section id="contact" className="section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Section Label */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: '0.85rem',
            color: 'var(--accent-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: '0.75rem',
            display: 'block',
          }}>
            CONTACT
          </span>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
            color: 'var(--text-primary)',
            lineHeight: 1.3,
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            Feel free to contact me if any assistance is needed
          </h2>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-3" style={{ marginBottom: '4rem' }}>
          {contactInfo.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              className="chunky-card clickable"
              style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}
            >
              <div style={{
                width: '60px', height: '60px', borderRadius: '12px',
                background: 'var(--accent-primary)',
                color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.25rem',
                border: '2px solid var(--border-color)',
                boxShadow: 'var(--box-shadow-chunky)',
              }}>
                {item.icon}
              </div>
              <h4 style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800, fontSize: '1rem',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
              }}>
                {item.title}
              </h4>
              <p className="text-muted" style={{ fontSize: '0.95rem', fontFamily: "'Inter', sans-serif" }}>
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="clickable"
                    style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}
                  >
                    {item.detail}
                  </a>
                ) : (
                  item.detail
                )}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="chunky-card"
          style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem' }}
        >
          <h3 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800, fontSize: '1.4rem',
            color: 'var(--text-primary)',
            marginBottom: '2rem',
            textAlign: 'center',
          }}>
            Send me a message
          </h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-primary)', fontWeight: 800, fontSize: '0.85rem', fontFamily: "'Poppins', sans-serif" }}>Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%', padding: '0.85rem 1rem',
                    background: 'var(--bg-secondary)',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    fontFamily: "'Inter', sans-serif", fontSize: '0.95rem',
                    outline: 'none', transition: 'border-color 0.3s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                />
              </div>
              <div>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-primary)', fontWeight: 800, fontSize: '0.85rem', fontFamily: "'Poppins', sans-serif" }}>Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%', padding: '0.85rem 1rem',
                    background: 'var(--bg-secondary)',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    fontFamily: "'Inter', sans-serif", fontSize: '0.95rem',
                    outline: 'none', transition: 'border-color 0.3s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-primary)', fontWeight: 800, fontSize: '0.85rem', fontFamily: "'Poppins', sans-serif" }}>Message</label>
              <textarea
                id="message"
                rows="5"
                placeholder="Tell me about your project..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  width: '100%', padding: '0.85rem 1rem',
                  background: 'var(--bg-secondary)',
                  border: '2px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontFamily: "'Inter', sans-serif", fontSize: '0.95rem',
                  outline: 'none', resize: 'vertical',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary clickable"
              style={{ width: '100%', marginTop: '0.5rem', padding: '1rem' }}
            >
              Send Message <Send size={18} />
            </button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
