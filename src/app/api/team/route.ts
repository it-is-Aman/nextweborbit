import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'
import { getTeamMembers, createTeamMember } from '@/backend/api/team'

export async function GET() {
    return getTeamMembers()
}

export async function POST(request: NextRequest) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return createTeamMember(request)
}

// Cache for 1 hour
export const revalidate = 3600
