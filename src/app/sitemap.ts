import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        '',
        '/company/about',
        '/application-development',
        '/digital-marketing',
        '/software-development',
        '/website-development',
        '/seo-packages',
        '/ui-ux-design',
        '/portfolio',
        '/contact',
        '/career',
        '/gallery',
    ].map((route) => ({
        url: `${siteConfig.url}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    return routes
}
