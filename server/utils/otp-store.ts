// Shared OTP store for authentication
export const otpStore = new Map<string, { otp: string; expiresAt: number }>()

// Clean expired OTPs periodically
setInterval(() => {
  const now = Date.now()
  for (const [email, data] of otpStore.entries()) {
    if (data.expiresAt < now) {
      otpStore.delete(email)
    }
  }
}, 60000) // Clean every minute