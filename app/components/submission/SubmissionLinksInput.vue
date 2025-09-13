<script setup lang="ts">
import type { Component } from 'vue';
import CyberFormField from '~/components/ui/form/CyberFormField.vue';
import IconPlus from '~/components/icon/IconPlus.vue';
import IconMinus from '~/components/icon/IconMinus.vue';

interface Props {
  modelValue: string;
  name: string;
  label: string;
  icon?: Component;
  hint?: string;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'HTTPS://DOCUMENTATION_LINK',
  icon: undefined,
  hint: undefined
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

// Initialize link inputs from modelValue (newline-separated string)
const linkInputs = ref<string[]>(
  props.modelValue ? props.modelValue.split('\n').filter(Boolean) : ['']
);

// Watch for changes in linkInputs and emit the combined value
watch(linkInputs, (newInputs) => {
  const validLinks = newInputs.filter(link => link.trim());
  emit('update:modelValue', validLinks.join('\n'));
}, { deep: true });

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
  const newLinks = newValue ? newValue.split('\n').filter(Boolean) : [''];
  if (JSON.stringify(newLinks) !== JSON.stringify(linkInputs.value.filter(Boolean))) {
    linkInputs.value = newLinks.length > 0 ? newLinks : [''];
  }
});

const addLinkInput = () => {
  linkInputs.value.push('');
};

const removeLinkInput = (index: number) => {
  if (linkInputs.value.length > 1) {
    linkInputs.value.splice(index, 1);
  }
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
      <div
        v-for="(link, index) in linkInputs"
        :key="index"
        class="flex items-center space-x-3"
      >
        <UInput
          v-model="linkInputs[index]"
          type="url"
          :placeholder="placeholder"
          class="flex-1"
        />
        <button
          v-if="linkInputs.length > 1"
          type="button"
          class="w-12 h-12 bg-darker-bg hover:bg-neon-red text-neon-red hover:text-black border border-neon-red flex items-center justify-center transition-colors"
          @click="removeLinkInput(index)"
        >
          <IconMinus class="w-4 h-4" />
        </button>
      </div>
      <button
        type="button"
        class="flex items-center space-x-2 text-cyber-blue hover:text-cyber-green transition-colors text-sm font-medium uppercase tracking-wider"
        @click="addLinkInput"
      >
        <IconPlus class="w-4 h-4" />
        <span>ADD_MORE_LINKS</span>
      </button>
    </div>
  </CyberFormField>
</template>