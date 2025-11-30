import React from 'react';
import { CloudLightning, Terminal, Search, Bot, Activity } from 'lucide-react';

const NerdCred: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--gen-surface)' }}>
         <div className="flex items-center gap-2">
             <Activity className="w-5 h-5" style={{ color: 'var(--gen-secondary)' }} />
             <h3 className="text-2xl font-bold">Technical DNA</h3>
         </div>
         <div className="font-mono text-xs opacity-50">
             STATUS: OPTIMIZED
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {/* Rack Unit 1 - Infrastructure */}
         <div className="p-1 relative group overflow-hidden gen-card">
            <div className="p-4 h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <CloudLightning className="w-6 h-6 transition-colors group-hover:opacity-100 opacity-50" style={{ color: 'var(--gen-text)' }} />
                    <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    </div>
                </div>
                <h4 className="font-mono font-bold mb-2">INFRASTRUCTURE ARCHITECT</h4>
                <p className="text-xs opacity-60 leading-relaxed flex-grow">
                    I don't just use the cloud; I command it. Ability to rapidly stand up bulletproof infrastructure on AWS, Azure, or bare metal.
                </p>
            </div>
         </div>

         {/* Rack Unit 2 - Linux Mastery */}
         <div className="p-1 relative group overflow-hidden gen-card">
            <div className="p-4 h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <Terminal className="w-6 h-6 transition-colors group-hover:opacity-100 opacity-50" style={{ color: 'var(--gen-text)' }} />
                    <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                        <div className="w-1.5 h-1.5 rounded-full opacity-50" style={{ backgroundColor: 'var(--gen-text)' }}></div>
                    </div>
                </div>
                <h4 className="font-mono font-bold mb-2">LINUX VETERAN</h4>
                <p className="text-xs opacity-60 leading-relaxed flex-grow">
                    Compiling kernels since the early 2000s. I know the scheduler, the memory management, and the syscalls. <code style={{ color: 'var(--gen-secondary)' }}>vi</code> is muscle memory.
                </p>
            </div>
         </div>

         {/* Rack Unit 3 - Debugging/Bug Hunter */}
         <div className="p-1 relative group overflow-hidden gen-card">
            <div className="p-4 h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <Search className="w-6 h-6 transition-colors group-hover:opacity-100 opacity-50" style={{ color: 'var(--gen-text)' }} />
                    <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <div className="w-1.5 h-1.5 rounded-full opacity-50" style={{ backgroundColor: 'var(--gen-text)' }}></div>
                    </div>
                </div>
                <h4 className="font-mono font-bold mb-2">ROOT CAUSE HUNTER</h4>
                <p className="text-xs opacity-60 leading-relaxed flex-grow">
                    I thrive where others stall. My deep understanding of OS underpinnings allows me to isolate and crush obscure bugs that leave others scratching their heads.
                </p>
            </div>
         </div>

         {/* Rack Unit 4 - AI */}
         <div className="p-1 relative group overflow-hidden gen-card">
            <div className="p-4 h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <Bot className="w-6 h-6 transition-colors group-hover:opacity-100 opacity-50" style={{ color: 'var(--gen-text)' }} />
                    <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--gen-primary)' }}></div>
                        <div className="w-1.5 h-1.5 rounded-full opacity-50" style={{ backgroundColor: 'var(--gen-text)' }}></div>
                    </div>
                </div>
                <h4 className="font-mono font-bold mb-2">AI INNOVATOR</h4>
                <p className="text-xs opacity-60 leading-relaxed flex-grow">
                    Merging 20 years of systems logic with modern LLMs. Building autonomous agents that actually solve problems, not just generate text.
                </p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default NerdCred;