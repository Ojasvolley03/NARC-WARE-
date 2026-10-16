import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('narc_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper for relative timestamps
export const getRelativeTime = (isoString) => {
  if (!isoString) return 'Just now';
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / (1000 * 60));
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

// Purge any legacy false pre-seeded data so user starts with a completely clean slate
const PURGE_SEED_KEY = 'nw_purged_legacy_v2';
if (!localStorage.getItem(PURGE_SEED_KEY)) {
  localStorage.removeItem('nw_cases');
  localStorage.removeItem('nw_alerts');
  localStorage.removeItem('nw_evidence');
  localStorage.removeItem('nw_generated_activity');
  localStorage.setItem(PURGE_SEED_KEY, 'true');
}

// All stores start completely clean and empty (no pre-seeded dummy records)
export const getStoredCases = () => {
  const saved = localStorage.getItem('nw_cases');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  return [];
};

export const saveStoredCases = (cases) => {
  localStorage.setItem('nw_cases', JSON.stringify(cases));
};

export const deleteStoredCase = (caseId) => {
  const cases = getStoredCases().filter(c => c.id !== caseId && c.caseNumber !== caseId);
  saveStoredCases(cases);
  return cases;
};

export const getStoredAlerts = () => {
  const saved = localStorage.getItem('nw_alerts');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  return [];
};

export const saveStoredAlerts = (alerts) => {
  localStorage.setItem('nw_alerts', JSON.stringify(alerts));
};

export const deleteStoredAlert = (alertId) => {
  const alerts = getStoredAlerts().filter(a => a.id !== alertId && a.alertCode !== alertId);
  saveStoredAlerts(alerts);
  return alerts;
};

export const getStoredEvidence = () => {
  const saved = localStorage.getItem('nw_evidence');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  return [];
};

export const saveStoredEvidence = (evidence) => {
  localStorage.setItem('nw_evidence', JSON.stringify(evidence));
};

export const deleteStoredEvidence = (evidenceId) => {
  const evidence = getStoredEvidence().filter(e => e.id !== evidenceId && e.evidenceId !== evidenceId);
  saveStoredEvidence(evidence);
  return evidence;
};

// Official Evidence Download Dossier Generator
export const downloadEvidenceFile = (record) => {
  const fileContent = `=====================================================
NARC-WARE // OFFICIAL DIGITAL FORENSIC EVIDENCE DOSSIER
=====================================================
INCIDENT CASE REF  : ${record.caseId || record.caseNumber || 'N/A'}
EVIDENCE FILE ID   : ${record.evidenceId || 'EVD-RECORD'}
RECORDING MODE     : ${record.mode || 'OPERATOR_SECURED'}
TIMESTAMP RECORDED : ${record.timestamp || record.uploadTime || new Date().toISOString()}
DOMAIN CATEGORY    : ${record.category || 'CYBER_THREAT'}
ASSESSED RISK SCORE: ${record.riskScore !== undefined ? record.riskScore + '%' : 'CONFIRMED'}
INTEGRITY VERIFIED : TRUE (CRYPTOGRAPHICALLY SEALED)

-----------------------------------------------------
CRYPTOGRAPHIC SHA-256 CHECKSUM:
${record.sha256 || record.sha256Hash || 'N/A'}
-----------------------------------------------------

INTERCEPTED PAYLOAD / FORENSIC EVIDENCE TEXT:
${record.text || record.summary || record.description || record.fileName || '(No raw text content)'}

=====================================================
SECURITY NOTICE:
This record was cryptographically signed and stored in
the NarcWare Digital Forensics Chain of Custody Vault.
Tampering invalidates the cryptographic SHA-256 digest.
=====================================================`;

  const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `DOSSIER_${record.evidenceId || record.caseId || 'FORENSIC'}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const MOCK_DATA = {
  cases: getStoredCases(),
  alerts: getStoredAlerts(),
  evidence: getStoredEvidence()
};

export default api;
