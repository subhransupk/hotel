'use client'

import { useState } from 'react'
import { Card, Text, Badge, Button } from '@tremor/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import type { ElementType } from 'react'

interface ServiceMetric {
  label: string
  value: string
}

interface ServiceCardProps {
  title: string
  description: string
  icon: ElementType
  category: string
  status: 'available' | 'busy' | 'scheduled' | 'maintenance'
  metrics: ServiceMetric[]
}

const statusStyles = {
  available: {
    color: 'green',
    label: 'Available',
  },
  busy: {
    color: 'red',
    label: 'Busy',
  },
  scheduled: {
    color: 'yellow',
    label: 'Scheduled',
  },
  maintenance: {
    color: 'gray',
    label: 'Maintenance',
  },
} as const

export function ServiceCard({
  title,
  description,
  icon: Icon,
  category,
  status,
  metrics,
}: ServiceCardProps) {
  const [isBooking, setIsBooking] = useState(false)
  const statusStyle = statusStyles[status]

  const handleBookNow = () => {
    if (status !== 'available') {
      alert('This service is currently not available for booking.')
      return
    }
    setIsBooking(true)
    // Here you would typically integrate with your booking system
    // For now, we'll just simulate a booking process
    setTimeout(() => {
      alert(`Booking confirmed for ${title}!`)
      setIsBooking(false)
    }, 1000)
  }

  return (
    <Card className="relative group">
      {/* Service Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <Text className="font-medium">{title}</Text>
            <Text className="text-sm text-gray-500">{description}</Text>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge color={statusStyle.color}>{statusStyle.label}</Badge>
          <Button
            variant="light"
            icon={EllipsisHorizontalIcon}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>
      </div>

      {/* Service Metrics */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="text-center">
            <Text className="text-sm text-gray-500">{metric.label}</Text>
            <Text className="font-medium">{metric.value}</Text>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-4 border-t flex justify-between">
        <Button 
          variant="light" 
          size="xs"
          onClick={() => alert(`Viewing details for ${title}`)}
        >
          View Details
        </Button>
        <Button 
          size="xs"
          disabled={status !== 'available' || isBooking}
          loading={isBooking}
          onClick={handleBookNow}
        >
          {isBooking ? 'Booking...' : 'Book Now'}
        </Button>
      </div>
    </Card>
  )
} 