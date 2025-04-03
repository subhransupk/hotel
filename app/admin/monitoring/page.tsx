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
  Color,
} from '@tremor/react'
import {
  ServerIcon,
  CpuChipIcon,
  CircleStackIcon,
  SignalIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  BoltIcon,
  CloudIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  CommandLineIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'

// Add type for log type
type LogType = 'error' | 'warning' | 'info' | 'success'
type ServerStatus = 'operational' | 'degraded' | 'down'

// Mock data for system metrics
const systemMetrics = [
  {
    title: 'System Uptime',
    metric: '99.99%',
    icon: ServerIcon,
    color: 'emerald' as Color,
    trend: '+0.1%',
  },
  {
    title: 'Avg Response Time',
    metric: '145ms',
    icon: BoltIcon,
    color: 'blue' as Color,
    trend: '-12ms',
  },
  {
    title: 'Error Rate',
    metric: '0.02%',
    icon: ExclamationTriangleIcon,
    color: 'amber' as Color,
    trend: '-0.01%',
  },
  {
    title: 'Active Users',
    metric: '12,453',
    icon: SignalIcon,
    color: 'violet' as Color,
    trend: '+2.4%',
  },
]

// Mock data for CPU usage over time
const cpuData = [
  { timestamp: '00:00', usage: 45 },
  { timestamp: '01:00', usage: 42 },
  { timestamp: '02:00', usage: 38 },
  { timestamp: '03:00', usage: 35 },
  { timestamp: '04:00', usage: 32 },
  { timestamp: '05:00', usage: 38 },
  { timestamp: '06:00', usage: 42 },
  { timestamp: '07:00', usage: 48 },
  { timestamp: '08:00', usage: 52 },
  { timestamp: '09:00', usage: 65 },
  { timestamp: '10:00', usage: 72 },
  { timestamp: '11:00', usage: 68 },
]

// Mock data for memory distribution
const memoryData = [
  { name: 'Used', value: 64 },
  { name: 'Cached', value: 24 },
  { name: 'Free', value: 12 },
]

// Mock data for API endpoints performance
const apiData = [
  { endpoint: '/api/auth', latency: 120, requests: 15234 },
  { endpoint: '/api/users', latency: 89, requests: 12453 },
  { endpoint: '/api/bookings', latency: 134, requests: 9876 },
  { endpoint: '/api/hotels', latency: 95, requests: 8765 },
  { endpoint: '/api/analytics', latency: 156, requests: 5432 },
]

// Mock data for recent system logs
const systemLogs: Array<{
  id: number
  type: LogType
  message: string
  service: string
  timestamp: string
}> = [
  {
    id: 1,
    type: 'error',
    message: 'Database connection timeout',
    service: 'db-service',
    timestamp: '2 minutes ago',
  },
  {
    id: 2,
    type: 'warning',
    message: 'High memory usage detected',
    service: 'monitoring',
    timestamp: '5 minutes ago',
  },
  {
    id: 3,
    type: 'info',
    message: 'Automated backup completed',
    service: 'backup-service',
    timestamp: '15 minutes ago',
  },
  {
    id: 4,
    type: 'success',
    message: 'System update installed successfully',
    service: 'update-service',
    timestamp: '1 hour ago',
  },
]

// Mock data for server locations
const serverLocations: Array<{
  region: string
  status: ServerStatus
  latency: number
}> = [
  { region: 'North America', status: 'operational', latency: 45 },
  { region: 'Europe', status: 'operational', latency: 82 },
  { region: 'Asia Pacific', status: 'operational', latency: 128 },
  { region: 'South America', status: 'degraded', latency: 156 },
]

const statusColors = {
  error: 'red',
  warning: 'amber',
  info: 'blue',
  success: 'emerald',
  operational: 'emerald',
  degraded: 'amber',
  down: 'red',
} as const

export default function MonitoringPage() {
  const [selectedView, setSelectedView] = useState('overview')

  return (
    <div className="space-y-6">
      <div>
        <Title>Platform Monitoring</Title>
        <Text>Monitor system performance, health metrics, and server status</Text>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric) => (
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
          index={selectedView === 'overview' ? 0 : selectedView === 'performance' ? 1 : selectedView === 'logs' ? 2 : 3}
          onIndexChange={(index) =>
            setSelectedView(
              index === 0 ? 'overview' : index === 1 ? 'performance' : index === 2 ? 'logs' : 'servers'
            )
          }
        >
          <TabList variant="solid">
            <Tab icon={ChartBarIcon}>Overview</Tab>
            <Tab icon={BoltIcon}>Performance</Tab>
            <Tab icon={CommandLineIcon}>System Logs</Tab>
            <Tab icon={GlobeAltIcon}>Servers</Tab>
          </TabList>

          <TabPanels>
            {/* Overview Panel */}
            <TabPanel>
              <div className="mt-6 space-y-6">
                {/* CPU Usage */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Title>CPU Usage</Title>
                      <Text>Real-time CPU utilization across all servers</Text>
                    </div>
                    <Badge size="xl" color="emerald">
                      Healthy
                    </Badge>
                  </div>
                  <Card>
                    <AreaChart
                      className="h-72"
                      data={cpuData}
                      index="timestamp"
                      categories={['usage']}
                      colors={['blue']}
                      valueFormatter={(number) => `${number}%`}
                    />
                  </Card>
                </div>

                {/* Memory Distribution */}
                <div>
                  <Title className="mb-4">Memory Distribution</Title>
                  <Card>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <DonutChart
                        className="h-60"
                        data={memoryData}
                        category="value"
                        index="name"
                        valueFormatter={(value) => `${value}%`}
                        colors={['rose', 'amber', 'emerald']}
                      />
                      <Legend
                        className="max-w-xs mx-auto"
                        categories={memoryData.map((item) => item.name)}
                        colors={['rose', 'amber', 'emerald']}
                      />
                    </div>
                  </Card>
                </div>
              </div>
            </TabPanel>

            {/* Performance Panel */}
            <TabPanel>
              <div className="mt-6 space-y-6">
                <div>
                  <Title className="mb-4">API Endpoints Performance</Title>
                  <Card>
                    <BarChart
                      className="h-72"
                      data={apiData}
                      index="endpoint"
                      categories={['latency']}
                      colors={['violet']}
                      valueFormatter={(value) => `${value}ms`}
                    />
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <Title>Top Requests</Title>
                    <div className="mt-4 space-y-3">
                      {apiData.map((endpoint) => (
                        <div
                          key={endpoint.endpoint}
                          className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                        >
                          <div className="flex items-center gap-3">
                            <CloudIcon className="w-5 h-5 text-violet-500" />
                            <div>
                              <Text className="font-medium">{endpoint.endpoint}</Text>
                              <Text className="text-sm text-gray-500">
                                {endpoint.requests.toLocaleString()} requests
                              </Text>
                            </div>
                          </div>
                          <Badge color={endpoint.latency < 100 ? 'emerald' : 'amber'}>
                            {endpoint.latency}ms
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card>
                    <Title>System Resources</Title>
                    <div className="mt-4 space-y-4">
                      {/* CPU Load */}
                      <div>
                        <div className="flex justify-between mb-2">
                          <Text>CPU Load</Text>
                          <Text>72%</Text>
                        </div>
                        <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-violet-500 rounded-full" style={{ width: '72%' }} />
                        </div>
                      </div>

                      {/* Memory Usage */}
                      <div>
                        <div className="flex justify-between mb-2">
                          <Text>Memory Usage</Text>
                          <Text>64%</Text>
                        </div>
                        <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-rose-500 rounded-full" style={{ width: '64%' }} />
                        </div>
                      </div>

                      {/* Disk Space */}
                      <div>
                        <div className="flex justify-between mb-2">
                          <Text>Disk Space</Text>
                          <Text>48%</Text>
                        </div>
                        <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: '48%' }} />
                        </div>
                      </div>

                      {/* Network I/O */}
                      <div>
                        <div className="flex justify-between mb-2">
                          <Text>Network I/O</Text>
                          <Text>35%</Text>
                        </div>
                        <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '35%' }} />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabPanel>

            {/* System Logs Panel */}
            <TabPanel>
              <div className="mt-6">
                <Card>
                  <div className="space-y-4">
                    {systemLogs.map((log) => (
                      <div
                        key={log.id}
                        className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                      >
                        <div
                          className={`p-2 rounded-lg bg-${
                            statusColors[log.type as keyof typeof statusColors]
                          }-50 dark:bg-${statusColors[log.type as keyof typeof statusColors]}-900/20`}
                        >
                          {log.type === 'error' ? (
                            <ExclamationTriangleIcon
                              className={`w-5 h-5 text-${statusColors[log.type]}-500`}
                            />
                          ) : log.type === 'warning' ? (
                            <ExclamationTriangleIcon
                              className={`w-5 h-5 text-${statusColors[log.type]}-500`}
                            />
                          ) : log.type === 'info' ? (
                            <CommandLineIcon className={`w-5 h-5 text-${statusColors[log.type]}-500`} />
                          ) : (
                            <ShieldCheckIcon className={`w-5 h-5 text-${statusColors[log.type]}-500`} />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <Text className="font-medium">{log.message}</Text>
                            <Badge color={statusColors[log.type as keyof typeof statusColors]}>
                              {log.type}
                            </Badge>
                          </div>
                          <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
                            <span>{log.service}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <ClockIcon className="w-4 h-4" />
                              {log.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabPanel>

            {/* Servers Panel */}
            <TabPanel>
              <div className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {serverLocations.map((server) => (
                    <Card key={server.region}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-3 rounded-lg bg-${
                              statusColors[server.status as keyof typeof statusColors]
                            }-50 dark:bg-${
                              statusColors[server.status as keyof typeof statusColors]
                            }-900/20`}
                          >
                            <GlobeAltIcon
                              className={`w-6 h-6 text-${
                                statusColors[server.status as keyof typeof statusColors]
                              }-500`}
                            />
                          </div>
                          <div>
                            <Title>{server.region}</Title>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge color={statusColors[server.status as keyof typeof statusColors]}>
                                {server.status}
                              </Badge>
                              <Text className="text-sm text-gray-500">
                                Latency: {server.latency}ms
                              </Text>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {[...Array(3)].map((_, i) => (
                              <div
                                key={i}
                                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-white dark:border-gray-900 flex items-center justify-center"
                              >
                                <ServerIcon className="w-4 h-4 text-gray-500" />
                              </div>
                            ))}
                          </div>
                        </div>
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