import React from 'react';
import { motion } from 'framer-motion';

const ThemeToggle = ({ theme, toggleTheme }) => {
  const isDark = theme === 'dark';

  // Sun/Moon SVG animation variants
  const svgVariants = {
    light: { rotate: 0 },
    dark: { rotate: 40 },
  };

  const sunCenterVariants = {
    light: { r: 5 },
    dark: { r: 9 },
  };

  const sunRaysVariants = {
    light: { opacity: 1, scale: 1 },
    dark: { opacity: 0, scale: 0 },
  };

  const moonMaskVariants = {
    light: { cx: 25, cy: 5 },
    dark: { cx: 18, cy: 6 },
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="clickable"
      style={{
        background: 'transparent',
        border: 'none',
        padding: '8px',
        borderRadius: '50%',
        width: '44px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        outline: 'none',
        transition: 'background-color 0.2s',
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 42, 122, 0.08)')}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
    >
      {/* Playful background effect */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          zIndex: 0,
        }}
        whileTap={{ scale: 0.9 }}
      />

      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: 'var(--text-primary)', zIndex: 1, overflow: 'visible' }}
        animate={isDark ? 'dark' : 'light'}
        variants={svgVariants}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <mask id="moon-mask">
          <rect x="0" y="0" width="24" height="24" fill="white" />
          <motion.circle
            fill="black"
            r="8"
            variants={moonMaskVariants}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          />
        </mask>

        <motion.circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask="url(#moon-mask)"
          variants={sunCenterVariants}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        />

        <motion.g
          stroke="currentColor"
          variants={sunRaysVariants}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </motion.g>
      </motion.svg>

      {/* Tiny sparklers for Josh-like feel on dark mode */}
      {isDark && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <span style={{ position: 'absolute', top: '10%', left: '80%', fontSize: '8px', color: 'var(--accent-primary)', opacity: 0.8 }} className="animate-pulse-soft">✦</span>
          <span style={{ position: 'absolute', top: '75%', left: '15%', fontSize: '10px', color: 'var(--accent-secondary)', opacity: 0.6 }} className="animate-pulse-soft">✦</span>
        </div>
      )}
    </button>
  );
};

export default ThemeToggle;
