import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/backend/lib/prisma';

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        await prisma.newsletterSubscriber.update({
            where: { id },
            data: { isActive: false, unsubscribedAt: new Date() }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ success: false, error: 'Failed to delete subscriber' }, { status: 500 });
    }
}
