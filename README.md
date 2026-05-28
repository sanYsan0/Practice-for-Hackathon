<img width="1280" height="576" alt="Aegis ARI Dashboard" src="https://github.com/user-attachments/assets/596a0815-5475-4722-ac2a-660d31d81e78" />
# Aegis Command Center

**A custom ARI.Software module for spawning, monitoring, and orchestrating autonomous AI agents — built for the ARI.HACK Hackathon (Toronto Tech Week 2026).**

---

## What It Is

Aegis Command Center turns your ARI workspace into a live AI fleet control room. You spawn named agents with distinct roles (Coder, Analyst, Researcher, Writer, Scraper, Orchestrator), assign them tasks in natural language, and watch them execute in real time — calling ARI's own APIs, reading your data, writing results back, and streaming every step to the dashboard.

No vendor lock-in. No external cloud. Everything runs inside your local ARI installation against your own PostgreSQL database.

---

## Features

- **Agent fleet management** — Create, edit, and delete agents with custom names, roles, and Claude model assignment
- **Real task execution** — Agents run a live Claude agentic loop (up to 15 turns) with access to ARI's API via forwarded session cookies
- **Live SSE streaming** — Every tool call, text chunk, and completion event streams to the UI in real time
- **Persistent storage** — Agents, logs, and task history stored in three Postgres tables (`aegis_agents`, `aegis_logs`, `aegis_tasks`)
- **Fleet telemetry** — Token burn totals, per-agent health scores, CPU simulation, average fleet health
- **Integrated terminal** — Bottom terminal bar streams Claude responses for ad-hoc commands routed through the active agent
- **Cyberpunk UI** — Glassmorphism cards, animated glow borders (Framer Motion), pulsing status dots, scanline terminal overlay, deep navy + cyan grid background

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| AI | Anthropic SDK (`@anthropic-ai/sdk`), Claude Opus 4.7 / Sonnet 4.6 |
| Database | PostgreSQL + Drizzle ORM with Row-Level Security |
| Auth | Better Auth (HTTP-only cookies, forwarded to agent tool calls) |
| State | TanStack Query with optimistic updates |
| UI | Tailwind CSS, Framer Motion, Lucide Icons |
| Streaming | Server-Sent Events (SSE) via ReadableStream |

---

## Module Structure

```
aegis-command-center/
├── api/
│   ├── command/route.ts     # Ad-hoc Claude streaming (terminal bar)
│   ├── data/route.ts        # Agent CRUD (GET / POST / PUT / DELETE)
│   ├── logs/route.ts        # Persistent log GET / POST
│   ├── run/route.ts         # Core agent execution + SSE stream
│   ├── settings/route.ts    # Module settings
│   └── tasks/route.ts       # Task history GET
├── components/
│   └── AegisDashboard.tsx   # Main dashboard (~700 lines)
├── database/
│   ├── schema.sql           # Postgres DDL (auto-run by ARI on install)
│   └── schema.ts            # Drizzle table definitions
├── hooks/
│   └── use-aegis.ts         # TanStack Query hooks for all endpoints
├── types/
│   └── index.ts             # Shared TypeScript interfaces
└── module.json              # ARI module manifest
```

---

## How Agent Execution Works

1. User clicks **Run** on an agent card and types a task (e.g. `"List all my contacts"`)
2. Frontend POSTs to `/api/modules/aegis-command-center/run` with `{ agent_id, task }`
3. Server creates an `aegis_tasks` record, marks the agent `WORKING`, and starts a Claude agentic loop
4. Claude has three tools:
   - `ari_api_request` — makes authenticated GET/POST/PUT/DELETE calls to ARI's own API (contacts, brainstorm boards, documents, etc.) using the user's forwarded session cookie
   - `write_log` — persists log entries to `aegis_logs`
   - `complete_task` — signals task completion with a result summary
5. Each event (`start`, `text`, `tool_call`, `tool_result`, `log`, `complete`, `error`, `metrics`) streams as SSE to the frontend
6. The agent card expands automatically and renders the live trace line-by-line
7. On completion: agent status resets to `IDLE`, token count updates, health adjusts

---

## Installation

Requires a running [ARI.Software](https://ari.software) instance.

1. Copy the `aegis-command-center` folder into `ARI/modules-custom/`
2. Add your Anthropic API key to `ARI/.env.local`:
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```
3. Restart ARI:
   ```bash
   ./ari start
   ```

ARI auto-detects `module.json`, runs the schema migration, registers the API routes, and injects Aegis into the sidebar. No manual config needed.

---

## Database Tables

```sql
aegis_agents   -- id, user_id, agent_name, agent_type, model, status,
               -- tokens_burned, health, cpu_usage, theme, created_at

aegis_logs     -- id, user_id, agent_id, message, level, created_at

aegis_tasks    -- id, user_id, agent_id, task, result, status,
               -- tokens_used, turns_used, started_at, completed_at, created_at
```

All tables use RLS — each user can only access their own agent data.

---

## Built for ARI.HACK — Toronto Tech Week 2026

The goal: extend ARI from a passive productivity tool into an active, agentic workspace where AI agents autonomously operate on your real data — without leaving the ARI environment or sending anything to third-party servers.
