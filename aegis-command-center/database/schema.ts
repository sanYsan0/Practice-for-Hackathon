import { pgTable, index, pgPolicy, uuid, text, timestamp, varchar, integer, bigint } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const aegisAgents = pgTable("aegis_agents", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  userId: text("user_id").notNull(),
  agentName: varchar("agent_name", { length: 100 }).notNull(),
  agentType: varchar("agent_type", { length: 50 }).notNull(),
  model: varchar({ length: 50 }).notNull(),
  status: varchar({ length: 20 }).notNull().default("IDLE"),
  tokensBurned: bigint("tokens_burned", { mode: "number" }).notNull().default(0),
  health: integer().notNull().default(100),
  theme: varchar({ length: 50 }).notNull().default("cyberpunk"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
}, (table) => [
  index("idx_aegis_agents_user_id").using("btree", table.userId.asc().nullsLast().op("text_ops")),
  index("idx_aegis_agents_user_created").using("btree", table.userId.asc().nullsLast().op("text_ops"), table.createdAt.desc().nullsFirst().op("timestamptz_ops")),
  pgPolicy("aegis_agents_rls_select", { as: "permissive", for: "select", to: ["public"], using: sql`(user_id = (select current_setting('app.current_user_id')))` }),
  pgPolicy("aegis_agents_rls_insert", { as: "permissive", for: "insert", to: ["public"], withCheck: sql`(user_id = (select current_setting('app.current_user_id')))` }),
  pgPolicy("aegis_agents_rls_update", { as: "permissive", for: "update", to: ["public"], using: sql`(user_id = (select current_setting('app.current_user_id')))` }),
  pgPolicy("aegis_agents_rls_delete", { as: "permissive", for: "delete", to: ["public"], using: sql`(user_id = (select current_setting('app.current_user_id')))` }),
])

export const aegisLogs = pgTable("aegis_logs", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  userId: text("user_id").notNull(),
  agentId: uuid("agent_id").references(() => aegisAgents.id, { onDelete: "cascade" }),
  message: text().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
}, (table) => [
  index("idx_aegis_logs_user_id").using("btree", table.userId.asc().nullsLast().op("text_ops")),
  index("idx_aegis_logs_agent_id").using("btree", table.agentId.asc().nullsLast()),
  index("idx_aegis_logs_created_at").using("btree", table.createdAt.desc().nullsFirst().op("timestamptz_ops")),
  pgPolicy("aegis_logs_rls_select", { as: "permissive", for: "select", to: ["public"], using: sql`(user_id = (select current_setting('app.current_user_id')))` }),
  pgPolicy("aegis_logs_rls_insert", { as: "permissive", for: "insert", to: ["public"], withCheck: sql`(user_id = (select current_setting('app.current_user_id')))` }),
  pgPolicy("aegis_logs_rls_delete", { as: "permissive", for: "delete", to: ["public"], using: sql`(user_id = (select current_setting('app.current_user_id')))` }),
])
