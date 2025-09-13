<script setup lang="ts">
import { defineProps } from 'vue';
import type { Component } from 'vue';

interface Props {
  icon: Component;
  value: number | string;
  label: string;
  color: 'pink' | 'blue' | 'purple' | 'green';
  showPrefix?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showPrefix: false
});

const colorClasses = {
  pink: {
    bg: 'bg-darker-bg',
    border: 'border-cyber-pink',
    text: 'text-cyber-pink'
  },
  blue: {
    bg: 'bg-darker-bg',
    border: 'border-cyber-blue',
    text: 'text-cyber-blue'
  },
  purple: {
    bg: 'bg-darker-bg',
    border: 'border-cyber-purple',
    text: 'text-cyber-purple'
  },
  green: {
    bg: 'bg-darker-bg',
    border: 'border-cyber-green',
    text: 'text-cyber-green'
  }
};

const classes = colorClasses[props.color];
</script>

<template>
  <div class="stats-card p-4">
    <div class="flex items-center space-x-3">
      <div 
        class="w-10 h-10 flex items-center justify-center"
        :class="[classes.bg, classes.border, 'border']"
      >
        <component 
          :is="icon" 
          class="w-5 h-5"
          :class="classes.text"
        />
      </div>
      <div>
        <div 
          class="text-lg font-bold" 
          :class="classes.text"
          style="font-family: 'Orbitron', monospace;"
        >
          {{ value }}
        </div>
        <div class="text-xs text-text-primary uppercase tracking-wider">
          <span v-if="showPrefix" class="lg:inline hidden">TOTAL_</span>{{ label }}
        </div>
      </div>
    </div>
  </div>
</template>