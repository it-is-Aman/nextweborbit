import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/backend/lib/prisma';
import { createHash } from 'crypto';

// In-memory rate limiter (simple but effective for single-server setups)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 20; // Max 20 requests
const LIMIT_WINDOW = 60 * 1000; // per 1 minute

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { path, referrer } = body;

        // Anonymize IP and use as Key for rate limiting
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        const now = Date.now();

        // 1. RATE LIMITING CHECK
        const rateData = rateLimitMap.get(ip) || { count: 0, lastReset: now };

        // Reset count if window has passed
        if (now - rateData.lastReset > LIMIT_WINDOW) {
            rateData.count = 0;
            rateData.lastReset = now;
        }

        rateData.count++;
        rateLimitMap.set(ip, rateData);

        if (rateData.count > RATE_LIMIT) {
            console.warn(`[Rate Limit] Blocking IP: ${ip}`);
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }

        // 2. BOT FILTERING
        const userAgent = request.headers.get('user-agent') || '';
        if (userAgent.toLowerCase().includes('bot') || userAgent.toLowerCase().includes('spider')) {
            return NextResponse.json({ ignored: true });
        }

        const ipHash = createHash('md5').update(ip + new Date().getDate()).digest('hex');

        // 3. RECORD PAGE VIEW
        await prisma.pageView.create({
            data: {
                path: path || '/',
                referrer: referrer || null,
                userAgent: userAgent,
                ipHash: ipHash,
            },
        });

        // 4. AUTO-CLEANUP (Strictly PageView only)
        try {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

            await prisma.pageView.deleteMany({
                where: {
                    createdAt: { lt: sevenDaysAgo }
                }
            });
        } catch (cleanupError) {
            console.error('Analytics Cleanup Error:', cleanupError);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Analytics Error:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
