import { sqliteTable, integer } from 'drizzle-orm/sqlite-core'
import {authors} from "~~/server/database/schema/authors";
import {ideas} from "~~/server/database/schema/ideas";

export const votes = sqliteTable('votes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  // Relationship
  authorId: integer('author_id').references(() => authors.id).notNull(),
  ideaId: integer('idea_id').references(() => ideas.id).notNull(),
  // Metadata
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow().notNull(),
})
