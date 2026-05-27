import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { AegisAgent, AegisSettings, CreateAgentRequest, UpdateAgentRequest } from '../types'
import type { StorageFile } from '@/lib/storage'

const AGENTS_KEY = ['aegis-agents']
const SETTINGS_KEY = ['aegis-settings']

export function useAegisAgents() {
  return useQuery({
    queryKey: AGENTS_KEY,
    queryFn: async (): Promise<AegisAgent[]> => {
      const res = await fetch('/api/modules/aegis-command-center/data')
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to fetch agents')
      }
      const data = await res.json()
      return data.agents || []
    },
    refetchInterval: 30_000,
  })
}

export function useCreateAegisAgent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateAgentRequest): Promise<AegisAgent> => {
      const res = await fetch('/api/modules/aegis-command-center/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to create agent')
      }
      const data = await res.json()
      return data.agent
    },
    onMutate: async (newAgent) => {
      await queryClient.cancelQueries({ queryKey: AGENTS_KEY })
      const previous = queryClient.getQueryData<AegisAgent[]>(AGENTS_KEY)
      queryClient.setQueryData<AegisAgent[]>(AGENTS_KEY, (old = []) => [
        {
          id: 'temp-' + Date.now(),
          user_id: '',
          agent_name: newAgent.agent_name,
          agent_type: newAgent.agent_type,
          model: newAgent.model,
          status: 'IDLE',
          tokens_burned: 0,
          health: 100,
          theme: newAgent.theme ?? 'cyberpunk',
          created_at: new Date().toISOString(),
        } as AegisAgent,
        ...old,
      ])
      return { previous }
    },
    onError: (_err, _payload, context) => {
      if (context?.previous) queryClient.setQueryData(AGENTS_KEY, context.previous)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: AGENTS_KEY })
    },
  })
}

export function useUpdateAegisAgent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: UpdateAgentRequest): Promise<AegisAgent> => {
      const res = await fetch('/api/modules/aegis-command-center/data', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to update agent')
      }
      const data = await res.json()
      return data.agent
    },
    onMutate: async (updated) => {
      await queryClient.cancelQueries({ queryKey: AGENTS_KEY })
      const previous = queryClient.getQueryData<AegisAgent[]>(AGENTS_KEY)
      queryClient.setQueryData<AegisAgent[]>(AGENTS_KEY, (old = []) =>
        old.map(a => a.id === updated.id ? { ...a, ...updated } : a)
      )
      return { previous }
    },
    onError: (_err, _payload, context) => {
      if (context?.previous) queryClient.setQueryData(AGENTS_KEY, context.previous)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: AGENTS_KEY })
    },
  })
}

export function useDeleteAegisAgent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const res = await fetch(`/api/modules/aegis-command-center/data?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to delete agent')
      }
    },
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: AGENTS_KEY })
      const previous = queryClient.getQueryData<AegisAgent[]>(AGENTS_KEY)
      queryClient.setQueryData<AegisAgent[]>(AGENTS_KEY, (old = []) =>
        old.filter(a => a.id !== deletedId)
      )
      return { previous }
    },
    onError: (_err, _id, context) => {
      if (context?.previous) queryClient.setQueryData(AGENTS_KEY, context.previous)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: AGENTS_KEY })
    },
  })
}

export function useAegisSettings() {
  return useQuery({
    queryKey: SETTINGS_KEY,
    queryFn: async (): Promise<Partial<AegisSettings>> => {
      const res = await fetch('/api/modules/aegis-command-center/settings')
      if (!res.ok) return {}
      return res.json()
    },
  })
}

export function useUpdateAegisSettings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (settings: Partial<AegisSettings>): Promise<void> => {
      const res = await fetch('/api/modules/aegis-command-center/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to save settings')
      }
    },
    onMutate: async (newSettings) => {
      await queryClient.cancelQueries({ queryKey: SETTINGS_KEY })
      const previous = queryClient.getQueryData<Partial<AegisSettings>>(SETTINGS_KEY)
      queryClient.setQueryData<Partial<AegisSettings>>(SETTINGS_KEY, (old = {}) => ({ ...old, ...newSettings }))
      return { previous }
    },
    onError: (_err, _s, context) => {
      if (context?.previous) queryClient.setQueryData(SETTINGS_KEY, context.previous)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: SETTINGS_KEY })
    },
  })
}

// ─── File Storage hooks ────────────────────────────────────────────────

const STORAGE_FILES_KEY = (bucket: string) => ['storage-files', bucket]

export function useUploadFile(bucket: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (file: File): Promise<{ path: string; name: string }> => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('bucket', bucket)
      const res = await fetch('/api/storage/upload', { method: 'POST', body: formData })
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Upload failed') }
      return res.json()
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: STORAGE_FILES_KEY(bucket) }),
  })
}

export function useListFiles(bucket: string) {
  return useQuery({
    queryKey: STORAGE_FILES_KEY(bucket),
    queryFn: async (): Promise<StorageFile[]> => {
      const res = await fetch(`/api/storage/list?bucket=${encodeURIComponent(bucket)}`)
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Failed to list files') }
      const data = await res.json()
      return data.files || []
    },
  })
}

export function useDeleteFile(bucket: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (filename: string): Promise<void> => {
      const res = await fetch('/api/storage/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bucket, filename }),
      })
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Failed to delete file') }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: STORAGE_FILES_KEY(bucket) }),
  })
}
