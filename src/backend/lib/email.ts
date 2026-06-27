import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export interface SendEmailOptions {
  to: string | string[]
  subject: string
  html: string
  from?: string
}

export async function sendEmail({ to, subject, html, from }: SendEmailOptions) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('Email sending skipped: No RESEND_API_KEY configured');
    return { success: true, data: null };
  }

  try {
    if (!resend) {
      throw new Error('Resend client not initialized');
    }
    const data = await resend.emails.send({
      from: from || process.env.NEXT_PUBLIC_FROM_EMAIL || 'Next Web Orbit <noreply@nextweborbit.in>',
      to,
      subject,
      html,
    })

    return { success: true, data }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error }
  }
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
