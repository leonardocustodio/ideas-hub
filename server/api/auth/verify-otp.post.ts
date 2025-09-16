import * as v from 'valibot'
import { otpStore, cleanExpiredOtps } from '../../utils/otp-store'

const VerifyOtpSchema = v.object({
  email: v.pipe(
    v.string(),
    v.email('Invalid email address format')
  ),
  otp: v.pipe(
    v.string(),
    v.length(6, 'OTP must be 6 digits'),
    v.regex(/^\d+$/, 'OTP must contain only digits')
  ),
  dimension: v.optional(
    v.union([
      v.literal('order'),
      v.literal('chaos')
    ])
  )
})

export default defineEventHandler(async (event) => {
  cleanExpiredOtps()

  const body = await readBody(event)

  let validatedData
  try {
    validatedData = v.parse(VerifyOtpSchema, body)
  } catch (error) {
    if (v.isValiError(error)) {
      throw createError({
        statusCode: 400,
        statusMessage: error.issues[0].message
      })
    }
    throw error
  }

  const { email, otp, dimension } = validatedData

  const storedData = otpStore.get(email)

  if (!storedData) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid or expired OTP'
    })
  }

  if (storedData.expiresAt < Date.now()) {
    otpStore.delete(email)
    throw createError({
      statusCode: 401,
      statusMessage: 'OTP has expired'
    })
  }

  if (storedData.otp !== otp) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid OTP'
    })
  }

  otpStore.delete(email)

  await setUserSession(event, {
    user: {
      email,
      authenticatedAt: new Date().toISOString(),
      dimension: dimension || 'chaos'
    }
  })

  return {
    success: true,
    email,
    message: 'OTP verified successfully'
  }
})
