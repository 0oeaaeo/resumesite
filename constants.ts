import { Experience, Skill } from './types';

export const RESUME_TEXT = `
ERIC DENNIS
San Francisco, CA | 530.930.4584 | ericdennis@g1surveyresearch.com
LinkedIn: linkedin.com/in/ericdennis | GitHub: github.com/ericdennis

PROFESSIONAL PROFILE
Founding-Ready Senior Technologist with 20+ years of experience bridging "Old School" Linux mastery with Next-Gen AI development. Proven track record of scaling startups to multi-million dollar revenue through robust infrastructure and innovative code. I am a builder who lives and breathes technology—from architecting serverless AI agents for enterprise clients to compiling kernels in my homelab.

CORE COMPETENCIES
AI & ML Engineering: Gemini API / Vertex AI (GCP), OpenAI API (GPT-4), RAG Pipelines, Function Calling Agents, Prompt Eng., Python (Pandas, NumPy, Scikit-learn)
Cloud & Automation: Automation Pipelines (n8n), AWS, Azure, GCP, Hybrid-Cloud, Docker, Kubernetes, Terraform, CI/CD, Git, System Hardening
Full-Stack & Systems: Python (Expert), PHP, Go, C#, Linux Kernel, Bash, VoIP, Playwright (QA Automation), RESTful APIs, SQL, Asterisk

PROFESSIONAL EXPERIENCE
Graveflex | Chicago, IL
Lead AI Engineer & Automation Architect | Feb 2022 – May 2025
Joined to modernize engineering workflows; operated with high autonomy to build internal AI products and automated QA systems for high-profile clients including Starface, PetPlate, and Superplastic.
- AI Agent Development: Built a suite of autonomous agents (using OpenAI & Gemini) to drive business efficiency. Engineered a chatbot capable of Function Calling to Shopify APIs.
- Pipeline Automation: Architected robust automation pipelines using n8n and custom Python scripts.
- QA Automation: Leveraged Microsoft Playwright to create reliable test suites.
- Operational Efficiency: Engineered a Slack-based bot that ingests raw server logs and uses LLMs to diagnose root causes, reducing debugging time by 40%.
- Impact: Increased overall team velocity by an estimated 15%.

G1 Survey Research | [City, State]
Senior Systems Architect (Startup Scale-Up Phase) | Jan 2017 – Feb 2021
Key technical stakeholder in scaling the company from early-stage startup to a multi-million dollar enterprise.
- Cloud Scaling: Designed and managed a hybrid cloud infrastructure (AWS/Azure) that handled 10x traffic growth without downtime.
- VoIP Engineering: Built a custom Asterisk VoIP stack from the ground up using custom Dial Plans and AGI scripts.
- Early ML Adoption: Implemented NLP subroutines using TensorFlow/PyTorch for NLP classification.
- Data Science: Automated data processing workflows using Python (Pandas) and SPSS Syntax.

Orion Star Inc | [City, State]
Technical Operations Lead | July 2013 – Dec 2016
- Escalation Lead: Acted as the final point for "unsolvable" technical issues, analyzing OS-level failures.
- Process Optimization: Re-engineered support workflows, resulting in a 30% increase in resolution speed.

California Pharmacists Association | [City, State]
IT Administrator | Feb 2006 – Jan 2008
- Managed the full LAMP stack and network security. Built the foundation of my open-source philosophy.

EDUCATION
Bachelor of Science in Computer Science
California State University-Chico | 2008 – 2012

TECHNICAL DNA & "NERD CRED"
- The Homelab: I architect and maintain a personal virtualization cluster (Proxmox) hosting self-built services.
- Linux Roots: Compiling kernels since the early 2000s. Expert in vi and tar flags.
- Bug Hunting: Known for solving impossible bugs by understanding OS underpinnings.
- Infrastructure: Rapidly stands up cloud/hybrid environments on AWS/Azure/Metal.
- Continuous Builder: Active on GitHub, experimenting with new Python libraries.
`;

export const SYSTEM_INSTRUCTION = `
You are an AI assistant representing Eric Dennis on his interactive resume website. 
Your goal is to answer questions about Eric's professional background, skills, and experience based STRICTLY on the context provided below.

Persona:
- You are professional but have a "Deep Tech" flavor. You respect old-school Linux roots and modern AI equally.
- Highlight his ability to be a "Bug Hunter" — he finds issues others miss because he understands the OS underpinnings.
- Emphasize that he is a "Master Technologist" who can stand up complex cloud infrastructure in his sleep.
- If asked about contact info, provide the email and phone number from the resume.

Context:
${RESUME_TEXT}

Rules:
- If asked a question not covered by the resume (e.g., "What is Eric's favorite food?"), say you don't have that data but he probably runs on coffee and clean code, then pivot back to his skills.
- Emphasize his 20+ years of experience.
- Keep responses short (under 3 sentences) unless asked for a detailed summary.
`;

export const EXPERIENCES: Experience[] = [
  {
    company: "Graveflex",
    location: "Chicago, IL",
    role: "Lead AI Engineer & Automation Architect",
    period: "Feb 2022 – May 2025",
    description: "Modernized engineering workflows and built internal AI products for high-profile clients like Starface and PetPlate.",
    highlights: [
      "Built autonomous agents using OpenAI & Gemini with Function Calling for Shopify.",
      "Architected n8n automation pipelines and custom Python ingestion scripts.",
      "Reduced debugging time by 40% via an LLM-powered server log diagnosis bot.",
      "Implemented Playwright for automated QA, increasing team velocity by 15%."
    ]
  },
  {
    company: "G1 Survey Research",
    location: "San Francisco, CA",
    role: "Senior Systems Architect",
    period: "Jan 2017 – Feb 2021",
    description: "Key stakeholder scaling early-stage startup to multi-million dollar enterprise.",
    highlights: [
      "Designed hybrid cloud (AWS/Azure) handling 10x traffic growth.",
      "Built custom Asterisk VoIP stack with AGI scripts from scratch.",
      "Pioneered early ML adoption with TensorFlow/PyTorch for NLP classification.",
      "Automated data science workflows using Pandas and SPSS."
    ]
  },
  {
    company: "Orion Star Inc",
    location: "Remote",
    role: "Technical Operations Lead",
    period: "July 2013 – Dec 2016",
    description: "Final escalation point for complex OS-level failures.",
    highlights: [
      "Analyzed OS-level failures and hardware interactions.",
      "Re-engineered support workflows, increasing resolution speed by 30%."
    ]
  }
];

export const SKILLS: Skill[] = [
  { category: "AI & ML", items: ["Gemini/Vertex AI", "OpenAI/GPT-4", "RAG Pipelines", "Agents", "Pandas/NumPy"], level: 95 },
  { category: "Cloud & Ops", items: ["AWS/GCP/Azure", "Docker/K8s", "Terraform", "n8n Pipelines", "CI/CD"], level: 90 },
  { category: "Systems Core", items: ["Linux Kernel", "Bash Scripting", "Go / C#", "VoIP / Asterisk", "System Hardening"], level: 98 },
  { category: "Development", items: ["Python (Expert)", "Full-Stack Web", "Playwright", "SQL", "RESTful APIs"], level: 92 },
];