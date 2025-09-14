<script setup lang="ts">
import type { Component } from 'vue';
import CyberFormField from '~/components/ui/form/CyberFormField.vue';
import IconClose from '~/components/icon/IconClose.vue';

interface Props {
  modelValue: File | null;
  name: string;
  label: string;
  icon?: Component;
  hint?: string;
  accept?: string;
  buttonText?: string;
  helpText?: string;
  fileIcon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  accept: 'image/*',
  buttonText: 'CHOOSE_FILE',
  helpText: 'MAX_SIZE_5MB',
  fileIcon: '🖼️',
  icon: undefined,
  hint: undefined
});

const emit = defineEmits<{
  'update:modelValue': [value: File | null];
}>();

const fileInputRef = ref<HTMLInputElement>();

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    emit('update:modelValue', target.files[0]);
  }
};

const removeFile = () => {
  emit('update:modelValue', null);
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
};

const fileSizeMB = computed(() => {
  if (!props.modelValue) return '0';
  return (props.modelValue.size / 1024 / 1024).toFixed(2);
});
</script>

<template>
  <CyberFormField
    :name="name"
    :label="label"
    :icon="icon"
    :hint="hint"
  >
    <div class="space-y-3">
      <div class="flex items-center space-x-4">
        <input
          ref="fileInputRef"
          type="file"
          :accept="accept"
          class="hidden"
          @change="handleFileUpload"
        >
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

      <div v-if="modelValue" class="flex items-center space-x-3">
        <div class="flex-1 h-12 bg-darker-bg border border-cyber-blue flex items-center px-4">
          <div class="flex items-center space-x-3">
            <span class="text-cyber-purple">{{ fileIcon }}</span>
            <span class="text-sm text-text-primary">{{ modelValue.name }}</span>
            <span class="text-xs text-text-secondary">({{ fileSizeMB }} MB)</span>
          </div>
        </div>
        <button
          type="button"
          class="w-12 h-12 bg-darker-bg hover:bg-neon-red text-neon-red hover:text-black border border-neon-red flex items-center justify-center transition-colors"
          @click="removeFile"
        >
          <IconClose class="w-4 h-4" />
        </button>
      </div>
    </div>
  </CyberFormField>
</template>