import React, { useState } from 'react';
import { Clock, AlertTriangle, ShieldCheck, MessageSquare, User, Filter } from 'lucide-react';

export default function TimelinePage() {
  const timelineEvents = [
    { id: 1, type: 'ALERT', title: 'AI Risk Alert ALT-9042 Generated', detail: 'Coded slang ("5 bricks", "20k USDT") detected in Telegram export.', time: '2026-08-28T18:42:00Z', risk: 'HIGH', caseNo: 'CASE-2026-089' },
    { id: 2, type: 'MESSAGE', title: 'Telegram Intercept: @ghost_operator → +1-555-0198', detail: 'Instruction sent to perform dead drop at north dock locker 4.', time: '2026-08-28T18:40:00Z', risk: 'HIGH', caseNo: 'CASE-2026-089' },
    { id: 3, type: 'EVIDENCE', title: 'Evidence Ingested & Signed On-Chain', detail: 'File Telegram_Export_Conv7891.json hashed with SHA-256 and anchored to Block #1402.', time: '2026-08-28T10:15:00Z', risk: 'LOW', caseNo: 'CASE-2026-089' },
    { id: 4, type: 'ACTION', title: 'Investigator Review Logged', detail: 'Agent Sarah Vance marked Alert ALT-9045 as Valid Indicator under active surveillance.', time: '2026-08-27T22:30:00Z', risk: 'MEDIUM', caseNo: 'CASE-2026-092' }
  ];

  const [typeFilter, setTypeFilter] = useState('ALL');

  const filteredEvents = timelineEvents.filter(e => typeFilter === 'ALL' || e.type === typeFilter);

  return (
    <div className="p-6 space-y-6 font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-wide text-slate-100 flex items-center space-x-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span>INTERACTIVE CHRONOLOGICAL TIMELINE</span>
          </h1>
          <p className="text-xs text-slate-400">Unified chronological sequence of messages, entity sightings, AI alerts, and investigator actions.</p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          {['ALL', 'ALERT', 'MESSAGE', 'EVIDENCE', 'ACTION'].map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold ${
                typeFilter === t ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6 relative">
        <div className="absolute left-8 top-10 bottom-10 w-[2px] bg-slate-800"></div>

        {filteredEvents.map(e => (
          <div key={e.id} className="relative pl-10 space-y-1">
            <div className="absolute left-[26px] top-1.5 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-slate-950"></div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold text-cyan-300">{new Date(e.time).toLocaleString()}</span>
              <span className="text-[10px] px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 rounded">{e.caseNo}</span>
            </div>
            <h3 className="font-bold text-sm text-slate-100">{e.title}</h3>
            <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 leading-relaxed">{e.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
