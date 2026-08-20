'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  Printer,
  Copy,
  Check,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { resumeData, personalInfo, certificatesData } from '@/data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

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

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
PRANAV SINGH
Full Stack Developer
${personalInfo.email} | ${personalInfo.phone} | https://${resumeData.contact.linkedin} | https://${resumeData.contact.github}

TECHNICAL SKILLS
Languages: ${resumeData.technicalSkills.languages}
Frontend: ${resumeData.technicalSkills.frontend}
Backend & Databases: ${resumeData.technicalSkills.backendDatabases}
AI & Tooling: ${resumeData.technicalSkills.aiTooling}

EXPERIENCE & INTERNSHIPS
${resumeData.experience
  .map(
    (exp) => `
${exp.role} — ${exp.company} (${exp.period}) | ${exp.location}
Official Site: ${exp.officialUrl} | Dev Staging: ${exp.devUrl}
${exp.bullets.map((b) => `• ${b}`).join('\n')}
`
  )
  .join('\n')}

PROJECTS
${resumeData.projects
  .map(
    (p) => `
${p.name}
${p.tech}
${p.liveDemo ? `Live Demo: ${p.liveDemo} | ` : ''}GitHub: ${p.github}
${p.bullets.map((b) => `• ${b}`).join('\n')}
`
  )
  .join('\n')}

EDUCATION
${resumeData.education.institution}
${resumeData.education.degree}

CERTIFICATES, WORKSHOPS & CREDENTIALS
${certificatesData.map((c) => `• ${c.title} — ${c.issuer} (${c.issueDate})${c.credentialId ? ` [ID: ${c.credentialId}]` : ''}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 lg:p-10 overflow-y-auto overscroll-contain print:p-0 print:static">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity print:hidden cursor-pointer"
            onClick={onClose}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl liquid-glass border border-white/20 shadow-2xl p-6 sm:p-10 space-y-6 z-10 print:max-w-none print:max-h-none print:shadow-none print:border-none print:bg-white print:text-black my-auto"
          >
            {/* Top Controls Bar (Hidden during print) */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 print:hidden">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500/30 to-cyan-400/30 border border-white/20 flex items-center justify-center text-cyan-300">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Curriculum Vitae</h3>
                  <p className="text-xs font-mono text-zinc-400">Pranav Singh • Official CV</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Direct PDF Download */}
                <a
                  href="/CV.pdf"
                  download="Pranav_Singh_CV.pdf"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 shadow-md transition-all cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>

                {/* View Raw PDF in Tab */}
                <a
                  href="/CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-200 liquid-glow-pill hover:text-white transition-all cursor-pointer whitespace-nowrap"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">Open PDF</span>
                </a>

                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-200 liquid-glow-pill hover:text-white transition-all cursor-pointer"
                  title="Print CV"
                >
                  <Printer className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">Print</span>
                </button>

                <button
                  onClick={handleCopyText}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-200 liquid-glow-pill hover:text-white transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-purple-400" />
                      <span className="hidden sm:inline">Copy Text</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onClose}
                  aria-label="Close resume modal"
                  className="w-8 h-8 rounded-full liquid-glow-pill flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Printable & Interactive Resume Document (1:1 with CV.pdf) */}
            <div className="space-y-6 text-zinc-300 print:text-zinc-900 font-sans bg-white/[0.01] p-6 rounded-2xl border border-white/5 print:border-none print:p-0">
              {/* Header */}
              <div className="text-center space-y-1.5 border-b border-white/10 print:border-zinc-300 pb-5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white print:text-black tracking-tight uppercase">
                  {resumeData.name}
                </h1>
                <p className="text-sm font-semibold text-cyan-400 print:text-zinc-700">
                  {resumeData.title}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-zinc-400 print:text-zinc-600 pt-1">
                  <a href={`mailto:${resumeData.contact.email}`} className="hover:text-cyan-300">
                    {resumeData.contact.email}
                  </a>
                  <span>|</span>
                  <span>{resumeData.contact.phone}</span>
                  <span>|</span>
                  <a
                    href={`https://${resumeData.contact.linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-cyan-300 underline"
                  >
                    {resumeData.contact.linkedin}
                  </a>
                  <span>|</span>
                  <a
                    href={`https://${resumeData.contact.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-cyan-300 underline"
                  >
                    {resumeData.contact.github}
                  </a>
                </div>
              </div>

              {/* Technical Skills */}
              <div className="space-y-2 border-b border-white/10 print:border-zinc-300 pb-4">
                <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-zinc-900 font-bold border-b border-white/5 pb-1">
                  TECHNICAL SKILLS
                </h2>
                <div className="space-y-1 text-xs text-zinc-300 print:text-zinc-800 leading-relaxed">
                  <p>
                    <strong className="text-white print:text-black">Languages:</strong> {resumeData.technicalSkills.languages}
                  </p>
                  <p>
                    <strong className="text-white print:text-black">Frontend:</strong> {resumeData.technicalSkills.frontend}
                  </p>
                  <p>
                    <strong className="text-white print:text-black">Backend & Databases:</strong> {resumeData.technicalSkills.backendDatabases}
                  </p>
                  <p>
                    <strong className="text-white print:text-black">AI & Tooling:</strong> {resumeData.technicalSkills.aiTooling}
                  </p>
                </div>
              </div>

              {/* Experience & Internships */}
              <div className="space-y-4 border-b border-white/10 print:border-zinc-300 pb-5">
                <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-zinc-900 font-bold border-b border-white/5 pb-1">
                  WORK EXPERIENCE & INTERNSHIPS
                </h2>

                <div className="space-y-4">
                  {resumeData.experience.map((exp, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <h3 className="text-xs sm:text-sm font-bold text-white print:text-black">
                          {exp.role} <span className="text-cyan-400 font-normal">@ {exp.company}</span>
                        </h3>
                        <span className="text-[11px] font-mono text-zinc-400 print:text-zinc-600 font-medium">
                          {exp.period} | {exp.location}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3 text-[11px] font-mono text-cyan-400 print:text-zinc-600">
                        {exp.officialUrl && (
                          <a href={exp.officialUrl} target="_blank" rel="noreferrer" className="underline hover:text-cyan-300">
                            Official Site: {exp.officialUrl}
                          </a>
                        )}
                        {exp.devUrl && (
                          <a href={exp.devUrl} target="_blank" rel="noreferrer" className="underline hover:text-cyan-300">
                            Dev Staging: {exp.devUrl}
                          </a>
                        )}
                      </div>
                      <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-zinc-300 print:text-zinc-800 leading-relaxed pt-0.5">
                        {exp.bullets.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-4 border-b border-white/10 print:border-zinc-300 pb-5">
                <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-zinc-900 font-bold border-b border-white/5 pb-1">
                  PROJECTS
                </h2>

                <div className="space-y-4">
                  {resumeData.projects.map((p, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <h3 className="text-xs sm:text-sm font-bold text-white print:text-black">
                          {p.name}
                        </h3>
                        {p.period && (
                          <span className="text-[11px] font-mono text-zinc-400 print:text-zinc-600 font-medium">
                            {p.period}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-mono text-purple-300 print:text-zinc-600 italic">
                        {p.tech}
                      </p>
                      <div className="flex flex-wrap gap-3 text-[11px] font-mono text-cyan-400 print:text-zinc-600">
                        {p.liveDemo && (
                          <a href={p.liveDemo} target="_blank" rel="noreferrer" className="underline hover:text-cyan-300">
                            Live Demo: {p.liveDemo}
                          </a>
                        )}
                        {p.github && (
                          <a href={p.github} target="_blank" rel="noreferrer" className="underline hover:text-cyan-300">
                            GitHub: {p.github}
                          </a>
                        )}
                      </div>
                      <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-zinc-300 print:text-zinc-800 leading-relaxed pt-0.5">
                        {p.bullets.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="space-y-2 border-b border-white/10 print:border-zinc-300 pb-4">
                <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-zinc-900 font-bold border-b border-white/5 pb-1">
                  EDUCATION
                </h2>
                <div className="space-y-0.5 text-xs text-zinc-300 print:text-zinc-800">
                  <p className="font-bold text-white print:text-black text-sm">
                    {resumeData.education.institution}
                  </p>
                  <p className="text-zinc-400 print:text-zinc-700">
                    {resumeData.education.degree}
                  </p>
                </div>
              </div>

              {/* Certificates, Workshops & Credentials */}
              <div className="space-y-2">
                <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-zinc-900 font-bold border-b border-white/5 pb-1">
                  VERIFIED CERTIFICATES, WORKSHOPS & CREDENTIALS
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300 print:text-zinc-800">
                  {certificatesData.map((c) => (
                    <div
                      key={c.id}
                      className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 print:border-zinc-200 space-y-0.5"
                    >
                      <p className="font-bold text-white print:text-black">{c.title}</p>
                      <p className="text-[11px] text-zinc-400 print:text-zinc-600">
                        {c.issuer} • <span className="text-cyan-400 print:text-zinc-800">{c.issueDate}</span>
                      </p>
                      {c.credentialId && (
                        <p className="text-[10px] font-mono text-zinc-500">ID: {c.credentialId}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-white/10 print:hidden">
              <a
                href="/CV.pdf"
                download="Pranav_Singh_CV.pdf"
                className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 shadow-md cursor-pointer flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Official CV (PDF)</span>
              </a>

              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-zinc-300 liquid-glow-pill hover:text-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
