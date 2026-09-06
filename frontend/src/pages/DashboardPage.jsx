import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  AlertTriangle,
  Users,
  ShieldCheck,
  Network,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ShieldAlert,
  Search,
  ExternalLink,
  ChevronRight,
  FileText,
  Sparkles,
  UploadCloud,
  MessageSquare,
  Clock,
  History,
  Settings,
  Lock,
  BarChart3
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import api, { MOCK_DATA } from '../services/api';

export default function DashboardPage({ activeCategory }) {
  const [metrics, setMetrics] = useState(null);
  const [alerts, setAlerts] = useState(MOCK_DATA.alerts);

  useEffect(() => {
    api.get(`/analytics/dashboard?category=${activeCategory || 'ALL'}`)
      .then(res => setMetrics(res.data))
      .catch(() => {
        setMetrics({
          activeCases: 8,
          totalAlerts: 24,
          highRiskAlerts: 16,
          totalEntities: 42,
          verifiedEvidence: 18,
          evidenceIntegrityPercent: 100.0,
          riskDistribution: [
            { name: 'High Threat', value: 50, fill: '#ef4444' },
            { name: 'Medium Threat', value: 35, fill: '#f59e0b' },
            { name: 'Low Threat', value: 15, fill: '#10b981' }
          ],
          alertsOverTime: [
            { date: 'Aug 28', alerts: 12, highRisk: 4 },
            { date: 'Aug 29', alerts: 19, highRisk: 7 },
            { date: 'Aug 30', alerts: 24, highRisk: 11 },
            { date: 'Sep 01', alerts: 18, highRisk: 6 },
            { date: 'Sep 02', alerts: 31, highRisk: 15 },
            { date: 'Sep 03', alerts: 37, highRisk: 18 }
          ]
        });
      });
  }, [activeCategory]);

  const filteredAlerts = alerts.filter(a => activeCategory === 'ALL' || a.category === activeCategory);

  const statCards = [
    { title: 'Active Cases', value: activeCategory === 'EXAM_LEAK' ? 3 : (activeCategory === 'DRUG_TRAFFICKING' ? 5 : 8), icon: Briefcase, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
    { title: 'High-Risk AI Alerts', value: activeCategory === 'EXAM_LEAK' ? 6 : (activeCategory === 'DRUG_TRAFFICKING' ? 10 : 16), icon: AlertTriangle, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
    { title: 'Tracked Suspect Entities', value: activeCategory === 'EXAM_LEAK' ? 18 : (activeCategory === 'DRUG_TRAFFICKING' ? 24 : 42), icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { title: 'Verified Evidence', value: `${activeCategory === 'EXAM_LEAK' ? 8 : (activeCategory === 'DRUG_TRAFFICKING' ? 10 : 18)} (100%)`, icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { title: 'Network Clusters', value: '6 Active', icon: Network, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  ];

  // All Platform Activities Unified Hub Links
  const allActivities = [
    { name: 'Live Detection Testing', path: '/live-testing', icon: Sparkles, color: 'text-cyan-400', bg: 'bg-cyan-500/10', desc: 'Instant sample message analysis for Drug & Exam Leaks' },
    { name: 'Case Management', path: '/cases', icon: Briefcase, color: 'text-blue-400', bg: 'bg-blue-500/10', desc: 'Active law enforcement dockets & investigator assignments' },
    { name: 'AI Alert Center', path: '/alerts', icon: AlertTriangle, color: 'text-rose-400', bg: 'bg-rose-500/10', desc: 'Explainable threat risk scoring & human review actions' },
    { name: 'Evidence Vault & Blockchain', path: '/evidence', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10', desc: 'Immutable SHA-256 live hash & block ledger verification' },
    { name: 'Entity Intelligence', path: '/entities', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10', desc: 'Cross-channel suspect profiling, handles, phone & UPIs' },
    { name: 'Network Analysis Graph', path: '/network', icon: Network, color: 'text-indigo-400', bg: 'bg-indigo-500/10', desc: 'Multi-tier interactive node graph & bridge node detection' },
    { name: 'Conversations Stream', path: '/conversations', icon: MessageSquare, color: 'text-cyan-300', bg: 'bg-cyan-950/40', desc: 'Decrypted Telegram & WhatsApp intercepted message logs' },
    { name: 'Chronological Timeline', path: '/timeline', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10', desc: 'Unified temporal sequence of messages, sightings & alerts' },
    { name: 'Multi-Format Ingestion', path: '/ingestion', icon: UploadCloud, color: 'text-teal-400', bg: 'bg-teal-500/10', desc: '5-step automated import for CSV, JSON & PDF exports' },
    { name: 'AI Cyber Analytics', path: '/analytics', icon: BarChart3, color: 'text-sky-400', bg: 'bg-sky-500/10', desc: 'Precision, recall, false-positive & cluster growth metrics' },
    { name: 'Investigation Reports', path: '/reports', icon: FileText, color: 'text-emerald-300', bg: 'bg-emerald-950/40', desc: 'Formal legal briefs with PDF, JSON & CSV export' },
    { name: 'System Audit Trail', path: '/audit-trail', icon: History, color: 'text-slate-400', bg: 'bg-slate-800/40', desc: 'Tamper-evident logs of user authentication & actions' },
  ];

  return (
    <div className="p-6 space-y-6 font-mono select-none">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#0c1527] via-[#0f1d38] to-[#0c1527] border border-cyan-500/30 rounded-2xl p-6 shadow-cyan-glow">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-100 font-mono">
              UNIFIED CYBER FORENSICS PLATFORM
            </h1>
            <span className="bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">THREAT LEVEL: HIGH</span>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            All investigation activities unified under one central dashboard link: <strong className="text-cyan-300">Drug Trafficking</strong> and <strong className="text-amber-300">Exam/Paper Leak</strong> detection.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right font-mono text-xs hidden sm:block">
            <div className="text-cyan-400 font-bold">UNIFIED PORTAL ACTIVE</div>
            <div className="text-slate-400">Blockchain Block #1405</div>
          </div>
        </div>
      </div>

      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className={`glass-panel p-4 rounded-xl border ${card.border} glass-panel-hover flex flex-col justify-between`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">{card.title}</span>
                <div className={`p-2 rounded-lg ${card.bg} ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-extrabold font-mono text-slate-100 tracking-tight">{card.value}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Unified Platform Activities Hub (All 12 Modules in One Place) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase text-slate-200 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>All Platform Activities &amp; Investigation Modules (Single Access Hub)</span>
          </h3>
          <span className="text-[10px] text-slate-400">12 Modules Integrated</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {allActivities.map((act, idx) => {
            const Icon = act.icon;
            return (
              <Link
                key={idx}
                to={act.path}
                className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-cyan-500/50 glass-panel-hover flex flex-col justify-between space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl ${act.bg} ${act.color}`}>
                    <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-100 group-hover:text-cyan-300 transition-colors">{act.name}</div>
                  <div className="text-[10px] text-slate-400 mt-1 leading-relaxed">{act.desc}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Alerts Over Time */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold tracking-wider text-slate-200 uppercase">AI Threat Detection Volume (Drug + Exam Leak)</h3>
            </div>
            <span className="text-[10px] text-slate-400">Past 7 Days</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics?.alertsOverTime || []}>
                <defs>
                  <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00f2fe" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#475569" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis stroke="#475569" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="alerts" stroke="#00f2fe" fillOpacity={1} fill="url(#colorAlerts)" name="Total Intercepts" />
                <Area type="monotone" dataKey="highRisk" stroke="#ef4444" fillOpacity={1} fill="url(#colorHigh)" name="High Risk Alerts" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 1 Col: Risk Distribution */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <h3 className="text-xs font-bold tracking-wider text-slate-200 uppercase">Explainable Risk Distribution</h3>
          </div>

          <div className="h-48 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={metrics?.riskDistribution || []} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4}>
                  {(metrics?.riskDistribution || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 text-center gap-2 text-[10px]">
            <div className="p-2 bg-rose-950/40 border border-rose-500/30 rounded-lg text-rose-300 font-semibold">High: 50%</div>
            <div className="p-2 bg-amber-950/40 border border-amber-500/30 rounded-lg text-amber-300 font-semibold">Med: 35%</div>
            <div className="p-2 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-emerald-300 font-semibold">Low: 15%</div>
          </div>
        </div>
      </div>

      {/* Recent Alerts Feed Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <h3 className="text-xs font-bold tracking-wider text-slate-200 uppercase">Recent AI Threat Detections</h3>
          </div>
          <Link to="/alerts" className="text-xs text-cyan-400 cursor-pointer hover:underline flex items-center space-x-1">
            <span>View All Alerts</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-3.5 pl-6">Alert Code</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Case Number</th>
                <th className="p-3.5">Risk Score</th>
                <th className="p-3.5">Confidence</th>
                <th className="p-3.5">Detection Reason</th>
                <th className="p-3.5 pr-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filteredAlerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 pl-6 font-bold text-cyan-400">{alert.alertCode}</td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      alert.category === 'EXAM_LEAK' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    }`}>
                      {alert.category === 'EXAM_LEAK' ? 'EXAM LEAK' : 'DRUG TRAFFICKING'}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-300">{alert.caseNumber}</td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${alert.riskScore >= 75 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'}`}>
                      {alert.riskScore}/100 — {alert.riskLevel}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-400">{alert.confidence}%</td>
                  <td className="p-3.5 max-w-xs truncate text-slate-300">{alert.detectionReason}</td>
                  <td className="p-3.5 pr-6">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                      {alert.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
