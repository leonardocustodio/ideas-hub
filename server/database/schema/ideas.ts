import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import {authors} from "~~/server/database/schema/authors";

export const ideas = sqliteTable('ideas', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  // Main
  name: text('name').notNull(),
  tagline: text('tagline').notNull(),
  description: text('description'),
  links: text('links', { mode: 'json' }),
  icon: text('icon'),
  video: text('video'),
  images: text('images', { mode: 'json' }),
  // Relationship
  authorId: integer('author_id').references(() => authors.id).notNull(),
  // Metadata
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow().notNull(),
})
