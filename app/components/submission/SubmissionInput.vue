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
  type?: string;
  maxlength?: number;
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  type: 'text',
  icon: undefined,
  hint: undefined,
  placeholder: undefined,
  maxlength: undefined
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
    <UInput
      v-model="value"
      :type="type"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :required="required"
    />
  </CyberFormField>
</template>