import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import {ideas} from "~~/server/database/schema/ideas";

export const images = sqliteTable('images', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  // Main
  file: text('file').notNull(),
  // Relationship
  ideaId: integer('idea_id').references(() => ideas.id).notNull(),
  // Metadata
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow().notNull(),
})
