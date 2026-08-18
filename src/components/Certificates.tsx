'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  ShieldCheck,
  ExternalLink,
  Download,
  Eye,
  Calendar,
  Sparkles,
  Building2,
  CheckCircle2,
  GraduationCap,
  ChevronDown,
} from 'lucide-react';
import { certificatesData } from '@/data/portfolioData';
import { CertificateItem } from '@/types';

interface CertificatesProps {
  onSelectCertificate: (cert: CertificateItem) => void;
}

export default function Certificates({ onSelectCertificate }: CertificatesProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAll, setShowAll] = useState<boolean>(false);

  const categories = [
    'all',
    'Full-Stack & Web',
    'Languages & OOP',
    'Data Structures & Algorithms',
    'Databases & Systems',
  ];

  const filteredCertificates =
    activeCategory === 'all'
      ? certificatesData
      : certificatesData.filter(
          (c) => c.category.toLowerCase() === activeCategory.toLowerCase()
        );

  // Show only 3 certificates normally by default unless expanded
  const displayedCertificates =
    activeCategory === 'all' && !showAll
      ? filteredCertificates.slice(0, 3)
      : filteredCertificates;

  return (
    <section
      id="certificates"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center space-y-3 mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glow-pill text-xs font-mono text-cyan-400">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>Accredited Expertise</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          <span className="liquid-glass-text">Verified</span>{' '}
          <span className="liquid-glass-text-cyan">Certifications & Credentials</span>
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
          Officially verified industry & academic accreditations across Next.js Full Stack, Data Structures, Algorithms, Database Management, and Systems Engineering.
        </p>
      </motion.div>

      {/* Overview Metrics Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10"
      >
        <div className="p-4 rounded-2xl liquid-glass-card border border-white/10 text-center space-y-1">
          <span className="text-2xl sm:text-3xl font-extrabold text-gradient-cyan">6</span>
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">Certifications</p>
        </div>
        <div className="p-4 rounded-2xl liquid-glass-card border border-white/10 text-center space-y-1">
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">100%</span>
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">ID & QR Verified</p>
        </div>
        <div className="p-4 rounded-2xl liquid-glass-card border border-white/10 text-center space-y-1">
          <span className="text-2xl sm:text-3xl font-extrabold text-purple-400">3</span>
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">Industry Bodies</p>
        </div>
        <div className="p-4 rounded-2xl liquid-glass-card border border-white/10 text-center space-y-1">
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">4</span>
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">Core Disciplines</p>
        </div>
      </motion.div>

      {/* Category Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex flex-wrap items-center justify-center gap-2 mb-10"
      >
        {categories.map((cat) => {
          const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
          const count =
            cat === 'all'
              ? certificatesData.length
              : certificatesData.filter(
                  (c) => c.category.toLowerCase() === cat.toLowerCase()
                ).length;

          return (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                if (cat !== 'all') setShowAll(true);
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-500/40 to-cyan-500/40 text-white border border-white/20 shadow-[0_0_15px_rgba(99,102,241,0.35)]'
                  : 'liquid-glow-pill text-zinc-400 hover:text-white'
              }`}
            >
              <span>{cat === 'all' ? 'All Credentials' : cat}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-cyan-400/30 text-white' : 'bg-white/10 text-zinc-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        <AnimatePresence mode="popLayout">
          {displayedCertificates.map((cert, idx) => (
            <motion.div
              key={cert.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="rounded-3xl liquid-glass-card border border-white/10 flex flex-col justify-between overflow-hidden group hover:border-cyan-500/40 hover:shadow-[0_15px_35px_rgba(6,182,212,0.15)] transition-all duration-300 transform-gpu"
            >
              {/* Card Image Banner Container */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#0a0f1d] border-b border-white/10">
                <Image
                  src={cert.previewImage}
                  alt={cert.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subtle Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-transparent to-black/30 pointer-events-none" />

                {/* Top Badges Floating on Image */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  {/* Issuer Badge */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold backdrop-blur-md border shadow-md ${
                      cert.issuerCategory === 'Infosys'
                        ? 'bg-[#007cc3]/80 text-white border-cyan-400/40 shadow-cyan-500/20'
                        : cert.issuerCategory === 'CipherSchools'
                        ? 'bg-[#6366f1]/85 text-white border-indigo-300/40 shadow-indigo-500/20'
                        : 'bg-[#ff4e00]/80 text-white border-orange-300/40 shadow-orange-500/20'
                    }`}
                  >
                    <Building2 className="w-3 h-3" />
                    <span>{cert.issuerCategory}</span>
                  </span>

                  {/* Verified Indicator Badge */}
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 backdrop-blur-md shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Verified</span>
                  </span>
                </div>

                {/* Hover Quick View Trigger Overlay */}
                <button
                  onClick={() => onSelectCertificate(cert)}
                  className="absolute inset-0 bg-black/50 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 text-white font-bold text-xs cursor-pointer z-10"
                  aria-label={`View certificate for ${cert.title}`}
                >
                  <div className="px-4 py-2 rounded-full bg-cyan-500/80 text-white flex items-center gap-1.5 shadow-[0_0_20px_rgba(6,182,212,0.6)] transform scale-90 group-hover:scale-100 transition-transform">
                    <Eye className="w-4 h-4" />
                    <span>Quick Preview</span>
                  </div>
                </button>
              </div>

              {/* Card Body Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Category Pill & Date */}
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="text-[11px] font-mono text-cyan-400 font-semibold truncate">
                      {cert.category}
                    </span>
                    <span className="text-[11px] font-mono flex items-center gap-1 shrink-0">
                      <Calendar className="w-3 h-3 text-purple-400" />
                      {cert.issueDate.split(',')[0]}
                    </span>
                  </div>

                  {/* Certificate Title */}
                  <h3
                    onClick={() => onSelectCertificate(cert)}
                    className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer line-clamp-2 leading-snug"
                  >
                    {cert.title}
                  </h3>

                  {/* Issuing Organisation Detail */}
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                    {cert.issuer}
                    {cert.collaborator && (
                      <span className="text-zinc-300"> • {cert.collaborator}</span>
                    )}
                  </p>

                  {/* Technical Skills Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cert.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-lg text-[11px] font-mono bg-white/[0.03] text-zinc-300 border border-white/10 group-hover:border-cyan-400/30 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 4 && (
                      <span className="px-2 py-0.5 rounded-lg text-[11px] font-mono bg-white/[0.02] text-zinc-500 border border-white/5">
                        +{cert.skills.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectCertificate(cert)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-500/40 to-cyan-500/40 hover:from-indigo-500/70 hover:to-cyan-500/70 border border-white/20 shadow-sm transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-300" />
                    <span>View Details</span>
                  </button>

                  <a
                    href={cert.pdfUrl}
                    download={`Pranav_Singh_${cert.title.replace(/\s+/g, '_')}.pdf`}
                    className="p-2 rounded-xl text-zinc-400 hover:text-white liquid-glow-pill hover:border-cyan-400/40 transition-colors cursor-pointer"
                    title="Download Official PDF"
                    aria-label={`Download ${cert.title} PDF`}
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={cert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-zinc-400 hover:text-white liquid-glow-pill hover:border-cyan-400/40 transition-colors cursor-pointer"
                    title="Open PDF in new tab"
                    aria-label={`Open ${cert.title} in new tab`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Show More / Hide (Show Less) Toggle Button */}
      {activeCategory === 'all' && filteredCertificates.length > 3 && (
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
            <span>
              {showAll
                ? 'Hide Certificates (Show Less)'
                : `Show More Certificates (+${filteredCertificates.length - 3} More)`}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-cyan-400 group-hover:translate-y-0.5 transition-transform duration-300 ${
                showAll ? 'rotate-180 -translate-y-0.5' : ''
              }`}
            />
          </button>
        </motion.div>
      )}

      {/* Academic Endorsement Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-14 p-6 sm:p-8 rounded-3xl liquid-glass-card border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-cyan-500/20 border border-white/15 flex items-center justify-center text-cyan-300 shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white">
              Academic & Professional Continuous Learning
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              All credentials are backed by rigorous coursework at Lovely Professional University, Infosys Springboard, and iamneo testing platforms.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <a
            href="/CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 transition-all cursor-pointer whitespace-nowrap"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verify on CV</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
