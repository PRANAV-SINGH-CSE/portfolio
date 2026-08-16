'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Laptop,
  Bot,
  Wrench,
  BookOpen,
  Target,
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
  Activity,
  Database,
} from 'lucide-react';
import { personalInfo, developerStats } from '@/data/portfolioData';

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Laptop,
  Bot,
  Wrench,
};

const learningItemsWithMeta = [
  {
    title: 'Next.js 16 App Router & Server Actions',
    tag: 'Web Architecture',
    desc: 'Deep integration with React 19, Server Components & optimistic UI caching',
    icon: Layers,
  },
  {
    title: 'Real-Time WebSocket & Audio DSP Pipelines',
    tag: 'Systems & Audio',
    desc: 'Sub-second speech-to-token streaming with async buffering & VAD',
    icon: Activity,
  },
  {
    title: 'Faster-Whisper CUDA Speech Recognition',
    tag: 'AI & Inference',
    desc: 'Tuning 0.28x real-time factor for low-latency voice assistants',
    icon: Cpu,
  },
  {
    title: 'Firestore Real-Time Sync & IndexedDB Caches',
    tag: 'Distributed Data',
    desc: 'Decoupling 350ms cloud commits for 5ms instant repeat visits',
    icon: Database,
  },
];

export default function About() {
  // 4 Core Stat Blocks
  const coreStats = developerStats.slice(0, 4);

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center space-y-3 mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glow-pill text-xs font-mono text-cyan-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>About My Journey</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Engineering with <span className="text-gradient-cyan">Precision & Passion</span>
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
          A short overview of my academic foundation at Lovely Professional University, technical focus, and architectural philosophy.
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Top Row: Main Bio Card (8 Cols) + 4 Stat Blocks (4 Cols in 2x2 Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Bio Glass Card (8 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8 p-6 sm:p-8 rounded-3xl liquid-glass-card border border-white/10 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-cyan-300 shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Full-Stack Craftsmanship meets AI Systems
                  </h3>
                  <p className="text-xs font-mono text-zinc-400">
                    Lovely Professional University (LPU) • B.Tech CSE
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {personalInfo.bio}
              </p>
            </div>

            <div className="pt-3.5 border-t border-white/10 space-y-1.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 font-semibold">
                <Target className="w-3.5 h-3.5 text-purple-400" />
                <span>The Problems I Solve</span>
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {personalInfo.problemsToSolve}
              </p>
            </div>
          </motion.div>

          {/* Right Column: 4 Developer Stat Blocks in 2x2 Grid (4 Cols) */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-stretch">
            {coreStats.map((stat, idx) => {
              const IconComponent = iconMap[stat.icon] || Sparkles;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="p-4 sm:p-4.5 rounded-2xl liquid-glass-card border border-white/10 flex flex-col justify-between group hover:border-cyan-500/30 transition-all space-y-3 cursor-default"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-zinc-400">{stat.label}</span>
                    <div
                      className={`w-7 h-7 rounded-lg bg-gradient-to-br ${stat.color} border border-white/10 flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {stat.value}
                    </h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                      {stat.detail}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Full Width Bottom Card with Framer Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full p-6 sm:p-8 lg:p-9 rounded-3xl liquid-glass border border-white/10 space-y-6 relative overflow-hidden group"
        >
          {/* Subtle Top Specular Glow */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-white/5">
            <div className="space-y-1">
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span>What I&apos;m Currently Exploring & Learning</span>
              </h4>
              <p className="text-xs text-zinc-400 font-mono">
                Continuous deep-dives into real-time architectures, AI engines, and distributed caching
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-400/20 whitespace-nowrap">
              Active Focus Areas
            </span>
          </div>

          {/* 4 Cards with Framer Motion stagger */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
            {learningItemsWithMeta.map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="p-5 sm:p-5.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-400/30 hover:bg-white/[0.04] transition-all flex flex-col justify-between space-y-3.5 group/card min-h-[140px]"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-400/20">
                        {item.tag}
                      </span>
                      <ItemIcon className="w-4 h-4 text-zinc-400 group-hover/card:text-cyan-400 transition-colors" />
                    </div>
                    <h5 className="text-xs sm:text-sm font-bold text-white group-hover/card:text-cyan-300 transition-colors leading-snug">
                      {item.title}
                    </h5>
                  </div>

                  <p className="text-[11px] text-zinc-400 leading-relaxed border-t border-white/5 pt-2.5">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
