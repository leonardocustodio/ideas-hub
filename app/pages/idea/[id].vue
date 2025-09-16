<script setup lang="ts">
import { computed, watch } from 'vue';
import MediaContainer from "~/components/media/MediaContainer.vue";
import CommentsContainer from "~/components/comments/CommentsContainer.vue";
import ReferenceContainer from "~/components/ReferenceContainer.vue";
import InfoContainer from "~/components/InfoContainer.vue";
import type { IdeaWithDetails } from '~/types';

const route = useRoute();
const { trackView } = useViewTracking();

const id = computed(() => route.params.id as string);

// Fetch all ideas and the specific idea
const { data: allIdeas } = await useFetch<IdeaWithDetails[]>('/api/ideas');
const { data: currentIdea } = await useFetch<IdeaWithDetails>(`/api/ideas/${id.value}`);
const { data: commentCount } = await useFetch(`/api/ideas/${id.value}/comments-count`);

// Track page view (only once per session per idea)
watch(id, async (newId) => {
  if (newId) {
    await trackView(newId);
  }
}, { immediate: true });

// Add client-side fields
const allIdeasWithClientFields = computed((): IdeaWithDetails[] => {
  if (!allIdeas.value) return [];
  return allIdeas.value;
});

const idea = computed((): IdeaWithDetails | undefined => {
  if (!currentIdea.value) return undefined;
  return {
    ...currentIdea.value,
    commentsCount: commentCount.value?.count || 0
  };
});

const currentIndex = computed(() => {
  return allIdeasWithClientFields.value.findIndex(i => i.id.toString() === id.value);
});

const previousIdea = computed(() => {
  const index = currentIndex.value;
  const totalIdeas = allIdeasWithClientFields.value.length;
  if (totalIdeas === 0) return null;

  if (index > 0) {
    return allIdeasWithClientFields.value[index - 1];
  }
  // Wrap to last item when at first
  return allIdeasWithClientFields.value[totalIdeas - 1];
});

const nextIdea = computed(() => {
  const index = currentIndex.value;
  const totalIdeas = allIdeasWithClientFields.value.length;
  if (totalIdeas === 0) return null;

  if (index >= 0 && index < totalIdeas - 1) {
    return allIdeasWithClientFields.value[index + 1];
  }
  // Wrap to first item when at last
  return allIdeasWithClientFields.value[0];
});

const goToPrevious = () => {
  if (previousIdea.value) {
    navigateTo(`/idea/${previousIdea.value.id}`);
  }
};

const goToNext = () => {
  if (nextIdea.value) {
    navigateTo(`/idea/${nextIdea.value.id}`);
  }
};

const handleVote = () => {
  if (idea.value) {
    // TODO: Implement vote functionality with API
    console.log('Vote for idea:', idea.value.id);
  }
};

// Redirect to home if idea not found
onMounted(() => {
  if (!idea.value) {
    navigateTo('/');
  }
});
</script>

<template>
  <div v-if="idea">

    <AppContainer>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Idea Header -->
          <InfoContainer :idea="idea" />

          <!-- Media Carousel -->
          <MediaContainer :idea="idea" />


          <!-- Reference Links -->
          <ReferenceContainer :links="idea.links" />

          <!-- Comments Section -->
          <CommentsContainer :idea-id="idea.id" />

        </div>

        <!-- Right Column - Sidebar -->
        <SidebarContainer
          :idea="idea"
          :previous-idea="previousIdea"
          :next-idea="nextIdea"
          @go-previous="goToPrevious"
          @go-next="goToNext"
          @vote="handleVote"
        />
      </div>
    </AppContainer>
  </div>
</template>
