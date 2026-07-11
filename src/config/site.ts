// Site configuration

import { Metadata } from 'next';

import { env } from './env';

export const siteConfig = {
  name: 'NextWebOrbit',
  description: 'Leading IT Services in Noida | Web Development, Digital Marketing & Software Solutions',
  url: env.appUrl,
  ogImage: '/uploads/logo-1765640552599-591203543.png',
  links: {
    twitter: '#',
    github: '#',
  },
} as const;

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/images/logo-1.png',
    apple: '/images/logo-1.png',
  },
  keywords: [
    'IT Services',
    'Web Development',
    'Digital Marketing',
    'Software Solutions',
    'Noida',
    'Website Design',
    'SEO',
    'App Development'
  ],
  authors: [
    {
      name: 'NextWebOrbit',
    },
  ],
  creator: 'NextWebOrbit',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: '@nextweborbit',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

