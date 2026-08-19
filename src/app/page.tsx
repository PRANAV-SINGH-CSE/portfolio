'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import BackgroundMesh from '@/components/BackgroundMesh';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Certificates from '@/components/Certificates';
import GithubActivity from '@/components/GithubActivity';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ResumeModal from '@/components/ResumeModal';
import CaseStudyModal from '@/components/CaseStudyModal';
import CertificateModal from '@/components/CertificateModal';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import ScrollToTop from '@/components/ScrollToTop';
import GamingCursor from '@/components/GamingCursor';
import IntroSplash from '@/components/IntroSplash';
import { Project, CertificateItem } from '@/types';
import { certificatesData } from '@/data/portfolioData';

export default function Home() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [isIntroDone, setIsIntroDone] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);

  const isModalOpen = Boolean(isResumeOpen || selectedProject || selectedCertificate || showIntro);

  // Ensure page starts from top (0, 0)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, []);

  // Section observer to update active nav link
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'certificates', 'github', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleIntroComplete = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    setShowIntro(false);
    setIsIntroDone(true);
  };

  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    setIsIntroDone(false);
    setShowIntro(true);
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-zinc-100 selection:bg-purple-500/30 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Precision Gaming Cyber Reticle Cursor */}
      <GamingCursor />

      {/* Framer Motion Ultra-Smooth Spring Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Dynamic Liquid Mesh Ambient Background */}
      <BackgroundMesh />

      {/* Floating Glass Navigation (Hidden when modals open) */}
      <Navbar
        activeSection={activeSection}
        onOpenResume={() => setIsResumeOpen(true)}
        isHidden={isModalOpen}
        isIntroDone={isIntroDone}
      />

      {/* Intro Splash Calligraphy Typing Animation */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroSplash onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* Main Content Sections with Smooth Revealing Animation */}
      <motion.main
        initial={{ opacity: 0, y: 35, scale: 0.98, filter: 'blur(12px)' }}
        animate={
          isIntroDone
            ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
            : { opacity: 0, y: 35, scale: 0.98, filter: 'blur(12px)' }
        }
        transition={{
          duration: 0.85,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.05,
        }}
        className="relative z-10 flex flex-col transform-gpu will-change-[transform,opacity,filter]"
      >
        {/* 1. Hero Section */}
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          isIntroDone={isIntroDone}
        />

        {/* 2. About Me Section & Developer Stats */}
        <About />

        {/* 3. Skills & Tech Stack Section */}
        <Skills />

        {/* 4. Featured Projects */}
        <Projects onSelectProject={(project) => setSelectedProject(project)} />

        {/* 6. Experience & Activities Timeline */}
        <Experience />

        {/* 7. Education */}
        <Education />

        {/* 8. Verified Certifications & Credentials */}
        <Certificates onSelectCertificate={(cert) => setSelectedCertificate(cert)} />

        {/* 9. GitHub Activity & Live Code Metrics */}
        <GithubActivity />

        {/* 11. Contact Section */}
        <Contact />
      </motion.main>

      {/* 12. Footer */}
      <Footer
        onOpenResume={() => setIsResumeOpen(true)}
        onReplayIntro={handleReplayIntro}
      />

      {/* Floating Smooth Scroll-To-Top Button */}
      <ScrollToTop />

      {/* 5. Root Architectural Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Interactive Certificate Lightbox Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        allCertificates={certificatesData}
        onClose={() => setSelectedCertificate(null)}
        onSelectCertificate={(cert) => setSelectedCertificate(cert)}
      />

      {/* 10. Interactive Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
