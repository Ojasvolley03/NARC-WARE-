import React from 'react';
import { Shield, Lock, ChevronRight, Fingerprint, Activity, Terminal } from 'lucide-react';

export default function PortalGate({ onEnter }) {
  return (
    <div className="min-h-screen bg-[#060910] text-slate-100 flex flex-col justify-between font-sans relative overflow-hidden select-none">
      {/* Subtle background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Top Security Header */}
      <header className="px-8 py-6 flex items-center justify-between border-b border-slate-900 z-10">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
          <span className="text-xs font-mono text-slate-400 tracking-widest uppercase">
            OPERATIONAL CLEARANCE • RESTRICTED ACCESS
          </span>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
          <Lock className="w-3.5 h-3.5 text-slate-400" />
          <span>PORTAL SECURE • TLS 1.3</span>
        </div>
      </header>

      {/* Center Interactive Logo / Gateway */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10 max-w-xl mx-auto space-y-8">
        {/* Interactive Logo Emblem */}
        <div
          onClick={onEnter}
          className="group cursor-pointer relative flex flex-col items-center focus:outline-none"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onEnter()}
        >
          {/* Outer glowing ring on hover */}
          <div className="w-36 h-36 rounded-3xl bg-slate-900/80 border-2 border-slate-700/80 group-hover:border-cyan-400/80 flex items-center justify-center transition-all duration-300 shadow-2xl group-hover:shadow-[0_0_40px_rgba(6,182,212,0.25)] group-hover:scale-105">
            <div className="w-24 h-24 rounded-2xl bg-[#0b1322] border border-slate-700/60 group-hover:border-cyan-500/50 flex flex-col items-center justify-center transition-colors">
              <Shield className="w-12 h-12 text-cyan-400 group-hover:text-cyan-300 transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>

          {/* Click Prompt Tag */}
          <div className="mt-4 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400 group-hover:text-cyan-300 group-hover:border-cyan-500/40 transition-all flex items-center space-x-1.5 shadow-sm">
            <span>Click Emblem to Enter Dashboard</span>
            <ChevronRight className="w-3.5 h-3.5 text-cyan-400 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>

        {/* Formal Institutional Typography */}
        <div className="space-y-2.5">
          <div className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-400 font-bold">
            Digital Forensics &amp; Threat Intelligence
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            NARC<span className="text-cyan-400">-WARE</span> SYSTEM
          </h1>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Automated multi-domain intelligence detection, chain-of-custody cryptographic evidence anchoring, and incident triage platform.
          </p>
        </div>

        {/* Enter Button (Accessible Alternative) */}
        <div>
          <button
            onClick={onEnter}
            className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md hover:shadow-cyan-500/20 active:scale-98 flex items-center space-x-2"
          >
            <Fingerprint className="w-4 h-4" />
            <span>Launch Operator Console</span>
          </button>
        </div>
      </main>

      {/* Formal Footer */}
      <footer className="px-8 py-5 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 z-10 gap-2">
        <div className="flex items-center space-x-2">
          <Activity className="w-3.5 h-3.5 text-slate-400" />
          <span>INTELLIGENCE ENGINE ACTIVE • V2.4 ENTERPRISE</span>
        </div>
        <div>
          <span>SECURE CRYPTOGRAPHIC HASH AUDIT: ACTIVE</span>
        </div>
      </footer>
    </div>
  );
}
