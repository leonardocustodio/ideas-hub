<script setup lang="ts">
import IconLightbulb from "~/components/icon/IconLightbulb.vue";
import IconArrowLeft from "~/components/icon/IconArrowLeft.vue";

const emit = defineEmits<{
  back: [];
}>();
</script>

<template>
  <div class="p-4 sm:p-6 border-b border-cyber-blue/30">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 sm:w-12 sm:h-12 bg-darker-bg border border-polkadot-pink flex items-center justify-center">
          <IconLightbulb class="w-6 h-6 text-polkadot-pink" />
        </div>
        <div>
          <h2 class="text-xl sm:text-2xl font-bold cyber-heading">UPLOAD_IDEA</h2>
          <p class="text-text-secondary text-sm">> TRANSMIT_INNOVATION_DATA</p>
        </div>
      </div>
      <button
        class="flex items-center justify-center space-x-2 py-1.5 px-3 text-xs font-medium uppercase shadow-sm transition-all duration-200 text-cyber-green border border-cyber-green hover:bg-cyber-green hover:text-black"
        @click="emit('back')"
      >
        <IconArrowLeft class="w-4 h-4 hidden sm:block" />
        <span>Back</span>
      </button>
    </div>
  </div>
</template>
