'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  X,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Rocket,
  Code2,
  Download,
  Send,
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/Icons';
import { personalInfo } from '@/data/portfolioData';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const scrollToContact = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 350);
  };

  const contactCards = [
    {
      label: 'GITHUB',
      detail: `@${personalInfo.githubUsername}`,
      href: personalInfo.github,
      icon: GitHubIcon,
      iconBg: 'bg-white/10',
      iconColor: 'text-white',
      action: 'Visit',
      actionType: 'link' as const,
    },
    {
      label: 'LINKEDIN',
      detail: 'Pranav Singh',
      href: personalInfo.linkedin,
      icon: LinkedInIcon,
      iconBg: 'bg-blue-500/15',
      iconColor: 'text-blue-400',
      action: 'Visit',
      actionType: 'link' as const,
    },
    {
      label: 'EMAIL',
      detail: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      icon: Mail,
      iconBg: 'bg-pink-500/15',
      iconColor: 'text-pink-400',
      action: 'Copy',
      actionType: 'copy-email' as const,
    },
    {
      label: 'PHONE',
      detail: `+91 ${personalInfo.phone}`,
      href: `tel:+91${personalInfo.phone}`,
      icon: Phone,
      iconBg: 'bg-emerald-500/15',
      iconColor: 'text-emerald-400',
      action: 'Copy',
      actionType: 'copy-phone' as const,
    },
    {
      label: 'LOCATION',
      detail: personalInfo.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(personalInfo.location)}`,
      icon: MapPin,
      iconBg: 'bg-amber-500/15',
      iconColor: 'text-amber-400',
      action: 'View',
      actionType: 'link' as const,
    },
  ];

  const staggerChildren: Variants = {
    animate: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
  };
  const fadeUp: Variants = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-hidden">
          {/* Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/85 backdrop-blur-2xl"
            onClick={onClose}
          />

          {/* ════ Atmospheric 3D Glowing Spheres & Neon Curves (Image 2 style with Slow Fade-off Animation) ════ */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
            {/* Top-Left Glowing Cyan Sphere - Smooth Slow Fade-Off Breathing Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: [0.2, 0.85, 0.15, 0.8, 0.2],
                scale: [0.95, 1.05, 0.97, 1.04, 0.95],
                y: [0, -14, 4, -8, 0],
                x: [0, 8, -4, 6, 0],
              }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.7 } }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-10 -left-10 sm:top-10 sm:left-12 w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-[radial-gradient(circle_at_35%_35%,#38bdf8_0%,#0284c7_40%,#0369a1_65%,transparent_85%)] shadow-[0_0_90px_rgba(56,189,248,0.45)] blur-sm"
            />

            {/* Cyan highlight bloom behind top-left card corner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.35, 0.1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-16 left-28 w-44 h-44 bg-cyan-400/25 rounded-full blur-3xl"
            />

            {/* Ambient Cyan/Blue Light Filament Wave (Left) */}
            <motion.svg
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.15, 0.4, 0.15] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-16 top-1/4 w-[380px] h-[380px] text-cyan-400"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M -50 350 C 80 320, 160 220, 210 120 C 240 60, 310 10, 380 0"
                stroke="url(#cyanGradient)"
                strokeWidth="2.5"
              />
              <path
                d="M -60 380 C 70 340, 140 240, 200 140 C 230 80, 290 30, 360 10"
                stroke="url(#cyanGradient)"
                strokeWidth="1.5"
                opacity="0.6"
              />
              <path
                d="M -70 410 C 60 360, 120 260, 190 160 C 220 100, 270 50, 340 20"
                stroke="url(#cyanGradient)"
                strokeWidth="1"
                opacity="0.4"
              />
              <defs>
                <linearGradient id="cyanGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </motion.svg>

            {/* Bottom-Left Small Glowing Purple Sphere */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0.2, 0.85, 0.15, 0.75, 0.2],
                scale: [0.95, 1.1, 0.95],
                y: [0, -8, 0],
              }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.5 } }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
              className="absolute bottom-12 left-8 sm:bottom-16 sm:left-24 w-14 h-14 rounded-full bg-[radial-gradient(circle_at_32%_32%,#e879f9_0%,#c084fc_40%,#9333ea_70%,transparent_90%)] shadow-[0_0_35px_rgba(192,132,252,0.6)] blur-[0.5px]"
            />

            {/* Bottom-Right Large Glowing Purple/Magenta Sphere */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: [0.15, 0.85, 0.2, 0.8, 0.15],
                scale: [0.95, 1.05, 0.96, 1.06, 0.95],
                y: [0, 12, -6, 10, 0],
                x: [0, -10, 4, -8, 0],
              }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.7 } }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
              className="absolute -bottom-8 -right-8 sm:bottom-10 sm:right-12 w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-[radial-gradient(circle_at_32%_32%,#f472b6_0%,#d946ef_35%,#a855f7_65%,transparent_85%)] shadow-[0_0_100px_rgba(217,70,239,0.5)] blur-sm"
            />

            {/* Soft purple diffuse background glow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.35, 0.1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-16 right-20 w-60 h-60 bg-purple-600/20 rounded-full blur-3xl"
            />
          </div>

          {/* ════ Modal Container (Image 2 style) ════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24, filter: 'blur(16px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.94, y: 15, filter: 'blur(10px)' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 28,
              mass: 0.9,
            }}
            className="relative z-10 w-full max-w-[940px] max-h-[92vh] overflow-y-auto rounded-[30px] border border-blue-500/30 shadow-[0_0_70px_rgba(14,165,233,0.18),0_30px_100px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.12)] bg-[#080d1a]/95 backdrop-blur-3xl font-glass"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255,255,255,0.1) transparent',
            }}
          >
            {/* Top perimeter neon glow line */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent rounded-t-[30px]" />
            {/* Bottom perimeter subtle purple glow line */}
            <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent rounded-b-[30px]" />

            {/* Close Button (Top-Right Circular Pill) */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-30 w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/[0.14] hover:border-white/30 flex items-center justify-center text-zinc-300 hover:text-white transition-all duration-200 cursor-pointer group shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
              aria-label="Close profile"
            >
              <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Two-Panel Layout with Inset Glass Card for Left Panel */}
            <div className="flex flex-col md:flex-row p-3 sm:p-4 md:p-5 gap-3.5 md:gap-4 items-stretch">
              {/* ═══════════════════ LEFT PANEL: Inset Glass Card ═══════════════════ */}
              <motion.div
                variants={staggerChildren}
                initial="initial"
                animate="animate"
                className="relative md:w-[340px] lg:w-[360px] shrink-0 p-5 sm:p-6 flex flex-col items-center text-center rounded-[24px] bg-[#0c1527]/80 border border-cyan-500/25 shadow-[0_0_35px_rgba(6,182,212,0.1),inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-xl"
              >
                {/* Subtle cyan gradient sheen at the top of left card */}
                <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-cyan-500/[0.08] to-transparent rounded-t-[24px] pointer-events-none" />

                {/* Profile Photo with Cyan-to-Magenta Neon Gradient Border */}
                <motion.div variants={fadeUp} className="relative z-10 mb-4">
                  <div className="relative p-[2.5px] rounded-[22px] bg-gradient-to-br from-cyan-400 via-blue-500 to-fuchsia-500 shadow-[0_0_30px_rgba(6,182,212,0.35),0_0_45px_rgba(217,70,239,0.25)]">
                    <div className="relative w-44 h-50 sm:w-48 sm:h-54 rounded-[20px] overflow-hidden bg-[#070d18] group">
                      <Image
                        src="/profile.jpeg"
                        alt="Pranav Singh"
                        width={200}
                        height={240}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        priority
                      />
                      {/* Bottom shade overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a]/50 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Available Badge (Glow Pill) */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#07191d]/90 border border-emerald-400/50 shadow-[0_0_18px_rgba(16,185,129,0.35)] backdrop-blur-md">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                    </span>
                    <span className="text-[11px] font-bold tracking-wider text-emerald-300 uppercase whitespace-nowrap font-glass">
                      Available
                    </span>
                  </div>
                </motion.div>

                {/* Bio Quote with Cyan Quotation Marks */}
                <motion.div variants={fadeUp} className="relative px-2 mt-2 mb-3.5">
                  <p className="text-[12.5px] italic leading-relaxed font-glass">
                    <span className="text-cyan-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.7)] font-bold text-base select-none mr-1.5">“</span>
                    <span className="glass-text-muted">Building modern web applications and AI-powered products.</span>
                    <span className="text-cyan-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.7)] font-bold text-base select-none ml-1.5">”</span>
                  </p>
                </motion.div>

                {/* Stats Pills (6 Months Exp. & 6+ Projects) */}
                <motion.div variants={fadeUp} className="w-full flex items-center gap-2.5 mb-3.5">
                  <div className="flex-1 flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500/25 to-indigo-500/20 flex items-center justify-center shrink-0">
                      <Rocket className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <div className="text-left">
                      <span className="glass-stat-num text-sm font-black leading-none block font-glass">6</span>
                      <span className="text-[9.5px] text-zinc-400 font-medium tracking-wide uppercase font-glass">Months Exp.</span>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500/25 to-blue-500/20 flex items-center justify-center shrink-0">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <div className="text-left">
                      <span className="glass-stat-num text-sm font-black leading-none block font-glass">6+</span>
                      <span className="text-[9.5px] text-zinc-400 font-medium tracking-wide uppercase font-glass">Projects</span>
                    </div>
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div variants={fadeUp} className="w-full space-y-2">
                  {/* Let's Connect: Electric Blue to Purple Gradient */}
                  <button
                    onClick={scrollToContact}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#0099ff] via-[#3b82f6] to-[#9333ea] hover:from-[#0088ee] hover:via-[#2563eb] hover:to-[#7e22ce] text-white text-xs sm:text-sm font-bold tracking-wide shadow-[0_4px_25px_rgba(37,99,235,0.45),0_0_35px_rgba(147,51,234,0.3)] hover:shadow-[0_6px_30px_rgba(37,99,235,0.6)] transition-all duration-300 cursor-pointer transform-gpu hover:scale-[1.02] active:scale-[0.98] font-glass"
                  >
                    <Send className="w-4 h-4" />
                    <span>Let&apos;s Connect</span>
                  </button>

                  {/* Download Resume: Dark Translucent Glass (Image 2 style) */}
                  <a
                    href={personalInfo.cvUrl}
                    download
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] hover:border-white/25 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-[0_2px_12px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer transform-gpu hover:scale-[1.02] active:scale-[0.98] font-glass"
                  >
                    <Download className="w-4 h-4 text-zinc-300" />
                    <span>Download Resume</span>
                  </a>
                </motion.div>

                {/* Open to opportunities */}
                <motion.div variants={fadeUp} className="flex items-center gap-2 mt-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span className="text-[11px] font-semibold text-emerald-400/90 tracking-wide font-glass">
                    Open to opportunities
                  </span>
                </motion.div>
              </motion.div>

              {/* ═══════════════════ RIGHT PANEL: Name, Socials, Contact ═══════════════════ */}
              <motion.div
                variants={staggerChildren}
                initial="initial"
                animate="animate"
                className="flex-1 p-2.5 sm:p-4 md:p-5 flex flex-col justify-between"
              >
                <div>
                  {/* Role Badge (Glowing Cyan Pill with Glass Typography) */}
                  <motion.div variants={fadeUp}>
                    <span className="glass-badge-text inline-flex items-center px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/35 text-[10.5px] font-bold uppercase shadow-[0_0_15px_rgba(6,182,212,0.15)] font-glass">
                      {personalInfo.role}
                    </span>
                  </motion.div>

                  {/* Name with Liquid Glass Typography + Signature */}
                  <motion.div variants={fadeUp} className="flex items-center justify-between mt-3 mb-1.5">
                    <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight leading-tight font-glass">
                      <span className="glass-text-white">{personalInfo.shortName}</span>{' '}
                      <span className="glass-text-cyan">Singh</span>
                    </h2>
                    {/* Glowing cursive signature (Image 2 style) */}
                    <span
                      className="font-signature text-3xl sm:text-4xl -rotate-6 text-cyan-200/55 select-none pointer-events-none drop-shadow-[0_0_14px_rgba(6,182,212,0.55)] pr-3 sm:pr-6 tracking-wide"
                      aria-hidden="true"
                    >
                      {personalInfo.shortName}
                    </span>
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    variants={fadeUp}
                    className="text-[13px] text-zinc-300/85 leading-relaxed max-w-lg mb-3.5 font-glass"
                  >
                    {personalInfo.positioningStatement}
                  </motion.p>
                </div>

                {/* Contact / Social Cards with Glass Typography */}
                <motion.div variants={staggerChildren} className="space-y-2">
                  {contactCards.map((card) => {
                    const IconComp = card.icon;
                    const isCopiedEmail = card.actionType === 'copy-email' && copiedEmail;
                    const isCopiedPhone = card.actionType === 'copy-phone' && copiedPhone;
                    const isCopied = isCopiedEmail || isCopiedPhone;

                    return (
                      <motion.div
                        key={card.label}
                        variants={fadeUp}
                        className="group flex items-center justify-between gap-3 px-4 sm:px-4.5 py-2.5 sm:py-3 rounded-2xl bg-[#0c1425]/75 hover:bg-[#111c34]/90 border border-white/[0.07] hover:border-cyan-500/30 shadow-[0_2px_10px_rgba(0,0,0,0.2)] transition-all duration-200 cursor-default"
                      >
                        {/* Left: Icon + Label & Detail */}
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-xl ${card.iconBg} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105`}
                          >
                            <IconComp className={`w-4.5 h-4.5 ${card.iconColor}`} />
                          </div>

                          <div className="min-w-0">
                            <span className="glass-card-title text-[10.5px] font-bold uppercase tracking-[0.16em] block leading-tight font-glass">
                              {card.label}
                            </span>
                            <span className="text-xs text-zinc-400 group-hover:text-zinc-200 block truncate mt-0.5 transition-colors font-glass font-normal">
                              {card.detail}
                            </span>
                          </div>
                        </div>

                        {/* Right: Rounded Pill Action Button */}
                        {card.actionType === 'link' ? (
                          <a
                            href={card.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.1] hover:border-white/20 text-xs font-semibold text-zinc-300 hover:text-white transition-all duration-200 shrink-0 font-glass"
                          >
                            <span>{card.action}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <button
                            onClick={() =>
                              copyToClipboard(
                                card.actionType === 'copy-email'
                                  ? personalInfo.email
                                  : personalInfo.phone,
                                card.actionType === 'copy-email' ? 'email' : 'phone'
                              )
                            }
                            className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.1] hover:border-white/20 text-xs font-semibold text-zinc-300 hover:text-white transition-all duration-200 shrink-0 cursor-pointer font-glass"
                          >
                            <span>{isCopied ? 'Copied!' : card.action}</span>
                            {isCopied ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
