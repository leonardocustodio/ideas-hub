<script setup lang="ts">
import IconChevronRight from "~/components/icon/IconChevronRight.vue";
import IconLightbulb from "~/components/icon/IconLightbulb.vue";

const handleContinue = () => {
  // Mark that user has seen instructions
  if (import.meta.client) {
    localStorage.setItem('hasSeenInstructions', 'true');
  }
  navigateTo('/submit');
};

const handleBack = () => {
  navigateTo('/');
};

const guidelines = [
  "Be specific with concrete details and applications",
  "Explain the problem and why it matters to Polkadot",
  "Use relevant tags (DeFi, NFT, Governance, etc.)",
  "Include visuals, diagrams, or images",
  "Add links to similar projects or research",
  "Stay focused on Polkadot ecosystem innovations"
];

</script>

<template>
  <div>
    <AppContainer>
        <!-- Pre-flight Check Section - Moved to top -->
        <TerminalContainer
          header-title="CHECK"
          header-subtitle="RESEARCH_AND_PREPARE"
          :clip-corners="['ClipTopLeft', 'ClipBottomRight']"
          class="mb-6"
        >
          <div class="p-6">
            <div class="space-y-4">
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

        <TerminalContainer
          header-title="LAUNCH"
          header-subtitle="MAKE_IT_COUNT"
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
                  > Be clear and inspiring about how your idea helps Polkadot users and brings them joy
                </p>
              </div>
            </div>

            <!-- Guidelines List -->
            <div class="bg-darker-bg border border-accent-purple/30 p-6 mb-8">
              <h3 class="text-lg font-bold text-polkadot-pink mb-4">TIPS</h3>
              <ul class="space-y-3">
                <li
                  v-for="(guideline, index) in guidelines"
                  :key="index"
                  class="flex items-start space-x-3 text-text-secondary"
                >
                  <span class="text-cyber-green font-mono text-sm mt-0.5">•</span>
                  <span class="text-sm">{{ guideline }}</span>
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
            
            <!-- Matrix Reference -->
            <div class="mt-6 text-center">
              <p class="text-text-secondary text-sm italic">
                "Take the pink pill and see how deep the rabbit hole goes..."
              </p>
            </div>
          </div>
        </TerminalContainer>
    </AppContainer>
  </div>
</template>
