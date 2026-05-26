export const AgentService = {
  getAgents: () => [
    { id: 'aegis-core', type: 'Orchestrator', status: 'IDLE', uptime: '4h 12m', tokens: 12400, model: 'gemini-3.1-pro' },
    { id: 'dev-alpha', type: 'Coder', status: 'WORKING', uptime: '1h 05m', tokens: 45000, model: 'claude-3-5-sonnet' }
  ],
  
  spawn: (type) => ({
    id: `${type.toLowerCase()}-${Math.random().toString(36).substr(2, 4)}`,
    type: type,
    status: 'BOOTING',
    uptime: '0m',
    tokens: 0,
    model: type === 'Coder' ? 'claude-3-5-sonnet' : 'llama-3-8b'
  }),

  generateMockLog: () => {
    const logs = [
      "[dev-alpha] Analyzing src/components/Sidebar.jsx...",
      "[dev-alpha] Wrote 1420 bytes to file.",
      "[dev-alpha] Tokens: 120 in / 45 out",
      "[aegis-core] Heartbeat OK. Memory compaction successful.",
      "[SYSTEM] Detected local file change in workspace.",
      "[research-bot] Scraping ARI.Software documentation..."
    ];
    return logs[Math.floor(Math.random() * logs.length)];
  }
};