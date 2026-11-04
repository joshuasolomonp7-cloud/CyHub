import React from 'react';

interface CyHubLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  variant?: 'horizontal' | 'stacked' | 'icon-only';
  className?: string;
  glow?: boolean;
}

export const CyHubLogo: React.FC<CyHubLogoProps> = ({ 
  size = 'md', 
  showTagline = false,
  variant = 'horizontal',
  className = '',
  glow = true
}) => {
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const wordmarkHeights = {
    sm: 'h-5',
    md: 'h-6 sm:h-7',
    lg: 'h-9',
    xl: 'h-12',
  };

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        <div className="relative group">
          <img
            src="/cyhub-logo-stacked.png"
            alt="CyHub Logo"
            className={`${size === 'xl' ? 'w-44' : size === 'lg' ? 'w-32' : 'w-24'} object-contain filter ${
              glow ? 'drop-shadow-[0_0_15px_rgba(0,245,255,0.4)]' : ''
            } transition-transform duration-300 group-hover:scale-105`}
          />
        </div>
        {showTagline && (
          <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase mt-2">
            Two-Sided Cyber Ecosystem
          </span>
        )}
      </div>
    );
  }

  if (variant === 'icon-only') {
    return (
      <div className={`relative flex items-center justify-center select-none ${className}`}>
        <img
          src="/cyhub-icon-cyan.png"
          alt="CyHub Icon"
          className={`${iconDimensions[size]} object-contain filter ${
            glow ? 'drop-shadow-[0_0_12px_rgba(0,245,255,0.45)]' : ''
          } transition-transform duration-300 hover:scale-105`}
        />
        <span className="absolute -top-1 -right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
      </div>
    );
  }

  // Default: Horizontal (Icon mark + Exact Wordmark)
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Original Bridge/Lock Cyber Emblem */}
      <div className="relative flex items-center justify-center shrink-0">
        <img
          src="/cyhub-icon-cyan.png"
          alt="CyHub Bridge Lock Emblem"
          className={`${iconDimensions[size]} object-contain filter ${
            glow ? 'drop-shadow-[0_0_14px_rgba(0,245,255,0.45)]' : ''
          } transition-transform duration-300 hover:scale-105`}
        />
        {/* Pulsing Live Beacon */}
        <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
        </span>
      </div>

      {/* Typography: Exact Original Wordmark Image + Live Cyber Badge */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <img
            src="/cyhub-wordmark.png"
            alt="CyHub"
            className={`${wordmarkHeights[size]} w-auto object-contain filter brightness-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]`}
          />
          <span className="hidden sm:inline-block text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 uppercase tracking-widest">
            v2.4
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase mt-0.5 hidden sm:block">
            Two-Sided Cyber Ecosystem
          </span>
        )}
      </div>
    </div>
  );
};
