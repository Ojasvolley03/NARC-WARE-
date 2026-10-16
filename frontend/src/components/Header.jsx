import React, { useState, useEffect } from 'react';
import { Shield, Clock, Bell, User, CheckCircle2, Lock } from 'lucide-react';

export default function Header({ user, activeCategory, onChangeCategory, onLock }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 border-b border-slate-800 bg-[#070b14] px-6 flex items-center justify-between sticky top-0 z-30 font-sans">
      {/* Category Threat Domain Filter */}
      <div className="flex items-center space-x-2">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider hidden sm:inline font-mono">Domain:</span>
        <div className="flex items-center space-x-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
          {[
            { id: 'ALL', label: 'All Domains' },
            { id: 'EXAM_LEAK', label: 'Paper Leak' },
            { id: 'FINANCIAL_SCAM', label: 'Financial Scam' },
            { id: 'DRUG_TRAFFICKING', label: 'Trafficking' },
            { id: 'JOB_FRAUD', label: 'Job Fraud' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => onChangeCategory && onChangeCategory(cat.id)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        {/* Real-time System Status */}
        <div className="hidden md:flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 px-2.5 py-1 rounded-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-medium text-[11px] tracking-wide font-mono">SYSTEM ONLINE</span>
        </div>

        {/* Live Clock */}
        <div className="hidden lg:flex items-center space-x-1.5 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-mono text-[11px]">{time}</span>
        </div>

        {/* Exit / Return to Portal */}
        {onLock && (
          <button
            onClick={onLock}
            title="Lock Console and Return to Portal Logo Screen"
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono transition-colors"
          >
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Lock Portal</span>
          </button>
        )}

        <div className="h-5 w-px bg-slate-800"></div>

        {/* User Profile */}
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-semibold text-xs text-cyan-400 font-mono">
            {user?.fullName?.charAt(0) || 'A'}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-slate-200 leading-tight">
              {user?.fullName || 'Security Analyst'}
            </div>
            <div className="text-[10px] text-slate-400 leading-tight font-mono">
              {user?.role || 'Incident Response'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
