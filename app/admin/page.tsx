'use client'

import { Card, Text, Metric, Title, BarList, DonutChart } from '@tremor/react'
import {
  UsersIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  ServerIcon,
  BuildingLibraryIcon,
  TicketIcon,
  ChartBarSquareIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'

// Mock data
const metrics = [
  {
    title: 'Total Hotels',
    metric: '2,345',
    icon: BuildingOfficeIcon,
  },
  {
    title: 'Active Users',
    metric: '12,789',
    icon: UsersIcon,
  },
  {
    title: 'Monthly Revenue',
    metric: '$234,567',
    icon: CurrencyDollarIcon,
  },
  {
    title: 'System Uptime',
    metric: '99.99%',
    icon: ServerIcon,
  },
]

const subscriptionData = [
  { name: 'Enterprise', value: 456 },
  { name: 'Professional', value: 789 },
  { name: 'Basic', value: 1234 },
]

const recentActivities = [
  { name: 'New hotel registration', value: 12 },
  { name: 'Subscription upgrades', value: 8 },
  { name: 'Support tickets', value: 23 },
  { name: 'Feature requests', value: 7 },
  { name: 'Bug reports', value: 4 },
]

const quickActions = [
  {
    title: 'Hotels',
    description: 'Manage hotel properties',
    icon: BuildingLibraryIcon,
    href: '/admin/customers',
    color: 'blue',
  },
  {
    title: 'Support',
    description: 'Handle customer inquiries',
    icon: TicketIcon,
    href: '/admin/support',
    color: 'purple',
  },
  {
    title: 'White Labeling',
    description: 'Customize branding & appearance',
    icon: WrenchScrewdriverIcon,
    href: '/white-labeling',
    color: 'indigo',
  },
  {
    title: 'Analytics',
    description: 'View insights & reports',
    icon: ChartBarSquareIcon,
    href: '/admin/analytics',
    color: 'emerald',
  },
  {
    title: 'System',
    description: 'Monitor platform health',
    icon: WrenchScrewdriverIcon,
    href: '/admin/monitoring',
    color: 'amber',
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <Title>Dashboard Overview</Title>
        <Text>Welcome to the Hotel Management SaaS admin panel.</Text>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((item) => (
          <Card key={item.title} className="space-y-2">
            <div className="flex items-center space-x-2 text-gray-600">
              <item.icon className="h-6 w-6" />
              <Text>{item.title}</Text>
            </div>
            <Metric>{item.metric}</Metric>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Subscription Distribution */}
        <Card>
          <Title>Subscription Distribution</Title>
          <DonutChart
            className="mt-6"
            data={subscriptionData}
            category="value"
            index="name"
            valueFormatter={(number: number) =>
              Intl.NumberFormat('us').format(number).toString()
            }
            colors={['emerald', 'violet', 'indigo']}
          />
        </Card>

        {/* Recent Activities */}
        <Card>
          <Title>Recent Activities</Title>
          <BarList
            data={recentActivities}
            className="mt-6"
            valueFormatter={(number: number) =>
              Intl.NumberFormat('us').format(number).toString()
            }
          />
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <Title>Quick Actions</Title>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <a
              key={action.title}
              href={action.href}
              className={`
                relative group rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700
                hover:shadow-md hover:ring-2 hover:ring-${action.color}-500/50 dark:hover:ring-${action.color}-500/30
                transition-all duration-150 ease-in-out
              `}
            >
              <div className="flex items-center gap-x-4">
                <div className={`p-2 rounded-lg bg-${action.color}-50 dark:bg-${action.color}-900/20`}>
                  <action.icon className={`h-6 w-6 text-${action.color}-600 dark:text-${action.color}-400`} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {action.description}
                  </p>
                </div>
              </div>
              <div
                className={`
                  absolute bottom-0 left-0 h-1 w-0 bg-${action.color}-500/50 dark:bg-${action.color}-500/30
                  group-hover:w-full transition-all duration-300 ease-in-out rounded-b-2xl
                `}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
} 