'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Cookie, Clock, ArrowRight } from 'lucide-react'

export default function CookiePolicyPage() {
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
              Cookie Policy
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
              This Cookie Policy explains how HotelSaaS ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website and use our services. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>

            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
            <p>
              Cookies set by the website owner (in this case, HotelSaaS) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
            </p>

            <h2>Why Do We Use Cookies?</h2>
            <p>
              We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our website and services. Third parties serve cookies through our website for advertising, analytics, and other purposes.
            </p>

            <h2>Types of Cookies We Use</h2>
            <p>
              The specific types of first and third-party cookies served through our website and the purposes they perform are described below:
            </p>

            <h3>Essential Cookies</h3>
            <p>
              These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the website, you cannot refuse them without impacting how our website functions.
            </p>
            <ul>
              <li><strong>Session Cookies:</strong> These cookies are temporary and expire once you close your browser.</li>
              <li><strong>Persistent Cookies:</strong> These cookies remain on your device until you delete them or they expire.</li>
              <li><strong>Authentication Cookies:</strong> These cookies help us identify you when you log in to our platform.</li>
            </ul>

            <h3>Performance and Functionality Cookies</h3>
            <p>
              These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
            </p>
            <ul>
              <li><strong>Preference Cookies:</strong> These cookies remember your settings and preferences.</li>
              <li><strong>Language Cookies:</strong> These cookies remember your language preference.</li>
            </ul>

            <h3>Analytics and Customization Cookies</h3>
            <p>
              These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you.
            </p>
            <ul>
              <li><strong>Google Analytics:</strong> We use Google Analytics to understand how visitors interact with our website.</li>
              <li><strong>Hotjar:</strong> We use Hotjar to better understand our users' needs and to optimize this service and experience.</li>
            </ul>

            <h3>Advertising Cookies</h3>
            <p>
              These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.
            </p>
            <ul>
              <li><strong>Google Ads:</strong> We use Google Ads to deliver targeted advertisements.</li>
              <li><strong>Facebook Pixel:</strong> We use Facebook Pixel to measure the effectiveness of our advertising campaigns.</li>
            </ul>

            <h2>How Can You Control Cookies?</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in the cookie banner on our website.
            </p>
            <p>
              You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.
            </p>
            <p>
              In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">http://www.aboutads.info/choices/</a> or <a href="http://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer">http://www.youronlinechoices.com</a>.
            </p>

            <h2>Do Not Track</h2>
            <p>
              Some browsers have a "Do Not Track" feature that lets you tell websites that you do not want to have your online activities tracked. At this time, we do not respond to browser "Do Not Track" signals.
            </p>

            <h2>How Often Will We Update This Cookie Policy?</h2>
            <p>
              We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
            </p>
            <p>
              The date at the top of this Cookie Policy indicates when it was last updated.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or other technologies, please contact us at:
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
              Our team is here to help with any questions about our cookie policy.
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