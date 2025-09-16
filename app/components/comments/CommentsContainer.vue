<script setup lang="ts">
import { computed } from 'vue';
import CommentsList from '~/components/comments/CommentsList.vue';
import CommentsForm from '~/components/comments/CommentsForm.vue';

interface Props {
  ideaId: number;
}

const props = defineProps<Props>();
const isSubmittingComment = ref(false);

// Fetch comments from API
const { data: dbComments, refresh } = await useFetch(`/api/ideas/${props.ideaId}/comments`);

// Transform comments for display
const comments = computed(() => {
  if (!dbComments.value) return [];

  return dbComments.value.map(comment => ({
    id: comment.id,
    author: comment.author || 'Anonymous',
    timeAgo: getRelativeTime(comment.createdAt),
    text: comment.comment
  }));
});

const getRelativeTime = (date: Date | string): string => {
  const now = new Date();
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  }
};

const handleSubmitComment = async (name: string, text: string) => {
  isSubmittingComment.value = true;
  try {
    // Submit comment to API
    await $fetch(`/api/ideas/${props.ideaId}/comments`, {
      method: 'POST',
      body: {
        author: name,
        comment: text
      }
    });

    // Refresh comments list after successful submission
    await refresh();
  } catch (error) {
    console.error('Failed to submit comment:', error);
    // TODO: Show error message to user
  } finally {
    isSubmittingComment.value = false;
  }
};
</script>

<template>
  <TerminalContainer header-title="INPUT" header-subtitle="DISCUSSION">

    <!-- Comment Form -->
    <CommentsForm
      :is-submitting="isSubmittingComment"
      @submit="handleSubmitComment"
    />

    <!-- Comments List -->
    <CommentsList :comments="comments" />
  </TerminalContainer>
</template>