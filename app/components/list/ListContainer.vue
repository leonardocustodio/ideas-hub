<script setup lang="ts">
import EmptyState from '~/components/EmptyState.vue';

interface Props {
  ideas: Idea[];
  selectedTimeRange: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  setTimeRange: [range: string];
  createIdea: [];
}>();

const timeRanges = ['Latest', 'Trending', 'All-time'];
const showEmpty = ref(false);
const localSelectedOption = ref(props.selectedTimeRange);

const handleSetTimeRange = (option: string) => {
  localSelectedOption.value = option;
  showEmpty.value = false;
  emit('setTimeRange', option);
};

const handleCreateIdea = () => {
  emit('createIdea');
};

const displayedIdeas = computed(() => {
  return showEmpty.value ? [] : props.ideas;
});
</script>

<template>
  <div>
    <!-- Control Panel -->
    <div class="mb-6">
      <ListControl
        :options="timeRanges"
        :selected-option="localSelectedOption"
        @select="handleSetTimeRange"
      />
    </div>

    <!-- Data Stream -->
    <TerminalContainer
      v-if="displayedIdeas.length > 0"
      header-title="STREAM"
      :header-subtitle="`${displayedIdeas.length}_RECORDS`"
      :clip-corners="['ClipTopRight', 'ClipBottomLeft']"
      class="overflow-hidden"
    >
      <ListTile
        v-for="(idea, index) in displayedIdeas"
        :key="idea.id"
        :idea="idea"
        :index="index"
      />
    </TerminalContainer>

    <EmptyState
      v-else
      @create-idea="handleCreateIdea"
    />
  </div>
</template>
