'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, ShieldCheck, Phone } from 'lucide-react'

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

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  // Function to get the current price based on billing period
  const getCurrentPrice = (plan: typeof pricing[0]) => {
    if (plan.price === 'Custom') return 'Custom'
    return isAnnual ? plan.annualPrice : plan.price
  }

  return (
    <div className="relative isolate">
      {/* Hero section */}
      <div className="relative pt-14">
        <div className="absolute inset-0 -z-10">
          {/* Enhanced gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/90 via-white/50 to-white dark:from-blue-950/50 dark:via-gray-900/50 dark:to-gray-900" />
          
          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse delay-1000" />
          
          {/* Enhanced dot pattern */}
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

        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              {/* Enhanced badge */}
              <motion.div
                className="mb-8 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="rounded-full p-1 px-3 bg-blue-50 dark:bg-blue-900/30 ring-1 ring-blue-500/20 dark:ring-blue-400/20">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      Simple & Transparent Pricing
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced heading with gradient */}
              <motion.h1 
                className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Choose the perfect plan for your hotel
              </motion.h1>

              {/* Enhanced description */}
              <motion.p 
                className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Start with a 14-day free trial. No credit card required. Scale your plan as your hotel grows.
              </motion.p>

              {/* Trust indicators */}
              <motion.div 
                className="mt-8 flex flex-col items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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

              {/* Billing toggle with enhanced styling */}
              <motion.div 
                className="mt-10 flex items-center justify-center gap-4 p-1 rounded-full bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-xl w-fit mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className={`text-sm font-medium ${!isAnnual ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                  Monthly billing
                </span>
                <button 
                  className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 bg-blue-500"
                  role="switch"
                  aria-checked={isAnnual}
                  onClick={() => setIsAnnual(!isAnnual)}
                >
                  <span 
                    className={`${
                      isAnnual ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  />
                </button>
                <span className={`text-sm font-medium ${isAnnual ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                  Annual billing
                  <span className="ml-1.5 inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2 py-0.5 text-xs font-medium text-green-600 dark:text-green-400 ring-1 ring-inset ring-green-600/20 dark:ring-green-400/30">
                    Save 20%
                  </span>
                </span>
              </motion.div>
            </div>

            {/* Pricing Cards Section */}
            <div className="relative mx-auto mt-24">
              {/* Background decorative elements */}
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <div className="w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute w-full h-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl" />
              </div>

              {/* Pricing Grid */}
              <div className="relative grid max-w-lg grid-cols-1 mx-auto gap-8 lg:max-w-none lg:grid-cols-3">
                {pricing.map((plan, planIdx) => (
                  <motion.div
                    key={plan.name}
                    className={`relative group ${plan.highlight ? 'lg:-mt-8' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: planIdx * 0.1 }}
                  >
                    {/* Card Background with Glass Effect */}
                    <div className={`
                      absolute inset-0 rounded-3xl transition-all duration-300
                      ${plan.highlight 
                        ? 'bg-gradient-to-b from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300' 
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                      }
                    `} />
                    
                    {/* Glass Overlay */}
                    <div className="absolute inset-[1px] rounded-3xl backdrop-blur-xl bg-white/80 dark:bg-gray-800/80" />

                    {/* Hover Effects */}
                    <div className={`
                      absolute inset-0 rounded-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100
                      bg-gradient-to-br ${
                        planIdx === 0 ? 'from-blue-500/10 via-purple-500/10 to-pink-500/10' :
                        planIdx === 1 ? 'from-blue-500/20 via-indigo-500/20 to-violet-500/20' :
                        'from-cyan-500/10 via-blue-500/10 to-purple-500/10'
                      }
                    `} />

                    {/* Content */}
                    <div className="relative p-8 transition-transform duration-300 group-hover:-translate-y-2">
                      {/* Popular Badge */}
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                          <motion.div
                            className="rounded-full bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-1 text-sm font-medium text-white shadow-lg"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            Most Popular
                          </motion.div>
                        </div>
                      )}

                      {/* Plan Name & Description */}
                      <div className="text-center">
                        <h3 className={`text-2xl font-bold ${plan.highlight ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                          {plan.name}
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">{plan.description}</p>
                      </div>

                      {/* Price */}
                      <div className="mt-8 text-center">
                        <div className="flex items-baseline justify-center gap-x-2">
                          <span className={`text-5xl font-bold tracking-tight ${plan.highlight ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                            {plan.price === 'Custom' ? 'Custom' : `$${getCurrentPrice(plan)}`}
                          </span>
                          {plan.price !== 'Custom' && (
                            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">/month</span>
                          )}
                        </div>
                        {plan.price !== 'Custom' && isAnnual && (
                          <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                            Save ${(Number(plan.price) - Number(plan.annualPrice)) * 12}/year
                          </p>
                        )}
                      </div>

                      {/* Features List */}
                      <ul role="list" className="mt-8 space-y-4">
                        {plan.features.map((feature) => (
                          <motion.li 
                            key={feature}
                            className="flex items-center gap-4 text-gray-600 dark:text-gray-400"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className={`
                              flex-shrink-0 rounded-full p-1
                              ${plan.highlight ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-800'}
                            `}>
                              <CheckCircle2 className={`h-5 w-5 ${plan.highlight ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`} />
                            </div>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <motion.div 
                        className="mt-8"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          href={planIdx === 2 ? '/contact' : '/register'}
                          className={`
                            block w-full rounded-xl px-3.5 py-3.5 text-center text-sm font-semibold shadow-sm transition-all duration-300
                            ${plan.highlight
                              ? 'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25' 
                              : 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                            }
                          `}
                        >
                          {planIdx === 2 ? 'Contact sales' : 'Start free trial'}
                        </Link>
                      </motion.div>

                      {/* Money Back Guarantee */}
                      {plan.price !== 'Custom' && (
                        <div className="mt-6 text-center">
                          <div className={`
                            inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm
                            ${plan.highlight 
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                            }
                          `}>
                            <ShieldCheck className="h-4 w-4" />
                            14-day money-back guarantee
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Feature Comparison Section with Enhanced Styling */}
            <motion.div 
              className="mt-24 rounded-3xl bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 backdrop-blur-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
                Compare Plans
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 dark:text-white">Feature</th>
                      {pricing.map((plan) => (
                        <th key={plan.name} className="py-4 px-6 text-center text-sm font-semibold text-gray-900 dark:text-white">
                          <span className={plan.highlight ? 'text-blue-600 dark:text-blue-400' : ''}>
                            {plan.name}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      'Number of Rooms',
                      'Booking Management',
                      'Guest Messaging',
                      'Analytics',
                      'Support Level',
                      'API Access',
                      'Custom Development',
                    ].map((feature, idx) => (
                      <tr key={feature} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{feature}</td>
                        {pricing.map((plan) => (
                          <td key={`${plan.name}-${feature}`} className="py-4 px-6 text-center">
                            <CheckCircle2 className={`
                              mx-auto h-5 w-5 transition-colors duration-300
                              ${idx < plan.features.length 
                                ? (plan.highlight ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400')
                                : 'text-gray-300 dark:text-gray-700'
                              }
                            `} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div 
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    question: 'Can I change plans later?',
                    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
                  },
                  {
                    question: 'What payment methods do you accept?',
                    answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'
                  },
                  {
                    question: 'Is there a setup fee?',
                    answer: 'No, there are no hidden fees or setup costs. You only pay the advertised price.'
                  },
                  {
                    question: 'Do you offer a free trial?',
                    answer: 'Yes, all plans come with a 14-day free trial, no credit card required.'
                  },
                ].map((faq) => (
                  <div key={faq.question} className="rounded-lg bg-white/50 dark:bg-gray-800/50 p-6">
                    <h4 className="text-lg font-semibold mb-2">{faq.question}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 