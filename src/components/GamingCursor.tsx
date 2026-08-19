'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function GamingCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    if (!isPointerFine) return;

    requestAnimationFrame(() => {
      setIsEnabled(true);
    });
    document.documentElement.classList.add('gaming-cursor-active');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let isClicking = false;
    let isVisible = false;
    let animationFrameId: number;

    const showCursor = () => {
      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }
    };

    const hideCursor = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    // Ultra-low latency direct pointer tracking
    const onPointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      showCursor();

      // Instantly position center dot without waiting for RAF for 0ms lag
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${
          isClicking ? 0.75 : isHovering ? 1.3 : 1
        })`;
      }
    };

    // Lightweight hover detection only when crossing element boundaries (not on every pixel move)
    const onPointerOver = (e: PointerEvent) => {
      const target = e.target;
      if (target && target instanceof HTMLElement) {
        const interactive = target.closest(
          'a, button, [role="button"], input, select, textarea, .cursor-pointer, [data-cursor-target], summary'
        );
        isHovering = Boolean(interactive);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      isClicking = true;
      showCursor();

      if (rippleRef.current) {
        rippleRef.current.style.left = `${e.clientX}px`;
        rippleRef.current.style.top = `${e.clientY}px`;
        rippleRef.current.classList.remove('ripple-animate');
        void rippleRef.current.offsetWidth;
        rippleRef.current.classList.add('ripple-animate');
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(0.75)`;
      }
    };

    const onPointerUp = () => {
      isClicking = false;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${
          isHovering ? 1.3 : 1
        })`;
      }
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY <= 0 ||
        e.clientX <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight ||
        e.relatedTarget === null
      ) {
        hideCursor();
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerover', onPointerOver, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    window.addEventListener('blur', hideCursor);

    // High-performance RAF loop for outer reticle spring interpolation
    let lastRingX = -100;
    let lastRingY = -100;
    let lastHoverState = false;
    let lastClickState = false;

    const render = () => {
      if (isVisible) {
        // Snappy, high-responsiveness spring interpolation
        ringX += (mouseX - ringX) * 0.68;
        ringY += (mouseY - ringY) * 0.68;

        const deltaX = Math.abs(ringX - lastRingX);
        const deltaY = Math.abs(ringY - lastRingY);
        const stateChanged = isHovering !== lastHoverState || isClicking !== lastClickState;

        if ((deltaX > 0.05 || deltaY > 0.05 || stateChanged) && ringRef.current) {
          lastRingX = ringX;
          lastRingY = ringY;
          lastHoverState = isHovering;
          lastClickState = isClicking;

          ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${
            isClicking ? 0.85 : isHovering ? 1.25 : 1
          }) rotate(${isHovering ? '45deg' : '0deg'})`;

          if (isHovering) {
            ringRef.current.setAttribute('data-target-locked', 'true');
          } else {
            ringRef.current.removeAttribute('data-target-locked');
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove('gaming-cursor-active');
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerover', onPointerOver);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('blur', hideCursor);
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
        className="fixed top-0 left-0 pointer-events-none z-[999998] transition-opacity duration-150 opacity-0 will-change-transform"
        style={{ width: '30px', height: '30px' }}
      >
        {/* Reticle Circle */}
        <div className="w-full h-full rounded-full border border-cyan-400/60 shadow-[0_0_12px_rgba(6,182,212,0.45)] flex items-center justify-center transition-colors duration-150">
          {/* Top Notch */}
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-0.5 bg-cyan-300 shadow-[0_0_6px_#22d3ee]" />
          {/* Bottom Notch */}
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-0.5 bg-cyan-300 shadow-[0_0_6px_#22d3ee]" />
          {/* Left Notch */}
          <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-cyan-300 shadow-[0_0_6px_#22d3ee]" />
          {/* Right Notch */}
          <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-0.5 h-1.5 bg-cyan-300 shadow-[0_0_6px_#22d3ee]" />

          {/* Diagonal Corner Target Brackets */}
          <div className="absolute inset-0 rounded-lg border border-cyan-400/0 transition-all duration-200 ring-brackets" />
        </div>
      </div>

      {/* 3. Center Pinpoint Precision Crosshair Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[999999] transition-opacity duration-150 opacity-0 will-change-transform"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee,0_0_16px_#06b6d4] border border-white" />
      </div>
    </>
  );
}
