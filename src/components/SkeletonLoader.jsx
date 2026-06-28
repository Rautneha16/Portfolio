import React from 'react';

const SkeletonLoader = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      padding: '0',
      overflow: 'hidden',
    }}>
      {/* Navbar skeleton */}
      <div style={{
        height: '70px',
        background: 'var(--card-bg)',
        borderBottom: '2px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
      }}>
        <div className="skeleton" style={{ width: '120px', height: '32px', borderRadius: '8px' }} />
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[1,2,3,4].map(i => (
            <div key={i} className="skeleton" style={{ width: '60px', height: '16px', borderRadius: '4px' }} />
          ))}
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="grid grid-2" style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '6rem 2rem 4rem',
        gap: '4rem',
        alignItems: 'center',
      }}>
        {/* Left content */}
        <div>
          <div className="skeleton" style={{ width: '80px', height: '14px', marginBottom: '1rem', borderRadius: '4px' }} />
          <div className="skeleton skeleton-title" style={{ width: '75%', height: '56px', marginBottom: '0.5rem' }} />
          <div className="skeleton skeleton-title" style={{ width: '55%', height: '56px', marginBottom: '1.5rem' }} />
          <div className="skeleton skeleton-text" style={{ width: '100%', marginBottom: '0.5rem' }} />
          <div className="skeleton skeleton-text" style={{ width: '90%', marginBottom: '0.5rem' }} />
          <div className="skeleton skeleton-text" style={{ width: '80%', marginBottom: '2rem' }} />
          {/* Tech icons */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="skeleton" style={{ width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0 }} />
            ))}
          </div>
          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="skeleton" style={{ width: '150px', height: '48px', borderRadius: '8px' }} />
            <div className="skeleton" style={{ width: '130px', height: '48px', borderRadius: '8px' }} />
          </div>
        </div>
        {/* Right content (avatar + code) */}
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', minHeight: '400px' }}>
          {/* Avatar circle */}
          <div className="skeleton" style={{
            position: 'absolute',
            top: '20px',
            right: '25px',
            width: '160px',
            height: '160px',
            borderRadius: '50%',
          }} />
          {/* Code editor block */}
          <div className="skeleton skeleton-card" style={{
            position: 'absolute',
            top: '140px',
            left: 0,
            width: '90%',
            height: '200px',
          }} />
        </div>
      </div>

      {/* Section skeleton — repeated 2 times */}
      {[1, 2].map(sIdx => (
        <div key={sIdx} style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '4rem 2rem',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="skeleton" style={{ width: '200px', height: '36px', borderRadius: '8px', margin: '0 auto 1rem' }} />
            <div className="skeleton" style={{ width: '60px', height: '4px', borderRadius: '2px', margin: '0 auto' }} />
          </div>
          <div className="grid grid-3" style={{ gap: '2rem' }}>
            {[1,2,3].map(i => (
              <div key={i} className="skeleton skeleton-card" style={{ padding: '2rem', background: 'var(--card-bg)' }}>
                <div className="skeleton" style={{ width: '56px', height: '56px', borderRadius: '12px', marginBottom: '1.25rem' }} />
                <div className="skeleton skeleton-text" style={{ width: '70%' }} />
                <div className="skeleton skeleton-text" style={{ width: '100%' }} />
                <div className="skeleton skeleton-text" style={{ width: '90%' }} />
                <div className="skeleton skeleton-text" style={{ width: '60%' }} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Loading indicator */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        background: 'var(--card-bg)',
        border: '2px solid var(--border-color)',
        borderRadius: '50px',
        padding: '0.6rem 1.5rem',
        boxShadow: 'var(--box-shadow-chunky)',
        zIndex: 9999,
      }}>
        <span style={{
          display: 'inline-block',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: 'var(--accent-primary)',
          animation: 'pulse-soft 1s ease-in-out infinite',
        }} />
        <span style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
        }}>Loading portfolio…</span>
      </div>
    </div>
  );
};

export default SkeletonLoader;
