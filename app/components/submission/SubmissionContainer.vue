<script setup lang="ts">
import type { IdeaFormData } from '~/types';

const emit = defineEmits<{
  back: [];
  submit: [formData: IdeaFormData];
}>();

const props = defineProps<{
  isSubmitting?: boolean;
}>();

const submissionFormRef = ref();

const handleSubmit = async (formData: IdeaFormData) => {
  emit('submit', formData);
};

const triggerSubmit = () => {
  submissionFormRef.value?.submitForm();
};
</script>

<template>
  <TerminalContainer
    header-title="SUBMIT"
    header-subtitle="IDEA_INTERFACE_V0.1"
  >
    <SubmissionHeader @back="emit('back')" />

    <SubmissionForm
      ref="submissionFormRef"
      @submit="handleSubmit"
    />

    <SubmissionFooter
      :is-submitting="props.isSubmitting"
      @back="emit('back')"
      @submit="triggerSubmit"
    />
  </TerminalContainer>
</template>
