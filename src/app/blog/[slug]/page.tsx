import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '@/frontend/lib/hygraph'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import FloatingButtons from '@/components/layout/floating-buttons'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Article Not Found | Next Web Orbit',
    }
  }

  const coverImageUrl = post.coverImage?.url || 'https://nextweborbit.com/images/logo-1.png'

  return {
    title: `${post.title} | Next Web Orbit`,
    description: post.excerpt || 'Read this post on the Next Web Orbit blog.',
    alternates: {
      canonical: `https://nextweborbit.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || 'Read this post on the Next Web Orbit blog.',
      url: `https://nextweborbit.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt || post.createdAt,
      images: [
        {
          url: coverImageUrl,
          alt: post.title,
        }
      ],
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const coverImageUrl = post.coverImage?.url || null

  const formattedDate = new Date(post.date || post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-[#FAF9F6] to-neutral-100/60 text-neutral-900 pt-28 pb-20">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <div className="mb-8">
            <Link 
              href="/blog" 
              className="group inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-[#0072F5] transition-colors duration-300"
            >
              <span className="w-8 h-8 rounded-full border border-neutral-200 group-hover:border-[#0072F5] flex items-center justify-center transition-all group-hover:-translate-x-1">
                <ArrowLeft className="w-4 h-4" />
              </span>
              Back to Insights
            </Link>
          </div>

          <article>
            {/* Header Metadata */}
            <div className="mb-6">
              <div className="flex items-center gap-4 text-neutral-400 text-[10px] font-black tracking-wider uppercase mb-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#0072F5]" />
                  {formattedDate}
                </span>
                <span className="w-1 h-1 rounded-full bg-neutral-300" />
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#0072F5]" />
                  NextWebOrbit
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-neutral-950 leading-[1.05] tracking-tight">
                {post.title}
              </h1>
            </div>

            {/* Featured Image */}
            {coverImageUrl && (
              <div className="relative aspect-[16/9] w-full rounded-[2.5rem] overflow-hidden bg-neutral-100 mb-10 shadow-lg border border-neutral-200/50">
                <Image
                  src={coverImageUrl}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="object-cover"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="bg-white/95 border border-neutral-200/80 rounded-[2.5rem] p-8 md:p-12 shadow-md">
              <div 
                className="blog-content font-sans text-neutral-600 font-light leading-relaxed text-base sm:text-lg 
                  [&>h1]:text-3xl [&>h1]:font-black [&>h1]:text-neutral-955 [&>h1]:mt-8 [&>h1]:mb-4 [&>h1]:uppercase [&>h1]:leading-tight
                  [&>h2]:text-2xl [&>h2]:font-black [&>h2]:text-neutral-955 [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:uppercase [&>h2]:leading-tight
                  [&>h3]:text-xl [&>h3]:font-black [&>h3]:text-neutral-955 [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:uppercase [&>h3]:leading-tight
                  [&>p]:mb-5 [&>p]:leading-relaxed
                  [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:my-4 [&>ul]:space-y-2
                  [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:my-4 [&>ol]:space-y-2
                  [&>li]:mb-1
                  [&>blockquote]:border-l-4 [&>blockquote]:border-[#0072F5] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-neutral-600 [&>blockquote]:my-4 [&>blockquote]:leading-relaxed
                  [&>pre]:bg-neutral-50 [&>pre]:border [&>pre]:border-neutral-200/80 [&>pre]:p-5 [&>pre]:rounded-2xl [&>pre]:my-6 [&>pre]:overflow-x-auto [&>pre]:font-mono [&>pre]:text-sm [&>pre]:text-neutral-800 [&>pre]:shadow-inner"
                dangerouslySetInnerHTML={{ __html: post.content?.html || '' }}
              />
            </div>

          </article>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
