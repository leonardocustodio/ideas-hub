<script setup lang="ts">
import CommentsSingle from '~/components/comments/CommentsSingle.vue';

interface Comment {
  id: number;
  author: string;
  timeAgo: string;
  text: string;
}

interface Props {
  comments: Comment[];
}

defineProps<Props>();
</script>

<template>
  <div class="space-y-4 px-3 sm:px-6 lg:px-6 py-3">
    <CommentsSingle
      v-for="comment in comments"
      :key="comment.id"
      :author="comment.author"
      :time-ago="comment.timeAgo"
      :text="comment.text"
    />
  </div>
</template>
