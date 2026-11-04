import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle, 
  ShieldCheck, 
  Code2,
  Globe
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Expert, Specialization } from '../types';

interface FreelancerOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterExpert: (newExpert: Expert) => void;
}

export const FreelancerOnboardingModal: React.FC<FreelancerOnboardingModalProps> = ({
  isOpen,
  onClose,
  onRegisterExpert,
}) => {
  // Form fields
  const [fullName, setFullName] = useState<string>('Suresh Nair');
  const [handle, setHandle] = useState<string>('@suresh_defense');
  const [title, setTitle] = useState<string>('Cloud Pentester & Python Tool Builder');
  const [hourlyRate, setHourlyRate] = useState<number>(999);
  const [location, setLocation] = useState<string>('Chennai, Tamil Nadu');
  const [bio, setBio] = useState<string>(
    'Offensive Kubernetes security and AWS IAM specialist. I mentor engineering students on OSCP methodology and build automated vulnerability scanning scripts in Python.'
  );

  // Services offered toggles
  const [serviceConsulting, setServiceConsulting] = useState<boolean>(true);
  const [serviceTutoring, setServiceTutoring] = useState<boolean>(true);
  const [serviceTooling, setServiceTooling] = useState<boolean>(true);

  // Specializations & Certifications
  const [primarySpec, setPrimarySpec] = useState<Specialization>('Cloud Security');
  const [certificationsText, setCertificationsText] = useState<string>('OSCP, AWS Security, CEH');
  const [githubUrl, setGithubUrl] = useState<string>('https://github.com/example/sec-tools');
  const [linkedinUrl, setLinkedinUrl] = useState<string>('https://linkedin.com/in/example');

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const roles: ('consultant' | 'tutor' | 'dev')[] = [];
    if (serviceConsulting) roles.push('consultant');
    if (serviceTutoring) roles.push('tutor');
    if (serviceTooling) roles.push('dev');

    const certsArray = certificationsText
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    const newExpert: Expert = {
      id: `exp-${Date.now()}`,
      name: fullName,
      handle,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      title,
      bio,
      verified: true, // Auto-verified for interactive demo
      rating: 5.0,
      reviewsCount: 1,
      hourlyRate,
      roles: roles.length > 0 ? roles : ['consultant'],
      specializations: [primarySpec],
      certifications: certsArray.length > 0 ? certsArray : ['CyHub Verified'],
      location,
      timezone: 'IST (UTC+5:30)',
      responseTime: '< 30 min',
      completedAudits: 1,
      tutoringHours: 0,
      toolsBuilt: serviceTooling ? 3 : 0,
      isAvailableToday: true,
      packages: [
        {
          id: `pkg-${Date.now()}`,
          title: 'Initial Security Audit & Vulnerability Triage',
          price: hourlyRate * 2,
          deliveryTime: '2 Days',
          description: 'Initial reconnaissance scan, configuration review, and comprehensive remediation debrief.',
          features: ['Perimeter Vulnerability Scan', 'Executive Posture Report', '1-on-1 Remediation Debrief']
        }
      ],
      reviews: [
        {
          id: `rev-${Date.now()}`,
          author: 'CyHub Verification Board',
          clientType: 'Enterprise',
          rating: 5,
          date: 'Just now',
          comment: 'Credentials, government ID, and practical code assessment verified by CyHub Review Council.'
        }
      ],
      githubUrl,
      linkedinUrl,
    };

    onRegisterExpert(newExpert);
    setIsSuccess(true);
    try {
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-xl bg-white border border-slate-200 shadow-2xl modal-content overflow-hidden my-8">
        {/* Modal Header */}
        <div className="p-5 pb-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
              <ShieldCheck className="w-5 h-5 text-sky-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Specialist Registration &amp; Accreditation
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Join India's verified cybersecurity talent network • Keep 85% of your fees
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

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {isSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Application Approved &amp; Published!</h4>
              <p className="text-slate-600 text-xs leading-relaxed max-w-md mx-auto">
                Welcome to CyHub, <strong className="text-slate-900">{fullName}</strong>! Your specialist profile is now listed in the verified marketplace directory. MSMEs and students can immediately book consultations and tutoring slots with you.
              </p>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer shadow-xs"
                >
                  View Your Live Profile in Directory
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-mono text-slate-700 font-bold mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-slate-400 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 font-bold mb-1">
                    Profile Handle *
                  </label>
                  <input
                    type="text"
                    required
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-slate-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 font-bold mb-1">
                  Professional Title / Role *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-slate-400 font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-mono text-slate-700 font-bold mb-1">
                    Session Fee (INR ₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={499}
                    max={10000}
                    step={50}
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-slate-400 font-mono"
                  />
                  <span className="text-[10px] text-slate-500 font-mono">You keep 85% (₹{Math.round(hourlyRate * 0.85).toLocaleString('en-IN')})</span>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 font-bold mb-1">
                    Location in India *
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-slate-400 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 font-bold mb-1">
                  Professional Bio &amp; Technical Capabilities *
                </label>
                <textarea
                  rows={2}
                  required
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-slate-400 font-sans"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 font-bold mb-1">
                  Certifications (comma-separated):
                </label>
                <input
                  type="text"
                  value={certificationsText}
                  onChange={(e) => setCertificationsText(e.target.value)}
                  placeholder="CISSP, OSCP, CEH, DPDP Lead Auditor"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-slate-400 font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs font-mono cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs font-mono shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                  <span>Submit Specialist Application</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
