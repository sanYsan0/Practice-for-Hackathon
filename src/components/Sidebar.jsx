import React from 'react';

const Sidebar = ({ health, onSpawn }) => {
  return (
    <aside className="w-64 bg-[#0d0d12] border-r border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">System Health</h2>
        
        <div className="space-y-4">
          <HealthBar label="CPU Usage" value={health.cpu} color="bg-blue-500" />
          <HealthBar label="Memory" value={health.memory} color="bg-purple-500" />
          
          <div className="pt-2">
             <div className="text-xs text-gray-500 mb-1">Global Token Burn</div>
             <div className="text-lg font-bold text-red-400">{health.tokenBurn.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="p-6 flex-1">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Spawn Swarm</h2>
        
        <div className="flex flex-col gap-3">
          <SpawnButton icon="👨‍💻" label="Coder Agent" onClick={() => onSpawn('Coder')} />
          <SpawnButton icon="🔬" label="Researcher" onClick={() => onSpawn('Researcher')} />
          <SpawnButton icon="📈" label="Analyst" onClick={() => onSpawn('Analyst')} />
        </div>
      </div>
    </aside>
  );
};

const HealthBar = ({ label, value, color }) => (
  <div>
    <div className="flex justify-between text-xs mb-1.5">
      <span className="text-gray-400">{label}</span>
      <span className="text-gray-200">{value}%</span>
    </div>
    <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

const SpawnButton = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-3 p-3 rounded bg-[#111116] border border-gray-800 hover:border-gray-600 hover:bg-[#181820] transition-all text-left w-full"
  >
    <span className="text-lg">{icon}</span>
    <span className="text-sm font-semibold text-gray-300">{label}</span>
  </button>
);

export default Sidebar;