'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Users2, 
  LineChart, 
  Globe2, 
  Award, 
  Building2, 
  ArrowRight,
  Star,
  Heart,
  Smile,
  Coffee,
} from 'lucide-react'

const stats = [
  { 
    label: 'Hotels Worldwide', 
    value: '10,000+',
    icon: Building2,
    description: 'Trusted by hotels in over 50 countries'
  },
  { 
    label: 'Guest Satisfaction', 
    value: '98%',
    icon: Smile,
    description: 'Average customer satisfaction rate'
  },
  { 
    label: 'Team Members', 
    value: '150+',
    icon: Users2,
    description: 'Dedicated professionals worldwide'
  },
  { 
    label: 'Revenue Generated', 
    value: '$500M+',
    icon: LineChart,
    description: 'Annual revenue for our clients'
  },
]

const values = [
  {
    icon: Star,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from product development to customer support.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Our customers are at the heart of every decision we make and every feature we build.',
  },
  {
    icon: Globe2,
    title: 'Global Impact',
    description: 'We\'re committed to making a positive impact on the hospitality industry worldwide.',
  },
  {
    icon: Coffee,
    title: 'Innovation',
    description: 'We continuously innovate and adapt to meet the evolving needs of modern hotels.',
  },
]

const team = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Co-founder',
    image: '/images/demo/avatar-1.jpg',
    bio: '15+ years in hospitality tech',
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    image: '/images/demo/avatar-2.jpg',
    bio: 'Former tech lead at Booking.com',
  },
  {
    name: 'Emma Rodriguez',
    role: 'Head of Product',
    image: '/images/demo/avatar-3.jpg',
    bio: '10+ years product management',
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function AboutPage() {
  return (
    <div className="relative isolate">
      {/* Hero Section */}
      <div className="relative pt-14">
        <div className="absolute inset-0 -z-10">
          {/* Enhanced gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/90 via-white/50 to-white dark:from-blue-950/50 dark:via-gray-900/50 dark:to-gray-900" />
          
          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <motion.div
                className="mb-8 flex justify-center"
                {...fadeInUp}
              >
                <div className="rounded-full p-1 px-3 bg-blue-50 dark:bg-blue-900/30 ring-1 ring-blue-500/20 dark:ring-blue-400/20">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      Our Story
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.h1 
                className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white mb-6"
                {...fadeInUp}
              >
                Transforming Hotel Management
              </motion.h1>

              <motion.p 
                className="text-lg leading-8 text-gray-600 dark:text-gray-400"
                {...fadeInUp}
              >
                We're on a mission to revolutionize the hospitality industry through innovative technology and exceptional service.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div 
        className="relative py-16 sm:py-24"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-900/10 p-8"
                variants={fadeInUp}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 opacity-50" />
                <div className="relative">
                  <stat.icon className="h-8 w-8 text-blue-500 mb-4" />
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Story Section */}
      <motion.div 
        className="relative py-16 sm:py-24 overflow-hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-center">
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white mb-6">
                Our Journey
              </h2>
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400">
                <p>
                  Founded in 2020, HotelSaaS emerged from a simple observation: hotels needed better technology to thrive in the digital age.
                </p>
                <p>
                  What started as a simple booking system has evolved into a comprehensive platform that powers thousands of hotels worldwide.
                </p>
                <p>
                  Today, we're proud to be at the forefront of hotel technology innovation, helping properties of all sizes deliver exceptional guest experiences.
                </p>
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              variants={fadeInUp}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/demo/dashboard-preview.jpg"
                  alt="Dashboard Preview"
                  width={800}
                  height={600}
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Values Section */}
      <motion.div 
        className="relative py-16 sm:py-24 bg-gray-50 dark:bg-gray-900/50"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
              Our Values
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg"
                variants={fadeInUp}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 opacity-50" />
                <div className="relative">
                  <value.icon className="h-8 w-8 text-blue-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div 
        className="relative py-16 sm:py-24"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
              Meet Our Leadership
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              The team behind our success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <motion.div
                key={member.name}
                className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg"
                variants={fadeInUp}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={300}
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {member.role}
                  </p>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="relative py-16 sm:py-24"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-blue-600 rounded-3xl px-6 py-24 text-center shadow-2xl sm:px-16">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-900/50" />
            </div>

            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to transform your hotel operations?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Join thousands of hotels already using our platform to deliver exceptional guest experiences.
            </p>
            <div className="mt-10 flex items-center justify-center gap-6">
              <Link
                href="/register"
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started
              </Link>
              <Link
                href="/contact"
                className="text-sm font-semibold leading-6 text-white flex items-center gap-2 hover:text-blue-100"
              >
                Contact sales <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 