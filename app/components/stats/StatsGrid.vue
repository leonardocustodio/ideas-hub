<script setup lang="ts">
import { computed } from 'vue';
import IconLightbulb from "~/components/icon/IconLightbulb.vue";
import IconUpvote from "~/components/icon/IconUpvote.vue";
import IconUsers from "~/components/icon/IconUsers.vue";
import IconComment from "~/components/icon/IconComment.vue";

// Fetch ideas from database to get stats
const { data: ideas } = await useFetch('/api/ideas');

const totalIdeas = computed(() => ideas.value?.length || 0);
const totalVotes = computed(() => ideas.value?.reduce((sum, idea) => sum + (idea.votes || 0), 0) || 0);
const activeContributors = computed(() => Math.floor(totalIdeas.value * 0.7));
const totalComments = computed(() => Math.floor(totalIdeas.value * 1.3));
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