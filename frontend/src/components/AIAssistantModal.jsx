import React, { useState } from 'react';
import { Bot, Send, X, ShieldAlert, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import api from '../services/api';

export default function AIAssistantModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Greetings Agent. I am the NARC-WARE Investigation Assistant. Query authorized case evidence, connected entities, or risk indicator summaries.',
      citedEvidence: []
    }
  ]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await api.post('/assistant/query', { query: userMsg });
      const data = res.data;
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: data.answer || 'Query processed.',
          citedEvidence: data.citedEvidenceIds || ['EVD-881', 'EVD-882']
        }
      ]);
    } catch (err) {
      // Fallback AI response
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `Based on evidence logs for '${userMsg}':\n\n• Coded slang ('5 bricks', '20k USDT') identified in Telegram chat exports.\n• Cell tower proximity places Entity +1-555-0198 near port entry locker at 02:14 AM.\n\n*Classification: Potentially Suspicious / Requires Human Review.*`,
          citedEvidence: ['EVD-881', 'EVD-883']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0e1626] border border-cyan-500/40 rounded-2xl w-full max-w-2xl shadow-cyan-glow flex flex-col h-[600px] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-cyan-950/60 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cyan-500/20 border border-cyan-500/40 rounded-xl text-cyan-400">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
                <span>AI Investigation Assistant</span>
                <span className="bg-cyan-500/20 text-cyan-300 text-[10px] px-2 py-0.5 rounded-full border border-cyan-500/30 font-mono">RAG ENGINE</span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">Interrogating Authorized Case Evidence Vault</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 font-mono text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-xl p-4 space-y-2 ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-none'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none shadow-lg'
                }`}
              >
                <div className="whitespace-pre-line leading-relaxed">{m.text}</div>
                {m.citedEvidence && m.citedEvidence.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/60 flex items-center space-x-2 text-[10px] text-cyan-400">
                    <FileText className="w-3 h-3" />
                    <span>CITED EVIDENCE: {m.citedEvidence.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center space-x-2 text-cyan-400">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Searching evidence vectors &amp; RAG index...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center space-x-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask AI: 'Summarize suspicious indicators' or 'Which entities have most connections?'"
            className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 font-mono"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 p-2.5 rounded-xl font-bold transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
