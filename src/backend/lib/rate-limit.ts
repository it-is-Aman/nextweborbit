import { NextRequest } from 'next/server'

interface RateLimitStore {
    [key: string]: {
        count: number
        resetTime: number
    }
}

const store: RateLimitStore = {}

export interface RateLimitConfig {
    maxRequests: number
    windowMs: number
}

export function rateLimit(config: RateLimitConfig) {
    const { maxRequests, windowMs } = config

    return (request: NextRequest): { allowed: boolean; remaining: number } => {
        // Get client IP
        const ip = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown'

        const now = Date.now()
        const key = `${ip}`

        // Clean up old entries
        if (store[key] && store[key].resetTime < now) {
            delete store[key]
        }

        // Initialize or get existing entry
        if (!store[key]) {
            store[key] = {
                count: 0,
                resetTime: now + windowMs,
            }
        }

        // Increment count
        store[key].count++

        const allowed = store[key].count <= maxRequests
        const remaining = Math.max(0, maxRequests - store[key].count)

        return { allowed, remaining }
    }
}

// Predefined rate limiters
export const contactRateLimit = rateLimit({
    maxRequests: 5, // 5 requests
    windowMs: 60 * 60 * 1000, // per hour
})

export const newsletterRateLimit = rateLimit({
    maxRequests: 3, // 3 requests
    windowMs: 60 * 60 * 1000, // per hour
})
