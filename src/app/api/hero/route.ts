import { NextResponse } from 'next/server'
import { getHeroes } from '@/frontend/lib/hygraph'

export async function GET() {
  try {
    const heroes = await getHeroes()
    return NextResponse.json({ success: true, heroes })
  } catch (error) {
    console.error('Failed to get hero data:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch hero' }, { status: 500 })
  }
}
