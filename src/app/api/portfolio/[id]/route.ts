import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/lib/prisma'

export async function PUT(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const params = await props.params;
        const { id } = params
        const body = await request.json()
        const { name, category, type, description, preview, imageUrl, projectLink, order, isActive } = body

        // Validate type if provided
        if (type && !['Our Product', 'Website', 'Application'].includes(type)) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Invalid type'
                },
                { status: 400 }
            )
        }

        // Update portfolio item
        const item = await prisma.portfolioItem.update({
            where: { id },
            data: {
                ...(name && { name }),

                ...(category && { category }),
                ...(type && { type }),
                ...(description && { description }),
                ...(preview && { preview }),
                ...(imageUrl !== undefined && { imageUrl }),
                ...(projectLink !== undefined && { projectLink }),
                ...(order !== undefined && { order }),
                ...(isActive !== undefined && { isActive })
            }
        })

        return NextResponse.json({
            success: true,
            data: {
                ...item,
                createdAt: item.createdAt.toISOString(),
                updatedAt: item.updatedAt.toISOString()
            }
        })
    } catch (error) {
        console.error('Portfolio PUT Error:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to update portfolio item'
            },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const params = await props.params;
        const { id } = params

        // Delete portfolio item
        await prisma.portfolioItem.delete({
            where: { id }
        })

        return NextResponse.json({
            success: true,
            message: 'Portfolio item deleted successfully'
        })
    } catch (error) {
        console.error('Portfolio DELETE Error:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to delete portfolio item'
            },
            { status: 500 }
        )
    }
}
