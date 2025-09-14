import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { authors } from "./authors";
import { ideas } from "./ideas";

export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  // Main
  comment: text('text').notNull(),
  // Relationship
  ideaId: integer('idea_id').references(() => ideas.id).notNull(),
  authorId: integer('author_id').references(() => authors.id).notNull(),
  // Metadata
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow().notNull(),
})
