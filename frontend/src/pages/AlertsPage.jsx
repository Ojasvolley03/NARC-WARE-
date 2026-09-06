import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldCheck, CheckCircle, XCircle, ArrowUpRight, FileText, UserPlus, Filter, Search } from 'lucide-react';
import api, { MOCK_DATA } from '../services/api';

export default function AlertsPage({ activeCategory }) {
  const [alerts, setAlerts] = useState(MOCK_DATA.alerts);
  const [filter, setFilter] = useState('ALL');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    api.get('/alerts')
      .then(res => { if (res.data?.length) setAlerts(res.data); })
      .catch(() => setAlerts(MOCK_DATA.alerts));
  }, []);

  const handleAction = async (alertId, action) => {
    try {
      const res = await api.put(`/alerts/${alertId}/action`, { action, note: noteText });
      setAlerts(prev => prev.map(a => a.id === alertId ? res.data : a));
    } catch (err) {
      setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: action } : a));
    }
    if (selectedAlert && selectedAlert.id === alertId) {
      setSelectedAlert(prev => ({ ...prev, status: action }));
    }
    setNoteText('');
  };

  const filteredAlerts = alerts.filter(a => {
    const matchesCategory = !activeCategory || activeCategory === 'ALL' || a.category === activeCategory;
    const matchesStatus = filter === 'ALL' || a.status === filter;
    return matchesCategory && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6 font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-wide text-slate-100 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <span>AI ALERT CENTER (DRUG TRAFFICKING &amp; EXAM LEAK)</span>
          </h1>
          <p className="text-xs text-slate-400">Automated threat detections requiring investigator human review.</p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          {['ALL', 'NEW', 'UNDER_REVIEW', 'VALIDATED', 'FALSE_POSITIVE', 'ESCALATED'].map(st => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                filter === st ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-cyan-glow' : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts List (Left 2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          {filteredAlerts.map(alert => (
            <div
              key={alert.id}
              onClick={() => setSelectedAlert(alert)}
              className={`glass-panel p-5 rounded-2xl border transition-all cursor-pointer ${
                selectedAlert?.id === alert.id ? 'border-cyan-400 shadow-cyan-glow bg-cyan-950/20' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-sm text-cyan-400">{alert.alertCode}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    alert.category === 'EXAM_LEAK' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  }`}>
                    {alert.category === 'EXAM_LEAK' ? 'EXAM LEAK' : 'DRUG TRAFFICKING'}
                  </span>
                  <span className="text-xs text-slate-400">{alert.caseNumber}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-slate-400">Confidence: {alert.confidence}%</span>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                    alert.riskScore >= 75 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    {alert.riskScore}/100 — {alert.riskLevel}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-200 mt-3 leading-relaxed">{alert.detectionReason}</p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <div>Entities: <span className="text-slate-300">{alert.relatedEntities}</span></div>
                <span className="px-2 py-0.5 bg-slate-900 border border-slate-700 text-slate-300 rounded">{alert.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action & Detail Drawer (Right 1 Col) */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4 h-fit sticky top-20">
          {selectedAlert ? (
            <>
              <div className="border-b border-slate-800 pb-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-cyan-400">{selectedAlert.alertCode}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    selectedAlert.category === 'EXAM_LEAK' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  }`}>
                    {selectedAlert.category === 'EXAM_LEAK' ? 'EXAM LEAK' : 'DRUG TRAFFICKING'}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-100 mt-1">{selectedAlert.caseNumber}</h3>
              </div>

              <div className="space-y-2 text-xs">
                <div><span className="text-slate-400">Detection Reason:</span> <p className="text-slate-200 mt-1">{selectedAlert.detectionReason}</p></div>
                <div><span className="text-slate-400">Entities:</span> <span className="text-cyan-300">{selectedAlert.relatedEntities}</span></div>
                <div><span className="text-slate-400">Current Status:</span> <span className="text-emerald-400 font-bold">{selectedAlert.status}</span></div>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                <label className="block text-slate-400">Investigator Note / Feedback:</label>
                <textarea
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                  placeholder="Enter review findings..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 h-20"
                />

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => handleAction(selectedAlert.id, 'VALIDATED')}
                    className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-xl font-bold text-[11px] flex items-center justify-center space-x-1"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Valid Indicator</span>
                  </button>

                  <button
                    onClick={() => handleAction(selectedAlert.id, 'FALSE_POSITIVE')}
                    className="p-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-xl font-bold text-[11px] flex items-center justify-center space-x-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>False Positive</span>
                  </button>

                  <button
                    onClick={() => handleAction(selectedAlert.id, 'ESCALATED')}
                    className="p-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 rounded-xl font-bold text-[11px] col-span-2 flex items-center justify-center space-x-1"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>Escalate to Senior Analyst</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Select an alert from the queue to review details and record human investigation decisions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
