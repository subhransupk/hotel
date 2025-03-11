'use client'

import { useState } from 'react'
import {
  Card,
  Text,
  Metric,
  Title,
  BarChart,
  Badge,
  Switch,
} from '@tremor/react'
import {
  PuzzlePieceIcon,
  ChartBarIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  CreditCardIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'

interface Feature {
  id: number
  name: string
  description: string
  category: string
  status: 'Active' | 'Beta'
  usageCount: number
  lastUpdated: string
  icon: React.ElementType
  enabled: boolean
}

// Mock data for features
const features: Feature[] = [
  {
    id: 1,
    name: 'Room Booking',
    description: 'Direct room booking and reservation management',
    category: 'Core',
    status: 'Active',
    usageCount: 15234,
    lastUpdated: '2024-02-15',
    icon: BuildingOfficeIcon,
    enabled: true,
  },
  {
    id: 2,
    name: 'Calendar Integration',
    description: 'Sync bookings with external calendar services',
    category: 'Integration',
    status: 'Active',
    usageCount: 8765,
    lastUpdated: '2024-02-14',
    icon: CalendarIcon,
    enabled: true,
  },
  {
    id: 3,
    name: 'Guest Messaging',
    description: 'Real-time chat and messaging with guests',
    category: 'Communication',
    status: 'Beta',
    usageCount: 4532,
    lastUpdated: '2024-02-13',
    icon: ChatBubbleLeftRightIcon,
    enabled: true,
  },
  {
    id: 4,
    name: 'Payment Processing',
    description: 'Secure payment handling and invoicing',
    category: 'Core',
    status: 'Active',
    usageCount: 12453,
    lastUpdated: '2024-02-12',
    icon: CreditCardIcon,
    enabled: true,
  },
  {
    id: 5,
    name: 'Analytics Dashboard',
    description: 'Advanced analytics and reporting tools',
    category: 'Analytics',
    status: 'Beta',
    usageCount: 3245,
    lastUpdated: '2024-02-11',
    icon: DocumentChartBarIcon,
    enabled: false,
  },
  {
    id: 6,
    name: 'Guest Profiles',
    description: 'Detailed guest information and preferences',
    category: 'Core',
    status: 'Active',
    usageCount: 9876,
    lastUpdated: '2024-02-10',
    icon: UserGroupIcon,
    enabled: true,
  },
]

const usageData = [
  {
    date: '2024-01',
    'Room Booking': 12453,
    'Calendar Integration': 8765,
    'Guest Messaging': 4532,
    'Payment Processing': 11234,
  },
  {
    date: '2024-02',
    'Room Booking': 13567,
    'Calendar Integration': 9234,
    'Guest Messaging': 5678,
    'Payment Processing': 12567,
  },
  {
    date: '2024-03',
    'Room Booking': 15234,
    'Calendar Integration': 8765,
    'Guest Messaging': 4532,
    'Payment Processing': 12453,
  },
]

const metrics = [
  {
    title: 'Total Features',
    metric: '12',
    icon: PuzzlePieceIcon,
  },
  {
    title: 'Active Features',
    metric: '10',
    icon: ChartBarIcon,
  },
  {
    title: 'Beta Features',
    metric: '2',
    icon: Cog6ToothIcon,
  },
]

interface FeatureStates {
  [key: number]: boolean
}

export default function FeatureManagement() {
  const [featureStates, setFeatureStates] = useState<FeatureStates>(
    features.reduce((acc, feature) => ({ ...acc, [feature.id]: feature.enabled }), {})
  )

  const handleToggleFeature = (id: number) => {
    setFeatureStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <Title>Feature Management</Title>
        <Text>Control and monitor system features and their usage.</Text>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((item) => (
          <Card key={item.title} className="space-y-2">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <item.icon className="h-6 w-6" />
              <Text>{item.title}</Text>
            </div>
            <Metric>{item.metric}</Metric>
          </Card>
        ))}
      </div>

      {/* Feature Usage Chart */}
      <Card>
        <Title>Feature Usage Trends</Title>
        <Text>Usage metrics across core features</Text>
        <BarChart
          className="mt-6 h-80"
          data={usageData}
          index="date"
          categories={['Room Booking', 'Calendar Integration', 'Guest Messaging', 'Payment Processing']}
          colors={['blue', 'purple', 'orange', 'green']}
          valueFormatter={(number: number) =>
            Intl.NumberFormat('us').format(number).toString()
          }
          yAxisWidth={48}
        />
      </Card>

      {/* Features List */}
      <Card>
        <Title>Feature Controls</Title>
        <div className="mt-6">
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Feature
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Usage
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Toggle
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                {features.map((feature) => (
                  <tr key={feature.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <feature.icon className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">{feature.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{feature.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {feature.category}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <Badge
                        className={
                          feature.status === 'Active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }
                      >
                        {feature.status}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {feature.usageCount.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(feature.lastUpdated).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                      <Switch
                        checked={featureStates[feature.id]}
                        onChange={() => handleToggleFeature(feature.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  )
} 