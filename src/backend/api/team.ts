import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/lib/prisma'
import type { ApiResponse, TeamResponse } from '@/types/api'
import { teamMemberSchema } from '@/shared/validation'

export async function getTeamMembers() {
    try {
        // Fetch active team members from database, ordered by order field
        const members = await prisma.teamMember.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
            select: {
                id: true,
                name: true,
                role: true,
                bio: true,
                image: true,
            },
        })

        const response: ApiResponse<TeamResponse> = {
            success: true,
            data: {

                members: members.map((member) => ({
                    id: member.id,
                    name: member.name,
                    role: member.role,
                    bio: member.bio,
                    image: member.image,
                })),
            },
        }

        return NextResponse.json(response)
    } catch (error) {
        console.error('Team API Error:', error)

        const errorResponse: ApiResponse = {
            success: false,
            error: 'Failed to fetch team members',
        }

        return NextResponse.json(errorResponse, { status: 500 })
    }
}

export async function createTeamMember(request: NextRequest) {
    try {
        const body = await request.json()

        const result = teamMemberSchema.safeParse(body)
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

        const newMember = await prisma.teamMember.create({
            data: {
                name: data.name,
                role: data.role,
                bio: data.bio,
                image: data.image,
                order: data.order,
                isActive: data.isActive,
            },
        })

        return NextResponse.json({
            success: true,
            data: newMember,
        })
    } catch (error) {
        console.error('Create Team Member Error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to create team member' },
            { status: 500 }
        )
    }
}
