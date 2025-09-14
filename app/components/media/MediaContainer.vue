<script setup lang="ts">
import { ref } from 'vue';
import IconDocument from "~/components/icon/IconDocument.vue";
import IconArrowRight from "~/components/icon/IconArrowRight.vue";
import IconArrowLeft from "~/components/icon/IconArrowLeft.vue";

interface Props {
  idea: Idea;
}

const props = defineProps<Props>();

const currentSlide = ref(0);
const carouselRef = ref<HTMLElement>();

const nextSlide = () => {
  const totalSlides = (props.idea.mockImages?.length || 0) + props.idea.attachments.length;
  if (totalSlides > 0) {
    currentSlide.value = (currentSlide.value + 1) % totalSlides;
    // Scroll the carousel
    if (carouselRef.value) {
      const slideWidth = 320 + 16; // w-80 (320px) + space-x-4 (16px)
      carouselRef.value.scrollTo({
        left: currentSlide.value * slideWidth,
        behavior: 'smooth'
      });
    }
  }
};

const prevSlide = () => {
  const totalSlides = (props.idea.mockImages?.length || 0) + props.idea.attachments.length;
  if (totalSlides > 0) {
    currentSlide.value = currentSlide.value === 0 ? totalSlides - 1 : currentSlide.value - 1;
    // Scroll the carousel
    if (carouselRef.value) {
      const slideWidth = 320 + 16; // w-80 (320px) + space-x-4 (16px)
      carouselRef.value.scrollTo({
        left: currentSlide.value * slideWidth,
        behavior: 'smooth'
      });
    }
  }
};

const getAttachmentUrl = (file: File): string => {
  if (import.meta.client && window.URL) {
    return window.URL.createObjectURL(file);
  }
  return '';
};

const hasMedia = computed(() => {
  return (props.idea.attachments && props.idea.attachments.length > 0) || 
         (props.idea.mockImages && props.idea.mockImages.length > 0);
});

const totalSlides = computed(() => {
  return (props.idea.mockImages?.length || 0) + props.idea.attachments.length;
});
</script>

<template>
  <TerminalContainer v-if="hasMedia" header-title="MEDIA" header-subtitle="ATTACHMENTS">

      <!-- Horizontal Scrolling Container -->
      <div class="relative">
        <!-- Scroll Container -->
        <div ref="carouselRef" class="flex space-x-4 overflow-x-auto overflow-y-hidden scroll-smooth media-carousel">
          <!-- Mock Images -->
          <div
            v-for="(imageUrl, index) in idea.mockImages"
            :key="`mock-${index}`"
            class="flex-shrink-0 w-80 h-48 bg-darker-bg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 border border-cyber-blue/20"
            @click="currentSlide = index"
          >
            <video
              v-if="imageUrl.includes('.mp4')"
              controls
              class="w-full h-full object-cover"
              preload="metadata"
            >
              <source :src="imageUrl" type="video/mp4">
              Your browser does not support the video tag.
            </video>
            <NuxtImg
              v-else
              :src="imageUrl"
              :alt="`Media ${index + 1}`"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- File Attachments -->
          <div
            v-for="(attachment, index) in idea.attachments"
            :key="`file-${index}`"
            class="flex-shrink-0 w-80 h-48 bg-darker-bg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 border border-cyber-blue/20"
            @click="currentSlide = (idea.mockImages?.length || 0) + index"
          >
            <NuxtImg
              v-if="attachment.type.startsWith('image/')"
              :src="getAttachmentUrl(attachment)"
              :alt="`Attachment ${index + 1}`"
              class="w-full h-full object-cover"
            />
            <video
              v-else-if="attachment.type.startsWith('video/')"
              controls
              class="w-full h-full object-cover"
            >
              <source :src="getAttachmentUrl(attachment)" :type="attachment.type">
              Your browser does not support the video tag.
            </video>
            <!-- Fallback for other file types -->
            <div
              v-else
              class="w-full h-full flex items-center justify-center bg-darker-bg border border-cyber-blue/20"
            >
              <div class="text-center">
                <IconDocument class="w-12 h-12 text-cyber-blue mx-auto mb-2" />
                <p class="text-sm text-text-secondary font-medium">{{ attachment.name }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Arrows -->
        <button
          v-if="currentSlide > 0"
          class="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-darker-bg hover:bg-cyber-green shadow-lg hover:shadow-xl text-cyber-blue hover:text-black flex items-center justify-center transition-all duration-200 z-10 border border-cyber-blue/30 hover:border-cyber-green"
          @click="prevSlide"
        >
          <IconArrowLeft class="w-6 h-6" />
        </button>
        <button
          v-if="totalSlides > 1"
          class="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-darker-bg hover:bg-cyber-green shadow-lg hover:shadow-xl text-cyber-blue hover:text-black flex items-center justify-center transition-all duration-200 z-10 border border-cyber-blue/30 hover:border-cyber-green"
          @click="nextSlide"
        >
          <IconArrowRight class="w-6 h-6" />
        </button>
      </div>
  </TerminalContainer>
</template>