
export interface Experience {
  company: string;
  location: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Skill {
  category: string;
  items: string[];
  level: number; // 0-100 for visualization
}

export interface TerminalLine {
  text: string;
  delay: number;
  id: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export type ToolCallHandler = (toolName: string, args: any) => Promise<any>;

// Generative Style - now controls Layout and Component Design
export interface GenerativeStyle {
  // Layout Controls
  layout: 'standard' | 'split-screen' | 'minimal-center';
  navPosition: 'top' | 'left' | 'hidden';
  
  // Visual Theme
  primaryColor: string;     // Main accent (e.g., cyan)
  secondaryColor: string;   // Secondary accent (e.g., violet)
  backgroundColor: string;  // Main bg (e.g., black)
  surfaceColor: string;     // Card/Panel bg (e.g., zinc-900)
  textColor: string;        // Main text
  
  // Component Design
  fontFamily: 'mono' | 'sans' | 'serif';
  borderRadius: string;     // e.g., '0px', '0.5rem', '1.5rem'
  borderWidth: string;      // e.g., '1px', '2px'
  opacity: number;          // Glassmorphism intensity (0-1)
  cardStyle: 'glass' | 'solid' | 'outline' | 'brutalist';
}

export interface SystemMetrics {
  cpu: number;
  memory: number;
  network: number;
  status: 'OPTIMAL' | 'WARNING' | 'CRITICAL';
}

export type ArchitectureType = 'rag_pipeline' | 'hybrid_cloud' | 'voip_stack' | 'site_architecture' | null;

export interface DeploymentConfig {
  type: 'agent' | 'database' | 'cluster';
  status: 'deploying' | 'active' | 'failed';
}
