import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/lib/prisma'


export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> } // Correct typing for Next.js 15+ dynamic params
) {
    // Await params before usage (Next.js 15 requirement)
    const { id } = await context.params

    try {
        const body = await request.json()
        const { value, label, icon, order, isActive } = body

        // Check format of ID. The frontend uses 'key' as ID, but for updates we might need to handle both or expect database ID.
        // Assuming we pass the database ID (cuid) or key.
        // Prisma schema uses `id` as CUID and `key` as unique.
        // Let's first try to find by ID (cuid).

        // For robustness, let's assume the router parameter passed is the `key` because the frontend mapped `id: stat.key`.
        // However, updates are usually safer with the immutable ID (CUID).
        // Let's check how we mapped GET... `id: stat.key`.
        // So the frontend will be sending the KEY as the ID.
        // We should probably find by key.

        const stat = await prisma.statistic.update({
            where: { key: id }, // Assuming 'id' in URL corresponds to 'key' in DB
            data: {
                value,
                label,
                icon,
                order,
                isActive,
            },
        })

        return NextResponse.json({
            success: true,
            data: stat,
        })
    } catch (error) {
        console.error('Update Statistic Error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to update statistic' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params

    try {
        await prisma.statistic.delete({
            where: { key: id },
        })

        return NextResponse.json({
            success: true,
            data: { message: 'Statistic deleted successfully' },
        })
    } catch (error) {
        console.error('Delete Statistic Error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to delete statistic' },
            { status: 500 }
        )
    }
}
