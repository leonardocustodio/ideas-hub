<script setup lang="ts">
import type { Component } from 'vue';

interface Props {
  name: string;
  label: string;
  icon?: Component;
  hint?: string;
  required?: boolean;
}

withDefaults(defineProps<Props>(), {
  required: false,
  icon: undefined,
  hint: undefined
});
</script>

<template>
  <UFormField :name="name" :hint="hint?.toUpperCase()" class="space-y-2">
    <template #label>
      <div class="flex items-center font-bold text-cyber-green uppercase tracking-wider">
        <div v-if="icon" class="w-6 h-6 bg-darker-bg border border-cyber-green flex items-center justify-center mr-2">
          <component :is="icon" class="w-3 h-3 text-cyber-green" />
        </div>
        {{ label }} <span v-if="required" class="ml-1">*</span>
      </div>
    </template>
    <slot />
  </UFormField>
</template>
