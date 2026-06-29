import React, { useState, useEffect } from 'react';
import { Send, X, Mail, Sparkles } from 'lucide-react';

/**
 * ContactPopup — appears after page load.
 *
 * Email is sent via EmailJS using environment variables:
 *   VITE_EMAILJS_SERVICE_ID
 *   VITE_EMAILJS_TEMPLATE_ID
 *   VITE_EMAILJS_PUBLIC_KEY
 *
 * If env vars are not set, falls back to Gmail compose link.
 */

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const USE_EMAILJS = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

const ContactPopup = ({ onClose }) => {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus]   = useState('idle'); // idle | sending | success | error

  // Close on ESC key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    if (USE_EMAILJS) {
      try {
        // Use EmailJS REST API — no npm package needed
        const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id:  SERVICE_ID,
            template_id: TEMPLATE_ID,
            user_id:     PUBLIC_KEY,
            template_params: {
              from_name:  name  || 'Visitor',
              from_email: email || '',
              message:    message || '',
              to_email:   'gracy.codeanddeploy@gmail.com',
            },
          }),
        });
        if (!res.ok) throw new Error(`EmailJS ${res.status}`);
        setStatus('success');
        return;
      } catch (err) {
        console.error('EmailJS error:', err);
        setStatus('error');
        return;
      }
    }

    // Fallback: open Gmail compose
    const subject = `Portfolio Message from ${name || 'Visitor'}`;
    const body    = `Name: ${name || 'N/A'}\nEmail: ${email || 'N/A'}\n\n${message || ''}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=gracy.codeanddeploy@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
    setStatus('success');
  };

  return (
    <div
      className="form-popup-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Quick contact form"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="form-popup-modal">

        {/* Close button */}
        <button
          className="form-popup-close"
          onClick={onClose}
          aria-label="Close popup"
        >
          ✕
        </button>

        {status === 'success' ? (
          /* Success state */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff2a7a, #7c3bed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
              border: '3px solid var(--border-color)',
              boxShadow: 'var(--box-shadow-chunky)',
            }}>
              <span style={{ fontSize: '2rem' }}>🎉</span>
            </div>
            <h3 style={{
              fontFamily: "'Poppins', sans-serif", fontWeight: 900,
              fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.75rem',
            }}>
              Message Sent!
            </h3>
            <p className="text-muted" style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Thanks for reaching out! Neha will get back to you soon. 🚀
            </p>
            <button onClick={onClose} className="btn btn-primary" style={{ width: '100%' }}>
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                marginBottom: '0.5rem',
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: 'var(--accent-gradient)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid var(--border-color)',
                  boxShadow: 'var(--box-shadow-chunky)',
                  flexShrink: 0,
                }}>
                  <Mail size={18} color="#fff" />
                </div>
                <h2 style={{
                  fontFamily: "'Poppins', sans-serif", fontWeight: 900,
                  fontSize: '1.35rem', color: 'var(--text-primary)',
                }}>
                  Say Hi to Neha! 👋
                </h2>
              </div>
              <p className="text-muted" style={{
                fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', lineHeight: 1.6,
                paddingLeft: '2.6rem',
              }}>
                Quick message? Drop it here — she'd love to hear from you.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="grid grid-2" style={{ gap: '1rem' }}>
                <div>
                  <label
                    htmlFor="popup-name"
                    style={{
                      display: 'block', marginBottom: '0.35rem',
                      color: 'var(--text-primary)', fontWeight: 800,
                      fontSize: '0.8rem', fontFamily: "'Poppins', sans-serif",
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                    }}
                  >Name</label>
                  <input
                    id="popup-name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%', padding: '0.75rem 0.9rem',
                      background: 'var(--bg-secondary)',
                      border: '2px solid var(--border-color)',
                      borderRadius: '8px', color: 'var(--text-primary)',
                      fontFamily: "'Inter', sans-serif", fontSize: '0.9rem',
                      outline: 'none', transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                    onBlur={(e)  => e.target.style.borderColor = 'var(--border-color)'}
                  />
                </div>
                <div>
                  <label
                    htmlFor="popup-email"
                    style={{
                      display: 'block', marginBottom: '0.35rem',
                      color: 'var(--text-primary)', fontWeight: 800,
                      fontSize: '0.8rem', fontFamily: "'Poppins', sans-serif",
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                    }}
                  >Email</label>
                  <input
                    id="popup-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%', padding: '0.75rem 0.9rem',
                      background: 'var(--bg-secondary)',
                      border: '2px solid var(--border-color)',
                      borderRadius: '8px', color: 'var(--text-primary)',
                      fontFamily: "'Inter', sans-serif", fontSize: '0.9rem',
                      outline: 'none', transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                    onBlur={(e)  => e.target.style.borderColor = 'var(--border-color)'}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="popup-message"
                  style={{
                    display: 'block', marginBottom: '0.35rem',
                    color: 'var(--text-primary)', fontWeight: 800,
                    fontSize: '0.8rem', fontFamily: "'Poppins', sans-serif",
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                  }}
                >Message</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  {[
                    { label: "Fresh website", text: "I want to make a fresh website" },
                    { label: "Redesign website", text: "I want to redesign my existing website" },
                    { label: "E-commerce store", text: "I want to build an e-commerce store" },
                    { label: "Maintenance", text: "I need help maintaining my current website" },
                    { label: "Type manually", text: "" }
                  ].map((sug) => (
                    <button
                      key={sug.label}
                      type="button"
                      onClick={() => setMessage(sug.text)}
                      style={{
                        background: (message === sug.text && sug.text !== '') ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                        color: (message === sug.text && sug.text !== '') ? '#fff' : 'var(--text-secondary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '20px',
                        padding: '0.35rem 0.75rem',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontWeight: 600,
                        fontFamily: "'Inter', sans-serif"
                      }}
                    >
                      {sug.label}
                    </button>
                  ))}
                </div>
                <textarea
                  id="popup-message"
                  rows="3"
                  placeholder="What's on your mind?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  style={{
                    width: '100%', padding: '0.75rem 0.9rem',
                    background: 'var(--bg-secondary)',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px', color: 'var(--text-primary)',
                    fontFamily: "'Inter', sans-serif", fontSize: '0.9rem',
                    outline: 'none', resize: 'vertical', transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                  onBlur={(e)  => e.target.style.borderColor = 'var(--border-color)'}
                />
              </div>

              {status === 'error' && (
                <p style={{
                  color: '#ff2a7a', fontSize: '0.85rem',
                  fontFamily: "'Inter', sans-serif", fontWeight: 600,
                }}>
                  ⚠️ Something went wrong. Please try again or email directly.
                </p>
              )}

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '0.85rem' }}
                >
                  {status === 'sending' ? (
                    <>Sending… <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span></>
                  ) : (
                    <>Send Message <Send size={16} /></>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-secondary"
                  style={{ padding: '0.85rem 1.2rem' }}
                >
                  Maybe later
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ContactPopup;
