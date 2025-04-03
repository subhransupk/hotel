'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ChevronRight, 
  Home, 
  CheckCircle, 
  Clock, 
  ArrowLeft, 
  ArrowRight,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'

const steps = [
  {
    id: 1,
    title: 'Create Your Account',
    description: 'Sign up for a new account by providing your email address and creating a secure password.',
    details: [
      'Navigate to the registration page',
      'Enter your email address and create a password',
      'Verify your email address by clicking the link sent to your inbox',
      'Complete your profile with your name and company information'
    ]
  },
  {
    id: 2,
    title: 'Set Up Your First Property',
    description: 'Configure your first hotel property with essential details like name, address, and property type.',
    details: [
      'Go to Settings > Properties > Add New Property',
      'Enter your property name, address, and contact information',
      'Select your property type (hotel, resort, vacation rental, etc.)',
      'Configure property-specific settings like check-in/out times and policies'
    ]
  },
  {
    id: 3,
    title: 'Create Room Types',
    description: 'Define the different types of rooms available at your property, including amenities and features.',
    details: [
      'Navigate to Inventory > Room Types > Add Room Type',
      'Create room types with names, descriptions, and specifications',
      'Add room amenities, features, and images',
      'Specify the number of rooms available for each type'
    ]
  },
  {
    id: 4,
    title: 'Set Up Rate Plans',
    description: 'Create pricing structures for your rooms, including seasonal rates and special offers.',
    details: [
      'Go to Rates > Rate Plans > Create Rate Plan',
      'Define your base rates for each room type',
      'Set up seasonal pricing adjustments',
      'Create special offers and packages',
      'Configure rate restrictions and minimum stay requirements'
    ]
  },
  {
    id: 5,
    title: 'Configure Booking Settings',
    description: 'Set up your booking engine and reservation policies to start accepting bookings.',
    details: [
      'Navigate to Settings > Booking Engine',
      'Customize your booking widget appearance',
      'Configure cancellation policies and booking restrictions',
      'Set up confirmation emails and notifications',
      'Test the booking process to ensure everything works correctly'
    ]
  },
  {
    id: 6,
    title: 'Invite Team Members',
    description: 'Add your team members to the platform and assign appropriate roles and permissions.',
    details: [
      'Go to Settings > Users > Invite User',
      'Enter email addresses for team members you want to invite',
      'Assign appropriate roles (admin, manager, front desk, etc.)',
      'Customize permissions for each user if needed',
      'Send invitations and help team members get started'
    ]
  },
]

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function QuickStartGuidePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-3 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <div>
                  <Link href="/" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <Home className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    <span className="sr-only">Home</span>
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="h-4 w-4 text-gray-400" aria-hidden="true" />
                  <Link href="/docs" className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    Documentation
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="h-4 w-4 text-gray-400" aria-hidden="true" />
                  <Link href="/docs/getting-started" className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    Getting Started
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="h-4 w-4 text-gray-400" aria-hidden="true" />
                  <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Quick Start Guide
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <div className="bg-white dark:bg-gray-900 px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700 dark:text-gray-300">
          <div className="flex items-center text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400">
            <Clock className="h-4 w-4 mr-2" />
            <span>10 minute read</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Quick Start Guide
          </h1>
          <p className="mt-6 text-xl leading-8">
            Get your hotel management system up and running in just a few steps. This guide will walk you through the essential setup process to start managing your property efficiently.
          </p>
        </div>
      </div>

      {/* Article Content */}
      <div className="bg-white dark:bg-gray-900 px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700 dark:text-gray-300">
          <div className="mt-10">
            <ul role="list" className="space-y-16">
              {steps.map((step) => (
                <motion.li 
                  key={step.id}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeIn}
                  className="relative pl-9"
                >
                  <div className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
                    <span className="text-sm font-semibold text-white">{step.id}</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h2>
                  <p className="mt-3 text-base leading-7 text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                  <ul role="list" className="mt-4 space-y-2">
                    {step.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 mt-0.5 text-blue-600 dark:text-blue-400 mr-2" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Next Steps */}
          <div className="mt-16 rounded-2xl bg-gray-50 dark:bg-gray-800 p-6 lg:p-10">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Next Steps
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
              Now that you've completed the basic setup, you can explore more advanced features to optimize your hotel management:
            </p>
            <ul role="list" className="mt-6 space-y-3">
              <li className="flex items-start">
                <Link href="/docs/features/channel-management" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                  Set up channel management to connect with OTAs
                </Link>
              </li>
              <li className="flex items-start">
                <Link href="/docs/billing/payment-processing" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                  Configure payment processing
                </Link>
              </li>
              <li className="flex items-start">
                <Link href="/docs/features/rate-plans" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                  Create advanced rate plans and pricing strategies
                </Link>
              </li>
              <li className="flex items-start">
                <Link href="/docs/analytics/dashboard" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                  Explore analytics and reporting tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Video Tutorial */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Video Tutorial
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
              Watch our comprehensive video guide that walks through the entire setup process:
            </p>
            <div className="mt-6 aspect-video relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-400">Video placeholder</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                    (Actual video would be embedded here)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-10">
            <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
              Was this article helpful?
            </h3>
            <div className="mt-4 flex space-x-4">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <ThumbsUp className="h-4 w-4 mr-2 text-gray-400" />
                Yes, it helped
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <ThumbsDown className="h-4 w-4 mr-2 text-gray-400" />
                No, I need more help
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-10">
            <div className="flex items-center justify-between">
              <Link
                href="/docs/platform-overview"
                className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous: Platform Overview
              </Link>
              <Link
                href="/docs/account-setup"
                className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
              >
                Next: Account Setup
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 