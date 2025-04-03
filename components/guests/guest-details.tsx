'use client'

import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  HomeIcon,
  StarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline"
import { Card } from "../ui/card"
import { Text } from "../ui/text"
import { Title } from "../ui/title"

interface GuestDetailsProps {
  guest: {
    id: string
    name: string
    email: string
    phone: string
    status: string
    totalStays: number
    totalSpent: number
    lastStay: string
    nextStay: string | null
    type: string
    nationality: string
    address: string
    preferences: string[]
    notes: string
  }
}

export function GuestDetails({ guest }: GuestDetailsProps) {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
            <UserIcon className="h-8 w-8 text-gray-500" />
          </div>
          <div>
            <Title className="text-2xl font-bold text-gray-900">{guest.name}</Title>
            <Text className="text-gray-500">{guest.nationality}</Text>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <Text className="text-lg font-semibold text-gray-900 mb-4">Contact Information</Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <EnvelopeIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <Text className="text-sm text-gray-500">Email</Text>
              <Text className="font-medium text-gray-900">{guest.email}</Text>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center">
              <PhoneIcon className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <Text className="text-sm text-gray-500">Phone</Text>
              <Text className="font-medium text-gray-900">{guest.phone}</Text>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <GlobeAltIcon className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <Text className="text-sm text-gray-500">Nationality</Text>
              <Text className="font-medium text-gray-900">{guest.nationality}</Text>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <HomeIcon className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <Text className="text-sm text-gray-500">Address</Text>
              <Text className="font-medium text-gray-900">{guest.address}</Text>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Status */}
      <div>
        <Text className="text-lg font-semibold text-gray-900 mb-4">Guest Status</Text>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-violet-50 flex items-center justify-center">
                <StarIcon className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <Text className="text-sm text-gray-500">Guest Type</Text>
                <Text className="font-medium text-gray-900">
                  {guest.type.charAt(0).toUpperCase() + guest.type.slice(1)}
                </Text>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <ClockIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <Text className="text-sm text-gray-500">Total Stays</Text>
                <Text className="font-medium text-gray-900">{guest.totalStays} stays</Text>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <CurrencyDollarIcon className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <Text className="text-sm text-gray-500">Total Spent</Text>
                <Text className="font-medium text-gray-900">${guest.totalSpent}</Text>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <CalendarDaysIcon className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <Text className="text-sm text-gray-500">Last Stay</Text>
                <Text className="font-medium text-gray-900">
                  {new Date(guest.lastStay).toLocaleDateString()}
                </Text>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Preferences */}
      <div>
        <Text className="text-lg font-semibold text-gray-900 mb-4">Guest Preferences</Text>
        <div className="flex flex-wrap gap-2">
          {guest.preferences.map((preference) => (
            <span
              key={preference}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
            >
              {preference}
            </span>
          ))}
        </div>
      </div>

      {/* Notes */}
      {guest.notes && (
        <div>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</Text>
          <Card className="p-4 bg-gray-50">
            <Text className="text-gray-700 whitespace-pre-wrap">{guest.notes}</Text>
          </Card>
        </div>
      )}

      {/* Upcoming Stay */}
      {guest.nextStay && (
        <div>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Upcoming Stay</Text>
          <Card className="p-4 bg-blue-50 border border-blue-100">
            <div className="flex items-center gap-3">
              <CalendarDaysIcon className="h-5 w-5 text-blue-600" />
              <Text className="font-medium text-blue-900">
                Next stay scheduled for {new Date(guest.nextStay).toLocaleDateString()}
              </Text>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
} 