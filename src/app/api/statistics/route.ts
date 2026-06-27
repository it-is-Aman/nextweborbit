import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'
import { getStatistics, createStatistic } from '@/backend/api/statistics'

export async function GET() {
    return getStatistics()
}

export async function POST(request: NextRequest) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return createStatistic(request)
}

// Cache for 1 hour
export const revalidate = 3600
