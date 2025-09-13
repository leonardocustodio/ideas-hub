<script setup lang="ts">
import IconPlus from "~/components/icon/IconPlus.vue";
import IconLightbulb from "~/components/icon/IconLightbulb.vue";

const emit = defineEmits<{
  'create-idea': [];
}>();
</script>

<template>
  <TerminalContainer
    header-title="MESSAGE"
    header-subtitle="NO_DATA_FOUND"
    :clip-corners="['ClipTopLeft', 'ClipBottomRight']"
    class="text-center"
  >
    <div class="max-w-md mx-auto py-12">
      <div class="mb-8">
        <div class="size-24 bg-darker-bg border-2 border-polkadot-pink flex items-center justify-center mx-auto">
          <IconLightbulb class="size-12 text-polkadot-pink" />
        </div>
      </div>

      <h3 class="text-2xl font-bold cyber-heading mb-4 glitch-text" data-text="DATABASE_EMPTY">
        DATABASE_EMPTY
      </h3>
      <p class="text-text-secondary mb-8 leading-relaxed">
        > INITIALIZE_FIRST_RECORD<br>
        > EVERY_BREAKTHROUGH_STARTS_WITH_A_SINGLE_IDEA
      </p>

      <button
        class="cyber-btn-primary inline-flex items-center space-x-2 mx-auto"
        @click="emit('create-idea')"
      >
        <IconPlus class="w-5 h-5" />
        <span>INITIALIZE_UPLOAD</span>
      </button>
    </div>
  </TerminalContainer>
</template>
