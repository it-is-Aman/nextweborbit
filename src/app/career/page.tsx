'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import FloatingButtons from '@/components/layout/floating-buttons'
import CareerHeroSection from '@/components/features/career/hero-section'
import JobListings from '@/components/features/career/job-listings'
import { api } from '@/frontend/lib/api-client'
import { JobData, JobsResponse } from '@/types/api'

export default function CareerPage() {
  const [jobs, setJobs] = useState<JobData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get<{ success: boolean; data: JobsResponse }>('/api/jobs')
        if (response.success && response.data) {
          setJobs(response.data.jobs)
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [])

  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-20 bg-background min-h-screen">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CareerHeroSection />
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <JobListings jobs={jobs} />
          )}
        </div>
      </section>
      <Footer />
      <FloatingButtons />
    </main>
  )
}
