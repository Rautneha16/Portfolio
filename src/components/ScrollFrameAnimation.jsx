import React, { useEffect, useRef, useState } from 'react';

// ─── CONFIG ──────────────────────────────────────────────────────
const TOTAL_FRAMES = 240;

function getFrameUrl(i) {
  const n = String(i).padStart(3, '0');
  const d = i === 2 ? '0.05' : '0.04';
  return `/3d-scroll/frame_${n}_delay-${d}s.gif`;
}

// ─── COMPONENT ───────────────────────────────────────────────────
const ScrollFrameAnimation = () => {
  const sectionRef    = useRef(null);
  const canvasRef     = useRef(null);
  const imagesRef     = useRef([]);
  const lastFrameRef  = useRef(-1);
  const rafPendingRef = useRef(false);
  const ctxRef        = useRef(null);
  const canvasW       = useRef(0);
  const canvasH       = useRef(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Media query for responsive scroll speed
    const mql = window.matchMedia('(max-width: 768px)');
    setIsMobile(mql.matches);
    const mqlHandler = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', mqlHandler);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    // Allow higher devicePixelRatio for sharper image quality, capped at 2 for performance
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ctx = canvas.getContext('2d', { alpha: false });
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctxRef.current = ctx;

    // ── Size canvas ─────────────────────────────────────────────
    function setCanvasSize() {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvasW.current = w;
      canvasH.current = h;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      lastFrameRef.current = -1; // force redraw
      forceDrawFrame(0);         // always show frame 0 on resize
    }

    // ── Draw a specific frame index unconditionally ──────────────
    // (used to force-draw frame 0 on init / resize)
    function forceDrawFrame(frameIdx) {
      const img = imagesRef.current[frameIdx];
      if (!img || !img.complete) return;

      const cw = canvasW.current || canvas.offsetWidth;
      const ch = canvasH.current || canvas.offsetHeight;

      // Use img.width as fallback for GIFs where naturalWidth can be 0
      const iw = img.naturalWidth  || img.width  || 800;
      const ih = img.naturalHeight || img.height || 450;

      // We DO NOT fillRect here. The image scales to cover the entire canvas.
      // Clearing the canvas causes black flickering when the browser's GIF decoder lags.
      const scale = Math.max(cw / iw, ch / ih);
      ctx.drawImage(img, (cw - iw * scale) / 2, (ch - ih * scale) / 2, iw * scale, ih * scale);
      lastFrameRef.current = frameIdx;
    }

    // ── Draw frame based on current scroll position ──────────────
    function drawCurrentFrame() {
      const sect = sectionRef.current;
      if (!sect) return;

      const rect      = sect.getBoundingClientRect();
      const sectionH  = sect.offsetHeight;
      const viewH     = window.innerHeight;

      // scrollable = the total scroll distance within this section
      const scrollable = sectionH - viewH;
      if (scrollable <= 0) return;

      // Progress: 0 when section top = viewport top, 1 at section bottom
      const raw      = -rect.top / scrollable;
      const progress = Math.min(Math.max(raw, 0), 1);
      const frameIdx = Math.round(progress * (TOTAL_FRAMES - 1));

      // If frame hasn't changed, skip expensive drawImage
      if (frameIdx === lastFrameRef.current) return;

      const img = imagesRef.current[frameIdx];
      if (!img || !img.complete) {
        // Frame not loaded yet — try nearest loaded neighbor
        for (let offset = 1; offset < 10; offset++) {
          const prev = imagesRef.current[Math.max(0, frameIdx - offset)];
          if (prev && prev.complete) { forceDrawFrame(Math.max(0, frameIdx - offset)); break; }
        }
        return;
      }

      forceDrawFrame(frameIdx);
    }

    // ── Scroll handler — RAF-debounced ───────────────────────────
    function onScroll() {
      if (rafPendingRef.current) return;
      rafPendingRef.current = true;
      requestAnimationFrame(() => {
        rafPendingRef.current = false;
        drawCurrentFrame();
      });
    }

    // ── Image preloading ─────────────────────────────────────────
    const images = new Array(TOTAL_FRAMES).fill(null);
    imagesRef.current = images;

    function loadFrame(i, onDone) {
      const img = new Image();
      images[i] = img;
      img.onload = () => {
        // If this is frame 0 or the frame we're currently on, redraw
        if (i === 0 || i === lastFrameRef.current || lastFrameRef.current === -1) {
          if (i === 0) forceDrawFrame(0);
          else drawCurrentFrame();
        }
        if (onDone) onDone();
      };
      img.onerror = () => { if (onDone) onDone(); };
      img.src = getFrameUrl(i);
    }

    // Frame 0 loads first — shows immediately, no blank screen
    loadFrame(0, () => {
      forceDrawFrame(0); // guaranteed draw on first load
      // Frames 1-29 next (covers first quarter of animation)
      let done1 = 0;
      for (let i = 1; i < 30; i++) {
        loadFrame(i, () => {
          done1++;
          if (done1 === 29) {
            // Then rest of frames
            for (let j = 30; j < TOTAL_FRAMES; j++) loadFrame(j, null);
          }
        });
      }
    });

    // ── Init ─────────────────────────────────────────────────────
    setCanvasSize();

    // ── Events ───────────────────────────────────────────────────
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', setCanvasSize, { passive: true });

    return () => {
      mql.removeEventListener('change', mqlHandler);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', setCanvasSize);
      images.forEach((img) => { if (img) img.src = ''; });
    };
  }, []);

  return (
    /*
     * negative margin-top pulls this section UP to overlap with the
     * About section's exit — so the animation starts appearing while
     * About is still scrolling away. z-index keeps it behind About content.
     *
     * The section height determines scroll pace:
     * 600vh = very cinematic / slow
     */
    <section
      ref={sectionRef}
      id="scroll-animation"
      aria-label="3D scroll animation"
      style={{
        height: isMobile ? '350vh' : '600vh',
        position: 'relative',
        /* No black background — use site bg so there's no jarring flash */
        background: 'var(--bg-primary)',
        zIndex: 0,
        /* Pull section up so it overlaps with the bottom of About,
           animation starts as soon as About starts exiting */
        marginTop: '-30vh',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            transform: 'translateZ(0)',
            willChange: 'contents',
            /* Enhance image quality: increase contrast, saturation, and drop brightness to save eyes */
            filter: 'contrast(1.08) saturate(1.15) brightness(0.85) drop-shadow(0 0 30px rgba(168,85,247,0.1))',
          }}
        />
      </div>
    </section>
  );
};

export default ScrollFrameAnimation;
