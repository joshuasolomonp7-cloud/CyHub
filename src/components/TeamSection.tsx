import React from 'react';
import { 
  Users, 
  Code2, 
  ShieldCheck, 
  BarChart3, 
  FileCheck2, 
  GraduationCap
} from 'lucide-react';

export const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: 'Joshua S.',
      role: 'Project Lead & Full-Stack System Architect',
      domain: 'System Architecture & Engineering',
      icon: Code2,
      bio: 'Spearheaded end-to-end platform architecture, Vite/React 19 single-page application workflow, interactive simulation sandboxes, and escrow transaction modeling.',
      focus: ['React 19 & TypeScript', 'Micro-Marketplace Engine', 'Virtual Range Design']
    },
    {
      name: 'Ebenezer Paul',
      role: 'Security Systems & Lab Engineer',
      domain: 'Offensive & Defensive Security Labs',
      icon: ShieldCheck,
      bio: 'Engineered the client-side Cyber Arcade simulations including Phish Catcher header parser, SQL injection sandbox AST query visualizer, and DMZ firewall state machine.',
      focus: ['SQLi Exploit Mechanics', 'Network Packet Triage', 'Email RFC 822 Forensics']
    },
    {
      name: 'Moses Daniel Timothy',
      role: 'Market Strategy & Survey Analytics',
      domain: 'Empirical Research & Customer Discovery',
      icon: BarChart3,
      bio: 'Led primary empirical field survey (N=131) analyzing MSME vulnerability exposure, cyber awareness paradox, trust bottlenecks, and unit economic pricing validation.',
      focus: ['Empirical Survey (N=131)', 'Go-to-Market Flywheel', 'Unit Economics Modeling']
    },
    {
      name: 'Kevin',
      role: 'Product Operations & Compliance Lead',
      domain: 'Governance & Regulatory Compliance',
      icon: FileCheck2,
      bio: 'Structured compliance alignment frameworks with the Digital Personal Data Protection (DPDP) Act 2023, CERT-In 6-hour incident directives, and specialist vetting protocols.',
      focus: ['DPDP Act 2023 Alignment', 'CERT-In Reporting SLAs', 'Specialist Vetting Standards']
    }
  ];

  return (
    <section id="team" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700">
          <Users className="w-3.5 h-3.5 text-sky-700" />
          <span className="uppercase tracking-wider font-bold">Team & Leadership</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Project Team & Academic Leadership
        </h2>

        {/* Academic Subtitle */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-sky-800 font-mono font-medium">
          <GraduationCap className="w-4 h-4 text-sky-700 shrink-0" />
          <span>Department of Computer Science & Engineering (Cyber Security) | Micro-Project Assessment (CST, DS)</span>
        </div>

        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
          Built as a practical academic innovation project addressing the cybersecurity readiness gap for Indian micro, small, and medium enterprises.
        </p>
      </div>

      {/* 4 Clean Team Cards */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => {
          const IconComponent = member.icon;
          return (
            <div 
              key={index}
              className="card-executive p-6 flex flex-col justify-between"
            >
              <div>
                {/* Icon & Domain Badge */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                    <IconComponent className="w-5 h-5 text-sky-700" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    0{index + 1}
                  </span>
                </div>

                {/* Member Info */}
                <h3 className="text-lg font-bold text-slate-900 mt-4 font-heading">
                  {member.name}
                </h3>
                <div className="text-xs font-semibold text-sky-800 mt-0.5">
                  {member.role}
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                  {member.domain}
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {member.bio}
                </p>
              </div>

              {/* Focus Tags */}
              <div className="mt-5 pt-4 border-t border-slate-100 space-y-1.5">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Core Responsibilities:</div>
                <div className="flex flex-wrap gap-1">
                  {member.focus.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
