import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const authors = sqliteTable('authors', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  // Main
  name: text('name').notNull().unique(),
  // Metadata
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow().notNull(),
})
