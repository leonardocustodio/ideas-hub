import { eq, and } from 'drizzle-orm';

export default eventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID is required'
    });
  }

  if (!body.fingerprint) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Fingerprint is required'
    });
  }

  const db = useDrizzle();
  const ideaId = parseInt(id);

  try {
    // Check if user already voted
    const existingVote = await db
      .select()
      .from(tables.votes)
      .where(
        and(
          eq(tables.votes.fingerprint, body.fingerprint),
          eq(tables.votes.ideaId, ideaId)
        )
      )
      .get();

    if (existingVote) {
      // Remove vote (toggle)
      await db
        .delete(tables.votes)
        .where(eq(tables.votes.id, existingVote.id));

      return { voted: false, message: 'Vote removed' };
    } else {
      // Add vote
      await db
        .insert(tables.votes)
        .values({
          fingerprint: body.fingerprint,
          ideaId: ideaId
        });

      return { voted: true, message: 'Vote added' };
    }
  } catch (error: any) {
    // Handle unique constraint violation
    if (error?.message?.includes('UNIQUE')) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Already voted'
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to process vote'
    });
  }
});