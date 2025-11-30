import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { SKILLS } from '../constants';

const SkillRadar: React.FC = () => {
  const data = SKILLS.map(s => ({
    name: s.category,
    level: s.level,
    details: s.items.join(', ')
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="backdrop-blur border p-4 shadow-xl" style={{ backgroundColor: 'var(--gen-surface)', borderColor: 'var(--gen-primary)' }}>
          <p className="font-mono font-bold mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--gen-primary)' }}>{label}</p>
          <p className="text-xs font-mono max-w-[200px]" style={{ color: 'var(--gen-text)' }}>
            {payload[0].payload.details}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="2 4" stroke="var(--gen-surface)" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            tick={{ fill: 'var(--gen-text)', fontSize: 12, fontFamily: 'var(--gen-font)', fontWeight: 'bold' }} 
            width={120}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{fill: 'var(--gen-surface)', opacity: 0.4}} />
          <Bar dataKey="level" radius={[0, 2, 2, 0]} barSize={12}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={index % 2 === 0 ? 'var(--gen-primary)' : 'var(--gen-secondary)'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillRadar;