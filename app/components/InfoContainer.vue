<script setup lang="ts">
import IconLightbulb from "~/components/icon/IconLightbulb.vue";

interface Props {
  idea: Idea;
}

defineProps<Props>();
</script>

<template>
  <TerminalContainer header-title="MAIN" header-subtitle="IDEA">
    <div class="flex items-start space-x-4 px-4 sm:px-6 lg:px-6 py-3">
      <!-- Icon -->
      <div class="w-16 h-16 bg-darker-bg flex items-center justify-center flex-shrink-0 border border-polkadot-pink">
        <IconLightbulb class="w-8 h-8 text-polkadot-pink" />
      </div>

      <!-- Title and Meta -->
      <div class="flex-1">
        <div class="flex items-center space-x-3 mb-2">
          <h1 class="text-xl sm:text-2xl font-bold text-cyber-blue cyber-text heading uppercase">{{ idea.name }}</h1>
        </div>
        <p class="text-text-primary mb-4">{{ idea.description }}</p>

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
    </div>
  </TerminalContainer>
</template>
