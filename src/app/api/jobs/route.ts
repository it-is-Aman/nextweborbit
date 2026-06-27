import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'
import { getJobs, createJob } from '@/backend/api/jobs'

export async function GET() {
    return getJobs()
}

export async function POST(request: NextRequest) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return createJob(request)
}

// Cache for 30 minutes
export const revalidate = 1800
