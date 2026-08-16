'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Layers,
  Sparkles,
  Cpu,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
} from 'lucide-react';
import { GitHubIcon } from '@/components/Icons';
import { Project } from '@/types';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  // Completely freeze underlying background scroll and listen for ESC key
  useEffect(() => {
    if (project) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.classList.remove('modal-open');
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }
  }, [project, onClose]);

  const hasLinks = Boolean(project?.liveUrl || project?.githubUrl);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-y-auto overscroll-contain">
          {/* Opaque Dark Frosted Backdrop that covers entire page and hides sections below */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#030712]/95 backdrop-blur-md transition-opacity cursor-pointer"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* High-Performance Hardware-Accelerated Modal Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto overscroll-contain rounded-3xl bg-[#080d1a] border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.95)] p-6 sm:p-8 lg:p-9 space-y-6 z-20 my-auto transform-gpu"
          >
            {/* Top Floating Glow Edge */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400" />

            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-cyan-300 border border-cyan-400/30 shadow-[0_0_12px_rgba(6,182,212,0.15)] whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">Architectural Case Study</span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                  {project.title} — <span className="text-gradient-cyan">{project.tagline}</span>
                </h2>
              </div>

              <button
                onClick={onClose}
                aria-label="Close modal"
                className="w-9 h-9 rounded-full liquid-glow-pill flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Action Links & Stats Summary Row */}
            {(hasLinks || (project.caseStudy.metrics && project.caseStudy.metrics.length > 0)) && (
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                {hasLinks ? (
                  <div className="flex flex-wrap items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 shadow-md transition-all whitespace-nowrap"
                      >
                        <span>Live Interactive Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-zinc-200 liquid-glow-pill hover:text-white transition-all whitespace-nowrap"
                      >
                        <GitHubIcon className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="text-xs font-mono text-cyan-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Proprietary High-Performance Architecture</span>
                  </div>
                )}

                {/* Key Metrics */}
                {project.caseStudy.metrics && (
                  <div className="flex flex-wrap items-center gap-2">
                    {project.caseStudy.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-right whitespace-nowrap"
                      >
                        <p className="text-[10px] text-zinc-400 font-mono">{m.label}</p>
                        <p className="text-xs font-bold text-cyan-300 flex items-center justify-end gap-1">
                          <span>{m.value}</span>
                          {m.trend && (
                            <span className="text-[9px] text-emerald-400 font-normal">({m.trend})</span>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Section 1: Problem & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Problem Card */}
              <div className="p-5 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 text-sm font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>1. The Problem Statement</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {project.caseStudy.problem}
                </p>
              </div>

              {/* Solution Card */}
              <div className="p-5 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                  <Lightbulb className="w-4 h-4" />
                  <span>2. The Engineered Solution</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {project.caseStudy.solution}
                </p>
              </div>
            </div>

            {/* Section 2: Architecture & Request Lifecycle */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>3. System Architecture & Request Lifecycle</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {project.caseStudy.architectureSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 hover:border-cyan-400/30 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-500/20 text-cyan-300 border border-indigo-400/30">
                          Step {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">{step.layer}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">{step.title}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">{step.desc}</p>
                    </div>

                    <div className="pt-2 border-t border-white/5">
                      <span className="text-[10px] font-mono text-purple-300 truncate block">
                        {step.tech}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Engineering Challenges & Solved Bottlenecks */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span>4. Key Technical Hurdles & Resolutions</span>
              </div>

              <div className="space-y-3">
                {project.caseStudy.challenges.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2"
                  >
                    <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{c.title}</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pl-3.5 border-l-2 border-cyan-400/30">
                      {c.solution}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Quantitative Results */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>5. Measured Performance & Results</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.caseStudy.results.map((res, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-zinc-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full text-xs font-semibold text-zinc-300 liquid-glow-pill hover:text-white transition-all cursor-pointer"
              >
                Close Case Study
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
