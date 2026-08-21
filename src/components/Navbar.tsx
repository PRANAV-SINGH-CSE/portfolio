'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  FileText,
  Terminal,
  Layers,
  Briefcase,
  User,
  Mail,
  Sparkles,
  Zap,
  Award,
  GraduationCap,
} from 'lucide-react';
import { GitHubIcon } from './Icons';

interface NavbarProps {
  activeSection: string;
  onOpenResume: () => void;
  isHidden?: boolean;
  isIntroDone?: boolean;
}

const primaryNavItems = [
  { id: 'hero', label: 'HOME', icon: Terminal },
  { id: 'about', label: 'ABOUT', icon: User },
  { id: 'skills', label: 'SKILLS', icon: Layers },
  { id: 'projects', label: 'PROJECTS', icon: Sparkles },
  { id: 'experience', label: 'EXPERIENCE', icon: Briefcase },
];

const collapsibleNavItems = [
  { id: 'certificates', label: 'CERTIFICATES', fullLabel: 'CERTIFICATES & WORKSHOPS', icon: Award },
  { id: 'contact', label: 'CONTACT', fullLabel: 'CONTACT', icon: Mail },
];

const mobileNavItems = [
  { id: 'hero', label: 'HOME', icon: Terminal },
  { id: 'about', label: 'ABOUT', icon: User },
  { id: 'skills', label: 'SKILLS', icon: Layers },
  { id: 'projects', label: 'PROJECTS', icon: Sparkles },
  { id: 'experience', label: 'EXPERIENCE', icon: Briefcase },
  { id: 'education', label: 'EDUCATION', icon: GraduationCap },
  { id: 'certificates', label: 'CERTIFICATES & WORKSHOPS', icon: Award },
  { id: 'github', label: 'GITHUB ACTIVITY', icon: GitHubIcon },
  { id: 'contact', label: 'CONTACT', icon: Mail },
];

export default function Navbar({
  activeSection,
  onOpenResume,
  isHidden = false,
  isIntroDone = true,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isExpanded =
    isNavHovered ||
    activeSection === 'certificates' ||
    activeSection === 'contact';

  useEffect(() => {
    let lastScroll = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;

          // Top of page: always visible
          if (currentScroll < 50) {
            setIsNavVisible(true);
          } else if (currentScroll > lastScroll + 25) {
            // Scrolling down past threshold -> hide
            setIsNavVisible(false);
          } else if (currentScroll < lastScroll - 20) {
            // Scrolling up past threshold -> show
            setIsNavVisible(true);
          }

          lastScroll = currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={
          isIntroDone && !isHidden
            ? { y: isNavVisible ? 0 : -90, opacity: isNavVisible ? 1 : 0 }
            : { y: -80, opacity: 0 }
        }
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 w-full py-3.5 sm:py-4.5 transform-gpu ${
          isHidden || !isNavVisible ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
      >
        <div className="w-full flex items-center justify-center max-w-7xl mx-auto">
          {/* DESKTOP / TABLET (>= md): Unified Seamless Floating Dynamic Island Capsule */}
          <motion.nav
            layout
            onMouseEnter={() => setIsNavHovered(true)}
            onMouseLeave={() => {
              setIsNavHovered(false);
              setHoveredItem(null);
            }}
            transition={{
              layout: { type: 'spring', stiffness: 380, damping: 32, mass: 0.8 },
            }}
            className="hidden md:flex items-center gap-1 lg:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-gradient-to-b from-[#182035]/95 via-[#0e1424]/98 to-[#060914] border border-white/[0.16] shadow-[0_12px_40px_rgba(0,0,0,0.75),inset_0_1.5px_1px_rgba(255,255,255,0.25)] backdrop-blur-2xl transform-gpu select-none"
          >
            {/* 1. Integrated Brand Avatar & Name */}
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-2 px-1.5 py-1 rounded-full hover:bg-white/[0.06] transition-all cursor-pointer group shrink-0"
              aria-label="Scroll to top"
            >
              <div className="relative w-7 h-7 lg:w-8 lg:h-8 rounded-full overflow-hidden border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.35)] group-hover:scale-105 group-hover:border-cyan-300 transition-all shrink-0 bg-[#0e1424]">
                <Image
                  src="/profile.jpg"
                  alt="Pranav Singh"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <span className="font-black tracking-[0.16em] text-[11px] lg:text-xs text-white uppercase group-hover:text-cyan-300 transition-colors whitespace-nowrap hidden sm:inline">
                PRANAV<span className="hidden xl:inline"> SINGH</span>
              </span>
            </button>

            {/* Vertical Hairline Divider */}
            <div className="h-5 w-[1px] bg-white/20 mx-0.5 lg:mx-1 shrink-0" />

            {/* 2. Primary Nav Links (HOME through EXPERIENCE) */}
            <div className="flex items-center gap-0.5 lg:gap-1">
              {primaryNavItems.map((item) => {
                const isActive = activeSection === item.id;
                const isHovered = hoveredItem === item.id;

                return (
                  <button
                    key={item.id}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-2.5 lg:px-3.5 py-1.5 rounded-full text-[11px] lg:text-xs font-extrabold tracking-[0.12em] uppercase transition-colors duration-150 cursor-pointer whitespace-nowrap z-10 transform-gpu ${
                      isActive
                        ? 'text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.9)]'
                        : isHovered
                        ? 'text-white'
                        : 'text-zinc-400 hover:text-zinc-100'
                    }`}
                  >
                    {/* Hover Capsule */}
                    {isHovered && (
                      <motion.span
                        layoutId="hoverNavCapsule"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        className="absolute inset-0 rounded-full bg-gradient-to-b from-[#2e3c5c]/90 via-[#1c263f]/95 to-[#0d1424] border border-white/[0.22] shadow-[0_6px_22px_rgba(0,0,0,0.8),inset_0_1.5px_1px_rgba(255,255,255,0.4),0_0_16px_rgba(255,255,255,0.1)] -z-10"
                      />
                    )}

                    <span className="relative z-10">{item.label}</span>

                    {/* Active Underline Pill */}
                    {isActive && (
                      <span className="absolute -bottom-1 left-2.5 right-2.5 h-[2px] rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4,0_0_20px_#06b6d4] transition-all duration-200" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* 3. Collapsible / Expandable Nav Links (CERTIFICATES & CONTACT) */}
            <AnimatePresence initial={false}>
              {isExpanded ? (
                <motion.div
                  key="expanded-nav-group"
                  initial={{ opacity: 0, width: 0, scale: 0.94, filter: 'blur(4px)' }}
                  animate={{
                    opacity: 1,
                    width: 'auto',
                    scale: 1,
                    filter: 'blur(0px)',
                    transition: {
                      width: { type: 'spring', stiffness: 380, damping: 30, mass: 0.8 },
                      opacity: { duration: 0.2, delay: 0.03 },
                      scale: { duration: 0.2 },
                      filter: { duration: 0.16 },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    width: 0,
                    scale: 0.94,
                    filter: 'blur(4px)',
                    transition: {
                      opacity: { duration: 0.14 },
                      width: { type: 'spring', stiffness: 400, damping: 35, mass: 0.8 },
                      scale: { duration: 0.14 },
                      filter: { duration: 0.14 },
                    },
                  }}
                  className="flex items-center gap-0.5 lg:gap-1 overflow-hidden whitespace-nowrap"
                >
                  {collapsibleNavItems.map((item) => {
                    const isActive = activeSection === item.id;
                    const isHovered = hoveredItem === item.id;

                    return (
                      <button
                        key={item.id}
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onClick={() => scrollToSection(item.id)}
                        className={`relative px-2.5 lg:px-3 py-1.5 rounded-full text-[11px] lg:text-xs font-extrabold tracking-[0.12em] uppercase transition-colors duration-150 cursor-pointer whitespace-nowrap z-10 transform-gpu ${
                          isActive
                            ? 'text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.9)]'
                            : isHovered
                            ? 'text-white'
                            : 'text-zinc-400 hover:text-zinc-100'
                        }`}
                      >
                        {isHovered && (
                          <motion.span
                            layoutId="hoverNavCapsule"
                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                            className="absolute inset-0 rounded-full bg-gradient-to-b from-[#2e3c5c]/90 via-[#1c263f]/95 to-[#0d1424] border border-white/[0.22] shadow-[0_6px_22px_rgba(0,0,0,0.8),inset_0_1.5px_1px_rgba(255,255,255,0.4),0_0_16px_rgba(255,255,255,0.1)] -z-10"
                          />
                        )}

                        <span className="relative z-10">
                          <span className="xl:hidden">{item.label}</span>
                          <span className="hidden xl:inline">{item.fullLabel}</span>
                        </span>

                        {isActive && (
                          <span className="absolute -bottom-1 left-2.5 right-2.5 h-[2px] rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4,0_0_20px_#06b6d4] transition-all duration-200" />
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="collapsed-indicator"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center px-1.5 py-1 text-zinc-500 hover:text-cyan-400 transition-colors cursor-pointer select-none"
                  title="Hover to view Certificates & Contact"
                >
                  <span className="inline-flex items-center gap-0.5 text-[9px] font-mono tracking-widest font-bold opacity-60 hover:opacity-100 transition-opacity">
                    •••
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Vertical Hairline Divider */}
            <div className="h-5 w-[1px] bg-white/20 mx-0.5 lg:mx-1 shrink-0" />

            {/* 4. Integrated Action: Resume Button */}
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] lg:text-xs font-extrabold tracking-[0.14em] uppercase text-zinc-200 bg-white/[0.06] hover:bg-gradient-to-b hover:from-[#2e3c5c]/90 hover:via-[#1c263f]/95 hover:to-[#0d1424] hover:text-white border border-white/15 hover:border-cyan-400/40 shadow-sm hover:shadow-[0_0_16px_rgba(6,182,212,0.35),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 transform-gpu"
            >
              <FileText className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>RESUME</span>
              <span className="text-[11px] text-cyan-400 opacity-90 shrink-0">↗</span>
            </button>
          </motion.nav>

          {/* MOBILE (< md): Sleek Responsive Floating Top Bar */}
          <div className="flex md:hidden items-center justify-between w-full px-3 py-2 rounded-full bg-gradient-to-b from-[#182035]/95 via-[#0e1424]/98 to-[#060914] border border-white/[0.16] shadow-[0_10px_35px_rgba(0,0,0,0.7),inset_0_1.5px_1px_rgba(255,255,255,0.25)] backdrop-blur-2xl">
            {/* Mobile Brand Button */}
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-2.5 cursor-pointer group"
              aria-label="Scroll to top"
            >
              <div className="relative w-7 h-7 rounded-full overflow-hidden border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.35)] shrink-0 bg-[#0e1424]">
                <Image
                  src="/profile.jpg"
                  alt="Pranav Singh"
                  width={28}
                  height={28}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <span className="font-extrabold tracking-[0.16em] text-xs text-white uppercase group-hover:text-cyan-300 transition-colors whitespace-nowrap">
                PRANAV SINGH
              </span>
            </button>

            {/* Mobile Actions: Resume Pill + Hamburger Capsule */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onOpenResume}
                className="h-8 flex items-center gap-1 px-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.15] text-[11px] font-extrabold tracking-wider uppercase text-zinc-200 shadow-sm cursor-pointer transform-gpu transition-all"
              >
                <FileText className="w-3 h-3 text-purple-400" />
                <span>CV</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.15] flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer transform-gpu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4 text-cyan-400" /> : <Menu className="w-4 h-4 text-zinc-300" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

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
              className="fixed top-20 left-4 right-4 bg-gradient-to-b from-[#182035]/98 via-[#0e1424]/98 to-[#060914] rounded-3xl p-5 border border-white/20 shadow-2xl space-y-3"
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

              <div className="flex flex-col gap-1.5 max-h-[60vh] overflow-y-auto pr-1">
                {mobileNavItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-extrabold tracking-[0.16em] uppercase transition-all text-left ${
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
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
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
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-xs font-extrabold tracking-widest uppercase text-white bg-gradient-to-r from-purple-500 to-pink-500 border border-white/20 shadow-[0_0_20px_rgba(168,85,247,0.35)] cursor-pointer"
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

