import { eq } from 'drizzle-orm';

export default eventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID is required'
    });
  }

  const result = await useDrizzle()
    .select()
    .from(tables.ideas)
    .where(eq(tables.ideas.id, parseInt(id)))
    .get();

  if (!result) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Idea not found'
    });
  }

  return result;
})