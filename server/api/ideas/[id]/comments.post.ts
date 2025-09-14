import { eq } from 'drizzle-orm';

export default eventHandler(async (event) => {
  const ideaId = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!ideaId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Idea ID is required'
    })
  }

  if (!body.comment || !body.author) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Comment text and author name are required'
    })
  }

  const db = useDrizzle()

  // First, get or create the author
  let author = await db
    .select()
    .from(tables.authors)
    .where(eq(tables.authors.name, body.author))
    .get()

  if (!author) {
    author = await db
      .insert(tables.authors)
      .values({ name: body.author })
      .returning()
      .get()
  }

  // Insert the comment
  const newComment = await db
    .insert(tables.comments)
    .values({
      comment: body.comment,
      ideaId: parseInt(ideaId),
      authorId: author.id,
      createdAt: new Date()
    })
    .returning()
    .get()

  // Return the comment with author name
  return {
    id: newComment.id,
    comment: newComment.comment,
    author: author.name,
    createdAt: newComment.createdAt
  }
})