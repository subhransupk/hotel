'use client'

import { useState } from 'react'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Text } from '../ui/text'

export const bookingFormSchema = z.object({
  guestName: z.string().min(1, 'Guest name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  roomNumber: z.string().min(1, 'Room number is required'),
  roomType: z.string().min(1, 'Room type is required'),
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  guests: z.number().min(1, 'Number of guests is required'),
  specialRequests: z.string().optional(),
  totalAmount: z.number().min(0, 'Total amount must be non-negative')
})

export type BookingFormData = z.infer<typeof bookingFormSchema>

interface BookingFormProps {
  initialData?: Partial<BookingFormData>
  onSubmit: (data: BookingFormData) => void
  onClose: () => void
  mode?: 'create' | 'edit'
}

export function BookingForm({ initialData, onSubmit, onClose, mode = 'create' }: BookingFormProps) {
  const [formData, setFormData] = useState<Partial<BookingFormData>>({
    guestName: '',
    email: '',
    phone: '',
    roomNumber: '',
    roomType: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: '',
    totalAmount: 0,
    ...initialData,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const validatedData = bookingFormSchema.parse(formData)
      onSubmit(validatedData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof BookingFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path[0] as keyof BookingFormData] = err.message
          }
        })
        setErrors(fieldErrors)
      }
    }
  }

  const handleChange = (field: keyof BookingFormData, value: any) => {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <div className="space-y-6">
        {/* Guest Information */}
        <div>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Guest Information</Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="guestName" className="block text-sm font-medium text-gray-700">
                Guest Name
              </label>
              <input
                type="text"
                id="guestName"
                value={formData.guestName || ''}
                onChange={(e) => handleChange('guestName', e.target.value)}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.guestName ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.guestName && (
                <p className="mt-1 text-sm text-red-600">{errors.guestName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.phone ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
                Number of Guests
              </label>
              <input
                type="number"
                id="guests"
                min="1"
                value={formData.guests || 1}
                onChange={(e) => handleChange('guests', parseInt(e.target.value))}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.guests ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.guests && (
                <p className="mt-1 text-sm text-red-600">{errors.guests}</p>
              )}
            </div>
          </div>
        </div>

        {/* Room Details */}
        <div>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Room Details</Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700">
                Room Number
              </label>
              <input
                type="text"
                id="roomNumber"
                value={formData.roomNumber || ''}
                onChange={(e) => handleChange('roomNumber', e.target.value)}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.roomNumber ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.roomNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.roomNumber}</p>
              )}
            </div>

            <div>
              <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">
                Room Type
              </label>
              <select
                id="roomType"
                value={formData.roomType || ''}
                onChange={(e) => handleChange('roomType', e.target.value)}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.roomType ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              >
                <option value="">Select Room Type</option>
                {roomTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.roomType && (
                <p className="mt-1 text-sm text-red-600">{errors.roomType}</p>
              )}
            </div>
          </div>
        </div>

        {/* Stay Duration */}
        <div>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Stay Duration</Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">
                Check-in Date
              </label>
              <input
                type="date"
                id="checkIn"
                value={formData.checkIn || ''}
                onChange={(e) => handleChange('checkIn', e.target.value)}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.checkIn ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.checkIn && (
                <p className="mt-1 text-sm text-red-600">{errors.checkIn}</p>
              )}
            </div>

            <div>
              <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">
                Check-out Date
              </label>
              <input
                type="date"
                id="checkOut"
                value={formData.checkOut || ''}
                onChange={(e) => handleChange('checkOut', e.target.value)}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.checkOut ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.checkOut && (
                <p className="mt-1 text-sm text-red-600">{errors.checkOut}</p>
              )}
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Payment Details</Text>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700">
                Total Amount
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="totalAmount"
                  min="0"
                  step="0.01"
                  value={formData.totalAmount || 0}
                  onChange={(e) => handleChange('totalAmount', parseFloat(e.target.value))}
                  className={`pl-7 block w-full rounded-lg border ${
                    errors.totalAmount ? 'border-red-300' : 'border-gray-300'
                  } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              </div>
              {errors.totalAmount && (
                <p className="mt-1 text-sm text-red-600">{errors.totalAmount}</p>
              )}
            </div>
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Special Requests</Text>
          <div>
            <textarea
              id="specialRequests"
              rows={4}
              value={formData.specialRequests || ''}
              onChange={(e) => handleChange('specialRequests', e.target.value)}
              placeholder="Add any special requests or requirements..."
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
          {mode === 'edit' ? 'Update Booking' : 'Create Booking'}
        </Button>
      </div>
    </form>
  )
} 