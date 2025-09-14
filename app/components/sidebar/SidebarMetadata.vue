<script setup lang="ts">
import IconUser from "~/components/icon/IconUser.vue";
import IconEye from "~/components/icon/IconEye.vue";
import IconClock from "~/components/icon/IconClock.vue";

interface Props {
  idea: Idea;
}

defineProps<Props>();

const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  }
};
</script>

<template>
  <TerminalContainer header-title="METADATA" header-subtitle="FIELDS">
    <div class="space-y-3 text-text-primary uppercase px-4 sm:px-6 lg:px-6 py-3">
      <div class="flex items-center space-x-3">
        <IconUser class="w-4 h-4 text-cyber-pink" />
        <span>{{ idea.authorName }}</span>
      </div>
      <div class="flex items-center space-x-3">
        <IconEye class="w-4 h-4 text-cyber-pink" />
        <span>{{ Math.floor(idea.votes * 3.2) }} views</span>
      </div>
      <div class="flex items-center space-x-3">
        <IconClock class="w-4 h-4 text-cyber-pink" />
        <span>{{ getRelativeTime(idea.createdAt) }}</span>
      </div>
    </div>
  </TerminalContainer>
</template>
