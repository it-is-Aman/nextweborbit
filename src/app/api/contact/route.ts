import { NextRequest } from 'next/server'
import { handleContactSubmission } from '@/backend/api/contact'

export async function POST(request: NextRequest) {
  return handleContactSubmission(request)
}
