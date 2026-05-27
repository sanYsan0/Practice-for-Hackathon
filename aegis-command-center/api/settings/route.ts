import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth-helpers'
import { validateRequestBody, createErrorResponse } from '@/lib/api-helpers'
import { safeText } from '@/lib/validation'
import { z } from 'zod'
import { moduleSettings } from '@/lib/db/schema'
import { eq, sql } from 'drizzle-orm'

const MODULE_ID = 'aegis-command-center'

const SettingsSchema = z.object({
  openclawEndpoint: safeText(500).optional(),
  refreshInterval: z.enum(['10', '30', '60']).optional(),
  alertThreshold: z.number().int().min(0).max(100).optional(),
  showInDashboard: z.boolean().optional(),
  enableNotifications: z.boolean().optional(),
  defaultTheme: z.enum(['cyberpunk', 'neon-green', 'hacker-red', 'deep-blue']).optional(),
}).strict()

export async function GET(request: NextRequest) {
  try {
    const { user, withRLS } = await getAuthenticatedUser()
    if (!user || !withRLS) return createErrorResponse('Unauthorized', 401)

    const data = await withRLS((db) =>
      db.select({ settings: moduleSettings.settings })
        .from(moduleSettings)
        .where(eq(moduleSettings.moduleId, MODULE_ID))
        .limit(1)
    )

    return NextResponse.json(data[0]?.settings ?? {})
  } catch (error) {
    console.error('GET /api/modules/aegis-command-center/settings error:', error instanceof Error ? error.message : error)
    return createErrorResponse('Internal server error', 500)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const validation = await validateRequestBody(request, SettingsSchema)
    if (!validation.success) return validation.response

    const { user, withRLS } = await getAuthenticatedUser()
    if (!user || !withRLS) return createErrorResponse('Unauthorized', 401)

    const patch = JSON.stringify(validation.data)
    await withRLS((db) =>
      db.insert(moduleSettings)
        .values({ userId: user.id, moduleId: MODULE_ID, settings: validation.data })
        .onConflictDoUpdate({
          target: [moduleSettings.userId, moduleSettings.moduleId],
          set: {
            settings: sql`COALESCE(${moduleSettings.settings}, '{}'::jsonb) || ${patch}::jsonb`,
            updatedAt: sql`timezone('utc'::text, now())`,
          },
        })
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('PUT /api/modules/aegis-command-center/settings error:', error instanceof Error ? error.message : error)
    return createErrorResponse('Internal server error', 500)
  }
}
