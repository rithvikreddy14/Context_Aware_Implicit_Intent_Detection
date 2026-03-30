import React from 'react';

const getBlockStyles = (label) => {
  if (label === 'critical') return 'bg-red-50 border-l-4 border-tone-critical text-red-900';
  if (label === 'positive') return 'bg-green-50 border-l-4 border-tone-positive text-green-900';
  return 'bg-slate-50 border-l-4 border-tone-neutral text-slate-800'; // Clean gray for neutral
};

export default function AnalyzedText({ sentences }) {
  if (!sentences || sentences.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-saas border border-gray-100 p-6 h-full">
      <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-5">
        Sentence-by-Sentence Breakdown
      </h3>
      <div className="flex flex-col gap-3">
        {sentences.map((sent, idx) => (
          <div 
            key={idx} 
            className={`px-4 py-3 rounded-r-lg ${getBlockStyles(sent.label)} transition-all`}
          >
            <p className="text-sm leading-relaxed">{sent.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}