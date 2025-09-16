import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const useFingerprint = () => {
  const fingerprint = useState<string | null>('fingerprint', () => null);
  const isLoading = useState<boolean>('fingerprintLoading', () => false);

  const initFingerprint = async () => {
    if (process.server) return;
    if (fingerprint.value) return fingerprint.value;

    try {
      isLoading.value = true;

      // Initialize FingerprintJS agent
      const fpPromise = FingerprintJS.load();
      const fp = await fpPromise;

      // Get the visitor identifier
      const result = await fp.get();
      fingerprint.value = result.visitorId;

      // Store in sessionStorage for quick access
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('device_fingerprint', result.visitorId);
      }

      return result.visitorId;
    } catch (error) {
      console.error('Failed to initialize fingerprint:', error);

      // Fallback to a random ID if fingerprinting fails
      const fallbackId = `fallback_${Math.random().toString(36).substring(2)}`;
      fingerprint.value = fallbackId;

      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('device_fingerprint', fallbackId);
      }

      return fallbackId;
    } finally {
      isLoading.value = false;
    }
  };

  const getFingerprint = async (): Promise<string> => {
    if (process.server) return '';

    // Check if we already have it in memory
    if (fingerprint.value) return fingerprint.value;

    // Check sessionStorage
    if (typeof sessionStorage !== 'undefined') {
      const stored = sessionStorage.getItem('device_fingerprint');
      if (stored) {
        fingerprint.value = stored;
        return stored;
      }
    }

    // Initialize if needed
    return await initFingerprint() || '';
  };

  return {
    fingerprint: readonly(fingerprint),
    isLoading: readonly(isLoading),
    initFingerprint,
    getFingerprint
  };
};