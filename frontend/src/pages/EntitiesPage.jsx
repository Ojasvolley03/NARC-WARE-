import React, { useState, useEffect } from 'react';
import { Users, Phone, UserCheck, Wallet, ShieldAlert, MessageSquare, ExternalLink, Network } from 'lucide-react';
import api, { MOCK_DATA } from '../services/api';

export default function EntitiesPage() {
  const [entities, setEntities] = useState(MOCK_DATA.entities);
  const [selectedEntity, setSelectedEntity] = useState(null);

  useEffect(() => {
    api.get('/entities')
      .then(res => { if (res.data?.length) setEntities(res.data); })
      .catch(() => setEntities(MOCK_DATA.entities));
  }, []);

  const getIcon = (type) => {
    if (type === 'PHONE') return Phone;
    if (type === 'WALLET') return Wallet;
    return Users;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold font-mono tracking-wide text-slate-100 flex items-center space-x-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <span>ENTITY INTELLIGENCE HUB</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono">Cross-channel suspect entity profiling, phone numbers, handles, and crypto wallets.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entities.map(e => {
          const Icon = getIcon(e.type);
          return (
            <div
              key={e.id}
              onClick={() => setSelectedEntity(e)}
              className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/50 glass-panel-hover cursor-pointer space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-slate-900 rounded-lg text-cyan-400 border border-slate-800">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400 uppercase">{e.type}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    e.riskScore >= 75 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    {e.riskScore}/100 HIGH
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-100 mt-3 font-mono">{e.name}</h3>
                <div className="font-mono text-xs text-cyan-300 mt-0.5 truncate">{e.identifier}</div>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">{e.threatFlags}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs text-slate-400">
                <span>{e.messageCount} Messages</span>
                <span>{e.connectionCount} Network Degrees</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Entity Deep Dive Modal */}
      {selectedEntity && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e1626] border border-cyan-500/40 rounded-2xl w-full max-w-2xl shadow-cyan-glow p-6 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="font-mono text-xs text-cyan-400 font-bold">{selectedEntity.type} PROFILE</span>
                <h2 className="text-lg font-extrabold text-slate-100">{selectedEntity.name}</h2>
                <div className="font-mono text-xs text-slate-300 mt-0.5">{selectedEntity.identifier}</div>
              </div>
              <button onClick={() => setSelectedEntity(null)} className="text-slate-400 hover:text-slate-200">✕</button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-slate-400">Threat Score</div>
                <div className="text-lg font-bold text-rose-400 mt-0.5">{selectedEntity.riskScore}/100</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-slate-400">Intercept Volume</div>
                <div className="text-lg font-bold text-cyan-300 mt-0.5">{selectedEntity.messageCount} msgs</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-slate-400">Linked Case</div>
                <div className="text-sm font-bold text-slate-200 mt-0.5 truncate">{selectedEntity.caseNumber}</div>
              </div>
            </div>

            <div>
              <h4 className="font-mono text-xs font-bold text-slate-300 uppercase mb-2">Flagged Intelligence Indicators</h4>
              <p className="text-xs text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono leading-relaxed">
                {selectedEntity.threatFlags}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button onClick={() => setSelectedEntity(null)} className="px-4 py-2 bg-slate-800 text-slate-200 text-xs font-mono rounded-xl">
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
