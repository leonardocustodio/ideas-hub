import { eq, sql } from 'drizzle-orm';

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

  // Increment view count
  await db
    .update(tables.ideas)
    .set({ views: sql`${tables.ideas.views} + 1` })
    .where(eq(tables.ideas.id, ideaId));

  // Return updated view count
  const updated = await db
    .select({ views: tables.ideas.views })
    .from(tables.ideas)
    .where(eq(tables.ideas.id, ideaId))
    .get();

  return { views: updated?.views || 0 };
});