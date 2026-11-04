import type { Expert, LabMission, ActiveUser } from '../types';

export type { ActiveUser };

/**
 * Verified Primary Empirical Research Findings (N=131)
 * Conducted across MSME owners, tech professionals, and students.
 */
export const SURVEY_DATA_N131 = {
  sampleSize: 131,
  marketReadiness: {
    percentage: 69.5,
    count: 91,
    title: 'Market Readiness',
    label: '69.5% Demand',
    detail: '91 of 131 respondents actively seek verified, on-demand cybersecurity support.'
  },
  exposureReality: {
    percentage: 65.6,
    count: 86,
    title: 'Exposure Reality',
    label: '65.6% Scammed / Compromised',
    detail: '86 of 131 respondents have suffered digital fraud, account theft, or phishing attacks.'
  },
  behavioralVulnerability: {
    percentage: 65.5,
    count: 86,
    title: 'Behavioral Vulnerability',
    label: '65.5% False Security Paradox',
    detail: 'High self-reported confidence undermined by unsafe password reuse and unverified credential handling.'
  },
  trustBottleneck: {
    percentage: 55.0,
    count: 72,
    title: 'Trust Deficit',
    label: '55.0% Trust Bottleneck',
    detail: 'Breach victims cite finding trustworthy, certified specialists as their hardest barrier.'
  },
  regulatoryContext: {
    act: 'Digital Personal Data Protection (DPDP) Act 2023',
    mandate: 'CERT-In 6-Hour Mandatory Cyber Incident Reporting Directive',
    penaltyNotice: 'Penalties up to ₹250 Crores for significant data fiduciaries failing to safeguard user data.'
  }
};

/**
 * Verified Indian Cybersecurity Specialists
 * Displaying verified credentials, INR (₹) rates, and escrow protection.
 */
export const INITIAL_EXPERTS: Expert[] = [
  {
    id: 'exp-1',
    name: 'Dr. Aris Thorne, CISSP',
    handle: '@aris_vciso',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    title: 'Virtual CISO & DPDP Compliance Auditor',
    bio: '12+ years in corporate information governance and risk advisory. Former enterprise security director helping Indian MSMEs and health-tech startups achieve DPDP Act 2023 readiness and ISO 27001 certification without $20k retainers.',
    verified: true,
    rating: 4.98,
    reviewsCount: 114,
    hourlyRate: 1499, // ₹1,499 per session
    roles: ['consultant', 'tutor'],
    specializations: ['Compliance/ISO27001', 'Incident Response', 'Cloud Security'],
    certifications: ['CISSP', 'DPDP Lead Auditor', 'CISM', 'ISO 27001 LA'],
    location: 'Bengaluru, Karnataka',
    timezone: 'IST (UTC+5:30)',
    responseTime: '< 25 min',
    completedAudits: 84,
    tutoringHours: 210,
    toolsBuilt: 16,
    isAvailableToday: true,
    featuredQuote: 'Compliance under the DPDP Act 2023 is not a box to tick—it is operational business survival.',
    packages: [
      {
        id: 'pkg-1-1',
        title: 'Fixed-Scope Security Starter Bundle',
        price: 2999,
        deliveryTime: '2 Days',
        description: 'Guided enterprise password manager rollout, 2FA/MFA hardware token policy, and fundamental MSME attack surface report.',
        features: [
          'Full Credential Hygiene & Password Manager Setup',
          'Enforced 2FA/MFA across Google Workspace / M365',
          'Executive MSME Security Posture Scorecard',
          '1-on-1 Strategy Debrief with Dr. Aris'
        ]
      },
      {
        id: 'pkg-1-2',
        title: 'DPDP Act 2023 & ISO 27001 Gap Analysis',
        price: 9999,
        deliveryTime: '5 Days',
        description: 'Comprehensive data fiduciary readiness audit, consent notice review, and Annex A control mapping.',
        features: [
          'Data Mapping & Fiduciary Obligation Checklist',
          'CERT-In 6-Hour Incident Notification Playbook',
          'Vendor Data Processing Agreement Review',
          'Board-Ready Compliance Gap Summary'
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Vikram Mehta',
        clientType: 'Small Business',
        rating: 5,
        date: '3 days ago',
        comment: 'Dr. Aris guided our Pune medical logistics platform through the DPDP Act compliance checklist. Clear, pragmatic, and saved us lakhs.'
      },
      {
        id: 'rev-2',
        author: 'Siddharth Rao',
        clientType: 'Student / Mentee',
        rating: 5,
        date: '2 weeks ago',
        comment: 'His CISSP domain breakdown and scenario questions gave me the structural mindset needed to pass on my first attempt.'
      }
    ],
    githubUrl: 'https://github.com/cyhub-experts/aris-governance',
    linkedinUrl: 'https://linkedin.com/in/aris-thorne'
  },
  {
    id: 'exp-2',
    name: 'Priya Sharma',
    handle: '@priya_appsec',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    title: 'Senior Penetration Tester & Web Security Analyst',
    bio: 'Offensive AppSec specialist with extensive bug bounty experience on HackerOne. Specializes in OWASP Top 10 vulnerabilities, API authentication flaws, and zero-day exposure reviews for fintech and e-commerce platforms.',
    verified: true,
    rating: 4.96,
    reviewsCount: 88,
    hourlyRate: 1200, // ₹1,200 per hr
    roles: ['consultant', 'dev'],
    specializations: ['Penetration Testing', 'AppSec/OWASP', 'Python Tooling'],
    certifications: ['OSCP', 'CRTO', 'CEH Practical', 'Burp Suite Certified'],
    location: 'Hyderabad, Telangana',
    timezone: 'IST (UTC+5:30)',
    responseTime: '< 30 min',
    completedAudits: 62,
    tutoringHours: 145,
    toolsBuilt: 24,
    isAvailableToday: true,
    featuredQuote: 'Code is only as secure as the assumptions you challenge before pushing to production.',
    packages: [
      {
        id: 'pkg-2-1',
        title: 'Web Application & REST API Penetration Test',
        price: 7499,
        deliveryTime: '3 Days',
        description: 'Comprehensive manual and automated vulnerability assessment targeting OWASP Top 10, IDORs, and logic bugs.',
        features: [
          'Manual Exploitation & Proof-of-Concept Verification',
          'CVSS v3.1 Risk Scoring for all Findings',
          'Direct Patch Recommendations for Engineering Team',
          'Free 30-Day Remediation Verification Retest'
        ]
      },
      {
        id: 'pkg-2-2',
        title: 'Micro-Triage: Critical API Security Audit',
        price: 2499,
        deliveryTime: '24 Hours',
        description: 'Rapid deep dive on payment gateway callbacks, OAuth tokens, and public endpoint sanitization.',
        features: [
          'JWT & Session Management Inspection',
          'Rate-Limiting & SQL Injection Verification',
          'Immediate Remediation Action Checklist'
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-3',
        author: 'Neha Deshmukh',
        clientType: 'Small Business',
        rating: 5,
        date: '5 days ago',
        comment: 'Priya detected a severe payment callback parameter tampering bug in our checkout flow within hours. Exceptional clarity.'
      }
    ],
    githubUrl: 'https://github.com/cyhub-experts/priya-security',
    linkedinUrl: 'https://linkedin.com/in/priya-sharma-sec'
  },
  {
    id: 'exp-3',
    name: 'Rajesh Kumar',
    handle: '@rajesh_network',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    title: 'Network Hardening & Firewall Specialist',
    bio: 'Former senior network security engineer for enterprise data centers. Expert in iptables, pfSense, AWS VPC security groups, and incident isolation for small business retail and manufacturing branches.',
    verified: true,
    rating: 4.93,
    reviewsCount: 71,
    hourlyRate: 850, // ₹850 per hr
    roles: ['consultant', 'tutor'],
    specializations: ['Network Hardening', 'Incident Response', 'Cloud Security'],
    certifications: ['CCNA Security', 'CompTIA Network+', 'AWS Security Specialty', 'NSE 4'],
    location: 'Pune, Maharashtra',
    timezone: 'IST (UTC+5:30)',
    responseTime: '< 45 min',
    completedAudits: 53,
    tutoringHours: 90,
    toolsBuilt: 11,
    isAvailableToday: false,
    featuredQuote: 'A closed port cannot be exploited. Strict perimeter control is your first line of defense.',
    packages: [
      {
        id: 'pkg-3-1',
        title: 'MSME Perimeter Lockdown & Port Hardening',
        price: 3999,
        deliveryTime: '2 Days',
        description: 'Comprehensive inspection of open inbound ports (RDP 3389, FTP 21, Telnet), router configs, and firewall rules.',
        features: [
          'External Nmap Perimeter Scan & Port Audit',
          'Secure WireGuard / OpenVPN Remote Access Setup',
          'Guest Wi-Fi Isolation & Segmented VLAN Rules',
          'CERT-In Guideline Alignment Report'
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-4',
        author: 'Gaurav Kulkarni',
        clientType: 'Small Business',
        rating: 5,
        date: '1 week ago',
        comment: 'Rajesh secured our manufacturing plant router and eliminated exposed RDP connections that were triggering ransomware alerts.'
      }
    ],
    linkedinUrl: 'https://linkedin.com/in/rajesh-kumar-cyber'
  },
  {
    id: 'exp-4',
    name: 'Ananya Sen',
    handle: '@ananya_mentor',
    avatar: 'https://images.unsplash.com/photo-1534751516642-a171ed28a1c8?w=400&auto=format&fit=crop&q=80',
    title: 'Practical CEH / CompTIA Security+ Tutor',
    bio: 'Dedicated cybersecurity educator and lab mentor. I guide computer science and engineering students through hands-on virtual labs, capture-the-flag (CTF) challenges, and practical certification preparation.',
    verified: true,
    rating: 4.99,
    reviewsCount: 132,
    hourlyRate: 499, // ₹499 per 30-min
    roles: ['tutor'],
    specializations: ['AppSec/OWASP', 'Penetration Testing', 'Phishing Defense'],
    certifications: ['CEH Practical', 'CompTIA Security+', 'eJPT', 'Junior Pentester'],
    location: 'New Delhi, NCR',
    timezone: 'IST (UTC+5:30)',
    responseTime: '< 15 min',
    completedAudits: 18,
    tutoringHours: 420,
    toolsBuilt: 8,
    isAvailableToday: true,
    featuredQuote: 'Security theory is worthless without hands-on lab muscle memory.',
    packages: [
      {
        id: 'pkg-4-1',
        title: '1-on-1 Hands-On Cyber Range Prep (3 Sessions)',
        price: 1499,
        deliveryTime: '1 Week',
        description: 'Guided walkthrough of real web injection payloads, Linux privilege escalation, and network reconnaissance.',
        features: [
          'Three 45-Minute Private Screen-Share Sessions',
          'SQLi & XSS Cheat Sheets and Lab Challenges',
          'Resume & Cybersecurity Portfolio Review',
          'Direct Telegram / Slack Mentor Support'
        ]
      },
      {
        id: 'pkg-4-2',
        title: '30-Minute Rapid Lab Triage / Bug Mentoring',
        price: 499,
        deliveryTime: 'Instant / Same Day',
        description: 'Get unstuck on a challenging CTF flag, college security assignment, or Burp Suite payload configuration.',
        features: [
          'Immediate 1-on-1 Debugging',
          'Payload Syntax Breakdown',
          'Practical Defensive Takeaways'
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-5',
        author: 'Arjun Nambiar',
        clientType: 'Student / Mentee',
        rating: 5,
        date: 'Yesterday',
        comment: 'Ananya helped me grasp SQL injection and authentication bypass in 30 minutes. Her patience and real lab examples were brilliant.'
      }
    ],
    githubUrl: 'https://github.com/cyhub-experts/ananya-labs',
    linkedinUrl: 'https://linkedin.com/in/ananya-sen-cyber'
  }
];

export const DEMO_PERSONAS: ActiveUser[] = [
  {
    persona: 'guest',
    name: 'Guest Evaluator',
    companyOrRole: 'Academic Project Review',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    badge: 'Evaluator'
  },
  {
    persona: 'client',
    name: 'Vikram Mehta',
    companyOrRole: 'Director @ Apex Health Logistics, Pune',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    badge: 'MSME Business Owner'
  },
  {
    persona: 'learner',
    name: 'Arjun Nambiar',
    companyOrRole: 'B.Tech CSE (Cyber Security) Student',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
    badge: 'Security Student'
  },
  {
    persona: 'freelancer',
    name: 'Dr. Aris Thorne, CISSP',
    companyOrRole: 'Virtual CISO & DPDP Auditor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    badge: 'Verified Specialist'
  }
];

export const PREPACKAGED_SOLUTIONS = [
  {
    id: 'sol-1',
    title: 'DPDP Act 2023 Compliance & Risk Audit',
    badge: 'Regulatory Mandate',
    turnaround: '48 Hours',
    price: 4999,
    target: 'Fintech, Healthtech, Retail MSMEs',
    recommendedNeed: 'DPDP Act 2023 Compliance & Audit',
    description: 'Gap analysis against Digital Personal Data Protection Act 2023 obligations and CERT-In reporting readiness.',
    deliverables: [
      'Executive risk score & liability matrix',
      'Data principal consent mechanism review',
      'Breach notification protocol checklist'
    ]
  },
  {
    id: 'sol-2',
    title: 'External Perimeter Hardening & Port Audit',
    badge: 'High Impact',
    turnaround: '24 Hours',
    price: 2999,
    target: 'Offices with exposed IP / VPNs',
    recommendedNeed: 'Perimeter Hardening & Firewall',
    description: 'Comprehensive port analysis identifying vulnerable RDP 3389, FTP, and remote desktop services.',
    deliverables: [
      'Nmap full port range reconnaissance',
      'Firewall rule optimization recommendations',
      'Encrypted WireGuard VPN transition guide'
    ]
  }
];

export const LAB_MISSIONS = [
  {
    id: 'mission-phish',
    title: 'Phishing Header & Spoof Triage',
    category: 'Network Defense' as const,
    difficulty: 'Beginner' as const,
    xpReward: 100,
    description: 'Inspect raw SMTP headers, SPF/DKIM verification tags, and malicious payloads.',
    objective: 'Analyze the headers and flag the domain impersonation spoof.',
    flag: 'FLAG{PHISH_HEADER_TRIAGED_2026}',
    hints: ['Check the Return-Path header for domain mismatch.'],
    defaultTerminalOutput: ['CyHub Security Terminal Initialized.', 'Type "inspect --headers" to begin.']
  }
];

