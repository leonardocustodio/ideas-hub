<script setup lang="ts">
import { computed, onMounted } from 'vue';
import IconLightbulb from "~/components/icon/IconLightbulb.vue";
import IconUpvote from "~/components/icon/IconUpvote.vue";
import IconUsers from "~/components/icon/IconUsers.vue";
import IconComment from "~/components/icon/IconComment.vue";

// Fetch actual stats from database
const { data: stats } = await useFetch('/api/stats');
const { totalVotesCount, setTotalVotesCount } = useVoting();

onMounted(() => {
  if (stats.value?.totalVotes) {
    setTotalVotesCount(stats.value.totalVotes);
  }
});

const totalIdeas = computed(() => stats.value?.totalIdeas || 0);
// Use reactive vote count that updates when users vote
const totalVotes = computed(() => totalVotesCount.value);
const activeContributors = computed(() => stats.value?.totalBuilders || 0);
const totalComments = computed(() => stats.value?.totalComments || 0);
</script>

<template>
  <div class="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
    <StatsContainer
      :icon="IconLightbulb"
      :value="totalIdeas"
      label="IDEAS"
      color="pink"
      :show-prefix="true"
    />

    <StatsContainer
      :icon="IconUpvote"
      :value="totalVotes"
      label="VOTES"
      color="blue"
      :show-prefix="true"
    />

    <StatsContainer
      :icon="IconComment"
      :value="totalComments"
      label="COMMENTS"
      color="purple"
      :show-prefix="true"
    />

    <StatsContainer
      :icon="IconUsers"
      :value="activeContributors"
      label="BUILDERS"
      color="green"
    />
  </div>
</template>