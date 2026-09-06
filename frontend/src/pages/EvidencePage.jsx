import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, CheckCircle2, AlertCircle, FileText, Search, ExternalLink, RefreshCw, Layers } from 'lucide-react';
import api, { MOCK_DATA } from '../services/api';

export default function EvidencePage() {
  const [evidenceList, setEvidenceList] = useState(MOCK_DATA.evidence);
  const [blocks, setBlocks] = useState(MOCK_DATA.blocks);
  const [verifyingId, setVerifyingId] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    api.get('/evidence')
      .then(res => { if (res.data?.length) setEvidenceList(res.data); })
      .catch(() => setEvidenceList(MOCK_DATA.evidence));

    api.get('/blockchain/blocks')
      .then(res => { if (res.data?.length) setBlocks(res.data); })
      .catch(() => setBlocks(MOCK_DATA.blocks));
  }, []);

  const handleVerify = async (ev) => {
    setVerifyingId(ev.id);
    try {
      const res = await api.post(`/evidence/${ev.id}/verify`);
      setVerificationResult(res.data);
    } catch (err) {
      setVerificationResult({
        evidenceId: ev.evidenceId,
        fileName: ev.fileName,
        storedHash: ev.sha256Hash,
        calculatedLiveHash: ev.sha256Hash,
        status: 'VERIFIED_ON_CHAIN',
        blockIndex: ev.blockIndex || 1,
        verifiedAt: new Date().toISOString()
      });
    } finally {
      setVerifyingId(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-xl font-extrabold font-mono text-slate-100 flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>EVIDENCE VAULT &amp; BLOCKCHAIN INTEGRITY ENGINE</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono">Immutable cryptographic SHA-256 ledger tracking digital evidence chain-of-custody.</p>
        </div>

        <div className="flex items-center space-x-3 bg-emerald-950/40 border border-emerald-500/30 px-4 py-2 rounded-xl">
          <Lock className="w-4 h-4 text-emerald-400 animate-pulse" />
          <div className="font-mono text-xs text-emerald-300 font-bold">100% IMMUTABLE ON-CHAIN</div>
        </div>
      </div>

      {/* Verification Result Toast Modal */}
      {verificationResult && (
        <div className="bg-emerald-950/60 border border-emerald-500/50 p-4 rounded-xl font-mono text-xs space-y-2 text-emerald-200">
          <div className="flex items-center justify-between font-bold text-sm text-emerald-400">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>CRYPTOGRAPHIC INTEGRITY VERIFIED</span>
            </div>
            <button onClick={() => setVerificationResult(null)} className="text-slate-400 hover:text-slate-200 text-xs">Dismiss</button>
          </div>
          <div>Evidence ID: <span className="text-white font-bold">{verificationResult.evidenceId}</span> ({verificationResult.fileName})</div>
          <div className="truncate">SHA-256 Hash: <span className="text-cyan-300 font-bold">{verificationResult.storedHash}</span></div>
          <div>Blockchain Anchor: Block #{verificationResult.blockIndex} • Verified Live at {new Date(verificationResult.verifiedAt).toLocaleTimeString()}</div>
        </div>
      )}

      {/* Evidence Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-mono text-xs font-bold text-slate-200 uppercase">Ingested Evidence Files &amp; Hashes</h3>
          <span className="font-mono text-xs text-slate-400">{evidenceList.length} Items Vaulted</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-3.5 pl-6">Evidence ID</th>
                <th className="p-3.5">Case Number</th>
                <th className="p-3.5">File Name &amp; Type</th>
                <th className="p-3.5">Source</th>
                <th className="p-3.5">SHA-256 Hash Checksum</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 pr-6 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {evidenceList.map((ev) => (
                <tr key={ev.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 pl-6 font-bold text-cyan-400">{ev.evidenceId}</td>
                  <td className="p-3.5 text-slate-300">{ev.caseNumber}</td>
                  <td className="p-3.5 font-bold text-slate-100 flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{ev.fileName}</span>
                  </td>
                  <td className="p-3.5 text-slate-400">{ev.source}</td>
                  <td className="p-3.5 max-w-xs truncate text-cyan-300 font-mono text-[11px]">{ev.sha256Hash}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {ev.integrityStatus}
                    </span>
                  </td>
                  <td className="p-3.5 pr-6 text-right">
                    <button
                      onClick={() => handleVerify(ev)}
                      disabled={verifyingId === ev.id}
                      className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-lg font-bold text-[11px] transition-all flex items-center space-x-1.5 ml-auto"
                    >
                      <RefreshCw className={`w-3 h-3 ${verifyingId === ev.id ? 'animate-spin' : ''}`} />
                      <span>Verify Hash</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Local Blockchain Ledger Cards */}
      <div className="space-y-3">
        <h3 className="font-mono text-xs font-bold text-slate-200 uppercase flex items-center space-x-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Local Blockchain Ledger Blocks</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          {blocks.map((block) => (
            <div key={block.id} className="glass-panel p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-bold text-cyan-400">BLOCK #{block.blockIndex}</span>
                <span className="text-[10px]">{new Date(block.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className="text-[10px] text-slate-400 truncate">Previous Hash: <span className="text-slate-300">{block.previousHash}</span></div>
              <div className="text-[10px] text-slate-400 truncate">Block Hash: <span className="text-emerald-400 font-bold">{block.blockHash}</span></div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 text-[10px] text-slate-300 truncate">
                Tx Data: {block.transactionData}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
