import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  Filter,
  Search,
  Check,
  ShieldAlert,
  PlusCircle,
  Trash2,
  Download
} from 'lucide-react';
import api, {
  getStoredAlerts,
  saveStoredAlerts,
  deleteStoredAlert,
  getStoredCases,
  saveStoredCases,
  getRelativeTime,
  downloadEvidenceFile
} from '../services/api';

export default function AlertsPage({ activeCategory }) {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const local = getStoredAlerts().filter(a => !a.caseNumber?.startsWith('CASE-2026-'));
    setAlerts(local);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAction = (alertId, newStatus) => {
    const updated = alerts.map(a => a.id === alertId ? { ...a, status: newStatus } : a);
    setAlerts(updated);
    saveStoredAlerts(updated);
    showToast(`Alert marked as ${newStatus.replace('_', ' ')}`);
  };

  const handleDeleteAlert = (alertId) => {
    const updated = alerts.filter(a => a.id !== alertId);
    setAlerts(updated);
    deleteStoredAlert(alertId);
    showToast('Alert removed from queue.');
  };

  const handleEscalateToCase = (alert) => {
    const currentCases = getStoredCases();
    const newCase = {
      id: Date.now(),
      caseNumber: `INC-${Math.floor(8200 + Math.random() * 799)}`,
      title: `${alert.category.replace('_', ' ')}: Escalated from ${alert.alertCode}`,
      description: alert.detectionReason,
      category: alert.category,
      status: 'ACTIVE',
      riskLevel: alert.riskLevel,
      riskScore: alert.riskScore,
      leadInvestigator: 'Security Analyst',
      priority: 'HIGH',
      createdAt: new Date().toISOString()
    };

    saveStoredCases([newCase, ...currentCases]);
    handleAction(alert.id, 'ESCALATED');
    showToast(`Escalated to Incident Case (${newCase.caseNumber})`);
  };

  const filteredAlerts = alerts.filter(a => {
    const matchesCategory = !activeCategory || activeCategory === 'ALL' || a.category === activeCategory;
    const matchesStatus = filter === 'ALL' || a.status === filter;
    const matchesSearch =
      a.alertCode.toLowerCase().includes(search.toLowerCase()) ||
      a.detectionReason.toLowerCase().includes(search.toLowerCase()) ||
      (a.relatedEntities && a.relatedEntities.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>Alerts &amp; Detection Queue</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Prioritized real-time threat detections awaiting triage and analyst review.
          </p>
        </div>

        {toastMessage && (
          <div className="bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 px-3 py-1.5 rounded-lg text-xs flex items-center space-x-2 font-mono">
            <Check className="w-4 h-4 text-cyan-400" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0b1220] p-3 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search alerts by reason or handle..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center space-x-1.5 w-full sm:w-auto overflow-x-auto text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
          {['ALL', 'NEW', 'UNDER_REVIEW', 'VALIDATED', 'FALSE_POSITIVE', 'ESCALATED'].map(st => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors shrink-0 ${
                filter === st
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.map(alert => (
          <div
            key={alert.id}
            className={`bg-[#0b1220] p-4 rounded-xl border transition-colors ${
              alert.status === 'NEW' ? 'border-amber-500/30' : 'border-slate-800'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center space-x-2.5">
                  <span className="font-mono font-semibold text-xs text-cyan-400">{alert.alertCode}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                    alert.status === 'NEW' ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' :
                    alert.status === 'VALIDATED' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' :
                    alert.status === 'ESCALATED' ? 'bg-rose-500/15 text-rose-300 border-rose-500/30' :
                    'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {alert.status.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 font-mono">
                    {alert.category.replace('_', ' ')}
                  </span>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {alert.detectionReason}
                </p>

                {alert.relatedEntities && (
                  <div className="text-[11px] text-slate-400 flex items-center space-x-1.5">
                    <span className="text-slate-500">Entities:</span>
                    <span className="font-mono text-cyan-300/90">{alert.relatedEntities}</span>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row md:flex-col items-end justify-between gap-3 shrink-0">
                <div className="flex items-center space-x-3 text-xs">
                  <div className="text-right">
                    <div className="text-rose-400 font-bold">{alert.riskScore}% Risk</div>
                    <div className="text-[10px] text-slate-400">{getRelativeTime(alert.timestamp)}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-1.5">
                  {alert.status !== 'VALIDATED' && (
                    <button
                      onClick={() => handleAction(alert.id, 'VALIDATED')}
                      className="px-2.5 py-1 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-600/30 rounded text-[11px] font-medium flex items-center space-x-1 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Confirm</span>
                    </button>
                  )}
                  {alert.status !== 'FALSE_POSITIVE' && (
                    <button
                      onClick={() => handleAction(alert.id, 'FALSE_POSITIVE')}
                      className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 rounded text-[11px] font-medium flex items-center space-x-1 transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Dismiss</span>
                    </button>
                  )}
                  {alert.status !== 'ESCALATED' && (
                    <button
                      onClick={() => handleEscalateToCase(alert)}
                      className="px-2.5 py-1 bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 rounded text-[11px] font-medium flex items-center space-x-1 transition-colors"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Escalate</span>
                    </button>
                  )}
                  <button
                    onClick={() => downloadEvidenceFile({ caseId: alert.caseNumber, text: alert.detectionReason, category: alert.category, riskScore: alert.riskScore })}
                    title="Download Alert Record"
                    className="p-1 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800 rounded transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteAlert(alert.id)}
                    title="Delete Alert"
                    className="p-1 bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredAlerts.length === 0 && (
          <div className="py-16 text-center text-slate-500 text-xs bg-[#0b1220] rounded-xl border border-slate-800 font-mono">
            No active threat alerts in queue.
          </div>
        )}
      </div>
    </div>
  );
}
