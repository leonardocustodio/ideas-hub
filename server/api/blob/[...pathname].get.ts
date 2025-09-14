export default eventHandler(async (event) => {
  const { pathname } = getRouterParams(event)

  // Serve the blob file
  return hubBlob().serve(event, pathname)
})