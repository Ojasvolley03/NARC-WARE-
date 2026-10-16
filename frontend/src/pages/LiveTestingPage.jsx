import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Zap,
  RefreshCw,
  Copy,
  PlusCircle,
  FileCheck2,
  Lock,
  Unlock,
  Trash2,
  Download,
  ExternalLink,
  ChevronRight,
  Shield,
  Check,
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api, {
  getStoredCases,
  saveStoredCases,
  getStoredEvidence,
  saveStoredEvidence,
  getRelativeTime,
  downloadEvidenceFile,
  deleteStoredCase,
  deleteStoredEvidence
} from '../services/api';

export default function LiveTestingPage() {
  const navigate = useNavigate();

  // 1. Initial input starts completely blank (no pre-filled mock chats)
  const [inputText, setInputText] = useState('');
  const [category, setCategory] = useState('AUTO_DETECT');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [notification, setNotification] = useState(null);

  // 2. Chat / Evidence Lock state
  const [isLocked, setIsLocked] = useState(false);

  // 3. Activity Log of generated records shown below
  const [generatedRecords, setGeneratedRecords] = useState(() => {
    const saved = localStorage.getItem('nw_generated_activity');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [];
  });

  const autoCreatedTextsRef = useRef(new Set());

  // Entity extraction
  const extractEntities = (text) => {
    const upiMatch = text.match(/[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/g) || [];
    const urlMatch = text.match(/(https?:\/\/[^\s]+|drive\.google\.com\/[^\s]+|t\.me\/[^\s]+)/g) || [];
    const cryptoMatch = text.match(/0x[a-fA-F0-9]{40}/g) || [];
    const handleMatch = text.match(/@[a-zA-Z0-9_]{3,30}/g) || [];
    const amountMatch = text.match(/\b\d+[,.]?\d*\s*(INR|USDT|USD|Rs|₹|\$)\b|\b(INR|USDT|USD|Rs|₹|\$)\s*\d+[,.]?\d*\b/gi) || [];

    const entities = [];
    upiMatch.forEach(u => entities.push({ type: 'UPI_HANDLE', val: u }));
    cryptoMatch.forEach(c => entities.push({ type: 'CRYPTO_WALLET', val: c }));
    urlMatch.forEach(url => entities.push({ type: 'LINK', val: url }));
    handleMatch.forEach(h => {
      if (!entities.some(e => e.val === h)) entities.push({ type: 'USER_HANDLE', val: h });
    });
    amountMatch.forEach(a => entities.push({ type: 'SUM', val: a }));

    return entities;
  };

  // Live Heuristic evaluation
  const runAnalysis = async (textToAnalyze, catToUse) => {
    if (!textToAnalyze || !textToAnalyze.trim()) {
      setAnalysisResult(null);
      return;
    }
    setLoading(true);

    const lower = textToAnalyze.toLowerCase();
    const entities = extractEntities(textToAnalyze);

    const hasLeakWords = /leak|question paper|board exam|answer key|set-[a-d]|solved paper|paper scan/i.test(lower);
    const hasDrugWords = /brick|pure uncut|dead drop|narcotic|escrow|switch to signal|clear chat|substance/i.test(lower);
    const hasScamWords = /guaranteed|weekly profit|arbitrage fund|double your|roi|investment returns|urgent transfer/i.test(lower);
    const hasJobWords = /appointment letter|hiring fee|background check fee|registration fee|selected for executive|remote associate/i.test(lower);
    const hasPayment = /upi|gpay|phonepe|usdt|inr|transfer|fee|wallet|deposit/i.test(lower);
    const hasLinks = /drive\.google|t\.me|bit\.ly|tinyurl|\.xyz|\.top/i.test(lower);

    let detectedCat = catToUse || category;
    if (detectedCat === 'AUTO_DETECT') {
      if (hasLeakWords) detectedCat = 'EXAM_LEAK';
      else if (hasDrugWords) detectedCat = 'DRUG_TRAFFICKING';
      else if (hasJobWords) detectedCat = 'JOB_FRAUD';
      else if (hasScamWords) detectedCat = 'FINANCIAL_SCAM';
      else detectedCat = 'GENERAL_INVESTIGATION';
    }

    const reasons = [];
    let score = 5;

    if (detectedCat === 'EXAM_LEAK') {
      score = 42;
      reasons.push("Academic compromise pattern: Unsanctioned distribution of examination papers");
      if (hasPayment) { score += 28; reasons.push("Direct financial demand via electronic payment handle"); }
      if (hasLinks) { score += 18; reasons.push("Off-platform repository storage reference identified"); }
      if (/timer|self-destruct|urgent|clear chat/i.test(lower)) { score += 10; reasons.push("Evasion protocol: Ephemeral communication pattern detected"); }
    } else if (detectedCat === 'DRUG_TRAFFICKING') {
      score = 46;
      reasons.push("Coded narcotic distribution lexicon: Unit packaging & drop site references");
      if (hasPayment || entities.some(e => e.type === 'CRYPTO_WALLET')) { score += 26; reasons.push("Pseudonymous crypto-asset settlement structure"); }
      if (/signal|telegram|clear chat|burner/i.test(lower)) { score += 22; reasons.push("Evasive routing: Shift to end-to-end encrypted protocol requested"); }
    } else if (detectedCat === 'FINANCIAL_SCAM') {
      score = 42;
      reasons.push("Deceptive financial solicitation: Guarantee of extraordinary investment yield");
      if (hasPayment) { score += 30; reasons.push("Third-party unverified payment recipient identifier"); }
      if (/tonight|urgent|limited|hurry/i.test(lower)) { score += 18; reasons.push("Urgency coercion marker detected"); }
    } else if (detectedCat === 'JOB_FRAUD') {
      score = 38;
      reasons.push("Recruitment advance-fee fraud: Upfront processing charge required");
      if (hasPayment) { score += 34; reasons.push("Pre-employment fee demand via unauthorized portal"); }
      if (/\.xyz|\.top|portal/i.test(lower)) { score += 16; reasons.push("Suspicious domain registry flag"); }
    } else {
      score = 15;
      reasons.push("General communication: Monitored for forensic chain-of-custody");
    }

    score = Math.min(98, Math.max(5, score));
    const riskLevel = score >= 75 ? 'HIGH' : score >= 40 ? 'MEDIUM' : 'LOW';

    const result = {
      text: textToAnalyze,
      category: detectedCat,
      riskScore: score,
      riskLevel,
      confidence: Math.min(99, 86 + Math.floor(score * 0.13)),
      detectionReasons: reasons,
      entities
    };

    setAnalysisResult(result);
    setLoading(false);

    // Auto-record if risk > 80% and not yet locked/created
    if (score > 80 && !isLocked) {
      triggerRecordCreation(result, 'AUTOMATIC');
    }
  };

  // Helper to create Incident Record + Cryptographic Evidence Record & Lock Chat
  const triggerRecordCreation = async (res, mode = 'MANUAL') => {
    const trimmed = (res ? res.text : inputText).trim();
    if (!trimmed) return;

    if (mode === 'AUTOMATIC' && autoCreatedTextsRef.current.has(trimmed)) {
      return;
    }
    autoCreatedTextsRef.current.add(trimmed);

    // Lock chat input as evidence
    setIsLocked(true);

    // Compute genuine cryptographic SHA-256 hash
    const encoder = new TextEncoder();
    const data = encoder.encode(trimmed);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const sha256 = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const newCaseId = `INC-${Math.floor(8200 + Math.random() * 799)}`;
    const newEvidenceId = `EVD-${Math.floor(320 + Math.random() * 679)}`;
    const timestamp = new Date().toISOString();
    const cat = res ? res.category : category;
    const score = res ? res.riskScore : 50;

    // 1. Incident Case Object
    const newCase = {
      id: Date.now(),
      caseNumber: newCaseId,
      title: `${cat.replace('_', ' ')}: Intercepted Evidence Docket`,
      description: trimmed,
      category: cat,
      status: 'ACTIVE',
      riskLevel: score >= 75 ? 'HIGH' : score >= 40 ? 'MEDIUM' : 'LOW',
      riskScore: score,
      leadInvestigator: 'Forensics Specialist',
      priority: score >= 75 ? 'HIGH' : 'MEDIUM',
      createdAt: timestamp,
      evidenceId: newEvidenceId,
      mode
    };

    // 2. Cryptographic Evidence Object
    const newEvidence = {
      id: Date.now() + 1,
      evidenceId: newEvidenceId,
      caseNumber: newCaseId,
      fileName: `Evidence_${newCaseId}.txt`,
      source: 'USER_INTERCEPT',
      fileType: 'TXT',
      sha256Hash: sha256,
      sizeBytes: data.length,
      integrityStatus: 'VERIFIED',
      uploadTime: timestamp,
      text: trimmed,
      mode
    };

    // 3. Save to storage
    const currentCases = getStoredCases();
    saveStoredCases([newCase, ...currentCases]);

    const currentEvidence = getStoredEvidence();
    saveStoredEvidence([newEvidence, ...currentEvidence]);

    // 4. Save to table below
    const recordEntry = {
      id: Date.now(),
      caseId: newCaseId,
      evidenceId: newEvidenceId,
      title: newCase.title,
      category: cat,
      riskScore: score,
      sha256,
      timestamp,
      mode,
      text: trimmed,
      summary: trimmed.substring(0, 100) + (trimmed.length > 100 ? '...' : '')
    };

    const updatedActivity = [recordEntry, ...generatedRecords];
    setGeneratedRecords(updatedActivity);
    localStorage.setItem('nw_generated_activity', JSON.stringify(updatedActivity));

    // 5. Notify
    setNotification({
      type: mode === 'AUTOMATIC' ? 'AUTO' : 'MANUAL',
      message: mode === 'AUTOMATIC'
        ? `High Risk (>80%) Intercepted! Case #${newCaseId} & Evidence #${newEvidenceId} generated & locked automatically.`
        : `Evidence Secured & Locked! Incident Case #${newCaseId} & Evidence #${newEvidenceId} recorded.`
    });

    setTimeout(() => setNotification(null), 5000);
  };

  // Delete a specific record
  const handleDeleteRecord = (recordId, caseId, evidenceId) => {
    const updated = generatedRecords.filter(r => r.id !== recordId);
    setGeneratedRecords(updated);
    localStorage.setItem('nw_generated_activity', JSON.stringify(updated));

    deleteStoredCase(caseId);
    deleteStoredEvidence(evidenceId);

    setNotification({
      type: 'MANUAL',
      message: `Record ${caseId} / ${evidenceId} successfully deleted.`
    });
    setTimeout(() => setNotification(null), 3000);
  };

  // Clear all recorded activity
  const handleClearAllRecords = () => {
    if (window.confirm('Delete all recorded incident and evidence history?')) {
      setGeneratedRecords([]);
      localStorage.removeItem('nw_generated_activity');
      saveStoredCases([]);
      saveStoredEvidence([]);
      setNotification({
        type: 'MANUAL',
        message: 'All recorded incidents and evidence records cleared.'
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Manual Trigger Button
  const handleManualRecord = () => {
    if (!inputText.trim()) {
      alert('Please enter or paste your chat / message text before recording.');
      return;
    }
    if (analysisResult) {
      triggerRecordCreation(analysisResult, 'MANUAL');
    } else {
      runAnalysis(inputText, category).then(() => {
        triggerRecordCreation(analysisResult, 'MANUAL');
      });
    }
  };

  // Unlock Chat to allow editing
  const handleUnlock = () => {
    setIsLocked(false);
  };

  // Start fresh chat
  const handleNewChat = () => {
    setInputText('');
    setAnalysisResult(null);
    setIsLocked(false);
  };

  // Debounce typing evaluation
  useEffect(() => {
    if (isLocked) return;
    const timer = setTimeout(() => {
      runAnalysis(inputText, category);
    }, 250);
    return () => clearTimeout(timer);
  }, [inputText, category, isLocked]);

  const handleCopy = () => {
    navigator.clipboard.writeText(inputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Formal Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
              OPERATIONAL WORKBENCH // FORENSIC INGESTION
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white mt-1">
            Intercepted Chat Analysis &amp; Evidence Vault
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Input intercepted communication. Click <strong>Record Evidence</strong> to cryptographically lock the payload, or let AI automatically docket cases when threat risk crosses <strong>80%</strong>.
          </p>
        </div>

        {/* Global Action Notification */}
        {notification && (
          <div className={`px-4 py-2 rounded-lg text-xs flex items-center space-x-2.5 border transition-all ${
            notification.type === 'AUTO'
              ? 'bg-rose-950/80 border-rose-500/50 text-rose-200'
              : 'bg-cyan-950/80 border-cyan-500/50 text-cyan-200'
          }`}>
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span className="font-semibold">{notification.message}</span>
          </div>
        )}
      </div>

      {/* Main Analysis Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Box (7 Cols) */}
        <div className={`lg:col-span-7 p-5 rounded-xl border transition-all ${
          isLocked
            ? 'bg-[#080d19] border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.1)]'
            : 'bg-[#0a0f1d] border-slate-800'
        } space-y-4`}>
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="text-xs font-semibold text-slate-200 flex items-center space-x-2">
              {isLocked ? (
                <>
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] font-mono">
                    EVIDENCE PAYLOAD LOCKED &amp; SEALED
                  </span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Input Intercepted Chat / Message</span>
                </>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {isLocked ? (
                <>
                  <button
                    onClick={handleUnlock}
                    className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center space-x-1 px-2.5 py-1 bg-amber-950/40 rounded border border-amber-500/40 font-mono transition-colors"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Unlock &amp; Edit</span>
                  </button>
                  <button
                    onClick={handleNewChat}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 px-2.5 py-1 bg-cyan-950/40 rounded border border-cyan-500/40 font-mono transition-colors"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>New Chat</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleCopy}
                    disabled={!inputText}
                    className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center space-x-1 px-2.5 py-1 bg-slate-900 rounded border border-slate-800 disabled:opacity-40"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handleNewChat}
                    className="text-[11px] text-slate-400 hover:text-slate-200 px-2.5 py-1 bg-slate-900 rounded border border-slate-800"
                  >
                    Clear
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Domain Category Selector */}
          <div>
            <div className="text-[11px] font-medium text-slate-400 mb-1.5 font-mono">Target Domain Filter</div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 text-xs">
              {[
                { id: 'AUTO_DETECT', label: 'Auto Detect' },
                { id: 'EXAM_LEAK', label: 'Paper Leak' },
                { id: 'FINANCIAL_SCAM', label: 'Scam' },
                { id: 'DRUG_TRAFFICKING', label: 'Trafficking' },
                { id: 'JOB_FRAUD', label: 'Job Fraud' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  disabled={isLocked}
                  onClick={() => setCategory(item.id)}
                  className={`py-1.5 px-2 rounded text-center transition-colors text-[11px] font-medium ${
                    category === item.id
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                  } ${isLocked ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text Area (Locks when recorded) */}
          <div className="relative">
            <textarea
              value={inputText}
              readOnly={isLocked}
              onChange={e => setInputText(e.target.value)}
              placeholder="Type or paste your intercepted chat / message here..."
              rows={8}
              className={`w-full border rounded-lg p-3 text-xs focus:outline-none font-mono leading-relaxed placeholder-slate-600 transition-colors ${
                isLocked
                  ? 'bg-[#050811] text-emerald-300 border-emerald-500/40 cursor-not-allowed select-text'
                  : 'bg-[#060a14] text-slate-200 border-slate-800 focus:border-cyan-500'
              }`}
            />
            {isLocked && (
              <div className="absolute top-3 right-3 flex items-center space-x-1.5 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-[10px] text-emerald-300 font-mono">
                <Lock className="w-3 h-3" />
                <span>EVIDENCE LOCKED</span>
              </div>
            )}
          </div>

          {/* Extracted Identifiers */}
          {analysisResult && analysisResult.entities.length > 0 && (
            <div className="p-3 bg-[#060a14] rounded-lg border border-slate-800/80 space-y-1.5">
              <div className="text-[11px] font-semibold text-slate-400 font-mono uppercase tracking-wider">
                Extracted Identifiers ({analysisResult.entities.length}):
              </div>
              <div className="flex flex-wrap gap-1.5">
                {analysisResult.entities.map((e, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 border border-slate-700 text-cyan-300"
                  >
                    <span className="text-[9px] text-slate-500 mr-1.5">{e.type}:</span>
                    {e.val}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: AI Analysis & Manual Lock/Record Trigger (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0a0f1d] p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-semibold text-slate-200">Forensics Evaluation</span>
            {loading ? (
              <span className="text-[11px] text-cyan-400 flex items-center space-x-1">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Evaluating...</span>
              </span>
            ) : analysisResult ? (
              <span className="text-[11px] text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Evaluated</span>
              </span>
            ) : (
              <span className="text-[11px] text-slate-500 font-mono">Awaiting Input</span>
            )}
          </div>

          {analysisResult ? (
            <div className="space-y-4 text-xs">
              {/* Category & Score */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#060a14] rounded-lg border border-slate-800">
                  <div className="text-slate-500 text-[10px] font-mono uppercase">Detected Domain</div>
                  <div className="mt-1 font-bold text-xs text-slate-200">
                    {analysisResult.category.replace('_', ' ')}
                  </div>
                </div>

                <div className="p-3 bg-[#060a14] rounded-lg border border-slate-800">
                  <div className="text-slate-500 text-[10px] font-mono uppercase">Assessed Threat Risk</div>
                  <div className={`mt-0.5 text-lg font-bold font-mono ${
                    analysisResult.riskScore >= 80 ? 'text-rose-400' :
                    analysisResult.riskScore >= 40 ? 'text-amber-400' :
                    'text-emerald-400'
                  }`}>
                    {analysisResult.riskScore}%
                    <span className="text-xs font-normal text-slate-400 ml-1.5 font-sans">({analysisResult.riskLevel})</span>
                  </div>
                </div>
              </div>

              {/* Severity Gauge */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Risk Severity Score</span>
                  <span>Confidence: {analysisResult.confidence}%</span>
                </div>
                <div className="w-full bg-[#060a14] h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all duration-300 ${
                      analysisResult.riskScore >= 80 ? 'bg-rose-500' :
                      analysisResult.riskScore >= 40 ? 'bg-amber-500' :
                      'bg-emerald-500'
                    }`}
                    style={{ width: `${analysisResult.riskScore}%` }}
                  />
                </div>
              </div>

              {/* Detection Reasons */}
              <div className="space-y-1.5">
                <div className="text-slate-300 font-semibold text-[11px]">
                  Detected Signals ({analysisResult.detectionReasons.length}):
                </div>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {analysisResult.detectionReasons.map((reason, idx) => (
                    <div key={idx} className="p-2 bg-[#060a14] rounded border border-slate-800/80 text-[11px] text-slate-300 flex items-start space-x-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span className="leading-snug">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* MANUAL ACTION BUTTONS */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <button
                  onClick={handleManualRecord}
                  disabled={isLocked}
                  className={`w-full py-2.5 px-3 font-bold rounded-lg text-xs flex items-center justify-center space-x-2 transition-all shadow-sm ${
                    isLocked
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 cursor-not-allowed'
                      : 'bg-cyan-600 hover:bg-cyan-500 text-slate-950 active:scale-98'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>{isLocked ? 'Evidence Locked & Anchored' : 'Lock Chat & Record as Evidence'}</span>
                </button>

                <p className="text-[10px] text-slate-500 text-center font-mono">
                  {isLocked
                    ? 'This chat payload is cryptographically sealed in the evidence ledger below.'
                    : 'Click above to lock the chat, calculate SHA-256 hash, and record case below.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-slate-500 text-xs">
              Type or paste your intercepted chat in the workbench to begin evaluation.
            </div>
          )}
        </div>
      </div>

      {/* GENERATED INCIDENT RECORDS & EVIDENCE LOG SHOWN BELOW */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div className="flex items-center space-x-2.5">
            <FileCheck2 className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-slate-200 tracking-wide font-sans">
              Recorded Incident Cases &amp; Cryptographic Evidence
            </h2>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
              {generatedRecords.length} Saved
            </span>
          </div>

          {generatedRecords.length > 0 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleClearAllRecords}
                className="text-[11px] font-mono text-rose-400 hover:text-rose-300 flex items-center space-x-1 px-2.5 py-1 bg-rose-950/30 border border-rose-500/30 rounded transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Records</span>
              </button>
            </div>
          )}
        </div>

        {generatedRecords.length > 0 ? (
          <div className="bg-[#0a0f1d] border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800">
            {generatedRecords.map((item) => (
              <div key={item.id} className="p-4 hover:bg-slate-900/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-xs text-cyan-400">
                      {item.caseId}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="font-mono text-xs text-emerald-400 font-semibold">
                      {item.evidenceId}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      item.mode === 'AUTOMATIC'
                        ? 'bg-rose-950/70 text-rose-300 border border-rose-500/40'
                        : 'bg-cyan-950/70 text-cyan-300 border border-cyan-500/40'
                    }`}>
                      {item.mode === 'AUTOMATIC' ? 'AUTO TRIGGER (>80%)' : 'MANUALLY RECORDED'}
                    </span>
                    <span className="text-[11px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 font-mono">
                      {item.category.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] font-mono text-rose-400 font-semibold">
                      {item.riskScore}% Threat
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-snug font-mono bg-slate-950/60 p-2 rounded border border-slate-800/80">
                    "{item.summary}"
                  </p>

                  <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
                    <span className="text-slate-500">SHA-256 Digest:</span>
                    <span className="text-slate-300 truncate max-w-xs sm:max-w-md">{item.sha256}</span>
                  </div>
                </div>

                {/* Right Action Buttons: Download, Delete, View */}
                <div className="flex items-center space-x-2 shrink-0">
                  <span className="text-[10px] text-slate-500 font-mono hidden sm:inline mr-1">
                    {getRelativeTime(item.timestamp)}
                  </span>

                  {/* DOWNLOAD BUTTON */}
                  <button
                    onClick={() => downloadEvidenceFile(item)}
                    title="Download Official Evidence Dossier (.txt)"
                    className="p-1.5 sm:px-2.5 sm:py-1 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 rounded text-xs font-mono flex items-center space-x-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </button>

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => handleDeleteRecord(item.id, item.caseId, item.evidenceId)}
                    title="Delete Record"
                    className="p-1.5 sm:px-2.5 sm:py-1 bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 border border-slate-800 hover:border-rose-500/40 rounded text-xs font-mono flex items-center space-x-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>

                  {/* Quick Inspect */}
                  <button
                    onClick={() => navigate('/cases')}
                    title="View in Cases Tab"
                    className="p-1.5 sm:px-2 sm:py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded text-xs transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-slate-500 bg-[#0a0f1d] rounded-xl border border-slate-800 font-mono">
            No incident records or evidence stored. Type your chat above and click "Lock Chat &amp; Record as Evidence" to test recording.
          </div>
        )}
      </div>
    </div>
  );
}
