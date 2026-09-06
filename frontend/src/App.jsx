import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import WatermarkBanner from './components/WatermarkBanner';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AIAssistantModal from './components/AIAssistantModal';

import DashboardPage from './pages/DashboardPage';
import LiveTestingPage from './pages/LiveTestingPage';
import CasesPage from './pages/CasesPage';
import EvidencePage from './pages/EvidencePage';
import AlertsPage from './pages/AlertsPage';
import EntitiesPage from './pages/EntitiesPage';
import NetworkPage from './pages/NetworkPage';
import ConversationsPage from './pages/ConversationsPage';
import TimelinePage from './pages/TimelinePage';
import IngestionPage from './pages/IngestionPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ReportsPage from './pages/ReportsPage';
import AuditTrailPage from './pages/AuditTrailPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  const [user, setUser] = useState({
    username: 'investigator1',
    fullName: 'Agent Sarah Vance',
    email: 'sarah.vance@narc-ware.gov',
    badgeNumber: 'BADGE-4891',
    role: 'INVESTIGATOR'
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('ALL'); // ALL, DRUG_TRAFFICKING, EXAM_LEAK

  const handleLogout = () => {
    localStorage.removeItem('narc_token');
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

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
        <WatermarkBanner />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar onLogout={handleLogout} />

          <div className="flex-1 flex flex-col overflow-y-auto">
            <Header
              user={user}
              onOpenAssistant={() => setIsAssistantOpen(true)}
              activeCategory={activeCategory}
              onChangeCategory={setActiveCategory}
            />

            <main className="flex-1 bg-[#080c14]">
              <Routes>
                <Route path="/" element={<DashboardPage activeCategory={activeCategory} />} />
                <Route path="/live-testing" element={<LiveTestingPage />} />
                <Route path="/cases" element={<CasesPage activeCategory={activeCategory} />} />
                <Route path="/evidence" element={<EvidencePage activeCategory={activeCategory} />} />
                <Route path="/alerts" element={<AlertsPage activeCategory={activeCategory} />} />
                <Route path="/entities" element={<EntitiesPage activeCategory={activeCategory} />} />
                <Route path="/network" element={<NetworkPage activeCategory={activeCategory} />} />
                <Route path="/conversations" element={<ConversationsPage activeCategory={activeCategory} />} />
                <Route path="/timeline" element={<TimelinePage activeCategory={activeCategory} />} />
                <Route path="/ingestion" element={<IngestionPage activeCategory={activeCategory} />} />
                <Route path="/analytics" element={<AnalyticsPage activeCategory={activeCategory} />} />
                <Route path="/reports" element={<ReportsPage activeCategory={activeCategory} />} />
                <Route path="/audit-trail" element={<AuditTrailPage activeCategory={activeCategory} />} />
                <Route path="/settings" element={<SettingsPage activeCategory={activeCategory} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>

        <AIAssistantModal isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
      </div>
    </BrowserRouter>
  );
}
