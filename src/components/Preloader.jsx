import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const config = {
  rotate: false,
  particleCount: 50,
  trailSpan: 0.28,
  durationMs: 4000,
  rotationDurationMs: 44000,
  pulseDurationMs: 1800,
  strokeWidth: 4.3,
  searchTurns: 4,
  searchBaseRadius: 8,
  searchRadiusAmp: 8.5,
  searchPulse: 2.4,
  searchScale: 1,
  point(progress, detailScale, config) {
    const t = progress * Math.PI * 2;
    const angle = t * config.searchTurns;
    const radius =
      config.searchBaseRadius +
      (1 - Math.cos(t)) * (config.searchRadiusAmp + detailScale * config.searchPulse);
    return {
      x: 50 + Math.cos(angle) * radius * config.searchScale,
      y: 50 + Math.sin(angle) * radius * config.searchScale,
    };
  },
};

const SpiralLoader = () => {
  const groupRef = useRef(null);
  const pathRef = useRef(null);
  const particlesRef = useRef([]);
  const requestRef = useRef();
  const startedAtRef = useRef(0);

  useEffect(() => {
    let isMounted = true;
    const group = groupRef.current;
    const path = pathRef.current;
    if (!group || !path) return;

    path.setAttribute('stroke-width', String(config.strokeWidth));
    
    // Create particles
    const SVG_NS = 'http://www.w3.org/2000/svg';
    particlesRef.current.forEach(p => p && p.remove()); // Cleanup if re-ran
    particlesRef.current = Array.from({ length: config.particleCount }, () => {
      const circle = document.createElementNS(SVG_NS, 'circle');
      circle.setAttribute('fill', 'var(--accent-primary)'); // Using theme color
      group.appendChild(circle);
      return circle;
    });

    path.setAttribute('stroke', 'var(--text-secondary)');
    
    function normalizeProgress(progress) {
      return ((progress % 1) + 1) % 1;
    }
    
    function getDetailScale(time) {
      const pulseProgress = (time % config.pulseDurationMs) / config.pulseDurationMs;
      const pulseAngle = pulseProgress * Math.PI * 2;
      return 0.52 + ((Math.sin(pulseAngle + 0.55) + 1) / 2) * 0.48;
    }
    
    function getRotation(time) {
      if (!config.rotate) return 0;
      return -((time % config.rotationDurationMs) / config.rotationDurationMs) * 360;
    }
    
    function buildPath(detailScale, steps = 120) {
      let d = '';
      for (let i = 0; i <= steps; i++) {
        const point = config.point(i / steps, detailScale, config);
        d += (i === 0 ? 'M' : 'L') + point.x.toFixed(1) + ' ' + point.y.toFixed(1) + ' ';
      }
      return d;
    }
    
    function getParticle(index, progress, detailScale) {
      const tailOffset = index / (config.particleCount - 1);
      const point = config.point(normalizeProgress(progress - tailOffset * config.trailSpan), detailScale, config);
      const fade = Math.pow(1 - tailOffset, 0.56);
      return {
        x: point.x,
        y: point.y,
        radius: 0.9 + fade * 2.7,
        opacity: 0.04 + fade * 0.96,
      };
    }

    startedAtRef.current = performance.now();

    const render = (now) => {
      if (!isMounted) return;
      const time = now - startedAtRef.current;
      const progress = (time % config.durationMs) / config.durationMs;
      const detailScale = getDetailScale(time);
      
      group.setAttribute('transform', `rotate(${getRotation(time)} 50 50)`);
      path.setAttribute('d', buildPath(detailScale));
      
      particlesRef.current.forEach((node, index) => {
        if (!node) return;
        const particle = getParticle(index, progress, detailScale);
        node.setAttribute('cx', particle.x.toFixed(1));
        node.setAttribute('cy', particle.y.toFixed(1));
        node.setAttribute('r', particle.radius.toFixed(1));
        node.setAttribute('opacity', particle.opacity.toFixed(2));
      });
      
      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    return () => {
      isMounted = false;
      cancelAnimationFrame(requestRef.current);
      particlesRef.current.forEach(p => p && p.remove());
      particlesRef.current = []; // allow garbage collection
    };
  }, []);

  return (
    <div style={{ width: '200px', height: '200px' }}>
      <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <g id="group" ref={groupRef}>
          <path id="path" ref={pathRef} strokeLinecap="round" strokeLinejoin="round" opacity="0.3"></path>
        </g>
      </svg>
    </div>
  );
};

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., waiting for assets)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

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
          <SpiralLoader />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
