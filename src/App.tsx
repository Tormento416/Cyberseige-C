import { useState } from 'react';
import { MODULES } from './data/modules';
import { Navbar } from './components/Navbar';
import { CharacterDialogue } from './components/CharacterDialogue';
import { BattleCanvas } from './components/BattleCanvas';
import { CodeEditor } from './components/CodeEditor';
import { MemoryVisualizer } from './components/MemoryVisualizer';
import { VictoryCutscene } from './components/VictoryCutscene';
import { ConceptGuide } from './components/ConceptGuide';
import { FinalToolBuilder } from './components/FinalToolBuilder';
import { soundEngine } from './utils/audio';
import { MemoryBlock, SimulationResult } from './utils/cppInterpreter';
import { Zap, ChevronRight, Award, Shield } from 'lucide-react';

export function App() {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>([]);
  const [showVictoryCutscene, setShowVictoryCutscene] = useState(false);
  const [showConceptGuide, setShowConceptGuide] = useState(false);
  const [isDialogueActive, setIsDialogueActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const [currentMemoryState, setCurrentMemoryState] = useState<MemoryBlock[]>([]);
  const [currentFormulaNote, setCurrentFormulaNote] = useState<string | undefined>(undefined);

  const activeModule = MODULES[currentModuleIndex] || MODULES[0];

  const handleSelectModule = (index: number) => {
    setCurrentModuleIndex(index);
    setIsDialogueActive(true);
    setShowVictoryCutscene(false);
    setCurrentMemoryState([]);
    setCurrentFormulaNote(undefined);
  };

  const handleToggleMute = () => {
    const nextMuteState = !isMuted;
    setIsMuted(nextMuteState);
    soundEngine.setMuted(nextMuteState);
  };

  const handleCodeSuccess = (evalResult: SimulationResult) => {
    setCurrentMemoryState(evalResult.memoryState);
    setCurrentFormulaNote(evalResult.formulaNote);

    if (!completedModuleIds.includes(activeModule.id)) {
      setCompletedModuleIds(prev => [...prev, activeModule.id]);
    }

    // Trigger end of level animated victory sequence
    if (activeModule.id !== 'module-final-tool') {
      setTimeout(() => {
        setShowVictoryCutscene(true);
      }, 800);
    }
  };

  const handleNextModuleFromVictory = () => {
    setShowVictoryCutscene(false);
    if (currentModuleIndex < MODULES.length - 1) {
      handleSelectModule(currentModuleIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans scanline-effect selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar
        currentModuleIndex={currentModuleIndex}
        completedModuleIds={completedModuleIds}
        totalModules={MODULES.length}
        onSelectModule={handleSelectModule}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenConceptGuide={() => setShowConceptGuide(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        
        {/* Module Header Banner */}
        <div className="cyber-box rounded-2xl p-5 md:p-6 border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/40">
                MODULE {activeModule.number} OF {MODULES.length}
              </span>
              {completedModuleIds.includes(activeModule.id) && (
                <span className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                  <Award className="w-3.5 h-3.5" />
                  <span>UNLOCKED</span>
                </span>
              )}
            </div>
            <h1 className="text-xl md:text-2xl font-bold font-title text-slate-100 glow-cyan">
              {activeModule.title}: {activeModule.subtitle}
            </h1>
            <p className="text-xs md:text-sm text-slate-300 font-sub max-w-2xl leading-relaxed">
              {activeModule.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block font-mono text-xs">
              <div className="text-slate-400">TARGET WEAPON</div>
              <div className="text-cyan-300 font-bold">{activeModule.weaponName}</div>
            </div>
            <div className="p-3 rounded-xl bg-cyan-950 border border-cyan-400 text-cyan-400 shadow-md shadow-cyan-500/30">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Character Dialogue Section */}
        {isDialogueActive && activeModule.briefingDialogue.length > 0 && (
          <CharacterDialogue
            lines={activeModule.briefingDialogue}
            onComplete={() => setIsDialogueActive(false)}
          />
        )}

        {/* Final Tool Studio View for Mission 6 */}
        {activeModule.id === 'module-final-tool' ? (
          <FinalToolBuilder />
        ) : (
          /* Standard 5 Learning Modules View */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Column: Code Editor & Memory Visualizer */}
            <div className="space-y-6">
              <CodeEditor
                initialCode={activeModule.starterCode}
                testId={activeModule.testId}
                hints={activeModule.hints}
                formulas={activeModule.formulasExplained}
                onCodeSuccess={handleCodeSuccess}
              />

              <MemoryVisualizer
                memoryBlocks={currentMemoryState}
                formulaNote={currentFormulaNote}
              />
            </div>

            {/* Right Column: Battle Grid & Concepts */}
            <div className="space-y-6">
              <BattleCanvas
                unlockedWeaponIds={completedModuleIds}
                activeModuleIndex={currentModuleIndex}
              />

              {/* Concepts Summary Card */}
              <div className="cyber-box rounded-xl p-4 border border-slate-800 bg-slate-950/80 space-y-3">
                <h3 className="text-xs font-bold font-title text-amber-300 flex items-center gap-2 uppercase tracking-wider">
                  <Shield className="w-4 h-4 text-amber-400" />
                  Key C++ Core Concepts in this Module
                </h3>
                <ul className="space-y-2 text-xs font-mono text-slate-300">
                  {activeModule.conceptsLearned.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-900/80 p-2 rounded border border-slate-800">
                      <ChevronRight className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Victory Cutscene Modal */}
      {showVictoryCutscene && (
        <VictoryCutscene
          moduleId={activeModule.id}
          onNextModule={handleNextModuleFromVictory}
        />
      )}

      {/* Concept Guide Drawer Modal */}
      <ConceptGuide
        isOpen={showConceptGuide}
        onClose={() => setShowConceptGuide(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800 py-4 px-6 text-center text-xs font-mono text-slate-500">
        CyberSiege: C++ Anti-Robot Defense Command &copy; 2026. Powered by Resistance Tech.
      </footer>
    </div>
  );
}
