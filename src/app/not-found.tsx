import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700">Page Not Found</h2>
        <p className="text-gray-600">
          The page you are looking for does not exist.
        </p>
        <Button asChild className="mt-4">
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </div>
  )
}

