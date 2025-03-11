'use client'

import { motion } from 'framer-motion'
import {
  Building2,
  CalendarDays,
  UserCircle2,
  CreditCard,
  BarChart3,
  Mail,
  MessageSquare,
  Globe,
  Users,
  ShieldCheck,
  Gauge,
  Code2,
  Rocket,
  Sparkles,
} from 'lucide-react'

const features = [
  {
    category: 'Core Hotel Management',
    description: 'Comprehensive tools for efficient hotel operations',
    items: [
      {
        title: 'Smart Booking System',
        description: 'Streamlined reservation management with real-time availability and instant confirmation',
        icon: Building2,
      },
      {
        title: 'Calendar Integration',
        description: 'Seamless synchronization with popular calendar services for better scheduling',
        icon: CalendarDays,
      },
      {
        title: 'Guest Profiles',
        description: 'Detailed guest information and preferences for personalized service',
        icon: UserCircle2,
      },
      {
        title: 'Payment Processing',
        description: 'Secure payment handling with multiple payment method support',
        icon: CreditCard,
      },
    ],
  },
  {
    category: 'Marketing & Communication',
    description: 'Powerful tools to reach and engage your guests',
    items: [
      {
        title: 'Campaign Management',
        description: 'Create and manage targeted marketing campaigns across channels',
        icon: Rocket,
      },
      {
        title: 'Email Marketing',
        description: 'Professional email campaigns with analytics and automation',
        icon: Mail,
      },
      {
        title: 'Guest Messaging',
        description: 'Real-time communication platform for guest engagement',
        icon: MessageSquare,
      },
      {
        title: 'Landing Pages',
        description: 'Custom landing pages for promotions and special offers',
        icon: Globe,
      },
    ],
  },
  {
    category: 'Analytics & Insights',
    description: 'Data-driven decisions for your business',
    items: [
      {
        title: 'Performance Metrics',
        description: 'Comprehensive dashboard with key performance indicators',
        icon: BarChart3,
      },
      {
        title: 'Guest Analytics',
        description: 'Deep insights into guest behavior and preferences',
        icon: Users,
      },
      {
        title: 'Revenue Analytics',
        description: 'Advanced revenue tracking and forecasting tools',
        icon: Sparkles,
      },
      {
        title: 'Campaign Analytics',
        description: 'Measure and optimize marketing campaign performance',
        icon: BarChart3,
      },
    ],
  },
  {
    category: 'Platform Features',
    description: 'Enterprise-grade infrastructure and tools',
    items: [
      {
        title: 'Security',
        description: 'Advanced security features to protect your data',
        icon: ShieldCheck,
      },
      {
        title: 'Performance',
        description: 'High-performance infrastructure for reliable operations',
        icon: Gauge,
      },
      {
        title: 'API Access',
        description: 'Developer-friendly API for custom integrations',
        icon: Code2,
      },
      {
        title: 'Multi-location',
        description: 'Manage multiple properties from a single dashboard',
        icon: Building2,
      },
    ],
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function FeaturesPage() {
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
              className="mb-10"
            >
              <div className="rounded-full p-1 px-3 bg-blue-50 dark:bg-blue-900/30 ring-1 ring-blue-500/20 dark:ring-blue-400/20">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Powerful Features
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
              Everything You Need to Succeed
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-xl mx-auto"
            >
              Comprehensive hotel management tools designed to streamline your operations,
              enhance guest experience, and boost your revenue.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-32 sm:py-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="space-y-40">
              {features.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="mx-auto max-w-2xl lg:text-center mb-20">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
                      {category.category}
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                      {category.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {category.items.map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-gray-800/80 shadow-xl dark:shadow-gray-900/10 backdrop-blur-xl p-8 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5 transition-all duration-300"
                      >
                        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 mb-6">
                          <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative isolate py-32 sm:py-40"
      >
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/90 via-white/50 to-white dark:from-blue-950/50 dark:via-gray-900/50 dark:to-gray-900" />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-6">
            Ready to Transform Your Hotel Operations?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-400 mb-10">
            Join thousands of hotels already using our platform to streamline their operations
            and deliver exceptional guest experiences.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/register"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Get started today
            </a>
            <a
              href="/contact"
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              Contact sales <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 