<script setup lang="ts">
import type { Component } from 'vue';
import CyberFormField from '~/components/ui/form/CyberFormField.vue';

interface Props {
  modelValue: string;
  name: string;
  label: string;
  icon?: Component;
  hint?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  rows: 4,
  icon: undefined,
  hint: undefined,
  placeholder: undefined
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});
</script>

<template>
  <CyberFormField
    :name="name"
    :label="label"
    :icon="icon"
    :hint="hint"
    :required="required"
  >
    <UTextarea
      v-model="value"
      :placeholder="placeholder"
      :rows="rows"
      :required="required"
    />
  </CyberFormField>
</template>