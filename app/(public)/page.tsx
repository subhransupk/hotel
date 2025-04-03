'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Star, ArrowRight, Building2, Users2, BarChart3, Clock, Laptop2, Shield, Phone, Mail, DollarSign, Building, Calendar, BarChart, ShieldCheck } from 'lucide-react'

const features = [
  {
    name: 'Smart Booking Management',
    description: 'Streamline your reservation process with automated booking management and instant confirmations.',
    icon: Building2,
  },
  {
    name: 'Guest Experience',
    description: 'Enhance guest satisfaction with personalized services and automated communication.',
    icon: Users2,
  },
  {
    name: 'Revenue Optimization',
    description: 'Maximize your revenue with dynamic pricing and advanced analytics.',
    icon: BarChart3,
  },
  {
    name: 'Time-Saving Automation',
    description: 'Automate routine tasks and focus on what matters most - your guests.',
    icon: Clock,
  },
  {
    name: 'Modern Interface',
    description: 'Intuitive dashboard and mobile apps for managing your hotel on the go.',
    icon: Laptop2,
  },
  {
    name: 'Secure & Reliable',
    description: 'Enterprise-grade security and 99.9% uptime guarantee.',
    icon: Shield,
  },
]

const pricing = [
  {
    name: 'Basic',
    price: '49',
    annualPrice: '39',
    description: 'Perfect for small hotels',
    features: [
      'Up to 50 rooms',
      'Basic booking management',
      'Guest messaging',
      'Standard reports',
      'Email support',
      '99.9% uptime',
      'Basic analytics',
    ],
    popular: false,
    highlight: false,
  },
  {
    name: 'Professional',
    price: '99',
    annualPrice: '79',
    description: 'For growing properties',
    features: [
      'Up to 200 rooms',
      'Advanced booking system',
      'Revenue management',
      'API access',
      'Priority support',
      'Custom integrations',
      'Advanced analytics',
    ],
    popular: true,
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    annualPrice: 'Custom',
    description: 'For large hotel chains',
    features: [
      'Unlimited rooms',
      'Custom integrations',
      'Dedicated account manager',
      'Custom reporting',
      '24/7 phone support',
      'White-label solution',
      'Custom development',
    ],
    popular: false,
    highlight: false,
  },
]

const testimonials = [
  {
    quote: "This platform has transformed how we manage our hotel. The automation features alone have saved us countless hours.",
    name: "Sarah Johnson",
    role: "General Manager at Luxury Resort & Spa",
    avatar: "/images/demo/avatar-1.jpg",
    rating: 5,
  },
  {
    quote: "The revenue optimization tools helped us increase our occupancy rate by 40%. Best investment we've made.",
    name: "Michael Chen",
    role: "Operations Director at Urban Boutique Hotel",
    avatar: "/images/demo/avatar-2.jpg",
    rating: 5,
  },
  {
    quote: "Exceptional platform with outstanding support. It's like having an extra team member working 24/7.",
    name: "Emma Rodriguez",
    role: "Hotel Owner at Seaside Inn",
    avatar: "/images/demo/avatar-3.jpg",
    rating: 5,
  },
]

const integrations = [
  {
    name: 'Booking.com',
    logo: '/integrations/booking.png',
  },
  {
    name: 'Expedia',
    logo: '/integrations/expedia.png',
  },
  {
    name: 'Stripe',
    logo: '/integrations/stripe.png',
  },
  {
    name: 'Salesforce',
    logo: '/integrations/salesforce.png',
  },
  {
    name: 'Slack',
    logo: '/integrations/slack.png',
  },
  {
    name: 'QuickBooks',
    logo: '/integrations/quickbooks.png',
  },
]

export default function Home() {
  return (
    <div className="relative isolate">
      {/* Hero section */}
      <div className="relative pt-14">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Primary gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/90 via-white/50 to-white dark:from-blue-950/50 dark:via-gray-900/50 dark:to-gray-900" />
          
          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse delay-1000" />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.15] dark:opacity-[0.07]"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(56, 189, 248, 0.07) 1px, transparent 1px),
                linear-gradient(0deg, rgba(56, 189, 248, 0.07) 1px, transparent 1px)
              `,
              backgroundSize: '4rem 4rem',
              mask: 'radial-gradient(circle at center, white, transparent 80%)'
            }}
          />

          {/* Geometric shapes */}
          <div className="absolute inset-0">
            <svg className="absolute left-0 top-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="pattern-circles" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1.5" className="fill-blue-500/20" />
                  <circle cx="50" cy="50" r="1" className="fill-blue-400/20" />
                  <circle cx="90" cy="90" r="2" className="fill-blue-600/20" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pattern-circles)" />
            </svg>
          </div>

          {/* Floating elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-8 sm:w-12 h-8 sm:h-12 border border-blue-500/30 rounded-lg rotate-12 animate-float" />
            <div className="absolute top-1/3 right-1/3 w-6 sm:w-8 h-6 sm:h-8 border border-purple-500/30 rounded-full animate-float-delay" />
            <div className="absolute bottom-1/4 right-1/4 w-10 sm:w-16 h-10 sm:h-16 border border-cyan-500/30 rounded-xl -rotate-12 animate-float" />
          </div>

          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-900" />
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          @keyframes float-delay {
            0%, 100% { transform: translateY(0) rotate(0); }
            50% { transform: translateY(-15px) rotate(-5deg); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-delay {
            animation: float-delay 8s ease-in-out infinite;
          }
        `}</style>

        <div className="py-12 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent max-w-[900px] mx-auto leading-[1.2] sm:leading-[1.1]">
                  Smarter Hotel Management{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Made Simple</span>
                </h1>
                <p className="mt-4 sm:mt-8 text-base sm:text-xl leading-7 sm:leading-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
                  Streamline your hotel operations, delight guests, and boost revenue with our all-in-one management platform.
                </p>

                <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto"
                  >
                    <Link
                      href="/register"
                      className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                    >
                      Start Free Trial
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto"
                  >
                    <Link
                      href="#features"
                      className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-gray-900 dark:text-white ring-1 ring-gray-900/10 dark:ring-white/10 hover:ring-gray-900/20 dark:hover:ring-white/20 transition-all duration-300"
                    >
                      See Features
                    </Link>
                  </motion.div>
                </div>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={i}
                        src={`/images/demo/avatar-${i}.jpg`}
                        alt={`User ${i}`}
                        className="relative w-8 sm:w-10 h-8 sm:h-10 rounded-full border-2 border-white dark:border-gray-800"
                      />
                    ))}
                  </div>
                  <div className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-900 dark:text-white">2,000+ hoteliers</span> trust us globally
                  </div>
                </div>
              </motion.div>

              {/* Dashboard Preview */}
              <motion.div
                className="mt-8 sm:mt-16 relative mx-auto max-w-5xl px-4 sm:px-0"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <div className="relative">
                  <div className="absolute -inset-x-2 -top-2 -bottom-1 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 blur-2xl" />
                  <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-gray-900/70 backdrop-blur shadow-2xl ring-1 ring-gray-900/10">
                    <Image
                      src="/images/demo/dashboard-preview.jpg"
                      alt="Dashboard Preview"
                      width={1920}
                      height={1080}
                      className="w-full h-auto"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-gray-900/0" />
                  </div>
                </div>
              </motion.div>

              {/* Stats Row */}
              <div className="mt-8 sm:mt-16 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8">
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <dt className="text-sm sm:text-base leading-7 text-gray-600 dark:text-gray-400">Average Revenue Increase</dt>
                  <dd className="text-2xl sm:text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">40%</dd>
                </motion.div>
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <dt className="text-sm sm:text-base leading-7 text-gray-600 dark:text-gray-400">Time Saved on Operations</dt>
                  <dd className="text-2xl sm:text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">15hrs/week</dd>
                </motion.div>
                <motion.div
                  className="col-span-2 sm:col-span-1 flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <dt className="text-sm sm:text-base leading-7 text-gray-600 dark:text-gray-400">Guest Satisfaction Rate</dt>
                  <dd className="text-2xl sm:text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">98%</dd>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="relative py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            {/* Gradient orbs */}
            <div className="absolute top-1/4 -left-1/4 w-1/2 aspect-square rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-3xl" />
            <div className="absolute bottom-1/4 -right-1/4 w-1/2 aspect-square rounded-full bg-gradient-to-r from-cyan-500/30 to-emerald-500/30 blur-3xl" />
            
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 pb-1">
                Trusted by Hotels Worldwide
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Join thousands of hotels that trust our platform for their operations
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Hotels Served */}
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 opacity-25 blur transition duration-200 group-hover:opacity-75" />
                <div className="relative h-full rounded-2xl bg-white/90 dark:bg-gray-900/90 ring-1 ring-gray-200/70 dark:ring-gray-800/80 p-6">
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 p-3 rounded-xl">
                      <Building2 className="w-6 h-6" />
                    </span>
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20" />
                  </div>
                  <h3 className="mt-4 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
                    2,500+
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Hotels Served Worldwide</p>
                </div>
              </div>

              {/* Monthly Bookings */}
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-25 blur transition duration-200 group-hover:opacity-75" />
                <div className="relative h-full rounded-2xl bg-white/90 dark:bg-gray-900/90 ring-1 ring-gray-200/70 dark:ring-gray-800/80 p-6">
                  <div className="flex items-center justify-between">
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 p-3 rounded-xl">
                      <BarChart3 className="w-6 h-6" />
                    </span>
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
                  </div>
                  <h3 className="mt-4 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    1.2M+
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Monthly Bookings</p>
                </div>
              </div>

              {/* Revenue Generated */}
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 opacity-25 blur transition duration-200 group-hover:opacity-75" />
                <div className="relative h-full rounded-2xl bg-white/90 dark:bg-gray-900/90 ring-1 ring-gray-200/70 dark:ring-gray-800/80 p-6">
                  <div className="flex items-center justify-between">
                    <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 p-3 rounded-xl">
                      <DollarSign className="w-6 h-6" />
                    </span>
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-600/20 to-teal-600/20" />
                  </div>
                  <h3 className="mt-4 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                    $500M+
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Revenue Generated</p>
                </div>
              </div>

              {/* Customer Satisfaction */}
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 opacity-25 blur transition duration-200 group-hover:opacity-75" />
                <div className="relative h-full rounded-2xl bg-white/90 dark:bg-gray-900/90 ring-1 ring-gray-200/70 dark:ring-gray-800/80 p-6">
                  <div className="flex items-center justify-between">
                    <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 p-3 rounded-xl">
                      <Users2 className="w-6 h-6" />
                    </span>
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-600/20 to-orange-600/20" />
                  </div>
                  <h3 className="mt-4 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
                    98%
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Customer Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="relative py-24 sm:py-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-blue-950/20 dark:via-gray-900 dark:to-gray-900" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-blue-500/5 to-transparent rounded-full blur-3xl" />
            
            {/* Animated grid pattern */}
            <div className="absolute inset-0">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: '64px 64px',
                mask: 'radial-gradient(circle at center, white 30%, transparent 80%)'
              }} />
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center mb-16">
              <motion.span 
                className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-600/20 dark:ring-blue-400/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Simple Process
              </motion.span>
              <motion.h2 
                className="mt-6 text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent sm:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                How It Works
              </motion.h2>
              <motion.p 
                className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Get started with our platform in three simple steps
              </motion.p>
            </div>

            <div className="relative">
              {/* Connecting Lines SVG */}
              <svg className="absolute left-0 top-1/2 w-full -translate-y-1/2" height="200" fill="none">
                <motion.path
                  d="M0,100 C150,100 150,50 300,50 C450,50 450,150 600,150 C750,150 750,100 900,100"
                  stroke="url(#blue-gradient)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="blue-gradient" x1="0" y1="0" x2="100%" y2="0">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#3B82F6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Steps */}
              <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-8">
                {[
                  {
                    title: "Setup Your Hotel",
                    description: "Configure your property details, rooms, and services in our intuitive dashboard",
                    icon: Building,
                    color: "from-blue-600 to-cyan-600",
                    screenshot: "/images/demo/dashboard-preview.jpg"
                  },
                  {
                    title: "Manage Operations",
                    description: "Handle bookings, check-ins, and guest services with our all-in-one platform",
                    icon: Calendar,
                    color: "from-purple-600 to-pink-600",
                    screenshot: "/images/demo/dashboard-preview.jpg"
                  },
                  {
                    title: "Grow Revenue",
                    description: "Optimize pricing, track performance, and increase your hotel's profitability",
                    icon: BarChart,
                    color: "from-amber-600 to-orange-600",
                    screenshot: "/images/demo/dashboard-preview.jpg"
                  },
                ].map((step, index) => (
                  <motion.div
                    key={step.title}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <div className="relative flex flex-col items-center">
                      {/* Step Number */}
                      <motion.div 
                        className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-sm shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {index + 1}
                      </motion.div>

                      {/* Icon Container */}
                      <div className="relative mb-8">
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r opacity-20 blur-xl transition-all duration-500" style={{ backgroundImage: `linear-gradient(to right, ${step.color})` }} />
                        <motion.div 
                          className="relative rounded-2xl bg-white dark:bg-gray-800 p-4 ring-1 ring-gray-900/10 dark:ring-gray-700/30"
                          whileHover={{ scale: 1.05, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <step.icon className="w-8 h-8 bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${step.color})` }} />
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="text-center mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {step.description}
                        </p>
                      </div>

                      {/* Screenshot Preview */}
                      <motion.div 
                        className="relative rounded-xl overflow-hidden shadow-2xl"
                        whileHover={{ scale: 1.05, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r opacity-10" style={{ backgroundImage: `linear-gradient(to right, ${step.color})` }} />
                        <Image
                          src={step.screenshot}
                          alt={step.title}
                          width={400}
                          height={300}
                          className="w-full h-auto"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-gray-900/0" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Action Button */}
              <motion.div 
                className="mt-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Link
                  href="/register"
                  className="inline-flex items-center rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-500 transition-all duration-300"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="relative py-24 sm:py-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-blue-950/20 dark:via-gray-900 dark:to-gray-900" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-blue-500/5 to-transparent rounded-full blur-3xl" />
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <motion.span 
                className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-600/20 dark:ring-blue-400/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Powerful Features
              </motion.span>
              <motion.h2 
                className="mt-6 text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent sm:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Everything you need to manage your hotel
              </motion.h2>
              <motion.p 
                className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Our comprehensive suite of tools helps you manage every aspect of your hotel operations efficiently and effectively.
              </motion.p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.name}
                    className="relative group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Card Background */}
                    <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 blur-xl transition duration-300 group-hover:opacity-100" />
                    
                    {/* Card Content */}
                    <div className="relative rounded-2xl backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 p-8 ring-1 ring-gray-900/10 dark:ring-gray-700/30 transition-all duration-300 group-hover:ring-blue-500/20">
                      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition duration-300 group-hover:opacity-100" />
                      
                      <div className="relative">
                        {/* Icon */}
                        <div className="mb-8 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-2.5 ring-2 ring-blue-500/20 transition-all duration-300 group-hover:ring-blue-500/40">
                          <feature.icon className="w-full h-full text-white" />
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                          {feature.name}
                        </h3>
                        <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>

                        {/* Learn More Link */}
                        <div className="mt-8 flex items-center">
                          <Link
                            href="#"
                            className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center group/link"
                          >
                            Learn more
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Feature Highlights */}
              <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: 'Active Hotels', value: '2,500+' },
                  { label: 'Monthly Bookings', value: '50,000+' },
                  { label: 'Data Points Processed', value: '1M+' },
                  { label: 'Customer Satisfaction', value: '98%' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 p-6 text-center ring-1 ring-gray-900/10 dark:ring-gray-700/30"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</dt>
                    <dd className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">{stat.value}</dd>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <section className="relative w-full overflow-hidden bg-white dark:bg-gray-900 py-24">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white dark:from-gray-900 dark:to-gray-900 z-10"></div>
          
          {/* Content */}
          <div className="relative z-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                What Our Clients Say
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Trusted by leading hotels worldwide
              </p>
            </div>

            {/* First Row - Left to Right */}
            <div className="relative">
              <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />
              <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />
              <div className="flex overflow-hidden">
                <div className="flex animate-marquee-infinite gap-8 whitespace-nowrap py-4">
                  {[...testimonials, ...testimonials].map((testimonial, idx) => (
                    <div
                      key={idx}
                      className="w-[320px] flex-none rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 border border-gray-200/50 dark:border-gray-700/50"
                      style={{ transform: 'translateZ(0)' }}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-500"
                        />
                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <blockquote className="mt-4 text-sm text-gray-700 dark:text-gray-300 line-clamp-4">
                        {testimonial.quote}
                      </blockquote>
                    </div>
                  ))}
                </div>
                <div className="flex animate-marquee-infinite gap-8 whitespace-nowrap py-4" aria-hidden="true">
                  {[...testimonials, ...testimonials].map((testimonial, idx) => (
                    <div
                      key={idx}
                      className="w-[320px] flex-none rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 border border-gray-200/50 dark:border-gray-700/50"
                      style={{ transform: 'translateZ(0)' }}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-500"
                        />
                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <blockquote className="mt-4 text-sm text-gray-700 dark:text-gray-300 line-clamp-4">
                        {testimonial.quote}
                      </blockquote>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Second Row - Right to Left */}
            <div className="relative mt-8">
              <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />
              <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />
              <div className="flex overflow-hidden">
                <div className="flex animate-marquee-infinite-reverse gap-8 whitespace-nowrap py-4">
                  {[...testimonials, ...testimonials].map((testimonial, idx) => (
                    <div
                      key={idx}
                      className="w-[320px] flex-none rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 border border-gray-200/50 dark:border-gray-700/50"
                      style={{ transform: 'translateZ(0)' }}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-500"
                        />
                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <blockquote className="mt-4 text-sm text-gray-700 dark:text-gray-300 line-clamp-4">
                        {testimonial.quote}
                      </blockquote>
                    </div>
                  ))}
                </div>
                <div className="flex animate-marquee-infinite-reverse gap-8 whitespace-nowrap py-4" aria-hidden="true">
                  {[...testimonials, ...testimonials].map((testimonial, idx) => (
                    <div
                      key={idx}
                      className="w-[320px] flex-none rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 border border-gray-200/50 dark:border-gray-700/50"
                      style={{ transform: 'translateZ(0)' }}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-500"
                        />
                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <blockquote className="mt-4 text-sm text-gray-700 dark:text-gray-300 line-clamp-4">
                        {testimonial.quote}
                      </blockquote>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations Section */}
        <div className="relative py-24 sm:py-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-blue-950/20 dark:via-gray-900 dark:to-gray-900" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-blue-500/5 to-transparent rounded-full blur-3xl" />
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <motion.h2 
                className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent sm:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Seamless integrations
              </motion.h2>
              <motion.p 
                className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Connect with your favorite tools and services to create a powerful ecosystem
              </motion.p>
            </div>

            <div className="mx-auto mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
              {integrations.map((integration, integrationIdx) => (
                <motion.div
                  key={integration.name}
                  className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 p-8 border border-white/20 dark:border-gray-700/30"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100" />
                  <div className="relative flex h-32 items-center justify-center rounded-xl backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 dark:border-gray-700/30 transition-all duration-300 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.18)] group-hover:border-blue-500/20">
                    <div className="relative h-16 w-full">
                      <Image
                        src={`/images/demo/integration-${integrationIdx + 1}.png`}
                        alt={integration.name}
                        fill
                        className="object-contain filter saturate-0 group-hover:saturate-100 transition-all duration-500"
                      />
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-blue-500/90 text-white text-sm font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                      {integration.name}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Integration Features */}
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <motion.div
                className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 p-8 shadow-lg border border-white/20 dark:border-gray-700/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 blur-2xl" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Easy Setup</h3>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Connect your favorite tools with just a few clicks. No coding required.</p>
              </motion.div>

              <motion.div
                className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 p-8 shadow-lg border border-white/20 dark:border-gray-700/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-10 blur-2xl" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Real-time Sync</h3>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Keep your data in sync across all platforms automatically.</p>
              </motion.div>

              <motion.div
                className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 p-8 shadow-lg border border-white/20 dark:border-gray-700/30 sm:col-span-2 lg:col-span-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 opacity-10 blur-2xl" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Custom API</h3>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Build custom integrations with our robust API endpoints.</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="relative isolate overflow-hidden">
          {/* Background gradients and effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/90 via-white/50 to-white dark:from-blue-950/50 dark:via-gray-900/50 dark:to-gray-900" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse delay-1000" />
            
            {/* Animated dots pattern */}
            <div 
              className="absolute inset-0 opacity-[0.15] dark:opacity-[0.07]"
              style={{
                backgroundImage: `
                  radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 2px, transparent 2px)
                `,
                backgroundSize: '3rem 3rem',
                mask: 'radial-gradient(circle at center, white, transparent 80%)'
              }}
            />
          </div>

          <div className="w-full py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 p-8 sm:p-16 rounded-3xl border border-white/20 dark:border-gray-700/30 shadow-xl">
                <div className="text-center">
                  <motion.h2 
                    className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent sm:text-5xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    Transform Your Hotel Operations Today
                  </motion.h2>
                  <motion.p 
                    className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Join thousands of successful hotels already using our platform to streamline operations, 
                    increase revenue, and deliver exceptional guest experiences.
                  </motion.p>
                  <motion.div 
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href="/register"
                        className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold group"
                      >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                        <span className="relative flex items-center">
                          Get started free
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href="/pricing"
                        className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-semibold text-blue-600 dark:text-blue-400 transition-all duration-300 group"
                      >
                        <span className="absolute inset-0 w-full h-full rounded-xl border border-blue-500/30 dark:border-blue-400/30 group-hover:border-blue-500/50 dark:group-hover:border-blue-400/50 transition-all duration-300"></span>
                        <span className="relative flex items-center">
                          View pricing
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </Link>
                    </motion.div>
                  </motion.div>

                  {/* Trust indicators */}
                  <motion.div 
                    className="mt-10 flex flex-col items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Free 14-day trial</span>
                      <span className="mx-2">•</span>
                      <span>No credit card required</span>
                      <span className="mx-2">•</span>
                      <span>Cancel anytime</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <img
                            key={i}
                            src={`/images/demo/avatar-${i}.jpg`}
                            alt={`User ${i}`}
                            className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Trusted by 10,000+ hotels worldwide
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 