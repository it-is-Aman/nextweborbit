import { LucideIcon } from 'lucide-react'
import { Rocket, Users, Target, Zap, Code, TrendingUp, Layers, Palette, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'

export interface AboutFeature {
  id: number
  title: string
  description: string
  icon: LucideIcon
}

export const ABOUT_FEATURES: AboutFeature[] = [
  {
    id: 1,
    title: 'Innovation First',
    description: 'We leverage cutting-edge technologies to deliver solutions that keep you ahead of the competition.',
    icon: Rocket
  },
  {
    id: 2,
    title: 'Expert Team',
    description: 'Our skilled professionals bring years of experience across web development, design, and digital marketing.',
    icon: Users
  },
  {
    id: 3,
    title: 'Results Driven',
    description: 'We focus on measurable outcomes that directly impact your business growth and success.',
    icon: Target
  },
  {
    id: 4,
    title: 'Fast Delivery',
    description: 'Efficient workflows and agile methodologies ensure timely delivery without compromising quality.',
    icon: Zap
  }
]

export interface Service {
  id: number
  title: string
  description: string
  icon: LucideIcon
  slug: string
}

export const SERVICES: Service[] = [
  {
    id: 1,
    title: 'Website Development',
    description: 'Beautiful, intuitive designs that create engaging user experiences and strengthen your brand identity.',
    icon: Palette,
    slug: 'website-development'
    
  },
  {
    id: 2,
    title: 'Application Development',
    description: 'Custom websites and web applications built with modern technologies for optimal performance and user experience.',
    icon: Code,
    slug: 'application-development'
  },
  {
    id: 3,
    title: 'Software Development',
    description: 'Tailored software development services to streamline your business processes and boost productivity.',
    icon: Layers,
    slug: 'software-development'
  },
  {
    id: 4,
    title: 'Digital Marketing',
    description: 'Strategic marketing campaigns that increase your online visibility and drive qualified traffic to your business.',
    icon: TrendingUp,
    slug: 'digital-marketing'
  },
  {
    id: 5,
    title: 'SEO Packages',
    description: 'Boost your visibility and rank higher with our proven SEO strategies.',
    icon: Target,
    slug: 'seo-packages'
  },
  {
    id: 6,
    title: 'UI/UX Design',
    description: 'Crafting intuitive and engaging user experiences that drive user satisfaction and conversion.',
    icon: Palette,
    slug: 'ui-ux-design'
  }
]

// Core Values
export interface CoreValue {
  id: string
  name: string
  description?: string
  image: string
}

export const CORE_VALUES: CoreValue[] = [
  {
    id: 'innovation',
    name: 'Innovation',
    description: 'We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
  },
  {
    id: 'integrity',
    name: 'Integrity',
    description: 'We maintain the highest standards of honesty and transparency in all our interactions.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80'
  },
  {
    id: 'excellence',
    name: 'Excellence',
    description: 'We strive for excellence in every project, delivering quality that exceeds expectations.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80'
  },
  {
    id: 'collaboration',
    name: 'Collaboration',
    description: 'We believe in the power of teamwork and foster strong partnerships with our clients.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'
  }
]

// Contact Information
// Contact Information
export interface ContactInfo {
  address: {
    label: string
    value: string
    mapUrl?: string
  }[]
  phone: {
    label: string
    value: string
  }[]
  email: string
}

export const CONTACT_INFO: ContactInfo = {
  address: [
    {
      label: 'India Office',
      value: 'Sector 59, Noida,Uttar Pradesh, PIN 201309',
      // mapUrl: 'https://www.google.com/maps/search/Galaxy+Blue+Sapphire+Plaza+Noida'
    },
    // {
    //   label: 'USA Office',
    //   value: '5 Penn Plaza, 14th Floor, New York, NY 10001',
    //   mapUrl: 'https://www.google.com/maps/search/5+Penn+Plaza+New+York'
    // }
  ],
  phone: [
    { label: 'India', value: '+91-7303468125' },
    // { label: 'USA', value: '+1 646 859 1276' }
  ],
  email: 'info@nextweborbit.com'
}

// Social Links
export interface SocialLink {
  name: string
  url: string
  icon: LucideIcon
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Facebook',
    url: 'https://facebook.com',
    icon: Facebook
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com',
    icon: Twitter
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com',
    icon: Instagram
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: Linkedin
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com',
    icon: Youtube
  }
]

// Footer Links
export interface FooterLinks {
  useful: Array<{ label: string; href: string }>
}

export const FOOTER_LINKS: FooterLinks = {
  useful: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/company/about' },
    { label: 'Services', href: '/#services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Career', href: '/career' },
    { label: 'Contact', href: '/contact' }
  ]
}

// Company Info
export interface CompanyInfo {
  name: string
  description: string
  logo: {
    dot: boolean
    dotColor: string
  }
}

export const COMPANY_INFO: CompanyInfo = {
  name: 'NextWebOrbit',
  description: 'Transforming digital landscapes with innovative web development, digital marketing, and software solutions.',
  logo: {
    dot: true,
    dotColor: 'bg-foreground'
  }
}

// Job Categories
export const JOB_CATEGORIES: string[] = [
  'Engineering',
  'Design',
  'Marketing',
  'Sales'
]

// Jobs
export interface Job {
  id: string
  title: string
  description: string
  category: string
  location?: string
  remote: boolean
  employmentType: string
}

export const JOBS: Job[] = [
  {
    id: 'senior-frontend-dev',
    title: 'Senior Frontend Developer',
    description: 'We are looking for an experienced frontend developer to join our team and build amazing user experiences.',
    category: 'Engineering',
    location: 'Noida, INDIA',
    remote: true,
    employmentType: 'Full-time'
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    description: 'Join our design team to create beautiful and intuitive interfaces for our clients.',
    category: 'Design',
    location: 'Noida, INDIA',
    remote: true,
    employmentType: 'Full-time'
  },
  {
    id: 'digital-marketing-specialist',
    title: 'Digital Marketing Specialist',
    description: 'Help our clients grow their online presence through strategic marketing campaigns.',
    category: 'Marketing',
    location: 'Noida, INDIA',
    remote: true,
    employmentType: 'Full-time'
  },
  {
    id: 'backend-engineer',
    title: 'Backend Engineer',
    description: 'Build scalable and robust backend systems to power our applications.',
    category: 'Engineering',
    location: 'Noida, INDIA',
    remote: true,
    employmentType: 'Full-time'
  },
  {
    id: 'sales-executive',
    title: 'Sales Executive',
    description: 'Drive business growth by connecting with potential clients and showcasing our solutions.',
    category: 'Sales',
    location: 'Noida, INDIA',
    remote: false,
    employmentType: 'Full-time'
  }
]
