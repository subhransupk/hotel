'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Search, 
  Book, 
  Code, 
  Settings, 
  Users, 
  CreditCard, 
  BarChart, 
  Shield 
} from 'lucide-react'

const categories = [
  {
    name: 'Getting Started',
    description: 'Everything you need to know to get up and running with our platform.',
    icon: Book,
    docs: [
      { title: 'Platform Overview', href: '/docs/platform-overview' },
      { title: 'Quick Start Guide', href: '/docs/quick-start' },
      { title: 'Account Setup', href: '/docs/account-setup' },
      { title: 'User Management', href: '/docs/user-management' },
    ],
  },
  {
    name: 'API Reference',
    description: 'Comprehensive API documentation for developers.',
    icon: Code,
    docs: [
      { title: 'Authentication', href: '/docs/api/authentication' },
      { title: 'Bookings API', href: '/docs/api/bookings' },
      { title: 'Guests API', href: '/docs/api/guests' },
      { title: 'Payments API', href: '/docs/api/payments' },
    ],
  },
  {
    name: 'Core Features',
    description: 'Learn how to use the core features of our platform.',
    icon: Settings,
    docs: [
      { title: 'Booking Management', href: '/docs/features/booking-management' },
      { title: 'Room Management', href: '/docs/features/room-management' },
      { title: 'Rate Plans', href: '/docs/features/rate-plans' },
      { title: 'Channel Management', href: '/docs/features/channel-management' },
    ],
  },
  {
    name: 'Guest Management',
    description: 'Tools and features for managing guest relationships.',
    icon: Users,
    docs: [
      { title: 'Guest Profiles', href: '/docs/guests/profiles' },
      { title: 'Communication Tools', href: '/docs/guests/communication' },
      { title: 'Feedback & Reviews', href: '/docs/guests/feedback' },
      { title: 'Loyalty Programs', href: '/docs/guests/loyalty' },
    ],
  },
  {
    name: 'Billing & Payments',
    description: 'Everything related to billing, invoicing, and payments.',
    icon: CreditCard,
    docs: [
      { title: 'Payment Processing', href: '/docs/billing/payment-processing' },
      { title: 'Invoicing', href: '/docs/billing/invoicing' },
      { title: 'Subscription Management', href: '/docs/billing/subscriptions' },
      { title: 'Tax Configuration', href: '/docs/billing/taxes' },
    ],
  },
  {
    name: 'Analytics & Reporting',
    description: 'Understand your data with powerful analytics tools.',
    icon: BarChart,
    docs: [
      { title: 'Dashboard Overview', href: '/docs/analytics/dashboard' },
      { title: 'Custom Reports', href: '/docs/analytics/custom-reports' },
      { title: 'Data Export', href: '/docs/analytics/data-export' },
      { title: 'Performance Metrics', href: '/docs/analytics/metrics' },
    ],
  },
  {
    name: 'Security & Compliance',
    description: 'Security features and compliance information.',
    icon: Shield,
    docs: [
      { title: 'Data Security', href: '/docs/security/data-security' },
      { title: 'GDPR Compliance', href: '/docs/security/gdpr' },
      { title: 'PCI Compliance', href: '/docs/security/pci' },
      { title: 'Access Control', href: '/docs/security/access-control' },
    ],
  },
]

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredCategories = categories.filter(category => {
    // Filter category name and description
    const matchesCategory = category.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           category.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Filter documents within the category
    const hasMatchingDocuments = category.docs.some(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    
    return matchesCategory || hasMatchingDocuments
  })

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
                    Knowledge Base
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
              Documentation
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
            >
              Everything you need to get started and make the most of our platform
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
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Documentation Categories */}
      <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="relative isolate flex flex-col justify-between rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-6 pt-8 pb-10 shadow-sm"
              >
                <div>
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <category.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {category.description}
                  </p>
                  <ul role="list" className="mt-8 space-y-3">
                    {category.docs.map((doc) => (
                      <li key={doc.title}>
                        <Link
                          href={doc.href}
                          className="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {doc.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/docs/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="mt-8 text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                >
                  View all <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Articles */}
      <div className="bg-gray-50 dark:bg-gray-800/50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Popular Articles
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Our most frequently accessed documentation to help you get started quickly.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
            <div className="lg:col-span-4">
              <ul role="list" className="space-y-6">
                <li className="relative flex gap-x-4">
                  <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                    <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white dark:bg-gray-900">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-100 dark:bg-gray-700 ring-1 ring-gray-300 dark:ring-gray-600"></div>
                  </div>
                  <p className="flex-auto py-0.5 text-sm leading-5 text-gray-500 dark:text-gray-400">
                    <Link href="/docs/quick-start" className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                      Quick Start Guide
                    </Link>
                  </p>
                </li>
                <li className="relative flex gap-x-4">
                  <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                    <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white dark:bg-gray-900">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-100 dark:bg-gray-700 ring-1 ring-gray-300 dark:ring-gray-600"></div>
                  </div>
                  <p className="flex-auto py-0.5 text-sm leading-5 text-gray-500 dark:text-gray-400">
                    <Link href="/docs/api/authentication" className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                      API Authentication
                    </Link>
                  </p>
                </li>
                <li className="relative flex gap-x-4">
                  <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                    <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white dark:bg-gray-900">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-100 dark:bg-gray-700 ring-1 ring-gray-300 dark:ring-gray-600"></div>
                  </div>
                  <p className="flex-auto py-0.5 text-sm leading-5 text-gray-500 dark:text-gray-400">
                    <Link href="/docs/features/booking-management" className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                      Booking Management
                    </Link>
                  </p>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-4">
              <ul role="list" className="space-y-6">
                <li className="relative flex gap-x-4">
                  <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                    <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white dark:bg-gray-900">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-100 dark:bg-gray-700 ring-1 ring-gray-300 dark:ring-gray-600"></div>
                  </div>
                  <p className="flex-auto py-0.5 text-sm leading-5 text-gray-500 dark:text-gray-400">
                    <Link href="/docs/guests/profiles" className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                      Guest Profiles
                    </Link>
                  </p>
                </li>
                <li className="relative flex gap-x-4">
                  <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                    <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white dark:bg-gray-900">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-100 dark:bg-gray-700 ring-1 ring-gray-300 dark:ring-gray-600"></div>
                  </div>
                  <p className="flex-auto py-0.5 text-sm leading-5 text-gray-500 dark:text-gray-400">
                    <Link href="/docs/billing/payment-processing" className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                      Payment Processing
                    </Link>
                  </p>
                </li>
                <li className="relative flex gap-x-4">
                  <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                    <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white dark:bg-gray-900">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-100 dark:bg-gray-700 ring-1 ring-gray-300 dark:ring-gray-600"></div>
                  </div>
                  <p className="flex-auto py-0.5 text-sm leading-5 text-gray-500 dark:text-gray-400">
                    <Link href="/docs/analytics/dashboard" className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                      Analytics Dashboard
                    </Link>
                  </p>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-4">
              <ul role="list" className="space-y-6">
                <li className="relative flex gap-x-4">
                  <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                    <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white dark:bg-gray-900">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-100 dark:bg-gray-700 ring-1 ring-gray-300 dark:ring-gray-600"></div>
                  </div>
                  <p className="flex-auto py-0.5 text-sm leading-5 text-gray-500 dark:text-gray-400">
                    <Link href="/docs/features/channel-management" className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                      Channel Management
                    </Link>
                  </p>
                </li>
                <li className="relative flex gap-x-4">
                  <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                    <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white dark:bg-gray-900">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-100 dark:bg-gray-700 ring-1 ring-gray-300 dark:ring-gray-600"></div>
                  </div>
                  <p className="flex-auto py-0.5 text-sm leading-5 text-gray-500 dark:text-gray-400">
                    <Link href="/docs/security/data-security" className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                      Data Security
                    </Link>
                  </p>
                </li>
                <li className="relative flex gap-x-4">
                  <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                    <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white dark:bg-gray-900">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-100 dark:bg-gray-700 ring-1 ring-gray-300 dark:ring-gray-600"></div>
                  </div>
                  <p className="flex-auto py-0.5 text-sm leading-5 text-gray-500 dark:text-gray-400">
                    <Link href="/docs/api/bookings" className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                      Bookings API
                    </Link>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Need more help?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Our support team is available 24/7 to assist you with any questions or issues.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/help"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Visit Help Center
              </Link>
              <Link href="/contact" className="text-sm font-semibold leading-6 text-white">
                Contact Support <span aria-hidden="true">→</span>
              </Link>
            </div>
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