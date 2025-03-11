'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, Clock, ArrowRight } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const lastUpdated = 'September 15, 2023'

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
                    Legal Information
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
              Privacy Policy
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400"
            >
              <Clock className="mr-1.5 h-4 w-4" />
              Last updated: {lastUpdated}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white dark:bg-gray-900 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="prose prose-lg dark:prose-invert prose-blue max-w-none"
          >
            <p className="lead">
              At HotelSaaS, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our platform.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, information we collect automatically when you use our Services, and information from third-party sources.
            </p>

            <h3>Information You Provide to Us</h3>
            <p>
              We may collect information you provide to us when you:
            </p>
            <ul>
              <li>Create an account or register for our services</li>
              <li>Fill out forms or fields on our website</li>
              <li>Sign up for our newsletter or marketing communications</li>
              <li>Communicate with our customer support team</li>
              <li>Participate in surveys, contests, or promotions</li>
            </ul>

            <p>
              This information may include your name, email address, phone number, company information, billing information, and any other information you choose to provide.
            </p>

            <h3>Information We Collect Automatically</h3>
            <p>
              When you use our Services, we may automatically collect certain information about your device and usage, including:
            </p>
            <ul>
              <li>Log information (IP address, browser type, pages visited, etc.)</li>
              <li>Device information (hardware model, operating system, unique device identifiers)</li>
              <li>Usage data (features you use, actions you take, time spent on our platform)</li>
              <li>Location information (based on IP address or GPS with your consent)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect for various purposes, including to:
            </p>
            <ul>
              <li>Provide, maintain, and improve our Services</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative messages, updates, and security alerts</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Provide customer service and technical support</li>
              <li>Send marketing communications about our products and services</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Personalize and improve your experience</li>
            </ul>

            <h2>Sharing of Information</h2>
            <p>
              We may share your information in the following circumstances:
            </p>
            <ul>
              <li>With service providers who perform services on our behalf</li>
              <li>With business partners with your consent</li>
              <li>In connection with a business transaction (merger, acquisition, sale of assets)</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights, privacy, safety, or property</li>
              <li>With your consent or at your direction</li>
            </ul>

            <h2>Your Rights and Choices</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction or objection to processing</li>
              <li>Data portability</li>
              <li>Withdrawal of consent</li>
            </ul>

            <p>
              To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>

            <h2>International Data Transfers</h2>
            <p>
              Your information may be transferred to, and processed in, countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our Services are not directed to children under the age of 16, and we do not knowingly collect personal information from children under 16. If we learn that we have collected personal information from a child under 16, we will take steps to delete such information.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. If we make material changes, we will notify you by email or by posting a notice on our website prior to the change becoming effective.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              Email: privacy@hotelsaas.com<br />
              Address: 123 Hotel Street, Suite 456, San Francisco, CA 94103
            </p>
          </motion.div>

          <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-16">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Related Policies</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Link 
                href="/terms" 
                className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-600 dark:hover:border-blue-500 transition-colors"
              >
                <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Terms of Service
                  <span className="absolute inset-0" />
                </h3>
                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  Review our terms and conditions for using our platform and services.
                </p>
                <div className="mt-3 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300">
                  Read terms <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
              <Link 
                href="/cookies" 
                className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-600 dark:hover:border-blue-500 transition-colors"
              >
                <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Cookie Policy
                  <span className="absolute inset-0" />
                </h3>
                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  Learn about how we use cookies and similar technologies on our website.
                </p>
                <div className="mt-3 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300">
                  Read policy <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50">
        <div className="mx-auto max-w-7xl py-16 sm:py-24 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Still have questions?
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Our team is here to help with any privacy concerns you may have.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/help"
                className="rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Visit Help Center
              </Link>
              <Link
                href="mailto:privacy@hotelsaas.com"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
              >
                Contact Privacy Team <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 