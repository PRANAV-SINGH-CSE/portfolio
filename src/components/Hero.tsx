'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Download,
  Terminal,
  Layers,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Mail,
} from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';
import { GitHubIcon, LinkedInIcon } from '@/components/Icons';

interface HeroProps {
  onOpenResume: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'architecture' | 'stack' | 'terminal'>('architecture');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
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
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 sm:pt-28 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden w-full"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: High-Impact Positioning (7 Cols) */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
              },
            },
          }}
          className="lg:col-span-7 flex flex-col items-start text-left space-y-4 sm:space-y-5 w-full"
        >
          {/* Status Badge with Playful Spring Pop */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.5, y: -10 },
              visible: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  type: 'spring',
                  stiffness: 350,
                  damping: 15,
                },
              },
            }}
            whileHover={{ scale: 1.04 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glow-pill text-[11px] sm:text-xs font-mono text-zinc-200 border border-white/15 shadow-sm max-w-full cursor-default"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="truncate">Available for Full-Time Roles & Projects</span>
          </motion.div>

          {/* Core Name & Headline with Spring Pop */}
          <div className="space-y-1.5 sm:space-y-2">
            <motion.h2
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 15 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: {
                    type: 'spring',
                    stiffness: 280,
                    damping: 18,
                  },
                },
              }}
              className="text-xs sm:text-sm font-mono uppercase tracking-widest text-cyan-400 font-bold"
            >
              Hi, I&apos;m {personalInfo.name}
            </motion.h2>

            <motion.h1
              variants={{
                hidden: { opacity: 0, scale: 0.85, y: 25 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: {
                    type: 'spring',
                    stiffness: 240,
                    damping: 18,
                  },
                },
              }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]"
            >
              Full-Stack <br />
              <span className="text-gradient-cyan">Developer</span> & <br />
              <span className="text-gradient-purple">AI Systems Builder</span>
            </motion.h1>
          </div>

          {/* Positioning Statement */}
          <motion.p
            variants={{
              hidden: { opacity: 0, scale: 0.9, y: 20 },
              visible: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  type: 'spring',
                  stiffness: 240,
                  damping: 20,
                },
              },
            }}
            className="text-sm sm:text-base text-zinc-300 font-medium leading-relaxed max-w-lg"
          >
            {personalInfo.positioningStatement}
          </motion.p>

          {/* Detailed Statement */}
          <motion.p
            variants={{
              hidden: { opacity: 0, scale: 0.95, y: 15 },
              visible: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  type: 'spring',
                  stiffness: 220,
                  damping: 20,
                },
              },
            }}
            className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-lg"
          >
            {personalInfo.detailedDescription}
          </motion.p>

          {/* CTA Action Buttons with Spring Pop */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8, y: 20 },
              visible: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  type: 'spring',
                  stiffness: 280,
                  damping: 18,
                },
              },
            }}
            className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1 w-full sm:w-auto"
          >
            {/* Primary CTA */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollToSection('projects')}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>View Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>

            {/* Secondary CTA: Resume */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenResume}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs sm:text-sm font-semibold text-zinc-200 liquid-glow-pill hover:text-white hover:border-white/30 transition-all cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download CV</span>
            </motion.button>

            {/* Secondary CTA: Contact */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs sm:text-sm font-semibold text-zinc-300 liquid-glass-subtle hover:text-white hover:border-white/30 transition-all cursor-pointer whitespace-nowrap"
            >
              <Mail className="w-3.5 h-3.5 text-purple-400" />
              <span>Contact Me</span>
            </motion.button>
          </motion.div>

          {/* Social Quick Links & Email Pill */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: {
                  type: 'spring',
                  stiffness: 240,
                  damping: 18,
                },
              },
            }}
            className="flex flex-wrap items-center gap-2 pt-1 w-full"
          >
            <motion.a
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glow-pill text-xs text-zinc-300 hover:text-white hover:border-white/30 transition-all"
              title="GitHub Profile"
            >
              <GitHubIcon className="w-3.5 h-3.5 text-zinc-300" />
              <span>GitHub</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glow-pill text-xs text-zinc-300 hover:text-white hover:border-white/30 transition-all"
              title="LinkedIn Profile"
            >
              <LinkedInIcon className="w-3.5 h-3.5 text-blue-400" />
              <span>LinkedIn</span>
            </motion.a>

            {/* Copy Email Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glow-pill text-xs text-zinc-300 hover:text-white hover:border-cyan-400/40 transition-all cursor-pointer max-w-full truncate"
              title="Click to copy email address"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-mono font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="font-mono text-zinc-400 truncate">{personalInfo.email}</span>
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Column: Spring Pop Terminal Preview Card (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 180,
            damping: 15,
            delay: 0.2,
          }}
          className="lg:col-span-5 w-full max-w-full"
        >
          <div className="relative rounded-3xl liquid-glass-card p-4 sm:p-6 lg:p-7 border border-white/20 shadow-2xl overflow-hidden group space-y-4 max-w-full">
            {/* Top specular glow effect */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

            {/* Header / Mac OS dots */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80 border border-rose-400/30" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80 border border-amber-400/30" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80 border border-emerald-400/30" />
                </div>
                <span className="font-mono text-xs text-zinc-200 truncate flex items-center gap-1 font-semibold">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">pranav@core:~</span>
                </span>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 shrink-0">
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-mono transition-all cursor-pointer ${
                    activeTab === 'architecture'
                      ? 'bg-white/15 text-cyan-300 font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Arch
                </button>
                <button
                  onClick={() => setActiveTab('stack')}
                  className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-mono transition-all cursor-pointer ${
                    activeTab === 'stack'
                      ? 'bg-white/15 text-purple-300 font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Stack
                </button>
                <button
                  onClick={() => setActiveTab('terminal')}
                  className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-mono transition-all cursor-pointer ${
                    activeTab === 'terminal'
                      ? 'bg-white/15 text-emerald-300 font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Live
                </button>
              </div>
            </div>

            {/* Tab 1: Architecture View */}
            {activeTab === 'architecture' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="space-y-3 font-mono text-xs text-zinc-300"
              >
                <div className="flex items-center justify-between text-[11px] sm:text-xs text-zinc-400 border-b border-white/5 pb-2">
                  <span className="text-cyan-400 font-semibold flex items-center gap-1.5 truncate">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" /> Real-Time Pipeline
                  </span>
                  <span className="text-[10px] sm:text-xs text-emerald-400 font-semibold shrink-0">&lt; 1ms • Optimistic</span>
                </div>

                <div className="space-y-2 bg-black/40 p-3.5 sm:p-4 rounded-2xl border border-white/5 text-[11px] sm:text-xs leading-relaxed">
                  <div>
                    <span className="text-zinc-400">1. Client UI: </span>
                    <span className="text-cyan-300 font-medium">Next.js 16 + React 19 + @dnd-kit</span>
                    <p className="text-zinc-400 pl-3 text-[10px] mt-0.5">
                      ↓ Sub-1ms local state transform & optimistic reorder
                    </p>
                  </div>

                  <div className="pt-1">
                    <span className="text-zinc-400">2. Realtime: </span>
                    <span className="text-purple-300 font-medium">Cloud Firestore [WebSocket]</span>
                    <p className="text-zinc-400 pl-3 text-[10px] mt-0.5">
                      ↓ ~4.5ms median broadcast (decoupled from 350ms commit)
                    </p>
                  </div>

                  <div className="pt-1">
                    <span className="text-zinc-400">3. Cache: </span>
                    <span className="text-emerald-300 font-medium">IndexedDB Multi-Tab Manager</span>
                    <p className="text-zinc-400 pl-3 text-[10px] mt-0.5">
                      ↓ ~5ms repeat load time (down from ~400ms query)
                    </p>
                  </div>

                  <div className="pt-1">
                    <span className="text-zinc-400">4. Speech AI: </span>
                    <span className="text-amber-300 font-medium">Faster-Whisper CUDA & FastAPI</span>
                    <p className="text-zinc-400 pl-3 text-[10px] mt-0.5">
                      ↓ &lt;700ms voice loop, 0.28x real-time factor
                    </p>
                  </div>
                </div>

                {/* Telemetry Metric Boxes */}
                <div className="grid grid-cols-2 gap-2.5 pt-0.5">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="p-2.5 sm:p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between"
                  >
                    <p className="text-[10px] sm:text-xs text-zinc-400 font-mono">Drag Reaction</p>
                    <p className="text-sm sm:text-base font-extrabold text-cyan-400 mt-0.5">
                      &lt; 1ms <span className="text-[10px] font-normal text-zinc-400">(60 FPS)</span>
                    </p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="p-2.5 sm:p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between"
                  >
                    <p className="text-[10px] sm:text-xs text-zinc-400 font-mono">Speech AI Latency</p>
                    <p className="text-sm sm:text-base font-extrabold text-emerald-400 mt-0.5">
                      &lt; 700ms <span className="text-[10px] font-normal text-zinc-400">E2E</span>
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Tab 2: Tech Stack Matrix */}
            {activeTab === 'stack' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="space-y-3 font-mono text-xs"
              >
                <div className="text-xs text-purple-300 flex items-center gap-1.5 pb-2 border-b border-white/5 font-semibold">
                  <Layers className="w-3.5 h-3.5" /> High-Performance Tech Stack
                </div>

                <div className="space-y-2.5 bg-black/40 p-3.5 sm:p-4 rounded-2xl border border-white/5">
                  <div>
                    <div className="flex justify-between text-[11px] sm:text-xs text-zinc-200 mb-1">
                      <span>Next.js 16 / React 19 / TypeScript</span>
                      <span className="text-cyan-400 font-bold">96%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full w-[96%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] sm:text-xs text-zinc-200 mb-1">
                      <span>Python / FastAPI / Faster-Whisper</span>
                      <span className="text-purple-400 font-bold">94%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full w-[94%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] sm:text-xs text-zinc-200 mb-1">
                      <span>Firebase & MongoDB Atlas</span>
                      <span className="text-emerald-400 font-bold">92%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[92%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] sm:text-xs text-zinc-200 mb-1">
                      <span>Gemini 2.5 Flash & LLM Tooling</span>
                      <span className="text-amber-400 font-bold">94%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full w-[94%]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 3: Interactive CLI */}
            {activeTab === 'terminal' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="space-y-3 font-mono text-xs"
              >
                <div className="bg-black/50 p-3.5 sm:p-4 rounded-2xl border border-white/5 space-y-1.5 text-[11px] sm:text-xs leading-relaxed">
                  <p className="text-zinc-400">
                    <span className="text-emerald-400 font-bold">pranav@dev</span>:~$ sprinto status --inspect
                  </p>
                  <p className="text-cyan-300">✔ Sprinto: &lt;1ms Optimistic UI & ~4.5ms Sync</p>
                  <p className="text-purple-300">✔ LiveVoice AI: Faster-Whisper 0.28x RTF &lt;700ms</p>
                  <p className="text-emerald-300">✔ ZentiqAI: Multi-Session Persistence</p>
                  <p className="text-amber-300">✔ Review Radar: Gemini 2.5 Structured JSON</p>
                  <p className="text-zinc-500 pt-1 flex items-center gap-1 text-[10px]">
                    <span className="animate-pulse font-bold text-cyan-400">_</span> 4 core systems running
                  </p>
                </div>
              </motion.div>
            )}

            {/* Bottom mini-bar */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] sm:text-xs text-zinc-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Production Verified
              </span>
              <span className="font-mono text-zinc-400">India • LPU CSE</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
