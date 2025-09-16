<script setup lang="ts">
import { ref, computed } from 'vue';
import IconUpvote from "~/components/icon/IconUpvote.vue";
import IconComment from "~/components/icon/IconComment.vue";

const props = defineProps<{
  idea: Idea;
  index: number;
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

const goToIdea = (ideaId: string) => {
  navigateTo(`/idea/${ideaId}`);
};
</script>

<template>
  <div class="flex items-stretch border-b border-cyber-blue/20 last:border-b-0 hover:bg-cyber-blue/5 transition-all duration-300 group scan-lines">
    <div
      class="flex-1 p-6 hologram-effect cursor-pointer hover:bg-cyber-pink/5 transition-all duration-300"
      @click="goToIdea(idea.id)"
    >
      <div class="flex items-start mb-3">
        <!-- Thumbnail -->
        <div v-if="idea.icon" class="w-12 h-12 bg-darker-bg flex-shrink-0 border border-cyber-blue/30 overflow-hidden mr-4">
          <img
            :src="idea.icon"
            :alt="idea.name"
            class="w-full h-full object-cover"
          >
        </div>

        <div class="flex-1">
          <h3 class="text-base sm:text-lg font-bold cyber-text mb-2 uppercase group-hover:text-cyber-blue transition-colors" style="font-family: 'Orbitron', monospace;">
            <span class="text-polkadot-pink mr-2">#{{ String(index + 1).padStart(3, '0') }}</span>
            <span class="group-hover:text-cyber-glow">{{ idea.name }}</span>
          </h3>
          <p class="text-text-primary leading-relaxed text-sm">
            {{ idea.tagline }}
          </p>
        </div>
      </div>

      <div class="flex items-center justify-between text-sm">
        <div v-if="idea.tags && idea.tags.length > 0" class="hidden sm:flex items-center space-x-2 flex-wrap">
          <span class="text-cyber-blue text-xs">> TAGS:</span>
          <div class="flex items-center space-x-2">
            <span
            v-for="tag in idea.tags.slice(0, 3)"
            :key="tag"
            class="cyber-tag"
          >
            {{ tag }}
          </span>
          <span v-if="idea.tags.length > 3" class="text-xs text-text-secondary">
            +{{ idea.tags.length - 3 }}_MORE
          </span>
          </div>
        </div>

        <div class="flex items-center space-x-4 text-xs">
          <span class="text-cyber-green">AUTHOR:</span>
          <span class="text-text-accent uppercase">{{ idea.author }}</span>
        </div>
      </div>
    </div>

    <!-- Control Panel -->
    <div class="w-20 bg-darker-bg border-l border-cyber-blue/30 flex flex-col">
      <button
        class="flex-1 flex flex-col items-center justify-center transition-all duration-300 group/vote"
        :class="[
          localHasVoted
            ? 'bg-polkadot-pink text-white border-polkadot-pink'
            : 'text-text-secondary hover:text-cyber-blue hover:bg-cyber-blue/10'
        ]"
        :disabled="isVoting"
        @click="handleVote"
      >
        <IconUpvote class="size-5 mb-1 group-hover/vote:animate-cyber-pulse" />
        <span class="text-xs font-bold">{{ localVotes }}</span>
        <span class="text-xs opacity-60">{{ isVoting ? 'WAIT' : 'VOTE' }}</span>
      </button>

      <div class="h-px bg-cyber-blue/30"/>

      <button
        class="flex-1 flex flex-col items-center justify-center text-text-secondary hover:text-cyber-green hover:bg-cyber-green/10 transition-all duration-300 group/comment"
        @click="goToIdea(idea.id)">
        <IconComment class="size-5 mb-1 group-hover/comment:animate-cyber-pulse" />
        <span class="text-xs font-bold">0</span>
        <span class="text-xs opacity-60">MSG</span>
      </button>
    </div>
  </div>
</template>
