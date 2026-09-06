import React, { useState } from 'react';
import { FileText, Download, ShieldCheck, Printer, CheckCircle2, Lock } from 'lucide-react';
import { MOCK_DATA } from '../services/api';

export default function ReportsPage() {
  const [selectedCaseNumber, setSelectedCaseNumber] = useState('CASE-2026-089');
  const [reportGenerated, setReportGenerated] = useState(true);

  const selectedCase = MOCK_DATA.cases.find(c => c.caseNumber === selectedCaseNumber) || MOCK_DATA.cases[0];

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(selectedCase, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `NARC_WARE_REPORT_${selectedCase.caseNumber}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,CaseNumber,Title,Status,RiskScore,LeadInvestigator\n" +
      `"${selectedCase.caseNumber}","${selectedCase.title}","${selectedCase.status}",${selectedCase.riskScore},"${selectedCase.leadInvestigator}"`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `NARC_WARE_REPORT_${selectedCase.caseNumber}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="p-6 space-y-6 font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-wide text-slate-100 flex items-center space-x-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <span>OFFICIAL INVESTIGATION REPORT GENERATOR</span>
          </h1>
          <p className="text-xs text-slate-400">Formal legal intelligence briefs with blockchain chain-of-custody verification.</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 rounded-xl text-xs font-bold flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV Export</span>
          </button>
          <button
            onClick={handleExportJSON}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 rounded-xl text-xs font-bold flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>JSON Export</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-extrabold shadow-cyan-glow flex items-center space-x-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF Export</span>
          </button>
        </div>
      </div>

      {/* Styled Formal Report Document Preview */}
      <div className="bg-[#0b1220] border border-slate-800 p-8 rounded-2xl space-y-6 shadow-2xl max-w-4xl mx-auto text-slate-200">
        {/* Header */}
        <div className="border-b-2 border-cyan-500/40 pb-6 flex items-start justify-between">
          <div>
            <div className="text-xs font-bold text-cyan-400 tracking-widest uppercase">LAW ENFORCEMENT DIGITAL FORENSICS DIVISION</div>
            <h2 className="text-2xl font-extrabold text-white mt-1">CYBER CRIME INVESTIGATION REPORT</h2>
            <div className="text-xs text-slate-400 mt-1">Docket Reference: <span className="text-cyan-300 font-bold">{selectedCase.caseNumber}</span></div>
          </div>
          <div className="text-right text-xs space-y-1">
            <div className="px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-md font-bold">THREAT SCORE: {selectedCase.riskScore}/100</div>
            <div className="text-slate-400">Generated: {new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase text-cyan-400 border-b border-slate-800 pb-1">1. Executive Investigation Brief</h3>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
            {selectedCase.description} Target network exhibits multi-wallet cryptocurrency layering and burner cell temporal burst anomalies across port access points.
          </p>
        </div>

        {/* Section 2: Key Suspect Entities */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase text-cyan-400 border-b border-slate-800 pb-1">2. Key Suspect Entities &amp; Centrality</h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400">@ghost_operator</span>
              <div className="text-rose-400 font-bold mt-0.5">High Centrality Coordinator (Risk 94/100)</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400">+1-555-0198</span>
              <div className="text-rose-400 font-bold mt-0.5">Cell Tower Location Anomaly (Risk 86/100)</div>
            </div>
          </div>
        </div>

        {/* Section 3: Evidence & Blockchain Chain of Custody */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase text-cyan-400 border-b border-slate-800 pb-1">3. Immutable Evidence &amp; Blockchain Custody Verification</h3>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-cyan-300 font-bold">EVD-881 (Telegram_Export_Conv7891.json)</span>
              <span className="text-emerald-400 font-bold">VERIFIED ON-CHAIN (Block #1)</span>
            </div>
            <div className="text-[11px] text-slate-400 truncate">SHA-256 Checksum: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</div>
          </div>
        </div>

        {/* Mandatory Human Review Legal Disclaimer */}
        <div className="p-4 bg-amber-950/40 border border-amber-500/40 rounded-xl text-amber-200 text-[11px] space-y-1">
          <div className="font-bold flex items-center space-x-1.5 text-amber-300">
            <ShieldCheck className="w-4 h-4" />
            <span>MANDATORY HUMAN INVESTIGATOR REVIEW DISCLAIMER</span>
          </div>
          <p className="leading-relaxed">
            All AI detections and risk scores generated by NARC-WARE are strictly classified as 
            <strong className="text-white"> “Potentially Suspicious / Requires Human Review”</strong>. 
            AI outputs do not constitute a final legal finding of guilt. Human sworn investigators maintain sole responsibility for investigation conclusions and judicial submission.
          </p>
        </div>

        {/* Signature Line */}
        <div className="pt-8 border-t border-slate-800 flex justify-between items-end text-xs text-slate-400">
          <div>
            <div>Lead Sworn Investigator Signature:</div>
            <div className="h-10 border-b border-slate-700 w-64 mt-2"></div>
            <div className="mt-1 font-bold text-slate-200">{selectedCase.leadInvestigator}</div>
          </div>
          <div className="text-right">
            <div>NARC-WARE System Verification Seal</div>
            <div className="text-cyan-400 font-mono font-bold mt-1">SEAL_AUTHENTIC_2026</div>
          </div>
        </div>
      </div>
    </div>
  );
}
