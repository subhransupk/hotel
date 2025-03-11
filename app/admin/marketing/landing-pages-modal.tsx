'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  XMarkIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'
import { Card, Text, Metric, BarChart } from '@tremor/react'

// Mock data
const landingPages = [
  {
    id: 1,
    name: 'Summer Getaway Package',
    url: '/summer-getaway',
    status: 'Published',
    visitors: 12453,
    conversions: 234,
    conversionRate: '1.88%',
    lastUpdated: '2024-02-15',
  },
  {
    id: 2,
    name: 'Business Conference Rooms',
    url: '/conference-rooms',
    status: 'Published',
    visitors: 8765,
    conversions: 189,
    conversionRate: '2.16%',
    lastUpdated: '2024-02-14',
  },
  {
    id: 3,
    name: 'Wedding Venue Special',
    url: '/wedding-venue',
    status: 'Draft',
    visitors: 0,
    conversions: 0,
    conversionRate: '0%',
    lastUpdated: '2024-02-13',
  },
  {
    id: 4,
    name: 'Family Holiday Package',
    url: '/family-holiday',
    status: 'Published',
    visitors: 15678,
    conversions: 345,
    conversionRate: '2.20%',
    lastUpdated: '2024-02-12',
  },
]

const pagePerformance = [
  {
    name: 'Summer Getaway Package',
    visitors: 12453,
    conversions: 234,
  },
  {
    name: 'Business Conference Rooms',
    visitors: 8765,
    conversions: 189,
  },
  {
    name: 'Family Holiday Package',
    visitors: 15678,
    conversions: 345,
  },
]

interface LandingPagesModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LandingPagesModal({ isOpen, onClose }: LandingPagesModalProps) {
  const [selectedPage, setSelectedPage] = useState<number | null>(null)

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this landing page?')) {
      // Handle delete
      console.log('Delete page:', id)
    }
  }

  const handlePreview = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100">
                      Landing Pages
                    </Dialog.Title>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      New Page
                    </button>
                  </div>

                  <div className="mt-6 space-y-6">
                    {/* Performance Overview */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                      <Card>
                        <Text>Total Visitors</Text>
                        <Metric>{pagePerformance.reduce((sum, page) => sum + page.visitors, 0).toLocaleString()}</Metric>
                      </Card>
                      <Card>
                        <Text>Total Conversions</Text>
                        <Metric>{pagePerformance.reduce((sum, page) => sum + page.conversions, 0).toLocaleString()}</Metric>
                      </Card>
                      <Card>
                        <Text>Average Conversion Rate</Text>
                        <Metric>
                          {(
                            (pagePerformance.reduce((sum, page) => sum + page.conversions, 0) /
                              pagePerformance.reduce((sum, page) => sum + page.visitors, 0)) *
                            100
                          ).toFixed(2)}
                          %
                        </Metric>
                      </Card>
                    </div>

                    {/* Performance Chart */}
                    <Card>
                      <Text>Page Performance</Text>
                      <BarChart
                        className="mt-4 h-80"
                        data={pagePerformance}
                        index="name"
                        categories={['visitors', 'conversions']}
                        colors={['blue', 'green']}
                        valueFormatter={(number: number) => number.toLocaleString()}
                        yAxisWidth={48}
                      />
                    </Card>

                    {/* Landing Pages Table */}
                    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                              Page Name
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                              Visitors
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                              Conversion Rate
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                              Last Updated
                            </th>
                            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                          {landingPages.map((page) => (
                            <tr key={page.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                {page.name}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm">
                                <span
                                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                    page.status === 'Published'
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                  }`}
                                >
                                  {page.status}
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                {page.visitors.toLocaleString()}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                {page.conversionRate}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                {new Date(page.lastUpdated).toLocaleDateString()}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                <button
                                  type="button"
                                  onClick={() => handlePreview(page.url)}
                                  className="inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-2 py-1 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 mr-2"
                                >
                                  <EyeIcon className="h-4 w-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setSelectedPage(page.id)}
                                  className="inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-2 py-1 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 mr-2"
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDelete(page.id)}
                                  className="inline-flex items-center rounded-md bg-red-50 dark:bg-red-900/20 px-2 py-1 text-sm font-semibold text-red-700 dark:text-red-400 shadow-sm ring-1 ring-inset ring-red-600/20 dark:ring-red-600/40 hover:bg-red-100 dark:hover:bg-red-900/40"
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
} 