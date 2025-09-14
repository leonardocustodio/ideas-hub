<script setup lang="ts">
import { computed, onMounted } from 'vue';
import MediaContainer from "~/components/media/MediaContainer.vue";
import CommentsContainer from "~/components/comments/CommentsContainer.vue";
import ReferenceContainer from "~/components/ReferenceContainer.vue";
import InfoContainer from "~/components/InfoContainer.vue";
import type { DatabaseIdea } from '~/types/database';

const route = useRoute();

const id = computed(() => route.params.id as string);

// Fetch all ideas and the specific idea
const { data: allIdeas } = await useFetch<DatabaseIdea[]>('/api/ideas');
const { data: currentIdea } = await useFetch<DatabaseIdea>(`/api/ideas/${id.value}`);

// Transform the ideas to match Idea interface
const transformedIdeas = computed(() => {
  if (!allIdeas.value) return [];

  return allIdeas.value.map((dbIdea: DatabaseIdea) => ({
    id: dbIdea.id.toString(),
    name: dbIdea.name,
    description: dbIdea.description || '',
    links: dbIdea.links || [],
    attachments: [],
    mockImages: dbIdea.images || [],
    isAnonymous: dbIdea.author === 'Anonymous',
    authorName: dbIdea.author,
    votes: 0,
    hasVoted: false,
    createdAt: new Date(dbIdea.createdAt),
    tags: dbIdea.tags || [],
    tagline: dbIdea.tagline
  }));
});

const idea = computed((): Idea | undefined => {
  if (!currentIdea.value) return undefined;

  const dbIdea = currentIdea.value;
  return {
    id: dbIdea.id.toString(),
    name: dbIdea.name,
    description: dbIdea.description || '',
    links: dbIdea.links || [],
    attachments: [],
    mockImages: dbIdea.images || [],
    isAnonymous: dbIdea.author === 'Anonymous',
    authorName: dbIdea.author,
    votes: 0,
    hasVoted: false,
    createdAt: new Date(dbIdea.createdAt),
    tags: dbIdea.tags || [],
    tagline: dbIdea.tagline
  };
});

const currentIndex = computed(() => {
  return transformedIdeas.value.findIndex(i => i.id === id.value);
});

const previousIdea = computed(() => {
  const index = currentIndex.value;
  const totalIdeas = transformedIdeas.value.length;
  if (totalIdeas === 0) return null;

  if (index > 0) {
    return transformedIdeas.value[index - 1];
  }
  // Wrap to last item when at first
  return transformedIdeas.value[totalIdeas - 1];
});

const nextIdea = computed(() => {
  const index = currentIndex.value;
  const totalIdeas = transformedIdeas.value.length;
  if (totalIdeas === 0) return null;

  if (index >= 0 && index < totalIdeas - 1) {
    return transformedIdeas.value[index + 1];
  }
  // Wrap to first item when at last
  return transformedIdeas.value[0];
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
    ideasStore.toggleVote(idea.value.id);
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
          <CommentsContainer />

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
