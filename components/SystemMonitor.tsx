import React, { useEffect, useState } from 'react';
import { Activity, Cpu, HardDrive, ShieldCheck, X } from 'lucide-react';

interface SystemMonitorProps {
  onClose: () => void;
}

const LOG_LINES = [
  "MOUNTING /dev/sda1 [RESUME_DATA]... OK",
  "SCANNING KERNEL MEMORY... 32GB DETECTED",
  "CHECKING INTEGRITY OF 'linux_mastery.ko'... VERIFIED",
  "PINGING CLOUD INFRASTRUCTURE (AWS/GCP/AZURE)... 12ms LATENCY",
  "ANALYZING NEURAL PATHWAYS (Gemini API)... CONNECTED",
  "AUDITING SECURITY PROTOCOLS... 0 VULNERABILITIES",
  "COMPILING ASSETS... DONE",
  "CHECKING DOCKER CONTAINERS... 12/12 RUNNING",
  "VERIFYING EXPERTISE IN PYTHON... EXPERT LEVEL CONFIRMED",
  "DETECTING BUG HUNTING CAPABILITIES... 100% EFFICIENCY"
];

const SystemMonitor: React.FC<SystemMonitorProps> = ({ onClose }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < LOG_LINES.length) {
        setLogs(prev => [...prev, LOG_LINES[i]]);
        setProgress(((i + 1) / LOG_LINES.length) * 100);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(onClose, 2000); // Auto close after done
      }
    }, 400);

    return () => clearInterval(interval);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-black border border-green-500/50 rounded shadow-[0_0_50px_rgba(34,197,94,0.2)] font-mono overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-green-900/20 border-b border-green-500/30 p-3 flex justify-between items-center">
          <div className="flex items-center gap-2 text-green-500">
            <Activity className="w-5 h-5 animate-pulse" />
            <span className="font-bold tracking-widest">SYSTEM_DIAGNOSTICS_TOOL</span>
          </div>
          <button onClick={onClose} className="text-green-500 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 grid md:grid-cols-3 gap-6">
          
          {/* Visual Graphs (Simulated) */}
          <div className="col-span-1 space-y-4">
            <div className="bg-green-900/10 border border-green-500/20 p-3 rounded">
              <div className="flex items-center gap-2 text-green-400 mb-2 text-xs">
                <Cpu className="w-4 h-4" /> CPU USAGE
              </div>
              <div className="w-full bg-green-900/30 h-16 flex items-end gap-1 p-1">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex-1 bg-green-500/50 animate-pulse" style={{ height: `${Math.random() * 80 + 20}%` }}></div>
                ))}
              </div>
            </div>

            <div className="bg-green-900/10 border border-green-500/20 p-3 rounded">
               <div className="flex items-center gap-2 text-green-400 mb-2 text-xs">
                <HardDrive className="w-4 h-4" /> MEMORY
              </div>
              <div className="text-2xl font-bold text-green-400">14.2<span className="text-sm text-green-600">/32GB</span></div>
              <div className="w-full h-1 bg-green-900/30 mt-2">
                <div className="h-full bg-green-500 w-[45%]"></div>
              </div>
            </div>

             <div className="bg-green-900/10 border border-green-500/20 p-3 rounded">
               <div className="flex items-center gap-2 text-green-400 mb-2 text-xs">
                <ShieldCheck className="w-4 h-4" /> FIREWALL
              </div>
              <div className="text-green-400 font-bold text-sm">ACTIVE (0 THREATS)</div>
            </div>
          </div>

          {/* Terminal Output */}
          <div className="col-span-2 bg-black border border-green-500/20 p-4 h-[300px] overflow-hidden flex flex-col relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>
            <div className="flex-1 font-mono text-xs text-green-400 space-y-1 overflow-y-auto custom-scrollbar">
              {logs.map((log, idx) => (
                <div key={idx} className="opacity-90"> {log}</div>
              ))}
               <div className="animate-cursor-blink text-green-500">_</div>
            </div>
            {/* Progress Bar */}
            <div className="mt-4 pt-4 border-t border-green-500/20">
               <div className="flex justify-between text-xs text-green-500 mb-1">
                 <span>SCAN_PROGRESS</span>
                 <span>{Math.round(progress)}%</span>
               </div>
               <div className="w-full h-2 bg-green-900/30">
                 <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SystemMonitor;
