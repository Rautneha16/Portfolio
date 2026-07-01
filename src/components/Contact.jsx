import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const contactInfo = [
  {
    icon: <MapPin size={28} />,
    title: 'Location',
    detail: 'Pune, Maharashtra, India',
    link: 'https://maps.google.com/?q=Pune,+Maharashtra,+India',
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
    link: 'mailto:gracy.codeanddeploy@gmail.com?subject=Connecting%20from%20your%20Portfolio',
  },
];

// --- Magnetic Button Component ---
const MagneticButton = ({ children, status, onClick, type = "button", disabled = false }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    if (!ref.current || disabled) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = { x: e.clientX - center.x, y: e.clientY - center.y };
    x.set(distance.x * 0.2);
    y.set(distance.y * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    if (status !== 'idle' || disabled) {
      x.set(0);
      y.set(0);
    }
  }, [status, disabled, x, y]);

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled || status === 'loading' || status === 'success'}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: (disabled || status !== 'idle') ? 1 : 1.02 }}
      whileTap={{ scale: (disabled || status !== 'idle') ? 1 : 0.95 }}
      style={{
        x: springX,
        y: springY,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: status === 'success' ? '#10b981' : status === 'error' ? '#ef4444' : 'var(--accent-primary)',
        color: '#fff',
        border: 'none',
        borderRadius: status === 'loading' || status === 'success' ? '50px' : '12px',
        padding: status === 'loading' || status === 'success' ? '0' : '1rem 2rem',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        fontSize: '1.05rem',
        fontWeight: 700,
        cursor: (disabled || status !== 'idle') ? 'default' : 'pointer',
        boxShadow: status === 'idle' ? '0 10px 30px -10px var(--accent-primary)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}
    >
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div key="idle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {children} <Send size={20} />
          </motion.div>
        )}
        {status === 'loading' && (
          <motion.div key="loading" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
            <Loader2 size={24} className="animate-spin" />
          </motion.div>
        )}
        {status === 'success' && (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
            <CheckCircle2 size={28} />
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div key="error" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={24} /> Retry
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// --- Floating Label Input Component ---
const FloatingInput = ({ label, id, value, onChange, type = "text", required, minLength, onKeyDown }) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <motion.label
        htmlFor={id}
        initial={false}
        animate={{
          top: isActive ? '-10px' : '16px',
          left: isActive ? '10px' : '16px',
          fontSize: isActive ? '0.75rem' : '0.95rem',
          color: isFocused ? 'var(--accent-primary)' : 'var(--text-secondary)',
          backgroundColor: isActive ? 'var(--card-bg)' : 'transparent',
          padding: isActive ? '0 6px' : '0'
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          fontWeight: isActive ? 700 : 500,
          zIndex: 1,
          borderRadius: '4px'
        }}
      >
        {label}
      </motion.label>
      
      <motion.div
        animate={{
          boxShadow: isFocused ? '0 0 0 2px var(--accent-primary)' : '0 0 0 1px var(--border-color)',
          backgroundColor: isFocused ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
        }}
        style={{
          borderRadius: '12px',
          overflow: 'hidden',
          transition: 'background-color 0.3s ease'
        }}
      >
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={onKeyDown}
          required={required}
          minLength={minLength}
          style={{
            width: '100%',
            padding: '1rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            outline: 'none',
          }}
        />
      </motion.div>
    </div>
  );
};

// --- Floating Textarea Component ---
const FloatingTextarea = ({ label, id, value, onChange, required, minLength }) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <motion.label
        htmlFor={id}
        initial={false}
        animate={{
          top: isActive ? '-10px' : '16px',
          left: isActive ? '10px' : '16px',
          fontSize: isActive ? '0.75rem' : '0.95rem',
          color: isFocused ? 'var(--accent-primary)' : 'var(--text-secondary)',
          backgroundColor: isActive ? 'var(--card-bg)' : 'transparent',
          padding: isActive ? '0 6px' : '0'
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          fontWeight: isActive ? 700 : 500,
          zIndex: 1,
          borderRadius: '4px'
        }}
      >
        {label}
      </motion.label>
      
      <motion.div
        animate={{
          boxShadow: isFocused ? '0 0 0 2px var(--accent-primary)' : '0 0 0 1px var(--border-color)',
          backgroundColor: isFocused ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
        }}
        style={{
          borderRadius: '12px',
          overflow: 'hidden',
          transition: 'background-color 0.3s ease'
        }}
      >
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          minLength={minLength}
          rows="5"
          style={{
            width: '100%',
            padding: '1rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            outline: 'none',
            resize: 'vertical',
            minHeight: '120px'
          }}
        />
      </motion.div>
    </div>
  );
};

// --- Contact Card Component (Glassmorphism & Tilt) ---
const InteractiveContactCard = ({ item }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      whileHover={{ y: -10 }}
      onClick={() => window.open(item.link, item.link.startsWith('http') ? '_blank' : '_self')}
      className="glass-card contact-card-interactive"
      role="link"
      aria-label={`Open ${item.title} link`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.open(item.link, item.link.startsWith('http') ? '_blank' : '_self');
        }
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div 
        style={{
          position: 'absolute', inset: 0, borderRadius: 'inherit',
          background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255,42,122,0.12), transparent 40%)',
          pointerEvents: 'none', opacity: 0, transition: 'opacity 0.3s'
        }}
        className="card-glow"
      />
      <div style={{ position: 'relative', zIndex: 2, padding: '2.5rem 1rem', textAlign: 'center', cursor: 'pointer' }}>
        <motion.div
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          style={{
            width: '64px', height: '64px', borderRadius: '16px',
            background: 'var(--bg-tertiary)',
            color: 'var(--accent-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem',
            border: '2px solid var(--border-color)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 0 20px rgba(255,42,122,0.05)',
          }}
        >
          {item.icon}
        </motion.div>
        <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {item.title}
        </h4>
        <p className="text-muted" style={{ fontSize: '0.95rem', fontWeight: 600 }}>
          {item.detail}
        </p>
      </div>
    </motion.div>
  );
};


const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  // Mouse tracking for background parallax and spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  const bgX = useTransform(springX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-15, 15]);
  const bgY = useTransform(springY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const cards = document.querySelectorAll('.contact-card-interactive');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (status === 'loading' || status === 'success') return;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
      return;
    }

    setStatus('loading');

    setTimeout(() => {
      setStatus('success');
      
      setTimeout(() => {
        const subject = `Portfolio Message from ${name.trim()}`;
        const body = `Name: ${name.trim()}\nEmail: ${email.trim()}\nContact Number: ${phone.trim() || 'Not provided'}\n\nMessage:\n${message}`;
        const mailtoUrl = `mailto:gracy.codeanddeploy@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.location.href = mailtoUrl;
        
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setTimeout(() => setStatus('idle'), 1000);
      }, 1500);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      if (btn) btn.click();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: { 
      opacity: 1, y: 0, scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
        staggerChildren: 0.1, 
        delayChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 14 } }
  };

  return (
    <section id="contact" className="section" style={{ position: 'relative', overflow: 'visible' }}>
      
      {/* Background Animated Gradient Blobs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <motion.div 
          style={{ x: bgX, y: bgY, position: 'absolute', top: '10%', left: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(255,42,122,0.06) 0%, transparent 60%)', filter: 'blur(60px)' }}
        />
        <motion.div 
          style={{ x: bgY, y: bgX, position: 'absolute', bottom: '-10%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(124,59,237,0.06) 0%, transparent 60%)', filter: 'blur(60px)' }}
        />
      </div>
      
      <style>{`
        .contact-card-interactive:hover .card-glow { opacity: 1 !important; }
        .error-shake { animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both; }
        @keyframes shake {
          10%, 90% { transform: translate3d(-2px, 0, 0); }
          20%, 80% { transform: translate3d(4px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-6px, 0, 0); }
          40%, 60% { transform: translate3d(6px, 0, 0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin { animation: spin-slow 1s linear infinite; }
      `}</style>

      <div style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>Let's Build Something <span className="text-gradient">Epic</span></h2>
          <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Whether you have a wild idea, a project to launch, or just want to say hi — I'd love to hear from you.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-3" style={{ marginBottom: '5rem', gap: '2rem' }}>
          {contactInfo.map((item) => (
            <InteractiveContactCard key={item.title} item={item} />
          ))}
        </div>

        {/* Contact Form Wrapper */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="glass-card"
          style={{ maxWidth: '850px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem)', background: 'var(--glass-bg)' }}
        >
          <motion.div variants={itemVariants} style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h3 style={{ fontWeight: 900, fontSize: '1.75rem', color: 'var(--text-primary)' }}>
              Send me a message
            </h3>
          </motion.div>
          
          <form 
            onSubmit={handleSubmit} 
            className={status === 'error' ? 'error-shake' : ''}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <div className="grid grid-2" style={{ gap: '1.5rem' }}>
              <motion.div variants={itemVariants}>
                <FloatingInput label="Your Name" id="name" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} onKeyDown={handleKeyDown} />
              </motion.div>
              <motion.div variants={itemVariants}>
                <FloatingInput label="Email Address" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required onKeyDown={handleKeyDown} />
              </motion.div>
            </div>
            
            <motion.div variants={itemVariants}>
              <FloatingInput label="Contact Number (Optional)" id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} onKeyDown={handleKeyDown} />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              {/* Suggestion Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1rem' }}>
                {[
                  { label: "Fresh website", text: "I want to make a fresh website" },
                  { label: "Redesign", text: "I want to redesign my existing website" },
                  { label: "E-commerce", text: "I want to build an e-commerce store" },
                ].map((sug) => (
                  <button
                    key={sug.label}
                    type="button"
                    onClick={() => {
                      setMessage(sug.text + (sug.text ? ' ' : ''));
                      setTimeout(() => {
                        const el = document.getElementById('message');
                        if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
                      }, 50);
                    }}
                    style={{
                      background: (message === sug.text + ' ') ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                      color: (message === sug.text + ' ') ? '#fff' : 'var(--text-secondary)',
                      border: '1px solid',
                      borderColor: (message === sug.text + ' ') ? 'var(--accent-primary)' : 'var(--border-color)',
                      borderRadius: '20px',
                      padding: '0.4rem 0.85rem',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      fontWeight: 600
                    }}
                    onMouseOver={(e) => {
                      if (message !== sug.text + ' ') {
                        e.target.style.borderColor = 'var(--accent-primary)';
                        e.target.style.color = 'var(--text-primary)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (message !== sug.text + ' ') {
                        e.target.style.borderColor = 'var(--border-color)';
                        e.target.style.color = 'var(--text-secondary)';
                      }
                    }}
                  >
                    {sug.label}
                  </button>
                ))}
              </div>
              <FloatingTextarea label="Tell me about your project..." id="message" value={message} onChange={(e) => setMessage(e.target.value)} required minLength={10} />
            </motion.div>
            
            <motion.div variants={itemVariants} style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
              <motion.div 
                animate={{ width: status === 'loading' || status === 'success' ? 60 : '100%' }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', margin: '0 auto', maxWidth: '100%' }}
              >
                <MagneticButton id="submitBtn" type="submit" status={status}>
                  Send Request
                </MagneticButton>
              </motion.div>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
