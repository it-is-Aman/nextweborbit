'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Eye } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Post {
    id: string;
    title: string;
    slug: string;
    publishedAt: string;
    createdAt: string;
}

export default function BlogSection() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/blog')
            .then((res) => res.json())
            .then((data) => {
                if (data.success && data.posts) {
                    // Show top 2 most recent posts on the homepage list
                    setPosts(data.posts.slice(0, 2))
                }
                setLoading(false)
            })
            .catch((err) => {
                console.error('Failed to load blogs:', err)
                setLoading(false)
            })
    }, [])

    return (
        <section className="py-24 bg-[#FAF9F6] text-neutral-900 relative overflow-hidden font-sans border-t border-b border-neutral-200/60">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    
                    {/* Left Column - Header and Large Action Badge */}
                    <div className="lg:col-span-5 flex flex-col space-y-8">
                        <div>
                            {/* Slanted/cursive-looking blue subtitle */}
                            <span className="text-xl font-bold italic tracking-wide text-[#0072F5] block mb-2 font-serif">
                                My Blogs
                            </span>
                            <div className="w-16 h-[2px] bg-[#0072F5] mb-4" />
                            
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.9] text-neutral-900">
                                Recent Posts
                            </h2>
                        </div>

                        {/* Large Blue Circle "Explore Portfolio" Badge */}
                        <div className="pt-6">
                            <Link href="/blog" className="group inline-flex flex-col items-center justify-center w-40 h-40 rounded-full bg-[#0072F5] hover:bg-[#005BC5] text-white font-bold uppercase tracking-wider text-center p-4 transition-all duration-500 transform hover:scale-105 hover:rotate-3 shadow-lg hover:shadow-xl shadow-blue-500/10">
                                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                                    <ArrowRight className="w-6 h-6 text-white stroke-[2.5]" />
                                </span>
                                <span className="text-xs font-black tracking-widest leading-tight">
                                    Explore <br /> Our Work
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column - Blog Posts List */}
                    <div className="lg:col-span-7 flex flex-col divide-y divide-neutral-200/80">
                        {loading ? (
                          // Premium Skeleton Loader
                          [...Array(2)].map((_, idx) => (
                            <div key={idx} className="py-8 first:pt-0 last:pb-0 space-y-4 animate-pulse">
                              <div className="w-32 h-6 bg-neutral-200 rounded-full" />
                              <div className="w-full h-8 bg-neutral-200 rounded-2xl" />
                            </div>
                          ))
                        ) : posts.length === 0 ? (
                          <div className="py-8 first:pt-0 text-neutral-500 font-bold uppercase tracking-wider text-xs">
                            No recent posts found. Check back later!
                          </div>
                        ) : (
                          posts.map((post, idx) => {
                            const formattedDate = new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })

                            return (
                              <motion.div
                                  key={post.id}
                                  initial={{ opacity: 0, x: 20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                                  viewport={{ once: true }}
                                  className="py-8 first:pt-0 last:pb-0"
                              >
                                  <Link href={`/blog/${post.slug}`} className="group flex items-start sm:items-center justify-between gap-6">
                                      <div className="flex flex-col space-y-3 max-w-xl">
                                          {/* Date Tag */}
                                          <div className="inline-block">
                                              <span className="px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-neutral-500 bg-neutral-100 border border-neutral-200 rounded-full">
                                                  {formattedDate}
                                              </span>
                                          </div>
                                          {/* Post Title */}
                                          <h3 className="text-xl sm:text-2xl font-black uppercase text-neutral-800 leading-tight tracking-tight group-hover:text-[#0072F5] transition-colors duration-300">
                                              {post.title}
                                          </h3>
                                      </div>

                                      {/* Action Eye Icon */}
                                      <div className="w-12 h-12 rounded-full border border-neutral-200 group-hover:border-[#0072F5] flex items-center justify-center flex-shrink-0 transition-colors duration-300 bg-white shadow-sm">
                                          <Eye className="w-5 h-5 text-neutral-400 group-hover:text-[#0072F5] transition-colors duration-300" />
                                      </div>
                                  </Link>
                              </motion.div>
                            )
                          })
                        )}
                    </div>

                </div>
            </div>
        </section>
    )
}
