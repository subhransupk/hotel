'use client'

import { useState } from 'react'
import {
  Card,
  Text,
  Metric,
  Title,
  AreaChart,
  Badge,
  Button,
} from '@tremor/react'
import {
  KeyIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  ClipboardDocumentIcon,
  ExclamationTriangleIcon,
  CodeBracketIcon,
  ClockIcon,
  SignalIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline'

interface ApiKey {
  id: number
  name: string
  key: string
  status: 'Active' | 'Expired' | 'Revoked'
  created: string
  lastUsed: string
  expiresAt: string
  environment: 'Production' | 'Development'
  permissions: string[]
}

// Mock data for API keys
const apiKeys: ApiKey[] = [
  {
    id: 1,
    name: 'Production API Key',
    key: 'hms_prod_key_123456789',
    status: 'Active',
    created: '2024-01-15',
    lastUsed: '2024-02-15',
    expiresAt: '2024-12-31',
    environment: 'Production',
    permissions: ['read:bookings', 'write:bookings', 'read:guests', 'write:guests'],
  },
  {
    id: 2,
    name: 'Development API Key',
    key: 'hms_dev_key_987654321',
    status: 'Active',
    created: '2024-01-20',
    lastUsed: '2024-02-14',
    expiresAt: '2024-06-30',
    environment: 'Development',
    permissions: ['read:bookings', 'write:bookings', 'read:guests'],
  },
  {
    id: 3,
    name: 'Test API Key',
    key: 'hms_test_key_456789123',
    status: 'Expired',
    created: '2023-12-01',
    lastUsed: '2024-01-31',
    expiresAt: '2024-02-01',
    environment: 'Development',
    permissions: ['read:bookings'],
  },
]

const apiUsageData = [
  {
    date: '2024-01',
    'API Calls': 45234,
    'Success Rate': 99.8,
    'Error Rate': 0.2,
  },
  {
    date: '2024-02',
    'API Calls': 52123,
    'Success Rate': 99.9,
    'Error Rate': 0.1,
  },
  {
    date: '2024-03',
    'API Calls': 48765,
    'Success Rate': 99.7,
    'Error Rate': 0.3,
  },
]

const metrics = [
  {
    title: 'Total API Calls',
    metric: '146,122',
    icon: CodeBracketIcon,
  },
  {
    title: 'Average Response Time',
    metric: '124ms',
    icon: ClockIcon,
  },
  {
    title: 'Success Rate',
    metric: '99.8%',
    icon: SignalIcon,
  },
]

const endpoints = [
  {
    name: 'Bookings API',
    version: 'v1',
    status: 'Stable',
    docs: '/api/docs/bookings',
  },
  {
    name: 'Guests API',
    version: 'v2',
    status: 'Beta',
    docs: '/api/docs/guests',
  },
  {
    name: 'Payments API',
    version: 'v1',
    status: 'Stable',
    docs: '/api/docs/payments',
  },
  {
    name: 'Analytics API',
    version: 'v1',
    status: 'Deprecated',
    docs: '/api/docs/analytics',
  },
]

export default function DeveloperPortal() {
  const [copiedKey, setCopiedKey] = useState<number | null>(null)

  const handleCopyKey = (id: number, key: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(id)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleRegenerateKey = (id: number) => {
    // TODO: Implement key regeneration
    console.log('Regenerate key:', id)
  }

  const handleRevokeKey = (id: number) => {
    if (confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
      // TODO: Implement key revocation
      console.log('Revoke key:', id)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Title>API & Developer Portal</Title>
        <Text>Manage API keys, view documentation, and monitor API usage.</Text>
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

      {/* API Usage Chart */}
      <Card>
        <Title>API Usage Trends</Title>
        <Text>API calls and success rate over time</Text>
        <AreaChart
          className="mt-6 h-72"
          data={apiUsageData}
          index="date"
          categories={['API Calls', 'Success Rate', 'Error Rate']}
          colors={['blue', 'green', 'red']}
          valueFormatter={(number: number) =>
            number > 100
              ? Intl.NumberFormat('us').format(number).toString()
              : `${number}%`
          }
          yAxisWidth={48}
        />
      </Card>

      {/* API Keys */}
      <Card>
        <div className="flex items-center justify-between">
          <Title>API Keys</Title>
          <Button
            icon={KeyIcon}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Generate New Key
          </Button>
        </div>
        <div className="mt-6">
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Key
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Environment
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Expires
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                {apiKeys.map((key) => (
                  <tr key={key.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex flex-col">
                        <div className="font-medium text-gray-900 dark:text-gray-100">{key.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Last used: {new Date(key.lastUsed).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-mono text-sm text-gray-500 dark:text-gray-400">
                      {key.key}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <Badge
                        className={
                          key.status === 'Active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : key.status === 'Expired'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }
                      >
                        {key.status}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {key.environment}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(key.expiresAt).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                      <button
                        type="button"
                        onClick={() => handleCopyKey(key.id, key.key)}
                        className="inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-2 py-1 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 mr-2"
                      >
                        {copiedKey === key.id ? (
                          <DocumentDuplicateIcon className="h-4 w-4" />
                        ) : (
                          <ClipboardDocumentIcon className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRegenerateKey(key.id)}
                        className="inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-2 py-1 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 mr-2"
                      >
                        <ArrowPathIcon className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRevokeKey(key.id)}
                        className="inline-flex items-center rounded-md bg-red-50 dark:bg-red-900/20 px-2 py-1 text-sm font-semibold text-red-700 dark:text-red-400 shadow-sm ring-1 ring-inset ring-red-600/20 dark:ring-red-600/40 hover:bg-red-100 dark:hover:bg-red-900/40"
                      >
                        <ExclamationTriangleIcon className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* API Documentation */}
      <Card>
        <Title>API Documentation</Title>
        <div className="mt-6">
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    API Endpoint
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Version
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Documentation
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                {endpoints.map((endpoint) => (
                  <tr key={endpoint.name} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                      {endpoint.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {endpoint.version}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <Badge
                        className={
                          endpoint.status === 'Stable'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : endpoint.status === 'Beta'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }
                      >
                        {endpoint.status}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                      <a
                        href={endpoint.docs}
                        className="text-primary hover:text-primary/90 font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Docs
                      </a>
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