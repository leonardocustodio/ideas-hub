<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface MatrixColumn {
  left: string;
  animationDelay: string;
  animationDuration: string;
  text: string;
}

const matrixColumns = ref<MatrixColumn[]>([]);

onMounted(() => {
  matrixColumns.value = Array.from({ length: 50 }, () => ({
    left: Math.random() * 100 + '%',
    animationDelay: Math.random() * 10 + 's',
    animationDuration: (Math.random() * 10 + 10) + 's',
    text: '01'.repeat(20).split('').map(() => Math.random() > 0.5 ? '1' : '0').join('')
  }));
});
</script>

<template>
  <div class="matrix-rain">
    <div
      v-for="(column, index) in matrixColumns"
      :key="index"
      class="matrix-column"
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
.matrix-rain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.matrix-column {
  position: absolute;
  top: -100vh;
  color: #00FF41;
  font-size: 14px;
  line-height: 1.2;
  animation: matrixChar 10s linear infinite;
  opacity: 0.3;
  writing-mode: vertical-rl;
  text-orientation: upright;
  filter: blur(0.5px);
}

@keyframes matrixChar {
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