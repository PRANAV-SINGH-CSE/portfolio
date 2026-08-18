'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function GamingCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable custom gaming cursor on fine pointer devices (desktops/laptops, not touchscreens)
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    if (!isPointerFine) return;

    setIsEnabled(true);
    document.documentElement.classList.add('gaming-cursor-active');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isHovering = false;
    let isClicking = false;
    let isVisible = true;
    let animationFrameId: number;

    const showCursor = () => {
      isVisible = true;
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    const updatePosition = (clientX: number, clientY: number, target: EventTarget | null) => {
      mouseX = clientX;
      mouseY = clientY;
      showCursor();

      // Check if hovering interactive elements
      if (target && target instanceof HTMLElement) {
        const interactive = target.closest(
          'a, button, [role="button"], input, select, textarea, .cursor-pointer, [data-cursor-target], summary'
        );
        isHovering = Boolean(interactive);
      } else {
        isHovering = false;
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      updatePosition(e.clientX, e.clientY, e.target);
    };

    const onMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY, e.target);
    };

    const onMouseDown = (e: MouseEvent) => {
      isClicking = true;
      showCursor();
      if (rippleRef.current) {
        rippleRef.current.style.left = `${e.clientX}px`;
        rippleRef.current.style.top = `${e.clientY}px`;
        rippleRef.current.classList.remove('ripple-animate');
        // Force reflow
        void rippleRef.current.offsetWidth;
        rippleRef.current.classList.add('ripple-animate');
      }
    };

    const onMouseUp = () => {
      isClicking = false;
    };

    const onMouseEnter = () => {
      showCursor();
    };

    const onMouseLeave = (e: MouseEvent) => {
      // Only hide if the mouse actually left the viewport window boundaries
      if (
        e.clientY <= 0 ||
        e.clientX <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight ||
        e.relatedTarget === null
      ) {
        isVisible = false;
        if (dotRef.current) dotRef.current.style.opacity = '0';
        if (ringRef.current) ringRef.current.style.opacity = '0';
      }
    };

    const onFocus = () => {
      showCursor();
    };

    // Global Event Listeners on both window and document
    window.addEventListener('pointermove', onPointerMove, { passive: true, capture: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true, capture: true });
    window.addEventListener('pointerdown', onMouseDown, { passive: true, capture: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true, capture: true });
    window.addEventListener('pointerup', onMouseUp, { passive: true, capture: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true, capture: true });
    window.addEventListener('focus', onFocus, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') showCursor();
    });

    // 120Hz/144Hz Smooth interpolation loop
    const render = () => {
      // Instant center pinpoint
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${
          isClicking ? 0.7 : isHovering ? 1.4 : 1
        })`;
      }

      // Spring-smoothed outer targeting HUD reticle
      ringX += (mouseX - ringX) * 0.24;
      ringY += (mouseY - ringY) * 0.24;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${
          isClicking ? 0.8 : isHovering ? 1.35 : 1
        }) rotate(${isHovering ? '45deg' : '0deg'})`;

        if (isHovering) {
          ringRef.current.setAttribute('data-target-locked', 'true');
        } else {
          ringRef.current.removeAttribute('data-target-locked');
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove('gaming-cursor-active');
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', onPointerMove, true);
      window.removeEventListener('mousemove', onMouseMove, true);
      window.removeEventListener('pointerdown', onMouseDown, true);
      window.removeEventListener('mousedown', onMouseDown, true);
      window.removeEventListener('pointerup', onMouseUp, true);
      window.removeEventListener('mouseup', onMouseUp, true);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <>
      {/* 1. Kinetic Shockwave Ripple on Click */}
      <div
        ref={rippleRef}
        className="fixed pointer-events-none z-[999999] rounded-full border border-cyan-400 opacity-0 -translate-x-1/2 -translate-y-1/2"
        style={{ width: '40px', height: '40px' }}
      />

      {/* 2. Outer Gaming HUD Targeting Reticle */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[999998] transition-opacity duration-150 opacity-100 will-change-transform"
        style={{ width: '32px', height: '32px' }}
      >
        {/* Reticle Circle */}
        <div className="w-full h-full rounded-full border border-cyan-400/60 shadow-[0_0_14px_rgba(6,182,212,0.4)] flex items-center justify-center transition-colors duration-200">
          {/* Top Notch */}
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-0.5 bg-cyan-300 shadow-[0_0_6px_#22d3ee]" />
          {/* Bottom Notch */}
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-0.5 bg-cyan-300 shadow-[0_0_6px_#22d3ee]" />
          {/* Left Notch */}
          <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-cyan-300 shadow-[0_0_6px_#22d3ee]" />
          {/* Right Notch */}
          <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-0.5 h-1.5 bg-cyan-300 shadow-[0_0_6px_#22d3ee]" />

          {/* Diagonal Corner Target Brackets (Visible on Target Lock) */}
          <div className="absolute inset-0 rounded-lg border border-cyan-400/0 transition-all duration-300 ring-brackets" />
        </div>
      </div>

      {/* 3. Center Pinpoint Precision Crosshair Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[999999] transition-opacity duration-150 opacity-100 will-change-transform"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee,0_0_20px_#06b6d4] border border-white" />
      </div>
    </>
  );
}
