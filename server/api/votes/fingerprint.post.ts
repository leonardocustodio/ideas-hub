import { eq } from 'drizzle-orm';

export default eventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.fingerprint) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Fingerprint is required'
    });
  }

  const db = useDrizzle();

  // Get all votes for this fingerprint
  const votes = await db
    .select({
      ideaId: tables.votes.ideaId
    })
    .from(tables.votes)
    .where(eq(tables.votes.fingerprint, body.fingerprint))
    .all();

  // Return array of idea IDs that have been voted
  return votes.map(v => v.ideaId);
});