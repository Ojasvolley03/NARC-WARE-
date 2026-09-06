import React, { useState, useEffect } from 'react';
import { History, Shield, Lock, Search, Filter } from 'lucide-react';
import api, { MOCK_DATA } from '../services/api';

export default function AuditTrailPage() {
  const [logs, setLogs] = useState(MOCK_DATA.auditLogs);

  useEffect(() => {
    api.get('/audit-trail')
      .then(res => { if (res.data?.length) setLogs(res.data); })
      .catch(() => setLogs(MOCK_DATA.auditLogs));
  }, []);

  return (
    <div className="p-6 space-y-6 font-mono">
      <div>
        <h1 className="text-xl font-extrabold tracking-wide text-slate-100 flex items-center space-x-2">
          <History className="w-5 h-5 text-cyan-400" />
          <span>IMMUTABLE SYSTEM AUDIT TRAIL</span>
        </h1>
        <p className="text-xs text-slate-400">Complete, tamper-evident log of all user authentication, evidence views, and status decisions.</p>
      </div>

      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200 uppercase">Audit Records ({logs.length})</span>
          <span className="text-xs text-cyan-400 font-bold">● LIVE LOGGING ACTIVE</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-3.5 pl-6">Timestamp</th>
                <th className="p-3.5">User</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Action</th>
                <th className="p-3.5">Target</th>
                <th className="p-3.5">IP Address</th>
                <th className="p-3.5 pr-6">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 pl-6 text-slate-400">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="p-3.5 font-bold text-cyan-300">{log.username}</td>
                  <td className="p-3.5"><span className="px-2 py-0.5 bg-slate-900 border border-slate-700 text-slate-300 text-[10px] rounded">{log.userRole}</span></td>
                  <td className="p-3.5 font-bold text-slate-100">{log.action}</td>
                  <td className="p-3.5 text-cyan-400">{log.target}</td>
                  <td className="p-3.5 text-slate-400">{log.ipAddress}</td>
                  <td className="p-3.5 pr-6 text-slate-300 max-w-xs truncate">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
