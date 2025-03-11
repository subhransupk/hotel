'use client'

import { useState } from 'react'
import {
  Button,
  TextInput,
  Select,
  SelectItem,
  Textarea,
  NumberInput,
} from '@tremor/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface AddServiceModalProps {
  isOpen: boolean
  onClose: () => void
}

const serviceCategories = [
  { id: 'room', name: 'Room Services' },
  { id: 'housekeeping', name: 'Housekeeping' },
  { id: 'maintenance', name: 'Maintenance' },
  { id: 'amenities', name: 'Amenities' },
  { id: 'events', name: 'Events' },
] as const

const serviceStatuses = [
  { value: 'available', label: 'Available' },
  { value: 'busy', label: 'Busy' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'maintenance', label: 'Maintenance' },
] as const

interface FormData {
  title: string
  description: string
  category: typeof serviceCategories[number]['id']
  price: number
  duration: number
  maxCapacity: number
  status: typeof serviceStatuses[number]['value']
}

export function AddServiceModal({ isOpen, onClose }: AddServiceModalProps) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: 'room',
    price: 0,
    duration: 0,
    maxCapacity: 1,
    status: 'available',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Add New Service
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Service Title
                </label>
                <TextInput
                  id="title"
                  placeholder="Enter service title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Enter service description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as FormData['category'] })}
                  className="block w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-tremor-default text-tremor-content-emphasis dark:bg-dark-tremor-input dark:border-dark-tremor-border dark:text-dark-tremor-content-emphasis focus:outline-none focus:ring-2 focus:ring-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-subtle shadow-tremor-input dark:shadow-dark-tremor-input"
                  required
                >
                  {serviceCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as FormData['status'] })}
                  className="block w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-tremor-default text-tremor-content-emphasis dark:bg-dark-tremor-input dark:border-dark-tremor-border dark:text-dark-tremor-content-emphasis focus:outline-none focus:ring-2 focus:ring-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-subtle shadow-tremor-input dark:shadow-dark-tremor-input"
                  required
                >
                  {serviceStatuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price ($)
                  </label>
                  <NumberInput
                    id="price"
                    placeholder="Enter price"
                    value={formData.price}
                    onValueChange={(value) => setFormData({ ...formData, price: Number(value) || 0 })}
                    className="mt-1"
                    min={0}
                    step={0.01}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                    Duration (minutes)
                  </label>
                  <NumberInput
                    id="duration"
                    placeholder="Enter duration"
                    value={formData.duration}
                    onValueChange={(value) => setFormData({ ...formData, duration: Number(value) || 0 })}
                    className="mt-1"
                    min={0}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="maxCapacity" className="block text-sm font-medium text-gray-700">
                  Max Capacity
                </label>
                <NumberInput
                  id="maxCapacity"
                  placeholder="Enter max capacity"
                  value={formData.maxCapacity}
                  onValueChange={(value) => setFormData({ ...formData, maxCapacity: Number(value) || 1 })}
                  className="mt-1"
                  min={1}
                  required
                />
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Button type="button" variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  Add Service
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 