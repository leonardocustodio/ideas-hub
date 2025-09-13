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
  <div class="terminal-header flex items-center justify-between">
    <div class="flex items-center">
      <TerminalControl v-if="showControls" class="mr-4" />
      <span v-if="title" class="text-cyber-blue">[{{ title }}]</span>
      <span v-if="subtitle" class="text-cyber-green ml-2">{{ subtitle }}</span>
      <slot />
    </div>
    <span v-if="rightContent" class="text-cyber-pink">{{ rightContent }}</span>
  </div>
</template>