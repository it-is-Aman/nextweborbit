import Link from 'next/link'
import Image from 'next/image'
import { getBlogPosts } from '@/frontend/lib/hygraph'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import FloatingButtons from '@/components/layout/floating-buttons'
import { Calendar, User, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insights & Blog | Next Web Orbit',
  description: 'Stay ahead of the curve with our latest design trends, software development insights, and SEO tips.',
  alternates: {
    canonical: 'https://nextweborbit.com/blog',
  },
  openGraph: {
    title: 'Insights & Blog | Next Web Orbit',
    description: 'Latest trends in website development, digital marketing, and tech solutions.',
    url: 'https://nextweborbit.com/blog',
    type: 'website',
  },
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-[#FAF9F6] to-neutral-100/60 text-neutral-900 pt-28 pb-20">
        
        {/* Header Section */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0072F5] animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#0072F5]">Tech & Design Insights</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.9] text-neutral-950 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B1E77] to-[#0072F5]">Blog</span> & News
          </h1>
          <p className="text-base sm:text-lg font-light text-neutral-500 max-w-xl mx-auto leading-relaxed">
            Discover articles, tutorials, and success stories written by our software engineers, designers, and marketing experts.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20 bg-white/50 backdrop-blur-md rounded-3xl border border-neutral-200/50 max-w-2xl mx-auto shadow-sm">
              <p className="text-neutral-400 font-bold uppercase tracking-wider text-sm">No Articles Found</p>
              <p className="text-neutral-500 text-xs mt-2">Check back soon for new insights, or check your Hygraph API URL configuration in `.env`!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const coverImageUrl = post.coverImage?.url || null

                const formattedDate = new Date(post.date || post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })

                return (
                  <article 
                    key={post.id} 
                    className="group bg-white/90 backdrop-blur-md border border-neutral-200/80 rounded-[2.5rem] p-6 shadow-md hover:shadow-xl hover:shadow-[#0072F5]/5 transition-all duration-500 hover:-translate-y-1.5 flex flex-col h-full"
                  >
                    {/* Cover Image */}
                    <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-neutral-100 mb-6">
                      {coverImageUrl ? (
                        <Image
                          src={coverImageUrl}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#2B1E77] to-[#0072F5] opacity-90 flex items-center justify-center">
                          <span className="text-white/20 font-black tracking-widest text-7xl select-none font-mono">NW</span>
                        </div>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-neutral-400 text-[10px] font-black tracking-wider uppercase mb-3">
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

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl font-black text-neutral-900 leading-tight tracking-tight mb-3 uppercase group-hover:text-[#0072F5] transition-colors duration-300">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-neutral-500 font-light text-sm sm:text-base leading-relaxed mb-6 flex-grow">
                      {post.excerpt || 'Read the full article for design tips and code snippets.'}
                    </p>

                    {/* Read More Link */}
                    <div className="mt-auto border-t border-neutral-100 pt-4">
                      <Link 
                        href={`/blog/${post.slug}`} 
                        className="group/btn inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-[#0072F5] transition-colors duration-300"
                      >
                        Read Full Article
                        <span className="w-7 h-7 rounded-full border border-neutral-200 group-hover/btn:border-[#0072F5] flex items-center justify-center transition-all group-hover/btn:translate-x-1">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </Link>
                    </div>

                  </article>
                )
              })}
            </div>
          )}
        </div>

      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
