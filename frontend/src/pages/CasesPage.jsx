import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  ShieldAlert,
  User,
  Clock,
  X,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Trash2,
  Download
} from 'lucide-react';
import api, {
  getStoredCases,
  saveStoredCases,
  getRelativeTime,
  deleteStoredCase,
  downloadEvidenceFile
} from '../services/api';

export default function CasesPage({ activeCategory }) {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState('EXAM_LEAK');
  const [newPriority, setNewPriority] = useState('HIGH');
  const [noteInput, setNoteInput] = useState('');

  // Load user cases (excluding any legacy dummy pre-seeded cases)
  useEffect(() => {
    const local = getStoredCases().filter(c => !c.caseNumber?.startsWith('CASE-2026-'));
    setCases(local);
  }, []);

  // Create new incident
  const handleCreateCase = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const caseObj = {
      id: Date.now(),
      caseNumber: `INC-${Math.floor(8100 + Math.random() * 899)}`,
      title: newTitle.trim(),
      description: newDesc.trim() || 'New incident opened based on intercepted payload intelligence.',
      category: newCategory,
      status: 'ACTIVE',
      riskLevel: newPriority === 'HIGH' ? 'HIGH' : 'MEDIUM',
      riskScore: newPriority === 'HIGH' ? 88 : 65,
      leadInvestigator: 'Security Analyst',
      priority: newPriority,
      createdAt: new Date().toISOString(),
      notes: []
    };

    const updated = [caseObj, ...cases];
    setCases(updated);
    saveStoredCases(updated);

    setShowCreateModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  // Delete case
  const handleDeleteCase = (e, caseId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this incident case?')) {
      const updated = cases.filter(c => c.id !== caseId && c.caseNumber !== caseId);
      setCases(updated);
      deleteStoredCase(caseId);
      if (selectedCase && (selectedCase.id === caseId || selectedCase.caseNumber === caseId)) {
        setSelectedCase(null);
      }
    }
  };

  // Update status of selected case
  const handleUpdateStatus = (newStatus) => {
    if (!selectedCase) return;
    const updated = cases.map(c => c.id === selectedCase.id ? { ...c, status: newStatus } : c);
    setCases(updated);
    saveStoredCases(updated);
    setSelectedCase(prev => ({ ...prev, status: newStatus }));
  };

  // Add note to case
  const handleAddNote = () => {
    if (!selectedCase || !noteInput.trim()) return;
    const note = {
      id: Date.now(),
      text: noteInput.trim(),
      author: 'Security Analyst',
      timestamp: new Date().toISOString()
    };
    const updatedNotes = [...(selectedCase.notes || []), note];
    const updated = cases.map(c => c.id === selectedCase.id ? { ...c, notes: updatedNotes } : c);
    setCases(updated);
    saveStoredCases(updated);
    setSelectedCase(prev => ({ ...prev, notes: updatedNotes }));
    setNoteInput('');
  };

  // Filter cases
  const filteredCases = cases.filter(c => {
    const matchesCategory = !activeCategory || activeCategory === 'ALL' || c.category === activeCategory;
    const matchesStatus = filterStatus === 'ALL' || c.status === filterStatus;
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(search.toLowerCase()) ||
      (c.description && c.description.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100 flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-cyan-400" />
            <span>Incident Cases &amp; Investigations</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Active threat dockets, investigation logs, and prioritized incident triage.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Incident Case</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0b1220] p-3 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID, keyword, or title..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center space-x-1.5 w-full sm:w-auto overflow-x-auto text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
          {['ALL', 'ACTIVE', 'UNDER_REVIEW', 'RESOLVED', 'CLOSED'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors shrink-0 ${
                filterStatus === st
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCases.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelectedCase(c)}
            className="bg-[#0b1220] p-4 rounded-xl border border-slate-800 hover:border-cyan-500/50 cursor-pointer space-y-3 flex flex-col justify-between transition-colors relative group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono font-semibold text-xs text-cyan-400">{c.caseNumber}</span>
                <div className="flex items-center space-x-1.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                    c.status === 'ACTIVE' ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30' :
                    c.status === 'UNDER_REVIEW' ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' :
                    c.status === 'RESOLVED' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' :
                    'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {c.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <h3 className="font-semibold text-sm text-slate-100 mt-2 leading-snug">{c.title}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{c.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <div className="flex items-center space-x-1.5 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{getRelativeTime(c.createdAt)}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className={`font-semibold ${
                  c.riskScore >= 75 ? 'text-rose-400' : 'text-amber-400'
                }`}>
                  {c.riskScore}%
                </span>

                {/* Download Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); downloadEvidenceFile(c); }}
                  title="Download Case Dossier"
                  className="p-1 text-slate-400 hover:text-cyan-300 hover:bg-slate-900 rounded transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>

                {/* Delete Button */}
                <button
                  onClick={(e) => handleDeleteCase(e, c.id)}
                  title="Delete Case"
                  className="p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredCases.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-500 text-xs bg-[#0b1220] rounded-xl border border-slate-800 font-mono">
            No incident cases stored. Input chat on Threat Scanner or click "+ New Incident Case" above.
          </div>
        )}
      </div>

      {/* Case Details Drawer / Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e1626] border border-slate-800 rounded-xl w-full max-w-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="font-mono text-xs font-semibold text-cyan-400">{selectedCase.caseNumber}</span>
                <h2 className="text-base font-bold text-slate-100 mt-0.5">{selectedCase.title}</h2>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => downloadEvidenceFile(selectedCase)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 px-2.5 py-1 bg-slate-900 rounded border border-slate-800"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="p-1 text-slate-400 hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[10px]">Threat Score</div>
                <div className="text-base font-bold text-rose-400 mt-0.5">{selectedCase.riskScore}% ({selectedCase.riskLevel})</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[10px]">Category</div>
                <div className="text-xs font-semibold text-slate-200 mt-0.5">{selectedCase.category.replace('_', ' ')}</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[10px]">Logged</div>
                <div className="text-xs text-slate-300 mt-0.5">{getRelativeTime(selectedCase.createdAt)}</div>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-300 mb-1">Incident Content / Payload</div>
              <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed font-mono whitespace-pre-wrap select-all">
                {selectedCase.description}
              </p>
            </div>

            {/* Status Switcher */}
            <div>
              <div className="text-xs font-semibold text-slate-300 mb-1.5">Update Incident Status</div>
              <div className="flex items-center space-x-2">
                {['ACTIVE', 'UNDER_REVIEW', 'RESOLVED', 'CLOSED'].map(st => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedCase.status === st
                        ? 'bg-cyan-500 text-slate-950 font-semibold'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes Section */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300">Investigator Notes</div>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {selectedCase.notes && selectedCase.notes.length > 0 ? (
                  selectedCase.notes.map(n => (
                    <div key={n.id} className="p-2 bg-slate-950 rounded border border-slate-800 text-xs text-slate-300">
                      <div className="text-[10px] text-slate-400">{n.author} • {getRelativeTime(n.timestamp)}</div>
                      <div className="mt-0.5">{n.text}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-[11px] text-slate-500 italic">No notes added yet.</div>
                )}
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="text"
                  value={noteInput}
                  onChange={e => setNoteInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddNote()}
                  placeholder="Add an investigative note..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={handleAddNote}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors"
                >
                  Add Note
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
              <button
                onClick={(e) => handleDeleteCase(e, selectedCase.id)}
                className="px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-500/40 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Case</span>
              </button>
              <button
                onClick={() => setSelectedCase(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Case Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateCase} className="bg-[#0e1626] border border-slate-800 rounded-xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-slate-100">Create New Incident Case</h2>
              <button type="button" onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Incident Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="e.g. Unauthorized Telegram Distribution Channel"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Threat Domain</label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="EXAM_LEAK">Paper / Document Leak</option>
                  <option value="FINANCIAL_SCAM">Financial / UPI Scam</option>
                  <option value="DRUG_TRAFFICKING">Narcotics Solicitation</option>
                  <option value="JOB_FRAUD">Job / Recruitment Fraud</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Priority Level</label>
                <select
                  value={newPriority}
                  onChange={e => setNewPriority(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="HIGH">High Priority</option>
                  <option value="MEDIUM">Medium Priority</option>
                  <option value="LOW">Low Priority</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Initial Description / Findings</label>
              <textarea
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                placeholder="Details of intercepted communication, URLs, handles..."
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-3 py-1.5 bg-slate-900 text-slate-300 rounded-lg text-xs hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-semibold rounded-lg text-xs"
              >
                Create Incident
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
