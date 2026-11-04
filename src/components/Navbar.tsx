import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Menu, 
  X, 
  Terminal, 
  CreditCard, 
  Users
} from 'lucide-react';

interface NavbarProps {
  onOpenIntakeWizard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenIntakeWizard,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Find Specialists', href: '#marketplace', icon: ShieldCheck },
    { label: 'Interactive Labs', href: '#arcade', icon: Terminal },
    { label: 'Pricing & Plans', href: '#business-model', icon: CreditCard },
    { label: 'About & Team', href: '#team', icon: Users },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 border-b border-slate-200 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Wordmark */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img 
              src={`${import.meta.env.BASE_URL}CyHub_Logo_Black.jpg`} 
              alt="CyHub Logo" 
              className="h-9 w-auto object-contain transition-transform group-hover:scale-102" 
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-800">
                Bridging Security Defense
              </span>
              <span className="text-[10px] text-slate-500 font-sans">
                Academic Pitch Deck Edition
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (4 Core Essential Links Only) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-slate-500" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Single Primary Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={onOpenIntakeWizard}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-sm hover:shadow cursor-pointer flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onOpenIntakeWizard}
              className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-semibold text-xs cursor-pointer"
            >
              Consult
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <Icon className="w-4 h-4 text-sky-600" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenIntakeWizard();
              }}
              className="w-full py-2.5 rounded-lg bg-slate-900 text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Book Security Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
