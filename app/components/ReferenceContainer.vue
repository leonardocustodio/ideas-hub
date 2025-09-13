<script setup lang="ts">
import IconExternalLink from "~/components/icon/IconExternalLink.vue";

interface Props {
  links?: string[];
}

defineProps<Props>();
</script>

<template>
  <TerminalContainer v-if="links && links.length > 0" header-title="REFERENCE" header-subtitle="LINKS">
    <div>
      <a
        v-for="(link, index) in links"
        :key="index"
        :href="link"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center space-x-3 p-4 hover:bg-cyber-blue/20 transition-colors group border border-cyber-blue/20"
      >
        <div class="w-10 h-10 bg-darker-bg flex items-center justify-center shadow-sm border border-cyber-blue/30">
          <IconExternalLink class="w-5 h-5 text-cyber-blue" />
        </div>
        <div class="flex-1">
          <p class="text-text-primary font-medium uppercase">{{ link }}</p>
          <p class="text-text-secondary text-sm uppercase">External Link</p>
        </div>
      </a>
    </div>
  </TerminalContainer>
</template>