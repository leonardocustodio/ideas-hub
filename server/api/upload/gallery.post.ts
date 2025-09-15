export default eventHandler(async (event) => {
  return await hubBlob().handleUpload(event, {
    formKey: 'files',
    multiple: true,
    ensure: {
      maxSize: '16MB',
      types: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    },
    put: {
      addRandomSuffix: true,
      prefix: 'gallery'
    }
  });
})
