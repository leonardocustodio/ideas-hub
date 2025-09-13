<script setup lang="ts">
import type { Component } from 'vue';
import CyberFormField from '~/components/ui/form/CyberFormField.vue';
import IconUpload from '~/components/icon/IconUpload.vue';
import IconClose from '~/components/icon/IconClose.vue';

interface Props {
  modelValue: File[];
  name: string;
  label: string;
  icon?: Component;
  hint?: string;
  accept?: string;
  buttonText?: string;
  helpText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  accept: 'image/*',
  buttonText: 'SELECT_FILES',
  helpText: 'IMAGES_MAX_10MB',
  icon: undefined,
  hint: undefined
});

const emit = defineEmits<{
  'update:modelValue': [value: File[]];
}>();

const fileInputRef = ref<HTMLInputElement>();

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    emit('update:modelValue', Array.from(target.files));
  }
};

const removeFile = (index: number) => {
  const newFiles = [...props.modelValue];
  newFiles.splice(index, 1);
  emit('update:modelValue', newFiles);
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
};

const getFileIcon = (file: File): string => {
  if (file.type.startsWith('image/')) return '🖼️';
  if (file.type.startsWith('video/')) return '🎥';
  if (file.type.includes('pdf')) return '📄';
  return '📎';
};

const getFileSizeMB = (file: File): string => {
  return (file.size / 1024 / 1024).toFixed(2);
};
</script>

<template>
  <CyberFormField
    :name="name"
    :label="label"
    :icon="icon"
    :hint="hint"
  >
    <div class="space-y-3">
      <div class="border-2 border-dashed border-cyber-blue p-8 text-center hover:border-cyber-green hover:bg-cyber-green/5 transition-all duration-300 bg-darker-bg/50">
        <input
          ref="fileInputRef"
          type="file"
          multiple
          :accept="accept"
          class="hidden"
          @change="handleFileUpload"
        >
        <div class="space-y-3">
          <div class="w-16 h-16 bg-darker-bg border border-cyber-purple flex items-center justify-center mx-auto">
            <IconUpload class="w-8 h-8 text-cyber-purple" />
          </div>
          <button
            type="button"
            class="cyber-btn-secondary"
            @click="fileInputRef?.click()"
          >
            {{ buttonText }}
          </button>
          <p class="text-text-secondary text-sm">
            {{ helpText }}
          </p>
        </div>
      </div>

      <div v-if="modelValue.length > 0" class="space-y-3">
        <div
          v-for="(file, index) in modelValue"
          :key="index"
          class="flex items-center space-x-3"
        >
          <div class="flex-1 h-12 bg-darker-bg border border-cyber-blue flex items-center px-4">
            <div class="flex items-center space-x-3">
              <span class="text-cyber-purple">{{ getFileIcon(file) }}</span>
              <span class="text-sm text-text-primary">{{ file.name }}</span>
              <span class="text-xs text-text-secondary">({{ getFileSizeMB(file) }} MB)</span>
            </div>
          </div>
          <button
            type="button"
            class="w-12 h-12 bg-darker-bg hover:bg-neon-red text-neon-red hover:text-black border border-neon-red flex items-center justify-center transition-colors"
            @click="removeFile(index)"
          >
            <IconClose class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </CyberFormField>
</template>