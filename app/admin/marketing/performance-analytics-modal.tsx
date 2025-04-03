'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {
  Card,
  Title,
  Text,
  AreaChart,
  BarChart,
  DonutChart,
  TabGroup,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from '@tremor/react'

// Mock data
const campaignPerformance = [
  {
    date: '2024-01',
    'Email Campaigns': 82,
    'Social Media': 68,
    'Direct Marketing': 45,
  },
  {
    date: '2024-02',
    'Email Campaigns': 87,
    'Social Media': 73,
    'Direct Marketing': 48,
  },
  {
    date: '2024-03',
    'Email Campaigns': 92,
    'Social Media': 78,
    'Direct Marketing': 52,
  },
  {
    date: '2024-04',
    'Email Campaigns': 89,
    'Social Media': 82,
    'Direct Marketing': 55,
  },
  {
    date: '2024-05',
    'Email Campaigns': 95,
    'Social Media': 85,
    'Direct Marketing': 58,
  },
]

const conversionData = [
  {
    channel: 'Email',
    conversions: 1234,
    rate: '3.2%',
  },
  {
    channel: 'Social Media',
    conversions: 892,
    rate: '2.8%',
  },
  {
    channel: 'Direct',
    conversions: 567,
    rate: '2.1%',
  },
  {
    channel: 'Search',
    conversions: 789,
    rate: '2.5%',
  },
]

const revenueByChannel = [
  { name: 'Email Marketing', value: 125000 },
  { name: 'Social Media', value: 89000 },
  { name: 'Direct Marketing', value: 67000 },
  { name: 'Search', value: 45000 },
]

interface PerformanceAnalyticsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PerformanceAnalyticsModal({ isOpen, onClose }: PerformanceAnalyticsModalProps) {
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
                      Marketing Performance Analytics
                    </Dialog.Title>
                  </div>

                  <TabGroup>
                    <TabList className="mt-6">
                      <Tab className="ui-selected:bg-primary ui-selected:text-white">Overview</Tab>
                      <Tab className="ui-selected:bg-primary ui-selected:text-white">Conversions</Tab>
                      <Tab className="ui-selected:bg-primary ui-selected:text-white">Revenue</Tab>
                    </TabList>

                    <TabPanels>
                      <TabPanel>
                        <div className="mt-6 space-y-6">
                          <Card>
                            <Title>Campaign Performance Trends</Title>
                            <Text>Performance metrics across different marketing channels</Text>
                            <AreaChart
                              className="mt-4 h-72"
                              data={campaignPerformance}
                              index="date"
                              categories={['Email Campaigns', 'Social Media', 'Direct Marketing']}
                              colors={['blue', 'purple', 'orange']}
                              valueFormatter={(number: number) => `${number}%`}
                              yAxisWidth={40}
                            />
                          </Card>

                          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <Card>
                              <Title>Channel Distribution</Title>
                              <DonutChart
                                className="mt-4 h-40"
                                data={revenueByChannel}
                                category="value"
                                index="name"
                                valueFormatter={(number: number) =>
                                  `$${Intl.NumberFormat('us').format(number).toString()}`
                                }
                                colors={['blue', 'purple', 'orange', 'green']}
                              />
                            </Card>

                            <Card>
                              <Title>Conversion Metrics</Title>
                              <div className="mt-4">
                                {conversionData.map((item) => (
                                  <div
                                    key={item.channel}
                                    className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 py-2 last:border-0"
                                  >
                                    <Text>{item.channel}</Text>
                                    <div className="flex items-center space-x-4">
                                      <Text>{item.conversions.toLocaleString()} conv.</Text>
                                      <Text>{item.rate}</Text>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </Card>
                          </div>
                        </div>
                      </TabPanel>

                      <TabPanel>
                        <div className="mt-6 space-y-6">
                          <Card>
                            <Title>Conversion Rates by Channel</Title>
                            <BarChart
                              className="mt-4 h-80"
                              data={conversionData}
                              index="channel"
                              categories={['conversions']}
                              colors={['emerald']}
                              valueFormatter={(number: number) =>
                                Intl.NumberFormat('us').format(number).toString()
                              }
                              yAxisWidth={48}
                            />
                          </Card>
                        </div>
                      </TabPanel>

                      <TabPanel>
                        <div className="mt-6 space-y-6">
                          <Card>
                            <Title>Revenue by Marketing Channel</Title>
                            <BarChart
                              className="mt-4 h-80"
                              data={revenueByChannel}
                              index="name"
                              categories={['value']}
                              colors={['blue']}
                              valueFormatter={(number: number) =>
                                `$${Intl.NumberFormat('us').format(number).toString()}`
                              }
                              yAxisWidth={64}
                            />
                          </Card>
                        </div>
                      </TabPanel>
                    </TabPanels>
                  </TabGroup>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
} 