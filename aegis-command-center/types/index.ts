export interface AegisAgent {
  id: string
  user_id: string
  agent_name: string
  agent_type: string
  model: string
  status: 'IDLE' | 'WORKING' | 'ERROR' | 'OFFLINE'
  tokens_burned: number
  health: number
  theme: string
  created_at: string
  updated_at?: string
}

export interface AegisLog {
  id: string
  user_id: string
  agent_id: string | null
  message: string
  created_at: string
}

export interface AegisSettings {
  openclawEndpoint: string
  refreshInterval: '10' | '30' | '60'
  alertThreshold: number
  showInDashboard: boolean
  enableNotifications: boolean
  defaultTheme: 'cyberpunk' | 'neon-green' | 'hacker-red' | 'deep-blue'
}

export interface CreateAgentRequest {
  agent_name: string
  agent_type: string
  model: string
  theme?: string
}

export interface UpdateAgentRequest {
  id: string
  status?: AegisAgent['status']
  tokens_burned?: number
  health?: number
  theme?: string
}

export interface GetAgentsResponse {
  agents: AegisAgent[]
  count: number
}

export interface ApiErrorResponse {
  error: string
  details?: unknown
}
