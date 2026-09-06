import React, { useState, useEffect } from 'react';
import { MessageSquare, AlertTriangle, Search, Filter, ShieldCheck, RefreshCw } from 'lucide-react';
import api, { MOCK_DATA } from '../services/api';

export default function ConversationsPage() {
  const [messages, setMessages] = useState([
    { id: 1, conversationId: 'CONV-7891', sender: '@ghost_operator', receiver: '+1-555-0198', platform: 'TELEGRAM', content: 'Need 5 bricks dropped at the north dock locker by midnight. Send 20k USDT to escrow first.', riskScore: 92, flagged: true, caseNumber: 'CASE-2026-089', timestamp: '2026-08-28T18:40:00Z' },
    { id: 2, conversationId: 'CONV-7891', sender: '+1-555-0198', receiver: '@ghost_operator', platform: 'TELEGRAM', content: 'Tx sent: 0x71C7656EC7ab88b098defB751B7401B5f6d89A2. Key is inside blue baggie under locker 4.', riskScore: 88, flagged: true, caseNumber: 'CASE-2026-089', timestamp: '2026-08-28T18:42:00Z' },
    { id: 3, conversationId: 'CONV-8802', sender: '@phantom_vendor', receiver: 'Jackal', platform: 'WHATSAPP', content: 'Package is pure uncut. Switch to Signal app immediately and clear this chat.', riskScore: 85, flagged: true, caseNumber: 'CASE-2026-092', timestamp: '2026-08-28T16:10:00Z' },
    { id: 4, conversationId: 'CONV-8802', sender: 'Jackal', receiver: '@phantom_vendor', platform: 'WHATSAPP', content: 'Copy that. Courier is on the way to parking lot exit 3.', riskScore: 72, flagged: true, caseNumber: 'CASE-2026-092', timestamp: '2026-08-28T16:12:00Z' },
    { id: 5, conversationId: 'CONV-9014', sender: '+1-555-0198', receiver: '@ghost_operator', platform: 'SMS', content: 'Confirming wire received. Next batch moving tomorrow morning at 04:00 AM.', riskScore: 78, flagged: true, caseNumber: 'CASE-2026-089', timestamp: '2026-08-28T12:00:00Z' }
  ]);

  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState('ALL');

  const filteredMessages = messages.filter(m => {
    const matchesPlatform = platformFilter === 'ALL' || m.platform === platformFilter;
    const matchesSearch = m.content.toLowerCase().includes(search.toLowerCase()) || m.sender.toLowerCase().includes(search.toLowerCase()) || m.receiver.toLowerCase().includes(search.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6 font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-wide text-slate-100 flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            <span>INTERCEPTED CONVERSATIONS &amp; MESSAGING EXPORTS</span>
          </h1>
          <p className="text-xs text-slate-400">WhatsApp, Telegram, and Signal decrypted messaging stream logs.</p>
        </div>

        <div className="flex items-center space-x-2">
          {['ALL', 'TELEGRAM', 'WHATSAPP', 'SMS'].map(p => (
            <button
              key={p}
              onClick={() => setPlatformFilter(p)}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                platformFilter === p ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-panel rounded-2xl border border-slate-800 p-4 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search intercepted message text, sender, or receiver..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="space-y-3">
          {filteredMessages.map(m => (
            <div key={m.id} className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl hover:border-slate-700 transition-all space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-cyan-400">{m.sender}</span>
                  <span className="text-slate-500">→</span>
                  <span className="font-bold text-cyan-400">{m.receiver}</span>
                  <span className="px-2 py-0.5 bg-slate-950 text-slate-400 rounded border border-slate-800 text-[10px]">{m.platform}</span>
                </div>
                <div className="flex items-center space-x-3 text-[11px]">
                  <span className="text-slate-400">{new Date(m.timestamp).toLocaleTimeString()}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    m.riskScore >= 75 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    Risk: {m.riskScore}/100
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-200 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800/60 font-mono">
                {m.content}
              </div>

              <div className="text-[10px] text-slate-500 flex items-center justify-between">
                <span>Conv ID: {m.conversationId} • Case: {m.caseNumber}</span>
                <span className="text-rose-400 font-semibold">Flagged for Coded Terminology</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
