<script setup lang="ts">
const handleSubmit = async (formData: IdeaFormData) => {
  // Process tags
  const processedTags = formData.tags
    ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    : [];

  // Process links
  const processedLinks = formData.links ? formData.links.split('\n').filter(link => link.trim()) : [];

  // Prepare data for database
  const ideaData = {
    author: formData.isAnonymous ? 'Anonymous' : formData.authorName,
    name: formData.name,
    tagline: formData.tagline,
    tags: processedTags,
    description: formData.description || null,
    links: processedLinks.length > 0 ? processedLinks : null,
    icon: null, // TODO: Handle file uploads
    video: formData.videoLink || null,
    images: null // TODO: Handle file uploads
  };

  try {
    // Save to database
    await $fetch('/api/ideas', {
      method: 'POST',
      body: ideaData
    });

    // Navigate back to home
    navigateTo('/');
  } catch (error) {
    console.error('Failed to add idea:', error);
    // TODO: Show error message to user
  }
};

const handleBack = () => {
  navigateTo('/');
};
</script>

<template>
  <div>

    <AppContainer>
      <SubmissionContainer
        @back="handleBack"
        @submit="handleSubmit"
      />
    </AppContainer>
  </div>
</template>
