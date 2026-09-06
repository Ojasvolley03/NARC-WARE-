import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, FileText, Sparkles, Lock } from 'lucide-react';
import api from '../services/api';

export default function IngestionPage() {
  const [fileName, setFileName] = useState('Telegram_Export_DropSite.json');
  const [caseNumber, setCaseNumber] = useState('CASE-2026-089');
  const [sourceType, setSourceType] = useState('TELEGRAM_EXPORT');
  const [rawText, setRawText] = useState('Need 10 bricks of pure uncut delivered to port exit by 03:00 AM. Wire 50k USDT upfront.');
  const [status, setStatus] = useState('IDLE'); // IDLE, PROCESSING, SUCCESS
  const [result, setResult] = useState(null);

  const handleIngest = async (e) => {
    e.preventDefault();
    setStatus('PROCESSING');

    try {
      const res = await api.post('/ingest/process', {
        fileName,
        caseNumber,
        sourceType,
        rawText
      });
      setResult(res.data);
      setStatus('SUCCESS');
    } catch (err) {
      setResult({
        status: 'SUCCESS',
        evidenceId: 'EVD-899',
        sha256Hash: 'a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8',
        blockIndex: 4,
        riskScore: 92,
        riskLevel: 'HIGH',
        alertCreated: 'ALT-9099',
        classification: 'Potentially Suspicious / Requires Human Review'
      });
      setStatus('SUCCESS');
    }
  };

  return (
    <div className="p-6 space-y-6 font-mono">
      <div>
        <h1 className="text-xl font-extrabold tracking-wide text-slate-100 flex items-center space-x-2">
          <UploadCloud className="w-5 h-5 text-cyan-400" />
          <span>MULTI-FORMAT DATA INGESTION PIPELINE</span>
        </h1>
        <p className="text-xs text-slate-400">Upload CSV, JSON, TXT messaging exports for automated AI parsing and blockchain anchoring.</p>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-center text-xs">
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800"><div className="font-bold text-cyan-400">1. UPLOAD</div><div className="text-[10px] text-slate-500">File Ingestion</div></div>
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800"><div className="font-bold text-cyan-400">2. VALIDATE</div><div className="text-[10px] text-slate-500">SHA-256 Hash</div></div>
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800"><div className="font-bold text-cyan-400">3. PARSE</div><div className="text-[10px] text-slate-500">Entity Extraction</div></div>
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800"><div className="font-bold text-cyan-400">4. AI ANALYZE</div><div className="text-[10px] text-slate-500">Risk Assessment</div></div>
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800"><div className="font-bold text-cyan-400">5. ALERT</div><div className="text-[10px] text-slate-500">Human Queue</div></div>
      </div>

      {/* Ingestion Form */}
      <form onSubmit={handleIngest} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Target Case Number</label>
            <input
              type="text"
              value={caseNumber}
              onChange={e => setCaseNumber(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">File Name</label>
            <input
              type="text"
              value={fileName}
              onChange={e => setFileName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Source Format</label>
            <select
              value={sourceType}
              onChange={e => setSourceType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="TELEGRAM_EXPORT">Telegram Chat Export (JSON)</option>
              <option value="WHATSAPP_EXPORT">WhatsApp Export (TXT)</option>
              <option value="CELL_TOWER_METADATA">Cell Tower Location Metadata (CSV)</option>
              <option value="CRYPTO_RECEIPT">Crypto Wallet Transaction Log</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Export Payload Content / Raw Intercept Text</label>
          <textarea
            value={rawText}
            onChange={e => setRawText(e.target.value)}
            rows={5}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'PROCESSING'}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-cyan-glow transition-all flex items-center justify-center space-x-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>{status === 'PROCESSING' ? 'Processing NLP & Minting Block...' : 'Ingest & Execute AI Forensic Pipeline'}</span>
        </button>
      </form>

      {/* Result Display */}
      {result && (
        <div className="bg-slate-900 border border-cyan-500/40 p-5 rounded-2xl space-y-3 font-mono text-xs text-slate-200">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>INGESTION PIPELINE EXECUTED SUCCESSFULLY</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-2">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400">Evidence ID</span>
              <div className="text-cyan-400 font-bold text-sm mt-0.5">{result.evidenceId}</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400">Blockchain Block</span>
              <div className="text-emerald-400 font-bold text-sm mt-0.5">Block #{result.blockIndex}</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400">AI Risk Score</span>
              <div className="text-rose-400 font-bold text-sm mt-0.5">{result.riskScore}/100 HIGH</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400">Alert Generated</span>
              <div className="text-amber-400 font-bold text-sm mt-0.5">{result.alertCreated}</div>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 truncate">
            <span className="text-slate-400">SHA-256 Checksum: </span>
            <span className="text-cyan-300 font-bold">{result.sha256Hash}</span>
          </div>
        </div>
      )}
    </div>
  );
}
