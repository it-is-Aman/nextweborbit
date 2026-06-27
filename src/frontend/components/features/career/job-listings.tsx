'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BottomToCenter } from '@/frontend/animations'
import type { JobData as Job } from '@/types/api'

interface JobListingsProps {
    jobs: Job[]
    googleFormUrls?: Record<string, string> // Optional: job ID to Google Form URL mapping
}

export default function JobListings({ jobs, googleFormUrls }: JobListingsProps) {
    const handleApply = (job: Job) => {
        // Get Google Form URL for this job
        const formUrl = googleFormUrls?.[job.id] || 'https://forms.gle/YOUR_DEFAULT_FORM_ID'

        // Open Google Form in new tab
        window.open(formUrl, '_blank', 'noopener,noreferrer')


    }

    return (
        <>
            {/* Job Listings */}
            <div className="space-y-0">
                {jobs.map((job, index) => (
                    <motion.div
                        key={job.id}
                        className="border-b border-border py-8 first:pt-0 last:border-b-0 group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ x: 4 }}
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            {/* Job Info */}
                            <div className="flex-1">
                                <h3 className="text-2xl font-black text-foreground leading-none mb-4 group-hover:text-primary transition-colors">
                                    {job.title}
                                </h3>
                                <p className="text-lg font-light opacity-80 leading-relaxed text-muted-foreground mb-4 max-w-2xl">
                                    {job.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-3">
                                    {job.location && (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-xs text-foreground">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {job.location}
                                        </span>
                                    )}
                                    {job.employmentTypes && job.employmentTypes.split(',').map((type, idx) => (
                                        <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                                            <Clock className="w-3.5 h-3.5" />
                                            {type.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Apply Button */}
                            <div className="flex-shrink-0">
                                <Button
                                    variant="outline"
                                    className="group/btn"
                                    onClick={() => handleApply(job)}
                                >
                                    Apply
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* No Jobs Message */}
            {jobs.length === 0 && (
                <BottomToCenter>
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">
                            No job openings found in this category. Check back soon!
                        </p>
                    </div>
                </BottomToCenter>
            )}
        </>
    )
}
