import React, { useState } from 'react';

const TerminalPanel = ({ logs, onCommand }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      onCommand(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#111116] border border-gray-800 rounded-lg overflow-hidden">
      <div className="bg-[#181820] px-4 py-2 border-b border-gray-800 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
        </div>
        <span className="text-xs text-gray-500 ml-2 font-mono">openclaw-term</span>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto font-mono text-[13px] leading-relaxed custom-scrollbar flex flex-col justify-end">
        <div className="space-y-1">
          {logs.map((log, i) => (
            <div key={i} className={`${log.startsWith('[USER]') ? 'text-blue-400' : log.startsWith('[SYSTEM]') ? 'text-yellow-400' : 'text-gray-400'}`}>
              {log}
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 border-t border-gray-800 bg-[#0d0d12] flex items-center gap-3">
        <span className="text-green-400">➜</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Deploy command or chat with Aegis..."
          className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-600 text-[13px]"
          autoComplete="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default TerminalPanel;