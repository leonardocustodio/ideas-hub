<script setup lang="ts">
const handleSubmit = async (formData: IdeaFormData) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  const ideasStore = useIdeasStore();
  ideasStore.addIdea(formData);

  // Navigate back to home
  navigateTo('/');
};

const handleBack = () => {
  navigateTo('/');
};
</script>

<template>
  <div>

    <AppContainer>
      <SubmissionContainer
        @back="handleBack"
        @submit="handleSubmit"
      />
    </AppContainer>
  </div>
</template>
