import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Star, 
  CheckCircle, 
  MapPin, 
  ShieldCheck, 
  ChevronRight, 
  Calendar, 
  BookOpen,
  Filter
} from 'lucide-react';
import type { Expert, RoleType, Specialization } from '../types';

interface MarketplaceDirectoryProps {
  experts: Expert[];
  onSelectExpert: (expert: Expert, sessionType: 'consultation' | 'mentorship-class' | 'rapid-triage') => void;
  onOpenIntakeWizard: () => void;
}

export const MarketplaceDirectory: React.FC<MarketplaceDirectoryProps> = ({
  experts,
  onSelectExpert,
  onOpenIntakeWizard,
}) => {
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedSpec, setSelectedSpec] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedExpertId, setExpandedExpertId] = useState<string | null>(null);

  const specializationsList: Specialization[] = [
    'Penetration Testing',
    'Compliance/ISO27001',
    'Phishing Defense',
    'Network Hardening',
    'Python Tooling',
    'Cloud Security',
    'AppSec/OWASP',
    'Incident Response',
  ];

  // Filtering
  const filteredExperts = useMemo(() => {
    return experts.filter((exp) => {
      if (selectedRole !== 'all') {
        if (!exp.roles.includes(selectedRole as RoleType)) return false;
      }

      if (selectedSpec !== 'all') {
        if (!exp.specializations.includes(selectedSpec as Specialization)) return false;
      }

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = exp.name.toLowerCase().includes(q);
        const matchesTitle = exp.title.toLowerCase().includes(q);
        const matchesBio = exp.bio.toLowerCase().includes(q);
        const matchesCerts = exp.certifications.some((c) => c.toLowerCase().includes(q));
        const matchesLocation = exp.location.toLowerCase().includes(q);
        if (!matchesName && !matchesTitle && !matchesBio && !matchesCerts && !matchesLocation) {
          return false;
        }
      }

      return true;
    });
  }, [experts, selectedRole, selectedSpec, searchQuery]);

  const resetFilters = () => {
    setSelectedRole('all');
    setSelectedSpec('all');
    setSearchQuery('');
  };

  return (
    <section id="marketplace" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-700 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-sky-700" />
            <span>Verified Specialist Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 font-heading">
            Find Verified Cybersecurity Specialists
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Pre-vetted freelance consultants, DPDP Act auditors, and technical mentors available for direct consultation.
          </p>
        </div>

        <button
          onClick={onOpenIntakeWizard}
          className="self-start md:self-auto px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-semibold transition-colors cursor-pointer border border-slate-200"
        >
          Need AI Matching? Start Intake Wizard &rarr;
        </button>
      </div>

      {/* Filter Chips Bar */}
      <div className="mt-6 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, certification (CISSP, OSCP), or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs focus:outline-none focus:border-slate-400 placeholder:text-slate-400"
            />
          </div>

          {/* Role Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Specialists' },
              { id: 'consultant', label: 'Consultants & Auditors' },
              { id: 'tutor', label: '1-on-1 Tutors' },
              { id: 'dev', label: 'Security Developers' },
            ].map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedRole === role.id
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>
        </div>

        {/* Specialization Filter Row */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs font-mono">
          <span className="text-slate-500 mr-1 font-sans">Domain:</span>
          <button
            onClick={() => setSelectedSpec('all')}
            className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
              selectedSpec === 'all'
                ? 'bg-sky-100 text-sky-800 font-bold border border-sky-300'
                : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Domains
          </button>
          {specializationsList.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpec(spec)}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                selectedSpec === spec
                  ? 'bg-sky-100 text-sky-800 font-bold border border-sky-300'
                  : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 font-mono">
        <div>
          Showing <span className="text-slate-900 font-bold">{filteredExperts.length}</span> verified specialists across India
        </div>
        {(selectedRole !== 'all' || selectedSpec !== 'all' || searchQuery !== '') && (
          <button
            onClick={resetFilters}
            className="text-sky-700 hover:underline cursor-pointer font-sans"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Specialists Cards Grid */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredExperts.map((exp) => {
          const isExpanded = expandedExpertId === exp.id;

          return (
            <div 
              key={exp.id}
              className="card-executive p-5 sm:p-6 flex flex-col justify-between"
            >
              <div>
                {/* Specialist Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={exp.avatar} 
                      alt={exp.name} 
                      className="w-13 h-13 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-bold text-slate-900">
                          {exp.name}
                        </h3>
                        {exp.verified && (
                          <span title="CyHub Verified Specialist">
                            <CheckCircle className="w-4 h-4 fill-emerald-600 text-white" />
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 font-mono flex items-center gap-2 mt-0.5">
                        <span>{exp.handle}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hourly / Session Rate & Rating */}
                  <div className="text-right">
                    <div className="text-lg sm:text-xl font-extrabold text-slate-900 font-mono">
                      ₹{exp.hourlyRate.toLocaleString('en-IN')}
                      <span className="text-xs text-slate-500 font-normal font-sans ml-1">
                        {exp.roles.includes('tutor') && !exp.roles.includes('consultant') ? '/30-min' : '/session'}
                      </span>
                    </div>
                    <div className="flex items-center justify-end gap-1 text-xs text-slate-600 mt-0.5">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span className="font-bold text-slate-800">{exp.rating.toFixed(2)}</span>
                      <span className="text-slate-400 text-[11px]">({exp.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                {/* Title & Bio */}
                <div className="mt-3">
                  <div className="text-xs font-semibold text-sky-800">
                    {exp.title}
                  </div>
                  <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {exp.bio}
                  </p>
                </div>

                {/* Verified Credential Badges */}
                <div className="mt-3 flex flex-wrap gap-1.5 items-center">
                  {exp.certifications.map((cert) => (
                    <span 
                      key={cert} 
                      className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {cert}
                    </span>
                  ))}
                  {exp.specializations.map((spec) => (
                    <span 
                      key={spec} 
                      className="px-2 py-0.5 rounded text-[10px] font-sans text-slate-500 bg-slate-50 border border-slate-100"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Key Metrics */}
                <div className="mt-3.5 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="bg-slate-50 py-1.5 rounded border border-slate-100">
                    <div className="text-slate-900 font-bold">{exp.completedAudits}</div>
                    <div className="text-[10px] text-slate-500">Audits Done</div>
                  </div>
                  <div className="bg-slate-50 py-1.5 rounded border border-slate-100">
                    <div className="text-slate-900 font-bold">{exp.tutoringHours} hrs</div>
                    <div className="text-[10px] text-slate-500">Mentored</div>
                  </div>
                  <div className="bg-slate-50 py-1.5 rounded border border-slate-100">
                    <div className="text-emerald-700 font-bold">{exp.responseTime}</div>
                    <div className="text-[10px] text-slate-500">Avg Triage</div>
                  </div>
                </div>

                {/* Expandable Fixed Packages */}
                {isExpanded && (
                  <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-3">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-sky-700" /> Fixed-Price Packages (Escrow Protected)
                    </div>
                    <div className="space-y-2">
                      {exp.packages.map((pkg) => (
                        <div key={pkg.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">{pkg.title}</span>
                            <span className="text-xs font-mono font-bold text-sky-800">
                              ₹{pkg.price.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-1">{pkg.description}</p>
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {pkg.features.slice(0, 2).map((f, i) => (
                              <span key={i} className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 font-mono">
                                ✓ {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setExpandedExpertId(isExpanded ? null : exp.id)}
                  className="text-xs text-slate-500 hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 font-mono"
                >
                  <span>{isExpanded ? 'Hide Packages' : 'View Packages'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>

                <div className="flex items-center gap-2">
                  {exp.roles.includes('tutor') && (
                    <button
                      onClick={() => onSelectExpert(exp, 'mentorship-class')}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>Book Slot</span>
                    </button>
                  )}

                  <button
                    onClick={() => onSelectExpert(exp, 'consultation')}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                    <span>Schedule Consultation</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
