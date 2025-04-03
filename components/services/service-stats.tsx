'use client'

import { Card, Grid, Metric, Text, ProgressBar, Color } from '@tremor/react'
import {
  CheckCircleIcon,
  ClockIcon,
  StarIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline'

interface StatItem {
  title: string
  metric: string
  icon: typeof CheckCircleIcon
  color: Color
  progress: number
  target: string
}

const stats: StatItem[] = [
  {
    title: 'Service Completion Rate',
    metric: '94%',
    icon: CheckCircleIcon,
    color: 'emerald',
    progress: 94,
    target: '95%',
  },
  {
    title: 'Average Response Time',
    metric: '15 mins',
    icon: ClockIcon,
    color: 'blue',
    progress: 85,
    target: '10 mins',
  },
  {
    title: 'Customer Satisfaction',
    metric: '4.8/5',
    icon: StarIcon,
    color: 'amber',
    progress: 96,
    target: '4.9/5',
  },
  {
    title: 'Revenue (MTD)',
    metric: '$45.8K',
    icon: CurrencyDollarIcon,
    color: 'indigo',
    progress: 92,
    target: '$50K',
  },
]

export function ServiceStats() {
  return (
    <Grid numItemsLg={4} className="gap-6">
      {stats.map((item) => (
        <Card key={item.title} decoration="top" decorationColor={item.color}>
          <div className="flex items-center space-x-3">
            <div className={`p-2 bg-${item.color}-50 rounded-lg`}>
              <item.icon className={`h-6 w-6 text-${item.color}-600`} />
            </div>
            <div>
              <Text>{item.title}</Text>
              <Metric>{item.metric}</Metric>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>Target: {item.target}</span>
            </div>
            <ProgressBar value={item.progress} color={item.color} className="mt-2" />
          </div>
        </Card>
      ))}
    </Grid>
  )
} 