import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/lib/prisma'
import { portfolioSchema } from '@/shared/validation'

const MOCK_PORTFOLIO_ITEMS = [
    {
        id: "1",
        name: "TrippyJiffy",
        category: "Traveller",
        type: "Website",
        description: "TrippyJiffy: Unlock India’s 4th Dimension of Travel and Discovery.",
        preview: "https://trippyjiffy.com/assets/img%2017%20(1)-CmpkEblB.webp",
        imageUrl: "https://trippyjiffy.com/assets/img%2017%20(1)-CmpkEblB.webp",
        projectLink: "https://trippyjiffy.com/",
        order: 1,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "2",
        name: "Optimyz Learning",
        category: "Personalized Training",
        type: "Website",
        description: "High-performance personalized training.",
        preview: "https://optimyzlearning.com/static/media/mordernit.46e9fdf5b45689146e54.png",
        imageUrl: "https://optimyzlearning.com/static/media/mordernit.46e9fdf5b45689146e54.png",
        projectLink: "https://optimyzlearning.com/",
        order: 2,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "3",
        name: "SMC System",
        category: "Project Create a Better Future",
        type: "Website",
        description: "We specialize in two core areas backed by good engineering practices.",
        preview: "https://www.smcsystem.com/achive4.jpg",
        imageUrl: "https://www.smcsystem.com/achive4.jpg",
        projectLink: "https://www.smcsystem.com/",
        order: 3,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "4",
        name: "YogSaathi",
        category: "Yoga Fitness",
        type: "Our Product",
        description: "At YogSaathi, we believe Yoga is a way to bring balance and wellness.",
        preview: "https://yogsaathi.com/assets/s4-DVhAxnJ7.jpg",
        imageUrl: "https://yogsaathi.com/assets/s4-DVhAxnJ7.jpg",
        projectLink: "https://yogsaathi.com/",
        order: 4,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "5",
        name: "Aim Ascend",
        category: "Business Portfolio",
        type: "Our Product",
        description: "Committed to excellence and collaboration with leading organizations.",
        preview: "https://aimascend.com/assets/banner-CqPTKrVa.jpg",
        imageUrl: "https://aimascend.com/assets/banner-CqPTKrVa.jpg",
        projectLink: "https://aimascend.com/",
        order: 5,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "6",
        name: "Navkaar Real Estate",
        category: "Property",
        type: "Website",
        description: "Upcoming Infrastructure - Metro from Noida to Jewar Airport",
        preview: "https://navkaarrealestate.com/uploads/1763447690689.webp",
        imageUrl: "https://navkaarrealestate.com/uploads/1763447690689.webp",
        projectLink: "https://navkaarrealestate.com/",
        order: 6,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "7",
        name: "Arvind Rai",
        category: "Astrology",
        type: "Our Product",
        description: "A reader will be distracted by readable content of a page.",
        preview: "https://arvindrai.com/assets/about-BoRwXk-0.jpg",
        imageUrl: "https://arvindrai.com/assets/about-BoRwXk-0.jpg",
        projectLink: "https://arvindrai.com/",
        order: 7,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "8",
        name: "Avyanta Hotels",
        category: "Hotel",
        type: "Our Product",
        description: "Boundless comfort and refined elegance hospitality experience.",
        preview: "https://avyantahotels.com/Hero.png",
        imageUrl: "https://avyantahotels.com/Hero.png",
        projectLink: "https://avyantahotels.com/",
        order: 8,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

export async function getPortfolioItems(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const showHidden = searchParams.get('showHidden') === 'true'

    try {
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
    } catch (error: any) {
        const isConnectionError = 
            error.code?.startsWith('P1') || 
            error.message?.includes('Can\'t reach database server') ||
            error.message?.includes('PrismaClientInitializationError') ||
            error.name === 'PrismaClientInitializationError';

        if (isConnectionError) {
            console.warn('[Prisma] Database connection offline. Falling back to local mock portfolios.');
            let items = MOCK_PORTFOLIO_ITEMS;
            if (!showHidden) {
                items = items.filter(item => item.isActive);
            }
            if (type && ['Our Product', 'Website', 'Application'].includes(type)) {
                items = items.filter(item => item.type === type);
            }
            return NextResponse.json({
                success: true,
                data: {
                    items,
                    total: items.length
                }
            });
        }

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
