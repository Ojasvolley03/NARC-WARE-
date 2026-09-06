import React from 'react';
import { BarChart3, TrendingUp, ShieldCheck, Activity, Target } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsPage() {
  const alertData = [
    { day: 'Mon', alerts: 12, fp: 1 },
    { day: 'Tue', alerts: 19, fp: 2 },
    { day: 'Wed', alerts: 24, fp: 1 },
    { day: 'Thu', alerts: 18, fp: 0 },
    { day: 'Fri', alerts: 31, fp: 2 },
    { day: 'Sat', alerts: 28, fp: 1 },
    { day: 'Sun', alerts: 37, fp: 2 }
  ];

  const modelMetrics = [
    { metric: 'Detection Precision', val: '94.2%' },
    { metric: 'Recall Rate', val: '91.8%' },
    { metric: 'False Positive Rate', val: '4.1%' },
    { metric: 'Human Agreement Rate', val: '96.5%' }
  ];

  return (
    <div className="p-6 space-y-6 font-mono">
      <div>
        <h1 className="text-xl font-extrabold tracking-wide text-slate-100 flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <span>CYBER INTELLIGENCE &amp; AI ACCURACY ANALYTICS</span>
        </h1>
        <p className="text-xs text-slate-400">Statistical evaluation of detection precision, false positive rates, and cluster growth.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {modelMetrics.map((m, idx) => (
          <div key={idx} className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1">
            <div className="text-xs text-slate-400">{m.metric}</div>
            <div className="text-2xl font-extrabold text-cyan-400">{m.val}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold uppercase text-slate-200">Daily Threat Alert Volume vs False Positives</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={alertData}>
                <XAxis dataKey="day" stroke="#475569" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis stroke="#475569" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Bar dataKey="alerts" fill="#00f2fe" name="Valid Alerts" radius={[4, 4, 0, 0]} />
                <Bar dataKey="fp" fill="#ef4444" name="False Positives" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold uppercase text-slate-200">Entity Network Growth &amp; Degree Expansion</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={alertData}>
                <XAxis dataKey="day" stroke="#475569" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis stroke="#475569" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Line type="monotone" dataKey="alerts" stroke="#38bdf8" strokeWidth={2.5} name="Entity Intercepts" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
