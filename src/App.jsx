import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TerminalPanel from './components/TerminalPanel';
import FleetGrid from './components/FleetGrid';
import { AgentService } from './services/agentService';

function App() {
  const [agents, setAgents] = useState([]);
  const [logs, setLogs] = useState([]);
  const [systemHealth, setSystemHealth] = useState({ cpu: 12, memory: 45, tokenBurn: 0 });

  useEffect(() => {
    // Mock loading active OpenClaw agents
    const initialAgents = AgentService.getAgents();
    setAgents(initialAgents);

    const logInterval = setInterval(() => {
      const newLog = AgentService.generateMockLog();
      setLogs(prev => [...prev, newLog].slice(-50)); // Keep last 50 logs
      
      // Update token burn
      if(newLog.includes("Tokens:")) {
         setSystemHealth(prev => ({...prev, tokenBurn: prev.tokenBurn + 45}));
      }
    }, 2000);

    return () => clearInterval(logInterval);
  }, []);

  const handleSpawn = (type) => {
    const newAgent = AgentService.spawn(type);
    setAgents(prev => [...prev, newAgent]);
    setLogs(prev => [...prev, `[SYSTEM] Spawning new ${type} agent: ${newAgent.id}`]);
  };

  const handleCommand = (cmd) => {
    setLogs(prev => [...prev, `[USER] ${cmd}`]);
    
    setTimeout(() => {
      if(cmd.startsWith('kill')) {
        const id = cmd.split(' ')[1];
        setAgents(prev => prev.filter(a => a.id !== id));
        setLogs(prev => [...prev, `[SYSTEM] Terminated agent: ${id}`]);
      } else {
        setLogs(prev => [...prev, `[AEGIS] Command acknowledged. Dispatching to fleet...`]);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-300 font-mono flex">
      {/* Sidebar for System Health & Spawning */}
      <Sidebar health={systemHealth} onSpawn={handleSpawn} />

      <main className="flex-1 flex flex-col p-6 gap-6 h-screen">
        <header className="flex justify-between items-center border-b border-gray-800 pb-4">
          <h1 className="text-xl font-bold text-blue-400">🛡️ Aegis Command Center</h1>
          <div className="text-sm text-gray-500">ARI.Software Module // Local OpenClaw Orchestrator</div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
          {/* Active Agents Grid */}
          <div className="lg:col-span-2 overflow-y-auto pr-2 custom-scrollbar">
             <h2 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-widest">Active Swarm</h2>
             <FleetGrid agents={agents} />
          </div>

          {/* Terminal / Logs */}
          <div className="lg:col-span-1 h-full">
            <TerminalPanel logs={logs} onCommand={handleCommand} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;