import React from 'react'
import { type LucideIcon } from 'lucide-react'
import { Rocket, Users, Target, Zap, Code, TrendingUp, Layers, Palette, Facebook, Instagram, Linkedin, Youtube, Send } from 'lucide-react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const XIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.482 3.239H4.293L17.607 20.65z" />
  </svg>
)

const ThreadsIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 192 192"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
  </svg>
)

const PinterestIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.397 2.965 7.397 6.93 0 4.135-2.607 7.462-6.225 7.462-1.215 0-2.358-.631-2.75-1.378l-.75 2.852c-.271 1.033-1.002 2.324-1.492 3.121 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
)

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
      label: 'Noida Office',
      value: 'Sector 59, Noida,Uttar Pradesh, PIN 201309',
      // mapUrl: 'https://www.google.com/maps/place/Best+Website+Designing+Company+In+Noida+-+Next+Web+Orbit'
    },
    // {
    //   label: 'USA Office',
    //   value: '5 Penn Plaza, 14th Floor, New York, NY 10001',
    //   mapUrl: 'https://www.google.com/maps/search/5+Penn+Plaza+New+York'
    // }
  ],
  phone: [
    { label: 'India', value: '+91-8588900105' }
  ],
  email: 'info@nextweborbit.com'
}

// Social Links
export interface SocialLink {
  name: string
  url: string
  icon: LucideIcon | React.ElementType
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/nextweborbit',
    icon: Facebook
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/nextweborbit/',
    icon: XIcon
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/nextweborbit/',
    icon: Instagram
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/nextweborbit',
    icon: Linkedin
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@nextweborbit',
    icon: Youtube
  },
  {
    name: 'Threads',
    url: 'https://www.threads.net/@nextweborbit',
    icon: ThreadsIcon
  },
  {
    name: 'Pinterest',
    url: 'https://in.pinterest.com/nextweborbit/',
    icon: PinterestIcon
  },
  {
    name: 'Telegram',
    url: 'https://t.me/nextweborbit',
    icon: Send
  }
]

// Footer Links
export interface CompanyInfo {
  name: string
  tagline: string
  description: string
  expertise: string[]
  logo: {
    dot: boolean
    dotColor: string
  }
}

export const COMPANY_INFO: CompanyInfo = {
  name: 'NextWebOrbit',
  tagline: 'Since 2025 - Global Delivery',
  description: 'We specialize in building fast, secure, and modern digital solutions for businesses across the globe. Whether it’s web development, AI systems, software platforms, or digital growth strategies - Build Your Digital Future with NextWebOrbit.',
  expertise: ['Web', 'Software', 'App', 'UI/UX', 'Meta', 'Google Ads', 'Shopify', 'GMB Setup',],
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
