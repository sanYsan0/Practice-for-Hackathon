import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth-helpers'
import {
  validateRequestBody,
  validateQueryParams,
  createErrorResponse,
  toSnakeCase,
} from '@/lib/api-helpers'
import { z } from 'zod'
import { aegisAgents } from '@/lib/db/schema'
import { and, eq, desc } from 'drizzle-orm'

const AgentTypeEnum = z.enum(['Orchestrator', 'Coder', 'Analyst', 'Researcher', 'Writer', 'Scraper'])
const ModelEnum = z.enum(['claude-3-5-sonnet', 'claude-3-opus', 'gemini-3.1-pro', 'llama-3-8b', 'gpt-4o'])
const ThemeEnum = z.enum(['cyberpunk', 'neon-green', 'hacker-red', 'deep-blue'])
const StatusEnum = z.enum(['IDLE', 'WORKING', 'ERROR', 'OFFLINE'])

const CreateAgentSchema = z.object({
  agent_name: z.string().min(1).max(100),
  agent_type: AgentTypeEnum,
  model: ModelEnum,
  theme: ThemeEnum.optional().default('cyberpunk'),
})

const UpdateAgentSchema = z.object({
  id: z.string().uuid(),
  status: StatusEnum.optional(),
  tokens_burned: z.number().int().min(0).optional(),
  health: z.number().int().min(0).max(100).optional(),
  theme: ThemeEnum.optional(),
})

const ListQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).optional(),
  offset: z.coerce.number().int().min(0).optional(),
})

const DeleteQuerySchema = z.object({
  id: z.string().uuid(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const queryValidation = validateQueryParams(searchParams, ListQuerySchema)
    if (!queryValidation.success) return queryValidation.response

    const limit = queryValidation.data.limit ?? 50
    const offset = queryValidation.data.offset ?? 0

    const { user, withRLS } = await getAuthenticatedUser()
    if (!user || !withRLS) return createErrorResponse('Unauthorized', 401)

    const agents = await withRLS((db) =>
      db.select()
        .from(aegisAgents)
        .where(eq(aegisAgents.userId, user.id))
        .orderBy(desc(aegisAgents.createdAt))
        .limit(limit)
        .offset(offset)
    )

    return NextResponse.json({ agents: toSnakeCase(agents), count: agents.length })
  } catch (error) {
    console.error('GET /api/modules/aegis-command-center/data error:', error instanceof Error ? error.message : error)
    return createErrorResponse('Internal server error', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const validation = await validateRequestBody(request, CreateAgentSchema)
    if (!validation.success) return validation.response

    const { user, withRLS } = await getAuthenticatedUser()
    if (!user || !withRLS) return createErrorResponse('Unauthorized', 401)

    const data = await withRLS((db) =>
      db.insert(aegisAgents)
        .values({
          userId: user.id,
          agentName: validation.data.agent_name,
          agentType: validation.data.agent_type,
          model: validation.data.model,
          theme: validation.data.theme,
        })
        .returning()
    )

    return NextResponse.json({ agent: toSnakeCase(data[0]) }, { status: 201 })
  } catch (error) {
    console.error('POST /api/modules/aegis-command-center/data error:', error instanceof Error ? error.message : error)
    return createErrorResponse('Internal server error', 500)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const validation = await validateRequestBody(request, UpdateAgentSchema)
    if (!validation.success) return validation.response

    const { user, withRLS } = await getAuthenticatedUser()
    if (!user || !withRLS) return createErrorResponse('Unauthorized', 401)

    const { id, ...fields } = validation.data
    const updates: Record<string, unknown> = { updatedAt: new Date().toISOString() }
    if (fields.status !== undefined) updates.status = fields.status
    if (fields.tokens_burned !== undefined) updates.tokensBurned = fields.tokens_burned
    if (fields.health !== undefined) updates.health = fields.health
    if (fields.theme !== undefined) updates.theme = fields.theme

    const data = await withRLS((db) =>
      db.update(aegisAgents)
        .set(updates)
        .where(and(eq(aegisAgents.id, id), eq(aegisAgents.userId, user.id)))
        .returning()
    )

    if (data.length === 0) return createErrorResponse('Agent not found', 404)

    return NextResponse.json({ agent: toSnakeCase(data[0]) })
  } catch (error) {
    console.error('PUT /api/modules/aegis-command-center/data error:', error instanceof Error ? error.message : error)
    return createErrorResponse('Internal server error', 500)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const queryValidation = validateQueryParams(searchParams, DeleteQuerySchema)
    if (!queryValidation.success) return queryValidation.response

    const { user, withRLS } = await getAuthenticatedUser()
    if (!user || !withRLS) return createErrorResponse('Unauthorized', 401)

    await withRLS((db) =>
      db.delete(aegisAgents)
        .where(and(eq(aegisAgents.id, queryValidation.data.id), eq(aegisAgents.userId, user.id)))
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/modules/aegis-command-center/data error:', error instanceof Error ? error.message : error)
    return createErrorResponse('Internal server error', 500)
  }
}
