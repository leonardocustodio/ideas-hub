import { eq } from 'drizzle-orm';

export default eventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID is required'
    });
  }

  const db = useDrizzle();
  const ideaId = parseInt(id);

  // Get comments count for this idea
  const comments = await db
    .select()
    .from(tables.comments)
    .where(eq(tables.comments.ideaId, ideaId))
    .all();

  return { count: comments.length };
});