import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/lib/prisma'
import type { ApiResponse, StatisticsResponse } from '@/types/api'
import { statisticSchema } from '@/shared/validation'

export async function getStatistics() {
    try {
        // Fetch active statistics from database, ordered by order field
        const stats = await prisma.statistic.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
            select: {
                id: true,
                key: true,
                value: true,
                label: true,
                icon: true,
            },
        })

        const response: ApiResponse<StatisticsResponse> = {
            success: true,
            data: {

                statistics: stats.map((stat) => ({
                    id: stat.key, // Using key as ID for frontend compatibility
                    value: stat.value,
                    label: stat.label,
                    icon: stat.icon,
                })),
            },
        }

        return NextResponse.json(response)
    } catch (error) {
        console.error('Statistics API Error:', error)

        const errorResponse: ApiResponse = {
            success: false,
            error: 'Failed to fetch statistics',
        }

        return NextResponse.json(errorResponse, { status: 500 })
    }
}

export async function createStatistic(request: NextRequest) {
    try {
        const body = await request.json()

        const result = statisticSchema.safeParse(body)
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

        const existingStat = await prisma.statistic.findUnique({
            where: { key: data.key },
        })

        if (existingStat) {
            return NextResponse.json(
                { success: false, error: 'Statistic with this key already exists' },
                { status: 400 }
            )
        }

        const newStat = await prisma.statistic.create({
            data: {
                key: data.key,
                value: data.value,
                label: data.label,
                icon: data.icon,
                order: data.order,
                isActive: data.isActive,
            },
        })

        return NextResponse.json({
            success: true,
            data: newStat,
        })
    } catch (error) {
        console.error('Create Statistic Error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to create statistic' },
            { status: 500 }
        )
    }
}
