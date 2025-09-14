<script setup lang="ts">
interface Props {
  links?: string[];
}

defineProps<Props>();
</script>

<template>
  <TerminalContainer v-if="links && links.length > 0" header-title="LINKS" header-subtitle="REFERENCE">
    <div>
      <a
        v-for="(link, index) in links"
        :key="index"
        :href="link"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center space-x-3 p-4 hover:bg-cyber-blue/20 transition-colors group border border-cyber-blue/20"
      >
        <p class="text-text-primary font-medium uppercase">{{ link }}</p>
      </a>
    </div>
  </TerminalContainer>
</template>