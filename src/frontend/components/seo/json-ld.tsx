import { siteConfig } from '@/config/site'

export default function JsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`, // Ensure you have a logo at this path or update it
        sameAs: [
            siteConfig.links.twitter,
            siteConfig.links.github,
            // Add other social links here
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-8588900105', // Update with actual phone
            contactType: 'customer service',
            areaServed: 'IN',
            availableLanguage: 'en',
        },
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Sector 59', // Update with actual address
            addressLocality: 'Noida',
            addressRegion: 'UP',
            postalCode: '201301',
            addressCountry: 'IN',
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}
