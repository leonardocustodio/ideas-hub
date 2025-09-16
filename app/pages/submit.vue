<script setup lang="ts">
import type { IdeaFormData } from '~/types';

const { start, finish } = useLoadingIndicator();
const isSubmitting = ref(false);

const handleSubmit = async (formData: IdeaFormData) => {
  const processedTags = formData.tags
    ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    : [];

  const processedLinks = formData.links ? formData.links.split('\n').filter(link => link.trim()) : [];

  let iconUrl = null;
  let galleryUrls: string[] = [];

  // Start loading indicator and set submitting state
  start();
  isSubmitting.value = true;

  try {
    if (formData.thumbnail) {
      const thumbnailFormData = new FormData();
      thumbnailFormData.append('file', formData.thumbnail);

      const uploadResult = await $fetch<{ pathname: string }>('/api/upload/image', {
        method: 'POST',
        body: thumbnailFormData
      });
      if (uploadResult && uploadResult.pathname) {
        iconUrl = `/api/blob/${uploadResult.pathname}`;
      } else {
        console.error('Invalid upload response:', uploadResult);
      }
    }

    if (formData.gallery && formData.gallery.length > 0) {
      const galleryFormData = new FormData();
      formData.gallery.forEach(file => {
        galleryFormData.append('files', file);
      });

      const galleryResults = await $fetch<Array<{ pathname: string }>>('/api/upload/gallery', {
        method: 'POST',
        body: galleryFormData
      });
      if (Array.isArray(galleryResults)) {
        galleryUrls = galleryResults.map((result) => `/api/blob/${result.pathname}`);
      } else {
        console.error('Invalid gallery upload response:', galleryResults);
      }
    }

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

    await $fetch('/api/ideas', {
      method: 'POST',
      body: ideaData
    });

    // Success - finish loading and reset state
    finish();
    isSubmitting.value = false;

    navigateTo('/');
  } catch (error) {
    console.error('Failed to add idea:', error);
    // Error - finish loading with error state and reset state
    finish({ error: true });
    isSubmitting.value = false;
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
        :is-submitting="isSubmitting"
        @back="handleBack"
        @submit="handleSubmit"
      />
    </AppContainer>
  </div>
</template>
