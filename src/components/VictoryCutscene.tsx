import React, { useEffect } from 'react';
import { MODULES } from '../data/modules';
import { CHARACTERS } from '../data/characters';
import { soundEngine } from '../utils/audio';
import { Award, Zap, Shield, Bot, Radar, Cpu, ArrowRight, Sparkles } from 'lucide-react';

interface VictoryCutsceneProps {
  moduleId: string;
  onNextModule: () => void;
}

export const VictoryCutscene: React.FC<VictoryCutsceneProps> = ({ moduleId, onNextModule }) => {
  const currentModule = MODULES.find(m => m.id === moduleId) || MODULES[0];
  const victoryData = currentModule.victoryCutscene;
  const speaker = CHARACTERS[currentModule.characterSpeakerId] || CHARACTERS['vance'];

  useEffect(() => {
    soundEngine.playVictoryFanfare();
  }, [moduleId]);

  const weaponIcons: Record<string, React.ReactNode> = {
    Zap: <Zap className="w-10 h-10 text-cyan-400 animate-bounce" />,
    Shield: <Shield className="w-10 h-10 text-emerald-400 animate-pulse" />,
    Bot: <Bot className="w-10 h-10 text-amber-400 animate-bounce" />,
    Radar: <Radar className="w-10 h-10 text-purple-400 animate-spin" />,
    Cpu: <Cpu className="w-10 h-10 text-rose-400 animate-pulse" />,
    Terminal: <Award className="w-10 h-10 text-emerald-300 animate-bounce" />
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg animate-fadeIn">
      <div className="relative w-full max-w-2xl cyber-box rounded-2xl p-6 md:p-8 border-2 border-cyan-400/80 shadow-2xl shadow-cyan-500/30 overflow-hidden">
        
        {/* Ambient Glow & Sparkles */}
        <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-20">
          <Sparkles className="w-40 h-40 text-cyan-400 animate-spin" />
        </div>

        {/* Victory Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold mb-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>MODULE {currentModule.number} COMPLETE</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-title text-cyan-300 glow-cyan tracking-wide">
            {victoryData.title}
          </h2>
        </div>

        {/* Cinematic Weapon Showcase */}
        <div className="bg-slate-950/90 rounded-xl p-5 border border-cyan-500/40 mb-6 flex flex-col md:flex-row items-center gap-5 shadow-inner">
          <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-cyan-950/80 border-2 border-cyan-400 shadow-lg shadow-cyan-500/40 flex-shrink-0">
            {weaponIcons[currentModule.weaponIcon] || <Zap className="w-10 h-10 text-cyan-400" />}
          </div>

          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold font-title text-slate-100 flex items-center justify-center md:justify-start gap-2">
              <span>UNLOCKED: {currentModule.weaponName}</span>
            </h3>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {victoryData.weaponDescription}
            </p>
          </div>
        </div>

        {/* Character Dialogue Action */}
        <div className="flex items-start gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800 mb-6">
          <div className="w-12 h-12 rounded-lg border border-slate-700 overflow-hidden bg-slate-950 flex-shrink-0">
            <div dangerouslySetInnerHTML={{ __html: speaker.avatarSvg }} className="w-full h-full" />
          </div>
          <div>
            <div className="text-xs font-bold font-title text-cyan-300 mb-1">{speaker.name}</div>
            <p className="text-xs text-slate-200 leading-relaxed font-sans italic">
              "{victoryData.actionText}"
            </p>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              soundEngine.playBlip();
              onNextModule();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-sm font-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 shadow-lg shadow-cyan-500/30 transition-all hover:scale-105"
          >
            <span>PROCEED TO NEXT MODULE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
