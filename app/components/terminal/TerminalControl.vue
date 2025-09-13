<script setup lang="ts">
interface Props {
  color?: string;
}

withDefaults(defineProps<Props>(), {
  color: 'text-cyber-pink'
});
</script>

<template>
  <div class="terminal-controls" :class="color">
    <span class="text-xs">● ● ●</span>
  </div>
</template>