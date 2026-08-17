'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  FileText,
  Sparkles,
  Terminal,
  Layers,
  Briefcase,
  User,
  Mail,
  Zap,
} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onOpenResume: () => void;
  isHidden?: boolean;
}

const navItems = [
  { id: 'hero', label: 'HOME', icon: Terminal },
  { id: 'about', label: 'ABOUT', icon: User },
  { id: 'skills', label: 'SKILLS', icon: Layers },
  { id: 'projects', label: 'PROJECTS', icon: Sparkles },
  { id: 'experience', label: 'EXPERIENCE', icon: Briefcase },
  { id: 'contact', label: 'CONTACT', icon: Mail },
];

export default function Navbar({
  activeSection,
  onOpenResume,
  isHidden = false,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-3 sm:px-6 lg:px-8 ${
          isHidden ? 'opacity-0 -translate-y-full pointer-events-none' : 'opacity-100 translate-y-0'
        } ${isScrolled ? 'py-3' : 'py-4 sm:py-5'}`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
          {/* Left Capsule: Brand & Futuristic Logo Badge */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-b from-[#181f33]/90 via-[#0d1322]/95 to-[#050813] border border-white/[0.12] shadow-[0_8px_30px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.35),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all cursor-pointer group shrink-0"
            aria-label="Scroll to home"
          >
            {/* Emblem Icon Squircle */}
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-black/60 border border-white/20 flex items-center justify-center group-hover:scale-105 group-hover:border-cyan-400/60 shadow-[inset_0_0_8px_rgba(6,182,212,0.3)] transition-all">
              <Zap className="w-3.5 h-3.5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            </div>

            {/* Futuristic Uppercase Brand Name */}
            <div className="flex items-center gap-1.5">
              <span className="font-sans font-extrabold tracking-[0.18em] text-xs sm:text-sm text-white uppercase group-hover:text-cyan-300 transition-colors whitespace-nowrap">
                PRANAV SINGH
              </span>
            </div>
          </motion.button>

          {/* Right Capsule: Desktop Cyber Navigation Pill */}
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="hidden md:flex items-center gap-1 sm:gap-1.5 px-4 lg:px-6 py-2 rounded-full bg-gradient-to-b from-[#181f33]/90 via-[#0d1322]/95 to-[#050813] border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-xl"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-[11px] lg:text-xs font-bold tracking-[0.14em] uppercase transition-all duration-200 cursor-pointer whitespace-nowrap group ${
                    isActive
                      ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{item.label}</span>

                  {/* Active Neon Glow Underline Light */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      className="absolute -bottom-1 left-2 right-2 h-[2px] rounded-full bg-cyan-400 shadow-[0_0_12px_#06b6d4,0_0_22px_#06b6d4]"
                    />
                  )}
                </button>
              );
            })}

            {/* Integrated Resume Button inside Capsule */}
            <div className="h-4 w-[1px] bg-white/15 mx-1" />
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase text-zinc-300 hover:text-white hover:bg-white/[0.08] hover:border-white/20 border border-transparent transition-all cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-3 h-3 text-purple-400" />
              <span>RESUME</span>
              <span className="text-[10px] text-cyan-400 opacity-80">↗</span>
            </button>
          </motion.nav>

          {/* Mobile Actions: Resume Pill + Hamburger Capsule */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-b from-[#181f33]/90 via-[#0d1322]/95 to-[#050813] border border-white/[0.12] text-[11px] font-bold tracking-wider uppercase text-zinc-200 shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] cursor-pointer"
            >
              <FileText className="w-3 h-3 text-purple-400" />
              <span>CV</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="w-9 h-9 rounded-full bg-gradient-to-b from-[#181f33]/90 via-[#0d1322]/95 to-[#050813] border border-white/[0.12] shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-cyan-400" /> : <Menu className="w-4 h-4 text-zinc-300" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Cyber Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            {/* Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer content */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="fixed top-18 left-4 right-4 bg-gradient-to-b from-[#181f33]/95 via-[#0d1322]/95 to-[#050813]/98 rounded-3xl p-5 border border-white/20 shadow-2xl space-y-3"
            >
              <div className="flex items-center justify-between px-2 pb-2 border-b border-white/10">
                <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" /> NAVIGATION
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-zinc-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-bold tracking-[0.14em] uppercase transition-all text-left ${
                        isActive
                          ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                          : 'text-zinc-300 hover:bg-white/[0.06] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-zinc-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
                      )}
                    </button>
                  );
                })}

                <div className="h-[1px] bg-white/10 my-1" />

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-xs font-bold tracking-widest uppercase text-white bg-gradient-to-r from-purple-500 to-pink-500 border border-white/20 shadow-[0_0_20px_rgba(168,85,247,0.35)] cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>VIEW & DOWNLOAD RESUME</span>
                  <span className="text-cyan-300">↗</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
