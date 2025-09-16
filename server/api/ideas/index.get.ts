import { eq } from 'drizzle-orm';

export default eventHandler(async () => {
  const db = useDrizzle();

  // Get all ideas with their authors
  const ideasWithAuthors = await db
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
    .all();

  // Get tags for all ideas
  const tags = await db
    .select({
      ideaId: tables.tags.ideaId,
      tag: tables.tags.tag
    })
    .from(tables.tags)
    .all();

  // Get images for all ideas
  const images = await db
    .select({
      ideaId: tables.images.ideaId,
      file: tables.images.file
    })
    .from(tables.images)
    .all();

  // Group tags and images by ideaId
  const tagsByIdea = tags.reduce((acc, tag) => {
    if (!acc[tag.ideaId]) acc[tag.ideaId] = [];
    acc[tag.ideaId].push(tag.tag);
    return acc;
  }, {} as Record<number, string[]>);

  const imagesByIdea = images.reduce((acc, img) => {
    if (!acc[img.ideaId]) acc[img.ideaId] = [];
    acc[img.ideaId].push(img.file);
    return acc;
  }, {} as Record<number, string[]>);

  // Combine everything
  return ideasWithAuthors.map(idea => ({
    id: idea.id,
    name: idea.name,
    tagline: idea.tagline,
    description: idea.description,
    links: idea.links,
    icon: idea.icon,
    video: idea.video,
    views: idea.views || 0,
    createdAt: idea.createdAt,
    author: idea.authorName || 'Anonymous',
    tags: tagsByIdea[idea.id] || [],
    images: imagesByIdea[idea.id] || []
  }));
})
