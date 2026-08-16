'use client';

import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onOpenResume: () => void;
  isHidden?: boolean;
}

const navItems = [
  { id: 'hero', label: 'Home', icon: Terminal },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Layers },
  { id: 'projects', label: 'Projects', icon: Sparkles },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'contact', label: 'Contact', icon: Mail },
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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-8 py-3.5 ${
          isHidden ? 'opacity-0 -translate-y-full pointer-events-none' : 'opacity-100 translate-y-0'
        } ${isScrolled ? 'pt-3' : 'pt-5'}`}
      >
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full liquid-glass transition-all duration-300">
          {/* Logo / Brand */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
            aria-label="Scroll to home"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500/30 to-pink-400/30 border border-white/20 flex items-center justify-center group-hover:scale-105 group-hover:border-purple-400/50 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <span className="font-mono font-bold text-xs text-white">PS</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold tracking-wide text-white group-hover:text-purple-300 transition-colors">
                Pranav Singh
              </span>
              <span className="text-[10px] text-zinc-400 font-mono tracking-tighter">
                Full-Stack & AI
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] px-3 py-1 rounded-full backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] border border-white/15'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.05]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right actions: Resume Button, Mobile Hamburger */}
          <div className="flex items-center gap-2.5">
            {/* Resume Button */}
            <button
              onClick={onOpenResume}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-purple-500/30 to-pink-500/30 hover:from-purple-500/50 hover:to-pink-500/50 border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-purple-300" />
              <span>Resume</span>
              <span className="text-[10px] opacity-70">↗</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden w-8 h-8 rounded-full liquid-glow-pill flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop blur overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed top-20 left-4 right-4 liquid-glass rounded-3xl p-6 border border-white/15 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-2">
              <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 px-3 mb-1">
                Navigation
              </p>
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all text-left ${
                      isActive
                        ? 'bg-white/15 text-white font-semibold shadow-inner border border-white/20'
                        : 'text-zinc-300 hover:bg-white/[0.08] hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 text-purple-400" />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              <div className="h-[1px] bg-white/10 my-2" />

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-purple-500/40 to-pink-500/40 border border-white/20 shadow-lg"
              >
                <FileText className="w-4 h-4" />
                <span>View & Download Resume</span>
                <span>↗</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
