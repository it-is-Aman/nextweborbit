import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/lib/prisma'
import type { ApiResponse, TeamResponse } from '@/types/api'
import { teamMemberSchema } from '@/shared/validation'
import { getTeamMembers as getHygraphTeamMembers } from '@/frontend/lib/hygraph'

const MOCK_TEAM_MEMBERS = [
    {
        id: "1",
        name: "Aman",
        role: "Founder & Lead Architect",
        bio: "Passionate engineer focusing on creating premium, scalable digital experiences.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80",
        order: 1,
        isActive: true
    },
    {
        id: "2",
        name: "Sarah Chen",
        role: "UI/UX Design Lead",
        bio: "Detail-oriented designer crafting intuitive visual systems and animations.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
        order: 2,
        isActive: true
    },
    {
        id: "3",
        name: "David Kim",
        role: "Senior Full Stack Developer",
        bio: "Expert in building highly-optimized APIs, database structures, and backend systems.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        order: 3,
        isActive: true
    }
];

export async function getTeamMembers() {
    try {
        // Try fetching from Hygraph first
        try {
            const hygraphMembers = await getHygraphTeamMembers()
            if (hygraphMembers && hygraphMembers.length > 0) {
                const response: ApiResponse<TeamResponse> = {
                    success: true,
                    data: {
                        members: hygraphMembers.map((member) => ({
                            id: member.id,
                            name: member.name,
                            role: member.role,
                            bio: member.bio || '',
                            image: member.image?.url || '/images/placeholder.jpg',
                        })),
                    },
                }
                return NextResponse.json(response)
            }
        } catch (hygraphErr) {
            console.warn('[Hygraph] Failed to fetch team members. Falling back to Prisma database.', hygraphErr)
        }

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
    } catch (error: any) {
        const isConnectionError = 
            error.code?.startsWith('P1') || 
            error.message?.includes('Can\'t reach database server') ||
            error.message?.includes('PrismaClientInitializationError') ||
            error.name === 'PrismaClientInitializationError';

        if (isConnectionError) {
            console.warn('[Prisma] Database connection offline. Falling back to local mock team members.');
            return NextResponse.json({
                success: true,
                data: {
                    members: MOCK_TEAM_MEMBERS
                }
            });
        }

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
