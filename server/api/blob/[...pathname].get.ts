export default eventHandler(async (event) => {
  const { pathname } = getRouterParams(event)

  const fullPath = Array.isArray(pathname) ? pathname.join('/') : pathname

  // Serve the blob file
  return hubBlob().serve(event, fullPath)
})