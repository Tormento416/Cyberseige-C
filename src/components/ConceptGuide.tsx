import React, { useState } from 'react';
import { X, BookOpen, Cpu, Database, Layers, Terminal, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface ConceptGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConceptGuide: React.FC<ConceptGuideProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'basics' | 'memory' | 'oop' | 'stl' | 'modern'>('basics');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl cyber-box rounded-2xl p-6 border-2 border-amber-500/60 shadow-2xl shadow-amber-950/50 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold font-title text-amber-300">
              C++ Tactical Concept & Formula Guide
            </h2>
          </div>
          <button
            onClick={() => {
              soundEngine.playBlip();
              onClose();
            }}
            className="p-1 text-slate-400 hover:text-slate-100 bg-slate-900 border border-slate-700 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 border-b border-slate-800 font-mono text-xs">
          {[
            { id: 'basics', label: '1. Basics & Control' },
            { id: 'memory', label: '2. Memory & Pointers' },
            { id: 'oop', label: '3. OOP & Lifecycles' },
            { id: 'stl', label: '4. STL & Algorithms' },
            { id: 'modern', label: '5. Modern C++20' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => {
                soundEngine.playBlip();
                setActiveTab(t.id as unknown as 'basics');
              }}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === t.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-mono text-slate-200 leading-relaxed">
          {activeTab === 'basics' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5 font-title">
                <Terminal className="w-4 h-4 text-amber-400" />
                Primitive Types & Pass-by-Reference
              </h3>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
                <p><span className="text-cyan-300">sizeof(char) = 1 Byte</span> (Range: -128 to 127 or ASCII character)</p>
                <p><span className="text-cyan-300">sizeof(bool) = 1 Byte</span> (true or false)</p>
                <p><span className="text-cyan-300">sizeof(int) = 4 Bytes</span> (Range: -2,147,483,648 to 2,147,483,647)</p>
                <p><span className="text-cyan-300">sizeof(double) = 8 Bytes</span> (64-bit IEEE 754 floating point)</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-amber-400 font-bold">Pass-by-Value vs Pass-by-Reference (&):</span>
                <p className="text-slate-300 mt-1">
                  Pass-by-value makes a full stack copy of the variable. Pass-by-reference <code className="text-cyan-300">void func(int& x)</code> passes a direct memory alias to the caller variable with zero copy overhead!
                </p>
              </div>
            </div>
          )}

          {activeTab === 'memory' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-1.5 font-title">
                <Layers className="w-4 h-4 text-emerald-400" />
                Pointers, Stack vs Heap & RAII
              </h3>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
                <p><span className="text-emerald-400 font-bold">Address-Of Operator (&):</span> Yields the memory address (e.g. <code className="text-cyan-300">0x7ffe4010</code>).</p>
                <p><span className="text-emerald-400 font-bold">Dereference Operator (*):</span> Accesses the value stored at the target address.</p>
                <p><span className="text-emerald-400 font-bold">Stack vs Heap:</span> Stack memory is managed automatically by scope frame pop. Heap memory (<code className="text-cyan-300">new/delete</code>) persists until deleted.</p>
                <p><span className="text-emerald-400 font-bold">Smart Pointers:</span> Use <code className="text-cyan-300">std::unique_ptr</code> for single ownership and <code className="text-cyan-300">std::shared_ptr</code> for reference counted sharing.</p>
              </div>
            </div>
          )}

          {activeTab === 'oop' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5 font-title">
                <Cpu className="w-4 h-4 text-amber-400" />
                The 4 Pillars & VTable Dispatch
              </h3>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
                <p><span className="text-amber-400 font-bold">4 Pillars:</span> Encapsulation (private data), Abstraction (interfaces), Inheritance (<code className="text-cyan-300">: public Base</code>), Polymorphism (<code className="text-cyan-300">virtual</code> methods).</p>
                <p><span className="text-amber-400 font-bold">Virtual Function Table (VTable):</span> Classes with virtual methods add an 8-byte <code className="text-cyan-300">vptr</code> to each instance pointing to an array of function addresses.</p>
                <p><span className="text-amber-400 font-bold">Rule of Three / Five:</span> Destructor, Copy Constructor, Copy Assignment, Move Constructor, Move Assignment.</p>
              </div>
            </div>
          )}

          {activeTab === 'stl' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-1.5 font-title">
                <Database className="w-4 h-4 text-cyan-400" />
                STL Containers & Complexity
              </h3>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
                <p><span className="text-cyan-400 font-bold">std::vector:</span> Contiguous heap array. Random Access O(1), Push Back Amortized O(1).</p>
                <p><span className="text-cyan-400 font-bold">std::sort:</span> Introsort algorithm. Time complexity: <code className="text-emerald-300">O(N log N)</code>.</p>
                <p><span className="text-cyan-400 font-bold">Iterators:</span> Uniform pointer-like objects (<code className="text-cyan-300">begin()</code>, <code className="text-cyan-300">end()</code>) that traverse containers.</p>
              </div>
            </div>
          )}

          {activeTab === 'modern' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-1.5 font-title">
                <Sparkles className="w-4 h-4 text-rose-400" />
                Templates, Move Semantics & C++20
              </h3>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
                <p><span className="text-rose-400 font-bold">Templates:</span> Generic functions/classes instantiated at compile-time (<code className="text-cyan-300">template &lt;typename T&gt;</code>).</p>
                <p><span className="text-rose-400 font-bold">Move Semantics:</span> Rvalue reference (<code className="text-cyan-300">T&&</code>) and <code className="text-cyan-300">std::move</code> transfer buffer pointers in <code className="text-emerald-300">O(1)</code> time instead of making an <code className="text-rose-400">O(N)</code> copy.</p>
                <p><span className="text-rose-400 font-bold">constexpr / consteval:</span> Forces execution at compile time with zero runtime CPU cost!</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              soundEngine.playBlip();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold transition-colors"
          >
            CLOSE GUIDE
          </button>
        </div>

      </div>
    </div>
  );
};
