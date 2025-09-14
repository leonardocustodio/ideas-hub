<script setup lang="ts">
import type { IdeaFormData } from '~/types';

const emit = defineEmits<{
  back: [];
  submit: [formData: IdeaFormData];
}>();

const isSubmitting = ref(false);
const submissionFormRef = ref();

const handleSubmit = async (formData: IdeaFormData) => {
  isSubmitting.value = true;
  try {
    emit('submit', formData);
  } catch (error) {
    console.error('Error submitting idea:', error);
  } finally {
    isSubmitting.value = false;
  }
};

const triggerSubmit = () => {
  submissionFormRef.value?.submitForm();
};

defineExpose({
  isSubmitting
});
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
      :is-submitting="isSubmitting"
      @back="emit('back')"
      @submit="triggerSubmit"
    />
  </TerminalContainer>
</template>
