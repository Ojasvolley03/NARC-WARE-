import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShieldAlert,
  Briefcase,
  AlertTriangle,
  FileCheck2,
  LogOut,
  SlidersHorizontal
} from 'lucide-react';

export default function Sidebar({ onLogout, alertCount = 4 }) {
  const navItems = [
    { path: '/', label: 'Threat Scanner', icon: ShieldAlert, hint: 'Analyze' },
    { path: '/cases', label: 'Incident Cases', icon: Briefcase },
    { path: '/alerts', label: 'Alerts Feed', icon: AlertTriangle, badge: alertCount },
    { path: '/evidence', label: 'Evidence Vault', icon: FileCheck2 },
  ];

  return (
    <aside className="w-60 bg-[#090d16] border-r border-slate-800 flex flex-col justify-between shrink-0 select-none font-sans">
      <div>
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center space-x-3 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm tracking-wide text-slate-100 font-mono">
              NARC<span className="text-cyan-400">WARE</span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium tracking-wide">
              Threat Intelligence
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Core Modules
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border-l-2 border-cyan-400 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge ? (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {item.badge}
                  </span>
                ) : item.hint ? (
                  <span className="text-[10px] px-1.5 py-0.2 rounded font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/50">
                    {item.hint}
                  </span>
                ) : null}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer / Sign Out */}
      <div className="p-3 border-t border-slate-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
