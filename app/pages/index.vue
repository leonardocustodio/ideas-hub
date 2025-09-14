<script setup lang="ts">
import { ref, computed } from 'vue';
import type { IdeaWithDetails } from '~/types';

const selectedTimeRange = ref('Latest');
const { data: dbIdeas, pending } = await useFetch<IdeaWithDetails[]>('/api/ideas');

// Add client-side fields
const ideasWithClientFields = computed((): IdeaWithDetails[] => {
  if (!dbIdeas.value) return [];

  return dbIdeas.value.map((idea) => ({
    ...idea,
    votes: 0,
    hasVoted: false
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

  return ideasWithClientFields.value
  .filter(idea => {
    const ideaDate = typeof idea.createdAt === 'string' ? new Date(idea.createdAt) : idea.createdAt;
    const timeDiff = now.getTime() - ideaDate.getTime();
    return selectedTimeRange.value === 'All-time' || timeDiff <= timeLimit;
  })
  .sort((a, b) => {
    if (selectedTimeRange.value === 'Latest') {
      // Sort by creation date (newest first)
      const aDate = typeof a.createdAt === 'string' ? new Date(a.createdAt) : a.createdAt;
      const bDate = typeof b.createdAt === 'string' ? new Date(b.createdAt) : b.createdAt;
      return bDate.getTime() - aDate.getTime();
    } else if (selectedTimeRange.value === 'Trending') {
      // Sort by votes (highest first)
      return (b.votes || 0) - (a.votes || 0);
    } else {
      // All-time: sort by votes (highest first)
      return (b.votes || 0) - (a.votes || 0);
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
