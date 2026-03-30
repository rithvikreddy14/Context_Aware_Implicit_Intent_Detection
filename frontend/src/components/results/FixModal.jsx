import React, { useState } from 'react';
import { refineText } from '../../services/api';
import { Sparkles, Copy, Check } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';

export default function FixModal({ originalText, criticalPercent }) {
  const [isRefining, setIsRefining] = useState(false);
  const [refinedText, setRefinedText] = useState(null);
  const [copied, setCopied] = useState(false);

  if (criticalPercent <= 30) return null;

  const handleRefine = async () => {
    setIsRefining(true);
    try {
      const result = await refineText(originalText);
      setRefinedText(result.refined_text);
    } catch (error) {
      console.error("Failed to refine text", error);
    } finally {
      setIsRefining(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(refinedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6 bg-gradient-to-br from-brand-50 to-white p-6 rounded-2xl border border-brand-100 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-brand-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-600" />
            Mistral AI Refinement
          </h3>
          <p className="text-sm text-brand-700 mt-1">
            High critical tone detected ({criticalPercent.toFixed(0)}%). Generate a professional, neutral rewrite.
          </p>
        </div>
        {!refinedText && (
          <button 
            onClick={handleRefine}
            disabled={isRefining}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700 transition-colors disabled:opacity-70 shadow-sm"
          >
            {isRefining ? <LoadingSpinner text="Refining..." /> : <><Sparkles className="w-4 h-4" /> Improve Tone</>}
          </button>
        )}
      </div>

      {refinedText && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-white p-5 rounded-xl border border-red-100 opacity-80">
            <span className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2 block">Original (Critical)</span>
            <p className="text-gray-600 text-sm leading-relaxed">{originalText}</p>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-green-200 shadow-sm relative group">
            <span className="text-xs font-bold uppercase tracking-wider text-green-600 mb-2 block">Refined (Professional)</span>
            <p className="text-gray-900 text-sm leading-relaxed">{refinedText}</p>
            
            <button 
              onClick={copyToClipboard}
              className="absolute top-4 right-4 p-2 bg-gray-50 text-gray-500 hover:text-brand-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}