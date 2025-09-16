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

  // Get idea with author
  const ideaWithAuthor = await db
    .select({
      id: tables.ideas.id,
      name: tables.ideas.name,
      tagline: tables.ideas.tagline,
      description: tables.ideas.description,
      links: tables.ideas.links,
      icon: tables.ideas.icon,
      video: tables.ideas.video,
      views: tables.ideas.views,
      createdAt: tables.ideas.createdAt,
      authorId: tables.ideas.authorId,
      authorName: tables.authors.name
    })
    .from(tables.ideas)
    .leftJoin(tables.authors, eq(tables.ideas.authorId, tables.authors.id))
    .where(eq(tables.ideas.id, ideaId))
    .get();

  if (!ideaWithAuthor) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Idea not found'
    });
  }

  // Get tags for this idea
  const tags = await db
    .select({
      tag: tables.tags.tag
    })
    .from(tables.tags)
    .where(eq(tables.tags.ideaId, ideaId))
    .all();

  // Get images for this idea
  const images = await db
    .select({
      file: tables.images.file
    })
    .from(tables.images)
    .where(eq(tables.images.ideaId, ideaId))
    .all();

  // Get vote count for this idea
  const votes = await db
    .select()
    .from(tables.votes)
    .where(eq(tables.votes.ideaId, ideaId))
    .all();

  // Combine everything
  return {
    id: ideaWithAuthor.id,
    name: ideaWithAuthor.name,
    tagline: ideaWithAuthor.tagline,
    description: ideaWithAuthor.description,
    links: ideaWithAuthor.links,
    icon: ideaWithAuthor.icon,
    video: ideaWithAuthor.video,
    views: ideaWithAuthor.views || 0,
    votes: votes.length,
    createdAt: ideaWithAuthor.createdAt,
    author: ideaWithAuthor.authorName || 'Anonymous',
    tags: tags.map(t => t.tag),
    images: images.map(i => i.file)
  };
})