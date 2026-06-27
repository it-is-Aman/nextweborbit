import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/lib/prisma'
import { contactSchema } from '@/shared/validation'
import { sendContactNotification, sendContactConfirmation } from '@/backend/lib/email'
import { contactRateLimit } from '@/backend/lib/rate-limit'

export async function handleContactSubmission(request: NextRequest) {
    try {
        // Rate limiting
        const { allowed } = contactRateLimit(request)
        if (!allowed) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Too many requests. Please try again in an hour.',
                },
                { status: 429 }
            )
        }

        const body = await request.json()

        // Validate with Zod
        const validation = contactSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: validation.error.issues[0].message,
                },
                { status: 400 }
            )
        }

        const data = validation.data

        // Save to database
        const submission = await prisma.contactSubmission.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                company: data.company,
                service: data.service,
                message: data.message,
            },
        })

        // Send emails (async, don't wait)
        if (process.env.RESEND_API_KEY) {
            Promise.all([
                sendContactNotification(data),
                sendContactConfirmation(data.email, data.firstName),
            ]).catch(err => console.error('Failed to send emails:', err))
        }

        return NextResponse.json({
            success: true,
            data: {
                message: 'Thank you for contacting us! We will get back to you soon.',
                submissionId: submission.id,
            },
        })
    } catch (error) {
        console.error('[Contact API] Error:', error)
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to submit form.',
            },
            { status: 500 }
        )
    }
}
