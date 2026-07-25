import React, { useState } from 'react';
import { Play, RotateCcw, HelpCircle, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { evaluateCppCode, SimulationResult } from '../utils/cppInterpreter';
import { soundEngine } from '../utils/audio';

interface CodeEditorProps {
  initialCode: string;
  testId: string;
  hints: string[];
  formulas: { concept: string; formula: string; explanation: string }[];
  onCodeSuccess: (result: SimulationResult) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  testId,
  hints,
  formulas,
  onCodeSuccess,
}) => {
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [showHints, setShowHints] = useState(false);

  const handleRun = () => {
    soundEngine.playBlip();
    const evalResult = evaluateCppCode(code, testId);
    setResult(evalResult);

    if (evalResult.success) {
      soundEngine.playSuccess();
      onCodeSuccess(evalResult);
    } else {
      soundEngine.playFailure();
    }
  };

  const handleReset = () => {
    soundEngine.playBlip();
    setCode(initialCode);
    setResult(null);
  };

  return (
    <div className="cyber-box rounded-xl p-4 border border-slate-800 bg-slate-950/80 flex flex-col gap-3">
      {/* Editor Top Bar */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <h3 className="text-xs font-bold font-title uppercase tracking-wider text-slate-200">
            C++ Tactical Compiler Workspace
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundEngine.playBlip();
              setShowHints(!showHints);
            }}
            className="flex items-center gap-1 text-[11px] font-mono text-amber-300 bg-amber-950/60 hover:bg-amber-900/60 border border-amber-500/40 px-2.5 py-1 rounded transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>HINTS</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] font-mono text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 px-2.5 py-1 rounded transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET</span>
          </button>
          <button
            onClick={handleRun}
            className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 px-4 py-1 rounded transition-all shadow-md shadow-cyan-500/20 hover:scale-105"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            <span>EXECUTE C++ CODE</span>
          </button>
        </div>
      </div>

      {/* Hints & Formula Panel */}
      {showHints && (
        <div className="bg-amber-950/30 border border-amber-500/30 p-3 rounded-lg text-xs space-y-2 text-amber-200 font-mono">
          <div className="font-bold flex items-center gap-1.5 text-amber-300">
            <Info className="w-4 h-4 text-amber-400" />
            <span>TACTICAL HINTS & FORMULAS</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
            {hints.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
          {formulas.map((f, i) => (
            <div key={i} className="bg-slate-950/80 p-2 rounded border border-amber-500/20 text-[11px]">
              <span className="text-amber-400 font-bold">{f.concept}: </span>
              <code className="text-cyan-300">{f.formula}</code>
              <p className="text-slate-400 mt-0.5">{f.explanation}</p>
            </div>
          ))}
        </div>
      )}

      {/* Code Textarea */}
      <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-950 font-code text-xs">
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          spellCheck={false}
          className="w-full h-72 p-3 bg-transparent text-slate-100 focus:outline-none resize-none font-code leading-relaxed selection:bg-cyan-500 selection:text-slate-950"
        />
      </div>

      {/* Diagnostic Output Console */}
      {result && (
        <div
          className={`p-3 rounded-lg border font-mono text-xs ${
            result.success
              ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/50 border-rose-500/40 text-rose-200'
          }`}
        >
          <div className="flex items-center gap-2 mb-1.5 font-bold">
            {result.success ? (
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400" />
            )}
            <span>{result.success ? 'C++ COMPILATION & UNIT TESTS PASSED' : 'COMPILATION DIAGNOSTIC ERROR'}</span>
          </div>
          <pre className="text-[11px] whitespace-pre-wrap leading-relaxed opacity-90">{result.output}</pre>
        </div>
      )}
    </div>
  );
};
