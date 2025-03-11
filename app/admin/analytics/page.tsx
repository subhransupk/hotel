'use client'

import { useState } from 'react'
import {
  Card,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  Badge,
  AreaChart,
  BarChart,
  DonutChart,
  Legend,
  Metric,
  Grid,
  Col,
  LineChart,
  Select,
  SelectItem,
  DateRangePicker,
  DateRangePickerValue,
} from '@tremor/react'
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  TableCellsIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline'

// Types
type TimeRange = 'today' | 'yesterday' | '7days' | '30days' | 'quarter' | 'year'
type DeviceType = 'desktop' | 'mobile' | 'tablet'
type Channel = 'direct' | 'organic' | 'referral' | 'social'

// Mock data
const revenueData = [
  { date: '2024-01', revenue: 45000, bookings: 123, occupancy: 78 },
  { date: '2024-02', revenue: 52000, bookings: 145, occupancy: 82 },
  { date: '2024-03', revenue: 48000, bookings: 132, occupancy: 75 },
  { date: '2024-04', revenue: 51000, bookings: 148, occupancy: 80 },
  { date: '2024-05', revenue: 58000, bookings: 156, occupancy: 85 },
  { date: '2024-06', revenue: 63000, bookings: 165, occupancy: 88 },
  { date: '2024-07', revenue: 59000, bookings: 159, occupancy: 83 },
  { date: '2024-08', revenue: 62000, bookings: 168, occupancy: 86 },
]

const deviceData = [
  { device: 'Desktop', sessions: 45892, percentage: 52 },
  { device: 'Mobile', sessions: 38756, percentage: 41 },
  { device: 'Tablet', sessions: 6352, percentage: 7 },
]

const channelData = [
  { name: 'Direct', value: 35 },
  { name: 'Organic Search', value: 25 },
  { name: 'Referral', value: 20 },
  { name: 'Social Media', value: 20 },
]

const locationData = [
  { city: 'New York', bookings: 2345, revenue: 892000 },
  { city: 'Los Angeles', bookings: 1890, revenue: 654000 },
  { city: 'Miami', bookings: 2100, revenue: 743000 },
  { city: 'Chicago', bookings: 1650, revenue: 521000 },
  { city: 'Las Vegas', bookings: 1980, revenue: 698000 },
]

const metrics = [
  {
    title: 'Total Revenue',
    metric: '$438,200',
    trend: '+12.3%',
    icon: CurrencyDollarIcon,
    color: 'emerald' as const,
  },
  {
    title: 'Total Bookings',
    metric: '3,423',
    trend: '+8.1%',
    icon: BuildingOfficeIcon,
    color: 'blue' as const,
  },
  {
    title: 'Active Users',
    metric: '12,789',
    trend: '+15.3%',
    icon: UsersIcon,
    color: 'violet' as const,
  },
  {
    title: 'Avg. Occupancy',
    metric: '82%',
    trend: '+4.2%',
    icon: ChartBarIcon,
    color: 'amber' as const,
  },
]

export default function AnalyticsPage() {
  const [selectedView, setSelectedView] = useState('overview')
  const [timeRange, setTimeRange] = useState<TimeRange>('30days')
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  })

  return (
    <div className="space-y-6">
      <div>
        <Title>Analytics & Reports</Title>
        <Text>Monitor performance metrics and analyze business trends</Text>
      </div>

      {/* Date Range Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select
          value={timeRange}
          onValueChange={(value) => setTimeRange(value as TimeRange)}
          className="w-full sm:w-48"
        >
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="yesterday">Yesterday</SelectItem>
          <SelectItem value="7days">Last 7 Days</SelectItem>
          <SelectItem value="30days">Last 30 Days</SelectItem>
          <SelectItem value="quarter">This Quarter</SelectItem>
          <SelectItem value="year">This Year</SelectItem>
        </Select>
        <DateRangePicker
          value={dateRange}
          onValueChange={setDateRange}
          className="w-full sm:w-auto"
          enableSelect={false}
        />
        <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
          <ArrowDownTrayIcon className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title} className="relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className={`p-2 bg-${metric.color}-50 dark:bg-${metric.color}-900/20 rounded-lg`}>
                <metric.icon className={`w-6 h-6 text-${metric.color}-500`} />
              </div>
              <div>
                <Text>{metric.title}</Text>
                <div className="flex items-baseline gap-2">
                  <Metric>{metric.metric}</Metric>
                  <span className={`text-sm text-${metric.color}-500`}>{metric.trend}</span>
                </div>
              </div>
            </div>
            {/* Decorative background pattern */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10">
              <metric.icon className={`w-full h-full text-${metric.color}-500`} />
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Card>
        <TabGroup
          index={selectedView === 'overview' ? 0 : selectedView === 'traffic' ? 1 : selectedView === 'locations' ? 2 : 3}
          onIndexChange={(index) =>
            setSelectedView(
              index === 0 ? 'overview' : index === 1 ? 'traffic' : index === 2 ? 'locations' : 'reports'
            )
          }
        >
          <TabList variant="solid">
            <Tab icon={ChartBarIcon}>Overview</Tab>
            <Tab icon={GlobeAltIcon}>Traffic</Tab>
            <Tab icon={MapPinIcon}>Locations</Tab>
            <Tab icon={TableCellsIcon}>Reports</Tab>
          </TabList>

          <TabPanels>
            {/* Overview Panel */}
            <TabPanel>
              <div className="mt-6 space-y-6">
                {/* Revenue Chart */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Title>Revenue & Bookings Trend</Title>
                      <Text>Revenue and booking performance over time</Text>
                    </div>
                    <Badge size="xl" color="emerald">
                      +12.3% vs. last period
                    </Badge>
                  </div>
                  <Card>
                    <LineChart
                      className="h-80"
                      data={revenueData}
                      index="date"
                      categories={['revenue', 'bookings']}
                      colors={['emerald', 'blue']}
                      valueFormatter={(number) =>
                        number > 1000
                          ? `$${(number / 1000).toFixed(1)}K`
                          : number.toString()
                      }
                      yAxisWidth={60}
                    />
                  </Card>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Occupancy Rate */}
                  <Card>
                    <Title>Occupancy Rate</Title>
                    <Text>Average occupancy rate over time</Text>
                    <AreaChart
                      className="h-72 mt-4"
                      data={revenueData}
                      index="date"
                      categories={['occupancy']}
                      colors={['violet']}
                      valueFormatter={(number) => `${number}%`}
                    />
                  </Card>

                  {/* Channel Distribution */}
                  <Card>
                    <Title>Booking Channels</Title>
                    <Text>Distribution of bookings by channel</Text>
                    <div className="mt-4">
                      <DonutChart
                        className="h-60"
                        data={channelData}
                        category="value"
                        index="name"
                        valueFormatter={(value) => `${value}%`}
                        colors={['blue', 'cyan', 'indigo', 'violet']}
                      />
                      <Legend
                        className="mt-3"
                        categories={channelData.map((item) => item.name)}
                        colors={['blue', 'cyan', 'indigo', 'violet']}
                      />
                    </div>
                  </Card>
                </div>
              </div>
            </TabPanel>

            {/* Traffic Panel */}
            <TabPanel>
              <div className="mt-6 space-y-6">
                {/* Device Distribution */}
                <Card>
                  <Title>Device Distribution</Title>
                  <Text>User sessions by device type</Text>
                  <Grid numItemsLg={2} className="mt-6 gap-6">
                    {/* Donut Chart */}
                    <div>
                      <DonutChart
                        className="h-60"
                        data={deviceData}
                        category="percentage"
                        index="device"
                        valueFormatter={(value) => `${value}%`}
                        colors={['emerald', 'blue', 'amber']}
                      />
                    </div>
                    {/* Stats */}
                    <div className="space-y-4">
                      {deviceData.map((device) => (
                        <div key={device.device} className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                            {device.device === 'Desktop' ? (
                              <ComputerDesktopIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            ) : device.device === 'Mobile' ? (
                              <DevicePhoneMobileIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            ) : (
                              <DevicePhoneMobileIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <Text>{device.device}</Text>
                            <div className="flex items-center justify-between">
                              <Text className="text-gray-500">{device.sessions.toLocaleString()} sessions</Text>
                              <Badge color="emerald">{device.percentage}%</Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Grid>
                </Card>

                {/* Traffic Sources */}
                <Card>
                  <Title>Traffic Sources</Title>
                  <Text>User acquisition channels</Text>
                  <BarChart
                    className="h-80 mt-6"
                    data={channelData}
                    index="name"
                    categories={['value']}
                    colors={['blue']}
                    valueFormatter={(value) => `${value}%`}
                  />
                </Card>
              </div>
            </TabPanel>

            {/* Locations Panel */}
            <TabPanel>
              <div className="mt-6">
                <Card>
                  <Title>Top Performing Locations</Title>
                  <Text>Bookings and revenue by city</Text>
                  <div className="mt-6">
                    {locationData.map((location, index) => (
                      <div
                        key={location.city}
                        className={`flex items-center gap-4 p-4 ${
                          index !== locationData.length - 1
                            ? 'border-b border-gray-200 dark:border-gray-700'
                            : ''
                        }`}
                      >
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                          <MapPinIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <Text className="font-medium">{location.city}</Text>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                            <span>{location.bookings.toLocaleString()} bookings</span>
                            <span>•</span>
                            <span>${location.revenue.toLocaleString()}</span>
                          </div>
                        </div>
                        <ArrowTrendingUpIcon className="w-5 h-5 text-emerald-500" />
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabPanel>

            {/* Reports Panel */}
            <TabPanel>
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Report Cards */}
                  {[
                    {
                      title: 'Revenue Report',
                      description: 'Detailed revenue analysis and trends',
                      icon: CurrencyDollarIcon,
                      color: 'emerald',
                    },
                    {
                      title: 'Occupancy Report',
                      description: 'Room occupancy and availability stats',
                      icon: BuildingOfficeIcon,
                      color: 'blue',
                    },
                    {
                      title: 'Customer Analytics',
                      description: 'Customer behavior and demographics',
                      icon: UsersIcon,
                      color: 'violet',
                    },
                    {
                      title: 'Performance Metrics',
                      description: 'Key performance indicators and metrics',
                      icon: ChartBarIcon,
                      color: 'amber',
                    },
                  ].map((report) => (
                    <Card key={report.title} className="relative group hover:shadow-lg transition-all duration-200">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-${report.color}-50 dark:bg-${report.color}-900/20`}>
                          <report.icon className={`w-6 h-6 text-${report.color}-500`} />
                        </div>
                        <div>
                          <Title>{report.title}</Title>
                          <Text>{report.description}</Text>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                          <ArrowDownTrayIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    </div>
  )
} 