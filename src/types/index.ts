export type AccentTheme = 'cyan' | 'violet' | 'emerald' | 'amber';

export interface ProjectStats {
  label: string;
  value: string;
}

export interface ArchitectureStep {
  layer: string;
  title: string;
  desc: string;
  tech: string;
}

export interface ChallengeItem {
  title: string;
  solution: string;
}

export interface ProjectCaseStudy {
  problem: string;
  solution: string;
  architectureSteps: ArchitectureStep[];
  challenges: ChallengeItem[];
  results: string[];
  metrics: { label: string; value: string; trend?: string }[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'AI & Full-Stack' | 'Web Apps & UI' | 'Systems & APIs' | 'Experimental';
  description: string;
  tags: string[];
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  highlights: string[];
  stats?: ProjectStats[];
  caseStudy: ProjectCaseStudy;
}

export interface SkillItem {
  name: string;
  level: number;
  highlight?: boolean;
  iconName?: string;
  experience?: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  type: 'Internship' | 'Freelance' | 'Hackathon' | 'Community' | 'Open Source';
  description: string[];
  skills: string[];
  badge: string;
  links?: {
    label: string;
    url: string;
    type?: 'live' | 'dev' | 'github';
  }[];
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  period: string;
  location: string;
  grade?: string;
  highlights: string[];
  coursework: string[];
}

export interface AchievementItem {
  title: string;
  issuer: string;
  year: string;
  type: 'Award' | 'Certification' | 'Hackathon' | 'Milestone';
  description: string;
  badge: string;
}

export interface DeveloperStat {
  icon: string;
  label: string;
  value: string;
  detail: string;
  color: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  collaborator?: string;
  issuerCategory:
    | 'Infosys'
    | 'iamneo'
    | 'CipherSchools'
    | 'Tech Veda'
    | 'IIIT Allahabad'
    | 'Academic'
    | 'Industry'
    | string;
  issueDate: string;
  period?: string;
  credentialId?: string;
  verificationUrl?: string;
  pdfUrl: string;
  previewImage: string;
  category:
    | 'Full-Stack & Web'
    | 'Workshops & AI'
    | 'Languages & OOP'
    | 'Data Structures & Algorithms'
    | 'Databases & Systems'
    | string;
  skills: string[];
  description: string;
  signatory?: string;
  hours?: string;
  type?: 'Certification' | 'Workshop' | 'MOOC';
}
