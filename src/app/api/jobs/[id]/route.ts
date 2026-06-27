import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/lib/prisma'

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params

    try {
        const body = await request.json()
        const {
            title,
            description,
            location,
            employmentTypes,
            googleFormUrl,
            isActive,
        } = body

        const job = await prisma.job.update({
            where: { id },
            data: {
                title,
                description,
                location,
                employmentTypes,
                googleFormUrl,
                isActive,
            },
        })

        return NextResponse.json({
            success: true,
            data: job,
        })
    } catch (error) {
        console.error('Update Job Error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to update job' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params

    try {
        await prisma.job.delete({
            where: { id },
        })

        return NextResponse.json({
            success: true,
            data: { message: 'Job deleted successfully' },
        })
    } catch (error) {
        console.error('Delete Job Error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to delete job' },
            { status: 500 }
        )
    }
}
