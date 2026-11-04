import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import { DEMO_PERSONAS } from '../data/mockData';
import type { ActiveUser } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'client' | 'freelancer';
  onSetUser: (user: ActiveUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  mode,
  onSetUser,
}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  if (!isOpen) return null;

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: ActiveUser = {
      persona: mode === 'client' ? 'client' : 'freelancer',
      name: email.split('@')[0] || (mode === 'client' ? 'Business Client' : 'Security Specialist'),
      companyOrRole: mode === 'client' ? 'Verified Business' : 'Cyber Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      badge: mode === 'client' ? 'Client' : 'Freelancer'
    };
    onSetUser(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay overflow-y-auto">
      <div className="relative w-full max-w-md rounded-2xl bg-[#0D1322] border border-cyan-500/30 shadow-[0_0_50px_rgba(0,0,0,0.85)] modal-content overflow-hidden my-8">
        <div className="h-1.5 bg-gradient-to-r from-cyan-500 via-teal-400 to-purple-500"></div>

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/40">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-heading">
                {mode === 'client' ? 'Client Portal Sign In' : 'Freelancer Portal Sign In'}
              </h3>
              <p className="text-xs text-slate-400 font-mono">Secure TLS 1.3 Authentication</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Switcher Section */}
        <div className="p-6 space-y-5">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> 1-Click Demo Login
            </div>
            <p className="text-xs text-slate-400">
              Instantly test CyHub as one of our pre-configured personas:
            </p>
            <div className="grid grid-cols-1 gap-2 pt-1">
              {DEMO_PERSONAS.slice(1).map((p) => (
                <button
                  key={p.persona}
                  onClick={() => {
                    onSetUser(p);
                    onClose();
                  }}
                  className="w-full text-left p-2 rounded-lg bg-slate-800/80 hover:bg-cyan-950/50 border border-slate-700/60 hover:border-cyan-500/50 flex items-center gap-3 transition-all cursor-pointer"
                >
                  <img src={p.avatar} alt={p.name} className="w-7 h-7 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white truncate">{p.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{p.badge} • {p.companyOrRole}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Standard Email/Password Form */}
          <form onSubmit={handleCustomLogin} className="space-y-3.5 pt-1">
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pb-1">
              <span className="w-full border-t border-slate-800"></span>
              <span className="shrink-0 uppercase">or standard sign in</span>
              <span className="w-full border-t border-slate-800"></span>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 font-sans"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer transition-all shadow-[0_0_15px_rgba(0,245,255,0.25)]"
            >
              Sign In to CyHub
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
