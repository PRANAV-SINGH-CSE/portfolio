'use client';

import React from 'react';
import {
  ArrowUp,
  Mail,
  Sparkles,
  Heart,
  FileText,
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/Icons';
import { personalInfo } from '@/data/portfolioData';

interface FooterProps {
  onOpenResume: () => void;
}

export default function Footer({ onOpenResume }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative z-10 border-t border-white/10 mt-20 bg-black/40 backdrop-blur-2xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-[10px] font-bold text-white font-mono">
                PS
              </div>
              <span className="text-base font-bold text-white tracking-wide">
                Pranav Singh
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              Full-Stack Developer & AI Systems Engineer
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-zinc-400 font-medium">
            <button
              onClick={() => scrollToSection('hero')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
            <button
              onClick={onOpenResume}
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Resume</span>
              <span>↗</span>
            </button>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-8 h-8 rounded-full liquid-glow-pill flex items-center justify-center text-zinc-400 hover:text-white transition-all"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-8 h-8 rounded-full liquid-glow-pill flex items-center justify-center text-zinc-400 hover:text-blue-400 transition-all"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Send Email"
              className="w-8 h-8 rounded-full liquid-glow-pill flex items-center justify-center text-zinc-400 hover:text-cyan-400 transition-all"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="w-8 h-8 rounded-full liquid-glow-pill flex items-center justify-center text-zinc-400 hover:text-white hover:border-cyan-400/40 transition-all cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-[11px] font-mono text-zinc-400 text-center sm:text-left">
          <p>© 2026 Pranav Singh. Engineered with Next.js & React 19.</p>
          <p className="flex items-center gap-1 justify-center">
            <span>Built for high performance & clean architecture</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
