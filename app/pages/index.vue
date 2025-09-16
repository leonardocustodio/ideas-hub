<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { IdeaWithDetails } from '~/types';

const selectedTimeRange = ref('Latest');
const { data: dbIdeas, pending } = await useFetch<IdeaWithDetails[]>('/api/ideas');
const { initializeVoting } = useVoting();

onMounted(async () => {
  await initializeVoting();
});

const ideasWithClientFields = computed((): IdeaWithDetails[] => {
  if (!dbIdeas.value) return [];
  return dbIdeas.value;
});

const ideas = computed(() => {
  // No filtering, show all ideas
  const sortedIdeas = [...ideasWithClientFields.value];

  if (selectedTimeRange.value === 'Latest') {
    // Sort by creation date (newest first)
    return sortedIdeas.sort((a, b) => {
      const aDate = typeof a.createdAt === 'string' ? new Date(a.createdAt) : a.createdAt;
      const bDate = typeof b.createdAt === 'string' ? new Date(b.createdAt) : b.createdAt;
      return bDate.getTime() - aDate.getTime();
    });
  } else if (selectedTimeRange.value === 'Trending') {
    // Sort by recent votes (most votes in last 7 days first)
    // If recent votes are the same, sort by creation date (newest first)
    return sortedIdeas.sort((a, b) => {
      const voteDiff = (b.recentVotes || 0) - (a.recentVotes || 0);
      if (voteDiff !== 0) return voteDiff;

      const aDate = typeof a.createdAt === 'string' ? new Date(a.createdAt) : a.createdAt;
      const bDate = typeof b.createdAt === 'string' ? new Date(b.createdAt) : b.createdAt;
      return bDate.getTime() - aDate.getTime();
    });
  } else {
    // All: sorts by total votes (highest first)
    return sortedIdeas.sort((a, b) => {
      const voteDiff = (b.votes || 0) - (a.votes || 0);
      if (voteDiff !== 0) return voteDiff;
      return a.id - b.id;
    });
  }
});

const openSubmissionForm = () => {
  // Check if a user has seen instructions before
  const hasSeenInstructions = import.meta.client ? localStorage.getItem('hasSeenInstructions') : false;

  if (hasSeenInstructions) {
    navigateTo('/submit');
  } else {
    navigateTo('/instructions');
  }
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
