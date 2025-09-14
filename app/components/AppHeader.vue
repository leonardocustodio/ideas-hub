<script setup lang="ts">
import NavigationBar from "~/components/NavigationBar.vue";

const currentTime = ref('');

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
});

const goToSubmit = () => {
  navigateTo('/submit');
};

const goToHome = () => {
  navigateTo('/');
};
</script>

<template>
  <header class="relative z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="relative">
        <TerminalContainer
          :scan-lines="true"
          header-title="SYSTEM"
          header-subtitle="POLKADOT_HUB_V0.1"
          :header-right-content="currentTime"
          :clip-corners="['ClipTopRight', 'ClipBottomLeft']"
        >
          <NavigationBar
            :current-time="currentTime"
            @go-to-home="goToHome"
            @go-to-submit="goToSubmit"
          />
        </TerminalContainer>
      </div>
    </div>
  </header>
</template>
