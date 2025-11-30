
import React, { useState, useEffect } from 'react';
import TerminalBoot from './components/TerminalBoot';
import AiTerminal from './components/AiTerminal';
import ExperienceTimeline from './components/ExperienceTimeline';
import SkillRadar from './components/SkillRadar';
import NerdCred from './components/NerdCred';
import SystemMonitor from './components/SystemMonitor';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import DeploymentConsole from './components/DeploymentConsole';
import { Github, Linkedin, Mail, Phone, Cpu, Terminal } from 'lucide-react';
import { GenerativeStyle, ArchitectureType, DeploymentConfig } from './types';

// Default "Command Center" Style
const DEFAULT_STYLE: GenerativeStyle = {
  layout: 'standard',
  navPosition: 'top',
  cardStyle: 'glass',
  primaryColor: '#22d3ee', // Cyan
  secondaryColor: '#a78bfa', // Violet
  backgroundColor: '#000000', // Black
  surfaceColor: '#09090b', // Zinc 950
  textColor: '#e4e4e7', // Zinc 200
  fontFamily: 'mono',
  borderRadius: '4px',
  borderWidth: '1px',
  opacity: 0.8
};

const App: React.FC = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [architectureViz, setArchitectureViz] = useState<ArchitectureType>(null);
  const [deploymentSim, setDeploymentSim] = useState<DeploymentConfig | null>(null);
  const [currentStyle, setCurrentStyle] = useState<GenerativeStyle>(DEFAULT_STYLE);

  // Apply Generative Styles to CSS Variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--gen-primary', currentStyle.primaryColor);
    root.style.setProperty('--gen-secondary', currentStyle.secondaryColor);
    root.style.setProperty('--gen-bg', currentStyle.backgroundColor);
    root.style.setProperty('--gen-surface', currentStyle.surfaceColor);
    root.style.setProperty('--gen-text', currentStyle.textColor);
    root.style.setProperty('--gen-radius', currentStyle.borderRadius);
    root.style.setProperty('--gen-border-width', currentStyle.borderWidth);
    root.style.setProperty('--gen-opacity', currentStyle.opacity.toString());
    
    // Map font family
    const fontStack = currentStyle.fontFamily === 'mono' 
      ? '"JetBrains Mono", monospace' 
      : currentStyle.fontFamily === 'serif' 
        ? 'Georgia, serif' 
        : '"Inter", sans-serif';
    root.style.setProperty('--gen-font', fontStack);
  }, [currentStyle]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToolAction = async (action: string, args: any) => {
    console.log("Handling Tool:", action, args);

    if (action === 'navigate_to_section') {
      scrollToSection(args.sectionId);
      return `Navigated to ${args.sectionId}`;
    }
    
    if (action === 'run_system_diagnostics') {
      setShowDiagnostics(true);
      return "Diagnostics overlay activated.";
    }

    if (action === 'generate_architecture_diagram') {
      setArchitectureViz(args.systemType);
      return `Visualizing architecture for ${args.systemType}...`;
    }

    if (action === 'deploy_demo_environment') {
      setDeploymentSim({ type: args.envType, status: 'deploying' });
      return `Initializing deployment simulation for ${args.envType}...`;
    }

    if (action === 'modify_ui_style') {
      const newStyle: GenerativeStyle = {
        ...currentStyle,
        ...args
      };
      setCurrentStyle(newStyle);
      return "UI Style successfully re-generated with new layout parameters.";
    }

    if (action === 'send_message_to_eric') {
      console.log(`[DISCORD MOCK] Sending message: "${args.message}" from "${args.contactInfo}"`);
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      return "Message sent successfully to Eric's private Discord channel.";
    }

    return "Unknown action";
  };

  // Helper to generate dynamic card classes
  const getCardClass = () => {
    if (currentStyle.cardStyle === 'brutalist') {
      return `border-[length:var(--gen-border-width)] border-[var(--gen-primary)] bg-[var(--gen-bg)] shadow-[4px_4px_0px_var(--gen-secondary)] rounded-none`;
    }
    if (currentStyle.cardStyle === 'outline') {
      return `border-[length:var(--gen-border-width)] border-[var(--gen-surface)] bg-transparent rounded-[var(--gen-radius)]`;
    }
    if (currentStyle.cardStyle === 'solid') {
      return `bg-[var(--gen-surface)] rounded-[var(--gen-radius)] border-none shadow-sm`;
    }
    // Default 'glass'
    return `backdrop-blur-md border-[length:var(--gen-border-width)] border-[var(--gen-surface)] bg-[var(--gen-surface)]/80 rounded-[var(--gen-radius)] shadow-lg`;
  };

  useEffect(() => {
    const styleEl = document.getElementById('dynamic-card-styles');
    if (!styleEl) return;
    
    let css = '';
    if (currentStyle.cardStyle === 'brutalist') {
      css = `.gen-card { border: var(--gen-border-width) solid var(--gen-primary); background-color: var(--gen-bg); box-shadow: 4px 4px 0px var(--gen-secondary); border-radius: 0; }`;
    } else if (currentStyle.cardStyle === 'outline') {
       css = `.gen-card { border: var(--gen-border-width) solid var(--gen-surface); background-color: transparent; border-radius: var(--gen-radius); }`;
    } else if (currentStyle.cardStyle === 'solid') {
       css = `.gen-card { background-color: var(--gen-surface); border-radius: var(--gen-radius); border: none; }`;
    } else {
       css = `.gen-card { backdrop-filter: blur(12px); border: var(--gen-border-width) solid var(--gen-surface); background-color: color-mix(in srgb, var(--gen-surface) 80%, transparent); border-radius: var(--gen-radius); }`;
    }
    styleEl.innerHTML = css;
  }, [currentStyle.cardStyle]);


  if (!bootComplete) {
    return <TerminalBoot onComplete={() => setBootComplete(true)} />;
  }

  // --- LAYOUT RENDERING LOGIC ---

  const renderNav = () => (
    <nav className={`
      flex gap-6 text-sm opacity-70 
      ${currentStyle.navPosition === 'left' ? 'flex-col items-start mt-8' : ''}
    `}>
       <button onClick={() => scrollToSection('experience')} className="hover:opacity-100 transition-opacity focus:outline-none hover:text-[var(--gen-primary)]">./EXPERIENCE</button>
       <button onClick={() => scrollToSection('skills')} className="hover:opacity-100 transition-opacity focus:outline-none hover:text-[var(--gen-primary)]">./SKILLS</button>
       <button onClick={() => scrollToSection('homelab')} className="hover:opacity-100 transition-opacity focus:outline-none hover:text-[var(--gen-primary)]">./DNA</button>
    </nav>
  );

  return (
    <div 
      className="min-h-screen transition-all duration-700 overflow-x-hidden relative"
      style={{
        backgroundColor: 'var(--gen-bg)',
        color: 'var(--gen-text)',
        fontFamily: 'var(--gen-font)'
      }}
    >
      <style id="dynamic-card-styles"></style>

      {/* Dynamic Background */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-10 transition-opacity duration-1000"
        style={{
           backgroundImage: `linear-gradient(to right, var(--gen-surface) 1px, transparent 1px), linear-gradient(to bottom, var(--gen-surface) 1px, transparent 1px)`,
           backgroundSize: '40px 40px'
        }}
      ></div>
      <div className="fixed inset-0 bg-radial-fade pointer-events-none z-0"></div>

      {showDiagnostics && <SystemMonitor onClose={() => setShowDiagnostics(false)} />}
      {architectureViz && <ArchitectureDiagram type={architectureViz} onClose={() => setArchitectureViz(null)} />}
      {deploymentSim && <DeploymentConsole envType={deploymentSim.type} onClose={() => setDeploymentSim(null)} />}

      {/* --- STANDARD HEADER (Top Nav) --- */}
      {currentStyle.navPosition === 'top' && (
        <header 
          className="fixed top-0 w-full z-40 backdrop-blur-md border-b transition-colors duration-700"
          style={{
            backgroundColor: `color-mix(in srgb, var(--gen-bg) 80%, transparent)`,
            borderColor: 'var(--gen-surface)'
          }}
        >
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-2 h-2 animate-pulse" style={{ backgroundColor: 'var(--gen-primary)', borderRadius: 'var(--gen-radius)' }}></div>
              <div className="font-bold text-lg tracking-tighter transition-opacity opacity-100 group-hover:opacity-80">
                ERIC_DENNIS<span style={{ color: 'var(--gen-secondary)' }}>.USR</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden md:block">{renderNav()}</div>
              <div className="h-4 w-px bg-current opacity-20 hidden md:block"></div>
              <div className="flex items-center gap-4">
                <a href="https://github.com/ericdennis" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-transform hover:scale-110"><Github className="w-5 h-5" /></a>
                <a href="https://linkedin.com/in/ericdennis" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-transform hover:scale-110"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className={`
        relative z-10 
        ${currentStyle.layout === 'split-screen' ? 'md:flex md:h-screen md:overflow-hidden' : ''}
        ${currentStyle.layout === 'minimal-center' ? 'max-w-3xl mx-auto pt-32' : 'pt-20'}
        ${currentStyle.navPosition === 'left' ? 'pl-0 md:pl-64' : ''}
      `}>
        
        {/* SIDEBAR (Left Nav) */}
        {currentStyle.navPosition === 'left' && (
          <div className="fixed left-0 top-0 bottom-0 w-64 border-r p-8 z-40 hidden md:flex flex-col justify-between" style={{ borderColor: 'var(--gen-surface)', backgroundColor: 'var(--gen-bg)' }}>
             <div>
                <div className="font-bold text-xl mb-12 tracking-tighter">
                  ERIC_DENNIS<span style={{ color: 'var(--gen-secondary)' }}>.USR</span>
                </div>
                {renderNav()}
             </div>
             <div className="flex gap-4 opacity-50">
                 <Github className="w-5 h-5" />
                 <Linkedin className="w-5 h-5" />
             </div>
          </div>
        )}

        {/* --- SCROLLABLE CONTENT AREA FOR SPLIT SCREEN --- */}
        <div className={`
          ${currentStyle.layout === 'split-screen' ? 'md:w-1/2 md:overflow-y-auto md:h-screen md:border-r md:p-12' : ''}
          ${currentStyle.layout === 'minimal-center' ? 'text-center' : ''}
        `} style={{ borderColor: 'var(--gen-surface)' }}>
          
          {/* HERO */}
          <section id="hero" className={`
            ${currentStyle.layout === 'split-screen' ? 'min-h-[50vh] flex flex-col justify-center' : 'min-h-[80vh] flex items-center justify-center'}
            ${currentStyle.layout === 'minimal-center' ? 'min-h-[40vh]' : ''}
             px-6 relative
          `}>
             <div className="w-full">
                <div className={`
                   inline-flex items-center gap-2 px-3 py-1 text-xs border mb-8
                   ${currentStyle.layout === 'minimal-center' ? 'mx-auto' : ''}
                `} style={{
                    backgroundColor: 'var(--gen-surface)',
                    borderColor: 'var(--gen-primary)',
                    borderRadius: 'var(--gen-radius)',
                    color: 'var(--gen-primary)'
                  }}>
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    SYSTEM OPERATIONAL
                </div>
                
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4 leading-none">
                    ERIC<br/>
                    <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, var(--gen-primary), var(--gen-secondary))` }}>DENNIS</span>
                </h1>
                
                {currentStyle.layout !== 'minimal-center' && (
                  <div className="h-1 w-24 mb-6" style={{ backgroundImage: `linear-gradient(to right, var(--gen-primary), var(--gen-secondary))` }}></div>
                )}

                <div className={`flex flex-col gap-2 text-lg md:text-xl mb-8 ${currentStyle.layout === 'minimal-center' ? 'items-center' : ''}`}>
                    <div className="flex items-center gap-3 opacity-80">
                        <Terminal className="w-5 h-5" style={{ color: 'var(--gen-secondary)' }} />
                        <span>Senior Systems Architect</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Cpu className="w-5 h-5" style={{ color: 'var(--gen-primary)' }} />
                        <span className="font-bold">Master Technologist</span>
                    </div>
                </div>

                <p className={`max-w-xl leading-relaxed text-lg opacity-80 mb-8 ${currentStyle.layout === 'minimal-center' ? 'mx-auto' : 'border-l-2 pl-4'}`} style={{ borderColor: 'var(--gen-surface)' }}>
                    20+ years bridging the gap between <span style={{ color: 'var(--gen-primary)' }}>kernel compilation</span> and <span style={{ color: 'var(--gen-secondary)' }}>serverless AI agents</span>.
                </p>

                <div className={`flex flex-wrap gap-4 ${currentStyle.layout === 'minimal-center' ? 'justify-center' : ''}`}>
                   <button 
                     onClick={() => scrollToSection('experience')} 
                     className="px-6 py-3 font-bold tracking-tight hover:opacity-90 transition-all"
                     style={{
                       backgroundColor: 'var(--gen-primary)',
                       color: 'var(--gen-bg)',
                       borderRadius: 'var(--gen-radius)'
                     }}
                   >
                      INITIATE_SEQUENCE
                   </button>
                   <button 
                     onClick={() => scrollToSection('contact')} 
                     className="px-6 py-3 border hover:opacity-80 transition-colors"
                     style={{
                       borderColor: 'var(--gen-surface)',
                       borderRadius: 'var(--gen-radius)'
                     }}
                   >
                      CONTACT_HOST
                   </button>
                </div>
             </div>
          </section>
        </div>

        {/* --- SECONDARY CONTENT AREA FOR SPLIT SCREEN --- */}
        <div className={`
           ${currentStyle.layout === 'split-screen' ? 'md:w-1/2 md:overflow-y-auto md:h-screen md:bg-[var(--gen-surface)]/10' : ''}
        `}>
          
          {/* SKILLS */}
          <section id="skills" className={`
            py-24 border-y relative overflow-hidden
            ${currentStyle.layout === 'minimal-center' ? 'border-none' : ''}
          `} style={{ borderColor: 'var(--gen-surface)' }}>
             <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className={`mb-12 ${currentStyle.layout === 'minimal-center' ? 'text-center' : ''}`}>
                    <h2 className="text-sm mb-2" style={{ color: 'var(--gen-primary)' }}>SYSTEM_DIAGNOSTICS</h2>
                    <h3 className="text-3xl font-bold">Core Competencies</h3>
                </div>

                <div className={`grid gap-8 ${currentStyle.layout === 'minimal-center' ? 'grid-cols-1' : 'lg:grid-cols-3'}`}>
                    <div className="lg:col-span-1 space-y-4">
                        <div className="p-6 transition-colors group gen-card">
                            <h4 className="text-lg font-bold mb-3 group-hover:opacity-100 opacity-90 transition-opacity">AI & ML Engineering</h4>
                            <div className="flex flex-wrap gap-2">
                                {["Gemini API", "Vertex AI", "GPT-4", "Agents", "RAG"].map(skill => (
                                    <span key={skill} className="px-2 py-1 text-xs border" style={{ color: 'var(--gen-primary)', borderColor: 'var(--gen-primary)', borderRadius: 'var(--gen-radius)', opacity: 0.8 }}>{skill}</span>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 transition-colors group gen-card">
                            <h4 className="text-lg font-bold mb-3 group-hover:opacity-100 opacity-90 transition-opacity">Systems & Cloud</h4>
                            <div className="flex flex-wrap gap-2">
                                {["Linux Kernel", "AWS / GCP", "K8s", "Terraform", "VoIP"].map(skill => (
                                    <span key={skill} className="px-2 py-1 text-xs border" style={{ color: 'var(--gen-secondary)', borderColor: 'var(--gen-secondary)', borderRadius: 'var(--gen-radius)', opacity: 0.8 }}>{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    {currentStyle.layout !== 'minimal-center' && (
                      <div className="lg:col-span-2 border p-6 flex items-center justify-center relative gen-card">
                          <SkillRadar />
                      </div>
                    )}
                </div>
             </div>
          </section>

          {/* EXPERIENCE */}
          <section id="experience" className="py-24 px-6 max-w-5xl mx-auto relative">
              <div className={`
                 mb-16 
                 ${currentStyle.layout === 'standard' ? 'pl-0 md:pl-24' : ''}
                 ${currentStyle.layout === 'minimal-center' ? 'text-center' : ''}
              `}>
                  <h2 className="text-sm mb-2" style={{ color: 'var(--gen-secondary)' }}>RUNTIME_LOGS</h2>
                  <h3 className="text-3xl md:text-4xl font-bold">Professional History</h3>
              </div>
              <ExperienceTimeline />
          </section>

          {/* HOMELAB */}
          <section id="homelab" className={`py-24 ${currentStyle.layout !== 'minimal-center' ? 'border-t' : ''}`} style={{ backgroundColor: currentStyle.layout === 'standard' ? 'var(--gen-surface)' : 'transparent', borderColor: 'var(--gen-bg)' }}>
            <div className="max-w-6xl mx-auto px-6">
                <NerdCred />
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="py-20 px-6 text-center border-t relative overflow-hidden" style={{ borderColor: 'var(--gen-surface)' }}>
             <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-8">Execute Connection</h3>
                <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
                    <a href="mailto:ericdennis@g1surveyresearch.com" className="group flex items-center justify-center gap-3 px-6 py-4 border hover:opacity-100 opacity-80 transition-all gen-card">
                        <Mail className="w-5 h-5" style={{ color: 'var(--gen-primary)' }} /> 
                        <span>ericdennis@g1surveyresearch.com</span>
                    </a>
                    <a href="tel:5309304584" className="group flex items-center justify-center gap-3 px-6 py-4 border hover:opacity-100 opacity-80 transition-all gen-card">
                        <Phone className="w-5 h-5" style={{ color: 'var(--gen-secondary)' }} /> 
                        <span>530.930.4584</span>
                    </a>
                </div>
             </div>
          </section>
        </div>
      </div>

      {/* Floating AI Assistant */}
      <AiTerminal onToolAction={handleToolAction} />
    </div>
  );
};

export default App;
