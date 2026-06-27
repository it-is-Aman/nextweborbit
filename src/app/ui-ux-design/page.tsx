import Header from '@/frontend/components/layout/header'
import Footer from '@/frontend/components/layout/footer'
import UiUxDesignSection from '@/frontend/components/features/ui-ux-design/ui-ux-design-section'

export const metadata = {
    title: 'Advanced UI/UX Design | Next Web Orbit',
    description: 'Elevate your brand with premium UI/UX design services. We create intuitive, engaging, and high-converting digital experiences.',
}

export default function UIUXDesignPage() {
    return (
        <main className="min-h-screen">
            <Header />
            <UiUxDesignSection />
            <Footer />
        </main>
    )
}
