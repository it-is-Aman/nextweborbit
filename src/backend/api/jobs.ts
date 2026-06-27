import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/lib/prisma'
import type { ApiResponse, JobsResponse } from '@/types/api'
import { jobSchema } from '@/shared/validation'

const MOCK_JOBS = [
    {
        id: 'senior-frontend-dev',
        title: 'Senior Frontend Developer',
        description: 'We are looking for an experienced frontend developer to join our team and build amazing user experiences.',
        location: 'Noida, INDIA',
        employmentTypes: 'Full-time',
        googleFormUrl: 'https://google.com',
        isActive: true
    },
    {
        id: 'ui-ux-designer',
        title: 'UI/UX Designer',
        description: 'Join our design team to create beautiful and intuitive interfaces for our clients.',
        location: 'Noida, INDIA',
        employmentTypes: 'Full-time',
        googleFormUrl: 'https://google.com',
        isActive: true
    },
    {
        id: 'digital-marketing-specialist',
        title: 'Digital Marketing Specialist',
        description: 'Help our clients grow their online presence through strategic marketing campaigns.',
        location: 'Noida, INDIA',
        employmentTypes: 'Full-time',
        googleFormUrl: 'https://google.com',
        isActive: true
    }
];

export async function getJobs() {
    try {
        const jobs = await prisma.job.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                description: true,
                location: true,
                employmentTypes: true,
                googleFormUrl: true,
            },
        })

        const response: ApiResponse<JobsResponse> = {
            success: true,
            data: {

                jobs: jobs.map((job) => ({
                    id: job.id,
                    title: job.title,
                    description: job.description,
                    location: job.location || undefined,
                    employmentTypes: job.employmentTypes,
                    googleFormUrl: job.googleFormUrl || undefined,
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
            console.warn('[Prisma] Database connection offline. Falling back to local mock jobs.');
            return NextResponse.json({
                success: true,
                data: {
                    jobs: MOCK_JOBS
                }
            });
        }

        console.error('Jobs API Error:', error)

        const errorResponse: ApiResponse = {
            success: false,
            error: 'Failed to fetch jobs',
        }

        return NextResponse.json(errorResponse, { status: 500 })
    }
}

export async function createJob(request: NextRequest) {
    try {
        const body = await request.json()

        // Zod Validation
        const result = jobSchema.safeParse(body)

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

        const newJob = await prisma.job.create({
            data: {
                title: data.title,
                description: data.description,
                location: data.location,
                employmentTypes: data.employmentTypes,
                googleFormUrl: data.googleFormUrl,
                isActive: data.isActive,
            },
        })

        return NextResponse.json({
            success: true,
            data: newJob,
        })
    } catch (error) {
        console.error('Create Job Error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to create job' },
            { status: 500 }
        )
    }
}
