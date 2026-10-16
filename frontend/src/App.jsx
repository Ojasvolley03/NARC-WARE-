import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PortalGate from './components/PortalGate';

import LiveTestingPage from './pages/LiveTestingPage';
import CasesPage from './pages/CasesPage';
import AlertsPage from './pages/AlertsPage';
import EvidencePage from './pages/EvidencePage';
import LoginPage from './pages/LoginPage';
import { getStoredAlerts } from './services/api';

export default function App() {
  const [user, setUser] = useState({
    username: 'analyst',
    fullName: 'Security Analyst',
    email: 'analyst@narc-ware.org',
    role: 'Threat Intelligence'
  });

  // FEATURE: Logo landing screen comes first; clicking on logo reveals site dashboard
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem('nw_portal_entered') === 'true';
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [alertCount, setAlertCount] = useState(4);

  useEffect(() => {
    try {
      const alerts = getStoredAlerts();
      const active = alerts.filter(a => a.status === 'NEW').length;
      setAlertCount(active);
    } catch (e) {}
  }, []);

  const handleEnterDashboard = () => {
    sessionStorage.setItem('nw_portal_entered', 'true');
    setIsUnlocked(true);
  };

  const handleLockPortal = () => {
    sessionStorage.removeItem('nw_portal_entered');
    setIsUnlocked(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('narc_token');
    sessionStorage.removeItem('nw_portal_entered');
    setIsUnlocked(false);
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // 1. First screen is the Logo Portal Gateway
  if (!isUnlocked) {
    return <PortalGate onEnter={handleEnterDashboard} />;
  }

  // 2. Main Site Dashboard after clicking logo
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#060a12] text-slate-100 flex flex-col font-sans">
        <div className="flex flex-1 overflow-hidden min-h-screen">
          <Sidebar onLogout={handleLogout} alertCount={alertCount} />

          <div className="flex-1 flex flex-col overflow-y-auto bg-[#070b14]">
            <Header
              user={user}
              activeCategory={activeCategory}
              onChangeCategory={setActiveCategory}
              onLock={handleLockPortal}
            />

            <main className="flex-1 bg-[#060a12]">
              <Routes>
                {/* Core Threat Intelligence Modules */}
                <Route path="/" element={<LiveTestingPage />} />
                <Route path="/cases" element={<CasesPage activeCategory={activeCategory} />} />
                <Route path="/alerts" element={<AlertsPage activeCategory={activeCategory} />} />
                <Route path="/evidence" element={<EvidencePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
