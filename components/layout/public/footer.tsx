'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
} from 'lucide-react'

const navigation = {
  solutions: [
    { name: 'Hotel Management', href: '/features' },
    { name: 'Guest Experience', href: '/features/guest-experience' },
    { name: 'Revenue Management', href: '/features/revenue' },
    { name: 'Analytics', href: '/features/analytics' },
  ],
  support: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Guides', href: '/guides' },
    { name: 'API Status', href: '/api-status' },
    { name: 'Help Center', href: '/help' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: FacebookIcon,
    },
    {
      name: 'Twitter',
      href: '#',
      icon: TwitterIcon,
    },
    {
      name: 'Instagram',
      href: '#',
      icon: InstagramIcon,
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: LinkedinIcon,
    },
  ],
}

export function PublicFooter() {
  return (
    <footer className="bg-white dark:bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="flex items-center">
              <Image
                className="h-8 w-auto"
                src="/logo.svg"
                alt="Logo"
                width={32}
                height={32}
              />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                HotelSaaS
              </span>
            </Link>
            <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
              Transforming hotel management with modern technology and exceptional service.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Solutions
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Support
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Company
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section with Copyright */}
        <div className="mt-16 border-t border-gray-900/10 dark:border-gray-700 pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
            <div className="max-w-md">
              <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                Ready to get started?
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                Sign up for a free trial or contact sales for more information.
              </p>
              <div className="mt-4 flex items-center space-x-4">
                <Link
                  href="/register"
                  className="rounded-xl bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Get started today
                </Link>
                <Link
                  href="/contact"
                  className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Contact sales <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-xs leading-5 text-gray-500">
                &copy; {new Date().getFullYear()} HotelSaaS, Inc. All rights reserved.
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-xs leading-5 text-gray-500">All systems operational</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 