import tls from 'tls'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export interface SendEmailOptions {
  to: string | string[]
  subject: string
  html: string
  from?: string
}

async function sendSmtpSsl(to: string | string[], subject: string, html: string): Promise<void> {
  const host = process.env.SMTP_HOST
  const port = parseInt(process.env.SMTP_PORT || '465')
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    throw new Error('SMTP credentials not configured in environment')
  }

  const recipients = Array.isArray(to) ? to : [to]

  for (const recipient of recipients) {
    await new Promise<void>((resolve, reject) => {
      const socket = tls.connect({ host, port, rejectUnauthorized: false }, () => {
        // Connection established
      })

      let step = 0
      const send = (data: string) => {
        socket.write(data + '\r\n')
      }

      socket.on('data', (chunk) => {
        const response = chunk.toString()
        
        if (response.startsWith('4') || response.startsWith('5')) {
          socket.end()
          return reject(new Error(`SMTP Server Error: ${response}`))
        }

        if (step === 0) {
          send(`EHLO ${host}`)
          step++
        } else if (step === 1) {
          send('AUTH LOGIN')
          step++
        } else if (step === 2) {
          send(Buffer.from(user).toString('base64'))
          step++
        } else if (step === 3) {
          send(Buffer.from(pass).toString('base64'))
          step++
        } else if (step === 4) {
          send(`MAIL FROM:<${user}>`)
          step++
        } else if (step === 5) {
          send(`RCPT TO:<${recipient}>`)
          step++
        } else if (step === 6) {
          send('DATA')
          step++
        } else if (step === 7) {
          const message = [
            `From: ${user}`,
            `To: ${recipient}`,
            `Subject: ${subject}`,
            'MIME-Version: 1.0',
            'Content-Type: text/html; charset=utf-8',
            '',
            html,
            '.'
          ].join('\r\n')
          send(message)
          step++
        } else if (step === 8) {
          send('QUIT')
          socket.end()
          resolve()
        }
      })

      socket.on('error', (err) => {
        reject(err)
      })
    })
  }
}

export async function sendEmail({ to, subject, html, from }: SendEmailOptions) {
  // 1. Try SMTP if configured
  if (process.env.SMTP_HOST) {
    try {
      await sendSmtpSsl(to, subject, html)
      return { success: true, data: 'SMTP' }
    } catch (error) {
      console.error('SMTP Email sending failed, falling back to Resend:', error)
    }
  }

  // 2. Try Resend if configured
  if (process.env.RESEND_API_KEY && resend) {
    try {
      const data = await resend.emails.send({
        from: from || process.env.NEXT_PUBLIC_FROM_EMAIL || 'Next Web Orbit <noreply@nextweborbit.in>',
        to,
        subject,
        html,
      })
      return { success: true, data }
    } catch (error) {
      console.error('Resend Email sending failed:', error)
      return { success: false, error }
    }
  }

  console.warn('Email sending skipped: Neither SMTP nor RESEND_API_KEY is configured')
  return { success: true, data: null }
}

// Newsletter Welcome Email
export async function sendNewsletterWelcome(email: string) {
  return sendEmail({
    to: email,
    subject: 'Welcome to Next Web Orbit Newsletter!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Welcome to Our Newsletter!</h1>
        <p>Thank you for subscribing to Next Web Orbit's newsletter.</p>
        <p>You'll receive updates about our latest services, tech insights, and special offers.</p>
        <p>Best regards,<br>The Next Web Orbit Team</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #999;">
          If you didn't subscribe to this newsletter, please ignore this email.
        </p>
      </div>
    `,
  })
}

// Contact Form - Admin Notification
export async function sendContactNotification(data: {
  firstName: string
  lastName?: string
  email: string
  phone?: string
  company?: string
  service?: string
  message: string
}) {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@nextweborbit.in'

  return sendEmail({
    to: adminEmail,
    subject: `New Contact Form: ${data.firstName} ${data.lastName || ''}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.firstName} ${data.lastName || ''}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.phone || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Company:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.company || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Service:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.service || 'N/A'}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 5px;">
          <strong>Message:</strong>
          <p>${data.message}</p>
        </div>
      </div>
    `,
  })
}

// Contact Form - User Confirmation
export async function sendContactConfirmation(email: string, firstName: string) {
  return sendEmail({
    to: email,
    subject: 'We received your message!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Thank You for Contacting Us!</h1>
        <p>Hi ${firstName},</p>
        <p>We've received your message and will get back to you within 24 hours.</p>
        <p>Our team is reviewing your inquiry and will respond as soon as possible.</p>
        <p>Best regards,<br>Next Web Orbit Team</p>
      </div>
    `,
  })
}
