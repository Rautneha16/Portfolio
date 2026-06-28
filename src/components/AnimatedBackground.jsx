import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, Smartphone, Database, Server, Cpu, Cloud, Code, Monitor, Tablet, HardDrive } from 'lucide-react';

const icons = [Laptop, Smartphone, Database, Server, Cpu, Cloud, Code, Monitor, Tablet, HardDrive];

const AnimatedBackground = () => {
  // Generate random floating tech models (icons)
  const models = Array.from({ length: 15 }).map((_, i) => {
    const IconComponent = icons[i % icons.length];
    return {
      id: i,
      Icon: IconComponent,
      size: Math.random() * 40 + 30, // sizes between 30 and 70
      x: Math.random() * 90, // Keep within 0-90vw
      y: Math.random() * 90, // Keep within 0-90vh
      duration: Math.random() * 25 + 15,
      delay: Math.random() * 5,
      rotateStart: Math.random() * 360,
      rotateEnd: Math.random() * 360 + (Math.random() > 0.5 ? 360 : -360), // spin one full rotation
      color: i % 2 === 0 ? 'var(--accent-primary)' : 'var(--accent-secondary)'
    };
  });

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      zIndex: 0, // Behind the content
      pointerEvents: 'none'
    }}>
      {/* Cyberpunk grid lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        backgroundPosition: 'center center',
      }} />

      {/* Floating Tech Models */}
      {models.map(model => (
        <motion.div
          key={model.id}
          initial={{ 
            opacity: 0,
            x: `${model.x}vw`,
            y: `${model.y}vh`,
            rotate: model.rotateStart
          }}
          animate={{
            opacity: [0, 0.15, 0], // low opacity to stay in background
            y: [`${model.y}vh`, `${model.y - 30}vh`],
            x: [`${model.x}vw`, `${model.x + (Math.random() * 10 - 5)}vw`],
            rotate: [model.rotateStart, model.rotateEnd]
          }}
          transition={{
            duration: model.duration,
            repeat: Infinity,
            delay: model.delay,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            color: model.color,
            filter: `drop-shadow(0 0 10px ${model.color})`,
          }}
        >
          <model.Icon size={model.size} strokeWidth={1} />
        </motion.div>
      ))}

      {/* Large Glowing Orbs */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.12, 0.08],
          x: ['0%', '5%', '0%'],
          y: ['0%', '3%', '0%']
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.06, 0.1, 0.06],
          x: ['0%', '-5%', '0%'],
          y: ['0%', '-3%', '0%']
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-10%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
