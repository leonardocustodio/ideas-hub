<script setup lang="ts">
interface Props {
  author: string;
  timeAgo: string;
  text: string;
}

defineProps<Props>();
</script>

<template>
  <div class="p-4 bg-cyber-blue/10 border border-cyber-blue">
    <div class="flex items-center justify-between mb-2">
      <span class="font-semibold text-cyber-blue uppercase">{{ author }}</span>
      <span class="text-text-secondary text-xs uppercase pr-2">{{ timeAgo }}</span>
    </div>
    <p class="text-text-primary">{{ text }}</p>
  </div>
</template>