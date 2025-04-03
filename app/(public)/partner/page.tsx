'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Building, Users, Briefcase, Globe, Shield, Zap } from 'lucide-react'

const partnerBenefits = [
  {
    id: 1,
    title: 'Custom Branding',
    description: 'Fully rebrand our platform with your logo, colors, and domain to create a seamless extension of your business.',
    icon: Building,
  },
  {
    id: 2,
    title: 'Multi-Tenant Management',
    description: 'Manage multiple hotel clients from a single dashboard with robust administrative controls.',
    icon: Users,
  },
  {
    id: 3,
    title: 'Revenue Sharing',
    description: 'Earn competitive commissions on all subscriptions you bring to the platform with transparent reporting.',
    icon: Briefcase,
  },
  {
    id: 4,
    title: 'Global Deployment',
    description: 'Launch your branded hotel management solution in multiple regions with localization support.',
    icon: Globe,
  },
  {
    id: 5,
    title: 'Enterprise Security',
    description: 'Benefit from our enterprise-grade security infrastructure while maintaining your brand identity.',
    icon: Shield,
  },
  {
    id: 6,
    title: 'API Integration',
    description: 'Connect with your existing systems through our comprehensive API for seamless data flow.',
    icon: Zap,
  },
]

const partnerTypes = [
  {
    id: 'technology',
    title: 'Technology Partners',
    description: 'For software companies looking to add hotel management capabilities to their product portfolio.',
    features: [
      'Full white-label solution',
      'API-first integration',
      'Technical implementation support',
      'Joint marketing opportunities',
      'Dedicated partner manager'
    ],
    image: 'https://dummyimage.com/800x450/3b82f6/ffffff.jpg&text=Technology+Partners',
  },
  {
    id: 'hospitality',
    title: 'Hospitality Consultants',
    description: 'For consultants and agencies serving the hospitality industry who want to offer software solutions.',
    features: [
      'Co-branded solution',
      'Client management dashboard',
      'Implementation templates',
      'Training resources',
      'Commission structure'
    ],
    image: 'https://dummyimage.com/800x450/4f46e5/ffffff.jpg&text=Hospitality+Consultants',
  },
  {
    id: 'enterprise',
    title: 'Enterprise & Chains',
    description: 'For hotel chains and enterprise organizations looking for a custom-branded solution across properties.',
    features: [
      'Custom deployment options',
      'Advanced data segregation',
      'Corporate hierarchy support',
      'Custom reporting',
      'Dedicated support team'
    ],
    image: 'https://dummyimage.com/800x450/0ea5e9/ffffff.jpg&text=Enterprise+%26+Chains',
  },
]

const testimonials = [
  {
    id: 1,
    quote: "White labeling this platform has allowed us to offer hotel management software to our clients without building it from scratch. Our revenue has increased by 40% in the first year.",
    author: "Jennifer Martinez",
    role: "CEO, HospitalityTech Solutions",
    company: "HospitalityTech Solutions",
    image: "https://dummyimage.com/100x100/6366f1/ffffff.jpg&text=JM"
  },
  {
    id: 2,
    quote: "The flexibility of the white label program allowed us to create a perfectly branded solution for our hotel chain clients. The onboarding support was exceptional.",
    author: "Michael Chen",
    role: "Director of Partnerships",
    company: "Global Hospitality Group",
    image: "https://dummyimage.com/100x100/8b5cf6/ffffff.jpg&text=MC"
  },
  {
    id: 3,
    quote: "We've been able to expand our consulting services with a technology offering that feels like our own. The revenue sharing model is transparent and profitable.",
    author: "Sarah Johnson",
    role: "Principal Consultant",
    company: "Hospitality Advisors International",
    image: "https://dummyimage.com/100x100/ec4899/ffffff.jpg&text=SJ"
  }
]

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function PartnerPage() {
  const [selectedPartnerType, setSelectedPartnerType] = useState('technology')
  
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
                    Partnership Program
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
              Partner With Us
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
            >
              White label our hotel management platform and offer it as your own solution. Expand your product portfolio, increase revenue, and deliver exceptional value to your clients.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="#contact"
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Become a Partner
              </Link>
              <Link
                href="#partner-types"
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Explore Partnership Types
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              White Label Benefits
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Leverage our powerful hotel management platform under your own brand
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {partnerBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-start"
              >
                <div className="rounded-xl bg-blue-50 dark:bg-blue-900/30 p-3 ring-1 ring-blue-500/20 dark:ring-blue-400/20">
                  <benefit.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-7 tracking-tight text-gray-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Partner Types Section */}
      <div id="partner-types" className="bg-gray-50 dark:bg-gray-800/50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Partnership Types
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Choose the partnership model that best fits your business
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {partnerTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedPartnerType(type.id)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                  selectedPartnerType === type.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {type.title}
              </button>
            ))}
          </div>
          
          {partnerTypes.map((type) => (
            <div 
              key={type.id}
              className={`${selectedPartnerType === type.id ? 'block' : 'hidden'}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {type.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    {type.description}
                  </p>
                  <ul className="space-y-4">
                    {type.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10">
                    <Link
                      href="#contact"
                      className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      Apply for this partnership <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
                <div className="order-1 lg:order-2 relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <Image
                    src={type.image}
                    alt={type.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Partner Success Stories
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Hear from businesses that have successfully white labeled our platform
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col justify-between rounded-2xl bg-gray-50 dark:bg-gray-800 p-8 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700"
              >
                <div>
                  <div className="flex items-center gap-x-2">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
                        {testimonial.author}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <p className="mt-6 text-base italic text-gray-600 dark:text-gray-300">
                    "{testimonial.quote}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="contact" className="bg-gray-50 dark:bg-gray-800/50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Become a Partner
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Fill out the form below and our partnership team will contact you within 24 hours
            </p>
          </div>
          
          <div className="mx-auto max-w-xl">
            <form className="space-y-8">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                    First name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 dark:bg-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                    Last name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 dark:bg-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                    Company
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="company"
                      id="company"
                      autoComplete="organization"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 dark:bg-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 dark:bg-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                    Phone number
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="tel"
                      name="phone-number"
                      id="phone-number"
                      autoComplete="tel"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 dark:bg-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="partnership-type" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                    Partnership Type
                  </label>
                  <div className="mt-2.5">
                    <select
                      id="partnership-type"
                      name="partnership-type"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    >
                      <option value="technology">Technology Partner</option>
                      <option value="hospitality">Hospitality Consultant</option>
                      <option value="enterprise">Enterprise & Chains</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                    Message
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 dark:bg-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      placeholder="Tell us about your business and partnership goals..."
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to expand your business?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Join our partner program today and start offering a premium hotel management solution under your own brand.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="#contact"
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Apply Now
              </Link>
              <Link
                href="/contact"
                className="text-sm font-semibold leading-6 text-white"
              >
                Contact Sales <span aria-hidden="true">→</span>
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