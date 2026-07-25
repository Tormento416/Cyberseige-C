import React from 'react';
import { MemoryBlock } from '../utils/cppInterpreter';
import { Layers, Database, ArrowRight, Info, AlertTriangle } from 'lucide-react';

interface MemoryVisualizerProps {
  memoryBlocks: MemoryBlock[];
  formulaNote?: string;
}

export const MemoryVisualizer: React.FC<MemoryVisualizerProps> = ({ memoryBlocks, formulaNote }) => {
  const stackBlocks = memoryBlocks.filter(b => b.location === 'stack');
  const heapBlocks = memoryBlocks.filter(b => b.location === 'heap');

  return (
    <div className="cyber-box rounded-xl p-4 border border-slate-800 bg-slate-950/80">
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold font-title uppercase tracking-wider text-slate-200">
            Interactive RAM Inspector (Stack vs Heap)
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-700">
          64-Bit Memory Architecture
        </span>
      </div>

      {formulaNote && (
        <div className="mb-3 p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-xs flex items-start gap-2">
          <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div className="font-mono text-[11px] leading-relaxed">{formulaNote}</div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* STACK MEMORY REGION */}
        <div className="bg-slate-900/90 rounded-lg p-3 border border-blue-500/30 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold font-title text-blue-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              STACK MEMORY (Automatic Scope)
            </span>
            <span className="text-[10px] font-mono text-slate-400">Fast | L1 Cache</span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {stackBlocks.length === 0 ? (
              <div className="text-xs text-slate-500 font-mono py-4 text-center">No stack frames allocated.</div>
            ) : (
              stackBlocks.map((block, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 p-2.5 rounded border border-blue-500/20 hover:border-blue-400 transition-all text-xs font-mono relative"
                >
                  <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
                    <span className="text-blue-300 font-semibold">{block.address}</span>
                    <span className="text-slate-400 bg-slate-900 px-1.5 py-0.2 rounded">{block.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-200 font-bold">{block.name}</span>
                    <span className="text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                      {block.value}
                    </span>
                  </div>
                  {block.pointsTo && (
                    <div className="mt-1 text-[10px] text-amber-300 flex items-center gap-1 bg-amber-950/40 p-1 rounded border border-amber-500/30">
                      <ArrowRight className="w-3 h-3 text-amber-400 animate-pulse" />
                      <span>Points to Heap Address: {block.pointsTo}</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* HEAP MEMORY REGION */}
        <div className="bg-slate-900/90 rounded-lg p-3 border border-emerald-500/30 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold font-title text-emerald-400 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              HEAP MEMORY (Dynamic Allocation)
            </span>
            <span className="text-[10px] font-mono text-slate-400">RAII Managed</span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {heapBlocks.length === 0 ? (
              <div className="text-xs text-slate-500 font-mono py-4 text-center">No dynamic heap blocks allocated.</div>
            ) : (
              heapBlocks.map((block, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded border transition-all text-xs font-mono relative ${
                    block.isLeaked
                      ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                      : 'bg-slate-950 border-emerald-500/20 hover:border-emerald-400 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
                    <span className="text-emerald-400 font-semibold">{block.address}</span>
                    <span className="text-emerald-300 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-500/30">
                      {block.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-200 font-bold">{block.name}</span>
                    <span className="text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                      {block.value}
                    </span>
                  </div>

                  {block.isLeaked && (
                    <div className="mt-1 text-[10px] text-rose-300 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-rose-400" />
                      <span>MEMORY LEAK WARNING: Missing std::unique_ptr or delete!</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
