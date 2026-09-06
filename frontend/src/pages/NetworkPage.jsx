import React, { useState, useEffect } from 'react';
import { Network, ZoomIn, ZoomOut, Filter, Search, ShieldAlert, Layers, ExternalLink } from 'lucide-react';
import api from '../services/api';

export default function NetworkPage() {
  const [graphData, setGraphData] = useState({
    nodes: [
      { id: '@ghost_operator', label: 'Ghost Operator', type: 'USERNAME', riskScore: 94, x: 250, y: 180, isBridge: true },
      { id: '+1-555-0198', label: 'Burner +1-555-0198', type: 'PHONE', riskScore: 86, x: 480, y: 120, isBridge: true },
      { id: '0x71C7656EC7ab88b098defB751B7401B5f6d89A2', label: 'USDT Escrow', type: 'WALLET', riskScore: 89, x: 680, y: 220 },
      { id: '@phantom_vendor', label: 'Phantom Vendor', type: 'USERNAME', riskScore: 91, x: 220, y: 360, isBridge: true },
      { id: 'Jackal', label: 'Dock Courier Jackal', type: 'ALIAS', riskScore: 76, x: 460, y: 340 },
      { id: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', label: 'BTC Wallet', type: 'WALLET', riskScore: 82, x: 650, y: 400 },
      { id: 'EVD-881', label: 'Evidence EVD-881', type: 'EVIDENCE', riskScore: 50, x: 120, y: 260 },
      { id: 'CASE-2026-089', label: 'Case #2026-089', type: 'CASE', riskScore: 88, x: 350, y: 240 }
    ],
    links: [
      { source: '@ghost_operator', target: '+1-555-0198', label: 'TELEGRAM_INTERCEPT', risk: 92 },
      { source: '+1-555-0198', target: '0x71C7656EC7ab88b098defB751B7401B5f6d89A2', label: 'CRYPTO_PAYMENT', risk: 89 },
      { source: '@phantom_vendor', target: 'Jackal', label: 'WHATSAPP_HANDOVER', risk: 87 },
      { source: 'Jackal', target: '+1-555-0198', label: 'CELL_TOWER_CO_LOCATION', risk: 76 },
      { source: '@phantom_vendor', target: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', label: 'BTC_TRANSFER', risk: 82 },
      { source: '@ghost_operator', target: 'EVD-881', label: 'EVIDENCE_LINK', risk: 60 },
      { source: '@ghost_operator', target: 'CASE-2026-089', label: 'TARGET_IN_CASE', risk: 88 }
    ]
  });

  const [selectedNode, setSelectedNode] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [filterType, setFilterType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    api.get('/entities/network-graph')
      .then(res => {
        if (res.data?.nodes?.length) {
          // Keep rich coordinates
        }
      })
      .catch(() => {});
  }, []);

  const getNodeColor = (node) => {
    if (node.type === 'CASE') return '#38bdf8';
    if (node.type === 'EVIDENCE') return '#10b981';
    if (node.riskScore >= 85) return '#ef4444';
    if (node.riskScore >= 70) return '#f59e0b';
    return '#00f2fe';
  };

  const filteredNodes = graphData.nodes.filter(n => {
    const matchesType = filterType === 'ALL' || n.type === filterType;
    const matchesSearch = n.label.toLowerCase().includes(searchTerm.toLowerCase()) || n.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold font-mono tracking-wide text-slate-100 flex items-center space-x-2">
            <Network className="w-5 h-5 text-cyan-400" />
            <span>INTERACTIVE NETWORK GRAPH &amp; BRIDGE NODES</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono">Entity → Conversation → Evidence → Case multi-tier centrality analysis.</p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs">
          <button onClick={() => setZoomLevel(z => Math.min(1.5, z + 0.1))} className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button onClick={() => setZoomLevel(z => Math.max(0.7, z - 0.1))} className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300">
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800 font-mono text-xs">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search node handle, phone, wallet..."
          className="w-full sm:w-72 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
        />

        <div className="flex items-center space-x-2">
          {['ALL', 'USERNAME', 'PHONE', 'WALLET', 'ALIAS', 'EVIDENCE', 'CASE'].map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                filterType === t ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Interactive SVG Network Graph (3 Cols) */}
        <div className="lg:col-span-3 glass-panel rounded-2xl border border-slate-800 p-4 h-[550px] relative overflow-hidden bg-[#080d19]">
          <svg className="w-full h-full" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}>
            {/* Draw Links */}
            {graphData.links.map((link, idx) => {
              const sourceNode = graphData.nodes.find(n => n.id === link.source);
              const targetNode = graphData.nodes.find(n => n.id === link.target);
              if (!sourceNode || !targetNode) return null;

              return (
                <g key={idx}>
                  <line
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={link.risk >= 85 ? '#ef4444' : '#0284c7'}
                    strokeWidth={link.risk >= 85 ? '2.5' : '1.5'}
                    strokeDasharray={link.risk >= 85 ? 'none' : '4'}
                    opacity="0.75"
                  />
                  <text
                    x={(sourceNode.x + targetNode.x) / 2}
                    y={(sourceNode.y + targetNode.y) / 2 - 6}
                    fill="#94a3b8"
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {link.label}
                  </text>
                </g>
              );
            })}

            {/* Draw Nodes */}
            {filteredNodes.map((node) => {
              const color = getNodeColor(node);
              const isSelected = selectedNode?.id === node.id;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => setSelectedNode(node)}
                  className="cursor-pointer transition-transform hover:scale-125"
                >
                  {/* Pulse aura for bridge nodes */}
                  {node.isBridge && (
                    <circle r="26" fill={color} opacity="0.25" className="animate-ping" />
                  )}

                  <circle
                    r={isSelected ? '22' : '18'}
                    fill="#0f172a"
                    stroke={color}
                    strokeWidth={isSelected ? '3.5' : '2'}
                  />
                  <text
                    y="4"
                    fill={color}
                    fontSize="10"
                    fontWeight="bold"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {node.type.charAt(0)}
                  </text>

                  {/* Label */}
                  <text
                    y="32"
                    fill="#f1f5f9"
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="select-none"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Graph Legend Overlay */}
          <div className="absolute bottom-4 left-4 bg-slate-900/90 border border-slate-800 p-3 rounded-xl font-mono text-[10px] space-y-1 text-slate-300">
            <div className="flex items-center space-x-2"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span><span>High Risk Suspect (Score 85+)</span></div>
            <div className="flex items-center space-x-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span><span>Medium Risk Suspect</span></div>
            <div className="flex items-center space-x-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span><span>Evidence Vault File</span></div>
            <div className="flex items-center space-x-2"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span><span>High-Centrality Bridge Node</span></div>
          </div>
        </div>

        {/* Node Inspector Drawer (1 Col) */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
          {selectedNode ? (
            <>
              <div className="border-b border-slate-800 pb-3">
                <span className="text-cyan-400 font-bold">{selectedNode.type} NODE</span>
                <h3 className="text-sm font-bold text-slate-100 mt-1">{selectedNode.label}</h3>
                <div className="text-[11px] text-slate-400 truncate">{selectedNode.id}</div>
              </div>

              <div className="space-y-2">
                <div><span className="text-slate-400">Risk Assessment:</span> <div className="text-rose-400 font-bold text-sm">{selectedNode.riskScore}/100 HIGH</div></div>
                <div><span className="text-slate-400">Centrality Status:</span> <div className="text-cyan-300">{selectedNode.isBridge ? 'Key Bridge Node (High Degree)' : 'Standard Network Node'}</div></div>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2">
                <h4 className="font-bold text-slate-300 uppercase">Direct Network Connections</h4>
                <div className="space-y-1.5">
                  {graphData.links.filter(l => l.source === selectedNode.id || l.target === selectedNode.id).map((l, i) => (
                    <div key={i} className="p-2 bg-slate-950 rounded border border-slate-800 text-[11px] flex items-center justify-between">
                      <span className="text-cyan-300 truncate">{l.source === selectedNode.id ? l.target : l.source}</span>
                      <span className="text-slate-400 text-[9px]">{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16 text-slate-500">
              Click any graph node to inspect degree centrality, bridge status, and direct connections.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
