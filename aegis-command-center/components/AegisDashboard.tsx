"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, Database, Terminal, ShieldAlert, HeartPulse } from 'lucide-react';

// Mock Data
const MOCK_FLEET = [
  { id: 'aegis-core', type: 'Orchestrator', status: 'IDLE', tokens: 45200, model: 'gemini-3.1-pro', health: 100 },
  { id: 'dev-alpha', type: 'Coder', status: 'WORKING', tokens: 125000, model: 'claude-3-5-sonnet', health: 82 },
  { id: 'research-01', type: 'Analyst', status: 'WORKING', tokens: 8500, model: 'llama-3-8b', health: 95 }
];

export default function AegisDashboard() {
  const [fleet, setFleet] = useState(MOCK_FLEET);
  const [logs, setLogs] = useState(["[SYSTEM] Aegis Command Center online.", "[SYSTEM] Connected to local OpenClaw framework."]);

  // Simulate incoming logs
  useEffect(() => {
    const logInterval = setInterval(() => {
      const mockLogs = [
        "[dev-alpha] Analyzing Drizzle ORM schema...",
        "[dev-alpha] Wrote 1420 bytes to schema.ts",
        "[aegis-core] Heartbeat OK. Compacting memory...",
        "[SYSTEM] Token burn rate nominal.",
        "[research-01] Indexing local workspace files..."
      ];
      setLogs(prev => [...prev.slice(-15), mockLogs[Math.floor(Math.random() * mockLogs.length)]]);
    }, 3000);
    return () => clearInterval(logInterval);
  }, []);

  return (
    <div className="flex w-full h-full text-zinc-300 font-sans">
      
      {/* Sidebar - System Health */}
      <aside className="w-72 border-r border-zinc-800 bg-zinc-950/50 flex flex-col p-6 gap-8">
        <div>
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4" /> Global Health
          </h2>
          
          <div className="space-y-4">
            <HealthBar label="CPU Load" value={24} color="bg-blue-500" />
            <HealthBar label="Memory" value={42} color="bg-purple-500" />
            
            <div className="pt-4 border-t border-zinc-800/50 mt-4">
              <div className="text-xs text-zinc-500 mb-1">Global Token Burn</div>
              <div className="text-2xl font-bold text-amber-500">178,700</div>
            </div>
          </div>
        </div>

        <div>
           <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" /> Threat Intel
          </h2>
          <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-lg p-3 text-xs text-emerald-400 mb-6">
            Workspace secure. No anomalous API calls detected.
          </div>
          
          {/* New Agent Role/Specialty Selector */}
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">
            Custom Agent Specialization
          </h2>
          <div className="space-y-3">
            <select className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-zinc-300 outline-none focus:border-blue-500 transition-colors">
              <option value="orchestrator">Orchestrator (Manager)</option>
              <option value="analyst">Data Analyst (SQL/Python)</option>
              <option value="scraper">Web Scraper (Puppeteer/Cheerio)</option>
              <option value="coder">Senior Developer (TypeScript)</option>
              <option value="researcher">Deep Researcher</option>
              <option value="writer">Creative Writer / Copy</option>
            </select>
            <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs py-2 rounded transition-colors border border-zinc-700">
              Configure Prompt Guidelines
            </button>
          </div>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 flex flex-col">
        {/* Top: Fleet Grid */}
        <div className="p-6 flex-1 overflow-y-auto">
           <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Active Swarm (3)</h2>
           <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {fleet.map((agent, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={agent.id} 
                  className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700 transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-zinc-800/50 rounded-lg group-hover:bg-zinc-800 transition-colors">
                          <Cpu className="w-5 h-5 text-blue-400" />
                       </div>
                       <div>
                         <h3 className="font-semibold text-zinc-100">{agent.id}</h3>
                         <p className="text-xs text-zinc-500">{agent.type} Module</p>
                       </div>
                    </div>
                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                      agent.status === 'WORKING' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mt-4 text-xs font-mono">
                    <div className="flex justify-between text-zinc-400">
                      <span>Model</span>
                      <span className="text-zinc-300">{agent.model}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Tokens Burned</span>
                      <span className="text-amber-400">{agent.tokens.toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Bottom: Terminal Log */}
        <div className="h-64 border-t border-zinc-800 bg-black p-4 font-mono text-xs flex flex-col">
           <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-900 text-zinc-500">
             <Terminal className="w-4 h-4" /> Live Execution Stream
           </div>
           <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar flex flex-col justify-end">
              {logs.map((log, i) => (
                <div key={i} className={
                  log.startsWith('[SYSTEM]') ? 'text-blue-400' :
                  log.startsWith('[aegis') ? 'text-amber-400' : 'text-zinc-400'
                }>
                  {log}
                </div>
              ))}
           </div>
        </div>
      </main>

    </div>
  );
}

const HealthBar = ({ label, value, color }) => (
  <div>
    <div className="flex justify-between text-xs mb-1.5 font-mono">
      <span className="text-zinc-400">{label}</span>
      <span className="text-zinc-200">{value}%</span>
    </div>
    <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full ${color}`} 
      />
    </div>
  </div>
);