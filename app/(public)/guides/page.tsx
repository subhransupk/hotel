'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  BookOpen, 
  Video, 
  FileText, 
  Lightbulb, 
  Search,
  ArrowRight,
  Clock,
  Tag,
  User
} from 'lucide-react'
import { useState } from 'react'

const categories = [
  { name: 'Getting Started', icon: BookOpen, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' },
  { name: 'Video Tutorials', icon: Video, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300' },
  { name: 'Documentation', icon: FileText, color: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' },
  { name: 'Best Practices', icon: Lightbulb, color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300' },
]

const guides = [
  {
    id: 1,
    title: 'Getting Started with HotelSaaS',
    description: 'Learn the basics of setting up your hotel management system and configuring your first property.',
    category: 'Getting Started',
    readTime: '10 min read',
    tags: ['Beginner', 'Setup'],
    image: 'https://dummyimage.com/600x400/4A90E2/ffffff.png&text=Getting+Started',
    slug: '/guides/getting-started',
  },
  {
    id: 2,
    title: 'Setting Up Room Types and Rates',
    description: 'Configure your room inventory, create room types, and set up your pricing structure.',
    category: 'Getting Started',
    readTime: '8 min read',
    tags: ['Rooms', 'Pricing'],
    image: 'https://dummyimage.com/600x400/4A90E2/ffffff.png&text=Room+Setup',
    slug: '/guides/room-setup',
  },
  {
    id: 3,
    title: 'Managing Reservations',
    description: 'Learn how to create, modify, and cancel reservations efficiently.',
    category: 'Documentation',
    readTime: '12 min read',
    tags: ['Bookings', 'Front Desk'],
    image: 'https://dummyimage.com/600x400/27AE60/ffffff.png&text=Reservations',
    slug: '/guides/managing-reservations',
  },
  {
    id: 4,
    title: 'Guest Check-in Process',
    description: 'Streamline your check-in process with our step-by-step guide.',
    category: 'Video Tutorials',
    readTime: '15 min video',
    tags: ['Front Desk', 'Guest Experience'],
    image: 'https://dummyimage.com/600x400/9B59B6/ffffff.png&text=Check-in+Process',
    slug: '/guides/check-in-process',
  },
  {
    id: 5,
    title: 'Revenue Management Strategies',
    description: 'Optimize your pricing and maximize revenue with these proven strategies.',
    category: 'Best Practices',
    readTime: '20 min read',
    tags: ['Revenue', 'Strategy'],
    image: 'https://dummyimage.com/600x400/F1C40F/ffffff.png&text=Revenue+Management',
    slug: '/guides/revenue-management',
  },
  {
    id: 6,
    title: 'Setting Up Payment Gateways',
    description: 'Configure payment processing and connect your preferred payment gateways.',
    category: 'Documentation',
    readTime: '10 min read',
    tags: ['Payments', 'Setup'],
    image: 'https://dummyimage.com/600x400/27AE60/ffffff.png&text=Payment+Gateways',
    slug: '/guides/payment-gateways',
  },
  {
    id: 7,
    title: 'Creating Custom Reports',
    description: 'Learn how to build and customize reports to track your key performance indicators.',
    category: 'Video Tutorials',
    readTime: '18 min video',
    tags: ['Analytics', 'Reporting'],
    image: 'https://dummyimage.com/600x400/9B59B6/ffffff.png&text=Custom+Reports',
    slug: '/guides/custom-reports',
  },
  {
    id: 8,
    title: 'Optimizing the Guest Experience',
    description: 'Discover strategies to enhance guest satisfaction and increase repeat bookings.',
    category: 'Best Practices',
    readTime: '15 min read',
    tags: ['Guest Experience', 'Service'],
    image: 'https://dummyimage.com/600x400/F1C40F/ffffff.png&text=Guest+Experience',
    slug: '/guides/guest-experience',
  },
]

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  
  return (
    <div className="relative isolate">
      {/* Hero Section */}
      <div className="relative pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/90 via-white/50 to-white dark:from-blue-950/50 dark:via-gray-900/50 dark:to-gray-900" />
          
          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
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
                    Resources
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white mb-8"
            >
              Guides & Tutorials
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-xl mx-auto"
            >
              Explore our comprehensive guides and tutorials to get the most out of your hotel management platform.
            </motion.p>

            {/* Search Bar - Updated to match Documentation page */}
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
                  placeholder="Search guides and tutorials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.h2 
              variants={fadeIn}
              className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
            >
              Browse by Category
            </motion.h2>
            <motion.p 
              variants={fadeIn}
              className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300"
            >
              Find the information you need by exploring our guide categories
            </motion.p>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-4">
            {categories.map((category) => (
              <motion.div
                key={category.name}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="flex flex-col overflow-hidden rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl bg-white dark:bg-gray-800 cursor-pointer"
              >
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${category.color} mb-4`}>
                      <category.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {category.name}
                    </h3>
                    <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                      {guides.filter(guide => guide.category === category.name).length} guides
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link
                      href={`/guides/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
                    >
                      View all guides
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Guides */}
      <div className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.h2 
              variants={fadeIn}
              className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
            >
              Popular Guides
            </motion.h2>
            <motion.p 
              variants={fadeIn}
              className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300"
            >
              Our most helpful resources to get you started
            </motion.p>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-lg gap-8 lg:max-w-none lg:grid-cols-3">
            {guides.slice(0, 6).map((guide) => (
              <motion.div
                key={guide.id}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="flex flex-col overflow-hidden rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl bg-white dark:bg-gray-800"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      guide.category === 'Getting Started' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' :
                      guide.category === 'Video Tutorials' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300' :
                      guide.category === 'Documentation' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                      'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'
                    }`}>
                      {guide.category}
                    </span>
                  </div>
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {guide.title}
                    </h3>
                    <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                      {guide.description}
                    </p>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <Clock className="mr-1.5 h-4 w-4 flex-shrink-0" />
                      <span>{guide.readTime}</span>
                      <span className="mx-2">•</span>
                      <Tag className="mr-1.5 h-4 w-4 flex-shrink-0" />
                      <span>{guide.tags.join(', ')}</span>
                    </div>
                    <Link
                      href={guide.slug}
                      className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
                    >
                      Read guide
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/guides/all"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              View all guides
            </Link>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-16 shadow-2xl sm:rounded-3xl sm:px-16 md:py-24 lg:flex lg:gap-x-20 lg:px-24">
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
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-0 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Stay updated with new guides
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Subscribe to our newsletter to receive the latest guides, tutorials, and best practices directly in your inbox.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <div className="flex max-w-md gap-x-4">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="min-w-0 flex-auto rounded-xl border-0 bg-white/10 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="flex-none rounded-xl bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 