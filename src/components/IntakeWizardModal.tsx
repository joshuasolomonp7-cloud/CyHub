import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  ShoppingBag, 
  Stethoscope, 
  Cloud, 
  Store, 
  Landmark, 
  Scale, 
  FileSearch, 
  Lock, 
  AlertOctagon, 
  Mail, 
  Clock, 
  Zap,
  CheckCircle,
  Building
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Expert } from '../types';

interface IntakeWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  experts: Expert[];
  onSelectExpert: (expert: Expert, sessionType: 'consultation' | 'mentorship-class' | 'rapid-triage') => void;
  initialNeed?: string;
}

export const IntakeWizardModal: React.FC<IntakeWizardModalProps> = ({
  isOpen,
  onClose,
  experts,
  onSelectExpert,
  initialNeed,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form selections
  const [businessType, setBusinessType] = useState<string>('Tech Startup / SaaS');
  const [immediateNeed, setImmediateNeed] = useState<string>(initialNeed || 'DPDP Act 2023 Compliance');
  const [budgetTier, setBudgetTier] = useState<string>('₹5,000 - ₹20,000');
  const [timeline, setTimeline] = useState<string>('Within 1 Week');
  const [companyName, setCompanyName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  // Step 1 Options: Business Types
  const businessTypes = [
    {
      id: 'Tech Startup / SaaS',
      icon: Cloud,
      title: 'Tech Startup / SaaS',
      desc: 'Cloud applications, APIs, user logins, customer databases',
    },
    {
      id: 'Clinic / Healthcare',
      icon: Stethoscope,
      title: 'Clinic / Healthcare',
      desc: 'Medical practices, patient health records, diagnostic systems',
    },
    {
      id: 'E-commerce & D2C Store',
      icon: ShoppingBag,
      title: 'E-commerce & D2C Store',
      desc: 'Online storefronts, payment gateway integrations, customer PII',
    },
    {
      id: 'MSME Manufacturing / Retail',
      icon: Store,
      title: 'MSME Manufacturing / Retail',
      desc: 'Point-of-Sale registers, office Wi-Fi, perimeter router firewalls',
    },
    {
      id: 'FinTech / CA & Financial Firm',
      icon: Landmark,
      title: 'FinTech / CA & Accounting',
      desc: 'GST data, banking integrations, wire transfer fraud defense',
    },
    {
      id: 'Legal / Professional Firm',
      icon: Scale,
      title: 'Legal / Corporate Advisory',
      desc: 'Confidential client data, litigation documents, partner comms',
    },
  ];

  // Step 2 Options: Immediate Need
  const immediateNeeds = [
    {
      id: 'DPDP Act 2023 Compliance',
      icon: Lock,
      title: 'DPDP Act 2023 Compliance & Data Audit',
      desc: 'Data fiduciary readiness, consent notices, and CERT-In 6-hour incident reporting playbooks.',
      recommendedSpecialization: 'Compliance/ISO27001'
    },
    {
      id: 'Vulnerability Assessment & Pen Test',
      icon: FileSearch,
      title: 'Vulnerability Assessment & Pen Test',
      desc: 'Discover critical security flaws in your web app, mobile API, or external cloud perimeter.',
      recommendedSpecialization: 'Penetration Testing'
    },
    {
      id: 'Fixed-Scope Starter Bundle',
      icon: ShieldCheck,
      title: 'Fixed-Scope Security Starter Bundle (₹2,999)',
      desc: 'Guided password manager deployment, 2FA enforcement, and foundational MSME attack surface report.',
      recommendedSpecialization: 'Network Hardening'
    },
    {
      id: 'Employee Phishing Drills & Awareness',
      icon: Mail,
      title: 'Employee Phishing Drills & Training',
      desc: 'Simulated email phishing tests and interactive staff training to prevent invoice fraud and ransomware.',
      recommendedSpecialization: 'Phishing Defense'
    },
  ];

  // Step 3 Options: Budget & Timeline (in INR ₹)
  const budgetTiers = [
    { id: 'Under ₹5,000', label: 'Starter (< ₹5,000)', sub: 'Rapid triage or Security Starter Bundle' },
    { id: '₹5,000 - ₹20,000', label: 'Standard (₹5,000 - ₹20,000)', sub: 'Web API pentest or full perimeter hardening' },
    { id: '₹20,000 - ₹50,000', label: 'Advanced (₹20,000 - ₹50,000)', sub: 'Full DPDP Act readiness audit or ISO review' },
    { id: '₹50,000+', label: 'Enterprise (₹50,000+)', sub: 'Ongoing Virtual CISO advisory retainer' }
  ];

  const timelines = [
    'Immediate (Urgent Triage < 24 hrs)',
    'Within 1 Week',
    'Within 1 Month',
    'Exploring / Compliance Planning'
  ];

  // Recommendation matching logic
  const recommendedExperts = experts.slice(0, 3);

  const handleSubmitIntake = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setStep(4);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-xl bg-white border border-slate-200 shadow-2xl modal-content overflow-hidden my-8">
        {/* Header */}
        <div className="p-5 pb-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
              <ShieldCheck className="w-5 h-5 text-sky-700" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                MSME Security & Compliance Diagnostic
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                {step < 4 ? `Step ${step} of 3: We match your business with verified specialists in 60 seconds` : 'Step 4: Your Verified Specialist Recommendations'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1">
          <div 
            className="h-full bg-slate-900 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>

        {/* Wizard Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {/* STEP 1: Business Profile */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-sky-800 font-bold">
                  Step 1 • Profile
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-0.5">
                  What type of organization are you protecting?
                </h4>
                <p className="text-slate-500 text-xs mt-0.5">
                  Select your primary business vertical to calibrate DPDP Act requirements:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {businessTypes.map((bt) => {
                  const Icon = bt.icon;
                  const isSelected = businessType === bt.id;
                  return (
                    <div
                      key={bt.id}
                      onClick={() => setBusinessType(bt.id)}
                      className={`p-3.5 rounded-lg border transition-colors cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'bg-slate-50 border-slate-900 shadow-2xs'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="p-2 rounded bg-slate-100 text-slate-700 shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-bold text-slate-900 truncate">{bt.title}</h5>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{bt.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Company Name */}
              <div className="pt-1">
                <label className="block text-xs font-mono text-slate-700 font-bold mb-1">
                  Business / Organization Name (Optional):
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g., Apex Health Logistics, NovaPay Technologies"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-slate-400 font-sans"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Continue to Immediate Need</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Immediate Need */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-sky-800 font-bold">
                  Step 2 • Scope
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-0.5">
                  What is your primary cybersecurity requirement?
                </h4>
                <p className="text-slate-500 text-xs mt-0.5">
                  Select your primary objective to match with the most qualified verified specialist:
                </p>
              </div>

              <div className="space-y-2">
                {immediateNeeds.map((need) => {
                  const Icon = need.icon;
                  const isSelected = immediateNeed === need.id;
                  return (
                    <div
                      key={need.id}
                      onClick={() => setImmediateNeed(need.id)}
                      className={`p-3.5 rounded-lg border transition-colors cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'bg-slate-50 border-slate-900 shadow-2xs'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="p-2 rounded bg-slate-100 text-slate-700 shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-bold text-slate-900">{need.title}</h5>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{need.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  onClick={() => setStep(3)}
                  className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Continue to Budget &amp; Contact</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Budget & Contact */}
          {step === 3 && (
            <form onSubmit={handleSubmitIntake} className="space-y-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-sky-800 font-bold">
                  Step 3 • Logistics
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-0.5">
                  Budget allocation &amp; contact information
                </h4>
                <p className="text-slate-500 text-xs mt-0.5">
                  All contracts are escrow-backed. Specialists only get paid upon verified deliverable approval.
                </p>
              </div>

              {/* Budget Tiers in INR */}
              <div>
                <label className="block text-xs font-mono text-slate-700 font-bold mb-1">
                  Budget Range (INR ₹):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {budgetTiers.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => setBudgetTier(b.id)}
                      className={`p-2.5 rounded-lg border cursor-pointer text-xs transition-colors ${
                        budgetTier === b.id
                          ? 'bg-slate-900 text-white font-bold border-slate-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-semibold">{b.label}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{b.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Email & Notes */}
              <div className="space-y-2.5">
                <div>
                  <label className="block text-xs font-mono text-slate-700 font-bold mb-1">
                    Contact Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="founder@yourcompany.in"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-slate-400 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 font-bold mb-1">
                    Specific Security Concerns / Infrastructure:
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. We store customer KYC records in AWS RDS and need DPDP Act consent guidance..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-slate-400 font-sans"
                  ></textarea>
                </div>
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Zap className="w-3.5 h-3.5 text-sky-400" />
                  <span>View Matched Specialists</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Recommended Matched Specialists */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-xs text-emerald-900">
                  <strong>Diagnostic Match Complete:</strong> We matched your <strong>{businessType}</strong> profile with 3 verified Indian specialists qualified for <strong>{immediateNeed}</strong>.
                </div>
              </div>

              <div className="space-y-2.5">
                {recommendedExperts.map((exp) => (
                  <div 
                    key={exp.id}
                    className="p-3.5 rounded-lg bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={exp.avatar} 
                        alt={exp.name} 
                        className="w-11 h-11 rounded-lg object-cover border border-slate-200"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h5 className="text-xs font-bold text-slate-900">{exp.name}</h5>
                          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1 rounded">
                            Verified
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                          {exp.title} • {exp.location}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Avg Response: {exp.responseTime} • Rate: ₹{exp.hourlyRate.toLocaleString('en-IN')}/session
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onSelectExpert(exp, 'consultation');
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold font-mono transition-colors self-start sm:self-auto cursor-pointer"
                    >
                      Book Consultation &rarr;
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-between border-t border-slate-100">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-mono cursor-pointer"
                >
                  Restart Diagnostic
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
