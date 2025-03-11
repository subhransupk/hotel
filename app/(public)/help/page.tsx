'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  Search,
  ChevronDown,
  ArrowRight,
  BookOpen,
  Video,
  FileText,
  Clock
} from 'lucide-react'
import { useState } from 'react'

const supportOptions = [
  {
    name: 'Knowledge Base',
    description: 'Find answers to common questions in our comprehensive knowledge base.',
    icon: BookOpen,
    href: '/docs',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
  },
  {
    name: 'Video Tutorials',
    description: 'Watch step-by-step video guides to learn how to use our platform.',
    icon: Video,
    href: '/guides/category/video-tutorials',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
  },
  {
    name: 'Documentation',
    description: 'Explore detailed documentation for all features and functionalities.',
    icon: FileText,
    href: '/docs',
    color: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
  },
  {
    name: 'Live Chat',
    description: 'Chat with our support team for immediate assistance with your questions.',
    icon: MessageSquare,
    href: '#chat',
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
  },
  {
    name: 'Phone Support',
    description: 'Call our dedicated support line for personalized assistance.',
    icon: Phone,
    href: 'tel:+18005551234',
    color: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
  },
  {
    name: 'Email Support',
    description: 'Send us an email and we\'ll get back to you within 24 hours.',
    icon: Mail,
    href: 'mailto:support@hotelsaas.com',
    color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300',
  },
]

const faqs = [
  {
    question: 'How do I reset my password?',
    answer: 'To reset your password, click on the "Forgot Password" link on the login page. Enter your email address, and we\'ll send you a link to reset your password. Follow the instructions in the email to create a new password.',
  },
  {
    question: 'How do I add a new property to my account?',
    answer: 'To add a new property, go to Settings > Properties > Add New Property. Fill in the required information about your property, including name, address, and property type. You can then configure rooms, rates, and other settings specific to that property.',
  },
  {
    question: 'Can I integrate with my existing PMS system?',
    answer: 'Yes, our platform integrates with most major Property Management Systems. Go to Settings > Integrations to see the list of available integrations. If you don\'t see your PMS listed, contact our support team for assistance with custom integrations.',
  },
  {
    question: 'How do I set up different room rates?',
    answer: 'Navigate to Inventory > Rate Plans and click "Create New Rate Plan." You can define base rates, seasonal adjustments, and special offers. You can also create rate rules based on length of stay, advance booking, or other conditions.',
  },
  {
    question: 'How can I track my hotel\'s performance?',
    answer: 'Use our Analytics dashboard to track key performance indicators like occupancy rate, ADR, RevPAR, and more. You can customize the dashboard to show the metrics most important to your business and export reports for further analysis.',
  },
  {
    question: 'Is there a mobile app available?',
    answer: 'Yes, we offer mobile apps for both iOS and Android devices. You can download them from the App Store or Google Play Store. The mobile app allows you to manage reservations, check guests in/out, and view key performance metrics on the go.',
  },
  {
    question: 'How secure is my hotel and guest data?',
    answer: 'We take security very seriously. All data is encrypted both in transit and at rest. We use industry-standard security protocols and regularly undergo security audits. We are compliant with GDPR, CCPA, and other relevant data protection regulations.',
  },
  {
    question: 'Can I customize the booking engine to match my hotel\'s branding?',
    answer: 'Absolutely! Our booking engine is fully customizable. You can add your logo, change colors to match your brand, and even customize the booking flow. Go to Settings > Booking Engine > Customization to make these changes.',
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

export default function HelpCenterPage() {
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
                    Customer Support
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
              Help Center
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-xl mx-auto"
            >
              Find answers, get support, and resolve issues with our comprehensive help resources.
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
                  placeholder="Search for help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Support Options */}
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
              How Can We Help You?
            </motion.h2>
            <motion.p 
              variants={fadeIn}
              className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300"
            >
              Choose from our support options below to get the assistance you need
            </motion.p>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
            {supportOptions.map((option) => (
              <motion.div
                key={option.name}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="flex flex-col overflow-hidden rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl bg-white dark:bg-gray-800"
              >
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${option.color} mb-4`}>
                      <option.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {option.name}
                    </h3>
                    <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                      {option.description}
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link
                      href={option.href}
                      className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
                    >
                      Get support
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
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
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              variants={fadeIn}
              className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300"
            >
              Find quick answers to common questions about our platform
            </motion.p>
          </motion.div>

          <div className="mx-auto mt-12 max-w-3xl divide-y divide-gray-200 dark:divide-gray-700">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="py-6"
              >
                <details className="group">
                  <summary className="flex w-full items-center justify-between cursor-pointer list-none">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </h3>
                    <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mt-3 text-base text-gray-600 dark:text-gray-400">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              View all FAQs
            </Link>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Still need help?</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Our support team is available 24/7 to assist you with any questions or issues you may have.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            <div>
              <h3 className="border-l-2 border-blue-600 pl-6 font-semibold text-gray-900 dark:text-white">Email</h3>
              <address className="border-l-2 border-gray-200 dark:border-gray-700 pl-6 pt-2 not-italic text-gray-600 dark:text-gray-300">
                <p>support@hotelsaas.com</p>
                <p className="mt-2">Response time: Within 24 hours</p>
              </address>
            </div>
            <div>
              <h3 className="border-l-2 border-blue-600 pl-6 font-semibold text-gray-900 dark:text-white">Phone</h3>
              <address className="border-l-2 border-gray-200 dark:border-gray-700 pl-6 pt-2 not-italic text-gray-600 dark:text-gray-300">
                <p>+1 (800) 555-1234</p>
                <p className="mt-2">Available 24/7</p>
              </address>
            </div>
            <div>
              <h3 className="border-l-2 border-blue-600 pl-6 font-semibold text-gray-900 dark:text-white">Live Chat</h3>
              <address className="border-l-2 border-gray-200 dark:border-gray-700 pl-6 pt-2 not-italic text-gray-600 dark:text-gray-300">
                <p>Available on our website</p>
                <p className="mt-2">Response time: Immediate</p>
              </address>
            </div>
            <div>
              <h3 className="border-l-2 border-blue-600 pl-6 font-semibold text-gray-900 dark:text-white">Office</h3>
              <address className="border-l-2 border-gray-200 dark:border-gray-700 pl-6 pt-2 not-italic text-gray-600 dark:text-gray-300">
                <p>123 Hotel Street</p>
                <p>San Francisco, CA 94103</p>
                <p className="mt-2">Mon-Fri: 9AM - 5PM PT</p>
              </address>
            </div>
          </div>
        </div>
      </div>

      {/* Support Hours */}
      <div className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Support Hours</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              We're here when you need us. Check our support availability below.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 dark:ring-gray-700 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Standard Support</h3>
              <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-300">
                Our standard support is available to all customers and includes email, chat, and phone support during business hours.
              </p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400">What's included</h4>
                <div className="h-px flex-auto bg-gray-100 dark:bg-gray-700"></div>
              </div>
              <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 dark:text-gray-300 sm:grid-cols-2 sm:gap-6">
                <li className="flex gap-x-3">
                  <Clock className="h-6 w-5 flex-none text-blue-600" aria-hidden="true" />
                  <span>Monday - Friday: 9AM - 5PM PT</span>
                </li>
                <li className="flex gap-x-3">
                  <MessageSquare className="h-6 w-5 flex-none text-blue-600" aria-hidden="true" />
                  <span>Email & Chat Support</span>
                </li>
                <li className="flex gap-x-3">
                  <Phone className="h-6 w-5 flex-none text-blue-600" aria-hidden="true" />
                  <span>Phone Support</span>
                </li>
                <li className="flex gap-x-3">
                  <HelpCircle className="h-6 w-5 flex-none text-blue-600" aria-hidden="true" />
                  <span>Knowledge Base Access</span>
                </li>
              </ul>
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 py-10 text-center ring-1 ring-inset ring-gray-900/5 dark:ring-gray-700 lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-gray-600 dark:text-gray-300">Premium Support Available</p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">24/7</span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600 dark:text-gray-300">support</span>
                  </p>
                  <p className="mt-6 text-xs leading-5 text-gray-600 dark:text-gray-400">
                    Upgrade to our Premium Support plan for round-the-clock assistance and dedicated support agents.
                  </p>
                  <Link
                    href="/pricing"
                    className="mt-10 block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Upgrade to Premium
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Need personalized assistance?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Schedule a one-on-one session with our product specialists to get personalized guidance for your specific needs.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Schedule a consultation
              </Link>
              <Link
                href="/guides"
                className="text-sm font-semibold leading-6 text-white hover:text-blue-300"
              >
                Explore guides <span aria-hidden="true">→</span>
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