'use client'

import { z } from 'zod'
import { Card } from '../ui/card'
import { Text } from '../ui/text'
import { Title } from '../ui/title'
import { Button } from '../ui/button'
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  ClockIcon,
  CalendarIcon,
  BanknotesIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'

const staffSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  position: z.enum(['manager', 'receptionist', 'housekeeper', 'maintenance', 'chef', 'waiter']),
  department: z.enum(['management', 'front_desk', 'housekeeping', 'maintenance', 'restaurant', 'security']),
  status: z.enum(['active', 'on_leave', 'terminated']),
  joinDate: z.string(),
  schedule: z.enum(['morning', 'afternoon', 'night', 'flexible']),
  salary: z.number(),
  address: z.string(),
  emergencyContact: z.string(),
  documents: z.array(z.string()),
  notes: z.string().optional(),
})

type Staff = z.infer<typeof staffSchema>

interface StaffDetailsProps {
  staff: Staff
  onEdit?: () => void
}

const statusColors = {
  active: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    ring: 'ring-1 ring-green-600/20'
  },
  on_leave: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    ring: 'ring-1 ring-yellow-600/20'
  },
  terminated: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    ring: 'ring-1 ring-red-600/20'
  }
} as const

const departmentColors = {
  management: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    ring: 'ring-1 ring-purple-600/20'
  },
  front_desk: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    ring: 'ring-1 ring-blue-600/20'
  },
  housekeeping: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    ring: 'ring-1 ring-green-600/20'
  },
  maintenance: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    ring: 'ring-1 ring-orange-600/20'
  },
  restaurant: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    ring: 'ring-1 ring-red-600/20'
  },
  security: {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    ring: 'ring-1 ring-gray-600/20'
  }
} as const

export function StaffDetails({ staff, onEdit }: StaffDetailsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <Title className="text-2xl font-bold text-gray-900">{staff.name}</Title>
          <Text className="text-gray-500">{staff.position.replace('_', ' ').charAt(0).toUpperCase() + staff.position.slice(1)}</Text>
        </div>
        {onEdit && (
          <Button
            onClick={onEdit}
            variant="secondary"
            className="hover:bg-gray-100 transition-all duration-200"
          >
            Edit Details
          </Button>
        )}
      </div>

      {/* Status and Department */}
      <div className="flex flex-wrap gap-4">
        <span
          className={`
            inline-flex px-3 py-1 rounded-full text-sm font-medium
            ${statusColors[staff.status].bg}
            ${statusColors[staff.status].text}
            ${statusColors[staff.status].ring}
          `}
        >
          {staff.status.replace('_', ' ').charAt(0).toUpperCase() + staff.status.slice(1)}
        </span>
        <span
          className={`
            inline-flex px-3 py-1 rounded-full text-sm font-medium
            ${departmentColors[staff.department].bg}
            ${departmentColors[staff.department].text}
            ${departmentColors[staff.department].ring}
          `}
        >
          {staff.department.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      {/* Contact Information */}
      <Card className="p-6 space-y-4">
        <Title className="text-lg font-semibold text-gray-900">Contact Information</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <EnvelopeIcon className="h-5 w-5 text-gray-400" />
            <div>
              <Text className="text-sm text-gray-500">Email</Text>
              <Text className="text-gray-900">{staff.email}</Text>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <PhoneIcon className="h-5 w-5 text-gray-400" />
            <div>
              <Text className="text-sm text-gray-500">Phone</Text>
              <Text className="text-gray-900">{staff.phone}</Text>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPinIcon className="h-5 w-5 text-gray-400" />
            <div>
              <Text className="text-sm text-gray-500">Address</Text>
              <Text className="text-gray-900">{staff.address}</Text>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ExclamationTriangleIcon className="h-5 w-5 text-gray-400" />
            <div>
              <Text className="text-sm text-gray-500">Emergency Contact</Text>
              <Text className="text-gray-900">{staff.emergencyContact}</Text>
            </div>
          </div>
        </div>
      </Card>

      {/* Employment Details */}
      <Card className="p-6 space-y-4">
        <Title className="text-lg font-semibold text-gray-900">Employment Details</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <BriefcaseIcon className="h-5 w-5 text-gray-400" />
            <div>
              <Text className="text-sm text-gray-500">Position</Text>
              <Text className="text-gray-900 capitalize">{staff.position.replace('_', ' ')}</Text>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
            <div>
              <Text className="text-sm text-gray-500">Department</Text>
              <Text className="text-gray-900 capitalize">{staff.department.replace('_', ' ')}</Text>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ClockIcon className="h-5 w-5 text-gray-400" />
            <div>
              <Text className="text-sm text-gray-500">Schedule</Text>
              <Text className="text-gray-900 capitalize">{staff.schedule}</Text>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CalendarIcon className="h-5 w-5 text-gray-400" />
            <div>
              <Text className="text-sm text-gray-500">Join Date</Text>
              <Text className="text-gray-900">{formatDate(staff.joinDate)}</Text>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <BanknotesIcon className="h-5 w-5 text-gray-400" />
            <div>
              <Text className="text-sm text-gray-500">Salary</Text>
              <Text className="text-gray-900">{formatSalary(staff.salary)}</Text>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DocumentTextIcon className="h-5 w-5 text-gray-400" />
            <div>
              <Text className="text-sm text-gray-500">Documents</Text>
              <Text className="text-gray-900 capitalize">
                {staff.documents.map(doc => doc.replace('_', ' ')).join(', ')}
              </Text>
            </div>
          </div>
        </div>
      </Card>

      {/* Notes */}
      {staff.notes && (
        <Card className="p-6 space-y-4">
          <Title className="text-lg font-semibold text-gray-900">Notes</Title>
          <Text className="text-gray-700 whitespace-pre-wrap">{staff.notes}</Text>
        </Card>
      )}
    </div>
  )
} 