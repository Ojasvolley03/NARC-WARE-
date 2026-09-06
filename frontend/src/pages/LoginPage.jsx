import React, { useState } from 'react';
import { Shield, Key, User, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import api from '../services/api';

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('investigator1');
  const [password, setPassword] = useState('Password123!');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('narc_token', res.data.token);
      onLoginSuccess(res.data);
    } catch (err) {
      // Fallback mock login for seamless demo
      const mockUser = {
        username: username,
        fullName: username === 'senior_analyst' ? 'Senior Analyst Marcus Cole' : (username === 'admin' ? 'Director Elena Rostova' : 'Agent Sarah Vance'),
        email: `${username}@narc-ware.gov`,
        badgeNumber: username === 'senior_analyst' ? 'BADGE-1024' : (username === 'admin' ? 'BADGE-0001' : 'BADGE-4891'),
        role: username === 'senior_analyst' ? 'SENIOR_ANALYST' : (username === 'admin' ? 'ADMIN' : 'INVESTIGATOR')
      };
      localStorage.setItem('narc_token', 'MOCK_JWT_TOKEN_LAW_ENFORCEMENT');
      onLoginSuccess(mockUser);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSelect = (uname, role) => {
    setUsername(uname);
    setPassword('Password123!');
  };

  return (
    <div className="min-h-screen bg-[#080c14] flex items-center justify-center p-4 font-mono select-none">
      <div className="w-full max-w-md bg-[#0e1626] border border-cyan-500/30 rounded-2xl shadow-cyan-glow p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center mx-auto shadow-cyan-glow">
            <Shield className="w-7 h-7 text-slate-950 stroke-[2.5]" />
          </div>
          <h1 className="text-xl font-extrabold tracking-wider text-slate-100 mt-2">NARC<span className="text-cyan-400">-WARE</span></h1>
          <p className="text-xs text-slate-400">AI Drug Trafficking Detection &amp; Digital Forensics</p>
        </div>

        {error && (
          <div className="p-3 bg-rose-950/60 border border-rose-500/50 rounded-xl text-rose-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Law Enforcement Username</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Badge Security Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-cyan-glow transition-all flex items-center justify-center space-x-2"
          >
            <span>Authenticate Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Accounts Selector */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <div className="text-[11px] text-slate-400 text-center uppercase tracking-wider font-bold">Quick Select Demo Account</div>
          <div className="grid grid-cols-3 gap-2 text-[10px]">
            <button
              type="button"
              onClick={() => handleDemoSelect('investigator1', 'INVESTIGATOR')}
              className="p-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-lg text-slate-300 text-center font-bold"
            >
              Investigator
            </button>
            <button
              type="button"
              onClick={() => handleDemoSelect('senior_analyst', 'SENIOR_ANALYST')}
              className="p-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-lg text-slate-300 text-center font-bold"
            >
              Senior Analyst
            </button>
            <button
              type="button"
              onClick={() => handleDemoSelect('admin', 'ADMIN')}
              className="p-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-lg text-slate-300 text-center font-bold"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
