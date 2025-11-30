
import React, { useState, useRef, useEffect } from 'react';
import { Send, Minimize2, Activity, Terminal as TerminalIcon, Zap, Shield, Sparkles, MessageSquare, Layout, Server, Network } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AiTerminalProps {
  onToolAction: (action: string, args: any) => Promise<string>;
}

const COMMAND_SUGGESTIONS = [
  "Run system diagnostics",
  "How does this site work?",
  "Switch layout to Split-Screen",
  "Make it clean, white, minimal",
  "Deploy a demo agent",
  "Contact Eric",
  "Show me the Hybrid Cloud setup"
];

const AiTerminal: React.FC<AiTerminalProps> = ({ onToolAction }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Neural Interface Online. I have root access. Try commands like 'Deploy Agent', 'Show Architecture', or 'Run Diagnostics'.", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Command History State
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Neural Visualizer Animation
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const render = () => {
      t += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const styles = getComputedStyle(document.documentElement);
      const primaryColor = styles.getPropertyValue('--gen-primary').trim() || '#22d3ee';
      const secondaryColor = styles.getPropertyValue('--gen-secondary').trim() || '#fbbf24';

      const color = isLoading ? secondaryColor : primaryColor;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;

      ctx.beginPath();
      for (let i = 0; i < canvas.width; i++) {
        const amplitude = isLoading ? 15 : 5;
        const frequency = isLoading ? 0.2 : 0.05;
        const y = canvas.height / 2 + 
                 Math.sin(i * frequency + t) * amplitude + 
                 Math.sin(i * 0.02 + t * 2) * (amplitude * 0.5);
        ctx.lineTo(i, y);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    const resize = () => {
        canvas.width = canvas.parentElement?.clientWidth || 300;
        canvas.height = canvas.parentElement?.clientHeight || 60;
    };
    window.addEventListener('resize', resize);
    resize();
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen, isLoading]);

  const handleToolCallCallback = async (name: string, args: any) => {
    return await onToolAction(name, args);
  };

  const handleSend = async (textInput: string = input) => {
    if (!textInput.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: textInput, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setHistory(prev => [...prev, textInput]);
    setHistoryIndex(-1); // Reset history index
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text, handleToolCallCallback);
      const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Error: Neural link unstable.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(history.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
        if (historyIndex === history.length - 1) {
             setHistoryIndex(-1);
             setInput('');
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple Auto-complete
      const match = COMMAND_SUGGESTIONS.find(cmd => cmd.toLowerCase().startsWith(input.toLowerCase()));
      if (match) {
        setInput(match);
      }
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 border p-4 rounded-lg shadow-2xl z-40 transition-all hover:scale-105 flex items-center gap-3 group animate-glow-pulse overflow-hidden"
        style={{
          backgroundColor: 'var(--gen-bg)',
          borderColor: 'var(--gen-primary)',
          color: 'var(--gen-primary)',
          borderRadius: 'var(--gen-radius)'
        }}
      >
        <div className="absolute inset-0 opacity-10 transition-colors" style={{ backgroundColor: 'var(--gen-primary)' }}></div>
        <TerminalIcon className="w-6 h-6" />
        <div className="flex flex-col items-start">
            <span className="text-xs font-bold tracking-widest">AI_COMMAND_CORE</span>
            <span className="text-[10px] opacity-70 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                ONLINE
            </span>
        </div>
      </button>
    );
  }

  return (
    <div 
      className={`fixed bottom-6 right-6 w-[90vw] md:w-[450px] h-[600px] border shadow-2xl flex flex-col z-40 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 ring-1 ring-white/10 ${isLoading ? 'shadow-[0_0_30px_rgba(34,211,238,0.15)]' : ''}`}
      style={{
        backgroundColor: 'var(--gen-bg)',
        borderColor: isLoading ? 'var(--gen-secondary)' : 'var(--gen-surface)',
        borderRadius: 'var(--gen-radius)',
        fontFamily: 'var(--gen-font)',
        transition: 'border-color 0.5s ease'
      }}
    >
      
      {/* Neural Header */}
      <div className="h-20 relative border-b shrink-0" style={{ backgroundColor: 'var(--gen-surface)', borderColor: 'var(--gen-bg)' }}>
         <div className="absolute top-2 left-3 z-10 flex items-center gap-2">
             <Activity className={`w-4 h-4 ${isLoading ? 'animate-pulse text-[var(--gen-secondary)]' : 'text-[var(--gen-primary)]'}`} />
             <span className="text-xs font-bold tracking-widest opacity-80">NEURAL_CORE_V3.0</span>
         </div>
         <button onClick={() => setIsOpen(false)} className="absolute top-2 right-3 z-10 opacity-50 hover:opacity-100 transition-opacity">
            <Minimize2 className="w-5 h-5" />
         </button>
         
         {/* Canvas Container */}
         <div className="absolute inset-0 pt-4">
             <canvas ref={canvasRef} className="w-full h-full opacity-60" />
         </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] p-3 text-sm border shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-zinc-900 text-zinc-300 border-zinc-700' 
                  : ''
              }`}
              style={msg.role === 'model' ? {
                backgroundColor: 'var(--gen-surface)',
                color: 'var(--gen-text)',
                borderColor: idx === messages.length - 1 && isLoading ? 'var(--gen-secondary)' : 'var(--gen-primary)',
                borderWidth: '1px',
                borderRadius: 'var(--gen-radius)',
                boxShadow: idx === messages.length - 1 ? '0 0 10px rgba(34, 211, 238, 0.1)' : 'none'
              } : { borderRadius: 'var(--gen-radius)' }}
            >
              {msg.role === 'model' && <div className="text-[10px] font-bold mb-1 flex items-center gap-1 opacity-70">
                  <Zap className="w-3 h-3" style={{ color: 'var(--gen-primary)' }} /> AI_RESPONSE
              </div>}
              <div className="leading-relaxed whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
             <div className="border p-2 text-xs flex items-center gap-2" style={{ borderColor: 'var(--gen-secondary)', color: 'var(--gen-secondary)', borderRadius: 'var(--gen-radius)' }}>
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--gen-secondary)' }}></span>
                PROCESSING_DATA_STREAM...
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="p-2 border-t flex gap-2 overflow-x-auto custom-scrollbar shrink-0" style={{ backgroundColor: 'var(--gen-surface)', borderColor: 'var(--gen-bg)' }}>
          <button onClick={() => handleSend("How does this site work?")} className="whitespace-nowrap px-3 py-1 border text-[10px] transition-colors flex items-center gap-1 hover:opacity-80" style={{ backgroundColor: 'var(--gen-bg)', borderColor: 'var(--gen-primary)', color: 'var(--gen-primary)', borderRadius: 'var(--gen-radius)' }}>
              <Network className="w-3 h-3" /> SITE_ARCH
          </button>
          <button onClick={() => handleSend("Deploy a demo agent environment")} className="whitespace-nowrap px-3 py-1 border text-[10px] transition-colors flex items-center gap-1 hover:opacity-80" style={{ backgroundColor: 'var(--gen-bg)', borderColor: 'var(--gen-secondary)', color: 'var(--gen-secondary)', borderRadius: 'var(--gen-radius)' }}>
              <Server className="w-3 h-3" /> DEPLOY_SIM
          </button>
          <button onClick={() => handleSend("Run system diagnostics")} className="whitespace-nowrap px-3 py-1 border text-[10px] transition-colors flex items-center gap-1 hover:opacity-80" style={{ backgroundColor: 'var(--gen-bg)', borderColor: 'var(--gen-primary)', color: 'var(--gen-text)', borderRadius: 'var(--gen-radius)' }}>
              <Shield className="w-3 h-3" /> DIAGNOSTICS
          </button>
      </div>

      {/* Input Area */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 border-t flex gap-2 shrink-0" style={{ backgroundColor: 'var(--gen-bg)', borderColor: 'var(--gen-surface)' }}>
        <div className="flex-1 relative">
           <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-xs" style={{ color: 'var(--gen-primary)' }}>{'>'}</span>
           <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or press Tab..."
            className="w-full pl-6 pr-4 py-3 border focus:outline-none text-sm shadow-inner bg-transparent placeholder-zinc-700"
            style={{ 
              borderColor: 'var(--gen-surface)', 
              borderRadius: 'var(--gen-radius)',
              color: 'var(--gen-text)'
            }}
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="disabled:opacity-50 disabled:cursor-not-allowed border p-3 transition-colors"
          style={{ 
            backgroundColor: 'var(--gen-surface)', 
            borderColor: 'var(--gen-primary)', 
            color: 'var(--gen-primary)',
            borderRadius: 'var(--gen-radius)'
          }}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default AiTerminal;
