import crypto from 'crypto'
import nodemailer from 'nodemailer'
import nodemailerSendgrid from 'nodemailer-sendgrid'
import * as v from 'valibot'
import { otpStore } from '../../utils/otp-store'

// Create custom validation for allowed domain
const createEmailValidator = () => {
  const allowedDomain = process.env.ALLOWED_EMAIL_DOMAIN

  if (allowedDomain && allowedDomain.trim()) {
    const normalizedDomain = allowedDomain.startsWith('@') ? allowedDomain : '@' + allowedDomain

    return v.pipe(
      v.string(),
      v.email('Invalid email address format'),
      v.custom(
        (email) => {
          const emailDomain = email.substring(email.lastIndexOf('@'))
          return emailDomain.toLowerCase() === normalizedDomain.toLowerCase()
        },
        `Access restricted to '${normalizedDomain}' addresses only`
      )
    )
  }

  // No domain restriction, just validate email format
  return v.pipe(
    v.string(),
    v.email('Invalid email address format')
  )
}

const SendOtpSchema = v.object({
  email: createEmailValidator()
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  let validatedData
  try {
    validatedData = v.parse(SendOtpSchema, body)
  } catch (error) {
    if (v.isValiError(error)) {
      throw createError({
        statusCode: error.issues[0].message.includes('restricted') ? 403 : 400,
        statusMessage: error.issues[0].message
      })
    }
    throw error
  }

  const { email } = validatedData

  const otp = crypto.randomInt(100000, 999999).toString()

  otpStore.set(email, {
    otp,
    expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
  })

  const sendGridApiKey = process.env.SENDGRID_API_KEY
  if (!sendGridApiKey) {
    console.log(`[DEV MODE] OTP for ${email}: ${otp}`)
    return {
      success: true,
      message: 'OTP sent successfully (check console in dev mode)'
    }
  }

  const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: sendGridApiKey
    })
  )

  try {
    await transporter.sendMail({
      from: process.env.SENDGRID_FROM_EMAIL || 'no-reply@dotspark.app',
      to: email,
      subject: '🔐 Your Ideas Hub Quantum Access Code',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0a0a0a;">
          <table cellpadding="0" cellspacing="0" width="100%" style="min-height: 100vh; background-color: #0a0a0a;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table cellpadding="0" cellspacing="0" width="600" style="max-width: 600px;">
                  <tr>
                    <td style="background: linear-gradient(135deg, #000 0%, #001a00 50%, #003300 100%); padding: 40px; border-radius: 10px; border: 2px solid #00ff00; box-shadow: 0 0 30px rgba(0, 255, 0, 0.3);">
                      <h1 style="font-family: 'Courier New', monospace; text-align: center; color: #00ff00; font-size: 28px; margin: 0 0 30px 0; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 0 20px #00ff00;">
                        Quantum Access Portal
                      </h1>

                      <div style="background: rgba(0, 0, 0, 0.6); border: 2px solid #00ff00; border-radius: 8px; padding: 30px; margin: 20px 0; text-align: center;">
                        <p style="font-family: 'Courier New', monospace; color: #00ff00; font-size: 14px; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px;">
                          Your Dimensional Access Code:
                        </p>
                        <div style="font-family: 'Courier New', monospace; font-size: 36px; letter-spacing: 10px; color: #00ff00; font-weight: bold; text-shadow: 0 0 10px #00ff00; padding: 15px; background: #000; border-radius: 4px; display: inline-block;">
                          ${otp}
                        </div>
                      </div>

                      <table cellpadding="0" cellspacing="0" width="100%" style="margin: 20px 0;">
                        <tr>
                          <td style="font-family: 'Courier New', monospace; color: #888; font-size: 12px; line-height: 18px;">
                            <p style="margin: 10px 0;">▸ CODE VALIDITY: 10 MINUTES</p>
                            <p style="margin: 10px 0;">▸ SECURITY LEVEL: QUANTUM ENCRYPTED</p>
                            <p style="margin: 10px 0;">▸ ACCESS TYPE: DIMENSIONAL PORTAL</p>
                          </td>
                        </tr>
                      </table>

                      <hr style="border: none; border-top: 1px solid #003300; margin: 30px 0;">

                      <p style="font-family: 'Courier New', monospace; text-align: center; color: #666; font-size: 11px; margin: 0;">
                        If you did not request this code, no action is required.<br>
                        This message will self-destruct after code expiration.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      text: `QUANTUM ACCESS PORTAL\n\nYour Dimensional Access Code: ${otp}\n\nThis code will expire in 10 minutes.\n\nIf you did not request this code, no action is required.`
    })

    return {
      success: true,
      message: 'OTP sent successfully'
    }
  } catch (error) {
    console.error('Error sending email:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send OTP'
    })
  }
})

