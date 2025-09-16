<script setup lang="ts">
import { ref, computed } from 'vue';
import IconArrowLeft from "~/components/icon/IconArrowLeft.vue";
import IconArrowRight from "~/components/icon/IconArrowRight.vue";
import IconUpvote from "~/components/icon/IconUpvote.vue";

interface Props {
  idea: Idea;
  previousIdea: Idea | null;
  nextIdea: Idea | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'go-previous': [];
  'go-next': [];
}>();

const { voteForIdea, hasVoted } = useVoting();

const isVoting = ref(false);
const localVotes = ref(props.idea.votes || 0);
const localHasVoted = computed(() => hasVoted(props.idea.id));

const handleVote = async () => {
  if (isVoting.value) return;

  isVoting.value = true;
  try {
    const voted = await voteForIdea(props.idea.id);

    // Update local vote count
    if (voted) {
      localVotes.value++;
    } else {
      localVotes.value = Math.max(0, localVotes.value - 1);
    }
  } finally {
    isVoting.value = false;
  }
};
</script>

<template>
  <TerminalContainer header-title="CONTROL" header-subtitle="ACTIONS">
    <div class="space-y-4 px-3 sm:px-6 lg:px-6 py-2 sm:py-3">
      <!-- Navigation Buttons -->
      <div class="flex justify-between space-x-4">
        <button
          class="flex-1 flex items-center justify-center space-x-2 py-2 px-3 text-xs font-medium uppercase shadow-sm transition-all duration-200 text-cyber-green border border-cyber-green hover:bg-cyber-green hover:text-black"
          @click="emit('go-previous')"
        >
          <IconArrowLeft class="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          class="flex-1 flex items-center justify-center space-x-2 py-2 px-3 text-xs font-medium uppercase shadow-sm transition-all duration-200 text-cyber-green border border-cyber-green hover:bg-cyber-green hover:text-black"
          @click="emit('go-next')"
        >
          <span>Next</span>
          <IconArrowRight class="w-4 h-4" />
        </button>
      </div>

      <!-- Vote Button -->
      <button
        class="w-full flex items-center justify-center space-x-2 py-2 px-3 text-xs font-medium uppercase shadow-sm transition-all duration-200"
        :class="localHasVoted
          ? 'bg-polkadot-pink text-white border border-polkadot-pink'
          : 'text-cyber-green border border-cyber-green hover:bg-polkadot-pink hover:text-white hover:border-polkadot-pink'"
        :disabled="isVoting"
        @click="handleVote"
      >
        <IconUpvote class="w-5 h-5" />
        <span>{{ localVotes }} {{ isVoting ? 'updating...' : 'upvotes' }}</span>
      </button>
    </div>
  </TerminalContainer>
</template>
