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
  DonutChart,
  Legend,
  Metric,
  Color,
  List,
  ListItem,
  Switch,
} from '@tremor/react'
import {
  ShieldCheckIcon,
  KeyIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  DocumentCheckIcon,
  ClockIcon,
  LockClosedIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  FingerPrintIcon,
  DocumentTextIcon,
  BellAlertIcon,
  ArrowTrendingUpIcon,
  CheckBadgeIcon,
  XCircleIcon,
  EyeIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'

// Types
type SecurityMetric = {
  title: string
  metric: string
  icon: any
  color: Color
  trend?: string
  status?: 'success' | 'warning' | 'error'
}

type SecurityEvent = {
  id: number
  type: 'success' | 'warning' | 'error'
  message: string
  location: string
  timestamp: string
  ip: string
}

type ComplianceItem = {
  id: number
  name: string
  status: 'compliant' | 'non-compliant' | 'pending'
  lastCheck: string
  score: number
}

// Mock data
const securityMetrics: SecurityMetric[] = [
  {
    title: 'Security Score',
    metric: '94/100',
    icon: ShieldCheckIcon,
    color: 'emerald',
    trend: '+2 pts',
    status: 'success',
  },
  {
    title: 'Active Sessions',
    metric: '1,234',
    icon: GlobeAltIcon,
    color: 'blue',
  },
  {
    title: 'Failed Attempts',
    metric: '23',
    icon: ExclamationTriangleIcon,
    color: 'red',
    trend: '+5',
    status: 'warning',
  },
  {
    title: '2FA Adoption',
    metric: '89%',
    icon: DevicePhoneMobileIcon,
    color: 'violet',
    trend: '+12%',
    status: 'success',
  },
]

const securityEvents: SecurityEvent[] = [
  {
    id: 1,
    type: 'error',
    message: 'Multiple failed login attempts detected',
    location: 'Miami, US',
    timestamp: '2 minutes ago',
    ip: '192.168.1.1',
  },
  {
    id: 2,
    type: 'warning',
    message: 'New device login detected',
    location: 'London, UK',
    timestamp: '15 minutes ago',
    ip: '192.168.1.2',
  },
  {
    id: 3,
    type: 'success',
    message: 'Security policy updated successfully',
    location: 'Internal System',
    timestamp: '1 hour ago',
    ip: 'system',
  },
  {
    id: 4,
    type: 'warning',
    message: 'Unusual login time detected',
    location: 'Tokyo, JP',
    timestamp: '2 hours ago',
    ip: '192.168.1.3',
  },
]

const threatData = [
  { date: '2024-01', threats: 45 },
  { date: '2024-02', threats: 42 },
  { date: '2024-03', threats: 38 },
  { date: '2024-04', threats: 35 },
  { date: '2024-05', threats: 32 },
  { date: '2024-06', threats: 38 },
  { date: '2024-07', threats: 42 },
  { date: '2024-08', threats: 48 },
  { date: '2024-09', threats: 52 },
  { date: '2024-10', threats: 65 },
  { date: '2024-11', threats: 72 },
  { date: '2024-12', threats: 68 },
]

const complianceItems: ComplianceItem[] = [
  {
    id: 1,
    name: 'GDPR Compliance',
    status: 'compliant',
    lastCheck: '1 day ago',
    score: 98,
  },
  {
    id: 2,
    name: 'PCI DSS',
    status: 'compliant',
    lastCheck: '2 days ago',
    score: 96,
  },
  {
    id: 3,
    name: 'ISO 27001',
    status: 'pending',
    lastCheck: '5 days ago',
    score: 85,
  },
  {
    id: 4,
    name: 'HIPAA',
    status: 'non-compliant',
    lastCheck: '1 day ago',
    score: 72,
  },
]

const accessDistribution = [
  { name: 'Admin', value: 5 },
  { name: 'Manager', value: 15 },
  { name: 'Staff', value: 45 },
  { name: 'Guest', value: 35 },
]

const statusColors = {
  success: 'emerald',
  warning: 'amber',
  error: 'red',
  compliant: 'emerald',
  'non-compliant': 'red',
  pending: 'amber',
} as const

export default function SecurityPage() {
  const [selectedView, setSelectedView] = useState('overview')
  const [mfaEnabled, setMfaEnabled] = useState(true)
  const [autoLockEnabled, setAutoLockEnabled] = useState(true)
  const [passwordPolicyEnabled, setPasswordPolicyEnabled] = useState(true)
  const [activityLogsEnabled, setActivityLogsEnabled] = useState(true)

  return (
    <div className="space-y-6">
      <div>
        <Title>Security Management</Title>
        <Text>Monitor and manage platform security, compliance, and access control</Text>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityMetrics.map((metric) => (
          <Card key={metric.title} className="relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className={`p-2 bg-${metric.color}-50 dark:bg-${metric.color}-900/20 rounded-lg`}>
                <metric.icon className={`w-6 h-6 text-${metric.color}-500`} />
              </div>
              <div>
                <Text>{metric.title}</Text>
                <div className="flex items-baseline gap-2">
                  <Metric>{metric.metric}</Metric>
                  {metric.trend && (
                    <span className={`text-sm text-${metric.color}-500`}>{metric.trend}</span>
                  )}
                </div>
              </div>
            </div>
            {metric.status && (
              <Badge
                className="absolute top-4 right-4"
                color={statusColors[metric.status]}
                size="xs"
              >
                {metric.status}
              </Badge>
            )}
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Card>
        <TabGroup
          index={
            selectedView === 'overview'
              ? 0
              : selectedView === 'access'
              ? 1
              : selectedView === 'compliance'
              ? 2
              : 3
          }
          onIndexChange={(index) =>
            setSelectedView(
              index === 0
                ? 'overview'
                : index === 1
                ? 'access'
                : index === 2
                ? 'compliance'
                : 'settings'
            )
          }
        >
          <TabList variant="solid">
            <Tab icon={ChartBarIcon}>Overview</Tab>
            <Tab icon={KeyIcon}>Access Control</Tab>
            <Tab icon={DocumentCheckIcon}>Compliance</Tab>
            <Tab icon={LockClosedIcon}>Settings</Tab>
          </TabList>

          <TabPanels>
            {/* Overview Panel */}
            <TabPanel>
              <div className="mt-6 space-y-6">
                {/* Threat Detection Chart */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Title>Threat Detection</Title>
                      <Text>Number of security threats detected over time</Text>
                    </div>
                    <Badge size="xl" color="emerald">
                      Protected
                    </Badge>
                  </div>
                  <Card>
                    <AreaChart
                      className="h-72"
                      data={threatData}
                      index="date"
                      categories={['threats']}
                      colors={['red']}
                      valueFormatter={(number) => number.toString()}
                    />
                  </Card>
                </div>

                {/* Recent Security Events */}
                <div>
                  <Title className="mb-4">Recent Security Events</Title>
                  <div className="space-y-4">
                    {securityEvents.map((event) => (
                      <Card key={event.id}>
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-2 rounded-lg bg-${
                              statusColors[event.type]
                            }-50 dark:bg-${statusColors[event.type]}-900/20`}
                          >
                            {event.type === 'error' ? (
                              <XCircleIcon
                                className={`w-5 h-5 text-${statusColors[event.type]}-500`}
                              />
                            ) : event.type === 'warning' ? (
                              <ExclamationTriangleIcon
                                className={`w-5 h-5 text-${statusColors[event.type]}-500`}
                              />
                            ) : (
                              <CheckBadgeIcon
                                className={`w-5 h-5 text-${statusColors[event.type]}-500`}
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <Text className="font-medium">{event.message}</Text>
                              <Badge color={statusColors[event.type]}>{event.type}</Badge>
                            </div>
                            <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <GlobeAltIcon className="w-4 h-4" />
                                {event.location}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <ClockIcon className="w-4 h-4" />
                                {event.timestamp}
                              </span>
                              <span>•</span>
                              <span>IP: {event.ip}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabPanel>

            {/* Access Control Panel */}
            <TabPanel>
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Access Distribution */}
                  <Card>
                    <Title>Access Distribution</Title>
                    <Text>Distribution of user access levels</Text>
                    <div className="mt-4">
                      <DonutChart
                        className="h-60"
                        data={accessDistribution}
                        category="value"
                        index="name"
                        valueFormatter={(value) => `${value}%`}
                        colors={['blue', 'violet', 'indigo', 'cyan']}
                      />
                      <Legend
                        className="mt-4"
                        categories={accessDistribution.map((item) => item.name)}
                        colors={['blue', 'violet', 'indigo', 'cyan']}
                      />
                    </div>
                  </Card>

                  {/* Active Sessions */}
                  <Card>
                    <Title>Active Sessions</Title>
                    <Text>Currently active user sessions</Text>
                    <List className="mt-4">
                      <ListItem>
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <UserGroupIcon className="w-5 h-5 text-blue-500" />
                          </div>
                          <div>
                            <Text className="font-medium">Admin Dashboard</Text>
                            <Text className="text-sm text-gray-500">
                              Last active: 2 minutes ago
                            </Text>
                          </div>
                        </div>
                        <Badge color="emerald">Active</Badge>
                      </ListItem>
                      <ListItem>
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
                            <UserGroupIcon className="w-5 h-5 text-violet-500" />
                          </div>
                          <div>
                            <Text className="font-medium">Mobile App</Text>
                            <Text className="text-sm text-gray-500">
                              Last active: 5 minutes ago
                            </Text>
                          </div>
                        </div>
                        <Badge color="emerald">Active</Badge>
                      </ListItem>
                      <ListItem>
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                            <UserGroupIcon className="w-5 h-5 text-indigo-500" />
                          </div>
                          <div>
                            <Text className="font-medium">Web Portal</Text>
                            <Text className="text-sm text-gray-500">
                              Last active: 15 minutes ago
                            </Text>
                          </div>
                        </div>
                        <Badge color="emerald">Active</Badge>
                      </ListItem>
                    </List>
                  </Card>
                </div>
              </div>
            </TabPanel>

            {/* Compliance Panel */}
            <TabPanel>
              <div className="mt-6">
                <div className="space-y-4">
                  {complianceItems.map((item) => (
                    <Card key={item.id}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-2 rounded-lg bg-${
                              statusColors[item.status]
                            }-50 dark:bg-${statusColors[item.status]}-900/20`}
                          >
                            <DocumentTextIcon
                              className={`w-5 h-5 text-${statusColors[item.status]}-500`}
                            />
                          </div>
                          <div>
                            <Text className="font-medium">{item.name}</Text>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge color={statusColors[item.status]}>{item.status}</Badge>
                              <Text className="text-sm text-gray-500">
                                Last check: {item.lastCheck}
                              </Text>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Text className="font-medium">{item.score}%</Text>
                          <Text className="text-sm text-gray-500">Compliance Score</Text>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabPanel>

            {/* Settings Panel */}
            <TabPanel>
              <div className="mt-6 space-y-6">
                <Card>
                  <Title>Security Settings</Title>
                  <Text>Configure platform security settings and policies</Text>
                  <div className="mt-6 space-y-6">
                    {/* Two-Factor Authentication */}
                    <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <FingerPrintIcon className="w-5 h-5 text-gray-500" />
                          <Text className="font-medium">Two-Factor Authentication</Text>
                        </div>
                        <Text className="text-sm text-gray-500">
                          Require 2FA for all admin and staff accounts
                        </Text>
                      </div>
                      <Switch checked={mfaEnabled} onChange={setMfaEnabled} />
                    </div>

                    {/* Auto Lock */}
                    <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <LockClosedIcon className="w-5 h-5 text-gray-500" />
                          <Text className="font-medium">Auto Lock</Text>
                        </div>
                        <Text className="text-sm text-gray-500">
                          Automatically lock accounts after 3 failed login attempts
                        </Text>
                      </div>
                      <Switch checked={autoLockEnabled} onChange={setAutoLockEnabled} />
                    </div>

                    {/* Password Policy */}
                    <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <KeyIcon className="w-5 h-5 text-gray-500" />
                          <Text className="font-medium">Strong Password Policy</Text>
                        </div>
                        <Text className="text-sm text-gray-500">
                          Enforce strong password requirements for all accounts
                        </Text>
                      </div>
                      <Switch checked={passwordPolicyEnabled} onChange={setPasswordPolicyEnabled} />
                    </div>

                    {/* Activity Logs */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <EyeIcon className="w-5 h-5 text-gray-500" />
                          <Text className="font-medium">Activity Monitoring</Text>
                        </div>
                        <Text className="text-sm text-gray-500">
                          Monitor and log all security-related activities
                        </Text>
                      </div>
                      <Switch checked={activityLogsEnabled} onChange={setActivityLogsEnabled} />
                    </div>
                  </div>
                </Card>

                {/* Notification Settings */}
                <Card>
                  <Title>Notification Settings</Title>
                  <Text>Configure security alert notifications</Text>
                  <List className="mt-4">
                    <ListItem>
                      <div className="flex items-center gap-2">
                        <BellAlertIcon className="w-5 h-5 text-gray-500" />
                        <Text>Failed Login Attempts</Text>
                      </div>
                      <Switch defaultChecked={true} />
                    </ListItem>
                    <ListItem>
                      <div className="flex items-center gap-2">
                        <BellAlertIcon className="w-5 h-5 text-gray-500" />
                        <Text>New Device Login</Text>
                      </div>
                      <Switch defaultChecked={true} />
                    </ListItem>
                    <ListItem>
                      <div className="flex items-center gap-2">
                        <BellAlertIcon className="w-5 h-5 text-gray-500" />
                        <Text>Password Changes</Text>
                      </div>
                      <Switch defaultChecked={true} />
                    </ListItem>
                    <ListItem>
                      <div className="flex items-center gap-2">
                        <BellAlertIcon className="w-5 h-5 text-gray-500" />
                        <Text>Security Policy Updates</Text>
                      </div>
                      <Switch defaultChecked={true} />
                    </ListItem>
                  </List>
                </Card>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    </div>
  )
} 