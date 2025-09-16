<script setup lang="ts">

interface Props {
  title?: string;
  subtitle?: string;
  rightContent?: string;
  showControls?: boolean;
}

withDefaults(defineProps<Props>(), {
  showControls: true,
  title: undefined,
  subtitle: undefined,
  rightContent: undefined
});
</script>

<template>
  <div class="flex items-center justify-between border-b border-cyber-blue relative min-h-[2.5rem]">
    <div class="flex items-center">
      <TerminalControl v-if="showControls" class="mr-4" />
      <span v-if="title" class="text-cyber-blue text-sm sm:text-base">[{{ title }}]</span>
      <span v-if="subtitle" class="text-cyber-green ml-2 text-sm sm:text-base">{{ subtitle }}</span>
      <slot />
    </div>
    <span v-if="rightContent" class="text-cyber-pink hidden sm:block text-sm sm:text-base">{{ rightContent }}</span>
  </div>
</template>