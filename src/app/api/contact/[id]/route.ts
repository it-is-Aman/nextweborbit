import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/backend/lib/prisma';

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        await prisma.contactSubmission.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete contact error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete consultation' },
            { status: 500 }
        );
    }
}
