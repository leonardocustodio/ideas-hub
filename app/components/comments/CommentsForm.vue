<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  submit: [name: string, text: string];
}>();

const commenterName = ref('');
const commentText = ref('');

const handleSubmit = () => {
  if (commentText.value.trim()) {
    emit('submit', commenterName.value || 'Anonymous', commentText.value);
    // Clear form
    commenterName.value = '';
    commentText.value = '';
  }
};
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-6 pt-3">
    <div class="space-y-4">
      <!-- Name Field -->
      <div class="space-y-2">
        <input
          v-model="commenterName"
          type="text"
          class="w-full px-4 py-3 border border-cyber-blue focus:border-cyber-green focus:ring-0 transition-all duration-200 bg-darker-bg text-text-primary"
          style="outline: none;"
          placeholder="Enter your name"
        >
      </div>

      <!-- Comment Textarea with Embedded Button -->
      <div class="relative">
        <textarea
          v-model="commentText"
          placeholder="What do you think? ..."
          class="w-full px-4 py-3 pr-24 border border-cyber-blue focus:border-cyber-green focus:ring-0 transition-all duration-200 bg-darker-bg text-text-primary resize-none"
          style="outline: none;"
          rows="4"
          @keydown.enter.ctrl="handleSubmit"
        />

        <!-- Submit Button Inside Textarea -->
        <button
          class="absolute bottom-3 right-1.5 cyber-btn-primary text-sm !py-2 !px-4"
          @click="handleSubmit"
        >
          Comment
        </button>
      </div>
    </div>
  </div>
</template>
