'use client';

import React, { useEffect, useRef } from 'react';

export default function BackgroundMesh() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    let latestX = 0;
    let latestY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;

      if (!ticking) {
        ticking = true;
        animationFrameId = requestAnimationFrame(() => {
          if (spotlightRef.current) {
            spotlightRef.current.style.transform = `translate3d(${latestX}px, ${latestY}px, 0) translate(-50%, -50%)`;
            spotlightRef.current.style.opacity = '0.18';
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu" style={{ contain: 'paint' }}>
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* Radial Vignette */}
      <div className="absolute inset-0 bg-radial-vignette" />

      {/* Floating Liquid Ambient Blob 1 */}
      <div
        className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full blur-[140px] opacity-25 animate-float-slow transition-all duration-700 pointer-events-none transform-gpu"
        style={{
          background: 'radial-gradient(circle, var(--glow-primary) 0%, rgba(99, 102, 241, 0) 70%)',
          willChange: 'transform',
        }}
      />

      {/* Floating Liquid Ambient Blob 2 */}
      <div
        className="absolute top-1/3 -right-40 w-[700px] h-[700px] rounded-full blur-[160px] opacity-20 animate-float-reverse transition-all duration-700 pointer-events-none transform-gpu"
        style={{
          background: 'radial-gradient(circle, var(--glow-secondary) 0%, rgba(6, 182, 212, 0) 70%)',
          willChange: 'transform',
        }}
      />

      {/* Floating Liquid Ambient Blob 3 */}
      <div
        className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-15 animate-pulse-glow transition-all duration-700 pointer-events-none transform-gpu"
        style={{
          background: 'radial-gradient(circle, var(--glow-accent) 0%, rgba(168, 85, 247, 0) 70%)',
          willChange: 'transform',
        }}
      />

      {/* Zero-Jitter Hardware-Accelerated Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-0 transition-opacity duration-300 pointer-events-none will-change-transform transform-gpu"
        style={{
          background: 'radial-gradient(circle, var(--glow-primary) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 80%)',
        }}
      />
    </div>
  );
}
