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
        const { name, role, bio, image, order, isActive } = body

        const member = await prisma.teamMember.update({
            where: { id },
            data: {
                name,
                role,
                bio,
                image,
                order,
                isActive,
            },
        })

        return NextResponse.json({
            success: true,
            data: member,
        })
    } catch (error) {
        console.error('Update Team Member Error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to update team member' },
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
        await prisma.teamMember.delete({
            where: { id },
        })

        return NextResponse.json({
            success: true,
            data: { message: 'Team member deleted successfully' },
        })
    } catch (error) {
        console.error('Delete Team Member Error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to delete team member' },
            { status: 500 }
        )
    }
}
