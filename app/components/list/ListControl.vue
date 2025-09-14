<script setup lang="ts">

interface Props {
  options: string[];
  selectedOption: string;
  label?: string;
}

withDefaults(defineProps<Props>(), {
  label: 'MODE'
});

const emit = defineEmits<{
  select: [option: string];
}>();

const handleSelect = (option: string) => {
  emit('select', option);
};
</script>

<template>
  <TerminalContainer
    header-title="FILTER"
    header-subtitle="SORT_ALGORITHM"
    :clip-corners="['ClipTopLeft', 'ClipBottomRight']"
  >
    <div class="flex items-center space-x-6 px-4 sm:px-6 lg:px-6 py-3">
      <span class="text-cyber-blue text-sm uppercase tracking-wider">> {{ label }}:</span>
      <div class="flex items-center space-x-2">
        <button
          v-for="option in options"
          :key="option"
          class="px-4 py-2 text-sm uppercase tracking-wider transition-all duration-300 border"
          :class="[
            selectedOption === option
              ? 'text-cyber-green border-cyber-green'
              : 'text-text-secondary border-text-secondary hover:text-cyber-blue hover:border-cyber-blue'
          ]"
          @click="handleSelect(option)"
        >
          <span v-if="option === 'All-time'" class="sm:hidden">ALL</span>
          <span v-if="option === 'All-time'" class="hidden sm:inline">{{ option }}</span>
          <span v-if="option !== 'All-time'">{{ option }}</span>
        </button>
      </div>
    </div>
  </TerminalContainer>
</template>
