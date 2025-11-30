
import React from 'react';
import { X, Server, Database, Cloud, Smartphone, Globe, Code, ArrowRight, Bot, Cpu, Zap, Layout, Terminal } from 'lucide-react';
import { ArchitectureType } from '../types';

interface ArchitectureDiagramProps {
  type: ArchitectureType;
  onClose: () => void;
}

const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ type, onClose }) => {
  if (!type) return null;

  const renderContent = () => {
    switch (type) {
      case 'site_architecture':
        return (
          <div className="flex flex-col items-center justify-center space-y-6 p-6 w-full">
            <h3 className="text-xl font-bold tracking-widest text-[var(--gen-primary)] mb-4">RECURSIVE SYSTEM ARCHITECTURE</h3>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full max-w-5xl">
                
                {/* Step 1: User */}
                <div className="flex flex-col items-center text-center gap-2 group">
                    <div className="p-4 border-2 border-[var(--gen-text)] rounded-full bg-[var(--gen-surface)]">
                        <Smartphone className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold">USER INPUT</span>
                    <span className="text-[10px] opacity-60">"Run Diagnostics"</span>
                </div>

                <ArrowRight className="w-6 h-6 text-[var(--gen-secondary)] animate-pulse hidden md:block" />
                <div className="w-0.5 h-8 bg-[var(--gen-secondary)] md:hidden"></div>

                {/* Step 2: React Client */}
                <div className="flex flex-col items-center text-center gap-2 p-4 border border-[var(--gen-primary)] rounded-lg bg-[var(--gen-bg)] relative shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                    <div className="absolute -top-3 px-2 bg-[var(--gen-bg)] border border-[var(--gen-primary)] text-[10px] text-[var(--gen-primary)]">CLIENT HOST</div>
                    <Code className="w-8 h-8 text-[var(--gen-primary)]" />
                    <span className="text-sm font-bold">REACT APP</span>
                    <span className="text-[10px] opacity-60">genai-sdk / Tailwind</span>
                </div>

                <div className="h-0.5 w-12 bg-gradient-to-r from-[var(--gen-primary)] to-[var(--gen-secondary)] hidden md:block"></div>
                <div className="w-0.5 h-8 bg-gradient-to-b from-[var(--gen-primary)] to-[var(--gen-secondary)] md:hidden"></div>

                {/* Step 3: Gemini Cloud */}
                <div className="flex flex-col items-center text-center gap-2 p-4 border border-[var(--gen-secondary)] rounded-lg bg-[var(--gen-surface)] relative shadow-[0_0_15px_rgba(167,139,250,0.2)]">
                    <div className="absolute -top-3 px-2 bg-[var(--gen-surface)] border border-[var(--gen-secondary)] text-[10px] text-[var(--gen-secondary)]">GEMINI 2.5 FLASH</div>
                    <Bot className="w-8 h-8 text-[var(--gen-secondary)]" />
                    <span className="text-sm font-bold">INFERENCE</span>
                    <span className="text-[10px] opacity-60">Function Call Detection</span>
                </div>

                <ArrowRight className="w-6 h-6 text-[var(--gen-secondary)] animate-pulse hidden md:block" />
                <div className="w-0.5 h-8 bg-[var(--gen-secondary)] md:hidden"></div>

                {/* Step 4: Tool Execution */}
                <div className="grid grid-cols-2 gap-2 p-3 border border-zinc-700 rounded-lg bg-zinc-900/50">
                    <div className="col-span-2 text-center text-[10px] font-mono opacity-50 mb-1">AVAILABLE TOOLS</div>
                    <div className="flex items-center gap-2 p-2 bg-black border border-zinc-800 rounded">
                        <Zap className="w-3 h-3 text-yellow-500" /> <span className="text-[10px]">Diagnostics</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-black border border-zinc-800 rounded">
                        <Layout className="w-3 h-3 text-cyan-500" /> <span className="text-[10px]">Gen UI</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-black border border-zinc-800 rounded">
                        <Server className="w-3 h-3 text-green-500" /> <span className="text-[10px]">Deploy</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-black border border-zinc-800 rounded">
                        <Terminal className="w-3 h-3 text-purple-500" /> <span className="text-[10px]">Nav</span>
                    </div>
                </div>
            </div>
            
            <p className="text-center font-mono text-xs opacity-70 max-w-2xl mt-4 border-t border-zinc-800 pt-4">
                The AI analyzes your request, determines it needs to run a local function (e.g., <code className="text-[var(--gen-primary)]">generate_architecture_diagram</code>), sends a command back to the React client, which executes the code and renders this very overlay.
            </p>
          </div>
        );

      case 'rag_pipeline':
        return (
          <div className="flex flex-col items-center justify-center space-y-8 p-8">
            <h3 className="text-xl font-bold tracking-widest text-[var(--gen-primary)]">RAG PIPELINE ARCHITECTURE (GEN AI)</h3>
            <div className="relative w-full h-[300px] border border-[var(--gen-surface)] bg-[var(--gen-bg)] rounded-lg p-6 flex items-center justify-between">
              {/* Nodes */}
              <div className="flex flex-col items-center gap-2 p-4 border border-[var(--gen-secondary)] rounded bg-[var(--gen-surface)] z-10">
                <Globe className="w-8 h-8 text-[var(--gen-secondary)]" />
                <span className="text-xs font-mono">User Query</span>
              </div>
              
              <div className="h-0.5 w-12 bg-[var(--gen-secondary)] animate-pulse"></div>
              
              <div className="flex flex-col items-center gap-2 p-4 border border-[var(--gen-primary)] rounded bg-[var(--gen-surface)] z-10">
                <Code className="w-8 h-8 text-[var(--gen-primary)]" />
                <span className="text-xs font-mono">Orchestrator (Python)</span>
              </div>

              <div className="h-0.5 w-12 bg-[var(--gen-primary)] animate-pulse"></div>

              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-2 p-3 border border-zinc-700 rounded bg-zinc-900">
                    <Database className="w-4 h-4 text-green-500" />
                    <span className="text-xs">Vector DB (Pinecone)</span>
                 </div>
                 <div className="flex items-center gap-2 p-3 border border-zinc-700 rounded bg-zinc-900">
                    <Cloud className="w-4 h-4 text-blue-500" />
                    <span className="text-xs">LLM (Gemini 1.5)</span>
                 </div>
              </div>
            </div>
            <p className="font-mono text-sm opacity-70 text-center max-w-lg">
              Hybrid retrieval system using semantic search + keyword matching. Python orchestrator handles context window management and prompt injection.
            </p>
          </div>
        );

      case 'hybrid_cloud':
        return (
           <div className="flex flex-col items-center justify-center space-y-8 p-8">
            <h3 className="text-xl font-bold tracking-widest text-[var(--gen-secondary)]">HYBRID CLOUD TOPOLOGY</h3>
            <div className="grid grid-cols-2 gap-12 w-full max-w-2xl">
               <div className="border border-blue-500/30 bg-blue-900/10 p-6 rounded-lg relative">
                  <div className="absolute -top-3 left-4 bg-[var(--gen-bg)] px-2 text-blue-400 text-xs font-bold">AWS (PUBLIC)</div>
                  <div className="space-y-4">
                      <div className="flex items-center gap-3">
                          <Server className="w-5 h-5 text-blue-400" />
                          <span className="text-sm font-mono">EC2 Autoscaling Group</span>
                      </div>
                      <div className="flex items-center gap-3">
                          <Database className="w-5 h-5 text-blue-400" />
                          <span className="text-sm font-mono">RDS (Postgres)</span>
                      </div>
                  </div>
               </div>

               <div className="flex items-center justify-center">
                  <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-orange-500 animate-pulse"></div>
                  <div className="absolute bg-[var(--gen-bg)] px-2 text-[10px] border border-zinc-700 rounded">VPN TUNNEL</div>
               </div>

               <div className="border border-orange-500/30 bg-orange-900/10 p-6 rounded-lg relative col-start-2">
                  <div className="absolute -top-3 left-4 bg-[var(--gen-bg)] px-2 text-orange-400 text-xs font-bold">ON-PREM (PRIVATE)</div>
                  <div className="space-y-4">
                      <div className="flex items-center gap-3">
                          <Server className="w-5 h-5 text-orange-400" />
                          <span className="text-sm font-mono">Legacy ERP System</span>
                      </div>
                      <div className="flex items-center gap-3">
                          <ShieldCheck className="w-5 h-5 text-orange-400" />
                          <span className="text-sm font-mono">Hardware Security Module</span>
                      </div>
                  </div>
               </div>
            </div>
          </div>
        );

      case 'voip_stack':
        return (
          <div className="flex flex-col items-center justify-center space-y-8 p-8">
            <h3 className="text-xl font-bold tracking-widest text-green-500">VOIP TELEPHONY STACK</h3>
            <div className="relative w-full h-[300px] border border-green-500/30 bg-black rounded-lg p-6 flex flex-col items-center justify-center gap-6">
                <div className="flex gap-12">
                   <div className="flex flex-col items-center">
                      <Smartphone className="w-8 h-8 text-zinc-400" />
                      <span className="text-[10px] mt-2">SIP Client</span>
                   </div>
                   <div className="flex flex-col items-center">
                      <Smartphone className="w-8 h-8 text-zinc-400" />
                      <span className="text-[10px] mt-2">PSTN Ingress</span>
                   </div>
                </div>
                
                <div className="w-64 h-32 border-2 border-green-500 rounded bg-green-900/20 flex flex-col items-center justify-center relative">
                   <span className="absolute -top-3 bg-black px-2 text-green-500 font-bold">ASTERISK CORE</span>
                   <div className="grid grid-cols-2 gap-4 text-xs font-mono text-green-400">
                      <div className="border border-green-500/50 p-1">AGI Scripts (Python)</div>
                      <div className="border border-green-500/50 p-1">Dial Plan (Extensions)</div>
                      <div className="border border-green-500/50 p-1">RTP Stream</div>
                      <div className="border border-green-500/50 p-1">SIP Signaling</div>
                   </div>
                </div>

                <div className="flex gap-2">
                   <div className="h-2 w-2 rounded-full bg-green-500 animate-ping"></div>
                   <span className="text-xs text-green-500 font-mono">Active Call Routing</span>
                </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
      <div className="w-full max-w-5xl bg-[var(--gen-bg)] border border-[var(--gen-primary)] shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden relative max-h-[90vh] overflow-y-auto">
         <button onClick={onClose} className="absolute top-4 right-4 z-20 hover:text-[var(--gen-primary)] transition-colors">
            <X className="w-6 h-6" />
         </button>
         
         {renderContent()}
         
         <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--gen-primary)] to-[var(--gen-secondary)]"></div>
      </div>
    </div>
  );
};

// Helper components
const ShieldCheck = ({ className }: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
)

export default ArchitectureDiagram;
