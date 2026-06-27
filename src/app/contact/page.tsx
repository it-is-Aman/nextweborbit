import ContactPageView from '@/components/features/contact/page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Next Web Orbit – IT Company in Noida',
  description:
    'Contact Next Web Orbit for Website Development, Software Development, SEO & Digital Marketing services in Noida, India.',
  alternates: {
    canonical: 'https://nextweborbit.in/contact',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://nextweborbit.in/contact',
    title: 'Contact Us | Next Web Orbit – IT Company in Noida',
    description:
      'Get in touch with Next Web Orbit for Web Development, Software & Digital Marketing services.',
    siteName: 'Next Web Orbit',
    images: [
      {
        url: 'https://nextweborbit.in/uploads/logo-1765640552599-591203543.png',
        width: 1200,
        height: 630,
        alt: 'Next Web Orbit',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Next Web Orbit',
    description:
      'Get in touch with Next Web Orbit for IT and digital marketing services.',
    images: ['https://nextweborbit.in/uploads/logo-1765640552599-591203543.png'],
  },
}

export default function ContactPage() {
  return <ContactPageView />
}
