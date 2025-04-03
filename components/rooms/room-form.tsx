'use client'

import { useState } from 'react'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Text } from '../ui/text'

export const roomFormSchema = z.object({
  number: z.string().min(1, 'Room number is required'),
  type: z.string().min(1, 'Room type is required'),
  floor: z.number().min(1, 'Floor number is required'),
  capacity: z.number().min(1, 'Capacity is required'),
  bedType: z.string().min(1, 'Bed type is required'),
  size: z.string().min(1, 'Room size is required'),
  description: z.string().optional(),
  maxOccupancy: z.number().min(1, 'Maximum occupancy is required'),
  basePrice: z.number().min(0, 'Base price must be non-negative'),
  weekendPrice: z.number().min(0, 'Weekend price must be non-negative'),
  seasonalPrice: z.number().min(0, 'Seasonal price must be non-negative'),
  amenities: z.array(z.string()).min(1, 'At least one amenity is required')
})

export type RoomFormData = z.infer<typeof roomFormSchema>

interface RoomFormProps {
  initialData?: Partial<RoomFormData>
  onSubmit: (data: RoomFormData) => void
  onClose: () => void
  mode?: 'create' | 'edit'
}

export function RoomForm({ initialData, onSubmit, onClose, mode = 'create' }: RoomFormProps) {
  const [formData, setFormData] = useState<Partial<RoomFormData>>({
    number: '',
    type: '',
    floor: 1,
    capacity: 2,
    bedType: '',
    size: '',
    description: '',
    maxOccupancy: 2,
    basePrice: 0,
    weekendPrice: 0,
    seasonalPrice: 0,
    amenities: [],
    ...initialData,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof RoomFormData, string>>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const validatedData = roomFormSchema.parse(formData)
      onSubmit(validatedData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof RoomFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path[0] as keyof RoomFormData] = err.message
          }
        })
        setErrors(fieldErrors)
      }
    }
  }

  const handleChange = (field: keyof RoomFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const roomTypes = [
    'Standard Room',
    'Deluxe Room',
    'Suite',
    'Executive Suite',
    'Presidential Suite',
  ]

  const bedTypes = [
    'Single',
    'Twin',
    'Double',
    'Queen',
    'King',
    'California King',
  ]

  const amenityOptions = [
    'Ocean View',
    'City View',
    'Balcony',
    'Mini Bar',
    'Kitchen',
    'Living Room',
    'Work Desk',
    'Jacuzzi',
    'WiFi',
    'TV',
    'Air Conditioning',
    'Room Service',
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <div className="space-y-6">
        {/* Basic Information */}
        <div>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Basic Information</Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                Room Number
              </label>
              <input
                type="text"
                id="number"
                value={formData.number || ''}
                onChange={(e) => handleChange('number', e.target.value)}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.number ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.number && (
                <p className="mt-1 text-sm text-red-600">{errors.number}</p>
              )}
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Room Type
              </label>
              <select
                id="type"
                value={formData.type || ''}
                onChange={(e) => handleChange('type', e.target.value)}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.type ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              >
                <option value="">Select Room Type</option>
                {roomTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-600">{errors.type}</p>
              )}
            </div>

            <div>
              <label htmlFor="floor" className="block text-sm font-medium text-gray-700">
                Floor
              </label>
              <input
                type="number"
                id="floor"
                min="1"
                value={formData.floor || 1}
                onChange={(e) => handleChange('floor', parseInt(e.target.value))}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.floor ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.floor && (
                <p className="mt-1 text-sm text-red-600">{errors.floor}</p>
              )}
            </div>

            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                Room Size
              </label>
              <input
                type="text"
                id="size"
                placeholder="e.g., 45 m²"
                value={formData.size || ''}
                onChange={(e) => handleChange('size', e.target.value)}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.size ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.size && (
                <p className="mt-1 text-sm text-red-600">{errors.size}</p>
              )}
            </div>
          </div>
        </div>

        {/* Capacity and Bed */}
        <div>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Capacity and Bed</Text>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                Standard Capacity
              </label>
              <input
                type="number"
                id="capacity"
                min="1"
                value={formData.capacity || 2}
                onChange={(e) => handleChange('capacity', parseInt(e.target.value))}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.capacity ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.capacity && (
                <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>
              )}
            </div>

            <div>
              <label htmlFor="maxOccupancy" className="block text-sm font-medium text-gray-700">
                Maximum Occupancy
              </label>
              <input
                type="number"
                id="maxOccupancy"
                min="1"
                value={formData.maxOccupancy || 2}
                onChange={(e) => handleChange('maxOccupancy', parseInt(e.target.value))}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.maxOccupancy ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.maxOccupancy && (
                <p className="mt-1 text-sm text-red-600">{errors.maxOccupancy}</p>
              )}
            </div>

            <div>
              <label htmlFor="bedType" className="block text-sm font-medium text-gray-700">
                Bed Type
              </label>
              <select
                id="bedType"
                value={formData.bedType || ''}
                onChange={(e) => handleChange('bedType', e.target.value)}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.bedType ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              >
                <option value="">Select Bed Type</option>
                {bedTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.bedType && (
                <p className="mt-1 text-sm text-red-600">{errors.bedType}</p>
              )}
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Pricing</Text>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700">
                Base Price
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="basePrice"
                  min="0"
                  step="0.01"
                  value={formData.basePrice || 0}
                  onChange={(e) => handleChange('basePrice', parseFloat(e.target.value))}
                  className={`pl-7 block w-full rounded-lg border ${
                    errors.basePrice ? 'border-red-300' : 'border-gray-300'
                  } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              </div>
              {errors.basePrice && (
                <p className="mt-1 text-sm text-red-600">{errors.basePrice}</p>
              )}
            </div>

            <div>
              <label htmlFor="weekendPrice" className="block text-sm font-medium text-gray-700">
                Weekend Price
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="weekendPrice"
                  min="0"
                  step="0.01"
                  value={formData.weekendPrice || 0}
                  onChange={(e) => handleChange('weekendPrice', parseFloat(e.target.value))}
                  className={`pl-7 block w-full rounded-lg border ${
                    errors.weekendPrice ? 'border-red-300' : 'border-gray-300'
                  } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              </div>
              {errors.weekendPrice && (
                <p className="mt-1 text-sm text-red-600">{errors.weekendPrice}</p>
              )}
            </div>

            <div>
              <label htmlFor="seasonalPrice" className="block text-sm font-medium text-gray-700">
                Seasonal Price
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="seasonalPrice"
                  min="0"
                  step="0.01"
                  value={formData.seasonalPrice || 0}
                  onChange={(e) => handleChange('seasonalPrice', parseFloat(e.target.value))}
                  className={`pl-7 block w-full rounded-lg border ${
                    errors.seasonalPrice ? 'border-red-300' : 'border-gray-300'
                  } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              </div>
              {errors.seasonalPrice && (
                <p className="mt-1 text-sm text-red-600">{errors.seasonalPrice}</p>
              )}
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Amenities</Text>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-3">
              {amenityOptions.map((amenity) => (
                <label
                  key={amenity}
                  className={`inline-flex items-center px-4 py-2 rounded-full border ${
                    formData.amenities?.includes(amenity)
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  } cursor-pointer transition-colors duration-200`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={formData.amenities?.includes(amenity) || false}
                    onChange={(e) => {
                      const currentAmenities = formData.amenities || []
                      const newAmenities = e.target.checked
                        ? [...currentAmenities, amenity]
                        : currentAmenities.filter((a) => a !== amenity)
                      handleChange('amenities', newAmenities)
                    }}
                  />
                  <span className="text-sm font-medium">{amenity}</span>
                </label>
              ))}
            </div>
            {errors.amenities && (
              <p className="mt-1 text-sm text-red-600">{errors.amenities}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Description</Text>
          <div>
            <textarea
              id="description"
              rows={4}
              value={formData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Add room description..."
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          className="px-4 py-2"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
        >
          {mode === 'edit' ? 'Update Room' : 'Create Room'}
        </Button>
      </div>
    </form>
  )
} 