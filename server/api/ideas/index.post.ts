import { eq } from 'drizzle-orm';

export default eventHandler(async (event) => {
  const body = await readBody(event)
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

  // Insert the idea
  const idea = await db
    .insert(tables.ideas)
    .values({
      name: body.name,
      tagline: body.tagline,
      description: body.description || null,
      links: body.links || null,
      icon: body.icon || null,
      video: body.video || null,
      images: null, // We'll handle images separately
      authorId: author.id,
      createdAt: new Date()
    })
    .returning()
    .get()

  // Insert tags if provided
  if (body.tags && Array.isArray(body.tags)) {
    for (const tag of body.tags) {
      await db
        .insert(tables.tags)
        .values({
          tag,
          ideaId: idea.id
        })
        .get()
    }
  }

  // Insert images if provided
  if (body.images && Array.isArray(body.images)) {
    for (const image of body.images) {
      await db
        .insert(tables.images)
        .values({
          file: image,
          ideaId: idea.id
        })
        .get()
    }
  }

  // Return the complete idea with all relationships
  return {
    ...idea,
    author: body.author,
    tags: body.tags || [],
    images: body.images || []
  }
})
