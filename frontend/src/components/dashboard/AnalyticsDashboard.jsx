import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip } from 'recharts';

const COLORS = {
  critical: '#ef4444', 
  neutral: '#94a3b8',  
  positive: '#10b981', 
};

export default function AnalyticsDashboard({ summary, sentences }) {
  if (!summary) return null;

  const pieData = [
    { name: 'Critical', value: summary.critical_percent },
    { name: 'Neutral', value: summary.neutral_percent },
    { name: 'Positive', value: summary.positive_percent },
  ].filter(item => item.value > 0);

  const barData = sentences.map((s, i) => ({
    name: `S${i+1}`,
    confidence: Number((s.confidence * 100).toFixed(0)),
    fill: COLORS[s.label]
  }));

  const maxTone = Object.keys(summary).reduce((a, b) => summary[a] > summary[b] ? a : b);
  const maxScore = summary[maxTone];
  const maxColor = COLORS[maxTone.replace('_percent', '')] || COLORS.neutral;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* 1. Overall Tone Gauge (Redesigned to fix collision) */}
      <div className="bg-white rounded-2xl shadow-saas border border-gray-100 p-6 flex flex-col items-center justify-between">
        <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase w-full text-left mb-4">Overall Tone</h3>
        
        {/* Clean SVG Gauge */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            {/* Background Track */}
            <path
              className="text-gray-100"
              strokeWidth="4"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* Colored Progress Arc */}
            <path
              stroke={maxColor}
              strokeWidth="4"
              strokeDasharray={`${maxScore}, 100`}
              strokeLinecap="round"
              fill="none"
              className="transition-all duration-1000 ease-out"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          {/* Centered Number */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold text-gray-800 leading-none">{maxScore.toFixed(0)}</span>
            <span className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-wider">
              {maxTone.replace('_percent', '')}
            </span>
          </div>
        </div>

        {/* Clean Legend Below Gauge */}
        <div className="flex justify-between w-full pt-4 border-t border-gray-50">
          <div className="flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-tone-critical mb-1"></div>
            <span className="text-[10px] text-gray-400 uppercase">Critical</span>
            <span className="text-sm font-bold text-gray-700">{summary.critical_percent.toFixed(0)}%</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-tone-neutral mb-1"></div>
            <span className="text-[10px] text-gray-400 uppercase">Neutral</span>
            <span className="text-sm font-bold text-gray-700">{summary.neutral_percent.toFixed(0)}%</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-tone-positive mb-1"></div>
            <span className="text-[10px] text-gray-400 uppercase">Positive</span>
            <span className="text-sm font-bold text-gray-700">{summary.positive_percent.toFixed(0)}%</span>
          </div>
        </div>
      </div>

      {/* 2. Tone Distribution Donut */}
      <div className="bg-white rounded-2xl shadow-saas border border-gray-100 p-6 flex flex-col">
        <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-2">Tone Distribution</h3>
        <div className="flex-grow w-full min-h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} stroke="none" dataKey="value" paddingAngle={2}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase()]} />
                ))}
              </Pie>
              <RechartsTooltip formatter={(value) => `${value.toFixed(1)}%`} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-2">
          {pieData.map(item => (
            <div key={item.name} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[item.name.toLowerCase()] }}></div>
              <span className="text-xs text-gray-600 font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Sentence Confidence Bar Chart */}
      <div className="bg-white rounded-2xl shadow-saas border border-gray-100 p-6 flex flex-col">
        <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">Sentence Confidence</h3>
        <div className="flex-grow w-full min-h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <XAxis dataKey="name" tick={{fontSize: 11, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
              <YAxis tick={{fontSize: 11, fill: '#94a3b8'}} axisLine={false} tickLine={false} domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} />
              <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
              <Bar dataKey="confidence" barSize={20} radius={[4, 4, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}