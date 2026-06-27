import { NextRequest } from 'next/server'
import { handleNewsletterSubscription } from '@/backend/api/newsletter'

export async function POST(request: NextRequest) {
  return handleNewsletterSubscription(request)
}
