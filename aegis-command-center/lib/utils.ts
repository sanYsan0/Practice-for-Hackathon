import type { AegisAgent } from '../types'

export function formatTimestamp(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString()
}

export function getFleetStats(agents: AegisAgent[]) {
  return {
    total: agents.length,
    working: agents.filter(a => a.status === 'WORKING').length,
    idle: agents.filter(a => a.status === 'IDLE').length,
    error: agents.filter(a => a.status === 'ERROR').length,
    totalTokens: agents.reduce((sum, a) => sum + (a.tokens_burned ?? 0), 0),
    avgHealth: agents.length
      ? Math.round(agents.reduce((sum, a) => sum + a.health, 0) / agents.length)
      : 100,
  }
}

export function getHealthColor(health: number): string {
  if (health >= 80) return 'text-emerald-400'
  if (health >= 50) return 'text-amber-400'
  return 'text-red-400'
}

export function getStatusBadgeClass(status: AegisAgent['status']): string {
  switch (status) {
    case 'WORKING': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
    case 'ERROR': return 'bg-red-500/10 text-red-400 border border-red-500/20'
    case 'OFFLINE': return 'bg-zinc-700/30 text-zinc-500 border border-zinc-700'
    default: return 'bg-zinc-800 text-zinc-400 border border-zinc-700'
  }
}

export const DEBUG = process.env.NODE_ENV === 'development'

export function log(...args: unknown[]) {
  if (DEBUG) console.log('[aegis-command-center]', ...args)
}
