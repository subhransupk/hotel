'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Card,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  Metric,
  BarChart,
  DonutChart,
  Grid,
  Col,
  Badge,
  Button,
  List,
  ListItem,
} from '@tremor/react'
import {
  UsersIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CogIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  LinkIcon,
  TicketIcon,
  StarIcon,
} from '@heroicons/react/24/outline'

// Mock data for partner program overview
const partnerMetrics = [
  {
    title: 'Total Partners',
    metric: '156',
    icon: UsersIcon,
  },
  {
    title: 'Active Partners',
    metric: '142',
    icon: UserGroupIcon,
  },
  {
    title: 'Partner Revenue',
    metric: '$1.2M',
    icon: CurrencyDollarIcon,
  },
  {
    title: 'Avg. Commission',
    metric: '$7,850',
    icon: ChartBarIcon,
  },
]

const partnerTiers = [
  { name: 'Gold', value: 28 },
  { name: 'Silver', value: 47 },
  { name: 'Bronze', value: 81 },
]

const partnerPerformance = [
  {
    month: 'Jan',
    'New Partners': 12,
    'Partner Revenue': 45000,
  },
  {
    month: 'Feb',
    'New Partners': 18,
    'Partner Revenue': 52000,
  },
  {
    month: 'Mar',
    'New Partners': 15,
    'Partner Revenue': 61000,
  },
  {
    month: 'Apr',
    'New Partners': 21,
    'Partner Revenue': 78000,
  },
  {
    month: 'May',
    'New Partners': 19,
    'Partner Revenue': 85000,
  },
  {
    month: 'Jun',
    'New Partners': 24,
    'Partner Revenue': 92000,
  },
]

const partnerManagementSections = [
  {
    title: 'Partner Onboarding',
    description: 'Review and approve partner applications',
    icon: UserGroupIcon,
    href: '/admin/partners/onboarding',
    color: 'blue',
  },
  {
    title: 'Tier Management',
    description: 'Configure partner tiers and benefits',
    icon: StarIcon,
    href: '/admin/partners/tiers',
    color: 'amber',
  },
  {
    title: 'Commission Management',
    description: 'Set rates and approve payouts',
    icon: CurrencyDollarIcon,
    href: '/admin/partners/commissions',
    color: 'emerald',
  },
  {
    title: 'Performance Tracking',
    description: 'Monitor partner metrics and KPIs',
    icon: ChartBarIcon,
    href: '/admin/partners/performance',
    color: 'indigo',
  },
  {
    title: 'Marketing Resources',
    description: 'Manage materials for partners',
    icon: RocketLaunchIcon,
    href: '/admin/partners/marketing',
    color: 'purple',
  },
  {
    title: 'Partner Support',
    description: 'Handle partner inquiries and resources',
    icon: TicketIcon,
    href: '/admin/partners/support',
    color: 'rose',
  },
  {
    title: 'Communication',
    description: 'Send announcements and newsletters',
    icon: ChatBubbleLeftRightIcon,
    href: '/admin/partners/communication',
    color: 'cyan',
  },
  {
    title: 'Compliance',
    description: 'Monitor adherence to guidelines',
    icon: ShieldCheckIcon,
    href: '/admin/partners/compliance',
    color: 'red',
  },
  {
    title: 'API & Integrations',
    description: 'Manage partner access to APIs',
    icon: LinkIcon,
    href: '/admin/partners/api',
    color: 'gray',
  },
]

// Recent partner activities
const recentActivities = [
  { name: 'New partner application', time: '10 minutes ago' },
  { name: 'Partner tier upgrade: Silver to Gold', time: '1 hour ago' },
  { name: 'Commission payout processed', time: '3 hours ago' },
  { name: 'New marketing materials uploaded', time: '5 hours ago' },
  { name: 'Partner support ticket resolved', time: 'Yesterday' },
]

// Add this near the top of the component, after the useState declarations
const actionButtons = (
  <div className="flex space-x-2">
    <Link href="/admin/partners/create">
      <Button size="xs" variant="primary" icon={UserGroupIcon}>
        Add Partner
      </Button>
    </Link>
    <Link href="/admin/partners/list">
      <Button size="xs" variant="secondary" icon={UsersIcon}>
        View All Partners
      </Button>
    </Link>
  </div>
);

export default function PartnerManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <Title>Partner Management</Title>
        <Text>Manage your partner program, tiers, commissions, and resources.</Text>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {partnerMetrics.map((item) => (
          <Card key={item.title} className="space-y-2">
            <div className="flex items-center space-x-2 text-gray-600">
              <item.icon className="h-6 w-6" />
              <Text>{item.title}</Text>
            </div>
            <Metric>{item.metric}</Metric>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <Title>Partner Performance</Title>
          <BarChart
            className="mt-4 h-80"
            data={partnerPerformance}
            index="month"
            categories={['New Partners', 'Partner Revenue']}
            colors={['blue', 'emerald']}
            valueFormatter={(value) => {
              return typeof value === 'number' 
                ? value >= 1000 
                  ? `$${value.toLocaleString()}` 
                  : `${value}`
                : '';
            }}
            yAxisWidth={60}
          />
        </Card>

        <Card>
          <Title>Partner Tier Distribution</Title>
          <DonutChart
            className="mt-4 h-80"
            data={partnerTiers}
            category="value"
            index="name"
            colors={['amber', 'gray', 'bronze']}
            valueFormatter={(value) => `${value} partners`}
          />
        </Card>
      </div>

      {/* Partner Management Sections */}
      <Card>
        <Title>Partner Management Tools</Title>
        <Text>Access the different areas of partner program management</Text>
        
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partnerManagementSections.map((section) => (
            <Link 
              key={section.title} 
              href={section.href}
              className="block"
            >
              <Card className="transition-all hover:shadow-md">
                <div className="flex items-center space-x-3">
                  <div className={`rounded-full bg-${section.color}-100 p-2`}>
                    <section.icon className={`h-6 w-6 text-${section.color}-600`} />
                  </div>
                  <div>
                    <Title className="text-base">{section.title}</Title>
                    <Text className="text-sm">{section.description}</Text>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Card>

      {/* Recent Activities */}
      <Card>
        <Title>Recent Activities</Title>
        <List className="mt-4">
          {recentActivities.map((activity, index) => (
            <ListItem key={index}>
              <div>
                <Text>{activity.name}</Text>
                <Text className="text-xs text-gray-500">{activity.time}</Text>
              </div>
            </ListItem>
          ))}
        </List>
      </Card>

      {/* Partner Program Card */}
      <Card>
        <div className="flex justify-between items-center">
          <Title>Partner Program</Title>
          {actionButtons}
        </div>
        <Text className="mt-2">Overview of your partner program performance</Text>
        // ... existing code ...
      </Card>
    </div>
  )
} 