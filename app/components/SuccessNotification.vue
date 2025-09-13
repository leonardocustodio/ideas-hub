<script setup lang="ts">
interface Props {
  show: boolean;
  message?: string;
}

const props = withDefaults(defineProps<Props>(), {
  message: 'UPLOAD_COMPLETE'
});
</script>

<template>
  <div v-if="show" class="fixed top-24 right-4 z-50">
    <UAlert
      color="success"
      variant="subtle"
      :title="props.message"
      icon="i-heroicons-check-circle"
      class="animate-cyber-pulse bg-cyber-green/20 border-cyber-green"
      :ui="{
        title: 'uppercase tracking-wider font-mono text-cyber-green',
        wrapper: 'ring-0'
      }"
    />
  </div>
</template>