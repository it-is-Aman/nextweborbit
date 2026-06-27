import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/lib/prisma'
import { newsletterSchema } from '@/shared/validation'
import { sendNewsletterWelcome } from '@/backend/lib/email'
import { newsletterRateLimit } from '@/backend/lib/rate-limit'
import type { ApiResponse, NewsletterSubscribeResponse } from '@/types/api'

export async function handleNewsletterSubscription(request: NextRequest) {
    try {
        // Rate limiting
        const { allowed } = newsletterRateLimit(request)
        if (!allowed) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Too many requests. Please try again later.',
                },
                { status: 429 }
            )
        }

        const body = await request.json()

        // Validate email with Zod
        const validation = newsletterSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: validation.error.issues[0].message,
                },
                { status: 400 }
            )
        }

        const { email } = validation.data

        // Check if email already exists
        const existing = await prisma.newsletterSubscriber.findUnique({
            where: { email },
        })

        if (existing) {
            if (existing.isActive) {
                return NextResponse.json(
                    {
                        success: false,
                        error: 'This email is already subscribed to our newsletter.',
                    },
                    { status: 409 }
                )
            } else {
                // Reactivate subscription
                await prisma.newsletterSubscriber.update({
                    where: { email },
                    data: {
                        isActive: true,
                        unsubscribedAt: null,
                    },
                })
            }
        } else {
            // Create new subscriber
            await prisma.newsletterSubscriber.create({
                data: { email },
            })
        }

        // Send welcome email (async, don't wait)
        sendNewsletterWelcome(email).catch(err =>
            console.error('Failed to send welcome email:', err)
        )

        const response: ApiResponse<NewsletterSubscribeResponse> = {
            success: true,
            data: {
                message: 'Successfully subscribed to our newsletter!',
                email,
            },
        }

        return NextResponse.json(response)
    } catch (error) {
        console.error('Newsletter API Error:', error)

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to subscribe. Please try again.',
            },
            { status: 500 }
        )
    }
}
