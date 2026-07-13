import { NextResponse } from 'next/server'
import { getServiceSubcategories } from '@/frontend/lib/hygraph'

export async function GET() {
  try {
    const services = await getServiceSubcategories()
    return NextResponse.json({ success: true, services })
  } catch (error) {
    console.error('Failed to get services list:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch services' }, { status: 500 })
  }
}
