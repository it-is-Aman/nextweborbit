import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'
import { getPortfolioItems, createPortfolioItem } from '@/backend/api/portfolio'

export async function GET(request: NextRequest) {
    return getPortfolioItems(request)
}

export async function POST(request: NextRequest) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return createPortfolioItem(request)
}
