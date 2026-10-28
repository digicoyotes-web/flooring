import React from 'react';
import { Box, Cpu, Sparkles, FileText, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentView: 'showroom' | 'agents';
  onViewChange: (view: 'showroom' | 'agents') => void;
  onRequestSample: () => void;
  onOpenQuotationAgent: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  onRequestSample,
  onOpenQuotationAgent,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo: WE FLOORS with Aqua accent */}
          <div 
            onClick={() => onViewChange('showroom')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 via-cyan-600 to-teal-700 text-white flex items-center justify-center font-black tracking-wider text-base shadow-md shadow-cyan-500/25 border border-cyan-300/40 group-hover:scale-105 transition-transform">
              WE
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-luxury font-black text-2xl text-stone-950 tracking-tight">
                  WE FLOORS
                </span>
                <span className="text-[10px] font-mono-accent font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200/80">
                  Haute Surfaces
                </span>
              </div>
              <p className="text-[10px] font-mono-accent tracking-wider uppercase text-stone-400 hidden sm:block">
                Architectural Showroom & Autonomous AI Suite
              </p>
            </div>
          </div>

          {/* Center: Simplified Dual View Switcher with Aqua Glow */}
          <div className="flex items-center bg-stone-100/90 p-1.5 rounded-xl border border-stone-200/80 shadow-inner">
            <button
              onClick={() => onViewChange('showroom')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                currentView === 'showroom'
                  ? 'btn-aqua shadow-sm'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-white/80'
              }`}
            >
              <Box className="w-4 h-4" />
              <span>Online Showroom</span>
            </button>

            <button
              onClick={() => onViewChange('agents')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                currentView === 'agents'
                  ? 'btn-aqua shadow-sm'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-white/80'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>AI Agents Hub</span>
              <span className="w-2 h-2 rounded-full bg-white animate-pulse ml-0.5" />
            </button>
          </div>

          {/* Right Action Buttons with Aqua Theme */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenQuotationAgent}
              className="btn-aqua-outline text-xs px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Instant CPQ Quote</span>
            </button>

            <button
              onClick={onRequestSample}
              className="btn-aqua px-5 py-2.5 rounded-xl text-xs inline-flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-100" />
              <span>Free Swatch Box</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
