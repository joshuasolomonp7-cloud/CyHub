import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Calculator, 
  ChevronDown, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  ArrowRight,
  GraduationCap,
  Zap,
  Building,
  Lock,
  FileText
} from 'lucide-react';
import { SURVEY_DATA_N131 } from '../data/mockData';

interface BusinessModelSectionProps {
  onOpenIntakeWizard: () => void;
  onOpenFreelancerModal: () => void;
}

export const BusinessModelSection: React.FC<BusinessModelSectionProps> = ({
  onOpenIntakeWizard,
  onOpenFreelancerModal,
}) => {
  // Billing cycle toggle: monthly or annual (20% discount)
  const [annualBilling, setAnnualBilling] = useState<boolean>(false);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Interactive Revenue Calculator Sliders State (in INR ₹)
  const [activeMsmes, setActiveMsmes] = useState<number>(85);
  const [avgProjectValue, setAvgProjectValue] = useState<number>(18000); // ₹18,000 avg project
  const [monthlyTutoringSessions, setMonthlyTutoringSessions] = useState<number>(140); // 140 sessions @ ₹800

  // Calculations
  const calculations = useMemo(() => {
    const businessGmv = activeMsmes * avgProjectValue;
    const tutoringGmv = monthlyTutoringSessions * 800; // avg ₹800/session
    const totalMonthlyGmv = businessGmv + tutoringGmv;

    // CyHub 15% marketplace take-rate
    const platformTakeRate = 0.15;
    const monthlyCommissionRevenue = totalMonthlyGmv * platformTakeRate;

    // MSME SaaS subscription conversion: ~40% of active MSMEs subscribe to ₹1,499/mo Business Secure plan
    const saasSubscribers = Math.round(activeMsmes * 0.40);
    const monthlySaasRevenue = saasSubscribers * (annualBilling ? 1199 : 1499);

    const totalMonthlyRevenue = monthlyCommissionRevenue + monthlySaasRevenue;
    const annualizedRunRate = totalMonthlyRevenue * 12;

    // Specialist payouts (85%)
    const specialistMonthlyEarnings = totalMonthlyGmv * 0.85;

    return {
      businessGmv,
      tutoringGmv,
      totalMonthlyGmv,
      monthlyCommissionRevenue,
      monthlySaasRevenue,
      totalMonthlyRevenue,
      annualizedRunRate,
      specialistMonthlyEarnings,
      saasSubscribers,
    };
  }, [activeMsmes, avgProjectValue, monthlyTutoringSessions, annualBilling]);

  const faqs = [
    {
      question: 'How does CyHub vet freelance cybersecurity specialists in India?',
      answer: 'Every specialist undergoes a 3-stage validation workflow: (1) Identity & Aadhar/PAN verification, (2) Direct cryptographic credential audits for recognized certifications (CISSP, OSCP, CEH, DPDP Lead Auditor), and (3) Peer evaluation of sample vulnerability assessment reports and GitHub defense tooling by our Senior Review Board. Only the top 3% of verified applicants are listed.',
    },
    {
      question: 'How does escrow protection safeguard Indian MSMEs?',
      answer: 'When an MSME books an audit or starter bundle, payment is held in an encrypted, zero-interest escrow vault. Funds are only released to the specialist after the business owner reviews and explicitly signs off on delivered remediation documentation. CyHub provides free mediation and full refund guarantees if agreed deliverables fall short of the scope.',
    },
    {
      question: 'How does the platform align with the DPDP Act 2023 & CERT-In rules?',
      answer: 'The Digital Personal Data Protection (DPDP) Act 2023 mandates that Data Fiduciaries protect personal data or face statutory penalties up to ₹250 Crores. In parallel, CERT-In enforces mandatory 6-hour cybersecurity incident reporting. CyHub provides MSMEs with turnkey incident playbooks, data mapping templates, and access to certified auditors who can ensure complete regulatory compliance.',
    },
    {
      question: 'Can undergraduate engineering students start as beginners?',
      answer: 'Yes! CyHub was engineered to address India’s severe cybersecurity talent gap. The browser-based Cyber Arcade, email phishing simulations, and SQLi sandboxes are 100% free and require zero prior Linux or cloud configuration. Students can build hands-on skills and book pay-as-you-go 1-on-1 mentoring slots (starting at ₹499/session) when preparing for practical industry certifications.',
    },
  ];

  return (
    <section id="business-model" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700">
          <TrendingUp className="w-3.5 h-3.5 text-sky-700" />
          <span className="uppercase tracking-wider font-bold">Business Model & Unit Economics</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Transparent Monetization & Scalability
        </h2>

        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          A sustainable two-sided marketplace monetizing through a transparent 15% project take-rate, pay-as-you-go tutoring, and recurring MSME compliance defense subscriptions.
        </p>
      </div>

      {/* =======================================================================
          1. REVENUE MODEL & PRICING PLANS (3-TIER TABLE IN INR)
          ======================================================================= */}
      <div className="mt-12 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-700" />
              MSME Security & Compliance Plans
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Designed for non-technical small businesses, healthcare clinics, and scaling startups across India.
            </p>
          </div>

          {/* Billing Switcher */}
          <div className="flex items-center gap-1.5 self-start sm:self-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-mono">
            <button
              onClick={() => setAnnualBilling(false)}
              className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                !annualBilling ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setAnnualBilling(true)}
              className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                annualBilling ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3-Tier Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Tier 1: Essential Shield */}
          <div className="card-executive p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Tier 1 • Community & Micro-Business
              </div>
              <h4 className="text-xl font-bold text-slate-900 mt-1 font-heading">Essential Shield</h4>
              <p className="text-xs text-slate-600 mt-1.5 min-h-[34px]">
                Foundational defense checklists and interactive cyber arcade access for solo entrepreneurs and students.
              </p>

              <div className="mt-5 flex items-baseline gap-1 font-mono">
                <span className="text-3xl font-extrabold text-slate-900">₹0</span>
                <span className="text-slate-500 text-xs">/ forever free</span>
              </div>

              <div className="mt-5 pt-5 border-t border-slate-100 space-y-2.5 text-xs">
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Full access to <strong>Cyber Arcade & Interactive Labs</strong></span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Simulated phishing email checklists (up to 5 staff)</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Weekly CERT-In CVE & MSME Threat Advisory Bulletins</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Browse verified freelance consultant & tutor directory</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <button
                onClick={onOpenIntakeWizard}
                className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs font-mono transition-colors cursor-pointer border border-slate-200"
              >
                Get Started Free
              </button>
            </div>
          </div>

          {/* Tier 2: Business Secure (Most Popular) */}
          <div className="card-executive p-6 border-2 border-slate-900 relative flex flex-col justify-between shadow-md">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-mono font-bold uppercase tracking-wider">
              Most Popular for Indian MSMEs
            </div>

            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-sky-800">
                Tier 2 • Growing MSMEs & Clinics
              </div>
              <h4 className="text-xl font-bold text-slate-900 mt-1 font-heading">Business Secure</h4>
              <p className="text-xs text-slate-600 mt-1.5 min-h-[34px]">
                On-demand audits, matched verified specialists, escrow security, and continuous vulnerability reporting.
              </p>

              <div className="mt-5 flex items-baseline gap-1.5 font-mono">
                <span className="text-3xl font-extrabold text-slate-900">
                  ₹{annualBilling ? '1,199' : '1,499'}
                </span>
                <span className="text-slate-500 text-xs">/ month</span>
                <span className="text-[11px] text-emerald-700 ml-1 font-sans font-semibold">
                  (or 15% platform take-rate)
                </span>
              </div>

              <div className="mt-5 pt-5 border-t border-slate-100 space-y-2.5 text-xs">
                <div className="flex items-start gap-2 text-slate-900 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                  <span><strong>AI Matchmaking</strong> with Top 3% Vetted Indian Specialists</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                  <span><strong>100% Escrow Milestone Protection</strong> on all freelance contracts</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                  <span>Monthly automated public website & SSL vulnerability audit</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                  <span><strong>DPDP Act 2023</strong> Data Mapping & Consent Notice Templates</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                  <span>Staff phishing simulations for up to 30 employees</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <button
                onClick={onOpenIntakeWizard}
                className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs font-mono transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Zap className="w-4 h-4 text-sky-400" />
                <span>Start Intake & 14-Day Trial</span>
              </button>
            </div>
          </div>

          {/* Tier 3: Enterprise Defense */}
          <div className="card-executive p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Tier 3 • Mid-Market & Regulated
              </div>
              <h4 className="text-xl font-bold text-slate-900 mt-1 font-heading">Enterprise Defense</h4>
              <p className="text-xs text-slate-600 mt-1.5 min-h-[34px]">
                Dedicated Virtual CISO leadership, custom employee video drills, and prioritized emergency incident triage.
              </p>

              <div className="mt-5 flex items-baseline gap-1 font-mono">
                <span className="text-3xl font-extrabold text-slate-900">
                  ₹{annualBilling ? '5,599' : '6,999'}
                </span>
                <span className="text-slate-500 text-xs">/ month + custom scope</span>
              </div>

              <div className="mt-5 pt-5 border-t border-slate-100 space-y-2.5 text-xs">
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                  <span><strong>Dedicated Virtual CISO (vCISO)</strong> monthly architecture sync</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                  <span>Emergency Incident Response SLA: <strong>&lt; 30 min containment</strong></span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                  <span>CERT-In 6-Hour mandatory incident reporting support</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                  <span>Cloud IAM permissions & AWS / Azure configuration review</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                  <span>Dedicated Slack / Teams security dispatch channel</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <button
                onClick={onOpenIntakeWizard}
                className="w-full py-2.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs font-mono transition-colors cursor-pointer"
              >
                Contact Enterprise Advisory
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================================
          2. STUDENT / LEARNER MONETIZATION & 85/15 COMMISSION SPLIT
          ======================================================================= */}
      <div className="mt-14 p-6 sm:p-7 rounded-xl bg-white border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-bold flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-emerald-700" /> Marketplace Unit Economics
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Student / Learner Monetization & 85/15 Payout Split
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              CyHub passes 85% of project earnings directly to verified specialists while keeping student tutoring and rapid triage accessible in Indian Rupees.
            </p>
          </div>

          <button
            onClick={onOpenFreelancerModal}
            className="self-start md:self-auto px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 hover:bg-slate-200 text-xs font-mono font-bold transition-colors cursor-pointer shrink-0"
          >
            Become a Verified Specialist &rarr;
          </button>
        </div>

        {/* Visual 85% / 15% Split Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-700 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Specialist Retains: 85% Take-Home
            </span>
            <span className="text-sky-800 font-bold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-sky-700" />
              CyHub Platform Take-Rate: 15%
            </span>
          </div>

          <div className="w-full h-5 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex">
            <div 
              style={{ width: '85%' }} 
              className="bg-emerald-600 h-full flex items-center justify-center text-[10px] font-mono font-bold text-white uppercase tracking-wider"
            >
              85% Specialist Earnings
            </div>
            <div 
              style={{ width: '15%' }} 
              className="bg-sky-600 h-full flex items-center justify-center text-[10px] font-mono font-bold text-white uppercase tracking-wider"
            >
              15%
            </div>
          </div>
        </div>

        {/* Breakdown Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Pay-As-You-Go Tutoring</div>
            <div className="text-base font-bold font-mono text-slate-900">₹499 – ₹1,499 <span className="text-xs text-slate-500 font-normal">/ 30-min slot</span></div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Transparent per-slot pricing based on instructor credentials (Security+, CEH, OSCP, CISSP). Zero recurring subscription fees for students.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Security Starter Bundle</div>
            <div className="text-base font-bold font-mono text-sky-800">₹2,999 <span className="text-xs text-slate-500 font-normal">fixed-scope</span></div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Fixed-scope onboarding for MSMEs: password manager deployment, hardware 2FA enforcement, and attack surface baseline report.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold">What CyHub's 15% Covers</div>
            <div className="text-base font-bold font-mono text-emerald-800">Escrow & Labs</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Funds zero-interest escrow payment vault, cloud cyber range GPU hosting, student-mentor matching, and free dispute mediation.
            </p>
          </div>
        </div>
      </div>

      {/* =======================================================================
          3. INTERACTIVE REVENUE CALCULATOR WIDGET (IN INR ₹)
          ======================================================================= */}
      <div className="mt-14 rounded-xl border border-slate-200 bg-white shadow-sm p-6 sm:p-7 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Interactive Revenue Calculator Widget
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Model CyHub's Gross Merchandise Value (GMV) and platform revenue based on take-rate metrics.
              </p>
            </div>
          </div>

          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-bold self-start md:self-auto">
            Academic Pitch Deck Model (INR ₹)
          </span>
        </div>

        {/* Sliders & Output Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
          {/* Sliders Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Slider 1: Monthly Active MSMEs */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-700 font-bold flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-sky-700" />
                  Monthly Active MSMEs:
                </span>
                <span className="text-sm font-extrabold text-slate-900 font-mono">
                  {activeMsmes} <span className="text-xs text-slate-500 font-normal">businesses</span>
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                step="5"
                value={activeMsmes}
                onChange={(e) => setActiveMsmes(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>10 (Seed)</span>
                <span>150 (Growth)</span>
                <span>300 (Scale)</span>
              </div>
            </div>

            {/* Slider 2: Average Project Value (INR) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-700 font-bold flex items-center gap-1.5">
                  <span className="text-emerald-700 font-bold">₹</span>
                  Average Security Project Value:
                </span>
                <span className="text-sm font-extrabold text-emerald-800 font-mono">
                  ₹{avgProjectValue.toLocaleString('en-IN')} <span className="text-xs text-slate-500 font-normal">/ project</span>
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="50000"
                step="1000"
                value={avgProjectValue}
                onChange={(e) => setAvgProjectValue(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>₹5,000 (Triage Scan)</span>
                <span>₹25,000 (Web Pentest)</span>
                <span>₹50,000 (Full DPDP Audit)</span>
              </div>
            </div>

            {/* Slider 3: Monthly Tutoring Sessions */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-700 font-bold flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-sky-700" />
                  Monthly 1-on-1 Student Tutoring Sessions:
                </span>
                <span className="text-sm font-extrabold text-slate-900 font-mono">
                  {monthlyTutoringSessions} <span className="text-xs text-slate-500 font-normal">sessions (@ ₹800 avg)</span>
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={monthlyTutoringSessions}
                onChange={(e) => setMonthlyTutoringSessions(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>20 sessions</span>
                <span>250 sessions</span>
                <span>500 sessions</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-600">
              💡 <em>Formula:</em> Total Monthly GMV = (MSMEs × Avg Project Value) + (Sessions × ₹800). CyHub retains a transparent 15% platform take-rate plus recurring SaaS subscription revenue.
            </div>
          </div>

          {/* Right Column: Calculated Revenue Display (5 Cols) */}
          <div className="lg:col-span-5 p-5 rounded-xl bg-slate-900 text-white space-y-4 shadow-sm">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Projected Monthly Financials (INR)
            </div>

            <div className="space-y-1">
              <div className="text-xs font-mono text-slate-400">Estimated CyHub Monthly Platform Revenue:</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-mono flex items-baseline">
                ₹{Math.round(calculations.totalMonthlyRevenue).toLocaleString('en-IN')}
                <span className="text-xs text-slate-400 font-normal font-sans ml-1">/ month</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-mono">
                15% Take-Rate (₹{Math.round(calculations.monthlyCommissionRevenue).toLocaleString('en-IN')}) + SaaS (₹{Math.round(calculations.monthlySaasRevenue).toLocaleString('en-IN')})
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-slate-300">
                <span>Monthly Platform GMV:</span>
                <span className="font-bold text-white">₹{Math.round(calculations.totalMonthlyGmv).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Annualized Run Rate (ARR):</span>
                <span className="font-bold text-amber-400">₹{Math.round(calculations.annualizedRunRate).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Specialist Payouts (85%):</span>
                <span className="font-bold text-emerald-400">₹{Math.round(calculations.specialistMonthlyEarnings).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={onOpenIntakeWizard}
              className="w-full py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs font-mono transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Test Matching Diagnostic</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* =======================================================================
          4. ENTERPRISE & INVESTOR FAQ ACCORDION
          ======================================================================= */}
      <div className="mt-14 space-y-5">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-slate-700" />
          <h3 className="text-xl font-bold text-slate-900 font-heading">
            Enterprise & Investor Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-lg border border-slate-200 bg-white overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm font-bold text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
