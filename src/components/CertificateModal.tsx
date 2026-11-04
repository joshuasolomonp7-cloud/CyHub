import React from 'react';
import { 
  X, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Share2, 
  Download, 
  Calendar, 
  Lock, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import type { Expert } from '../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userXP: number;
  onBookTutor: (tutor: Expert) => void;
  tutors: Expert[];
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  userName,
  userXP,
  onBookTutor,
  tutors,
}) => {
  if (!isOpen) return null;

  const defaultTutor = tutors.find(t => t.roles.includes('tutor')) || tutors[0];
  const credentialId = `CYHUB-IN-2026-${Math.abs(userName.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0) % 90000 + 10000)}`;
  const issueDate = 'November 2026';

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`I earned the CyHub Cyber Defense Apprentice Credential with ${userXP} XP! Verified practical defense on CyHub: ${window.location.origin}`);
      alert('Verification link and badge copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay overflow-y-auto bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white border border-slate-200 shadow-2xl modal-content overflow-hidden my-8">
        {/* Subtle top indicator */}
        <div className="h-1 bg-slate-900"></div>

        {/* Modal Header */}
        <div className="p-5 pb-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Verified Skill Credential
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                CyHub Cyber Arcade Hands-On Defense Certification
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

        {/* Certificate Body Container */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Certificate Canvas / Card */}
          <div className="relative rounded-xl bg-slate-50 border-2 border-slate-300 p-6 sm:p-8 shadow-sm overflow-hidden print:border print:border-black print:bg-white">
            {/* Certificate Header */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div className="flex items-center gap-3">
                <img src="/CyHub_Logo_Black.jpg" alt="CyHub Logo" className="h-8 w-auto object-contain" />
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Credential Authority</span>
              </div>
              <div className="text-center sm:text-right font-mono text-xs">
                <div className="text-slate-500 uppercase tracking-wider">Credential ID</div>
                <div className="text-slate-900 font-bold">{credentialId}</div>
              </div>
            </div>

            {/* Certificate Core Information */}
            <div className="relative z-10 py-6 text-center space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Certificate of Practical Competency
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
                CYBER DEFENSE APPRENTICE
              </h2>

              <p className="text-xs text-slate-500 font-mono">
                This verified credential confirms that
              </p>

              <div className="py-1 inline-block">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 border-b-2 border-slate-900 px-6 pb-1 font-heading">
                  {userName || 'Security Defender'}
                </span>
              </div>

              <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
                has successfully triaged real-world social engineering attacks, filtered perimeter network traffic against port exploitation, and remediated injection vulnerabilities on the CyHub Cyber Arcade.
              </p>
            </div>

            {/* Verified Competencies Badges */}
            <div className="relative z-10 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-white border border-slate-200 text-center">
                <div className="text-emerald-700 text-xs font-bold font-mono flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Phishing Triage
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Typosquatting & IoC Analysis</div>
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200 text-center">
                <div className="text-slate-800 text-xs font-bold font-mono flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Firewall Hardening
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Port Filtering & Protocol Policy</div>
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200 text-center">
                <div className="text-slate-800 text-xs font-bold font-mono flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> SQLi Mitigation
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Prepared Statements & Bypass</div>
              </div>
            </div>

            {/* Certificate Footer Stamp */}
            <div className="relative z-10 mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Score: <strong className="text-slate-900 font-bold">{userXP} XP</strong></span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-600">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Issued: {issueDate}</span>
              </div>

              <div className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                <Lock className="w-3 h-3 text-slate-500" /> Verified by CyHub Authority
              </div>
            </div>
          </div>

          {/* Certificate Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" /> Print / Save PDF
              </button>
              <button
                onClick={handleShare}
                className="px-4 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5 text-slate-600" /> Share Credential
              </button>
            </div>

            <span className="text-xs font-mono text-slate-500">
              Score: <strong className="text-slate-900 font-bold">{userXP} XP</strong> Earned
            </span>
          </div>

          {/* Tutor Upsell Card */}
          {defaultTutor && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={defaultTutor.avatar}
                  alt={defaultTutor.name}
                  className="w-12 h-12 rounded-lg object-cover border border-slate-300 shrink-0"
                />
                <div>
                  <div className="text-xs font-mono text-slate-600 uppercase font-bold flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" /> Next Level Mentorship
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                    Prepare for practical certifications or MSME defense
                  </h4>
                  <p className="text-xs text-slate-600">
                    Book a private 1-on-1 session with <strong className="text-slate-900">{defaultTutor.name}</strong> (₹{defaultTutor.hourlyRate}/hr).
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onBookTutor(defaultTutor);
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shrink-0 cursor-pointer shadow-sm"
              >
                <span>Book 1-on-1 Session</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
