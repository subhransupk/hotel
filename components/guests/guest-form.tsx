'use client'

import { useState } from 'react'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Text } from '../ui/text'

export const guestFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  address: z.string().min(1, 'Address is required'),
  type: z.enum(['regular', 'vip', 'occasional']),
  preferences: z.array(z.string()),
  notes: z.string().optional(),
})

export type GuestFormData = z.infer<typeof guestFormSchema>

interface GuestFormProps {
  initialData?: Partial<GuestFormData>
  onSubmit: (data: GuestFormData) => void
  onClose: () => void
}

export function GuestForm({ initialData, onSubmit, onClose }: GuestFormProps) {
  const [formData, setFormData] = useState<Partial<GuestFormData>>({
    name: '',
    email: '',
    phone: '',
    nationality: '',
    address: '',
    type: 'regular',
    preferences: [],
    notes: '',
    ...initialData,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof GuestFormData, string>>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const validatedData = guestFormSchema.parse(formData)
      onSubmit(validatedData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof GuestFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path[0] as keyof GuestFormData] = err.message
          }
        })
        setErrors(fieldErrors)
      }
    }
  }

  const handleChange = (field: keyof GuestFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const preferenceOptions = [
    'High Floor',
    'Low Floor',
    'Non-Smoking',
    'Smoking',
    'King Bed',
    'Twin Beds',
    'Quiet Room',
    'Extra Pillows',
    'Late Checkout',
    'Early Check-in',
    'Airport Transfer',
    'Room Service',
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <div className="space-y-6">
        {/* Personal Information */}
        <div>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Personal Information</Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
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
              <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">
                Nationality
              </label>
              <input
                type="text"
                id="nationality"
                value={formData.nationality || ''}
                onChange={(e) => handleChange('nationality', e.target.value)}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.nationality ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.nationality && (
                <p className="mt-1 text-sm text-red-600">{errors.nationality}</p>
              )}
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Address</Text>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Full Address
            </label>
            <textarea
              id="address"
              rows={3}
              value={formData.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
              className={`mt-1 block w-full rounded-lg border ${
                errors.address ? 'border-red-300' : 'border-gray-300'
              } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address}</p>
            )}
          </div>
        </div>

        {/* Guest Type */}
        <div>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Guest Type</Text>
          <div className="grid grid-cols-3 gap-4">
            {['regular', 'vip', 'occasional'].map((type) => (
              <div
                key={type}
                className={`relative rounded-lg border p-4 cursor-pointer transition-all duration-200 ${
                  formData.type === type
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => handleChange('type', type)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                      formData.type === type
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {formData.type === type && (
                      <svg
                        className="h-3 w-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 12 12"
                      >
                        <path d="M3.707 5.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L5 6.586 3.707 5.293z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Preferences</Text>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {preferenceOptions.map((preference) => (
              <div
                key={preference}
                className={`relative rounded-lg border p-3 cursor-pointer transition-all duration-200 ${
                  formData.preferences?.includes(preference)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => {
                  const newPreferences = formData.preferences?.includes(preference)
                    ? formData.preferences.filter((p) => p !== preference)
                    : [...(formData.preferences || []), preference]
                  handleChange('preferences', newPreferences)
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">{preference}</div>
                  {formData.preferences?.includes(preference) && (
                    <svg
                      className="h-5 w-5 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</Text>
          <div>
            <textarea
              id="notes"
              rows={4}
              value={formData.notes || ''}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Add any special notes or requirements..."
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
          Save Guest
        </Button>
      </div>
    </form>
  )
} 