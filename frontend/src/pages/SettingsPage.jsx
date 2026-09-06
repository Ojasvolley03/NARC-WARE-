import React from 'react';
import { Settings, Shield, Key, Bell, Lock, Server, Cpu } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6 font-mono">
      <div>
        <h1 className="text-xl font-extrabold tracking-wide text-slate-100 flex items-center space-x-2">
          <Settings className="w-5 h-5 text-cyan-400" />
          <span>PLATFORM CONFIGURATION &amp; SECURITY SETTINGS</span>
        </h1>
        <p className="text-xs text-slate-400">System parameters, Python AI service endpoints, and JWT session rules.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-slate-200 uppercase flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>AI Engine Service Microservice</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Python Service URL</label>
              <input type="text" value="http://localhost:5000" readOnly className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-cyan-300 font-bold" />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Explainable NLP Threshold</label>
              <input type="text" value="Risk Score >= 75 (HIGH)" readOnly className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-300" />
            </div>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-slate-200 uppercase flex items-center space-x-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Cryptographic Blockchain Adapter</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Ledger Mode</label>
              <input type="text" value="LOCAL_CRYPTOGRAPHIC_SHA256_PROOF" readOnly className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-emerald-400 font-bold" />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Hashing Algorithm</label>
              <input type="text" value="SHA-256 (256-bit Secure Hash Standard)" readOnly className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
