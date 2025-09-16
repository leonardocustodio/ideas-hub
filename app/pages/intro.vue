<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'blank'
});

const router = useRouter();
const { fetch: refreshSession } = useUserSession();
const selectedDimension = ref<'order' | 'chaos' | null>(null);
const isTransitioning = ref(false);
const showEmailForm = ref(false);
const userEmail = ref('');
const isSubmittingEmail = ref(false);
const currentPhase = ref(0);
const phases = ['SCANNING...', 'ANALYZING...', 'DIMENSIONAL BREACH DETECTED', 'CHOOSE YOUR REALITY'];
const showOtpInput = ref(false);
const otpCode = ref('');
const isVerifyingOtp = ref(false);
const errorMessage = ref('');

onMounted(() => {
  // Start the phase animation
  const phaseInterval = setInterval(() => {
    if (currentPhase.value < phases.length - 1) {
      currentPhase.value++;
    } else {
      clearInterval(phaseInterval);
    }
  }, 2000);
});

const enterDimension = async (dimension: 'order' | 'chaos') => {
  if (isTransitioning.value) return;

  // Dimension order is still under development
  if (dimension === 'order') return;

  selectedDimension.value = dimension;
  isTransitioning.value = true;

  localStorage.setItem('polkadot-theme', dimension === 'order' ? 'light' : 'dark');
  localStorage.setItem('polkadot-has-visited', 'true');

  // Wait for animation to complete
  await new Promise(resolve => setTimeout(resolve, 4000));

  // Show email form
  isTransitioning.value = false;
  showEmailForm.value = true;
};

const submitEmail = async () => {
  if (!userEmail.value || isSubmittingEmail.value) return;

  // Basic email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(userEmail.value)) {
    errorMessage.value = 'Please enter a valid email address';
    return;
  }

  isSubmittingEmail.value = true;
  errorMessage.value = '';

  try {
    // Send OTP to email
    const response = await $fetch('/api/auth/send-otp', {
      method: 'POST',
      body: {
        email: userEmail.value
      }
    });

    if (response.success) {
      // Show the OTP input field
      showOtpInput.value = true;
    }
  } catch (error) {
    const err = error as { data?: { statusMessage?: string } };
    errorMessage.value = err.data?.statusMessage || 'Failed to send OTP. Please try again.';
  } finally {
    isSubmittingEmail.value = false;
  }
};

const verifyOtp = async () => {
  if (!otpCode.value || isVerifyingOtp.value) return;

  if (otpCode.value.length !== 6) {
    errorMessage.value = 'Please enter a 6-digit code';
    return;
  }

  isVerifyingOtp.value = true;
  errorMessage.value = '';

  try {
    // Verify OTP with dimension info
    const response = await $fetch('/api/auth/verify-otp', {
      method: 'POST',
      body: {
        email: userEmail.value,
        otp: otpCode.value,
        dimension: selectedDimension.value
      }
    });

    if (response.success) {
      localStorage.setItem('polkadot-theme', selectedDimension.value === 'order' ? 'light' : 'dark');

      // Refresh session to get the new auth state
      await refreshSession();
      await router.push('/');
    }
  } catch (error) {
    const err = error as { data?: { statusMessage?: string } };
    errorMessage.value = err.data?.statusMessage || 'Invalid or expired code. Please try again.';
    otpCode.value = '';
  } finally {
    isVerifyingOtp.value = false;
  }
};

const resendOtp = async () => {
  showOtpInput.value = false;
  otpCode.value = '';
  await submitEmail();
};
</script>

<template>
  <div class="quantum-container">
    <!-- Scanning Interface -->
    <div class="scanning-interface">
      <div class="scan-grid">
        <div v-for="i in 20" :key="i" class="grid-line"/>
      </div>
      <div class="scan-overlay">
        <div class="scan-beam"/>
      </div>
    </div>

    <!-- HUD Elements -->
    <div class="hud-elements">
      <div class="hud-corner top-left">
        <div class="corner-bracket"/>
        <span class="hud-text">POLKADOT.NODE</span>
      </div>
      <div class="hud-corner top-right">
        <div class="corner-bracket"/>
        <span class="hud-text">v0.1.0</span>
      </div>
      <div class="hud-corner bottom-left">
        <div class="corner-bracket"/>
        <span class="hud-text">SYNCED</span>
      </div>
      <div class="hud-corner bottom-right">
        <div class="corner-bracket"/>
        <span class="hud-text">CONNECTED</span>
      </div>
    </div>

    <!-- Central Interface -->
    <div class="central-interface">
      <!-- Phase Display -->
      <div class="phase-display">
        <div :key="currentPhase" class="phase-text">
          {{ phases[currentPhase] }}
        </div>
        <div class="phase-progress">
          <div
v-for="i in 4"
               :key="i"
               class="progress-segment"
               :class="{ active: i <= currentPhase + 1 }"/>
        </div>
      </div>

      <!-- Dimensional Portals -->
      <div v-if="currentPhase >= 3" class="portal-array">
        <!-- Order Dimension -->
        <div class="dimension-portal order-dimension disabled-dimension">
          <div class="portal-housing">
            <div class="housing-frame"/>
            <div class="portal-core order-core">
              <div class="core-rings">
                <div v-for="i in 6" :key="i" class="core-ring"/>
              </div>
              <div class="core-center">
                <div class="quantum-symbol order-symbol">
                  <div v-for="i in 12" :key="i" class="symbol-element"/>
                </div>
              </div>
            </div>
            <div class="portal-field order-field">
              <div v-for="i in 20" :key="i" class="field-particle"/>
            </div>
          </div>
          <div class="dimension-info">
            <h3 class="dimension-title">DIMENSION α</h3>
            <div class="dimension-stats">
              <div class="stat-line">
                <span class="stat-label">FINALITY:</span>
                <span class="stat-value order-stat">99.7%</span>
              </div>
              <div class="stat-line">
                <span class="stat-label">VOLATILITY:</span>
                <span class="stat-value order-stat">0.3%</span>
              </div>
              <div class="stat-line">
                <span class="stat-label">NETWORK:</span>
                <span class="stat-value order-stat">ORDERED</span>
              </div>
            </div>
            <div class="dimension-button order-button disabled-button">
              <span>COMING SOON</span>
              <div class="button-scanner"/>
            </div>
          </div>
        </div>

        <!-- Chaos Dimension -->
        <div class="dimension-portal chaos-dimension" @click="enterDimension('chaos')">
          <div class="portal-housing">
            <div class="housing-frame chaos-frame"/>
            <div class="portal-core chaos-core">
              <div class="core-distortion">
                <div v-for="i in 8" :key="i" class="distortion-wave"/>
              </div>
              <div class="core-center">
                <div class="quantum-symbol chaos-symbol">
                  <div v-for="i in 16" :key="i" class="symbol-fragment"/>
                </div>
              </div>
            </div>
            <div class="portal-field chaos-field">
              <div v-for="i in 25" :key="i" class="field-anomaly"/>
            </div>
          </div>
          <div class="dimension-info">
            <h3 class="dimension-title">DIMENSION Ω</h3>
            <div class="dimension-stats">
              <div class="stat-line">
                <span class="stat-label">FINALITY:</span>
                <span class="stat-value chaos-stat">12.4%</span>
              </div>
              <div class="stat-line">
                <span class="stat-label">VOLATILITY:</span>
                <span class="stat-value chaos-stat">87.6%</span>
              </div>
              <div class="stat-line">
                <span class="stat-label">NETWORK:</span>
                <span class="stat-value chaos-stat">CHAOTIC</span>
              </div>
            </div>
            <div class="dimension-button chaos-button">
              <span>ENTER KUSAMA</span>
              <div class="button-glitch-effect"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quantum Transition -->
    <div v-if="isTransitioning" class="quantum-transition" :class="selectedDimension + '-quantum'">
      <div class="quantum-tunnel">
        <div v-for="i in 15" :key="i" class="tunnel-ring"/>
      </div>
      <div class="transition-data">
        <h2 class="transition-title">
          CONNECTING TO NETWORK
        </h2>
        <div class="data-stream">
          <div v-for="i in 8" :key="i" class="data-line">
            <span class="data-label">{{
              ['VALIDATORS', 'PARACHAINS', 'COLLATORS', 'NOMINATORS', 'BLOCK HEIGHT', 'ERA', 'SESSION', 'EPOCH'][i-1]
            }}:</span>
            <span class="data-value">{{ Math.random().toString(36).substr(2, 8).toUpperCase() }}</span>
          </div>
        </div>
        <div class="quantum-progress">
          <div class="progress-bar">
            <div class="progress-fill quantum-fill"/>
          </div>
          <span class="progress-text">NETWORK CONNECTION: ESTABLISHED</span>
        </div>
      </div>
    </div>

    <!-- Email Access Form -->
    <div v-if="showEmailForm" class="email-access-form" :class="selectedDimension + '-themed'">
      <div class="access-container">
        <div class="access-header">
          <h2 class="access-title">NETWORK ACCESS VERIFICATION</h2>
          <p class="access-subtitle">Enter your credentials to access</p>
        </div>

        <div class="access-form">
          <!-- Email Input -->
          <div v-if="!showOtpInput" class="input-group">
            <label class="input-label">EMAIL ADDRESS:</label>
            <input
              v-model="userEmail"
              type="email"
              class="access-input"
              :class="selectedDimension + '-input'"
              placeholder="user@example.com"
              :disabled="isSubmittingEmail"
              @keyup.enter="submitEmail"
            >
          </div>

          <!-- OTP Input -->
          <div v-else class="otp-section">
            <div class="otp-header">
              <p class="otp-info">VALIDATOR ACCESS CODE SENT TO:</p>
              <p class="otp-email">{{ userEmail }}</p>
            </div>

            <div class="input-group">
              <label class="input-label">ENTER 6-DIGIT CODE:</label>
              <input
                v-model="otpCode"
                type="text"
                class="access-input otp-input"
                :class="selectedDimension + '-input'"
                placeholder="000000"
                maxlength="6"
                :disabled="isVerifyingOtp"
                @keyup.enter="verifyOtp"
              >
            </div>

            <div class="otp-actions">
              <button
                class="resend-button"
                :disabled="isSubmittingEmail"
                @click="resendOtp"
              >
                RESEND CODE
              </button>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="error-message">
            <span class="error-icon">⚠️</span>
            <span>{{ errorMessage }}</span>
          </div>

          <!-- Submit Button -->
          <button
            v-if="!showOtpInput"
            class="access-button"
            :class="selectedDimension + '-button'"
            :disabled="isSubmittingEmail || !userEmail"
            @click="submitEmail"
          >
            <span v-if="!isSubmittingEmail">SEND ACCESS CODE</span>
            <span v-else>SENDING...</span>
          </button>

          <button
            v-else
            class="access-button"
            :class="selectedDimension + '-button'"
            :disabled="isVerifyingOtp || !otpCode"
            @click="verifyOtp"
          >
            <span v-if="!isVerifyingOtp">VERIFY & ENTER</span>
            <span v-else>VERIFYING...</span>
          </button>

          <div class="security-notice">
            <span class="notice-icon">⛓️</span>
            <span class="notice-text">SECURE POLKADOT CONNECTION</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quantum-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  color: #FF2670;
  font-family: 'Fira Code', monospace;
  overflow: hidden;
}

.scanning-interface {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
}

.scan-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.grid-line {
  position: absolute;
  background: #FF2670;
  opacity: 0.2;
}

.grid-line:nth-child(odd) {
  width: 100%;
  height: 1px;
  top: calc(var(--i, 0) * 5%);
  animation: gridPulse 3s ease-in-out infinite;
}

.grid-line:nth-child(even) {
  height: 100%;
  width: 1px;
  left: calc(var(--i, 0) * 5%);
  animation: gridPulse 3s ease-in-out infinite;
  animation-delay: 0.5s;
}

@keyframes gridPulse {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.3; }
}

.scan-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.scan-beam {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #FF2670, transparent);
  animation: scanBeam 4s linear infinite;
}

@keyframes scanBeam {
  0% { transform: translateY(0); }
  100% { transform: translateY(100vh); }
}

.hud-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.hud-corner {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 10px;
}

.top-left { top: 20px; left: 20px; }
.top-right { top: 20px; right: 20px; flex-direction: row-reverse; }
.bottom-left { bottom: 20px; left: 20px; }
.bottom-right { bottom: 20px; right: 20px; flex-direction: row-reverse; }

@media (max-width: 768px) {
  .hud-corner {
    gap: 5px;
  }
  .top-left { top: 10px; left: 10px; }
  .top-right { top: 10px; right: 10px; }
  .bottom-left { bottom: 10px; left: 10px; }
  .bottom-right { bottom: 10px; right: 10px; }
}

.corner-bracket {
  width: 30px;
  height: 30px;
  border: 2px solid #FF2670;
  position: relative;
}

@media (max-width: 768px) {
  .corner-bracket {
    width: 20px;
    height: 20px;
    border-width: 1px;
  }
}

.top-left .corner-bracket { border-right: none; border-bottom: none; }
.top-right .corner-bracket { border-left: none; border-bottom: none; }
.bottom-left .corner-bracket { border-right: none; border-top: none; }
.bottom-right .corner-bracket { border-left: none; border-top: none; }

.hud-text {
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  color: #FF2670;
  text-shadow: 0 0 5px #FF2670;
}

@media (max-width: 768px) {
  .hud-text {
    font-size: 0.6rem;
  }
}

.central-interface {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 20;
  width: 100%;
  max-width: 900px;
  padding: 0 1rem;
}

@media (max-width: 768px) {
  .central-interface {
    padding: 0 0.5rem;
  }
}

.phase-display {
  margin-bottom: 4rem;
}

@media (max-width: 768px) {
  .phase-display {
    margin-bottom: 3rem;
  }
}

.phase-text {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px #FF2670;
  animation: textFlicker 0.5s ease-in-out;
}

@media (max-width: 768px) {
  .phase-text {
    font-size: 1.2rem;
  }
}

@keyframes textFlicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.phase-progress {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.progress-segment {
  width: 40px;
  height: 4px;
  background: rgba(255, 38, 112, 0.2);
  transition: all 0.5s ease;
}

.progress-segment.active {
  background: #FF2670;
  box-shadow: 0 0 10px #FF2670;
}

.portal-array {
  display: flex;
  gap: 6rem;
  align-items: center;
  animation: portalAppear 1s ease-out;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 1rem;
}

/* Mobile layout */
@media (max-width: 768px) {
  .portal-array {
    flex-direction: column;
    gap: 2rem;
    padding: 0 0.5rem;
  }
}

@keyframes portalAppear {
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
}

.dimension-portal {
  width: 350px;
  max-width: 100%;
  cursor: pointer;
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .dimension-portal {
    width: 100%;
    max-width: 320px;
  }
}

.dimension-portal:hover:not(.disabled-dimension) {
  transform: scale(1.05);
}


.disabled-dimension {
  opacity: 0.5;
  filter: grayscale(100%);
}

@media (max-width: 768px) {
  .disabled-dimension {
    display: none;
  }
}

/* Override colors for disabled order dimension */
.disabled-dimension.order-dimension .housing-frame {
  border-color: #666 !important;
}

.disabled-dimension.order-dimension .order-core {
  background: radial-gradient(circle, rgba(102, 102, 102, 0.2) 0%, rgba(51, 51, 51, 0.1) 100%) !important;
  border-color: #666 !important;
}

.disabled-dimension.order-dimension .core-ring {
  border-color: #666 !important;
}

.disabled-dimension.order-dimension .symbol-element {
  background: #666 !important;
}

.disabled-dimension.order-dimension .field-particle {
  background: #666 !important;
}

.disabled-dimension.order-dimension .dimension-title {
  color: #666 !important;
  text-shadow: 0 0 10px #333 !important;
}

.disabled-dimension.order-dimension .order-stat {
  color: #666 !important;
}

.portal-housing {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 2rem;
}

@media (max-width: 768px) {
  .portal-housing {
    width: 150px;
    height: 150px;
    margin: 0 auto 1.5rem;
  }
}

.housing-frame {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px solid #FF2670;
  border-radius: 50%;
}

.chaos-frame {
  border-color: #ff0080;
  animation: frameGlitch 2s ease-in-out infinite;
}

@keyframes frameGlitch {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(1deg); }
  50% { transform: rotate(-1deg); }
  75% { transform: rotate(0.5deg); }
}

.portal-core {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}

.order-core {
  background: radial-gradient(circle, rgba(255, 38, 112, 0.2) 0%, rgba(150, 20, 66, 0.1) 100%);
  border: 2px solid #FF2670;
}

.chaos-core {
  background: radial-gradient(circle, rgba(255, 0, 128, 0.2) 0%, rgba(100, 0, 50, 0.1) 100%);
  border: 2px solid #ff0080;
}

.core-rings {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.core-ring {
  position: absolute;
  border: 1px solid #FF2670;
  border-radius: 50%;
  animation: ringRotate 10s linear infinite;
}

.core-ring:nth-child(1) { width: 90%; height: 90%; top: 5%; left: 5%; }
.core-ring:nth-child(2) { width: 70%; height: 70%; top: 15%; left: 15%; animation-direction: reverse; }
.core-ring:nth-child(3) { width: 50%; height: 50%; top: 25%; left: 25%; }

.core-distortion {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.distortion-wave {
  position: absolute;
  border: 1px solid #ff0080;
  border-radius: 50%;
  animation: distortionPulse 2s ease-in-out infinite;
}

@keyframes distortionPulse {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(2); opacity: 0; }
}

.core-center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  transform: translate(-50%, -50%);
}

.quantum-symbol {
  width: 100%;
  height: 100%;
  position: relative;
}

.symbol-element {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #FF2670;
  border-radius: 50%;
  animation: symbolOrbit 8s linear infinite;
}

.symbol-fragment {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #ff0080;
  animation: fragmentChaos 3s ease-in-out infinite;
}

@keyframes symbolOrbit {
  0% { transform: rotate(0deg) translateX(25px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(25px) rotate(-360deg); }
}

@keyframes fragmentChaos {
  0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.8; }
  25% { transform: translate(10px, -5px) rotate(90deg); opacity: 1; }
  50% { transform: translate(-8px, 8px) rotate(180deg); opacity: 0.9; }
  75% { transform: translate(5px, -10px) rotate(270deg); opacity: 0.7; }
}

.portal-field {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.field-particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: #FF2670;
  border-radius: 50%;
  animation: particleFloat 4s ease-in-out infinite;
}

.field-anomaly {
  position: absolute;
  width: 3px;
  height: 3px;
  background: #ff0080;
  animation: anomalyGlitch 2s ease-in-out infinite;
}

@keyframes particleFloat {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
  50% { transform: translateY(-20px) scale(1.5); opacity: 1; }
}

@keyframes anomalyGlitch {
  0%, 100% { transform: translate(0, 0); opacity: 0.8; }
  25% { transform: translate(5px, -3px); opacity: 1; }
  50% { transform: translate(-4px, 4px); opacity: 0.6; }
  75% { transform: translate(3px, -2px); opacity: 0.9; }
}

.dimension-info {
  text-align: center;
}

.dimension-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  font-family: 'Orbitron', monospace;
}

@media (max-width: 768px) {
  .dimension-title {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
  }
}

.order-dimension .dimension-title {
  color: #FF2670;
  text-shadow: 0 0 10px #FF2670;
}

.chaos-dimension .dimension-title {
  color: #ff0080;
  text-shadow: 0 0 10px #ff0080;
}

.dimension-stats {
  margin-bottom: 2rem;
  text-align: left;
  display: inline-block;
}

@media (max-width: 768px) {
  .dimension-stats {
    margin-bottom: 1.5rem;
  }
}

.stat-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .stat-line {
    font-size: 0.8rem;
    margin-bottom: 0.4rem;
  }
}

.stat-label {
  color: #888;
  margin-right: 2rem;
}

.order-stat {
  color: #FF2670;
}

.chaos-stat {
  color: #ff0080;
}

.dimension-button {
  position: relative;
  display: inline-block;
  padding: 1rem 2rem;
  border: 2px solid;
  border-radius: 25px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
  overflow: hidden;
}

@media (max-width: 768px) {
  .dimension-button {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
}

.order-button {
  border-color: #FF2670;
  color: #FF2670;
  background: transparent;
}

.disabled-button {
  border-color: #666 !important;
  color: #666 !important;
  opacity: 0.7;
  background: transparent !important;
}

.chaos-button {
  border-color: #ff0080;
  color: #ff0080;
  background: transparent;
}

.quantum-transition {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.order-quantum {
  background: linear-gradient(135deg, #000 0%, #330016 50%, #660033 100%);
  color: #FF2670;
}

.chaos-quantum {
  background: linear-gradient(135deg, #000 0%, #330033 50%, #660066 100%);
  color: #ff0080;
}

.quantum-tunnel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  perspective: 1000px;
}

.tunnel-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  border: 2px solid currentColor;
  border-radius: 50%;
  transform-style: preserve-3d;
  animation: tunnelMove 4s linear infinite;
}

@keyframes tunnelMove {
  0% {
    transform: translate(-50%, -50%) translateZ(1000px) scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) translateZ(-1000px) scale(2);
    opacity: 0;
  }
}

.transition-data {
  text-align: center;
  z-index: 10;
}

.transition-title {
  font-size: 2rem;
  font-family: 'Orbitron', monospace;
  font-weight: bold;
  margin-bottom: 2rem;
  text-shadow: 0 0 20px currentColor;
}

.data-stream {
  margin-bottom: 2rem;
  text-align: left;
  display: inline-block;
}

.data-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
  animation: dataFlicker 0.1s ease-in-out infinite;
}

.data-label {
  margin-right: 2rem;
  opacity: 0.7;
}

.data-value {
  font-weight: bold;
}

@keyframes dataFlicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.quantum-progress {
  text-align: center;
}

.progress-bar {
  width: 300px;
  height: 4px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.quantum-fill {
  height: 100%;
  background: currentColor;
  animation: quantumProgress 4s ease-out forwards;
}

@keyframes quantumProgress {
  0% { width: 0%; }
  100% { width: 100%; }
}

.progress-text {
  font-size: 0.9rem;
  font-weight: bold;
  letter-spacing: 0.1em;
}

/* Email Access Form Styles */
.email-access-form {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  animation: formAppear 0.5s ease-out;
}

.email-access-form.chaos-themed {
  background: linear-gradient(135deg, #000 0%, #1a001a 50%, #330033 100%);
}

.email-access-form.order-themed {
  background: linear-gradient(135deg, #000 0%, #1a000a 50%, #330016 100%);
}

@keyframes formAppear {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.access-container {
  width: 90%;
  max-width: 500px;
  padding: 3rem;
  border: 2px solid;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
}

.chaos-themed .access-container {
  border-color: #ff0080;
  box-shadow: 0 0 30px rgba(255, 0, 128, 0.3);
}

.order-themed .access-container {
  border-color: #FF2670;
  box-shadow: 0 0 30px rgba(255, 38, 112, 0.3);
}

.access-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.access-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-family: 'Orbitron', monospace;
  letter-spacing: 0.1em;
}

.chaos-themed .access-title {
  color: #ff0080;
  text-shadow: 0 0 20px #ff0080;
}

.order-themed .access-title {
  color: #FF2670;
  text-shadow: 0 0 20px #FF2670;
}

.access-subtitle {
  font-size: 0.9rem;
  opacity: 0.8;
  color: #888;
}

.access-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  color: #888;
}

.access-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.5);
  font-size: 1rem;
  font-family: 'Fira Code', monospace;
  outline: none;
  transition: all 0.3s ease;
}

.chaos-input {
  border-color: #ff0080;
  color: #ff0080;
}

.chaos-input:focus {
  box-shadow: 0 0 10px rgba(255, 0, 128, 0.5);
  border-color: #ff00ff;
}

.order-input {
  border-color: #FF2670;
  color: #FF2670;
}

.order-input:focus {
  box-shadow: 0 0 10px rgba(255, 38, 112, 0.5);
  border-color: #FF4488;
}

.access-input::placeholder {
  color: #555;
}

.access-button {
  padding: 1rem 2rem;
  border: 2px solid;
  border-radius: 25px;
  background: transparent;
  font-weight: bold;
  font-size: 1rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.chaos-button {
  border-color: #ff0080;
  color: #ff0080;
}

.chaos-button:hover:not(:disabled) {
  background: #ff0080;
  color: #000;
  box-shadow: 0 0 20px rgba(255, 0, 128, 0.5);
}

.order-button:not(:disabled) {
  border-color: #FF2670;
  color: #FF2670;
}

.order-button:hover:not(:disabled) {
  background: #FF2670;
  color: #000;
  box-shadow: 0 0 20px rgba(255, 38, 112, 0.5);
}

.access-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.security-notice {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 0.8rem;
  color: #666;
}

.notice-icon {
  font-size: 1rem;
}

.notice-text {
  letter-spacing: 0.1em;
}

/* OTP Section Styles */
.otp-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.otp-header {
  text-align: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.otp-info {
  font-size: 0.8rem;
  color: #888;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.otp-email {
  font-size: 1rem;
  font-weight: bold;
  color: inherit;
}

.chaos-themed .otp-email {
  color: #ff0080;
}

.order-themed .otp-email {
  color: #FF2670;
}

.otp-input {
  text-align: center;
  font-size: 1.5rem;
  letter-spacing: 0.5em;
  font-family: 'Courier New', monospace;
  font-weight: bold;
}

.otp-actions {
  text-align: center;
}

.resend-button {
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid #666;
  color: #888;
  border-radius: 5px;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Fira Code', monospace;
}

.resend-button:hover:not(:disabled) {
  border-color: #aaa;
  color: #aaa;
}

.resend-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Error Message Styles */
.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  border-radius: 5px;
  color: #ff6666;
  font-size: 0.9rem;
  animation: errorShake 0.5s ease-in-out;
}

@keyframes errorShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.error-icon {
  font-size: 1.2rem;
}

/* Generate random positions and delays */
.symbol-element:nth-child(1) { animation-delay: 0s; }
.symbol-element:nth-child(2) { animation-delay: 0.7s; }
.symbol-element:nth-child(3) { animation-delay: 1.4s; }
.symbol-element:nth-child(4) { animation-delay: 2.1s; }

.symbol-fragment:nth-child(1) { top: 10%; left: 20%; animation-delay: 0s; }
.symbol-fragment:nth-child(2) { top: 30%; left: 60%; animation-delay: 0.3s; }
.symbol-fragment:nth-child(3) { top: 50%; left: 10%; animation-delay: 0.6s; }
.symbol-fragment:nth-child(4) { top: 70%; left: 80%; animation-delay: 0.9s; }

.field-particle:nth-child(1) { top: 10%; left: 20%; animation-delay: 0s; }
.field-particle:nth-child(2) { top: 30%; left: 60%; animation-delay: 0.5s; }
.field-particle:nth-child(3) { top: 50%; left: 10%; animation-delay: 1s; }
.field-particle:nth-child(4) { top: 70%; left: 80%; animation-delay: 1.5s; }

.tunnel-ring:nth-child(1) { width: 100px; height: 100px; animation-delay: 0s; }
.tunnel-ring:nth-child(2) { width: 150px; height: 150px; animation-delay: 0.3s; }
.tunnel-ring:nth-child(3) { width: 200px; height: 200px; animation-delay: 0.6s; }
.tunnel-ring:nth-child(4) { width: 250px; height: 250px; animation-delay: 0.9s; }
</style>
