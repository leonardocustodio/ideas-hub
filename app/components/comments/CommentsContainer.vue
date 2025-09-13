<script setup lang="ts">
import { ref } from 'vue';
import CommentsList from '~/components/comments/CommentsList.vue';
import CommentsForm from '~/components/comments/CommentsForm.vue';

const handleSubmitComment = (name: string, text: string) => {
  // TODO: Implement comment submission
  console.log('Comment submitted:', {
    name,
    text
  });
};

// Sample comments data
const comments = ref([
  {
    id: 1,
    author: 'Sarah Kim',
    timeAgo: '2 hours ago',
    text: "This is exactly what the ecosystem needs! I've been working on something similar and would love to collaborate. The cross-chain functionality you described would solve so many UX issues."
  },
  {
    id: 2,
    author: 'Marcus Rodriguez',
    timeAgo: '5 hours ago',
    text: 'Have you considered the security implications of cross-chain operations? It might be worth exploring some of the existing bridge protocols to see how they handle validation.'
  },
  {
    id: 3,
    author: 'Anonymous',
    timeAgo: '1 day ago',
    text: 'Great idea! This would definitely help with developer adoption. Are you planning to make this open source?'
  }
]);
</script>

<template>
  <TerminalContainer header-title="COMMENTS" header-subtitle="DISCUSSION">

    <!-- Comment Form -->
    <CommentsForm @submit="handleSubmitComment" />

    <!-- Comments List -->
    <CommentsList :comments="comments" />
  </TerminalContainer>
</template>