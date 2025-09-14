export default eventHandler(async (event) => {
  // Handle multiple image uploads for gallery
  return hubBlob().handleUpload(event, {
    formKey: 'files', // The form field name for multiple files
    multiple: true, // Multiple file upload
    ensure: {
      maxSize: '5MB',
      types: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    },
    put: {
      addRandomSuffix: true, // Add random suffix to prevent conflicts
      prefix: 'gallery' // Store in gallery folder
    }
  })
})