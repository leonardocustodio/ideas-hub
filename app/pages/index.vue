<script setup lang="ts">
import { ref, computed } from 'vue';
import type { DatabaseIdea } from '~/types/database';

const selectedTimeRange = ref('Latest');

// Fetch ideas from database on mount
const { data: dbIdeas, pending } = await useFetch<DatabaseIdea[]>('/api/ideas');

// Transform database ideas to match the Idea interface
const transformedIdeas = computed(() => {
  if (!dbIdeas.value) return [];

  return dbIdeas.value.map((dbIdea: DatabaseIdea) => ({
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

const ideas = computed(() => {
  const now = new Date();
  const timeRanges = {
    'Latest': 7 * 24 * 60 * 60 * 1000,
    'Trending': 30 * 24 * 60 * 60 * 1000,
    'All-time': Infinity
  };

  const timeLimit = timeRanges[selectedTimeRange.value as keyof typeof timeRanges];

  return transformedIdeas.value
    .filter(idea => {
    const timeDiff = now.getTime() - idea.createdAt.getTime();
    return selectedTimeRange.value === 'All-time' || timeDiff <= timeLimit;
  })
  .sort((a, b) => {
    if (selectedTimeRange.value === 'Latest') {
      // Sort by creation date (newest first)
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else if (selectedTimeRange.value === 'Trending') {
      // Sort by votes (highest first)
      return b.votes - a.votes;
    } else {
      // All-time: sort by votes (highest first)
      return b.votes - a.votes;
    }
  });
});

const openSubmissionForm = () => {
  navigateTo('/submit');
};

const setTimeRange = (range: string) => {
  selectedTimeRange.value = range;
};

</script>

<template>
  <div>

    <AppContainer>
      <StatsGrid />

      <div v-if="pending" class="text-center py-8">
        <span class="text-cyber-green">LOADING IDEAS...</span>
      </div>
      <ListContainer
        v-else
        :ideas="ideas"
        :selected-time-range="selectedTimeRange"
        @set-time-range="setTimeRange"
        @create-idea="openSubmissionForm"
      />
    </AppContainer>
  </div>
</template>
