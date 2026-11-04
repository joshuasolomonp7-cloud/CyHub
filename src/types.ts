export type RoleType = 'consultant' | 'tutor' | 'dev';

export type Specialization = 
  | 'Penetration Testing'
  | 'Compliance/ISO27001'
  | 'Phishing Defense'
  | 'Network Hardening'
  | 'Python Tooling'
  | 'Cloud Security'
  | 'AppSec/OWASP'
  | 'Incident Response';

export interface ServicePackage {
  id: string;
  title: string;
  price: number;
  deliveryTime: string;
  description: string;
  features: string[];
}

export interface Review {
  id: string;
  author: string;
  clientType: 'Small Business' | 'Student / Mentee' | 'Enterprise';
  rating: number;
  date: string;
  comment: string;
}

export interface Expert {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  title: string;
  bio: string;
  verified: boolean;
  rating: number;
  reviewsCount: number;
  hourlyRate: number;
  roles: RoleType[];
  specializations: Specialization[];
  certifications: string[];
  location: string;
  timezone: string;
  responseTime: string;
  completedAudits: number;
  tutoringHours: number;
  toolsBuilt: number;
  packages: ServicePackage[];
  reviews: Review[];
  githubUrl?: string;
  linkedinUrl?: string;
  isAvailableToday: boolean;
  featuredQuote?: string;
}

export interface IntakeWizardData {
  businessType: string;
  immediateNeed: string;
  budgetTier: string;
  timeline: string;
  companyName: string;
  email: string;
  additionalNotes: string;
}

export interface FreelancerRegistrationData {
  fullName: string;
  handle: string;
  title: string;
  hourlyRate: number;
  bio: string;
  location: string;
  services: {
    consultations: boolean;
    tutoring: boolean;
    tooling: boolean;
  };
  primarySpecialization: Specialization;
  certifications: string[];
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
}

export interface LabMission {
  id: string;
  title: string;
  category: 'Offensive Security' | 'Network Defense' | 'Cryptography' | 'Compliance';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  xpReward: number;
  description: string;
  objective: string;
  flag: string;
  hints: string[];
  defaultTerminalOutput: string[];
}

export type UserPersona = 'client' | 'learner' | 'freelancer' | 'guest';

export interface ActiveUser {
  persona: UserPersona;
  name: string;
  companyOrRole: string;
  avatar: string;
  badge: string;
}
