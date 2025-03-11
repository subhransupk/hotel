'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Search,
  ArrowRight,
  RefreshCw,
  Server,
  Database,
  Shield,
  Users,
  CreditCard,
  BarChart,
  LucideProps
} from 'lucide-react'
import { useState } from 'react'

// API services with their current status
const apiServices = [
  {
    name: 'Authentication API',
    description: 'User authentication and authorization services',
    status: 'operational' as const, // operational, degraded, outage
    icon: Shield,
    lastIncident: null,
    uptime: '99.99%',
  },
  {
    name: 'Bookings API',
    description: 'Reservation and booking management',
    status: 'operational' as const,
    icon: Server,
    lastIncident: '3 days ago',
    uptime: '99.95%',
  },
  {
    name: 'Inventory API',
    description: 'Room and rate inventory management',
    status: 'degraded' as const,
    icon: Database,
    lastIncident: 'Ongoing',
    uptime: '98.72%',
    details: 'Experiencing higher than normal latency'
  },
  {
    name: 'Guest API',
    description: 'Guest profile and preference management',
    status: 'operational' as const,
    icon: Users,
    lastIncident: '2 weeks ago',
    uptime: '99.97%',
  },
  {
    name: 'Payments API',
    description: 'Payment processing and billing',
    status: 'operational' as const,
    icon: CreditCard,
    lastIncident: '1 month ago',
    uptime: '99.98%',
  },
  {
    name: 'Analytics API',
    description: 'Reporting and data analytics',
    status: 'outage' as const,
    icon: BarChart,
    lastIncident: 'Ongoing',
    uptime: '95.43%',
    details: 'Service disruption - Engineers are working on a fix'
  },
]

type StatusType = 'operational' | 'degraded' | 'outage';

// Status indicators
const statusConfig = {
  operational: {
    icon: CheckCircle,
    label: 'Operational',
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800/30'
  },
  degraded: {
    icon: AlertTriangle,
    label: 'Degraded Performance',
    color: 'text-amber-500',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    borderColor: 'border-amber-200 dark:border-amber-800/30'
  },
  outage: {
    icon: XCircle,
    label: 'Service Outage',
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800/30'
  }
}

// Recent incidents
const recentIncidents = [
  {
    id: 1,
    service: 'Analytics API',
    status: 'investigating',
    title: 'Service Disruption',
    date: 'June 15, 2023 - 14:32 UTC',
    updates: [
      { time: '14:32 UTC', message: 'We are investigating reports of issues with the Analytics API.' },
      { time: '14:45 UTC', message: 'The issue has been identified as a database connection problem.' },
      { time: '15:10 UTC', message: 'Engineers are working on restoring service.' },
    ]
  },
  {
    id: 2,
    service: 'Inventory API',
    status: 'monitoring',
    title: 'Increased Latency',
    date: 'June 15, 2023 - 10:15 UTC',
    updates: [
      { time: '10:15 UTC', message: 'We are investigating increased latency in the Inventory API.' },
      { time: '10:28 UTC', message: 'The issue has been identified as high traffic volume.' },
      { time: '10:45 UTC', message: 'Additional resources have been allocated to handle the load.' },
      { time: '11:05 UTC', message: 'Service performance is improving. We are continuing to monitor.' },
    ]
  },
  {
    id: 3,
    service: 'Bookings API',
    status: 'resolved',
    title: 'Intermittent Errors',
    date: 'June 12, 2023 - 08:45 UTC',
    updates: [
      { time: '08:45 UTC', message: 'We are investigating intermittent errors in the Bookings API.' },
      { time: '09:10 UTC', message: 'The issue has been identified as a configuration error.' },
      { time: '09:35 UTC', message: 'A fix has been deployed and service has been restored.' },
    ]
  }
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

export default function ApiStatusPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [lastUpdated, setLastUpdated] = useState(new Date())
  
  // Calculate overall system status
  const hasOutage = apiServices.some(service => service.status === 'outage')
  const hasDegraded = apiServices.some(service => service.status === 'degraded')
  
  let systemStatus: StatusType = 'operational'
  if (hasOutage) systemStatus = 'outage'
  else if (hasDegraded) systemStatus = 'degraded'
  
  const handleRefresh = () => {
    // In a real app, this would fetch the latest status
    setLastUpdated(new Date())
  }
  
  // Filter services based on search
  const filteredServices = apiServices.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Helper function to render status icon
  const StatusIcon = ({ status }: { status: StatusType }) => {
    const IconComponent = statusConfig[status].icon;
    return <IconComponent className="h-5 w-5 mr-2" />;
  };
  
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
                    System Status
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
              API Status
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`inline-flex items-center px-4 py-2 rounded-full ${statusConfig[systemStatus].bgColor} ${statusConfig[systemStatus].color} mb-6`}
            >
              <StatusIcon status={systemStatus} />
              <span className="font-medium">
                {systemStatus === 'operational' ? 'All Systems Operational' : 
                 systemStatus === 'degraded' ? 'Some Systems Degraded' : 
                 'Service Outage Detected'}
              </span>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-xl mx-auto"
            >
              Monitor the current status of our API services and view recent incidents.
            </motion.p>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex items-center justify-center"
            >
              <div className="relative w-full max-w-xl">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm py-3 pl-10 pr-3 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="Search API services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-4 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400"
            >
              <Clock className="h-4 w-4 mr-1" />
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              <button 
                onClick={handleRefresh}
                className="ml-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Refresh status"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* API Services Status */}
      <div className="py-12 sm:py-16 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mx-auto max-w-2xl text-center mb-12"
          >
            <motion.h2 
              variants={fadeIn}
              className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
            >
              API Services
            </motion.h2>
            <motion.p 
              variants={fadeIn}
              className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300"
            >
              Current status of all our API endpoints and services
            </motion.p>
          </motion.div>

          <div className="mx-auto grid gap-6 lg:grid-cols-2">
            {filteredServices.map((service, index) => {
              const ServiceIcon = service.icon;
              const StatusIconComponent = statusConfig[service.status].icon;
              
              return (
                <motion.div
                  key={service.name}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col overflow-hidden rounded-2xl border ${statusConfig[service.status].borderColor} shadow-sm transition-all duration-200 bg-white dark:bg-gray-800`}
                >
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${statusConfig[service.status].bgColor} ${statusConfig[service.status].color} mr-4`}>
                          <ServiceIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {service.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      <div className={`flex items-center ${statusConfig[service.status].color} text-sm font-medium`}>
                        <StatusIconComponent className="h-5 w-5 mr-1.5" />
                        {statusConfig[service.status].label}
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Uptime:</span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-white">{service.uptime}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Last incident:</span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-white">
                          {service.lastIncident || 'None'}
                        </span>
                      </div>
                    </div>
                    
                    {service.details && (
                      <div className={`mt-4 p-3 rounded-lg text-sm ${statusConfig[service.status].bgColor} ${statusConfig[service.status].color}`}>
                        {service.details}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mx-auto max-w-2xl text-center mb-12"
          >
            <motion.h2 
              variants={fadeIn}
              className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
            >
              Recent Incidents
            </motion.h2>
            <motion.p 
              variants={fadeIn}
              className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300"
            >
              History of recent service disruptions and their resolution
            </motion.p>
          </motion.div>

          <div className="mx-auto max-w-3xl space-y-8">
            {recentIncidents.map((incident, index) => (
              <motion.div
                key={incident.id}
                variants={fadeIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {incident.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {incident.service} - {incident.date}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      incident.status === 'investigating' ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                      incident.status === 'monitoring' ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400' :
                      'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                    }`}>
                      {incident.status === 'investigating' ? 'Investigating' :
                       incident.status === 'monitoring' ? 'Monitoring' : 'Resolved'}
                    </div>
                  </div>
                  
                  <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 ml-2 space-y-4">
                    {incident.updates.map((update, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-[21px] mt-1.5 h-3 w-3 rounded-full border-2 border-white dark:border-gray-800 bg-gray-300 dark:bg-gray-600"></div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{update.time}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{update.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Developer Resources */}
      <div className="py-12 sm:py-16 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Developer Resources
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Tools and documentation to help you integrate with our API
            </p>
          </div>
          
          <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col overflow-hidden rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl bg-white dark:bg-gray-800">
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 mb-4">
                    <Server className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    API Documentation
                  </h3>
                  <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                    Comprehensive documentation for all our API endpoints and services.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="/docs/api"
                    className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
                  >
                    View documentation
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col overflow-hidden rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl bg-white dark:bg-gray-800">
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 mb-4">
                    <Code className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    SDK & Libraries
                  </h3>
                  <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                    Client libraries and SDKs for popular programming languages.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="/docs/sdk"
                    className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
                  >
                    Explore SDKs
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col overflow-hidden rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl bg-white dark:bg-gray-800">
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 mb-4">
                    <Terminal className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    API Playground
                  </h3>
                  <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                    Interactive environment to test API calls and explore responses.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="/docs/playground"
                    className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
                  >
                    Try it out
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscribe to Updates */}
      <div className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Stay Updated
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Subscribe to receive notifications about API status changes and incidents
            </p>
            
            <form className="mt-8 sm:flex sm:max-w-md sm:mx-auto">
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
              We'll only send you updates about service status. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Missing components
function Code(props: LucideProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  )
}

function Terminal(props: LucideProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  )
} 