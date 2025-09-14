import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import {ideas} from "~~/server/database/schema/ideas";

export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  // Main
  tag: text('tag').notNull(),
  // Relationship
  ideaId: integer('idea_id').references(() => ideas.id).notNull(),
  // Metadata
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow().notNull(),
})
