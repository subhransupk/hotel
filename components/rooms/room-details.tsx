'use client'

import {
  HomeIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  CheckBadgeIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  WrenchScrewdriverIcon,
  BeakerIcon
} from "@heroicons/react/24/outline"
import { Card } from "../ui/card"
import { Text } from "../ui/text"
import { Title } from "../ui/title"
import { Button } from '../ui/button'

interface RoomDetailsProps {
  room: {
    id: string
    number: string
    type: string
    status: 'available' | 'occupied' | 'maintenance' | 'cleaning' | 'reserved'
    floor: number
    capacity: number
    price: number
    amenities: string[]
    bedType: string
    size: string
    description: string
    maxOccupancy: number
    basePrice: number
    weekendPrice?: number
    seasonalPrice?: number
  }
  onStatusChange?: (roomId: string, newStatus: string) => void
}

export function RoomDetails({ room, onStatusChange }: RoomDetailsProps) {
  const statusActions = {
    maintenance: [
      { 
        label: 'Mark as Available', 
        action: 'available',
        icon: CheckCircleIcon,
        className: 'bg-green-600 hover:bg-green-700 text-white'
      }
    ],
    cleaning: [
      { 
        label: 'Mark as Available', 
        action: 'available',
        icon: CheckCircleIcon,
        className: 'bg-green-600 hover:bg-green-700 text-white'
      }
    ],
    available: [
      { 
        label: 'Mark for Cleaning', 
        action: 'cleaning',
        icon: BeakerIcon,
        className: 'bg-purple-600 hover:bg-purple-700 text-white'
      },
      { 
        label: 'Mark for Maintenance', 
        action: 'maintenance',
        icon: WrenchScrewdriverIcon,
        className: 'bg-amber-600 hover:bg-amber-700 text-white'
      }
    ]
  }

  const currentActions = statusActions[room.status as keyof typeof statusActions] || []

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
            <HomeIcon className="h-8 w-8 text-gray-500" />
          </div>
          <div>
            <Title className="text-2xl font-bold text-gray-900">Room {room.number}</Title>
            <Text className="text-gray-500">{room.type}</Text>
          </div>
        </div>
      </div>

      {/* Status Actions */}
      {currentActions.length > 0 && (
        <div className="flex gap-4 mb-6">
          {currentActions.map((action) => (
            <Button
              key={action.action}
              onClick={() => onStatusChange?.(room.id, action.action)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${action.className}`}
            >
              <action.icon className="h-5 w-5" />
              {action.label}
            </Button>
          ))}
        </div>
      )}

      {/* Room Details */}
      <div>
        <Text className="text-lg font-semibold text-gray-900 mb-4">Room Details</Text>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-violet-50 flex items-center justify-center">
                <HomeIcon className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <Text className="text-sm text-gray-500">Floor</Text>
                <Text className="font-medium text-gray-900">Floor {room.floor}</Text>
                <Text className="text-sm text-gray-500">{room.size}</Text>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <UserGroupIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <Text className="text-sm text-gray-500">Capacity</Text>
                <Text className="font-medium text-gray-900">
                  {room.maxOccupancy} guests max
                </Text>
                <Text className="text-sm text-gray-500">{room.bedType} Bed</Text>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <CurrencyDollarIcon className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <Text className="text-sm text-gray-500">Base Price</Text>
                <Text className="font-medium text-gray-900">${room.basePrice}</Text>
                <Text className="text-sm text-gray-500">per night</Text>
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
                <Text className="font-medium text-gray-900 capitalize">{room.status}</Text>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Pricing Details */}
      <div>
        <Text className="text-lg font-semibold text-gray-900 mb-4">Pricing Details</Text>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-4 bg-blue-50 border border-blue-100">
            <div className="flex items-center gap-3">
              <CurrencyDollarIcon className="h-5 w-5 text-blue-600" />
              <div>
                <Text className="text-sm text-blue-600">Base Price</Text>
                <Text className="font-medium text-blue-900">
                  ${room.basePrice}
                </Text>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-blue-50 border border-blue-100">
            <div className="flex items-center gap-3">
              <CurrencyDollarIcon className="h-5 w-5 text-blue-600" />
              <div>
                <Text className="text-sm text-blue-600">Weekend Price</Text>
                <Text className="font-medium text-blue-900">
                  ${room.weekendPrice}
                </Text>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-blue-50 border border-blue-100">
            <div className="flex items-center gap-3">
              <CurrencyDollarIcon className="h-5 w-5 text-blue-600" />
              <div>
                <Text className="text-sm text-blue-600">Seasonal Price</Text>
                <Text className="font-medium text-blue-900">
                  ${room.seasonalPrice}
                </Text>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Amenities */}
      <div>
        <Text className="text-lg font-semibold text-gray-900 mb-4">Amenities</Text>
        <Card className="p-4 bg-gray-50">
          <div className="flex flex-wrap gap-2">
            {room.amenities.map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-gray-700 border border-gray-200"
              >
                {amenity}
              </span>
            ))}
          </div>
        </Card>
      </div>

      {/* Description */}
      {room.description && (
        <div>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Description</Text>
          <Card className="p-4 bg-gray-50">
            <Text className="text-gray-700 whitespace-pre-wrap">{room.description}</Text>
          </Card>
        </div>
      )}
    </div>
  )
} 