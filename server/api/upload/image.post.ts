export default eventHandler(async (event) => {
  // Handle image upload using Nuxt Hub blob storage
  const result = await hubBlob().handleUpload(event, {
    formKey: 'file', // The form field name for the file
    multiple: false, // Single file upload
    ensure: {
      maxSize: '5MB',
      types: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    },
    put: {
      addRandomSuffix: true, // Add random suffix to prevent conflicts
      prefix: 'ideas' // Store in ideas folder
    }
  })

  console.log('Single file upload result:', result);

  // If result is an array (which it seems to be), return the first element
  // Otherwise return the result as-is
  return Array.isArray(result) ? result[0] : result;
})