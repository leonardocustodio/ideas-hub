<script setup lang="ts">

type ClipCorner = 'ClipTopRight' | 'ClipTopLeft' | 'ClipBottomRight' | 'ClipBottomLeft';

interface Props {
  headerTitle?: string;
  headerSubtitle?: string;
  headerRightContent?: string;
  clipCorners?: ClipCorner[];
}

const props = withDefaults(defineProps<Props>(), {
  clipCorners: () => ['ClipTopLeft', 'ClipBottomRight'],
  headerTitle: undefined,
  headerSubtitle: undefined,
  headerRightContent: undefined
});

const clipPathStyle = computed(() => {
  const corners = props.clipCorners || [];
  
  // Default: no clipping
  let polygon = '0 0, 100% 0, 100% 100%, 0 100%';
  
  // Build polygon based on which corners to clip
  const clipSize = '15px';
  const hasTopLeft = corners.includes('ClipTopLeft');
  const hasTopRight = corners.includes('ClipTopRight');
  const hasBottomLeft = corners.includes('ClipBottomLeft');
  const hasBottomRight = corners.includes('ClipBottomRight');
  
  // Build the polygon points
  const points: string[] = [];
  
  // Top-left corner
  if (hasTopLeft) {
    points.push(`${clipSize} 0`);
  } else {
    points.push('0 0');
  }
  
  // Top-right corner
  if (hasTopRight) {
    points.push(`calc(100% - ${clipSize}) 0`);
    points.push(`100% ${clipSize}`);
  } else {
    points.push('100% 0');
  }
  
  // Bottom-right corner
  if (hasBottomRight) {
    points.push(`100% calc(100% - ${clipSize})`);
    points.push(`calc(100% - ${clipSize}) 100%`);
  } else {
    points.push('100% 100%');
  }
  
  // Bottom-left corner
  if (hasBottomLeft) {
    points.push(`${clipSize} 100%`);
    points.push(`0 calc(100% - ${clipSize})`);
  } else {
    points.push('0 100%');
  }
  
  // Top-left corner (closing the path)
  if (hasTopLeft) {
    points.push(`0 ${clipSize}`);
  }
  
  polygon = points.join(', ');
  
  return {
    clipPath: `polygon(${polygon})`
  };
});
</script>

<template>
  <div
    class="terminal-window scan-lines"
    :style="clipPathStyle"
  >
    <TerminalHeader
      v-if="headerTitle || headerSubtitle || headerRightContent"
      :title="headerTitle"
      :subtitle="headerSubtitle"
      :right-content="headerRightContent"
      class="px-4 sm:px-6 lg:px-6 py-3"
    />
    <slot name="header" />
    <slot />
  </div>
</template>
