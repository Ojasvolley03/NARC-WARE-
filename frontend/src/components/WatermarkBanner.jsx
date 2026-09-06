import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function WatermarkBanner() {
  return (
    <div className="bg-gradient-to-r from-cyan-950/80 via-slate-900/90 to-cyan-950/80 border-b border-cyan-500/30 px-4 py-1.5 text-xs flex items-center justify-between text-cyan-200">
      <div className="flex items-center space-x-2 font-mono tracking-wide">
        <ShieldAlert className="w-4 h-4 text-cyan-400 animate-pulse" />
        <span className="font-bold text-cyan-400">NARC-WARE // LAW ENFORCEMENT DEMO PLATFORM</span>
        <span className="text-slate-400">|</span>
        <span className="text-amber-400 font-semibold">SYNTHETIC DEMO DATA ONLY</span>
      </div>
      <div className="hidden md:flex items-center space-x-4 font-mono text-[11px] text-slate-400">
        <span>CLASSIFICATION: POTENTIALLY SUSPICIOUS / REQUIRES HUMAN REVIEW</span>
        <span className="text-emerald-400 font-medium">● SYSTEM ACTIVE</span>
      </div>
    </div>
  );
}
