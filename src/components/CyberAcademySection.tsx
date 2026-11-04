import React from 'react';
import { 
  GraduationCap, 
  Terminal, 
  CheckCircle, 
  ArrowRight
} from 'lucide-react';
import type { Expert } from '../types';

interface CyberAcademySectionProps {
  experts: Expert[];
  onSelectExpert: (expert: Expert, sessionType: 'consultation' | 'mentorship-class' | 'rapid-triage') => void;
  onExploreLabs: () => void;
}

export const CyberAcademySection: React.FC<CyberAcademySectionProps> = ({
  experts,
  onSelectExpert,
  onExploreLabs,
}) => {
  const roadmaps = [
    {
      id: 'soc-analyst',
      title: 'SOC Analyst L1 & Blue Team Defender',
      certGoal: 'CompTIA Security+ / CySA+',
      level: 'Beginner to Intermediate',
      duration: '8-12 Weeks',
      mentorHandle: '@jenkins_blueteam',
      desc: 'Master SIEM log investigation, Wireshark packet capture analysis, endpoint threat hunting, and incident triage.',
      milestones: [
        'TCP/IP & Network Packet Deep-Dive',
        'Splunk & Elastic Log Ingestion & Querying',
        'Phishing Email Header Analysis & De-obfuscation',
        'Incident Containment & Playbook Execution'
      ]
    },
    {
      id: 'red-team',
      title: 'Offensive Penetration Tester & Red Teamer',
      certGoal: 'OffSec OSCP / CRTO',
      level: 'Intermediate to Advanced',
      duration: '12-16 Weeks',
      mentorHandle: '@zeroday_vance',
      desc: 'Learn adversarial exploitation methodology, privilege escalation, Active Directory attack paths, and pivot tunneling.',
      milestones: [
        'Linux & Windows Privilege Escalation Vectors',
        'Web Application Exploits (SQLi, SSRF, XSS)',
        'Active Directory Kerberoasting & Lateral Movement',
        'Post-Exploitation TTPs & Professional Reporting'
      ]
    },
    {
      id: 'devsecops',
      title: 'Cloud DevSecOps & Security Tool Developer',
      certGoal: 'AWS Security Specialty / CKS',
      level: 'Intermediate to Advanced',
      duration: '10-14 Weeks',
      mentorHandle: '@kai_devsec',
      desc: 'Build automated security guardrails into Docker containers, Kubernetes clusters, and GitHub Actions pipelines.',
      milestones: [
        'Python for Security Automation & Threat Scanners',
        'SAST/DAST Tooling in CI/CD (Semgrep, Trivy)',
        'AWS & GCP IAM Least-Privilege Architecture',
        'Terraform & Infrastructure-as-Code Security'
      ]
    }
  ];

  return (
    <section id="academy-section" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>Structured Cyber Defenses Academy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Cybersecurity Career Roadmaps
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Break into the high-demand cybersecurity sector with structured curriculums, interactive virtual labs, and direct 1-on-1 mentorship from industry veterans.
          </p>
        </div>

        <button
          onClick={onExploreLabs}
          className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:border-cyan-400 transition-all cursor-pointer"
        >
          <Terminal className="w-4 h-4 text-cyan-400" />
          Test Cyber Range Labs
        </button>
      </div>

      {/* Roadmaps Grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {roadmaps.map((map) => {
          const matchedMentor = experts.find(e => e.handle === map.mentorHandle) || experts[0];

          return (
            <div
              key={map.id}
              className="glass-card p-6 border border-slate-800 hover:border-cyan-500/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                    Goal: {map.certGoal}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{map.duration}</span>
                </div>

                <h3 className="text-lg font-bold text-white mt-3 font-heading">
                  {map.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {map.desc}
                </p>

                {/* Milestone Checklist */}
                <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Core Modules:
                  </div>
                  {map.milestones.map((m, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentor CTA */}
              <div className="mt-6 pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={matchedMentor.avatar}
                      alt={matchedMentor.name}
                      className="w-8 h-8 rounded-full object-cover border border-cyan-500/50"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">{matchedMentor.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">Lead Mentor (${matchedMentor.hourlyRate}/hr)</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectExpert(matchedMentor, 'mentorship-class')}
                  className="w-full py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Book 1-on-1 Mentorship</span>
                  <ArrowRight className="w-3 h-3 text-cyan-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
