'use client'

import { useState } from 'react'
import {
  Card,
  Text,
  Metric,
  Title,
  BarChart,
  DonutChart,
} from '@tremor/react'
import {
  EnvelopeIcon,
  MegaphoneIcon,
  GlobeAltIcon,
  ChartBarIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  CursorArrowRaysIcon,
  DocumentChartBarIcon,
} from '@heroicons/react/24/outline'
import { CreateCampaignModal } from './create-campaign-modal'
import { AudienceSegmentsModal } from './audience-segments-modal'
import { PerformanceAnalyticsModal } from './performance-analytics-modal'
import { LandingPagesModal } from './landing-pages-modal'

// Mock data
const campaignMetrics = [
  {
    title: 'Active Campaigns',
    metric: '12',
    icon: MegaphoneIcon,
  },
  {
    title: 'Email Subscribers',
    metric: '45,678',
    icon: EnvelopeIcon,
  },
  {
    title: 'Website Traffic',
    metric: '89,234',
    icon: GlobeAltIcon,
  },
  {
    title: 'Conversion Rate',
    metric: '3.2%',
    icon: ChartBarIcon,
  },
]

const emailStats = [
  {
    month: 'Jan',
    Sent: 2890,
    Opened: 1432,
    Clicked: 678,
  },
  {
    month: 'Feb',
    Sent: 3200,
    Opened: 1550,
    Clicked: 789,
  },
  {
    month: 'Mar',
    Sent: 3500,
    Opened: 1800,
    Clicked: 890,
  },
  {
    month: 'Apr',
    Sent: 3780,
    Opened: 2100,
    Clicked: 1100,
  },
  {
    month: 'May',
    Sent: 4000,
    Opened: 2300,
    Clicked: 1300,
  },
]

const channelDistribution = [
  { name: 'Email Marketing', value: 45 },
  { name: 'Social Media', value: 30 },
  { name: 'SEO', value: 15 },
  { name: 'Paid Ads', value: 10 },
]

const quickActions = [
  {
    title: 'Create Campaign',
    description: 'Start a new marketing campaign',
    icon: MegaphoneIcon,
    color: 'blue',
  },
  {
    title: 'Audience Segments',
    description: 'Manage customer segments',
    icon: UsersIcon,
    color: 'purple',
  },
  {
    title: 'Performance',
    description: 'View campaign analytics',
    icon: ArrowTrendingUpIcon,
    color: 'emerald',
  },
  {
    title: 'Landing Pages',
    description: 'Edit promotional pages',
    icon: CursorArrowRaysIcon,
    color: 'amber',
  },
]

const upcomingCampaigns = [
  {
    name: 'Summer Special Promotion',
    date: '2024-06-01',
    status: 'Scheduled',
    type: 'Email',
  },
  {
    name: 'Hotel Anniversary Event',
    date: '2024-07-15',
    status: 'Draft',
    type: 'Multi-channel',
  },
  {
    name: 'Early Bird Booking',
    date: '2024-08-01',
    status: 'Scheduled',
    type: 'Social Media',
  },
]

export default function MarketingTools() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isAudienceModalOpen, setIsAudienceModalOpen] = useState(false)
  const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState(false)
  const [isLandingPagesModalOpen, setIsLandingPagesModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <Title>Marketing Tools</Title>
        <Text>Manage your marketing campaigns and track performance.</Text>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {campaignMetrics.map((item) => (
          <Card key={item.title} className="space-y-2">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <item.icon className="h-6 w-6" />
              <Text>{item.title}</Text>
            </div>
            <Metric>{item.metric}</Metric>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action) => (
          <button
            key={action.title}
            onClick={() => {
              if (action.title === 'Create Campaign') {
                setIsCreateModalOpen(true)
              } else if (action.title === 'Audience Segments') {
                setIsAudienceModalOpen(true)
              } else if (action.title === 'Performance') {
                setIsPerformanceModalOpen(true)
              } else if (action.title === 'Landing Pages') {
                setIsLandingPagesModalOpen(true)
              }
            }}
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
              <div className="text-left">
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
          </button>
        ))}
      </div>

      {/* Marketing Analytics */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <Title>Email Campaign Performance</Title>
          <BarChart
            className="mt-6"
            data={emailStats}
            index="month"
            categories={['Sent', 'Opened', 'Clicked']}
            colors={['blue', 'emerald', 'amber']}
            valueFormatter={(number) =>
              Intl.NumberFormat('us').format(number).toString()
            }
            yAxisWidth={48}
          />
        </Card>

        <Card>
          <Title>Marketing Channel Distribution</Title>
          <DonutChart
            className="mt-6"
            data={channelDistribution}
            category="value"
            index="name"
            valueFormatter={(number) =>
              `${Intl.NumberFormat('us').format(number).toString()}%`
            }
            colors={['emerald', 'violet', 'indigo', 'rose']}
          />
        </Card>
      </div>

      {/* Upcoming Campaigns */}
      <Card>
        <Title>Upcoming Campaigns</Title>
        <div className="mt-6">
          <div className="flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Campaign Name
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Launch Date
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Type
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {upcomingCampaigns.map((campaign) => (
                      <tr key={campaign.name}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-100">
                          {campaign.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {campaign.date}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {campaign.type}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                              campaign.status === 'Scheduled'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                            }`}
                          >
                            {campaign.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Modals */}
      <CreateCampaignModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <AudienceSegmentsModal
        isOpen={isAudienceModalOpen}
        onClose={() => setIsAudienceModalOpen(false)}
      />
      <PerformanceAnalyticsModal
        isOpen={isPerformanceModalOpen}
        onClose={() => setIsPerformanceModalOpen(false)}
      />
      <LandingPagesModal
        isOpen={isLandingPagesModalOpen}
        onClose={() => setIsLandingPagesModalOpen(false)}
      />
    </div>
  )
} 