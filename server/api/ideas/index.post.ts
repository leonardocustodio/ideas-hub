export default eventHandler(async (event) => {
  const body = await readBody(event)

  return await useDrizzle().insert(tables.ideas).values({
    author: body.author,
    name: body.name,
    tagline: body.tagline,
    tags: body.tags,
    description: body.description || null,
    links: body.links || null,
    icon: body.icon || null,
    video: body.video || null,
    images: body.images || null,
    createdAt: new Date()
  }).returning().get()
})
