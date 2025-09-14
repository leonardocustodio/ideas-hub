import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { authors } from "./authors";

export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  // Main
  comment: text('text').notNull(),
  // Relationship
  authorId: integer('author_id').references(() => authors.id).notNull(),
  // Metadata
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow().notNull(),
})
