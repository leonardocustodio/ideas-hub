<script setup lang="ts">
import IconLightbulb from "~/components/icon/IconLightbulb.vue";

interface Props {
  idea: Idea;
}

defineProps<Props>();
</script>

<template>
  <TerminalContainer header-title="MAIN" header-subtitle="IDEA">
    <div class="px-4 sm:px-6 lg:px-6 py-3">
      <!-- Header with Icon, Name and Tagline -->
      <div class="flex items-start space-x-4 mb-4">
        <!-- Icon -->
        <div class="w-16 h-16 bg-darker-bg flex items-center justify-center flex-shrink-0 border border-polkadot-pink overflow-hidden">
          <img
            v-if="idea.icon"
            :src="idea.icon"
            :alt="idea.name"
            class="w-full h-full object-cover"
          >
          <IconLightbulb
            v-else
            class="w-8 h-8 text-polkadot-pink"
          />
        </div>

        <!-- Name and Tagline -->
        <div class="flex-1">
          <h1 class="text-xl sm:text-2xl font-bold text-cyber-blue cyber-text heading uppercase mb-2">{{ idea.name }}</h1>
          <p class="text-text-accent text-sm sm:text-base">{{ idea.tagline }}</p>
        </div>
      </div>

      <!-- Description -->
      <div class="mb-4">
        <p class="text-text-primary">{{ idea.description }}</p>
      </div>

      <!-- Tags -->
      <div v-if="idea.tags && idea.tags.length > 0" class="flex flex-wrap gap-2">
        <span
          v-for="tag in idea.tags"
          :key="tag"
          class="px-3 py-1.5 text-cyber-green text-xs font-medium shadow-sm border border-cyber-green uppercase"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </TerminalContainer>
</template>
