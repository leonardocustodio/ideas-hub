<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface HashColumn {
  left: string;
  animationDelay: string;
  animationDuration: string;
  text: string;
}

const hashColumns = ref<HashColumn[]>([]);

onMounted(() => {
  const hexChars = '0123456789ABCDEF';
  hashColumns.value = Array.from({ length: 50 }, () => ({
    left: Math.random() * 100 + '%',
    animationDelay: Math.random() * 10 + 's',
    animationDuration: (Math.random() * 10 + 10) + 's',
    text: Array.from({ length: 40 }, () => hexChars[Math.floor(Math.random() * 16)]).join('')
  }));
});
</script>

<template>
  <div class="hash-rain">
    <div
      v-for="(column, index) in hashColumns"
      :key="index"
      class="hash-column"
      :style="{
        left: column.left,
        animationDelay: column.animationDelay,
        animationDuration: column.animationDuration
      }"
    >
      {{ column.text }}
    </div>
  </div>
</template>

<style scoped>
.hash-rain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.hash-column {
  position: absolute;
  top: -100vh;
  color: #00FF41;
  font-size: 14px;
  line-height: 1.2;
  animation: hashChar 10s linear infinite;
  opacity: 0.3;
  writing-mode: vertical-rl;
  text-orientation: upright;
  filter: blur(0.5px);
}

@keyframes hashChar {
  0% {
    top: -100vh;
    opacity: 0;
  }
  10% {
    opacity: 0.3;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    top: 100vh;
    opacity: 0;
  }
}
</style>