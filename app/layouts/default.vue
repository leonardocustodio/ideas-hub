<template>
  <div class="min-h-screen relative">
    <HashRain />
    <NuxtLoadingIndicator
      :height="3"
      :color="'#FF0080'"
      :duration="3000"
    />
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>
