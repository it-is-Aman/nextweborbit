import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/backend/lib/prisma';

export async function GET() {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const subscribers = await prisma.newsletterSubscriber.findMany({
            where: { isActive: true },
            orderBy: { subscribedAt: 'desc' }
        });
        return NextResponse.json({ success: true, data: subscribers });
    } catch {
        return NextResponse.json({ success: false, error: 'Failed to fetch subscribers' }, { status: 500 });

    }
}
