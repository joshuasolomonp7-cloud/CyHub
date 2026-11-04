import React from 'react';
import { ShieldCheck, GraduationCap, ArrowRight } from 'lucide-react';

interface FooterProps {
  onOpenIntakeWizard: () => void;
  onOpenFreelancerModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenIntakeWizard,
  onOpenFreelancerModal,
}) => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600 text-xs">
      {/* Top Banner */}
      <div className="border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img 
              src="/CyHub_Logo_Black.jpg" 
              alt="CyHub Logo" 
              className="h-9 w-auto object-contain" 
            />
            <div className="hidden sm:block h-7 w-px bg-slate-300"></div>
            <p className="hidden sm:block text-xs text-slate-500 max-w-md">
              CyHub is an academic cybersecurity innovation connecting Indian MSMEs with verified specialists, backed by practical defense labs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenIntakeWizard}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer shadow-xs"
            >
              Start Intake Diagnostic
            </button>
            <button
              onClick={onOpenFreelancerModal}
              className="px-4 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-xs cursor-pointer"
            >
              Register as Specialist
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-slate-900 font-mono font-bold uppercase tracking-wider text-xs mb-3">
            For Indian MSMEs
          </h4>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={onOpenIntakeWizard}
                className="hover:text-slate-900 transition-colors cursor-pointer text-left"
              >
                DPDP Act 2023 Readiness
              </button>
            </li>
            <li>
              <button 
                onClick={onOpenIntakeWizard}
                className="hover:text-slate-900 transition-colors cursor-pointer text-left"
              >
                Fixed-Scope Security Starter (₹2,999)
              </button>
            </li>
            <li>
              <button 
                onClick={onOpenIntakeWizard}
                className="hover:text-slate-900 transition-colors cursor-pointer text-left"
              >
                External Port & Perimeter Hardening
              </button>
            </li>
            <li>
              <button 
                onClick={onOpenIntakeWizard}
                className="hover:text-slate-900 transition-colors cursor-pointer text-left"
              >
                CERT-In 6-Hour Incident SOP
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-900 font-mono font-bold uppercase tracking-wider text-xs mb-3">
            Interactive Labs & Students
          </h4>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => scrollTo('#arcade')}
                className="hover:text-slate-900 transition-colors cursor-pointer text-left"
              >
                Phish Catcher Simulation
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollTo('#arcade')}
                className="hover:text-slate-900 transition-colors cursor-pointer text-left"
              >
                SQLi Exploit & Fix Sandbox
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollTo('#arcade')}
                className="hover:text-slate-900 transition-colors cursor-pointer text-left"
              >
                Firewall Rule Builder
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollTo('#marketplace')}
                className="text-sky-700 hover:underline cursor-pointer text-left font-semibold"
              >
                1-on-1 Mentoring Slots (₹499+) &rarr;
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-900 font-mono font-bold uppercase tracking-wider text-xs mb-3">
            Unit Economics
          </h4>
          <ul className="space-y-2">
            <li>
              <span className="text-emerald-700 font-semibold font-mono">85% Specialist Take-Home</span>
            </li>
            <li>
              <span className="text-slate-500">15% Platform Take-Rate</span>
            </li>
            <li>
              <span className="text-slate-500">100% Escrow Protection</span>
            </li>
            <li>
              <button 
                onClick={() => scrollTo('#business-model')}
                className="text-slate-900 hover:underline cursor-pointer text-left font-mono font-semibold"
              >
                Pricing &amp; Revenue Sliders &rarr;
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-900 font-mono font-bold uppercase tracking-wider text-xs mb-3">
            Academic Assessment
          </h4>
          <div className="space-y-2 text-slate-500">
            <div className="text-slate-800 font-semibold">
              Department of CSE (Cyber Security)
            </div>
            <div>• Micro-Project Assessment (CST, DS)</div>
            <div>• Primary Survey (N=131 Respondents)</div>
            <div>• Aligned with DPDP Act 2023 & CERT-In</div>
            <div>
              <button 
                onClick={() => scrollTo('#team')}
                className="text-sky-700 hover:underline cursor-pointer text-left font-semibold"
              >
                View Project Team (4 Members) &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-200 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px] font-mono">
          <div>
            &copy; {new Date().getFullYear()} CyHub • Bridging Security Defense. Department of CSE (Cyber Security).
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-800 cursor-pointer">DPDP Act Compliance</span>
            <span>•</span>
            <span className="hover:text-slate-800 cursor-pointer">CERT-In Directives</span>
            <span>•</span>
            <span className="hover:text-slate-800 cursor-pointer">Academic Project</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
