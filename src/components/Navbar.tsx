import React from 'react';
import { Shield, Volume2, VolumeX, ArrowLeft, Terminal, Cpu, Award } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface NavbarProps {
  currentModuleIndex: number;
  completedModuleIds: string[];
  totalModules: number;
  onSelectModule: (index: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenConceptGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentModuleIndex,
  completedModuleIds,
  totalModules,
  onSelectModule,
  isMuted,
  onToggleMute,
  onOpenConceptGuide,
}) => {
  const completionPercentage = Math.round((completedModuleIds.length / totalModules) * 100);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-cyan-500/30 px-4 py-3 shadow-lg shadow-cyan-950/40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left Section: Return Home & Brand */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <a
            href="https://tormento-learning-games.vercel.app/"
            onClick={() => soundEngine.playBlip()}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-300 hover:text-white bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 hover:border-cyan-400 px-3.5 py-1.5 rounded-lg transition-all shadow-md shadow-cyan-950/50 hover:shadow-cyan-500/30 hover:scale-105"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
            <span>&lt; Return Home</span>
          </a>

          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-400 shadow-md shadow-cyan-500/30">
              <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-wider text-slate-100 font-title flex items-center gap-2">
                <span>CYBERSIEGE</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">C++ COMMAND</span>
              </h1>
              <p className="text-[11px] text-slate-400 font-sub tracking-wide">Anti-Robot Tactical Defense System</p>
            </div>
          </div>
        </div>

        {/* Center Section: Progress & Quick Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full no-scrollbar">
          {Array.from({ length: totalModules }).map((_, idx) => {
            const isCompleted = completedModuleIds.includes(`module-${idx + 1}`) || (idx === 5 && completedModuleIds.length >= 5);
            const isActive = currentModuleIndex === idx;

            return (
              <button
                key={idx}
                onClick={() => {
                  soundEngine.playBlip();
                  onSelectModule(idx);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30 scale-105'
                    : isCompleted
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/60'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span>M{idx + 1}</span>
                {isCompleted && <Award className="w-3 h-3 text-emerald-400" />}
              </button>
            );
          })}
        </div>

        {/* Right Section: Controls & Concept Guide */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={() => {
              soundEngine.playBlip();
              onOpenConceptGuide();
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/40 px-3 py-1.5 rounded-lg transition-all shadow-sm hover:shadow-amber-500/20"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>C++ Guide</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            className="p-1.5 text-slate-300 hover:text-cyan-400 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-all"
            title={isMuted ? 'Unmute SFX' : 'Mute SFX'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Progress Bar */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-cyan-300">{completionPercentage}%</span>
          </div>
        </div>

      </div>
    </header>
  );
};
