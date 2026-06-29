import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., waiting for assets)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--bg-primary)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          {/* Cyberpunk Scanner Loader */}
          <div style={{ position: 'relative', width: '120px', height: '120px' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: 0,
                border: '4px solid transparent',
                borderTopColor: 'var(--accent-primary)',
                borderBottomColor: 'var(--accent-secondary)',
                borderRadius: '50%',
                boxShadow: '0 0 20px var(--accent-light)',
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: '10px',
                border: '2px dashed var(--text-primary)',
                borderRadius: '50%',
                opacity: 0.5,
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                inset: '30px',
                background: 'var(--accent-gradient)',
                borderRadius: '50%',
                filter: 'blur(10px)',
              }}
            />
          </div>


        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
