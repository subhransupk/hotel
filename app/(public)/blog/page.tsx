'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Calendar, Clock, User, Tag, ArrowRight } from 'lucide-react'

const categories = [
  { name: 'All', value: 'all' },
  { name: 'Industry News', value: 'industry-news' },
  { name: 'Product Updates', value: 'product-updates' },
  { name: 'Tips & Tricks', value: 'tips-tricks' },
  { name: 'Case Studies', value: 'case-studies' },
  { name: 'Company News', value: 'company-news' },
]

const blogPosts = [
  {
    id: 1,
    title: 'How AI is Transforming the Hotel Industry in 2023',
    description: 'Discover how artificial intelligence is revolutionizing guest experiences, operational efficiency, and revenue management in the hospitality sector.',
    category: 'industry-news',
    date: 'Aug 16, 2023',
    readTime: '8 min read',
    author: 'Sarah Johnson',
    authorRole: 'Industry Analyst',
    image: 'https://dummyimage.com/800x450/3b82f6/ffffff.jpg&text=AI+in+Hospitality',
    featured: true,
    tags: ['AI', 'Technology', 'Future Trends'],
  },
  {
    id: 2,
    title: 'Introducing Smart Room Controls: The Future of Guest Comfort',
    description: 'We\'re excited to announce our new Smart Room Controls feature, allowing guests to personalize their entire room experience from a single interface.',
    category: 'product-updates',
    date: 'Jul 28, 2023',
    readTime: '5 min read',
    author: 'Michael Chen',
    authorRole: 'Product Manager',
    image: 'https://dummyimage.com/800x450/4f46e5/ffffff.jpg&text=Smart+Room+Controls',
    featured: false,
    tags: ['Product Update', 'Smart Rooms', 'Guest Experience'],
  },
  {
    id: 3,
    title: '10 Ways to Increase Direct Bookings for Your Hotel',
    description: 'Learn proven strategies to boost direct bookings and reduce dependency on OTAs with these actionable tips from industry experts.',
    category: 'tips-tricks',
    date: 'Jul 15, 2023',
    readTime: '12 min read',
    author: 'Emma Rodriguez',
    authorRole: 'Marketing Specialist',
    image: 'https://dummyimage.com/800x450/0ea5e9/ffffff.jpg&text=Direct+Bookings',
    featured: true,
    tags: ['Marketing', 'Direct Bookings', 'OTAs'],
  },
  {
    id: 4,
    title: 'How Luxury Hotel Chain Increased Revenue by 32% with Our Platform',
    description: 'Discover how The Grand Collection implemented our platform to streamline operations and significantly boost their revenue across 12 properties.',
    category: 'case-studies',
    date: 'Jun 30, 2023',
    readTime: '10 min read',
    author: 'David Park',
    authorRole: 'Customer Success',
    image: 'https://dummyimage.com/800x450/6366f1/ffffff.jpg&text=Success+Story',
    featured: false,
    tags: ['Case Study', 'Revenue Management', 'Luxury Hotels'],
  },
  {
    id: 5,
    title: 'The Future of Contactless Check-in: Beyond the Pandemic',
    description: 'While contactless solutions gained popularity during the pandemic, they\'re here to stay. Learn how they\'re evolving to enhance the guest journey.',
    category: 'industry-news',
    date: 'Jun 22, 2023',
    readTime: '7 min read',
    author: 'Olivia Martinez',
    authorRole: 'Guest Experience Director',
    image: 'https://dummyimage.com/800x450/8b5cf6/ffffff.jpg&text=Contactless+Check-in',
    featured: false,
    tags: ['Contactless', 'Check-in', 'Guest Experience'],
  },
  {
    id: 6,
    title: 'HotelSaaS Raises $25M in Series B Funding to Accelerate Growth',
    description: 'We\'re thrilled to announce our recent funding round led by Hospitality Ventures, which will help us expand our platform and enter new markets.',
    category: 'company-news',
    date: 'Jun 10, 2023',
    readTime: '4 min read',
    author: 'Robert Williams',
    authorRole: 'CEO',
    image: 'https://dummyimage.com/800x450/ec4899/ffffff.jpg&text=Funding+News',
    featured: true,
    tags: ['Funding', 'Growth', 'Company News'],
  },
]

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })
  
  const featuredPosts = filteredPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/90 via-white/50 to-white dark:from-blue-950/50 dark:via-gray-900/50 dark:to-gray-900" />
          
          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex justify-center"
            >
              <div className="rounded-full p-1 px-3 bg-blue-50 dark:bg-blue-900/30 ring-1 ring-blue-500/20 dark:ring-blue-400/20">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Industry Insights
                  </span>
                </div>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white mb-6"
            >
              Blog & Resources
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
            >
              Insights, updates, and expert advice for the hospitality industry
            </motion.p>
            
            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex items-center justify-center"
            >
              <div className="relative w-full max-w-xl">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm py-3 pl-10 pr-3 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>
            
            {/* Categories */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap justify-center gap-2"
            >
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    selectedCategory === category.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="bg-white dark:bg-gray-900 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl mb-8">
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col overflow-hidden rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center rounded-full bg-blue-600/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between bg-white dark:bg-gray-800 p-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-x-4 text-xs">
                        <time dateTime={post.date} className="text-gray-500 dark:text-gray-400 flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {post.date}
                        </time>
                        <span className="text-gray-500 dark:text-gray-400 flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <div className="mt-4 block">
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">{post.title}</p>
                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{post.description}</p>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span key={tag} className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{post.author}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{post.authorRole}</p>
                      </div>
                      <div className="ml-auto">
                        <Link
                          href={`/blog/${post.id}`}
                          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 flex items-center"
                        >
                          Read more <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Regular Posts */}
      <div className="bg-gray-50 dark:bg-gray-800/50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl mb-8">
            All Articles
          </h2>
          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-start"
                >
                  <div className="relative w-full">
                    <div className="aspect-[16/9] w-full rounded-2xl bg-gray-100 dark:bg-gray-800 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center rounded-full bg-gray-50/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                        {categories.find(c => c.value === post.category)?.name}
                      </span>
                    </div>
                  </div>
                  <div className="max-w-xl">
                    <div className="mt-8 flex items-center gap-x-4 text-xs">
                      <time dateTime={post.date} className="text-gray-500 dark:text-gray-400 flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {post.date}
                      </time>
                      <span className="text-gray-500 dark:text-gray-400 flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <div className="mt-4 group">
                      <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        <Link href={`/blog/${post.id}`}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400 line-clamp-3">{post.description}</p>
                    </div>
                    <div className="mt-4 flex items-center gap-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white text-xs font-bold">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      <div className="text-sm leading-6">
                        <p className="font-medium text-gray-900 dark:text-white">{post.author}</p>
                        <p className="text-gray-500 dark:text-gray-400">{post.authorRole}</p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Stay updated with our newsletter
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Get the latest industry insights, product updates, and expert tips delivered to your inbox.
            </p>
            <form className="mx-auto mt-10 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Subscribe
              </button>
            </form>
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <circle cx={512} cy={512} r={512} fill="url(#gradient)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="gradient">
                  <stop stopColor="#3b82f6" />
                  <stop offset={1} stopColor="#1d4ed8" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
} 