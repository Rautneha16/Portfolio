import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Laptop, Smartphone, Database, Server, Cpu, Cloud, Code, Monitor } from 'lucide-react';

const icons = [Laptop, Smartphone, Database, Server, Cpu, Cloud, Code, Monitor];

const AnimatedBackground = () => {
  // Reduced to 8 icons (fewer compositor layers = better scroll performance)
  const models = useMemo(() => Array.from({ length: 8 }).map((_, i) => {
    const IconComponent = icons[i % icons.length];
    return {
      id: i,
      Icon: IconComponent,
      size: Math.random() * 30 + 24,
      x: Math.random() * 88,
      y: Math.random() * 88,
      duration: Math.random() * 20 + 18,
      delay: Math.random() * 6,
      rotateStart: Math.random() * 360,
      rotateEnd: Math.random() * 360 + (Math.random() > 0.5 ? 360 : -360),
      color: i % 2 === 0 ? 'var(--accent-primary)' : 'var(--accent-secondary)',
    };
  }), []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
        // Isolate this layer so scroll repaints don't cascade to parent
        contain: 'strict',
      }}
    >
      {/* Cyberpunk grid lines — static, no repaint cost */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(0,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Floating Tech Icons
          Key perf rules:
          - No filter: drop-shadow (extremely expensive per-frame GPU op)
          - Only transform: y + rotate (single composite layer operation)
          - Static opacity (no opacity animation = no layer recalculation)
          - will-change: transform promotes to GPU compositor layer upfront */}
      {models.map(model => (
        <motion.div
          key={model.id}
          initial={{
            x: `${model.x}vw`,
            y: `${model.y}vh`,
            rotate: model.rotateStart,
            opacity: 0,
          }}
          animate={{
            y: [`${model.y}vh`, `${model.y - 25}vh`, `${model.y}vh`],
            rotate: [model.rotateStart, model.rotateEnd],
            opacity: [0, 0.12, 0.12, 0],
          }}
          transition={{
            duration: model.duration,
            repeat: Infinity,
            delay: model.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            color: model.color,
            // No drop-shadow filter — use color opacity instead for glow feel
            willChange: 'transform',
          }}
        >
          <model.Icon size={model.size} strokeWidth={1} />
        </motion.div>
      ))}

      {/* Static glowing orbs — removing animation from blur elements is critical.
          Animating scale/position on filter:blur(80px)+ elements causes
          full GPU texture re-upload every frame. Static = zero cost. */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
          filter: 'blur(80px)',
          opacity: 0.09,
          willChange: 'auto',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-10%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)',
          filter: 'blur(100px)',
          opacity: 0.07,
          willChange: 'auto',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;

