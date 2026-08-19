'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface IntroSplashProps {
  onComplete: () => void;
}

export default function IntroSplash({ onComplete }: IntroSplashProps) {
  const [stage, setStage] = useState<'typing1' | 'pause1' | 'erasing' | 'pause2' | 'typing2' | 'celebrate'>('typing1');
  const [displayText, setDisplayText] = useState('');
  const [isExiting, setIsExiting] = useState(false);

  const phrase1 = 'Hi, I am';
  const phrase2 = 'Pranav Singh';

  const handleFinish = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 750);
  }, [isExiting, onComplete]);

  // Handle keyboard shortcut (ESC or Space to skip)
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

  // Lock body scroll and guarantee viewport is at top while splash is visible
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    return () => {
      document.body.style.overflow = originalOverflow;
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    };
  }, []);

  // Main typing state machine
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (stage === 'typing1') {
      if (displayText.length < phrase1.length) {
        timer = setTimeout(() => {
          setDisplayText(phrase1.slice(0, displayText.length + 1));
        }, 90);
      } else {
        timer = setTimeout(() => {
          setStage('pause1');
        }, 600);
      }
    } else if (stage === 'pause1') {
      timer = setTimeout(() => {
        setStage('erasing');
      }, 700);
    } else if (stage === 'erasing') {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 45);
      } else {
        timer = setTimeout(() => {
          setStage('pause2');
        }, 200);
      }
    } else if (stage === 'pause2') {
      timer = setTimeout(() => {
        setStage('typing2');
      }, 300);
    } else if (stage === 'typing2') {
      if (displayText.length < phrase2.length) {
        timer = setTimeout(() => {
          setDisplayText(phrase2.slice(0, displayText.length + 1));
        }, 110);
      } else {
        timer = setTimeout(() => {
          setStage('celebrate');
        }, 250);
      }
    } else if (stage === 'celebrate') {
      timer = setTimeout(() => {
        handleFinish();
      }, 1400);
    }

    return () => clearTimeout(timer);
  }, [stage, displayText, handleFinish]);

  const isName = stage === 'typing2' || stage === 'celebrate';

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: 'blur(20px)',
            transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030712] overflow-hidden select-none cursor-default transform-gpu will-change-[opacity,transform,filter]"
        >
          {/* Ambient Cosmic Lighting */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
          <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

          {/* Deep Glowing Nebulas */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] sm:w-[750px] sm:h-[750px] bg-gradient-to-tr from-purple-600/25 via-fuchsia-500/20 to-cyan-500/20 rounded-full blur-[140px] pointer-events-none animate-ambient-rotate" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

          {/* Skip Button in Top Right */}
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            onClick={handleFinish}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20 group flex items-center gap-2 px-4 py-2 rounded-full liquid-glass border border-white/10 text-xs font-mono text-zinc-400 hover:text-white hover:border-purple-500/40 hover:bg-white/[0.06] transition-all duration-300 shadow-lg cursor-pointer transform-gpu"
          >
            <span className="tracking-wide">Skip Intro</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-zinc-400 group-hover:text-zinc-200 border border-white/10">
              ESC
            </kbd>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
          </motion.button>

          {/* Main Calligraphy Display Container */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-8 text-center w-full max-w-7xl mx-auto min-h-[260px] sm:min-h-[340px] md:min-h-[420px]">
            {/* Big Calligraphy Animated Text */}
            <div className="relative inline-flex items-center justify-center min-h-[140px] sm:min-h-[200px] md:min-h-[280px] lg:min-h-[340px] w-full">
              <span
                className={`font-calligraphy transition-all duration-200 leading-none whitespace-nowrap select-none ${
                  isName
                    ? 'calligraphy-glow-gradient text-6xl sm:text-8xl md:text-9xl lg:text-[9.5rem] xl:text-[11.5rem] 2xl:text-[13.5rem] py-4'
                    : 'calligraphy-glow-white text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9.5rem] 2xl:text-[11rem] py-4'
                }`}
                style={{
                  fontFamily: "var(--font-calligraphy), 'Great Vibes', 'Alex Brush', cursive",
                }}
              >
                {displayText.split('').map((char, i) => (
                  <motion.span
                    key={`${isName ? 'name' : 'greet'}-${i}`}
                    initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className="inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>

              {/* Glowing Calligraphy Cursor positioned directly next to active text */}
              <span
                className="inline-block w-1 sm:w-1.5 md:w-2 lg:w-2.5 h-10 sm:h-16 md:h-24 lg:h-32 xl:h-36 ml-2 sm:ml-3 md:ml-4 rounded-full bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-500 intro-cursor shadow-[0_0_20px_#a855f7]"
                style={{
                  verticalAlign: 'middle',
                }}
              />
            </div>

            {/* Grand Reveal Particle & Subtitle Flourish when Name finishes */}
            {stage === 'celebrate' && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-2 sm:mt-4 flex flex-col items-center gap-2 transform-gpu"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[1.5px] w-40 sm:w-64 md:w-80 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee]"
                />
                <p className="text-xs sm:text-sm md:text-base font-mono tracking-[0.25em] text-zinc-300 uppercase flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>Full-Stack Developer & AI Systems Engineer</span>
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
