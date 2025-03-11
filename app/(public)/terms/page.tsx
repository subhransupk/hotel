'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Scale, Clock, ArrowRight } from 'lucide-react'

export default function TermsOfServicePage() {
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
              Terms of Service
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
              Welcome to HotelSaaS. These Terms of Service ("Terms") govern your access to and use of our website, products, and services. Please read these Terms carefully before using our platform.
            </p>

            <h2>Acceptance of Terms</h2>
            <p>
              By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use the Services.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. If we make changes, we will provide notice of such changes, such as by sending an email notification, providing notice through the Services, or updating the "Last Updated" date at the beginning of these Terms. Your continued use of the Services following notification of changes will constitute your acceptance of such changes.
            </p>

            <h2>Account Registration</h2>
            <p>
              To use certain features of our Services, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
            <p>
              You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>

            <h2>Subscription and Payments</h2>
            <p>
              Some of our Services are provided on a subscription basis. You agree to pay all fees associated with your subscription plan. We may change our fees at any time, but will provide you with advance notice of these changes.
            </p>
            <p>
              Unless otherwise stated, all fees are quoted in U.S. Dollars. You are responsible for paying all taxes associated with your use of the Services.
            </p>
            <p>
              Subscriptions automatically renew unless cancelled at least 30 days before the end of the current billing period. You can cancel your subscription at any time through your account settings or by contacting our customer support.
            </p>

            <h2>User Content</h2>
            <p>
              Our Services may allow you to upload, submit, store, send, or receive content. You retain ownership of any intellectual property rights that you hold in that content.
            </p>
            <p>
              By uploading, submitting, storing, sending, or receiving content through our Services, you grant us a worldwide license to use, host, store, reproduce, modify, create derivative works, communicate, publish, publicly perform, publicly display, and distribute such content.
            </p>
            <p>
              You represent and warrant that you have all rights, power, and authority necessary to grant the rights granted herein to any content that you submit.
            </p>

            <h2>Prohibited Conduct</h2>
            <p>
              You agree not to:
            </p>
            <ul>
              <li>Use the Services in any manner that could interfere with, disrupt, negatively affect, or inhibit other users from fully enjoying the Services</li>
              <li>Use the Services in any way that violates applicable laws or regulations</li>
              <li>Use the Services to distribute viruses, malware, or other harmful computer code</li>
              <li>Attempt to circumvent any content-filtering techniques we employ</li>
              <li>Attempt to access or search the Services through the use of any engine, software, tool, agent, device, or mechanism other than the software and/or search agents provided by us</li>
              <li>Collect or store any personally identifiable information from the Services from other users without their express permission</li>
              <li>Impersonate or misrepresent your affiliation with any person or entity</li>
              <li>Violate any third-party rights, including any breach of confidence, copyright, trademark, patent, trade secret, moral right, privacy right, right of publicity, or any other intellectual property or proprietary right</li>
            </ul>

            <h2>Intellectual Property Rights</h2>
            <p>
              The Services and all content and materials included on the Services, including, but not limited to, text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, are the property of HotelSaaS or our licensors and are protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              We grant you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use the Services solely for your personal or internal business purposes.
            </p>

            <h2>Termination</h2>
            <p>
              We may terminate or suspend your access to and use of the Services at our sole discretion, without notice, for any reason, including if we believe that you have violated these Terms.
            </p>
            <p>
              Upon termination, your right to access and use the Services will immediately cease. The following provisions will survive termination: Intellectual Property Rights, Disclaimer of Warranties, Limitation of Liability, Indemnification, and Governing Law.
            </p>

            <h2>Disclaimer of Warranties</h2>
            <p>
              THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
            </p>
            <p>
              WE DO NOT WARRANT THAT THE SERVICES ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, OR THAT THEY WILL MEET YOUR SPECIFIC REQUIREMENTS OR BE AVAILABLE ON AN UNINTERRUPTED, SECURE, OR ERROR-FREE BASIS.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, HOTELSAAS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
            </p>
            <ul>
              <li>YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES</li>
              <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES</li>
              <li>ANY CONTENT OBTAINED FROM THE SERVICES</li>
              <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT</li>
            </ul>
            <p>
              IN NO EVENT SHALL OUR AGGREGATE LIABILITY EXCEED THE GREATER OF ONE HUNDRED U.S. DOLLARS ($100) OR THE AMOUNT YOU PAID US, IF ANY, IN THE PAST SIX MONTHS FOR THE SERVICES GIVING RISE TO THE CLAIM.
            </p>

            <h2>Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless HotelSaaS and its officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) that such parties may incur as a result of or arising from your violation of these Terms.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms and any action related thereto will be governed by the laws of the State of California without regard to its conflict of laws provisions. The exclusive jurisdiction and venue of any action with respect to the subject matter of these Terms will be the state and federal courts located in San Francisco County, California, and you waive any objection to jurisdiction and venue in such courts.
            </p>

            <h2>Entire Agreement</h2>
            <p>
              These Terms constitute the entire agreement between you and HotelSaaS regarding the Services, superseding any prior agreements between you and HotelSaaS relating to the Services.
            </p>

            <h2>Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              Email: legal@hotelsaas.com<br />
              Address: 123 Hotel Street, Suite 456, San Francisco, CA 94103
            </p>
          </motion.div>

          <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-16">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Related Policies</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Link 
                href="/privacy" 
                className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-600 dark:hover:border-blue-500 transition-colors"
              >
                <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Privacy Policy
                  <span className="absolute inset-0" />
                </h3>
                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  Learn about how we collect, use, and protect your personal information.
                </p>
                <div className="mt-3 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300">
                  Read policy <ArrowRight className="ml-1 h-4 w-4" />
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
              Our team is here to help with any questions about our terms of service.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/help"
                className="rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Visit Help Center
              </Link>
              <Link
                href="mailto:legal@hotelsaas.com"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
              >
                Contact Legal Team <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 