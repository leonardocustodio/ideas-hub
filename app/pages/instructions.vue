<script setup lang="ts">
import IconInfo from "~/components/icon/IconInfo.vue";
import IconChevronRight from "~/components/icon/IconChevronRight.vue";
import IconLightbulb from "~/components/icon/IconLightbulb.vue";

const handleContinue = () => {
  navigateTo('/submit');
};

const handleBack = () => {
  navigateTo('/');
};

const guidelines = [
  {
    title: "BE_SPECIFIC",
    description: "Clearly articulate your idea with concrete details and potential applications"
  },
  {
    title: "PROVIDE_CONTEXT",
    description: "Explain the problem your idea solves and why it matters to the Polkadot"
  },
  {
    title: "USE_TAGS",
    description: "Add relevant tags to help others discover your idea (e.g., DeFi, NFT, Governance)"
  },
  {
    title: "INCLUDE_VISUALS",
    description: "Upload images or diagrams to better illustrate your concept"
  },
  {
    title: "ADD_LINKS",
    description: "Reference similar projects, research papers, or relevant resources"
  },
  {
    title: "STAY_ON_TOPIC",
    description: "Keep your submission focused on Polkadot ecosystem innovations"
  }
];

const requirements = [
  "Idea name",
  "Tagline - a brief one-liner",
  "At least one relevant tag",
  "Optional: Description explaining your idea in detail, supporting images, videos, or links",
];
</script>

<template>
  <div>
    <AppContainer>
        <TerminalContainer
          header-title="INSTRUCTIONS"
          header-subtitle="GUIDELINES"
          :clip-corners="['ClipTopRight', 'ClipBottomLeft']"
          class="mb-6"
        >
          <div class="p-6">
            <div class="flex items-start space-x-4 mb-6">
              <div class="size-16 bg-darker-bg border-2 border-cyber-blue flex items-center justify-center flex-shrink-0">
                <IconLightbulb class="size-8 text-cyber-blue" />
              </div>
              <div>
                <h2 class="text-2xl font-bold cyber-heading mb-2" data-text="PREPARE_YOUR_SUBMISSION">
                  YOUR_IDEA
                </h2>
                <p class="text-text-secondary">
                  > Follow these guidelines to ensure your idea gets the attention it deserves
                </p>
              </div>
            </div>

            <!-- Guidelines Grid -->
            <div class="grid md:grid-cols-2 gap-4 mb-8">
              <div
                v-for="(guideline, index) in guidelines"
                :key="index"
                class="bg-darker-bg border border-accent-purple/30 p-4 relative group hover:border-cyber-blue transition-colors"
              >
                <div class="flex items-start space-x-3">
                  <span class="text-cyber-green font-mono text-sm">{{ String(index + 1).padStart(2, '0') }}</span>
                  <div class="flex-1">
                    <h3 class="text-polkadot-pink font-bold mb-1">{{ guideline.title }}</h3>
                    <p class="text-text-secondary text-sm">{{ guideline.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Requirements Section -->
            <div class="bg-darker-bg border border-cyber-blue/30 p-6 mb-6">
              <h3 class="text-lg font-bold text-cyber-blue mb-4 flex items-center">
                <IconInfo class="size-5 mr-2" />
                REQUIRED_FIELDS
              </h3>
              <ul class="space-y-2">
                <li
                  v-for="(req, index) in requirements"
                  :key="index"
                  class="flex items-start space-x-2 text-text-secondary"
                >
                  <span class="text-cyber-green">></span>
                  <span>{{ req }}</span>
                </li>
              </ul>
            </div>

            <!-- Important Notes -->
            <div class="bg-yellow-500/10 border border-yellow-400 p-4 mb-6">
              <p class="text-yellow-300 text-sm">
                <strong>NOTICE:</strong> All submissions are public and will be visible to the community.
                You can choose to submit anonymously if you prefer not to share your identity.
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                class="cyber-btn-secondary"
                @click="handleBack"
              >
                <span>CANCEL</span>
              </button>
              <button
                class="cyber-btn-primary flex items-center justify-center space-x-2"
                @click="handleContinue"
              >
                <span>CONTINUE_TO_FORM</span>
                <IconChevronRight class="size-5" />
              </button>
            </div>
          </div>
        </TerminalContainer>

        <!-- Tips Section -->
        <TerminalContainer
          header-title="TIPS"
          header-subtitle="MAXIMIZE_IMPACT"
          :clip-corners="['ClipTopLeft', 'ClipBottomRight']"
        >
          <div class="p-6">
            <div class="space-y-3">
              <div class="flex items-start space-x-3">
                <span class="text-cyber-green">💡</span>
                <p class="text-text-secondary text-sm">
                  <strong class="text-polkadot-pink">Research First:</strong> Check if similar ideas already exist to avoid duplicates
                </p>
              </div>
              <div class="flex items-start space-x-3">
                <span class="text-cyber-green">🚀</span>
                <p class="text-text-secondary text-sm">
                  <strong class="text-polkadot-pink">Think Big:</strong> Don't limit yourself - the community loves ambitious ideas
                </p>
              </div>
              <div class="flex items-start space-x-3">
                <span class="text-cyber-green">🤝</span>
                <p class="text-text-secondary text-sm">
                  <strong class="text-polkadot-pink">Engage:</strong> Be ready to discuss and refine your idea based on community feedback
                </p>
              </div>
            </div>
          </div>
        </TerminalContainer>
    </AppContainer>
  </div>
</template>
