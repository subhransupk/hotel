'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Building2,
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
} from 'lucide-react'

const offices = [
  {
    city: 'New York',
    address: '123 Broadway, New York, NY 10012',
    phone: '+1 (555) 123-4567',
    email: 'nyc@hotelsaas.com',
    hours: '9:00 AM - 6:00 PM EST',
  },
  {
    city: 'London',
    address: '456 Oxford Street, London, W1C 1AP',
    phone: '+44 20 7123 4567',
    email: 'london@hotelsaas.com',
    hours: '9:00 AM - 6:00 PM GMT',
  },
  {
    city: 'Singapore',
    address: '789 Marina Bay, Singapore 018956',
    phone: '+65 6789 0123',
    email: 'singapore@hotelsaas.com',
    hours: '9:00 AM - 6:00 PM SGT',
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  initial: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    submitted: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    setFormState(prev => ({ ...prev, submitted: true }))
  }

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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 flex justify-center"
              >
                <div className="rounded-full p-1 px-3 bg-blue-50 dark:bg-blue-900/30 ring-1 ring-blue-500/20 dark:ring-blue-400/20">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      Get in Touch
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white mb-6"
              >
                Let's Start a Conversation
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg leading-8 text-gray-600 dark:text-gray-400"
              >
                Have questions about our platform? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <motion.div 
        className="relative py-16 sm:py-24"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <div className="overflow-hidden rounded-3xl bg-white/80 dark:bg-gray-800/80 shadow-xl dark:shadow-gray-900/10 backdrop-blur-xl">
                {formState.submitted ? (
                  <div className="p-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                    >
                      <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Thank you for reaching out!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                          value={formState.name}
                          onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                          value={formState.email}
                          onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Company / Hotel Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          required
                          className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                          value={formState.company}
                          onChange={e => setFormState(prev => ({ ...prev, company: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          required
                          className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                          value={formState.message}
                          onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
                        />
                      </div>
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full rounded-xl bg-blue-600 px-3.5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      Send Message
                      <Send className="ml-2 h-4 w-4 inline-block" />
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="rounded-3xl bg-white/80 dark:bg-gray-800/80 shadow-xl dark:shadow-gray-900/10 backdrop-blur-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Our Global Offices
                </h3>
                <div className="space-y-6">
                  {offices.map((office) => (
                    <motion.div
                      key={office.city}
                      className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                      whileHover={{ x: 8 }}
                    >
                      <Building2 className="h-6 w-6 text-blue-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {office.city}
                        </h4>
                        <div className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                          <p className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {office.address}
                          </p>
                          <p className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {office.phone}
                          </p>
                          <p className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            {office.email}
                          </p>
                          <p className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {office.hours}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Additional Contact Methods */}
              <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white">
                <h3 className="text-xl font-semibold mb-4">
                  Need Immediate Assistance?
                </h3>
                <div className="space-y-4">
                  <p className="flex items-center gap-3">
                    <Phone className="h-5 w-5" />
                    Call us 24/7: +1 (888) 123-4567
                  </p>
                  <p className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5" />
                    Live chat available
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 