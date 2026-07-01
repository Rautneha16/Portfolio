"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PWARegistration from '../components/PWARegistration';
import Preloader from '../components/Preloader';
import SkeletonLoader from '../components/SkeletonLoader';

const About = dynamic(() => import('../components/About'));
const Skills = dynamic(() => import('../components/Skills'));
const Projects = dynamic(() => import('../components/Projects'));
const Services = dynamic(() => import('../components/Services'));
const Footer = dynamic(() => import('../components/Footer'));
const AnimatedBackground = dynamic(() => import('../components/AnimatedBackground'), { ssr: false });

const Experience = dynamic(() => import('../components/Experience'));
const Certifications = dynamic(() => import('../components/Certifications'));
const Contact = dynamic(() => import('../components/Contact'));

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917420008485';

function Page() {
  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const [showOfflineBanner, setShowOfflineBanner] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  // Track scroll for WhatsApp button visibility + scroll-to-top on mount
  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      
      const isPastHero = scrollY > viewportHeight * 0.5;
      // Hide the floating button when we reach the footer (approx 200px from bottom)
      const isNearBottom = scrollY + viewportHeight >= fullHeight - 200;
      
      setShowWhatsApp(isPastHero && !isNearBottom);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Online / Offline detection
  useEffect(() => {
    // Set initial state client-side (avoids SSR mismatch)
    setShowOfflineBanner(!navigator.onLine);

    const handleOnline = () => setShowOfflineBanner(false);
    const handleOffline = () => setShowOfflineBanner(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Preloader />
      <Navbar installPromptEvent={installPromptEvent} setInstallPromptEvent={setInstallPromptEvent} />
      
      {/* Floating WhatsApp FAB with animations */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Neha! I came across your profile and was impressed by your work. I'd love to connect.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ 
          opacity: showWhatsApp ? 1 : 0,
          y: showWhatsApp ? [0, -8, 0] : 20,
          scale: showWhatsApp ? 1 : 0.8,
        }}
        transition={{ 
          y: { repeat: showWhatsApp ? Infinity : 0, duration: 3, ease: "easeInOut" },
          opacity: { duration: 0.4 },
          scale: { duration: 0.4 }
        }}
        whileHover={{ scale: 1.15, rotate: 10, filter: 'brightness(1.1)', boxShadow: '0 0 30px rgba(37, 211, 102, 0.8)' }}
        whileTap={{ scale: 0.9 }}
        style={{
          visibility: showWhatsApp ? 'visible' : 'hidden',
          pointerEvents: showWhatsApp ? 'auto' : 'none',
        }}
      >
        <span className="whatsapp-fab-tooltip">Chat with me!</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>

      <div className="app-container">
        {/* PWA Registration (service worker + install prompt capture) */}
        <PWARegistration onInstallPromptReady={setInstallPromptEvent} />

        {/* Offline Banner */}
        {showOfflineBanner && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 99999,
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            borderBottom: '2px solid #ff2a7a',
            padding: '0.6rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            animation: 'slideDown 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}>
            <span style={{ fontSize: '1.1rem' }}>📡</span>
            <p style={{
              color: '#f1edf7',
              fontFamily: "'Poppins', 'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '0.875rem',
              margin: 0,
            }}>
              You're offline — browsing cached content
            </p>
            <button
              type="button"
              onClick={() => setShowOfflineBanner(false)}
              style={{
                position: 'absolute',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: '#a39eb2',
                fontSize: '1.25rem',
                cursor: 'pointer',
                lineHeight: 1,
                padding: '0 0.25rem',
              }}
              aria-label="Dismiss offline notice"
            >×</button>
          </div>
        )}
        <style>{`
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-100%); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <main style={{ paddingTop: showOfflineBanner ? '2.5rem' : '0' }}>
          <Hero />
          
          <div style={{ position: 'relative' }}>
            <AnimatedBackground />
            <About />
            <Skills />
            <Projects />
            <Services />
            <Suspense fallback={<SkeletonLoader />}>
              <Experience />
              <Certifications />
              <Contact />
            </Suspense>
          </div>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default Page;
