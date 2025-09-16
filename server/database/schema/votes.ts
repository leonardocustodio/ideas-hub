import { sqliteTable, integer, text, uniqueIndex } from 'drizzle-orm/sqlite-core'
import { ideas } from "./ideas";

export const votes = sqliteTable('votes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  fingerprint: text('fingerprint').notNull(),
  // Relationship
  ideaId: integer('idea_id').references(() => ideas.id).notNull(),
  // Metadata
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow().notNull(),
}, (table) => ({
  // Ensure one vote per fingerprint per idea
  uniqueFingerprintIdea: uniqueIndex('unique_fingerprint_idea').on(table.fingerprint, table.ideaId)
}))
