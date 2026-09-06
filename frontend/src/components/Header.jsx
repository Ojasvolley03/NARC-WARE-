import React from 'react';
import { Search, Bell, Shield, User, Bot, Clock, Filter, FileText, AlertTriangle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header({ user, onOpenAssistant, activeCategory, onChangeCategory }) {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 border-b border-slate-800 bg-[#0b1220]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30 font-mono">
      {/* Category Threat Mode Selector */}
      <div className="flex items-center space-x-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase hidden md:inline">THREAT DOMAIN:</span>
        <div className="flex items-center space-x-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => onChangeCategory && onChangeCategory('ALL')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeCategory === 'ALL'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-cyan-glow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Threats
          </button>
          <button
            onClick={() => onChangeCategory && onChangeCategory('DRUG_TRAFFICKING')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeCategory === 'DRUG_TRAFFICKING'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-cyan-glow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Drug Trafficking
          </button>
          <button
            onClick={() => onChangeCategory && onChangeCategory('EXAM_LEAK')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeCategory === 'EXAM_LEAK'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-amber-glow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Exam/Paper Leak
          </button>
        </div>
      </div>

      {/* Right Action Icons & Profile */}
      <div className="flex items-center space-x-3">
        {/* Clock */}
        <div className="hidden lg:flex items-center space-x-1.5 text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-md">
          <Clock className="w-3.5 h-3.5" />
          <span>{time} UTC</span>
        </div>

        {/* Live Test Slide Quick Button */}
        <Link
          to="/live-testing"
          className="flex items-center space-x-1.5 bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/40 px-3 py-1.5 rounded-lg text-xs font-bold shadow-cyan-glow transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>Live Testing</span>
        </Link>

        {/* AI Assistant Button */}
        <button
          onClick={onOpenAssistant}
          className="flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-cyan-glow transition-all active:scale-95"
        >
          <Bot className="w-4 h-4 animate-bounce" />
          <span className="hidden sm:inline">AI Assistant</span>
        </button>

        {/* Notification Bell */}
        <button className="relative p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60 rounded-lg transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>

        <div className="h-6 w-[1px] bg-slate-800"></div>

        {/* User Badge */}
        <div className="flex items-center space-x-3 pl-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xs text-slate-950 shadow-cyan-glow">
            {user?.fullName?.charAt(0) || 'A'}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-slate-200 leading-tight">
              {user?.fullName || 'Agent Sarah Vance'}
            </div>
            <div className="text-[10px] text-cyan-400 leading-tight">
              {user?.role || 'INVESTIGATOR'} • {user?.badgeNumber || 'BADGE-4891'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
