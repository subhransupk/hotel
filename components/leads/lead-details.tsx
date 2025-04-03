'use client'

import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Card, Badge, Button } from '@tremor/react'
import { Text } from '../ui/text'
import {
  CheckCircleIcon,
  XCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'
import { LeadFormData } from './lead-form'

// Add date formatting utility
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export interface Lead extends LeadFormData {
  id: string
  createdAt: string
  updatedAt: string
}

interface LeadDetailsProps {
  lead: Lead
  onStatusChange: (leadId: string, newStatus: Lead['status']) => void
}

const statusActions: Record<Lead['status'], { nextStatus: Lead['status'], label: string, icon: any }[]> = {
  new: [
    { nextStatus: 'contacted', label: 'Mark as Contacted', icon: PhoneIcon },
    { nextStatus: 'lost', label: 'Mark as Lost', icon: XCircleIcon }
  ],
  contacted: [
    { nextStatus: 'qualified', label: 'Mark as Qualified', icon: CheckCircleIcon },
    { nextStatus: 'lost', label: 'Mark as Lost', icon: XCircleIcon }
  ],
  qualified: [
    { nextStatus: 'proposal', label: 'Move to Proposal', icon: BuildingOfficeIcon },
    { nextStatus: 'lost', label: 'Mark as Lost', icon: XCircleIcon }
  ],
  proposal: [
    { nextStatus: 'negotiation', label: 'Start Negotiation', icon: ChatBubbleLeftIcon },
    { nextStatus: 'lost', label: 'Mark as Lost', icon: XCircleIcon }
  ],
  negotiation: [
    { nextStatus: 'won', label: 'Mark as Won', icon: CheckCircleIcon },
    { nextStatus: 'lost', label: 'Mark as Lost', icon: XCircleIcon }
  ],
  won: [],
  lost: []
}

const statusColors: Record<Lead['status'], string> = {
  new: 'bg-gray-100 text-gray-800',
  contacted: 'bg-blue-100 text-blue-800',
  qualified: 'bg-green-100 text-green-800',
  proposal: 'bg-purple-100 text-purple-800',
  negotiation: 'bg-yellow-100 text-yellow-800',
  won: 'bg-emerald-100 text-emerald-800',
  lost: 'bg-red-100 text-red-800'
}

export function LeadDetails({ lead, onStatusChange }: LeadDetailsProps) {
  const currentActions = statusActions[lead.status]

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
            <UserIcon className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{lead.name}</h2>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[lead.status]}`}>
              {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Status Actions */}
      {currentActions.length > 0 && (
        <div className="flex gap-4">
          {currentActions.map(action => (
            <Button
              key={action.nextStatus}
              onClick={() => onStatusChange(lead.id, action.nextStatus)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                action.nextStatus === 'lost'
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : action.nextStatus === 'won'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <action.icon className="h-5 w-5" />
              {action.label}
            </Button>
          ))}
        </div>
      )}

      {/* Contact Information */}
      <div>
        <Text className="text-lg font-semibold text-gray-900 mb-4">Contact Information</Text>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <EnvelopeIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <Text className="text-sm text-gray-500">Email</Text>
                <Text className="font-medium text-gray-900">{lead.email}</Text>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-violet-50 flex items-center justify-center">
                <PhoneIcon className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <Text className="text-sm text-gray-500">Phone</Text>
                <Text className="font-medium text-gray-900">{lead.phone}</Text>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <BuildingOfficeIcon className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <Text className="text-sm text-gray-500">Source</Text>
                <Text className="font-medium text-gray-900 capitalize">{lead.source.replace('_', ' ')}</Text>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <CalendarIcon className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <Text className="text-sm text-gray-500">Follow-up Date</Text>
                <Text className="font-medium text-gray-900">
                  {lead.followUpDate ? formatDate(lead.followUpDate) : 'Not set'}
                </Text>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Lead Details */}
      <div>
        <Text className="text-lg font-semibold text-gray-900 mb-4">Lead Details</Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4 bg-blue-50 border border-blue-100">
            <div className="flex items-center gap-3">
              <CurrencyDollarIcon className="h-5 w-5 text-blue-600" />
              <div>
                <Text className="text-sm text-blue-600">Budget</Text>
                <Text className="font-medium text-blue-900">
                  ${lead.budget?.toLocaleString() || 'Not specified'}
                </Text>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-blue-50 border border-blue-100">
            <div className="flex items-center gap-3">
              <EnvelopeIcon className="h-5 w-5 text-blue-600" />
              <div>
                <Text className="text-sm text-blue-600">Preferred Contact</Text>
                <Text className="font-medium text-blue-900 capitalize">
                  {lead.preferredContactMethod}
                </Text>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Notes */}
      {lead.notes && (
        <div>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Notes</Text>
          <Card className="p-4 bg-gray-50">
            <Text className="text-gray-700 whitespace-pre-wrap">{lead.notes}</Text>
          </Card>
        </div>
      )}

      {/* Timeline */}
      <div>
        <Text className="text-lg font-semibold text-gray-900 mb-4">Timeline</Text>
        <Card className="p-4 bg-gray-50">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <CalendarIcon className="h-4 w-4 text-blue-600" />
                </div>
                <Text className="text-gray-600">Created</Text>
              </div>
              <Text className="text-gray-900">{new Date(lead.createdAt).toLocaleString()}</Text>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <ArrowPathIcon className="h-4 w-4 text-blue-600" />
                </div>
                <Text className="text-gray-600">Last Updated</Text>
              </div>
              <Text className="text-gray-900">{new Date(lead.updatedAt).toLocaleString()}</Text>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 
