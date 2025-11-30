import React, { useEffect, useState, useRef } from 'react';
import { Terminal, CheckCircle, Loader, AlertTriangle, X, ArrowRight } from 'lucide-react';

interface DeploymentConsoleProps {
  envType: 'agent' | 'cluster' | 'database';
  onClose: () => void;
}

const DeploymentConsole: React.FC<DeploymentConsoleProps> = ({ envType, onClose }) => {
  const [lines, setLines] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const steps = [
        `Initializing Terraform backend for module: ${envType}_infrastructure...`,
        `[aws] Refreshing state... id=i-04a1b2c3d4e5f6g7h`,
        `[aws] Found existing VPC: vpc-0a1b2c3d`,
        `Plan: 4 to add, 0 to change, 0 to destroy.`,
        `aws_instance.${envType}_node: Creating...`,
        `aws_instance.${envType}_node: Still creating... [10s elapsed]`,
        `aws_instance.${envType}_node: Still creating... [20s elapsed]`,
        `aws_instance.${envType}_node: Creation complete after 22s [id=i-1234567890abcdef0]`,
        `aws_security_group_rule.allow_ssh: Creating...`,
        `aws_security_group_rule.allow_ssh: Creation complete`,
        `Provisioning Docker containers...`,
        `Pulling image: ericdennis/${envType}-core:latest...`,
        `Digest: sha256:7b0a...`,
        `Status: Downloaded newer image for ${envType}-core:latest`,
        `Starting service...`,
        `Health check passed: HTTP 200 OK`,
        `Apply complete! Resources: 4 added, 0 changed, 0 destroyed.`,
        `Outputs: endpoint = "https://${envType}-api.ericdennis.dev"`
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
        if (currentIndex < steps.length) {
            const nextLine = steps[currentIndex];
            if (nextLine) {
                setLines(prev => [...prev, nextLine]);
            }
            currentIndex++;
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
        } else {
            clearInterval(interval);
            setComplete(true);
        }
    }, 600);

    return () => clearInterval(interval);
  }, [envType]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#0d1117] border border-zinc-700 rounded-lg shadow-2xl overflow-hidden flex flex-col font-mono text-sm relative">
        
        {/* Header */}
        <div className="bg-zinc-900 border-b border-zinc-800 p-3 flex justify-between items-center">
            <div className="flex items-center gap-2 text-zinc-400">
                <Terminal className="w-4 h-4" />
                <span>deploy-{envType}.sh</span>
            </div>
            <button onClick={onClose} className="hover:text-white transition-colors">
                <X className="w-4 h-4" />
            </button>
        </div>

        {/* Console Body */}
        <div className="h-[400px] overflow-y-auto p-4 space-y-2 text-zinc-300" ref={scrollRef}>
            {lines.map((line, idx) => {
                if (!line) return null;
                
                const isError = line.includes("Error");
                const isSuccess = line.includes("complete") || line.includes("passed");
                const isProgress = line.includes("Creating") || line.includes("Pulling");

                return (
                    <div key={idx} className="flex gap-2 break-all">
                        <span className="text-zinc-600 select-none">$</span>
                        <span className={`
                            ${isError ? 'text-red-400' : ''}
                            ${isSuccess ? 'text-green-400' : ''}
                            ${isProgress ? 'text-yellow-400' : ''}
                        `}>{line}</span>
                    </div>
                )
            })}
            {!complete && (
                <div className="flex gap-2 animate-pulse">
                    <span className="text-zinc-600">$</span>
                    <span className="w-2 h-4 bg-zinc-500"></span>
                </div>
            )}
            {complete && (
                 <div className="mt-4 p-3 bg-green-900/20 border border-green-900/50 text-green-400 rounded flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Deployment Successful
                 </div>
            )}
        </div>

        {/* Action Footer (Only appears when done) */}
        {complete && (
            <div className="p-4 border-t border-zinc-800 bg-zinc-900 flex justify-end">
                <button 
                    onClick={onClose}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors font-bold"
                >
                    Close Connection <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default DeploymentConsole;