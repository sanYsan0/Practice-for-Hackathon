'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShieldCheck, Loader2, AlertCircle, Cpu, Activity } from 'lucide-react'
import { useAegisAgents } from '../hooks/use-aegis'

export function AegisCommandCenterWidget() {
  const { data: agents = [], isLoading, isError, refetch } = useAegisAgents()

  const activeCount = agents.filter(a => a.status === 'WORKING').length
  const totalTokens = agents.reduce((sum, a) => sum + (a.tokens_burned ?? 0), 0)
  const avgHealth = agents.length
    ? Math.round(agents.reduce((sum, a) => sum + a.health, 0) / agents.length)
    : 100

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Aegis Command</CardTitle>
          <ShieldCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isError) {
    return (
      <Card className="border-red-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Aegis Command</CardTitle>
          <AlertCircle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-xs text-red-600">Fleet offline</div>
          <Button variant="ghost" size="sm" onClick={() => refetch()} className="w-full mt-2 text-xs">
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-md transition-shadow bg-zinc-950 border-zinc-800 text-zinc-100">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-zinc-100">Aegis Command</CardTitle>
        <ShieldCheck className="h-4 w-4 text-blue-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-zinc-100">{agents.length}</div>
        <p className="text-xs text-zinc-500 mb-3">
          agents registered · {activeCount} working
        </p>

        <div className="space-y-2 pt-3 border-t border-zinc-800">
          <div className="flex justify-between text-xs">
            <span className="flex items-center gap-1 text-zinc-400">
              <Cpu className="w-3 h-3" /> Tokens burned
            </span>
            <span className="text-amber-400 font-mono">{totalTokens.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="flex items-center gap-1 text-zinc-400">
              <Activity className="w-3 h-3" /> Fleet health
            </span>
            <span className={avgHealth >= 80 ? 'text-emerald-400' : avgHealth >= 50 ? 'text-amber-400' : 'text-red-400'}>
              {avgHealth}%
            </span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-3 text-xs text-zinc-400 hover:text-zinc-100"
          onClick={() => window.location.href = '/aegis'}
        >
          <ShieldCheck className="w-3 h-3 mr-1" />
          Open Command Center
        </Button>
      </CardContent>
    </Card>
  )
}
