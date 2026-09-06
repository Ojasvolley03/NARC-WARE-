import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  ShieldCheck,
  AlertTriangle,
  Users,
  Network,
  MessageSquare,
  Clock,
  UploadCloud,
  BarChart3,
  FileText,
  History,
  Settings,
  Shield,
  LogOut,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ onLogout }) {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/live-testing', label: 'Live Detection Testing', icon: Sparkles, badge: 'TEST' },
    { path: '/cases', label: 'Cases', icon: Briefcase },
    { path: '/evidence', label: 'Evidence', icon: ShieldCheck },
    { path: '/alerts', label: 'AI Alerts', icon: AlertTriangle, badge: '5' },
    { path: '/entities', label: 'Entity Intelligence', icon: Users },
    { path: '/network', label: 'Network Analysis', icon: Network },
    { path: '/conversations', label: 'Conversations', icon: MessageSquare },
    { path: '/timeline', label: 'Timeline', icon: Clock },
    { path: '/ingestion', label: 'Data Ingestion', icon: UploadCloud },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/reports', label: 'Reports', icon: FileText },
    { path: '/audit-trail', label: 'Audit Trail', icon: History },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#080d17] border-r border-slate-800 flex flex-col justify-between shrink-0 select-none font-mono">
      <div>
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center space-x-3 border-b border-slate-800/80">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-600 flex items-center justify-center shadow-cyan-glow">
            <Shield className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="font-extrabold text-base tracking-wider text-slate-100 font-mono">
              NARC<span className="text-cyan-400">-WARE</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
              AI Cyber Forensics
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border-l-2 border-cyan-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`
                }
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold ${
                    item.badge === 'TEST' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout / User Footer */}
      <div className="p-3 border-t border-slate-800/80">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out Session</span>
        </button>
      </div>
    </aside>
  );
}
