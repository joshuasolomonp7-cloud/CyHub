import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  Lock, 
  Zap, 
  Building2
} from 'lucide-react';
import { PREPACKAGED_SOLUTIONS } from '../data/mockData';

interface ConsultingServicesSectionProps {
  onSelectSolution: (solutionNeed: string) => void;
  onOpenIntakeWizard: () => void;
}

export const ConsultingServicesSection: React.FC<ConsultingServicesSectionProps> = ({
  onSelectSolution,
  onOpenIntakeWizard,
}) => {
  return (
    <section id="consulting-section" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Turnkey Small Business Security Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Fixed-Scope Security Consulting Packages
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Enterprise-grade cybersecurity without the enterprise retainers. Fixed deliverables, guaranteed turnaround, and 100% escrow protection.
          </p>
        </div>

        <button
          onClick={onOpenIntakeWizard}
          className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(0,245,255,0.25)] hover:scale-[1.02] transition-all cursor-pointer"
        >
          <Zap className="w-4 h-4" />
          Custom Project Intake Wizard
        </button>
      </div>

      {/* Solutions Cards Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {PREPACKAGED_SOLUTIONS.map((sol) => (
          <div 
            key={sol.id}
            className="glass-card p-6 sm:p-7 border border-slate-800 hover:border-cyan-500/40 flex flex-col justify-between"
          >
            <div>
              {/* Badge & Turnaround */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                  {sol.badge}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" /> {sol.turnaround}
                </span>
              </div>

              {/* Title & Price */}
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="text-xl font-bold text-white font-heading">
                  {sol.title}
                </h3>
                <div className="text-2xl font-extrabold text-cyan-400 font-mono">
                  ${sol.price}
                </div>
              </div>

              <div className="text-xs text-slate-400 font-mono mt-1">
                Targeted for: <span className="text-slate-300">{sol.target}</span>
              </div>

              <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                {sol.description}
              </p>

              {/* Deliverables List */}
              <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Included Deliverables:
                </div>
                {sol.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <button
                onClick={() => onSelectSolution(sol.recommendedNeed)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-cyan-950/50 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.1)]"
              >
                <span>Launch Intake with this Solution</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="mt-10 p-6 rounded-2xl bg-[#0F172A]/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 shrink-0">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">The CyHub Small Business Guarantee</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Every audit report includes an actionable remediation walkthrough and a complimentary 30-day verification re-test.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenIntakeWizard}
          className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shrink-0 cursor-pointer"
        >
          Get Free Security Scope
        </button>
      </div>
    </section>
  );
};
