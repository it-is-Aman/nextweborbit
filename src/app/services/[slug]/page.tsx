import { notFound } from 'next/navigation'
import { getServiceSubcategoryBySlug } from '@/frontend/lib/hygraph'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import FloatingButtons from '@/components/layout/floating-buttons'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceSubcategoryBySlug(slug)
  
  if (!service) {
    return {
      title: 'Service Not Found | Next Web Orbit',
    }
  }

  return {
    title: `${service.title} | ${service.parentCategory || 'Services'} | Next Web Orbit`,
    description: `Professional ${service.title} services. Custom software, design, and digital growth systems.`,
  }
}

export default async function ServiceSubcategoryPage({ params }: PageProps) {
  const { slug } = await params
  const service = await getServiceSubcategoryBySlug(slug)

  if (!service) {
    notFound()
  }

  const hasCustomHeader = !!service.customHeaderHtml?.html
  const hasCustomFooter = !!service.customFooterHtml?.html

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-[#FAF9F6] to-neutral-100/60 text-neutral-900 pt-28 pb-20">
        
        {/* Dynamic / Default Header */}
        {hasCustomHeader ? (
          <div 
            className="custom-service-header"
            dangerouslySetInnerHTML={{ __html: service.customHeaderHtml?.html || '' }}
          />
        ) : (
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#0072F5]">
                {service.parentCategory || 'Services'}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.9] text-neutral-955 mb-6">
              {service.title}
            </h1>
            <div className="w-24 h-[2px] bg-gradient-to-r from-[#2B1E77] to-[#0072F5] mx-auto" />
          </div>
        )}

        {/* Core Content Box */}
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-neutral-200 rounded-[2.5rem] p-8 md:p-12 shadow-lg">
            <div 
              className="service-content font-sans text-neutral-600 font-light leading-relaxed text-base sm:text-lg 
                [&>h1]:text-3xl [&>h1]:font-black [&>h1]:text-[#2B1E77] [&>h1]:mt-10 [&>h1]:mb-4 [&>h1]:uppercase [&>h1]:leading-tight [&>h1]:tracking-tight
                [&>h2]:text-2xl [&>h2]:font-black [&>h2]:text-[#2B1E77] [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:uppercase [&>h2]:leading-tight [&>h2]:tracking-tight
                [&>h3]:text-xl [&>h3]:font-black [&>h3]:text-[#2B1E77] [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:uppercase [&>h3]:leading-tight [&>h3]:tracking-tight
                [&>p]:mb-6 [&>p]:leading-relaxed
                [&>strong]:text-neutral-950 [&>strong]:font-bold
                [&>a]:text-[#0072F5] hover:[&>a]:underline [&>a]:font-medium
                [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:my-4 [&>ul]:space-y-2
                [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:my-4 [&>ol]:space-y-2
                [&>li]:mb-1 [&>li]:text-neutral-600
                [&>blockquote]:border-l-4 [&>blockquote]:border-[#0072F5] [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-neutral-600 [&>blockquote]:my-6 [&>blockquote]:bg-blue-50/30 [&>blockquote]:py-4 [&>blockquote]:pr-4 [&>blockquote]:rounded-r-2xl
                [&>pre]:bg-slate-955 [&>pre]:border [&>pre]:border-slate-800 [&>pre]:p-6 [&>pre]:rounded-3xl [&>pre]:my-6 [&>pre]:overflow-x-auto [&>pre]:font-mono [&>pre]:text-sm [&>pre]:text-slate-100 [&>pre]:shadow-inner"
              dangerouslySetInnerHTML={{ __html: service.description.html }}
            />
          </div>
        </div>

        {/* Dynamic / Default Footer */}
        {hasCustomFooter ? (
          <div 
            className="custom-service-footer mt-16"
            dangerouslySetInnerHTML={{ __html: service.customFooterHtml?.html || '' }}
          />
        ) : (
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-16 text-center">
            <div className="bg-gradient-to-r from-[#2B1E77] to-[#0072F5] rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl">
              <h3 className="text-2xl sm:text-3xl font-black uppercase mb-4">Ready to start your project?</h3>
              <p className="text-white/80 font-light mb-8 max-w-xl mx-auto text-sm sm:text-base">
                Get in touch with our tech experts today to request a free estimate and scale your digital systems.
              </p>
              <a 
                href="/contact" 
                className="inline-block bg-white text-neutral-900 font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-full hover:bg-neutral-100 transition shadow-md"
              >
                Book Free Consultation
              </a>
            </div>
          </div>
        )}

      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
