import React, { useState } from 'react';
import { generateCppScannerCode, ScannerConfig } from '../data/scannerCodeTemplate';
import { soundEngine } from '../utils/audio';
import { Terminal, Copy, Download, Check, Settings, Wifi, Bluetooth, FileCode } from 'lucide-react';

export const FinalToolBuilder: React.FC = () => {
  const [config, setConfig] = useState<ScannerConfig>({
    subnet: '192.168.1',
    scanPorts: '80, 443, 22, 8080, 53',
    enableBluetooth: true,
    timeoutMs: 1500,
    outputFormat: 'json',
  });

  const [copied, setCopied] = useState(false);
  const generatedCode = generateCppScannerCode(config);

  const handleCopy = () => {
    soundEngine.playBlip();
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    soundEngine.playBlip();
    const element = document.createElement('a');
    const file = new Blob([generatedCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'cyber_scanner.cpp';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="cyber-box-emerald rounded-2xl p-6 border-2 border-emerald-400/60 shadow-xl shadow-emerald-950/40">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-400 text-emerald-400">
            <Terminal className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-title text-emerald-300">
              FINAL MISSION STUDIO: REAL C++ NETWORK & BLUETOOTH SCANNER
            </h2>
            <p className="text-xs text-slate-300 font-sub">
              Synthesize everything learned into a standalone, compilable C++ tool for your computer.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Controls Column */}
        <div className="cyber-box rounded-xl p-5 border border-slate-800 bg-slate-950/80 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Settings className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold font-title text-slate-200 uppercase tracking-wider">
              Tool Configuration
            </h3>
          </div>

          {/* Subnet Input */}
          <div className="space-y-1">
            <label className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5 text-cyan-400" />
              Target Subnet IP Prefix:
            </label>
            <input
              type="text"
              value={config.subnet}
              onChange={e => setConfig({ ...config, subnet: e.target.value })}
              className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Target Ports Input */}
          <div className="space-y-1">
            <label className="text-[11px] font-mono text-slate-400">Target Ports (Comma Separated):</label>
            <input
              type="text"
              value={config.scanPorts}
              onChange={e => setConfig({ ...config, scanPorts: e.target.value })}
              className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Bluetooth Toggle */}
          <div className="flex items-center justify-between p-2.5 rounded bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2">
              <Bluetooth className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-mono text-slate-200">Bluetooth LE Detection</span>
            </div>
            <input
              type="checkbox"
              checked={config.enableBluetooth}
              onChange={e => setConfig({ ...config, enableBluetooth: e.target.checked })}
              className="w-4 h-4 accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Output Format */}
          <div className="space-y-1">
            <label className="text-[11px] font-mono text-slate-400">Output Export Format:</label>
            <select
              value={config.outputFormat}
              onChange={e => setConfig({ ...config, outputFormat: e.target.value as 'json' | 'console' })}
              className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-400"
            >
              <option value="json">JSON File Export (scan_results.json)</option>
              <option value="console">Console Standard Output</option>
            </select>
          </div>

          {/* Compile Guide */}
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1">
            <div className="font-bold text-amber-300 flex items-center gap-1">
              <FileCode className="w-3.5 h-3.5 text-amber-400" />
              <span>Compilation Command:</span>
            </div>
            <p className="text-[10px] text-cyan-300 bg-slate-950 p-1.5 rounded border border-slate-800">
              g++ -std=c++17 cyber_scanner.cpp -o cyber_scanner -lws2_32
            </p>
          </div>
        </div>

        {/* C++ Code Display Column */}
        <div className="lg:col-span-2 cyber-box rounded-xl p-5 border border-slate-800 bg-slate-950/80 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold font-title text-slate-200 uppercase tracking-wider">
                Generated Production C++ Code (cyber_scanner.cpp)
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{copied ? 'COPIED!' : 'COPY CODE'}</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-4 py-1 rounded text-xs font-mono font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD .CPP</span>
              </button>
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-950 font-code text-[11px]">
            <pre className="p-4 overflow-x-auto text-slate-200 leading-relaxed max-h-[500px]">
              {generatedCode}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
};
