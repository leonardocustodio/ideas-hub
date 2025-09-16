<script setup lang="ts">
import SidebarControl from "~/components/sidebar/SidebarControl.vue";
import SidebarMetadata from "~/components/sidebar/SidebarMetadata.vue";

interface Props {
  idea: Idea;
  previousIdea: Idea | null;
  nextIdea: Idea | null;
}

defineProps<Props>();

const emit = defineEmits<{
  'go-previous': [];
  'go-next': [];
}>();
</script>

<template>
  <div class="space-y-6">
    <SidebarControl
      :idea="idea"
      :previous-idea="previousIdea"
      :next-idea="nextIdea"
      @go-previous="emit('go-previous')"
      @go-next="emit('go-next')"
    />

    <SidebarMetadata :idea="idea" />
  </div>
</template>
