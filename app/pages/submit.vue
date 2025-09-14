<script setup lang="ts">
import type { IdeaFormData } from '~/types';

const handleSubmit = async (formData: IdeaFormData) => {
  // Process tags
  const processedTags = formData.tags
    ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    : [];

  // Process links
  const processedLinks = formData.links ? formData.links.split('\n').filter(link => link.trim()) : [];

  let iconUrl = null;
  let galleryUrls: string[] = [];

  try {
    // Upload thumbnail if provided
    if (formData.thumbnail) {
      const thumbnailFormData = new FormData();
      thumbnailFormData.append('file', formData.thumbnail);

      const uploadResult = await $fetch<{ pathname: string }>('/api/upload/image', {
        method: 'POST',
        body: thumbnailFormData
      });

      console.log('Upload result:', uploadResult);
      // Now the API always returns a single object for single file uploads
      if (uploadResult && uploadResult.pathname) {
        iconUrl = `/api/blob/${uploadResult.pathname}`;
      } else {
        console.error('Invalid upload response:', uploadResult);
      }
    }

    // Upload gallery images if provided
    if (formData.gallery && formData.gallery.length > 0) {
      const galleryFormData = new FormData();
      formData.gallery.forEach(file => {
        galleryFormData.append('files', file);
      });

      const galleryResults = await $fetch<Array<{ pathname: string }>>('/api/upload/gallery', {
        method: 'POST',
        body: galleryFormData
      });

      console.log('Gallery upload results:', galleryResults);
      // When multiple: true, handleUpload returns an array
      if (Array.isArray(galleryResults)) {
        galleryUrls = galleryResults.map((result) => `/api/blob/${result.pathname}`);
      } else {
        console.error('Invalid gallery upload response:', galleryResults);
      }
    }

    // Prepare data for database
    const ideaData = {
      author: formData.isAnonymous ? 'Anonymous' : formData.authorName,
      name: formData.name,
      tagline: formData.tagline,
      tags: processedTags,
      description: formData.description || null,
      links: processedLinks.length > 0 ? processedLinks : null,
      icon: iconUrl,
      video: formData.videoLink || null,
      images: galleryUrls.length > 0 ? galleryUrls : null
    };

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
