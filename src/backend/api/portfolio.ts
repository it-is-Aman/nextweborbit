import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/lib/prisma'
import { portfolioSchema } from '@/shared/validation'

export async function getPortfolioItems(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const type = searchParams.get('type')
        const showHidden = searchParams.get('showHidden') === 'true'

        // Build query conditions
        const where: Record<string, string | boolean | undefined> = {}

        // Only filter by active status if not explicitly asked to show hidden (Admin mode)
        if (!showHidden) {
            where.isActive = true
        }

        // Add type filter if provided
        if (type && ['Our Product', 'Website', 'Application'].includes(type)) {
            where.type = type
        }

        // Fetch portfolio items from database
        const items = await prisma.portfolioItem.findMany({
            where,
            orderBy: [
                { order: 'asc' },
                { createdAt: 'desc' }
            ]
        })

        // Transform dates to strings for JSON serialization
        const transformedItems = items.map(item => ({
            ...item,
            createdAt: item.createdAt.toISOString(),
            updatedAt: item.updatedAt.toISOString()
        }))

        return NextResponse.json({
            success: true,
            data: {
                items: transformedItems,
                total: transformedItems.length
            }
        })
    } catch (error) {
        console.error('Portfolio API Error:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch portfolio items'
            },
            { status: 500 }
        )
    }
}

export async function createPortfolioItem(request: NextRequest) {
    try {
        const body = await request.json()

        // Use Zod for strict validation
        const result = portfolioSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Validation failed',
                    details: result.error.issues.map(e => e.message)
                },
                { status: 400 }
            )
        }

        const data = result.data

        // Create portfolio item
        const item = await prisma.portfolioItem.create({
            data: {
                name: data.name,
                category: data.category,
                type: data.type,
                description: data.description,
                preview: data.preview,
                imageUrl: data.imageUrl,
                projectLink: data.projectLink,
                order: data.order,
                isActive: data.isActive
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
        console.error('Portfolio POST Error:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to create portfolio item'
            },
            { status: 500 }
        )
    }
}
