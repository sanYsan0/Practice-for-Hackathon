import React from 'react';

const FleetGrid = ({ agents }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {agents.map(agent => (
        <div key={agent.id} className="bg-[#111116] border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-sm font-bold text-gray-200">{agent.id}</div>
              <div className="text-xs text-gray-500">{agent.type} Module</div>
            </div>
            <div className={`px-2 py-1 text-[10px] font-bold rounded ${agent.status === 'WORKING' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : agent.status === 'BOOTING' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 'bg-gray-800 text-gray-400'}`}>
              {agent.status}
            </div>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Model</span>
              <span className="text-gray-300">{agent.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Uptime</span>
              <span className="text-gray-300">{agent.uptime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tokens Burned</span>
              <span className="text-blue-400">{agent.tokens.toLocaleString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FleetGrid;