-- Aegis Command Center - Database Initialization & Seed Script
-- Idempotent: safe to run on every module enable.

CREATE TABLE IF NOT EXISTS aegis_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  agent_name VARCHAR(100) NOT NULL,
  agent_type VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'IDLE',
  tokens_burned BIGINT NOT NULL DEFAULT 0,
  health INTEGER NOT NULL DEFAULT 100,
  theme VARCHAR(50) NOT NULL DEFAULT 'cyberpunk', -- Added theme option
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS aegis_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  agent_id UUID REFERENCES aegis_agents(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_aegis_agents_user_id ON aegis_agents(user_id);
CREATE INDEX IF NOT EXISTS idx_aegis_logs_agent_id ON aegis_logs(agent_id);

-- Enable Row Level Security (ARI Standard)
ALTER TABLE aegis_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE aegis_logs ENABLE ROW LEVEL SECURITY;

-- Seed Data (For Demo Purposes)
-- We insert an initial 'Orchestrator' agent for the current user session
INSERT INTO aegis_agents (user_id, agent_name, agent_type, model, status, tokens_burned, theme)
VALUES 
  ('demo-user', 'Aegis-Core', 'Orchestrator', 'gemini-3.1-pro', 'WORKING', 45200, 'neon-green'),
  ('demo-user', 'Dev-Alpha', 'Coder', 'claude-3-5-sonnet', 'IDLE', 125000, 'hacker-red'),
  ('demo-user', 'Research-01', 'Analyst', 'llama-3-8b', 'WORKING', 8500, 'deep-blue')
ON CONFLICT DO NOTHING;
