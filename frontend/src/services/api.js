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

// Fallback Synthetic Seed Data (Multi-Threat: Drug Trafficking + Exam/Paper Leak)
export const MOCK_DATA = {
  cases: [
    { id: 1, caseNumber: 'CASE-2026-089', title: 'Operation Midnight Wave', description: 'Investigation into encrypted Telegram network operating bulk synthetic shipments across eastern port entry points.', category: 'DRUG_TRAFFICKING', status: 'ACTIVE', riskLevel: 'HIGH', riskScore: 88, leadInvestigator: 'Agent Sarah Vance', priority: 'HIGH', createdAt: '2026-08-28T09:12:00Z' },
    { id: 2, caseNumber: 'CASE-2026-092', title: 'Project Nexus Frost', description: 'Cell tower analysis and cryptocurrency flow tracing targeting burner handle @phantom_vendor.', category: 'DRUG_TRAFFICKING', status: 'UNDER_REVIEW', riskLevel: 'HIGH', riskScore: 92, leadInvestigator: 'Senior Analyst Marcus Cole', priority: 'HIGH', createdAt: '2026-08-27T14:30:00Z' },
    { id: 3, caseNumber: 'CASE-2026-EXM-001', title: 'Operation Paper Guard', description: 'Detection of unauthorized board examination question paper distribution networks on Telegram and drive sharing platforms.', category: 'EXAM_LEAK', status: 'ACTIVE', riskLevel: 'HIGH', riskScore: 94, leadInvestigator: 'Senior Analyst Marcus Cole', priority: 'HIGH', createdAt: '2026-09-03T09:00:00Z' },
    { id: 4, caseNumber: 'CASE-2026-EXM-002', title: 'Project Cyber Shield', description: 'Tracing UPI payment handles and cloud drive download links offering leaked university entrance question sheets.', category: 'EXAM_LEAK', status: 'UNDER_REVIEW', riskLevel: 'HIGH', riskScore: 89, leadInvestigator: 'Agent Sarah Vance', priority: 'HIGH', createdAt: '2026-09-02T11:20:00Z' },
    { id: 5, caseNumber: 'CASE-2026-118', title: 'Project Cyber Anchor', description: 'Financial ledger reconciliation matching USDT wallet deposits with intercepted package dispatch dates.', category: 'DRUG_TRAFFICKING', status: 'ESCALATED', riskLevel: 'HIGH', riskScore: 95, leadInvestigator: 'Director Elena Rostova', priority: 'HIGH', createdAt: '2026-08-25T16:45:00Z' },
    { id: 6, caseNumber: 'CASE-2026-EXM-003', title: 'Operation Academic Integrity', description: 'Monitoring paid VIP Telegram channels selling leaked answer keys and watermarked question paper scans.', category: 'EXAM_LEAK', status: 'NEW', riskLevel: 'MEDIUM', riskScore: 72, leadInvestigator: 'Director Elena Rostova', priority: 'MEDIUM', createdAt: '2026-09-01T15:10:00Z' }
  ],
  alerts: [
    { id: 1, alertCode: 'ALT-9042', caseNumber: 'CASE-2026-089', category: 'DRUG_TRAFFICKING', riskScore: 92, riskLevel: 'HIGH', confidence: 94.8, detectionReason: 'Coded quantity slang ("5 bricks"), price reference ("20k USDT"), and dead drop location phrase detected.', relatedEntities: '@ghost_operator, +1-555-0198', status: 'NEW', timestamp: '2026-08-28T18:42:00Z', investigatorNotes: 'Requires immediate cell tower triangulation.' },
    { id: 2, alertCode: 'ALT-EXM-9102', caseNumber: 'CASE-2026-EXM-001', category: 'EXAM_LEAK', riskScore: 95, riskLevel: 'HIGH', confidence: 96.5, detectionReason: 'Original question paper leak offer ("State Board Physics Set-A PDF"), price quote ("5000 INR"), and UPI transaction handle ("paper_leak_admin@upi") detected.', relatedEntities: '@leak_master_2026, paper_leak_admin@upi', status: 'NEW', timestamp: '2026-09-03T09:40:00Z', investigatorNotes: 'Drive link drive.google.com/file/d/... flagged for subpoena request.' },
    { id: 3, alertCode: 'ALT-9045', caseNumber: 'CASE-2026-092', category: 'DRUG_TRAFFICKING', riskScore: 87, riskLevel: 'HIGH', confidence: 91.2, detectionReason: 'Communication evasion indicator ("switch app", "clear chat") coupled with purity claims ("pure uncut").', relatedEntities: '@phantom_vendor, Jackal', status: 'UNDER_REVIEW', timestamp: '2026-08-28T16:15:00Z', investigatorNotes: 'Assigned to Senior Analyst Marcus Cole.' },
    { id: 4, alertCode: 'ALT-EXM-9106', caseNumber: 'CASE-2026-EXM-002', category: 'EXAM_LEAK', riskScore: 89, riskLevel: 'HIGH', confidence: 92.4, detectionReason: 'Scanned paper PDF download link ("drive.google.com/file/d/leak_physics_setA") coupled with self-destruct timer evasion marker.', relatedEntities: '@topper_answer_keys, +1-555-0199', status: 'UNDER_REVIEW', timestamp: '2026-09-02T14:15:00Z', investigatorNotes: 'PDF evidence hash anchored to Block #3.' },
    { id: 5, alertCode: 'ALT-9048', caseNumber: 'CASE-2026-118', category: 'DRUG_TRAFFICKING', riskScore: 89, riskLevel: 'HIGH', confidence: 96.0, detectionReason: 'High-volume wallet transaction matching intercepted dispatch timestamp within 4 minute window.', relatedEntities: '0x71C7656EC7ab88b098defB751B7401B5f6d89A2', status: 'NEW', timestamp: '2026-08-28T12:05:00Z', investigatorNotes: 'Blockchain verification completed.' }
  ],
  entities: [
    { id: 1, name: 'Ghost Operator', type: 'USERNAME', identifier: '@ghost_operator', category: 'DRUG_TRAFFICKING', riskScore: 94, riskLevel: 'HIGH', caseNumber: 'CASE-2026-089', threatFlags: 'High-volume coordinator, Multi-wallet proxy, Evasion tactics', messageCount: 42, connectionCount: 12 },
    { id: 2, name: 'Exam Leak Master Ring', type: 'USERNAME', identifier: '@leak_master_2026', category: 'EXAM_LEAK', riskScore: 96, riskLevel: 'HIGH', caseNumber: 'CASE-2026-EXM-001', threatFlags: 'Primary paper distributor, Private Telegram channel admin, Auto-delete timer enabled', messageCount: 54, connectionCount: 16 },
    { id: 3, name: 'Paper Leak UPI Receiver', type: 'WALLET_UPI', identifier: 'paper_leak_admin@upi', category: 'EXAM_LEAK', riskScore: 92, riskLevel: 'HIGH', caseNumber: 'CASE-2026-EXM-001', threatFlags: 'Advance payment handle, 5000 INR per paper quote, GPay/PhonePe receiver', messageCount: 31, connectionCount: 11 },
    { id: 4, name: 'Phantom Vendor', type: 'USERNAME', identifier: '@phantom_vendor', category: 'DRUG_TRAFFICKING', riskScore: 91, riskLevel: 'HIGH', caseNumber: 'CASE-2026-092', threatFlags: 'Bulk distributor, Coded pricing slang, Burner rotater', messageCount: 38, connectionCount: 9 },
    { id: 5, name: 'Leaked Drive Folder Link', type: 'SUSPICIOUS_LINK', identifier: 'drive.google.com/file/d/leak_physics_setA', category: 'EXAM_LEAK', riskScore: 88, riskLevel: 'HIGH', caseNumber: 'CASE-2026-EXM-001', threatFlags: 'Scanned question paper PDF download, Restricted link distribution', messageCount: 19, connectionCount: 8 },
    { id: 6, name: 'USDT Escrow Wallet', type: 'WALLET', identifier: '0x71C7656EC7ab88b098defB751B7401B5f6d89A2', category: 'DRUG_TRAFFICKING', riskScore: 89, riskLevel: 'HIGH', caseNumber: 'CASE-2026-118', threatFlags: 'Rapid layering, Tumbler interactions, High volume cash-out', messageCount: 15, connectionCount: 18 }
  ],
  evidence: [
    { id: 1, evidenceId: 'EVD-881', caseNumber: 'CASE-2026-089', fileName: 'Telegram_Export_Conv7891.json', source: 'TELEGRAM_EXPORT', fileType: 'JSON', sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', sizeBytes: 1048576, integrityStatus: 'VERIFIED_ON_CHAIN', blockIndex: 1, uploadTime: '2026-08-28T10:15:00Z', chainOfCustody: '[{"action":"UPLOAD","by":"Agent Sarah Vance","time":"2026-08-28T10:15:00Z"}]' },
    { id: 2, evidenceId: 'EVD-891', caseNumber: 'CASE-2026-EXM-001', fileName: 'State_Board_Physics_SetA.pdf', source: 'QUESTION_PAPER_SCAN', fileType: 'PDF', sha256Hash: '3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b', sizeBytes: 3145728, integrityStatus: 'VERIFIED_ON_CHAIN', blockIndex: 3, uploadTime: '2026-09-03T09:30:00Z', chainOfCustody: '[{"action":"UPLOAD","by":"Senior Analyst Marcus Cole","time":"2026-09-03T09:30:00Z"}]' },
    { id: 3, evidenceId: 'EVD-892', caseNumber: 'CASE-2026-EXM-001', fileName: 'UPI_Payment_Transaction_Logs.csv', source: 'FINANCIAL_RECEIPT', fileType: 'CSV', sha256Hash: '5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d', sizeBytes: 1572864, integrityStatus: 'VERIFIED_ON_CHAIN', blockIndex: 4, uploadTime: '2026-09-03T10:45:00Z', chainOfCustody: '[{"action":"UPLOAD","by":"Agent Sarah Vance","time":"2026-09-03T10:45:00Z"}]' }
  ],
  blocks: [
    { id: 1, blockIndex: 1, previousHash: '0000000000000000000000000000000000000000000000000000000000000000', blockHash: '0000a4b9c8d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7', merkleRoot: '9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8', transactionData: '{"evidenceId":"EVD-881","hash":"e3b0c442...","validator":"BADGE-4891"}', validatorSignature: 'SIG_EC_SECP256K1_9F8A7B6C', timestamp: '2026-08-28T10:16:00Z' },
    { id: 2, blockIndex: 2, previousHash: '0000a4b9c8d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7', blockHash: '00008f4e5d6c7b8a90123456789abcdef0123456789abcdef0123456789abcdef', merkleRoot: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2', transactionData: '{"evidenceId":"EVD-882","hash":"8f4e5d6c...","validator":"BADGE-1024"}', validatorSignature: 'SIG_EC_SECP256K1_1A2B3C4D', timestamp: '2026-08-28T11:21:00Z' },
    { id: 3, blockIndex: 3, previousHash: '00008f4e5d6c7b8a90123456789abcdef0123456789abcdef0123456789abcdef', blockHash: '00003a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f', merkleRoot: '3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4', transactionData: '{"evidenceId":"EVD-891","hash":"3a4b5c6d...","validator":"BADGE-1024"}', validatorSignature: 'SIG_EC_SECP256K1_3A4B5C6D', timestamp: '2026-09-03T09:31:00Z' }
  ],
  auditLogs: [
    { id: 1, username: 'investigator1', userRole: 'INVESTIGATOR', action: 'LOGIN', target: 'SYSTEM', details: 'User authenticated with MFA badge verification.', ipAddress: '192.168.1.104', timestamp: '2026-09-03T12:10:00Z' },
    { id: 2, username: 'senior_analyst', userRole: 'SENIOR_ANALYST', action: 'EXAM_LEAK_ANALYSIS', target: 'EVD-891', details: 'Performed multi-signal NLP risk analysis on State_Board_Physics_SetA.pdf payload.', ipAddress: '192.168.1.108', timestamp: '2026-09-03T12:15:00Z' },
    { id: 3, username: 'senior_analyst', userRole: 'SENIOR_ANALYST', action: 'HASH_VERIFY', target: 'EVD-891', details: 'Performed live blockchain cryptographic SHA-256 integrity verification.', ipAddress: '192.168.1.108', timestamp: '2026-09-03T12:45:00Z' }
  ]
};

export default api;
