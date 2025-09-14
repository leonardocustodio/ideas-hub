import { eq } from 'drizzle-orm';

export default eventHandler(async (event) => {
  const ideaId = getRouterParam(event, 'id')

  if (!ideaId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Idea ID is required'
    })
  }

  const db = useDrizzle()

  // Get comments with author names
  const comments = await db
    .select({
      id: tables.comments.id,
      comment: tables.comments.comment,
      createdAt: tables.comments.createdAt,
      author: tables.authors.name,
    })
    .from(tables.comments)
    .leftJoin(tables.authors, eq(tables.comments.authorId, tables.authors.id))
    .where(eq(tables.comments.ideaId, parseInt(ideaId)))
    .all();

  return comments
})