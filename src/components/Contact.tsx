'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  Sparkles,
  Copy,
  Check,
  MessageSquare,
  ArrowRight,
  Clock,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/Icons';
import confetti from 'canvas-confetti';
import { personalInfo } from '@/data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate rapid async dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#06b6d4', '#6366f1', '#a855f7', '#10b981'],
        });
      } catch (err) {
        // ignore if not supported
      }

      // Reset after some time
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 5000);
    }, 800);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center space-y-3 mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glow-pill text-xs font-mono text-cyan-400">
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          <span className="liquid-glass-text block">Have a project or opportunity?</span>
          <span className="liquid-glass-text-cyan block mt-1">Let&apos;s build something great.</span>
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
          Whether you have an internship opportunity, a freelance project, or simply want to talk engineering—my inbox is always open.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Contact Info & Channels (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 space-y-5"
        >
          {/* Quick Info Card */}
          <div className="p-6 sm:p-8 rounded-3xl liquid-glass-card border border-white/10 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Direct Contact Channels</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Feel free to reach out directly via email or connect with me across professional networks.
              </p>
            </div>

            {/* Email & Phone Action Pills */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div>
                <span className="text-[11px] font-mono text-zinc-400">Email:</span>
                <div className="flex items-center justify-between gap-2 mt-1">
                  <span className="font-mono text-xs sm:text-sm text-cyan-300 font-semibold truncate">
                    {personalInfo.email}
                  </span>
                  <button
                    onClick={copyEmail}
                    className="px-3 py-1.5 rounded-xl liquid-glow-pill text-xs text-zinc-200 hover:text-white transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5">
                <span className="text-[11px] font-mono text-zinc-400">Phone:</span>
                <div className="flex items-center justify-between gap-2 mt-1">
                  <span className="font-mono text-xs sm:text-sm text-purple-300 font-semibold">
                    +91 {personalInfo.phone}
                  </span>
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="px-3 py-1.5 rounded-xl liquid-glow-pill text-xs text-zinc-200 hover:text-white transition-all shrink-0 cursor-pointer"
                  >
                    Call
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-2.5">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all text-xs font-medium text-zinc-300 hover:text-white group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-200 group-hover:scale-105 transition-transform">
                    <GitHubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">GitHub</p>
                    <p className="text-[11px] text-zinc-400 font-mono">@{personalInfo.githubUsername}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all text-xs font-medium text-zinc-300 hover:text-white group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                    <LinkedInIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">LinkedIn</p>
                    <p className="text-[11px] text-zinc-400 font-mono">Connect with Pranav</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </a>
            </div>

            {/* Availability Badges */}
            <div className="pt-2 border-t border-white/10 space-y-2 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Response Time: Usually &lt; 12 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>Location: India (Remote Global)</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Liquid Glass Contact Form (7 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <div className="p-6 sm:p-8 rounded-3xl liquid-glass border border-white/15 shadow-2xl space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>Send a Message</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400">
                Fill out the quick details below and I&apos;ll get back to you promptly.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Message Sent Successfully!</h4>
                <p className="text-xs text-zinc-300 max-w-sm mx-auto">
                  Thank you for reaching out, {formData.name || 'there'}. I have received your message and will respond shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-cyan-400/50 focus:bg-white/[0.06] text-white text-xs sm:text-sm placeholder-zinc-500 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-cyan-400/50 focus:bg-white/[0.06] text-white text-xs sm:text-sm placeholder-zinc-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Subject / Purpose */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Topic / Subject</label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Job Opportunity / Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-cyan-400/50 focus:bg-white/[0.06] text-white text-xs sm:text-sm placeholder-zinc-500 focus:outline-none transition-all"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project, timeline, or open role..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-cyan-400/50 focus:bg-white/[0.06] text-white text-xs sm:text-sm placeholder-zinc-500 focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Button in Pure Liquid Glass */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl text-xs sm:text-sm font-extrabold tracking-wider uppercase text-white bg-gradient-to-b from-[#2e3c5e]/90 via-[#1a233b]/95 to-[#0b1020] border border-cyan-400/40 shadow-[0_10px_35px_rgba(0,0,0,0.8),inset_0_1.5px_1.5px_rgba(255,255,255,0.4),0_0_20px_rgba(6,182,212,0.25)] hover:border-cyan-300 hover:shadow-[0_0_35px_rgba(6,182,212,0.6),inset_0_1.5px_1.5px_rgba(255,255,255,0.6)] backdrop-blur-2xl transition-all cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-50 group"
                >
                  {isSubmitting ? (
                    <span>Transmitting Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-cyan-300 group-hover:translate-x-0.5 transition-transform" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
