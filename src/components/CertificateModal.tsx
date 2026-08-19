'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Award,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Copy,
  Check,
  ShieldCheck,
  Building2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { CertificateItem } from '@/types';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  allCertificates: CertificateItem[];
  onClose: () => void;
  onSelectCertificate: (cert: CertificateItem) => void;
}

export default function CertificateModal({
  certificate,
  allCertificates,
  onClose,
  onSelectCertificate,
}: CertificateModalProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<boolean>(false);
  const [prevCertId, setPrevCertId] = useState<string | undefined>(certificate?.id);

  if (certificate?.id !== prevCertId) {
    setPrevCertId(certificate?.id);
    setZoomLevel(1);
    setCopiedId(false);
  }

  const currentIndex = certificate
    ? allCertificates.findIndex((c) => c.id === certificate.id)
    : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onSelectCertificate(allCertificates[currentIndex - 1]);
    } else if (allCertificates.length > 0) {
      onSelectCertificate(allCertificates[allCertificates.length - 1]);
    }
  }, [currentIndex, allCertificates, onSelectCertificate]);

  const handleNext = useCallback(() => {
    if (currentIndex >= 0 && currentIndex < allCertificates.length - 1) {
      onSelectCertificate(allCertificates[currentIndex + 1]);
    } else if (allCertificates.length > 0) {
      onSelectCertificate(allCertificates[0]);
    }
  }, [currentIndex, allCertificates, onSelectCertificate]);

  // Scroll lock and keyboard navigation
  useEffect(() => {
    if (certificate) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
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
  }, [certificate, onClose, handlePrev, handleNext]);

  const handleCopyId = (idText: string) => {
    navigator.clipboard.writeText(idText);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  };

  const handleZoomReset = () => {
    setZoomLevel(1);
  };

  return (
    <AnimatePresence>
      {certificate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 overflow-y-auto overscroll-contain">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#030712]/95 backdrop-blur-xl transition-opacity cursor-pointer"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto overscroll-contain rounded-3xl bg-[#080d1a] border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.95)] p-4 sm:p-6 md:p-8 space-y-6 z-20 my-auto transform-gpu"
          >
            {/* Top Glowing Ambient Edge */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-cyan-400 to-purple-500" />

            {/* Header Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-500/20 via-purple-500/20 to-cyan-500/20 border border-white/15 flex items-center justify-center text-amber-300 shadow-sm">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> VERIFIED CREDENTIAL
                    </span>
                    <span className="text-zinc-500">•</span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {currentIndex + 1} of {allCertificates.length}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white truncate max-w-md sm:max-w-xl">
                    {certificate.title}
                  </h3>
                </div>
              </div>

              {/* Navigation & Close */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous certificate"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full liquid-glow-pill flex items-center justify-center text-zinc-300 hover:text-white hover:border-cyan-400/40 transition-all cursor-pointer"
                  title="Previous (Left Arrow)"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={handleNext}
                  aria-label="Next certificate"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full liquid-glow-pill flex items-center justify-center text-zinc-300 hover:text-white hover:border-cyan-400/40 transition-all cursor-pointer"
                  title="Next (Right Arrow)"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <div className="h-5 w-[1px] bg-white/15 mx-1" />

                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full liquid-glow-pill flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/40 transition-all cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Main Content Layout: Grid with Left Image Viewer + Right Metadata Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Visual Preview with Zoom Controls */}
              <div className="lg:col-span-7 flex flex-col items-center space-y-3">
                <div className="relative w-full rounded-2xl overflow-hidden bg-black/60 border border-white/10 p-2 sm:p-3 shadow-inner flex items-center justify-center min-h-[260px] sm:min-h-[380px]">
                  {/* Floating Zoom Controls Bar */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-black/70 border border-white/15 backdrop-blur-md shadow-lg">
                    <button
                      onClick={handleZoomIn}
                      aria-label="Zoom in"
                      className="p-1.5 text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleZoomOut}
                      aria-label="Zoom out"
                      className="p-1.5 text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    {zoomLevel !== 1 && (
                      <button
                        onClick={handleZoomReset}
                        aria-label="Reset zoom"
                        className="p-1.5 text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                        title="Reset Zoom"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <span className="text-[10px] font-mono text-cyan-300 px-1.5">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                  </div>

                  {/* Certificate Image */}
                  <div
                    className="relative w-full transition-transform duration-200 origin-center flex items-center justify-center"
                    style={{ transform: `scale(${zoomLevel})` }}
                  >
                    <Image
                      src={certificate.previewImage}
                      alt={certificate.title}
                      width={1000}
                      height={700}
                      className="w-full h-auto rounded-xl object-contain shadow-2xl border border-white/10"
                      priority
                    />
                  </div>
                </div>

                <p className="text-[11px] font-mono text-zinc-400 text-center flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>High-resolution rasterization of official PDF certificate</span>
                </p>
              </div>

              {/* Right Column: Metadata & Credential Attributes */}
              <div className="lg:col-span-5 space-y-4">
                {/* Issuer & Authority Card */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" /> Issuing Body
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                        certificate.issuerCategory === 'Infosys'
                          ? 'bg-blue-500/15 text-blue-300 border-blue-400/30'
                          : certificate.issuerCategory === 'CipherSchools'
                          ? 'bg-indigo-500/15 text-indigo-300 border-indigo-400/30'
                          : 'bg-orange-500/15 text-orange-300 border-orange-400/30'
                      }`}
                    >
                      {certificate.issuerCategory}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white leading-snug">
                      {certificate.issuer}
                    </h4>
                    {certificate.collaborator && (
                      <p className="text-xs text-zinc-400 mt-0.5">
                        In collaboration with <span className="text-zinc-200">{certificate.collaborator}</span>
                      </p>
                    )}
                  </div>

                  {certificate.signatory && (
                    <div className="pt-2 border-t border-white/5 text-xs text-zinc-300">
                      <span className="text-zinc-500 font-mono text-[10px] uppercase block">
                        Authorized Signatory
                      </span>
                      <span className="text-zinc-300">{certificate.signatory}</span>
                    </div>
                  )}
                </div>

                {/* Timeline & Course Details */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-purple-400" /> Issue Date
                    </span>
                    <p className="text-xs font-bold text-zinc-200">{certificate.issueDate}</p>
                  </div>

                  {certificate.hours ? (
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" /> Duration
                      </span>
                      <p className="text-xs font-bold text-cyan-300">{certificate.hours}</p>
                    </div>
                  ) : certificate.period ? (
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" /> Program Period
                      </span>
                      <p className="text-[11px] font-bold text-zinc-200 leading-tight">
                        {certificate.period}
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                        <Award className="w-3 h-3 text-amber-400" /> Status
                      </span>
                      <p className="text-xs font-bold text-emerald-400">Completed & Verified</p>
                    </div>
                  )}
                </div>

                {/* Credential ID / Verification */}
                {certificate.credentialId && (
                  <div className="p-3.5 rounded-2xl bg-indigo-500/[0.04] border border-indigo-500/20 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-300">
                        Certificate Credential ID
                      </span>
                      <button
                        onClick={() => handleCopyId(certificate.credentialId || '')}
                        className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                      >
                        {copiedId ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy ID</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs font-mono font-bold text-zinc-100 break-all select-all">
                      {certificate.credentialId}
                    </p>
                  </div>
                )}

                {/* Description */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                    Course Scope & Competency
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed bg-white/[0.01] p-3 rounded-xl border border-white/5">
                    {certificate.description}
                  </p>
                </div>

                {/* Skills Chips */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                    Validated Technical Skills
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {certificate.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.04] text-zinc-200 border border-white/10"
                      >
                        <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2.5">
                  <a
                    href={certificate.pdfUrl}
                    download={`Pranav_Singh_${certificate.title.replace(/\s+/g, '_')}.pdf`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:from-indigo-600 hover:via-purple-600 hover:to-cyan-600 shadow-md hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>

                  <a
                    href={certificate.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-zinc-200 liquid-glow-pill hover:text-white transition-all cursor-pointer whitespace-nowrap"
                    title="Open original PDF in new tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Open PDF</span>
                  </a>

                  {certificate.verificationUrl && (
                    <a
                      href={certificate.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-zinc-200 liquid-glow-pill hover:text-cyan-300 transition-all cursor-pointer whitespace-nowrap"
                      title="Verify at verify.onwingspan.com"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Verify ↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
