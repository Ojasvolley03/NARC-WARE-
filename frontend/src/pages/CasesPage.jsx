import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Search, Filter, ShieldAlert, User, FileText, ChevronRight, X, Clock, Network } from 'lucide-react';
import api, { MOCK_DATA } from '../services/api';

export default function CasesPage() {
  const [cases, setCases] = useState(MOCK_DATA.cases);
  const [selectedCase, setSelectedCase] = useState(null);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  useEffect(() => {
    api.get('/cases')
      .then(res => {
        if (res.data && res.data.length > 0) setCases(res.data);
      })
      .catch(() => setCases(MOCK_DATA.cases));
  }, []);

  const handleCreateCase = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const caseObj = {
      caseNumber: `CASE-2026-${Math.floor(100 + Math.random() * 899)}`,
      title: newTitle,
      description: newDesc || 'New investigation initiated based on intercepted intelligence.',
      status: 'NEW',
      riskLevel: 'HIGH',
      riskScore: 85,
      leadInvestigator: 'Agent Sarah Vance',
      priority: 'HIGH',
      createdAt: new Date().toISOString()
    };

    try {
      const res = await api.post('/cases', caseObj);
      setCases(prev => [res.data, ...prev]);
    } catch (err) {
      setCases(prev => [caseObj, ...prev]);
    }
    setShowCreateModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  const filteredCases = cases.filter(c => {
    const matchesStatus = filterStatus === 'ALL' || c.status === filterStatus;
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.caseNumber.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold font-mono tracking-wide text-slate-100 flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-cyan-400" />
            <span>CASE MANAGEMENT</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono">Law enforcement active, escalated, and archived investigation dockets.</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-extrabold shadow-cyan-glow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Case Docket</span>
        </button>
      </div>

      {/* Filter / Search Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by case # or title..."
            className="w-full bg-slate-950 border border-slate-700/60 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-mono"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {['ALL', 'NEW', 'UNDER_REVIEW', 'ACTIVE', 'ESCALATED', 'CLOSED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold transition-all shrink-0 ${
                filterStatus === status
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-cyan-glow'
                  : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Case Dockets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelectedCase(c)}
            className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/50 glass-panel-hover cursor-pointer space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-cyan-400">{c.caseNumber}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                  c.status === 'ESCALATED' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
                  c.status === 'ACTIVE' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' :
                  c.status === 'UNDER_REVIEW' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                  'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                  {c.status}
                </span>
              </div>

              <h3 className="font-bold text-sm text-slate-100 mt-2">{c.title}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{c.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
              <div className="flex items-center space-x-1.5 text-slate-400">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>{c.leadInvestigator || 'Agent Vance'}</span>
              </div>
              <span className="text-rose-400 font-bold">Risk: {c.riskScore}/100</span>
            </div>
          </div>
        ))}
      </div>

      {/* Case Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e1626] border border-cyan-500/40 rounded-2xl w-full max-w-3xl shadow-cyan-glow p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-cyan-400">{selectedCase.caseNumber}</span>
                <h2 className="text-lg font-extrabold text-slate-100 mt-0.5">{selectedCase.title}</h2>
              </div>
              <button onClick={() => setSelectedCase(null)} className="p-1 text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-slate-400">Threat Score</div>
                <div className="text-xl font-bold text-rose-400 mt-1">{selectedCase.riskScore}/100 HIGH</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-slate-400">Lead Investigator</div>
                <div className="text-sm font-bold text-cyan-300 mt-1">{selectedCase.leadInvestigator}</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-slate-400">Docket Status</div>
                <div className="text-sm font-bold text-emerald-400 mt-1">{selectedCase.status}</div>
              </div>
            </div>

            <div>
              <h4 className="font-mono text-xs font-bold text-slate-300 uppercase mb-2">Case Summary &amp; Objectives</h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                {selectedCase.description}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-xs font-bold text-slate-300 uppercase mb-2">Linked Suspect Entities</h4>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                <span className="px-3 py-1 bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 rounded-lg">@ghost_operator</span>
                <span className="px-3 py-1 bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 rounded-lg">+1-555-0198</span>
                <span className="px-3 py-1 bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 rounded-lg">0x71C...9A2</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedCase(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono rounded-xl font-bold"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Case Creation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleCreateCase} className="bg-[#0e1626] border border-cyan-500/40 rounded-2xl w-full max-w-lg shadow-cyan-glow p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm font-mono">INITIATE NEW CASE DOCKET</h3>
              <button type="button" onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Case Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Operation Cyber Tempest"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Description &amp; Intelligence Brief</label>
              <textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Describe suspected trafficking indicators, channels, or target handles..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500 h-28"
              />
            </div>

            <div className="pt-2 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-mono rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs font-mono rounded-xl shadow-cyan-glow"
              >
                Create Docket
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
