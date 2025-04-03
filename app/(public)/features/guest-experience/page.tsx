'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Users, 
  MessageSquare, 
  Star, 
  Calendar, 
  Clock, 
  Gift, 
  Smile, 
  Heart 
} from 'lucide-react'

const features = [
  {
    name: 'Personalized Guest Profiles',
    description: 'Build comprehensive guest profiles with preferences, history, and special requests to deliver personalized experiences.',
    icon: Users,
  },
  {
    name: 'Smart Communication',
    description: 'Engage with guests through their preferred channels with automated and personalized messaging before, during, and after their stay.',
    icon: MessageSquare,
  },
  {
    name: 'Feedback Management',
    description: 'Collect, analyze, and act on guest feedback in real-time to improve service quality and guest satisfaction.',
    icon: Star,
  },
  {
    name: 'Seamless Check-in/out',
    description: 'Offer mobile check-in/out options, digital room keys, and automated processes to eliminate wait times.',
    icon: Calendar,
  },
  {
    name: 'Request Management',
    description: 'Efficiently handle guest requests with automated routing, tracking, and resolution monitoring.',
    icon: Clock,
  },
  {
    name: 'Loyalty Programs',
    description: 'Create and manage customizable loyalty programs with points, tiers, and special rewards for returning guests.',
    icon: Gift,
  },
  {
    name: 'Experience Recommendations',
    description: 'Suggest personalized local experiences, dining options, and activities based on guest preferences and history.',
    icon: Smile,
  },
  {
    name: 'Special Occasion Management',
    description: 'Track and celebrate guest milestones like birthdays, anniversaries, and special occasions with automated surprises.',
    icon: Heart,
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

export default function GuestExperiencePage() {
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
                    Guest Experience
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
              Elevate Your Guest Experience
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-xl mx-auto"
            >
              Create memorable stays with personalized service, seamless communication, and thoughtful touches that keep guests coming back.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
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
              Comprehensive Guest Experience Features
            </motion.h2>
            <motion.p 
              variants={fadeIn}
              className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
            >
              Our platform provides all the tools you need to create exceptional guest experiences from pre-arrival to post-stay engagement.
            </motion.p>
          </motion.div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <motion.dl 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3"
            >
              {features.map((feature) => (
                <motion.div 
                  key={feature.name} 
                  variants={fadeIn}
                  className="flex flex-col"
                >
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <feature.icon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>
        </div>
      </div>

      {/* Case Study Section */}
      <div className="relative bg-gray-50 dark:bg-gray-800/50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl lg:mx-0"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Success Story</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              See how luxury hotel chain Meridian Hotels improved guest satisfaction scores by 35% using our guest experience platform.
            </p>
          </motion.div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative lg:col-span-5 lg:row-start-1"
            >
              <figure className="border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-900 p-8 shadow-lg ring-1 ring-gray-900/5">
                <blockquote className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                  <p>
                    "The guest experience platform has transformed how we interact with our guests. We're now able to anticipate needs, personalize every touchpoint, and create memorable moments that keep our guests coming back."
                  </p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-x-4">
                  <div className="h-10 w-10 rounded-full bg-gray-50 dark:bg-gray-800">
                    <div className="flex h-full items-center justify-center rounded-full bg-blue-600 text-white">
                      <span className="text-sm font-bold">MH</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Sarah Johnson</div>
                    <div className="text-gray-600 dark:text-gray-400">Guest Experience Director, Meridian Hotels</div>
                  </div>
                </figcaption>
              </figure>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-7"
            >
              <ul role="list" className="space-y-8">
                <li className="flex gap-x-3">
                  <div className="mt-1 h-5 w-5 flex-none text-blue-600">
                    <Star className="h-5 w-5" />
                  </div>
                  <span>
                    <strong className="font-semibold text-gray-900 dark:text-white">35% increase</strong> in guest satisfaction scores within 6 months of implementation
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <div className="mt-1 h-5 w-5 flex-none text-blue-600">
                    <Star className="h-5 w-5" />
                  </div>
                  <span>
                    <strong className="font-semibold text-gray-900 dark:text-white">28% growth</strong> in repeat bookings from loyal guests
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <div className="mt-1 h-5 w-5 flex-none text-blue-600">
                    <Star className="h-5 w-5" />
                  </div>
                  <span>
                    <strong className="font-semibold text-gray-900 dark:text-white">42% reduction</strong> in check-in wait times with mobile check-in features
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <div className="mt-1 h-5 w-5 flex-none text-blue-600">
                    <Star className="h-5 w-5" />
                  </div>
                  <span>
                    <strong className="font-semibold text-gray-900 dark:text-white">3x increase</strong> in positive online reviews mentioning personalized service
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to transform your guest experience?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Join thousands of hotels worldwide that are delighting their guests with personalized experiences.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/register"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started
              </Link>
              <Link href="/contact" className="text-sm font-semibold leading-6 text-white">
                Contact sales <span aria-hidden="true">→</span>
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