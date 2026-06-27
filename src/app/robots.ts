import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/admin/',
                '/api/',
                '/private/',
                '/verify/',
                '/forgot-password/',
                '/login/',
            ],
        },
        sitemap: `${siteConfig.url}/sitemap.xml`,
    }
}
