'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, BellRing } from 'lucide-react'

export default function CareersPage() {
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
                    Join Our Team
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
              Careers at HotelSaaS
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-xl mx-auto"
            >
              We're building the future of hotel management technology. Join us on our mission to transform the hospitality industry.
            </motion.p>
          </div>
        </div>
      </div>

      {/* No Positions Available Section */}
      <div className="py-16 sm:py-24 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="rounded-full p-3 bg-blue-50 dark:bg-blue-900/30 mb-6">
                <BellRing className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
                No Open Positions Currently
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                We don't have any open positions at the moment, but we're always looking for talented individuals to join our team. Check back soon or sign up for job alerts to be notified when new opportunities become available.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#job-alerts"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Sign up for job alerts
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Contact us
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Why Join Us Section */}
      <div className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Why Join HotelSaaS?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              We're building a team of passionate individuals who are excited about transforming the hospitality industry.
            </p>
          </div>
          
          <div className="mx-auto grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Flexible Work Environment</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Work from anywhere with flexible hours. We believe in work-life balance and trust our team to deliver results.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Growth Opportunities</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                We're growing rapidly, which means plenty of opportunities for career advancement and professional development.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Competitive Benefits</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Comprehensive health insurance, retirement plans, generous PTO, and more to ensure you're well taken care of.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="py-16 sm:py-24 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              These core principles guide everything we do at HotelSaaS.
            </p>
          </div>
          
          <div className="mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Customer Obsession</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                We start with the customer and work backwards. We work vigorously to earn and keep customer trust.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Innovation</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                We constantly push boundaries and challenge the status quo to create better solutions for the hospitality industry.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ownership</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                We think long term and don't sacrifice long-term value for short-term results. We act on behalf of the entire company.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Job Alerts Section */}
      <div id="job-alerts" className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Stay Updated on Future Opportunities
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Sign up to receive notifications when new positions become available.
            </p>
            
            <form className="mt-10 sm:flex sm:max-w-md sm:mx-auto">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/80 dark:bg-gray-800/80 px-3 py-1.5 text-base text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
                placeholder="Enter your email"
              />
              <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Subscribe
                </button>
              </div>
            </form>
            
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              We'll only send you information about job openings. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 