import React from 'react';
import { EXPERIENCES } from '../constants';
import { MapPin, Terminal } from 'lucide-react';

const ExperienceTimeline: React.FC = () => {
  return (
    <div className="space-y-12 md:pl-8 relative">
       {/* Note: Logic for left-line can be dynamic, simplified here for new layout compatibility */}
      {EXPERIENCES.map((job, index) => (
        <div key={index} className="relative group">
          
          {/* Content Card */}
          <div className="relative p-6 transition-colors gen-card">
            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                <h3 className="text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--gen-text)' }}>
                    {job.company}
                    {index === 0 && <span className="text-xs px-2 py-0.5 border font-mono" style={{ backgroundColor: 'var(--gen-surface)', color: 'var(--gen-secondary)', borderColor: 'var(--gen-secondary)', borderRadius: 'var(--gen-radius)' }}>CURRENT</span>}
                </h3>
                <span className="font-mono text-sm opacity-60">{job.period}</span>
            </div>
            
            <div className="text-lg mb-4 font-mono" style={{ color: 'var(--gen-primary)' }}>{job.role}</div>
            
            <div className="mb-4 flex items-center gap-2 text-xs opacity-60 font-mono uppercase tracking-wider">
                 <MapPin className="w-3 h-3" /> {job.location}
            </div>

            <p className="mb-6 leading-relaxed max-w-3xl opacity-80">
                {job.description}
            </p>
            
            <div className="grid md:grid-cols-2 gap-3">
                {job.highlights.map((item, i) => (
                    <div 
                      key={i} 
                      className="flex items-start gap-3 text-sm border p-3 transition-colors hover:opacity-100 opacity-90"
                      style={{
                        backgroundColor: 'var(--gen-surface)',
                        borderColor: 'var(--gen-bg)',
                        borderRadius: 'var(--gen-radius)'
                      }}
                    >
                        <Terminal className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--gen-secondary)' }} />
                        <span>{item}</span>
                    </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceTimeline;