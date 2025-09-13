<script setup lang="ts">
import IconArrowLeft from "~/components/icon/IconArrowLeft.vue";
import IconArrowRight from "~/components/icon/IconArrowRight.vue";
import IconUpvote from "~/components/icon/IconUpvote.vue";

interface Props {
  idea: Idea;
  previousIdea: Idea | null;
  nextIdea: Idea | null;
}

defineProps<Props>();

const emit = defineEmits<{
  'go-previous': [];
  'go-next': [];
  'vote': [];
}>();
</script>

<template>
  <TerminalContainer header-title="CONTROL" header-subtitle="ACTIONS">
    <div class="space-y-4 px-4 sm:px-6 lg:px-6 py-3">
      <!-- Navigation Buttons -->
      <div class="flex justify-between space-x-4">
        <button
          class="flex-1 flex items-center justify-center space-x-2 py-1.5 px-3 text-xs font-medium uppercase shadow-sm transition-all duration-200 text-cyber-green border border-cyber-green hover:bg-cyber-green hover:text-black"
          @click="emit('go-previous')"
        >
          <IconArrowLeft class="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          class="flex-1 flex items-center justify-center space-x-2 py-1.5 px-3 text-xs font-medium uppercase shadow-sm transition-all duration-200 text-cyber-green border border-cyber-green hover:bg-cyber-green hover:text-black"
          @click="emit('go-next')"
        >
          <span>Next</span>
          <IconArrowRight class="w-4 h-4" />
        </button>
      </div>

      <!-- Vote Button -->
      <button
        class="w-full flex items-center justify-center space-x-2 py-1.5 px-3 text-xs font-medium uppercase shadow-sm transition-all duration-200"
        :class="idea.hasVoted
          ? 'bg-polkadot-pink text-white border border-polkadot-pink'
          : 'text-cyber-green border border-cyber-green hover:bg-polkadot-pink hover:text-white hover:border-polkadot-pink'"
        @click="emit('vote')"
      >
        <IconUpvote class="w-5 h-5" />
        <span>{{ idea.votes }} upvotes</span>
      </button>
    </div>
  </TerminalContainer>
</template>
