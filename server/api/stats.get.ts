export default eventHandler(async () => {
  const db = useDrizzle();

  // Get total ideas count
  const ideas = await db.select().from(tables.ideas).all();
  const totalIdeas = ideas.length;

  // Get total votes count (each row is one vote)
  const votes = await db.select().from(tables.votes).all();
  const totalVotes = votes.length;

  // Get total comments count
  const comments = await db.select().from(tables.comments).all();
  const totalComments = comments.length;

  // Get total unique authors/builders count
  const authors = await db.select().from(tables.authors).all();
  const totalBuilders = authors.length;

  return {
    totalIdeas,
    totalVotes,
    totalComments,
    totalBuilders
  };
});