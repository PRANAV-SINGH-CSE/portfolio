'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ExternalLink,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Activity,
  ChevronDown,
} from 'lucide-react';
import { GitHubIcon } from '@/components/Icons';
import { featuredProjects } from '@/data/portfolioData';
import { Project } from '@/types';

interface ProjectsProps {
  onSelectProject?: (project: Project) => void;
}

export default function Projects({
  onSelectProject,
}: ProjectsProps = {}) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showAll, setShowAll] = useState<boolean>(false);

  const categories = ['all', 'Web Apps & UI', 'AI & Full-Stack'];

  const filteredProjects =
    activeFilter === 'all'
      ? featuredProjects
      : featuredProjects.filter((p) => p.category.toLowerCase() === activeFilter.toLowerCase());

  // Show top 2 by default in 'all' view until user clicks Show More
  const displayedProjects =
    activeFilter === 'all' && !showAll
      ? filteredProjects.slice(0, 2)
      : filteredProjects;

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center space-y-3 mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glow-pill text-xs font-mono text-cyan-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Flagship Engineering Showcase</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          <span className="liquid-glass-text">Featured</span>{' '}
          <span className="liquid-glass-text-cyan">Projects & Case Studies</span>
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
          Real-time collaborative workspaces, low-latency speech pipelines, and full-stack AI architectures.
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap items-center justify-center gap-2 mb-12"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${activeFilter.toLowerCase() === cat.toLowerCase()
                ? 'bg-gradient-to-r from-indigo-500/40 to-cyan-500/40 text-white border border-white/20 shadow-[0_0_15px_rgba(99,102,241,0.35)]'
                : 'liquid-glow-pill text-zinc-400 hover:text-white'
              }`}
          >
            {cat === 'all' ? 'All Showcase' : cat}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="rounded-3xl liquid-glass-card p-6 sm:p-8 border border-white/10 flex flex-col justify-between group hover:border-cyan-500/40 transition-all space-y-6"
            >
              {/* Top Container */}
              <div className="space-y-5">
                {/* Row 1: Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-cyan-300 border border-cyan-400/25 shadow-sm whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      {project.category}
                    </span>

                    {project.featured && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-400/25 shadow-sm whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        Flagship
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-mono text-zinc-400 tracking-wider flex items-center gap-1">
                    <Activity className="w-3 h-3 text-emerald-400" />
                    Live Sync
                  </span>
                </div>

                {/* Title & Tagline */}
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-cyan-400/90 leading-snug">
                    {project.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Performance Micro-Metrics Grid */}
                {project.stats && project.stats.length > 0 && (
                  <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                    {project.stats.map((s, sIdx) => (
                      <div key={sIdx} className="flex flex-col text-left">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 truncate">
                          {s.label}
                        </span>
                        <span className="text-xs font-bold text-cyan-300 mt-0.5 truncate">
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Highlights & Engineering Details */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                    Key Technical Achievements:
                  </p>
                  <div className="space-y-1.5">
                    {project.highlights.slice(0, 3).map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.03] text-zinc-300 border border-white/10 hover:border-cyan-400/40 hover:text-white transition-all whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Row: Actions & Case Study Trigger */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                {/* Deep Dive Case Study Button */}
                <button
                  onClick={() => onSelectProject && onSelectProject(project)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-indigo-500/40 to-cyan-500/40 hover:from-indigo-500/70 hover:to-cyan-500/70 border border-white/20 shadow-md hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer whitespace-nowrap"
                >
                  <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Deep-Dive Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Links */}
                <div className="flex items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-zinc-300 liquid-glow-pill hover:text-white transition-all whitespace-nowrap"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3 text-cyan-400" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-zinc-300 liquid-glow-pill hover:text-white transition-all whitespace-nowrap"
                    >
                      <GitHubIcon className="w-3 h-3" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Show More / Hide (Show Less) Toggle Button */}
      {activeFilter === 'all' && filteredProjects.length > 2 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex justify-center pt-10"
        >
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold text-zinc-100 liquid-glow-pill hover:text-white hover:border-cyan-400/50 hover:scale-[1.02] shadow-[0_0_25px_rgba(99,102,241,0.25)] transition-all cursor-pointer group"
          >
            <span>{showAll ? 'Hide Projects (Show Less)' : `Show More Projects (+${filteredProjects.length - 2} More)`}</span>
            <ChevronDown
              className={`w-4 h-4 text-cyan-400 group-hover:translate-y-0.5 transition-transform duration-300 ${showAll ? 'rotate-180 -translate-y-0.5' : ''
                }`}
            />
          </button>
        </motion.div>
      )}
    </section>
  );
}
