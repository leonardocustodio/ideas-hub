export default eventHandler(async (event) => {
  const result = await hubBlob().handleUpload(event, {
    formKey: 'file',
    multiple: false,
    ensure: {
      maxSize: '4MB',
      types: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    },
    put: {
      addRandomSuffix: true,
      prefix: 'ideas'
    }
  })

  return Array.isArray(result) ? result[0] : result;
})
