import { NextResponse } from 'next/server'
import { getBlogPosts } from '@/frontend/lib/hygraph'

export async function GET() {
  try {
    const posts = await getBlogPosts()
    return NextResponse.json({ success: true, posts })
  } catch (error) {
    console.error('Failed to get blogs:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch blogs' }, { status: 500 })
  }
}
