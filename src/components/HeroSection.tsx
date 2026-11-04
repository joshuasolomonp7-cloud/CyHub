import React from 'react';
import { 
  ShieldCheck, 
  Terminal, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Scale, 
  FileText,
  Users
} from 'lucide-react';
import { SURVEY_DATA_N131 } from '../data/mockData';

interface HeroSectionProps {
  onOpenIntakeWizard: () => void;
  onExploreLabs: () => void;
  onBrowseExperts: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenIntakeWizard,
  onExploreLabs,
  onBrowseExperts,
}) => {
  return (
    <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compliance Directive Banner */}
        <div className="flex justify-center mb-6">
          <div 
            onClick={onOpenIntakeWizard}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 hover:border-slate-300 transition-colors cursor-pointer"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-slate-900">DPDP Act 2023 & CERT-In Aligned</span>
            <span className="text-slate-300">•</span>
            <span className="text-sky-700 flex items-center gap-1 font-sans">
              Schedule MSME Compliance Triage <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Brand Emblem Presentation */}
        <div className="flex justify-center mb-6">
          <div className="p-2 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <img 
              src={`${import.meta.env.BASE_URL}CyHub_Logo_Black.jpg`} 
              alt="CyHub Logo" 
              className="h-14 sm:h-16 w-auto object-contain" 
            />
          </div>
        </div>

        {/* Central Executive Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-heading leading-tight">
            Securing Indian MSMEs.{' '}
            <span className="text-sky-700 block sm:inline">
              Training Tomorrow's Cyber Defenders.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            CyHub is a two-sided cybersecurity platform connecting small businesses with verified freelance specialists for DPDP Act readiness, while delivering browser-based interactive labs for student defense education.
          </p>

          {/* Clean Primary Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenIntakeWizard}
              className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Book MSME Security Audit</span>
            </button>

            <button
              onClick={onExploreLabs}
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold rounded-lg text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Terminal className="w-4 h-4 text-slate-600" />
              <span>Try Interactive Labs</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              100% Escrow Milestone Protection
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
              85% Specialist Payout Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" />
              CERT-In 6-Hr Incident Readiness
            </span>
          </div>
        </div>

        {/* =====================================================================
            VERIFIED EMPIRICAL RESEARCH DATA CARDS (N=131)
            ===================================================================== */}
        <div className="mt-14 p-6 sm:p-8 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-sky-800 font-bold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-sky-700" /> Primary Empirical Survey Findings (N=131)
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                The Indian Cybersecurity Paradox & Market Urgency
              </h2>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-600 font-semibold self-start sm:self-auto">
              Sample: N=131 MSMEs & Students
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat 1: Market Demand */}
            <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-1">
              <div className="text-xs font-mono text-slate-500 uppercase font-semibold">
                {SURVEY_DATA_N131.marketReadiness.title}
              </div>
              <div className="text-2xl font-extrabold text-slate-900 font-mono">
                {SURVEY_DATA_N131.marketReadiness.label}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {SURVEY_DATA_N131.marketReadiness.detail}
              </p>
            </div>

            {/* Stat 2: Exposure Reality */}
            <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-1">
              <div className="text-xs font-mono text-slate-500 uppercase font-semibold">
                {SURVEY_DATA_N131.exposureReality.title}
              </div>
              <div className="text-2xl font-extrabold text-rose-600 font-mono">
                {SURVEY_DATA_N131.exposureReality.label}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {SURVEY_DATA_N131.exposureReality.detail}
              </p>
            </div>

            {/* Stat 3: False Security Paradox */}
            <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-1">
              <div className="text-xs font-mono text-slate-500 uppercase font-semibold">
                {SURVEY_DATA_N131.behavioralVulnerability.title}
              </div>
              <div className="text-2xl font-extrabold text-amber-600 font-mono">
                {SURVEY_DATA_N131.behavioralVulnerability.label}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {SURVEY_DATA_N131.behavioralVulnerability.detail}
              </p>
            </div>

            {/* Stat 4: Trust Deficit */}
            <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-1">
              <div className="text-xs font-mono text-slate-500 uppercase font-semibold">
                {SURVEY_DATA_N131.trustBottleneck.title}
              </div>
              <div className="text-2xl font-extrabold text-sky-800 font-mono">
                {SURVEY_DATA_N131.trustBottleneck.label}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {SURVEY_DATA_N131.trustBottleneck.detail}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 font-mono gap-2">
            <span>
              <strong>Regulatory Driver:</strong> {SURVEY_DATA_N131.regulatoryContext.act} & {SURVEY_DATA_N131.regulatoryContext.mandate}
            </span>
            <span className="text-slate-600">
              Department of CSE (Cyber Security) Micro-Project Data
            </span>
          </div>
        </div>

        {/* 3 Executive Pillars */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div 
            onClick={onOpenIntakeWizard}
            className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all cursor-pointer group"
          >
            <div className="p-2.5 rounded-lg bg-sky-50 text-sky-700 w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
              For MSMEs & Healthcare Clinics
            </h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Affordable vulnerability scanning, password manager deployment, and DPDP Act 2023 readiness audits backed by milestone escrow.
            </p>
          </div>

          <div 
            onClick={onExploreLabs}
            className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all cursor-pointer group"
          >
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 w-fit">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              For Students & Engineering Learners
            </h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Zero-cost interactive labs covering phishing triage, SQL injection exploit sandboxes, and firewall rule building without cloud fees.
            </p>
          </div>

          <div 
            onClick={onBrowseExperts}
            className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all cursor-pointer group"
          >
            <div className="p-2.5 rounded-lg bg-slate-100 text-slate-700 w-fit">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
              For Verified Freelancers
            </h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Retain 85% of your consultation and tutoring fees with guaranteed weekly payouts, dispute protection, and built-in client matching.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
