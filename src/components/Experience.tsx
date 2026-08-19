'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Globe,
  Sparkles,
} from 'lucide-react';
import { experienceItems } from '@/data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center space-y-3 mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glow-pill text-xs font-mono text-cyan-400">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Track Record</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          <span className="liquid-glass-text">Experience &</span>{' '}
          <span className="liquid-glass-text-cyan">Engineering Journey</span>
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
          Core development roles, production deployments, startup internships, and academic accomplishments.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative border-l-2 border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {experienceItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative group"
          >
            {/* Timeline Dot Node */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#030712] border-2 border-cyan-400 group-hover:scale-125 group-hover:bg-cyan-400 transition-all shadow-[0_0_10px_rgba(6,182,212,0.6)]" />

            {/* Content Glass Card */}
            <motion.div
              whileHover={{ y: -3 }}
              className="rounded-3xl liquid-glass-card p-6 sm:p-7 border border-white/10 space-y-4 hover:border-cyan-500/30 transition-all"
            >
              {/* Header Row */}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium whitespace-nowrap ${item.type === 'Internship'
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 shadow-[0_0_10px_rgba(52,211,153,0.2)]'
                          : 'bg-cyan-500/10 text-cyan-300 border border-cyan-400/20'
                        }`}
                    >
                      {item.badge}
                    </span>
                    {item.type === 'Internship' && (
                      <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Production Shipped
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-1.5 group-hover:text-cyan-300 transition-colors">
                    {item.role}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-zinc-300 flex items-center gap-1.5">
                    <span>{item.organization}</span>
                  </p>
                </div>

                <div className="flex flex-col sm:items-end text-left sm:text-right text-xs font-mono text-zinc-400 space-y-1">
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    {item.period}
                  </span>
                  <span className="flex items-center gap-1.5 text-zinc-400 whitespace-nowrap">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    {item.location}
                  </span>
                </div>
              </div>

              {/* Bullets */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                {item.description.map((desc, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{desc}</span>
                  </div>
                ))}
              </div>

              {/* Links / Websites if available */}
              {item.links && item.links.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {item.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-white/[0.04] hover:bg-white/[0.09] text-cyan-300 hover:text-white border border-cyan-400/20 hover:border-cyan-400/50 shadow-sm transition-all cursor-pointer"
                    >
                      <Globe className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{link.label}</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  ))}
                </div>
              )}

              {/* Skills used */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.04] text-zinc-300 border border-white/10 hover:border-cyan-400/40 hover:text-white transition-all whitespace-nowrap"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
