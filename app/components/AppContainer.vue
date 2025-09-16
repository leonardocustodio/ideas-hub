<script setup lang="ts">
interface Props {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl';
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: '7xl'
});

const maxWidthClass = computed(() => {
  const widths = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '7xl': 'max-w-7xl'
  };
  return widths[props.maxWidth];
});
</script>

<template>
  <main :class="[maxWidthClass, 'mx-auto px-3 sm:px-6 lg:px-8 pt-2 pb-4 sm:pb-6 relative z-10']">
    <slot />
  </main>
</template>