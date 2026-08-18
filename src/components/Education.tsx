'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Calendar,
  MapPin,
  BookOpen,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { educationData } from '@/data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center space-y-3 mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glow-pill text-xs font-mono text-purple-400">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Academic Foundation</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          <span className="liquid-glass-text">Formal</span>{' '}
          <span className="liquid-glass-text-purple">Education</span>
        </h2>
      </motion.div>

      {/* Education Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -3 }}
        className="rounded-3xl liquid-glass-card p-6 sm:p-8 border border-white/10 space-y-6 max-w-4xl mx-auto"
      >
        <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-indigo-500/20 text-cyan-300 border border-indigo-400/30">
                Undergraduate Degree
              </span>
              {educationData.grade && (
                <span className="text-xs font-mono text-emerald-400">
                  • {educationData.grade}
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {educationData.degree} in {educationData.field}
            </h3>
            <p className="text-sm font-semibold text-zinc-300">
              {educationData.institution}
            </p>
          </div>

          <div className="flex flex-col sm:items-end text-left sm:text-right text-xs font-mono text-zinc-400 space-y-1">
            <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              {educationData.period}
            </span>
            <span className="flex items-center gap-1.5 text-zinc-400">
              <MapPin className="w-3.5 h-3.5" />
              {educationData.location}
            </span>
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Academic Highlights</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {educationData.highlights.map((hl, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-zinc-300"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{hl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Core Coursework */}
        <div className="pt-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>Relevant Coursework</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {educationData.coursework.map((course, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl text-xs font-mono bg-white/[0.04] text-zinc-300 border border-white/5"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
