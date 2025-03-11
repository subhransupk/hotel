'use client'

import { useState } from 'react'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Text } from '../ui/text'

// Define the schema for lead form data
export const leadFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  source: z.enum(['website', 'referral', 'social_media', 'direct', 'other']),
  status: z.enum(['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost']),
  notes: z.string().optional(),
  budget: z.number().min(0, 'Budget must be non-negative').optional(),
  preferredContactMethod: z.enum(['email', 'phone']),
  followUpDate: z.string().optional(),
})

// Infer the type from the schema
export type LeadFormData = z.infer<typeof leadFormSchema>

// Define the props interface
export interface LeadFormProps {
  initialData?: LeadFormData | null
  onClose: () => void
  onSubmit: (data: LeadFormData) => void
  mode?: 'create' | 'edit'
}

const defaultFormData: LeadFormData = {
  name: '',
  email: '',
  phone: '',
  source: 'website',
  status: 'new',
  notes: '',
  budget: 0,
  preferredContactMethod: 'email',
  followUpDate: '',
}

export function LeadForm({ initialData, onClose, onSubmit, mode = 'create' }: LeadFormProps) {
  const [formData, setFormData] = useState<LeadFormData>(initialData || defaultFormData)
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form data
    const result = leadFormSchema.safeParse(formData)
    if (!result.success) {
      const formattedErrors: Partial<Record<keyof LeadFormData, string>> = {}
      result.error.issues.forEach(issue => {
        const path = issue.path[0] as keyof LeadFormData
        formattedErrors[path] = issue.message
      })
      setErrors(formattedErrors)
      return
    }

    onSubmit(formData)
  }

  const handleInputChange = (field: keyof LeadFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when field is modified
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <div className="space-y-6">
        {/* Basic Information */}
        <div>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Basic Information</Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
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
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
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
                Phone *
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.phone ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="source" className="block text-sm font-medium text-gray-700">
                Source
              </label>
              <select
                id="source"
                value={formData.source}
                onChange={(e) => handleInputChange('source', e.target.value)}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.source ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              >
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="social_media">Social Media</option>
                <option value="direct">Direct</option>
                <option value="other">Other</option>
              </select>
              {errors.source && (
                <p className="mt-1 text-sm text-red-600">{errors.source}</p>
              )}
            </div>
          </div>
        </div>

        {/* Lead Details */}
        <div>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Lead Details</Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.status ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="proposal">Proposal</option>
                <option value="negotiation">Negotiation</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">{errors.status}</p>
              )}
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                Budget
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="budget"
                  min="0"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', parseFloat(e.target.value))}
                  className={`pl-7 block w-full rounded-lg border ${
                    errors.budget ? 'border-red-300' : 'border-gray-300'
                  } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              </div>
              {errors.budget && (
                <p className="mt-1 text-sm text-red-600">{errors.budget}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Preferences */}
        <div>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Contact Preferences</Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="preferredContactMethod" className="block text-sm font-medium text-gray-700">
                Preferred Contact Method
              </label>
              <select
                id="preferredContactMethod"
                value={formData.preferredContactMethod}
                onChange={(e) => handleInputChange('preferredContactMethod', e.target.value)}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.preferredContactMethod ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
              {errors.preferredContactMethod && (
                <p className="mt-1 text-sm text-red-600">{errors.preferredContactMethod}</p>
              )}
            </div>

            <div>
              <label htmlFor="followUpDate" className="block text-sm font-medium text-gray-700">
                Follow-up Date
              </label>
              <input
                type="date"
                id="followUpDate"
                value={formData.followUpDate}
                onChange={(e) => handleInputChange('followUpDate', e.target.value)}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.followUpDate ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.followUpDate && (
                <p className="mt-1 text-sm text-red-600">{errors.followUpDate}</p>
              )}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Notes</Text>
          <div>
            <textarea
              id="notes"
              rows={4}
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Add any additional notes..."
              className={`mt-1 block w-full rounded-lg border ${
                errors.notes ? 'border-red-300' : 'border-gray-300'
              } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.notes && (
              <p className="mt-1 text-sm text-red-600">{errors.notes}</p>
            )}
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
          {mode === 'edit' ? 'Update Lead' : 'Create Lead'}
        </Button>
      </div>
    </form>
  )
} 