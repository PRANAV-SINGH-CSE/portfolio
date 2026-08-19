'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Layout,
  Server,
  Database,
  Sparkles,
  Cpu,
  CheckCircle2,
  Code,
} from 'lucide-react';
import { skillCategories } from '@/data/portfolioData';

const iconMap: Record<string, React.ElementType> = {
  Layout,
  Server,
  Database,
  Sparkles,
  Cpu,
  Code,
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredCategories =
    activeCategory === 'all'
      ? skillCategories
      : skillCategories.filter((c) => c.name.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center space-y-3 mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glow-pill text-xs font-mono text-purple-400">
          <Layers className="w-3.5 h-3.5" />
          <span>Technical Proficiency</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          <span className="liquid-glass-text">Curated</span>{' '}
          <span className="liquid-glass-text-purple">Skills & Tech Stack</span>
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
          Grouped by discipline to highlight production capability across modern web architectures and AI systems.
        </p>
      </motion.div>

      {/* Category Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap items-center justify-center gap-2 mb-10"
      >
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${activeCategory === 'all'
              ? 'bg-gradient-to-r from-indigo-500/40 to-cyan-500/40 text-white border border-white/20 shadow-[0_0_15px_rgba(99,102,241,0.3)]'
              : 'liquid-glow-pill text-zinc-400 hover:text-white'
            }`}
        >
          All Domains
        </button>

        {skillCategories.map((category) => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(category.name.toLowerCase())}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${activeCategory === category.name.toLowerCase()
                ? 'bg-gradient-to-r from-indigo-500/40 to-cyan-500/40 text-white border border-white/20 shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                : 'liquid-glow-pill text-zinc-400 hover:text-white'
              }`}
          >
            {category.name}
          </button>
        ))}
      </motion.div>

      {/* All 4 Skill Category Cards in One Line on Desktop with Staggered Motion */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
        <AnimatePresence mode="popLayout">
          {filteredCategories.map((cat, idx) => {
            const IconComponent = iconMap[cat.icon] || Code;
            return (
              <motion.div
                key={cat.name}
                layout
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="rounded-3xl liquid-glass-card p-5 sm:p-5.5 border border-white/10 flex flex-col justify-between group hover:border-purple-500/30 transition-all space-y-4"
              >
                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-cyan-300 shadow-sm group-hover:scale-105 transition-transform shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                          {cat.name}
                        </h3>
                        <span className="text-[10px] text-zinc-400 font-mono">
                          {cat.skills.length} technologies
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 mb-3.5 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>

                  {/* Skill Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${skill.highlight
                            ? 'bg-white/[0.07] border border-cyan-400/30 text-white shadow-[0_0_10px_rgba(6,182,212,0.15)] hover:border-cyan-400/60'
                            : 'bg-white/[0.03] border border-white/5 text-zinc-300 hover:border-white/20'
                          }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${skill.highlight ? 'bg-cyan-400 animate-pulse' : 'bg-zinc-500'
                            }`}
                        />
                        <span className="truncate">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Subtle Status */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                  <span>Tier 1</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
