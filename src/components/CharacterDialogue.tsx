import React, { useState, useEffect } from 'react';
import { CHARACTERS } from '../data/characters';
import { ChevronRight, FastForward } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface DialogueLine {
  speakerId: string;
  text: string;
}

interface CharacterDialogueProps {
  lines: DialogueLine[];
  onComplete: () => void;
}

export const CharacterDialogue: React.FC<CharacterDialogueProps> = ({ lines, onComplete }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const currentLine = lines[currentLineIndex] || lines[0];
  const character = CHARACTERS[currentLine?.speakerId] || CHARACTERS['vance'];

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let charIdx = 0;
    const fullText = currentLine.text;

    const timer = setInterval(() => {
      if (charIdx < fullText.length) {
        setDisplayedText(fullText.substring(0, charIdx + 1));
        if (charIdx % 3 === 0) {
          soundEngine.playBlip(character.pitchOffset);
        }
        charIdx++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [currentLineIndex, currentLine]);

  const handleNext = () => {
    soundEngine.playBlip();
    if (isTyping) {
      setDisplayedText(currentLine.text);
      setIsTyping(false);
    } else if (currentLineIndex < lines.length - 1) {
      setCurrentLineIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    soundEngine.playBlip();
    onComplete();
  };

  const themeBorderClasses: Record<string, string> = {
    cyan: 'border-cyan-500/50 shadow-cyan-950/50 text-cyan-400 bg-cyan-950/30',
    amber: 'border-amber-500/50 shadow-amber-950/50 text-amber-400 bg-amber-950/30',
    emerald: 'border-emerald-500/50 shadow-emerald-950/50 text-emerald-400 bg-emerald-950/30',
    rose: 'border-rose-500/50 shadow-rose-950/50 text-rose-400 bg-rose-950/30',
  };

  const currentTheme = themeBorderClasses[character.themeColor] || themeBorderClasses.cyan;

  return (
    <div className={`relative cyber-box rounded-xl p-4 md:p-5 border-2 transition-all ${currentTheme}`}>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        
        {/* Avatar Graphic */}
        <div className="relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 border-slate-700 bg-slate-900 shadow-md">
          <div dangerouslySetInnerHTML={{ __html: character.avatarSvg }} className="w-full h-full" />
          <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[10px] font-mono text-center py-0.5 text-slate-300">
            {character.role.split(' ')[0]}
          </div>
        </div>

        {/* Text Area */}
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div>
              <span className="font-title text-sm font-bold tracking-wide text-slate-100">{character.name}</span>
              <span className="ml-2 text-xs font-sub text-slate-400 font-medium">({character.role})</span>
            </div>

            <button
              onClick={handleSkip}
              className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-slate-200 px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 transition-colors"
            >
              <span>SKIP</span>
              <FastForward className="w-3 h-3" />
            </button>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed font-sans min-h-[48px] bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            {displayedText}
            {isTyping && <span className="inline-block w-2 h-4 ml-1 bg-cyan-400 animate-pulse" />}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex justify-end mt-3">
        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-mono text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-md shadow-cyan-500/20 hover:scale-105"
        >
          <span>{currentLineIndex < lines.length - 1 ? 'CONTINUE' : 'START LESSON'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
