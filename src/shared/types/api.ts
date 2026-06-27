// API Response Types

export interface ApiResponse<T = unknown> {
    success: boolean
    data?: T
    message?: string
    error?: string
}

// Statistics API
export interface StatisticData {
    id: string
    value: string
    label: string
    icon: string // Icon name as string for API
}

export interface StatisticsResponse {
    statistics: StatisticData[]
}

// Newsletter API
export interface NewsletterSubscribeRequest {
    email: string
}

export interface NewsletterSubscribeResponse {
    message: string
    email: string
}

// Team API
export interface TeamMember {
    id: string
    name: string
    role: string
    image: string
    bio: string
}

export interface TeamResponse {
    members: TeamMember[]
}

// Jobs API
export interface JobData {
    id: string
    title: string
    description: string
    location?: string
    employmentTypes: string
    googleFormUrl?: string // Google Form URL for applications
}

export interface JobsResponse {
    jobs: JobData[]
}

// Contact API
export interface ContactFormRequest {
    firstName: string
    lastName?: string
    email: string
    phone?: string
    company?: string
    service?: string
    message: string
}

export interface ContactFormResponse {
    message: string
    submissionId?: string
}

// Portfolio API
export interface PortfolioItem {
    id: string
    name: string
    category: string
    type: 'Our Product' | 'Website' | 'Application'
    description: string
    preview: string
    imageUrl?: string
    projectLink?: string
    order: number
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export interface PortfolioResponse {
    items: PortfolioItem[]
    total: number
}

