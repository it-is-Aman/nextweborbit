import { z } from 'zod'

// Newsletter Validation
export const newsletterSchema = z.object({
    email: z.string().email('Invalid email address'),
})

export type NewsletterInput = z.infer<typeof newsletterSchema>

// Contact Form Validation
export const contactSchema = z.object({
    firstName: z.string().min(1, 'First name is required').max(50),
    lastName: z.string().max(50).optional(),
    email: z.string().email('Invalid email address'),
    phone: z.string().max(20).optional(),
    company: z.string().max(100).optional(),
    service: z.string().max(100).optional(),
    message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
})

export type ContactInput = z.infer<typeof contactSchema>

// Job Query Validation
export const jobQuerySchema = z.object({
    category: z.string().optional(),
})

export type JobQuery = z.infer<typeof jobQuerySchema>

// Job Creation Validation
export const jobSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    location: z.string().optional().nullable(),
    employmentTypes: z.string().min(1, 'Employment type is required'),
    googleFormUrl: z.string().url('Invalid URL').optional().nullable(),
    isActive: z.boolean().default(true)
})

export type JobInput = z.infer<typeof jobSchema>

// Statistics Validation
export const statisticSchema = z.object({
    key: z.string().min(1, 'Key is required'),
    value: z.string().min(1, 'Value is required'),
    label: z.string().min(1, 'Label is required'),
    icon: z.string().min(1, 'Icon string is required'),
    order: z.number().int().default(0),
    isActive: z.boolean().default(true)
})

export type StatisticInput = z.infer<typeof statisticSchema>

// Team Validation
export const teamMemberSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    role: z.string().min(1, 'Role is required'),
    bio: z.string().optional().default(''),
    image: z.string().min(1, 'Image is required'), // assuming path string
    order: z.number().int().default(0),
    isActive: z.boolean().default(true)
})

export type TeamMemberInput = z.infer<typeof teamMemberSchema>

// Portfolio Validation
export const portfolioSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    category: z.string().min(1, 'Category is required'),
    type: z.enum(['Our Product', 'Website', 'Application']),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    preview: z.string().optional().default(''),
    imageUrl: z.string().optional().or(z.literal('')),
    projectLink: z.string().optional().or(z.literal('')),
    order: z.number().int().default(0),
    isActive: z.boolean().default(true)
})

export type PortfolioInput = z.infer<typeof portfolioSchema>
