<script setup lang="ts">
import IconSpinner from "~/components/icon/IconSpinner.vue";
import IconSend from "~/components/icon/IconSend.vue";

interface Props {
  isSubmitting?: boolean;
}

withDefaults(defineProps<Props>(), {
  isSubmitting: false
});

const emit = defineEmits<{
  back: [];
  submit: [];
}>();
</script>

<template>
  <div class="bg-darker-bg/50 p-6 border-t border-cyber-blue/30">
    <div class="flex items-center justify-between">
      <button
        type="button"
        class="cyber-btn-secondary"
        :disabled="isSubmitting"
        @click="emit('back')"
      >
        ABORT
      </button>
      <button
        type="button"
        class="cyber-btn-primary flex items-center"
        :disabled="isSubmitting"
        @click="emit('submit')"
      >
        <IconSpinner v-if="isSubmitting" class="w-5 h-5 mr-2" />
        <IconSend v-else class="w-5 h-5 mr-2" />
        {{ isSubmitting ? 'TRANSMITTING...' : 'EXECUTE_UPLOAD' }}
      </button>
    </div>
  </div>
</template>