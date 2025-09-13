<script setup lang="ts">
import { ref, computed } from 'vue';

const ideasStore = useIdeasStore();
const selectedTimeRange = ref('Latest');

const ideas = computed(() => {
  const now = new Date();
  const timeRanges = {
    'Latest': 7 * 24 * 60 * 60 * 1000,
    'Trending': 30 * 24 * 60 * 60 * 1000,
    'All-time': Infinity
  };

  const timeLimit = timeRanges[selectedTimeRange.value as keyof typeof timeRanges];

  return ideasStore.ideas
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

      <ListContainer
        :ideas="ideas"
        :selected-time-range="selectedTimeRange"
        @set-time-range="setTimeRange"
        @create-idea="openSubmissionForm"
      />
    </AppContainer>
  </div>
</template>
