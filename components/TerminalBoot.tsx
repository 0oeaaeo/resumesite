import React, { useEffect, useState, useRef } from 'react';
import { TerminalLine } from '../types';

interface TerminalBootProps {
  onComplete: () => void;
}

const BOOT_SEQUENCE = [
  { text: "BIOS DATE 01/01/24 15:23:01 VER 1.0.2", delay: 100 },
  { text: "CPU: AMD RYZEN THREADRIPPER PRO 5995WX", delay: 200 },
  { text: "DETECTING NVRAM... SUCCESS", delay: 300 },
  { text: "LOADING KERNEL... v6.8.9-arch1-1", delay: 800 },
  { text: "MOUNTING ROOT FILESYSTEM...", delay: 400 },
  { text: "[ OK ] Started Network Manager.", delay: 200 },
  { text: "[ OK ] Reached target Network.", delay: 100 },
  { text: "LOADING MODULE: python_expert.ko", delay: 300 },
  { text: "LOADING MODULE: ai_architecture.ko", delay: 300 },
  { text: "LOADING MODULE: linux_veteran.ko", delay: 300 },
  { text: "INITIALIZING NEURAL INTERFACE...", delay: 600 },
  { text: "CONNECTING TO GEMINI API...", delay: 400 },
  { text: "ESTABLISHING SECURE LINK...", delay: 500 },
  { text: "ACCESS GRANTED. WELCOME, USER.", delay: 800 },
];

const TerminalBoot: React.FC<TerminalBootProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentIndex = 0;
    
    const runSequence = async () => {
      while (currentIndex < BOOT_SEQUENCE.length) {
        const item = BOOT_SEQUENCE[currentIndex];
        await new Promise(r => setTimeout(r, item.delay));
        
        setLines(prev => [...prev, { ...item, id: Date.now() + Math.random(), delay: 0 }]);
        currentIndex++;
        
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }
      
      // Sequence complete
      setTimeout(onComplete, 1000);
    };

    runSequence();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-void z-50 flex flex-col p-8 font-mono text-sm md:text-base overflow-hidden">
      <div className="flex-1 overflow-y-auto custom-scrollbar" ref={scrollRef}>
        {lines.map((line) => (
          <div key={line.id} className="text-green-500 mb-1 break-words">
            <span className="text-zinc-600 mr-2">[{new Date().toLocaleTimeString('en-US', { hour12: false })}]</span>
            <span className="mr-2">{'>'}</span>
            {line.text}
          </div>
        ))}
        <div className="text-green-500 animate-cursor-blink">_</div>
      </div>
      
      {/* Scanline effect overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-green-900/5 to-transparent opacity-20 animate-scanline"></div>
    </div>
  );
};

export default TerminalBoot;