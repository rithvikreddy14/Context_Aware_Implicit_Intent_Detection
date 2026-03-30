import React, { useState, useRef } from 'react';
import { analyzeText } from './services/api';
import AnalyzedText from './components/results/AnalyzedText';
import AnalyticsDashboard from './components/dashboard/AnalyticsDashboard';
import { Send, Moon, Download, Sparkles, RefreshCcw } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const reportRef = useRef(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    try {
      const data = await analyzeText(inputText);
      setResults(data);
    } catch (err) {
      console.error("Backend unreachable");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const exportPDF = async () => {
    const element = reportRef.current;
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#f8fafc' });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4', true);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST');
    pdf.save('Tone_Analysis_Report.pdf');
  };

  return (
    <div className="min-h-screen bg-background text-gray-900 font-sans selection:bg-brand-100">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-100 flex justify-between items-center px-8 py-4 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-brand-500 text-white p-2.5 rounded-xl shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-gray-900 leading-tight tracking-tight">Context-Aware Implicit Intent Detection in Text</h1>
            <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider"></p>
          </div>
        </div>
        <button className="p-2.5 bg-gray-50 text-gray-500 rounded-full hover:bg-gray-100 hover:text-brand-600 transition-all border border-gray-200">
          <Moon className="w-4 h-4" />
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        
        {/* INPUT VIEW */}
        {!results && (
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-10 mt-8">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Understand the <span className="text-brand-500">True Tone</span> of Text</h2>
              <p className="text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
                Powered by BERT NLP. Paste any article, email, or message to analyze sentence-level sentiment with exact confidence scoring.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-saas border border-gray-100 p-2">
              <div className="p-4">
                <div className="flex justify-between items-center mb-3 px-2">
                  <label className="text-xs font-bold text-gray-400 tracking-widest uppercase">Input Source Text</label>
                  <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                    {inputText.length} / 5,000
                  </span>
                </div>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your text here for deep tone analysis..."
                  className="w-full h-56 p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-400 focus:bg-white outline-none resize-none text-sm text-gray-700 leading-relaxed transition-all mb-4"
                />
                <div className="flex justify-end px-2">
                  <button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !inputText.trim()}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-500 text-white rounded-xl font-semibold hover:bg-brand-600 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:transform-none text-sm"
                  >
                    {isAnalyzing ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {isAnalyzing ? 'Analyzing with BERT...' : 'Run Tone Analysis'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RESULTS VIEW */}
        {results && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" ref={reportRef}>
            
            {/* Results Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Analysis Dashboard</h2>
                <p className="text-sm text-gray-500 mt-1">AI-generated breakdown of your text.</p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3 w-full md:w-auto">
                <button 
                  onClick={() => {setResults(null); setInputText('');}}
                  className="flex-1 md:flex-none flex justify-center items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm"
                >
                  <RefreshCcw className="w-4 h-4" /> New Text
                </button>
                <button 
                  onClick={exportPDF}
                  className="flex-1 md:flex-none flex justify-center items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gray-900 border border-gray-900 rounded-xl hover:bg-gray-800 hover:shadow-md transition-all shadow-sm"
                >
                  <Download className="w-4 h-4" /> Export Report
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* TOP ROW: Text Comparison (Side-by-Side) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* 1. Original Text Card (Left) */}
                <div className="bg-white rounded-2xl shadow-saas border border-gray-100 p-6 h-full">
                   <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-5">
                     Original Input
                   </h3>
                   <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">
                        {inputText}
                      </p>
                   </div>
                </div>

                {/* 2. Analyzed Text Card (Right) */}
                <AnalyzedText sentences={results.sentences} />
              </div>

              {/* BOTTOM ROW: Horizontal Analytics Dashboard */}
              <AnalyticsDashboard summary={results.summary} sentences={results.sentences} />
            </div>

          </div>
        )}

      </main>
    </div>
  );
}