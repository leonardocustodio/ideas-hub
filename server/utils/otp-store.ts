export const otpStore = new Map<string, { otp: string; expiresAt: number }>()

export function cleanExpiredOtps() {
  const now = Date.now()
  for (const [email, data] of otpStore.entries()) {
    if (data.expiresAt < now) {
      otpStore.delete(email)
    }
  }
}
