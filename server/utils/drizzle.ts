import { drizzle } from 'drizzle-orm/d1'
import { ideas } from '../database/schema/ideas'
import { authors } from '../database/schema/authors'
import { tags } from '../database/schema/tags'
import { images } from '../database/schema/images'
import { comments } from '../database/schema/comments'
import { votes } from '../database/schema/votes'

export { sql, eq, and, or } from 'drizzle-orm'

export const tables = {
  ideas,
  authors,
  tags,
  images,
  comments,
  votes
}

const schema = {
  ideas,
  authors,
  tags,
  images,
  comments,
  votes
}

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema })
}

export type Ideas = typeof ideas.$inferSelect
export type Authors = typeof authors.$inferSelect
export type Tags = typeof tags.$inferSelect
export type Images = typeof images.$inferSelect
export type Comments = typeof comments.$inferSelect
export type Votes = typeof votes.$inferSelect
