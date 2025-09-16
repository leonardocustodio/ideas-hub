<script setup lang="ts">
import IconPlus from "~/components/icon/IconPlus.vue";

interface Props {
  currentTime?: string;
}

defineProps<Props>();

const emit = defineEmits<{
  goToSubmit: [];
  goToHome: [];
  goToInstructions: [];
}>();

const handleGoToHome = () => {
  emit('goToHome');
};

const handleGoToSubmit = () => {
  emit('goToSubmit');
};

const handleGoToInstructions = () => {
  emit('goToInstructions');
};
</script>

<template>
  <div class="flex items-center justify-between px-4 sm:px-6 lg:px-6 py-3">
    <div class="flex items-center space-x-4 cursor-pointer group" @click="handleGoToHome">
      <PolkadotToken
        color="white"
        class="h-12 w-auto"
      />
      <div>
        <h1 class="text-xl cyber-heading" data-text="IDEAS_HUB">IDEAS_HUB</h1>
        <p class="text-cyber-blue text-xs uppercase tracking-wider">
          > INNOVATION_PROTOCOL_ACTIVE
        </p>
      </div>
    </div>

    <div class="flex items-center space-x-4">
      <div class="hidden sm:flex items-center space-x-2 text-xs">
        <span class="text-cyber-green">STATUS:</span>
        <span class="text-cyber-blue animate-cyber-flicker">ONLINE</span>
      </div>
      <button
        class="text-text-secondary hover:text-cyber-blue transition-colors text-sm"
        @click="handleGoToInstructions"
      >
        HELP
      </button>
      <button
        class="cyber-btn-primary flex items-center justify-center sm:space-x-2 !px-3 sm:!px-8"
        @click="handleGoToSubmit"
      >
        <IconPlus class="w-5 h-5" />
        <span class="hidden sm:inline">SUBMIT</span>
      </button>
    </div>
  </div>
</template>
