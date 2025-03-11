'use client'

import {
  UserIcon,
  CalendarDaysIcon,
  HomeIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  CheckBadgeIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline"
import { Card } from "../ui/card"
import { Text } from "../ui/text"
import { Title } from "../ui/title"
import { Button } from '../ui/button'

interface BookingDetailsProps {
  booking: {
    id: string
    guestName: string
    roomNumber: string
    roomType: string
    checkIn: string
    checkOut: string
    status: 'confirmed' | 'pending' | 'checked-in' | 'checked-out' | 'cancelled'
    guests: number
    totalAmount: number
    paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded'
    specialRequests?: string
    email: string
    phone: string
  }
  onStatusChange?: (bookingId: string, newStatus: string) => void
}

export function BookingDetails({ booking, onStatusChange }: BookingDetailsProps) {
  const statusActions = {
    pending: [
      { 
        label: 'Confirm Booking', 
        action: 'confirmed',
        icon: CheckCircleIcon,
        className: 'bg-green-600 hover:bg-green-700 text-white'
      },
      { 
        label: 'Cancel Booking', 
        action: 'cancelled',
        icon: XCircleIcon,
        className: 'bg-red-600 hover:bg-red-700 text-white'
      }
    ],
    confirmed: [
      { 
        label: 'Check In', 
        action: 'checked-in',
        icon: ArrowPathIcon,
        className: 'bg-blue-600 hover:bg-blue-700 text-white'
      },
      { 
        label: 'Cancel Booking', 
        action: 'cancelled',
        icon: XCircleIcon,
        className: 'bg-red-600 hover:bg-red-700 text-white'
      }
    ],
    'checked-in': [
      { 
        label: 'Check Out', 
        action: 'checked-out',
        icon: ArrowPathIcon,
        className: 'bg-purple-600 hover:bg-purple-700 text-white'
      }
    ]
  }

  const currentActions = statusActions[booking.status as keyof typeof statusActions] || []

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
            <UserIcon className="h-8 w-8 text-gray-500" />
          </div>
          <div>
            <Title className="text-2xl font-bold text-gray-900">{booking.guestName}</Title>
            <Text className="text-gray-500">Booking #{booking.id}</Text>
          </div>
        </div>
      </div>

      {/* Status Actions */}
      {currentActions.length > 0 && (
        <div className="flex gap-4 mb-6">
          {currentActions.map((action) => (
            <Button
              key={action.action}
              onClick={() => onStatusChange?.(booking.id, action.action)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${action.className}`}
            >
              <action.icon className="h-5 w-5" />
              {action.label}
            </Button>
          ))}
        </div>
      )}

      {/* Guest Information */}
      <div>
        <Text className="text-lg font-semibold text-gray-900 mb-4">Guest Information</Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <EnvelopeIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <Text className="text-sm text-gray-500">Email</Text>
              <Text className="font-medium text-gray-900">{booking.email}</Text>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center">
              <PhoneIcon className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <Text className="text-sm text-gray-500">Phone</Text>
              <Text className="font-medium text-gray-900">{booking.phone}</Text>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Details */}
      <div>
        <Text className="text-lg font-semibold text-gray-900 mb-4">Booking Details</Text>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-violet-50 flex items-center justify-center">
                <HomeIcon className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <Text className="text-sm text-gray-500">Room</Text>
                <Text className="font-medium text-gray-900">
                  Room {booking.roomNumber}
                </Text>
                <Text className="text-sm text-gray-500">{booking.roomType}</Text>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <UserGroupIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <Text className="text-sm text-gray-500">Guests</Text>
                <Text className="font-medium text-gray-900">{booking.guests} guests</Text>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <CurrencyDollarIcon className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <Text className="text-sm text-gray-500">Total Amount</Text>
                <Text className="font-medium text-gray-900">${booking.totalAmount}</Text>
                <Text className="text-sm text-gray-500 capitalize">{booking.paymentStatus}</Text>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <CheckBadgeIcon className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <Text className="text-sm text-gray-500">Status</Text>
                <Text className="font-medium text-gray-900 capitalize">{booking.status}</Text>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Dates */}
      <div>
        <Text className="text-lg font-semibold text-gray-900 mb-4">Stay Duration</Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4 bg-blue-50 border border-blue-100">
            <div className="flex items-center gap-3">
              <CalendarDaysIcon className="h-5 w-5 text-blue-600" />
              <div>
                <Text className="text-sm text-blue-600">Check In</Text>
                <Text className="font-medium text-blue-900">
                  {new Date(booking.checkIn).toLocaleDateString()}
                </Text>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-blue-50 border border-blue-100">
            <div className="flex items-center gap-3">
              <CalendarDaysIcon className="h-5 w-5 text-blue-600" />
              <div>
                <Text className="text-sm text-blue-600">Check Out</Text>
                <Text className="font-medium text-blue-900">
                  {new Date(booking.checkOut).toLocaleDateString()}
                </Text>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Special Requests */}
      {booking.specialRequests && (
        <div>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Special Requests</Text>
          <Card className="p-4 bg-gray-50">
            <div className="flex items-start gap-3">
              <ChatBubbleLeftIcon className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <Text className="text-gray-700 whitespace-pre-wrap">{booking.specialRequests}</Text>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
} 