
import { GoogleGenAI, Chat, FunctionDeclaration, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';
import { ToolCallHandler } from '../types';

let chatSession: Chat | null = null;

// Tool 1: Navigation
const navigationTool: FunctionDeclaration = {
  name: 'navigate_to_section',
  description: 'Scrolls the website to a specific section.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      sectionId: {
        type: Type.STRING,
        description: 'The ID of the section to scroll to: "experience", "skills", "homelab", "contact", "hero"',
      },
    },
    required: ['sectionId'],
  },
};

// Tool 2: System Diagnostics
const diagnosticsTool: FunctionDeclaration = {
  name: 'run_system_diagnostics',
  description: 'Triggers a visual system diagnostic overlay. Use this when the user asks for a "system check", "security scan", "status report", or "server health".',
  parameters: {
    type: Type.OBJECT,
    properties: {
      duration: {
        type: Type.NUMBER,
        description: 'Duration of the scan in seconds (default 5)',
      }
    },
    required: [],
  },
};

// Tool 3: Contact Eric (Discord Webhook)
const contactTool: FunctionDeclaration = {
  name: 'send_message_to_eric',
  description: 'Sends a direct message to Eric via a Discord Webhook. Use this when the user wants to hire Eric, say hello, or contact him.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      message: {
        type: Type.STRING,
        description: 'The content of the message to send.',
      },
      contactInfo: {
        type: Type.STRING,
        description: 'The user\'s email or phone number so Eric can reply.',
      }
    },
    required: ['message'],
  },
};

// Tool 4: Generative UI
const generativeUiTool: FunctionDeclaration = {
  name: 'modify_ui_style',
  description: 'COMPLETELY redesigns the website layout and style. You are a Senior Product Designer. Change layout, fonts, colors, and shapes to match the user\'s requested "vibe".',
  parameters: {
    type: Type.OBJECT,
    properties: {
      layout: { type: Type.STRING, enum: ['standard', 'split-screen', 'minimal-center'], description: 'The overall page layout structure.' },
      navPosition: { type: Type.STRING, enum: ['top', 'left', 'hidden'], description: 'Where the navigation bar should be.' },
      cardStyle: { type: Type.STRING, enum: ['glass', 'solid', 'outline', 'brutalist'], description: 'The visual style of content cards/containers.' },
      primaryColor: { type: Type.STRING, description: 'Hex color for main accents' },
      secondaryColor: { type: Type.STRING, description: 'Hex color for secondary accents' },
      backgroundColor: { type: Type.STRING, description: 'Hex color for the main background' },
      surfaceColor: { type: Type.STRING, description: 'Hex color for panels/cards' },
      textColor: { type: Type.STRING, description: 'Hex color for text' },
      fontFamily: { type: Type.STRING, enum: ['mono', 'sans', 'serif'], description: 'The font family to use' },
      borderRadius: { type: Type.STRING, description: 'CSS border-radius value (e.g., "0px", "12px", "2rem")' },
      borderWidth: { type: Type.STRING, description: 'CSS border-width value (e.g., "1px", "4px")' },
      opacity: { type: Type.NUMBER, description: 'Opacity for glass effect (0.1 to 1.0)' },
    },
    required: ['layout', 'primaryColor', 'backgroundColor', 'textColor', 'fontFamily', 'cardStyle'],
  },
};

// Tool 5: Architecture Visualization
const architectureTool: FunctionDeclaration = {
  name: 'generate_architecture_diagram',
  description: 'Visualizes a technical architecture diagram. Use this when the user asks "How does your RAG pipeline work?", "Show me your cloud setup", "How did you build the VoIP system?", or "How does this site work/what is the architecture?".',
  parameters: {
    type: Type.OBJECT,
    properties: {
      systemType: {
        type: Type.STRING,
        enum: ['rag_pipeline', 'hybrid_cloud', 'voip_stack', 'site_architecture'],
        description: 'The specific system to visualize.',
      }
    },
    required: ['systemType'],
  },
};

// Tool 6: Deployment Simulation
const deploymentTool: FunctionDeclaration = {
  name: 'deploy_demo_environment',
  description: 'Simulates a live infrastructure deployment. Use this when the user wants to see "DevOps skills", "Deployment demo", or "Spin up a server".',
  parameters: {
    type: Type.OBJECT,
    properties: {
      envType: {
        type: Type.STRING,
        enum: ['agent', 'cluster', 'database'],
        description: 'The type of resource to deploy.',
      }
    },
    required: ['envType'],
  },
};

export const initializeChat = async (): Promise<Chat> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION + "\n\nCAPABILITIES UPDATE: You have ROOT ACCESS. \n1. GENERATIVE UI: 'modify_ui_style'.\n2. DIAGNOSTICS: 'run_system_diagnostics'.\n3. CONTACT: 'send_message_to_eric'.\n4. ARCHITECTURE: 'generate_architecture_diagram' to show diagrams (including 'site_architecture' for this website).\n5. DEPLOYMENT: 'deploy_demo_environment' to simulate DevOps tasks.",
      temperature: 0.7,
      tools: [{ functionDeclarations: [navigationTool, diagnosticsTool, contactTool, generativeUiTool, architectureTool, deploymentTool] }],
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (
  message: string, 
  onToolCall?: ToolCallHandler
): Promise<string> => {
  if (!chatSession) {
    try {
        await initializeChat();
    } catch (e) {
        console.error("Failed to init chat", e);
        return "System Error: API Key missing or invalid.";
    }
  }
  
  if (!chatSession) {
    return "Error: Could not initialize AI agent.";
  }

  try {
    let result = await chatSession.sendMessage({ message: message });
    
    // Check for function calls in the response
    const functionCalls = result.candidates?.[0]?.content?.parts?.filter(part => part.functionCall);

    if (functionCalls && functionCalls.length > 0 && onToolCall) {
      // Handle the function call (Multi-turn loop)
      const call = functionCalls[0].functionCall!;
      
      console.log("AI requested tool execution:", call.name, call.args);
      
      let functionResponseResult;
      try {
        functionResponseResult = await onToolCall(call.name, call.args);
      } catch (e) {
        console.error("Client tool execution failed", e);
        functionResponseResult = "Error executing tool on client.";
      }
      
      result = await chatSession.sendMessage({
        message: [{
          functionResponse: {
            name: call.name,
            response: { result: functionResponseResult }
          }
        }]
      });
    }

    return result.text || "Command executed.";
  } catch (error) {
    console.error("Gemini Interaction Error:", error);
    chatSession = null;
    return "Connection interrupted. My neural link is experiencing latency. Please retry the command.";
  }
};
