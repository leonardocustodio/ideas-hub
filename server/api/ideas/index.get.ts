export default eventHandler(async () => {
  return await useDrizzle().select().from(tables.ideas).all()
})
