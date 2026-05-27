'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Save, CheckCircle2 } from 'lucide-react'
import { useAegisSettings, useUpdateAegisSettings } from '../hooks/use-aegis'
import type { AegisSettings } from '../types'

const DEFAULT_SETTINGS: AegisSettings = {
  openclawEndpoint: 'http://localhost:3001',
  refreshInterval: '30',
  alertThreshold: 20,
  showInDashboard: true,
  enableNotifications: true,
  defaultTheme: 'cyberpunk',
}

export function AegisCommandCenterSettingsPanel() {
  const { toast } = useToast()
  const { data: savedSettings, isLoading } = useAegisSettings()
  const updateSettings = useUpdateAegisSettings()

  const [settings, setSettings] = useState<AegisSettings>(DEFAULT_SETTINGS)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (savedSettings) setSettings({ ...DEFAULT_SETTINGS, ...savedSettings })
  }, [savedSettings])

  const handleSave = () => {
    setSaved(false)
    updateSettings.mutate(settings, {
      onSuccess: () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      },
      onError: () => {
        toast({ variant: 'destructive', title: 'Failed to save settings', description: 'Please try again.' })
      },
    })
  }

  const update = <K extends keyof AegisSettings>(key: K, value: AegisSettings[K]) =>
    setSettings(prev => ({ ...prev, [key]: value }))

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm text-muted-foreground">Loading settings...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Aegis Command Center</h3>
        <p className="text-sm text-muted-foreground">Configure your local AI agent fleet preferences</p>
      </div>

      <div className="space-y-6">
        {/* Connection */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">Connection</h4>
          <div className="space-y-2">
            <Label htmlFor="openclawEndpoint">OpenClaw Endpoint</Label>
            <Input
              id="openclawEndpoint"
              value={settings.openclawEndpoint}
              onChange={(e) => update('openclawEndpoint', e.target.value)}
              placeholder="http://localhost:3001"
            />
            <p className="text-xs text-muted-foreground">URL of your local OpenClaw framework</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="refreshInterval">Fleet Refresh Interval</Label>
            <Select
              value={settings.refreshInterval}
              onValueChange={(v: '10' | '30' | '60') => update('refreshInterval', v)}
            >
              <SelectTrigger id="refreshInterval">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 seconds</SelectItem>
                <SelectItem value="30">30 seconds</SelectItem>
                <SelectItem value="60">1 minute</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Alerts */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">Alerts</h4>
          <div className="space-y-2">
            <Label htmlFor="alertThreshold">Health Alert Threshold (%)</Label>
            <Input
              id="alertThreshold"
              type="number"
              min={0}
              max={100}
              value={settings.alertThreshold}
              onChange={(e) => update('alertThreshold', Number(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">Alert when an agent health drops below this value</p>
          </div>
        </div>

        {/* Display */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">Display</h4>
          <div className="space-y-2">
            <Label htmlFor="defaultTheme">Default Agent Theme</Label>
            <Select
              value={settings.defaultTheme}
              onValueChange={(v: AegisSettings['defaultTheme']) => update('defaultTheme', v)}
            >
              <SelectTrigger id="defaultTheme">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                <SelectItem value="neon-green">Neon Green</SelectItem>
                <SelectItem value="hacker-red">Hacker Red</SelectItem>
                <SelectItem value="deep-blue">Deep Blue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {[
            { key: 'showInDashboard' as const, label: 'Show fleet widget on dashboard', desc: 'Display Aegis widget on main dashboard' },
            { key: 'enableNotifications' as const, label: 'Enable notifications', desc: 'Alert when agents change status or health drops' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{label}</Label>
                <div className="text-sm text-muted-foreground">{desc}</div>
              </div>
              <Switch
                checked={settings[key] as boolean}
                onCheckedChange={(checked) => update(key, checked)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t">
        <Button onClick={handleSave} disabled={updateSettings.isPending}>
          {updateSettings.isPending ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</>
          ) : saved ? (
            <><CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />Saved!</>
          ) : (
            <><Save className="w-4 h-4 mr-2" />Save Settings</>
          )}
        </Button>
        {saved && <span className="text-sm text-green-600">Settings saved successfully</span>}
      </div>
    </div>
  )
}
