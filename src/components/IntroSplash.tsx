'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Paintbrush } from 'lucide-react';
import confetti from 'canvas-confetti';

interface IntroSplashProps {
  onComplete: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

// Master Paint Brush Sweep Paths tracing "Pranav Singh"
// Calibrated for viewBox="0 0 1200 320", text centered at x=600, y=210, fontSize=195px
const STROKES = [
  {
    id: 'pranav',
    // Flowing cursive brush track for "Pranav" (x: 140 -> 560)
    d: 'M 152 75 C 144 125 138 180 138 215 C 150 160 210 80 240 105 C 255 130 220 165 155 165 C 205 170 250 140 285 168 C 310 140 340 175 365 145 C 390 175 425 145 450 175 C 480 145 515 160 550 165',
    weight: 0.44, // 44% of time
  },
  {
    id: 'singh',
    // Flowing cursive brush track for "Singh" (x: 580 -> 1060)
    d: 'M 580 165 C 615 110 655 60 678 65 C 705 72 680 135 625 170 C 595 190 625 218 680 205 C 715 180 735 140 760 168 C 790 140 820 175 845 145 C 870 175 885 258 855 258 C 830 258 860 190 900 160 C 925 70 962 60 955 160 C 965 195 1005 185 1055 165',
    weight: 0.44, // 44% of time
  },
  {
    id: 'dot-i',
    // Paint dab dot on 'i'
    d: 'M 742 105 C 744 100 750 100 752 105 C 750 110 744 110 742 105',
    weight: 0.04, // 4% of time
  },
  {
    id: 'flourish',
    // Dynamic energetic underline flourish
    d: 'M 130 255 C 400 242 700 278 1070 238',
    weight: 0.08, // 8% of time
  },
];

export default function IntroSplash({ onComplete }: IntroSplashProps) {
  // Animation Stages: 'greeting' -> 'brush-enter' -> 'painting' -> 'celebrate'
  const [stage, setStage] = useState<'greeting' | 'brush-enter' | 'painting' | 'celebrate'>('greeting');
  const [isExiting, setIsExiting] = useState(false);

  // Dynamic Horizontal Text Reveal Width (full vertical height from y=0 to y=320 is always 100% visible)
  const [revealX, setRevealX] = useState<number>(0);
  const maxRevealXRef = useRef<number>(0);

  // Stroke draw progress for underline flourish
  const [flourishProgress, setFlourishProgress] = useState<number>(0);

  // Real-time Paint Brush Position & Dynamics
  const [brushState, setBrushState] = useState<{
    x: number;
    y: number;
    angle: number;
    isPainting: boolean;
    isLifting: boolean;
    opacity: number;
  }>({
    x: 152,
    y: 75,
    angle: -25,
    isPainting: false,
    isLifting: true,
    opacity: 0,
  });

  // Dynamic Wet Paint Particles Emitter
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);

  // SVG Path References for exact geometric coordinate calculation
  const strokePathRefs = useRef<(SVGPathElement | null)[]>([]);

  const animFrameRef = useRef<number | null>(null);

  // Handle Clean Finish
  const handleFinish = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 700);
  }, [isExiting, onComplete]);

  // Handle Keyboard Shortcuts (ESC or Space to skip instantly)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        e.preventDefault();
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish]);

  // Lock body scroll while splash is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    return () => {
      document.body.style.overflow = originalOverflow;
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    };
  }, []);

  // Spawn wet paint particles around brush tip
  const spawnPaintParticles = useCallback((x: number, y: number) => {
    const colors = ['#22d3ee', '#c084fc', '#a855f7', '#38bdf8', '#ffffff'];
    const newParticles: Particle[] = [];
    const count = Math.random() > 0.45 ? 2 : 1;

    for (let i = 0; i < count; i++) {
      particleIdRef.current += 1;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2.2 + 0.6;
      newParticles.push({
        id: particleIdRef.current,
        x: x + (Math.random() * 8 - 4),
        y: y + (Math.random() * 8 - 4),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 0.2,
        size: Math.random() * 3.5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.95,
      });
    }

    setParticles((prev) => [...prev.slice(-45), ...newParticles]);
  }, []);

  // Particle Physics Update Loop
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            alpha: p.alpha - 0.045,
            size: Math.max(0.2, p.size - 0.07),
          }))
          .filter((p) => p.alpha > 0.05)
      );
    }, 25);
    return () => clearInterval(interval);
  }, [particles.length]);

  // =========================================================================
  // MAIN CINEMATIC STAGE MACHINE & BRUSH PHYSICS
  // =========================================================================
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // --- STAGE 1: GREETING ("Hi, I am") ---
    if (stage === 'greeting') {
      maxRevealXRef.current = 0;
      setRevealX(0);
      timeoutId = setTimeout(() => {
        setStage('brush-enter');
      }, 850);
    }

    // --- STAGE 2: BRUSH ENTERS CANVAS ---
    else if (stage === 'brush-enter') {
      setBrushState({
        x: 152,
        y: 75,
        angle: -30,
        isPainting: false,
        isLifting: false,
        opacity: 1,
      });

      timeoutId = setTimeout(() => {
        setStage('painting');
      }, 180);
    }

    // --- STAGE 3: PAINTING "PRANAV SINGH" ---
    else if (stage === 'painting') {
      const paintingDuration = 2900; // 2.9s smooth handwriting
      let start: number | null = null;

      const animatePainting = (now: number) => {
        if (!start) start = now;
        const elapsed = now - start;
        const totalProgress = Math.min(1, elapsed / paintingDuration);

        // Calculate progress for each stroke
        const p1 = STROKES[0].weight; // 0.44 (Pranav)
        const p2 = p1 + STROKES[1].weight; // 0.88 (Singh)
        const p3 = p2 + STROKES[2].weight; // 0.92 (Dot)
        const p4 = 1.0; // 1.00 (Flourish)

        let activeIdx = 0;
        let strokeLocalProgress = 0;

        if (totalProgress <= p1) {
          activeIdx = 0;
          strokeLocalProgress = totalProgress / p1;
          setFlourishProgress(0);
        } else if (totalProgress <= p2) {
          activeIdx = 1;
          strokeLocalProgress = (totalProgress - p1) / (p2 - p1);
          setFlourishProgress(0);
        } else if (totalProgress <= p3) {
          activeIdx = 2;
          strokeLocalProgress = (totalProgress - p2) / (p3 - p2);
          setFlourishProgress(0);
        } else {
          activeIdx = 3;
          strokeLocalProgress = (totalProgress - p3) / (p4 - p3);
          setFlourishProgress(strokeLocalProgress);
        }

        // Real-Time Paint Brush Coordinate Tracking via SVG Path
        const activePath = strokePathRefs.current[activeIdx];
        if (activePath) {
          try {
            const totalLen = activePath.getTotalLength();
            const currentLen = Math.max(0, Math.min(totalLen, strokeLocalProgress * totalLen));
            const pt = activePath.getPointAtLength(currentLen);

            // Compute tangent angle for natural brush tilt
            const ptPrev = activePath.getPointAtLength(Math.max(0, currentLen - 3));
            const ptNext = activePath.getPointAtLength(Math.min(totalLen, currentLen + 3));
            const dx = ptNext.x - ptPrev.x;
            const dy = ptNext.y - ptPrev.y;
            let rawAngle = Math.atan2(dy, dx) * (180 / Math.PI);
            if (isNaN(rawAngle)) rawAngle = 0;

            // Restrain angle into natural human hand tilt (-45deg to +15deg)
            const naturalAngle = rawAngle * 0.35 - 32;

            setBrushState({
              x: pt.x,
              y: pt.y,
              angle: naturalAngle,
              isPainting: true,
              isLifting: false,
              opacity: 1,
            });

            // Update horizontal text reveal boundary:
            // Ensure full vertical letter height is revealed up to the brush position
            if (activeIdx < 3) {
              const targetX = Math.max(maxRevealXRef.current, pt.x + 28);
              maxRevealXRef.current = targetX;
              setRevealX(targetX);
            } else {
              maxRevealXRef.current = 1200;
              setRevealX(1200);
            }

            // Emit dynamic wet paint sparkles
            if (Math.random() > 0.4) {
              spawnPaintParticles(pt.x, pt.y);
            }
          } catch (e) {
            // Fallback
          }
        }

        if (totalProgress < 1) {
          animFrameRef.current = requestAnimationFrame(animatePainting);
        } else {
          // Finish painting
          setRevealX(1200);
          setFlourishProgress(1);

          // Brush lifts with a grand flourish
          setBrushState((prev) => ({
            ...prev,
            isPainting: false,
            isLifting: true,
            angle: -45,
            y: prev.y - 50,
            x: prev.x + 40,
            opacity: 0,
          }));

          // Trigger Confetti Flourish
          try {
            confetti({
              particleCount: 50,
              spread: 75,
              origin: { y: 0.52 },
              colors: ['#a855f7', '#22d3ee', '#ec4899', '#38bdf8', '#ffffff'],
              disableForReducedMotion: true,
            });
          } catch (e) {
            // Fallback
          }

          setStage('celebrate');
        }
      };

      animFrameRef.current = requestAnimationFrame(animatePainting);
    }

    // --- STAGE 4: CELEBRATION & AUTO COMPLETE ---
    else if (stage === 'celebrate') {
      setRevealX(1200);
      setFlourishProgress(1);
      timeoutId = setTimeout(() => {
        handleFinish();
      }, 1600);
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [stage, spawnPaintParticles, handleFinish]);

  const isFullyRevealed = stage === 'celebrate' || revealX >= 1150;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(22px)',
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030712] overflow-hidden select-none cursor-default transform-gpu will-change-[opacity,transform,filter]"
        >
          {/* Ambient Cosmic Lighting & Particle Grids */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
          <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

          {/* Deep Glowing Nebulas */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[850px] sm:h-[850px] bg-gradient-to-tr from-purple-600/25 via-fuchsia-500/20 to-cyan-500/20 rounded-full blur-[140px] pointer-events-none animate-ambient-rotate" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

          {/* Skip Button in Top Right */}
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            onClick={handleFinish}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 z-30 group flex items-center gap-2 px-4 py-2 rounded-full liquid-glass border border-white/10 text-xs font-mono text-zinc-400 hover:text-white hover:border-purple-500/40 hover:bg-white/[0.06] transition-all duration-300 shadow-lg cursor-pointer transform-gpu"
          >
            <span className="tracking-wide">Skip Intro</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-zinc-400 group-hover:text-zinc-200 border border-white/10">
              ESC
            </kbd>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
          </motion.button>

          {/* Main Stage Container */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-8 text-center w-full max-w-7xl mx-auto">
            {/* 1. Large, Crystal-Clear Greeting: "Hi, I am" */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{
                opacity: stage === 'greeting' ? 1 : stage === 'celebrate' ? 0.45 : 0.75,
                y: stage === 'greeting' ? 0 : -10,
                scale: stage === 'greeting' ? 1 : 0.95,
              }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative mb-3 sm:mb-5 inline-flex items-center gap-2.5"
            >
              <div className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 shadow-[0_0_20px_rgba(34,211,238,0.15)] flex items-center gap-2.5">
                <Paintbrush className="w-4 h-4 text-cyan-400 animate-bounce" />
                <span className="text-sm sm:text-base md:text-lg font-mono tracking-[0.25em] text-cyan-300 uppercase font-bold">
                  Hi, I am
                </span>
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              </div>
            </motion.div>

            {/* 2. THE MASTER PAINT BRUSH CALLIGRAPHY CANVAS (FULL-HEIGHT UNCLIPPED LETTERS) */}
            <div className="relative w-full max-w-6xl aspect-[1200/320] flex items-center justify-center">
              <svg
                viewBox="0 0 1200 320"
                className="w-full h-full overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Neon Paint Brush Main Gradient */}
                  <linearGradient id="brush-paint-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="15%" stopColor="#f3e8ff" />
                    <stop offset="35%" stopColor="#c084fc" />
                    <stop offset="60%" stopColor="#a855f7" />
                    <stop offset="85%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>

                  {/* Underline Ribbon Gradient */}
                  <linearGradient id="flourish-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="25%" stopColor="#a855f7" />
                    <stop offset="55%" stopColor="#22d3ee" />
                    <stop offset="85%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>

                  {/* Deep Neon Glow Filter */}
                  <filter id="brush-text-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="12" result="blur1" />
                    <feGaussianBlur stdDeviation="5" result="blur2" />
                    <feMerge>
                      <feMergeNode in="blur1" />
                      <feMergeNode in="blur2" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Full-Height Dynamic Left-to-Right Clip Mask (Guarantees 100% full unclipped letters) */}
                  <clipPath id="full-height-reveal-clip">
                    <rect x="0" y="0" width={revealX} height="320" />
                  </clipPath>

                  {/* Ferrule Metallic Gradient */}
                  <linearGradient id="ferrule-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="25%" stopColor="#cbd5e1" />
                    <stop offset="50%" stopColor="#ffffff" />
                    <stop offset="75%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#334155" />
                  </linearGradient>

                  {/* Handle Gradient */}
                  <linearGradient id="handle-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0f172a" />
                    <stop offset="35%" stopColor="#1e1b4b" />
                    <stop offset="60%" stopColor="#312e81" />
                    <stop offset="100%" stopColor="#090d16" />
                  </linearGradient>
                </defs>

                {/* Hidden Tracking Paths for getPointAtLength geometry */}
                {STROKES.map((stroke, index) => (
                  <path
                    key={`track-${stroke.id}`}
                    ref={(el) => {
                      strokePathRefs.current[index] = el;
                    }}
                    d={stroke.d}
                    fill="none"
                    stroke="none"
                  />
                ))}

                {/* --- RENDER BIGGER, CRISP CALLIGRAPHY TEXT (FULL HEIGHT UNCLIPPED) --- */}
                <g clipPath={isFullyRevealed ? undefined : 'url(#full-height-reveal-clip)'}>
                  {/* Layer 1: Ambient Neon Bloom Shadow behind text */}
                  <text
                    x="600"
                    y="210"
                    textAnchor="middle"
                    className="font-calligraphy select-none"
                    style={{
                      fontFamily: "var(--font-calligraphy), 'Great Vibes', 'Alex Brush', cursive",
                      fontSize: '195px',
                      fontWeight: 400,
                      fill: '#a855f7',
                      filter: 'url(#brush-text-glow)',
                      opacity: 0.85,
                    }}
                  >
                    Pranav Singh
                  </text>

                  {/* Layer 2: Main Radiant Gradient Calligraphy Text */}
                  <text
                    x="600"
                    y="210"
                    textAnchor="middle"
                    className="font-calligraphy select-none"
                    style={{
                      fontFamily: "var(--font-calligraphy), 'Great Vibes', 'Alex Brush', cursive",
                      fontSize: '195px',
                      fontWeight: 400,
                      fill: 'url(#brush-paint-grad)',
                      stroke: 'rgba(255, 255, 255, 0.55)',
                      strokeWidth: '1.2px',
                      filter: 'drop-shadow(0 0 22px rgba(168,85,247,0.55))',
                    }}
                  >
                    Pranav Singh
                  </text>
                </g>

                {/* Layer 3: Underline Ribbon Flourish */}
                <path
                  d="M 130 255 C 400 242 700 278 1070 238"
                  stroke="url(#flourish-grad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                  pathLength={1}
                  strokeDasharray="1"
                  strokeDashoffset={1 - flourishProgress}
                  style={{
                    filter: 'drop-shadow(0 0 10px #22d3ee)',
                  }}
                />

                {/* --- DYNAMIC WET PAINT PARTICLES --- */}
                {particles.map((p) => (
                  <circle
                    key={p.id}
                    cx={p.x}
                    cy={p.y}
                    r={p.size}
                    fill={p.color}
                    opacity={p.alpha}
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(168,85,247,0.9))',
                    }}
                  />
                ))}

                {/* --- REAL-TIME MOVING ARTIST PAINT BRUSH --- */}
                {stage !== 'greeting' && (
                  <g
                    transform={`translate(${brushState.x}, ${brushState.y}) rotate(${brushState.angle})`}
                    style={{
                      opacity: brushState.opacity,
                      transition:
                        brushState.isLifting
                          ? 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out'
                          : 'opacity 0.25s ease-out',
                      pointerEvents: 'none',
                    }}
                  >
                    {/* Glowing Wet Contact Point / Paint Reservoir */}
                    <circle
                      cx="0"
                      cy="0"
                      r="12"
                      fill="#22d3ee"
                      opacity="0.85"
                      className="animate-pulse"
                      style={{ filter: 'blur(4px)' }}
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r="5.5"
                      fill="#ffffff"
                      style={{ filter: 'drop-shadow(0 0 10px #ffffff)' }}
                    />

                    {/* Wet Ink Bristle Tip (Sable / Paint Loaded) */}
                    <path
                      d="M -4.5 0 C -5.5 -10, -6 -20, -6.8 -30 L 6.8 -30 C 6 -20, 5.5 -10, 4.5 0 Z"
                      fill="url(#brush-paint-grad)"
                      style={{ filter: 'drop-shadow(0 0 12px #a855f7)' }}
                    />

                    {/* Bristle Strands Texture */}
                    <line x1="-2.5" y1="-3" x2="-4" y2="-28" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
                    <line x1="0" y1="-1.5" x2="0" y2="-29" stroke="#ffffff" strokeWidth="1.2" />
                    <line x1="2.5" y1="-3" x2="4" y2="-28" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />

                    {/* Metallic Silver Ferrule Ring */}
                    <path
                      d="M -7.2 -30 L 7.2 -30 L 6.5 -52 L -6.5 -52 Z"
                      fill="url(#ferrule-gradient)"
                      stroke="rgba(255,255,255,0.45)"
                      strokeWidth="0.6"
                    />
                    <line x1="-6.8" y1="-41" x2="6.8" y2="-41" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />

                    {/* Polished Obsidian / Mahogany Brush Handle */}
                    <path
                      d="M -6.5 -52 L 6.5 -52 L 2.8 -160 L -2.8 -160 Z"
                      fill="url(#handle-gradient)"
                      stroke="rgba(255,255,255,0.18)"
                      strokeWidth="0.6"
                    />

                    {/* Handle Golden Trim Bands */}
                    <rect x="-6" y="-57" width="12" height="2.5" fill="#fbbf24" opacity="0.85" />
                    <rect x="-5.2" y="-64" width="10.4" height="1.5" fill="#38bdf8" opacity="0.75" />

                    {/* Specular Handle Reflection Streak */}
                    <line x1="0.6" y1="-52" x2="0.6" y2="-150" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                  </g>
                )}
              </svg>
            </div>

            {/* 3. Grand Reveal Particle & Subtitle Flourish when Name Finishes */}
            {stage === 'celebrate' && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 sm:mt-6 flex flex-col items-center gap-2.5 transform-gpu"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[1.5px] w-56 sm:w-80 md:w-[480px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee]"
                />
                <p className="text-xs sm:text-sm md:text-base font-mono tracking-[0.25em] text-zinc-200 uppercase flex items-center gap-2 font-medium">
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span>Full-Stack Developer & AI Systems Engineer</span>
                  <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
