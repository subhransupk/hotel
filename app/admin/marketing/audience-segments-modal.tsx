'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { EditSegmentForm } from './edit-segment-form'

// Mock data for segments
const mockSegments = [
  {
    id: 1,
    name: 'Luxury Travelers',
    description: 'High-value guests who prefer premium accommodations',
    criteria: 'Average booking value > $500',
    memberCount: 1234,
    lastUpdated: '2024-02-15',
  },
  {
    id: 2,
    name: 'Business Travelers',
    description: 'Corporate guests with frequent stays',
    criteria: 'Purpose of stay: Business',
    memberCount: 3456,
    lastUpdated: '2024-02-14',
  },
  {
    id: 3,
    name: 'Family Vacationers',
    description: 'Guests traveling with family members',
    criteria: 'Group size >= 3, Has children',
    memberCount: 2789,
    lastUpdated: '2024-02-13',
  },
  {
    id: 4,
    name: 'Weekend Getaway',
    description: 'Short-stay guests during weekends',
    criteria: 'Length of stay: 1-3 days, Check-in: Friday/Saturday',
    memberCount: 4567,
    lastUpdated: '2024-02-12',
  },
]

interface AudienceSegmentsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AudienceSegmentsModal({ isOpen, onClose }: AudienceSegmentsModalProps) {
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [segments, setSegments] = useState(mockSegments)

  const handleSave = (data: any) => {
    if (selectedSegment) {
      // Update existing segment
      setSegments(segments.map(segment => 
        segment.id === selectedSegment
          ? {
              ...segment,
              name: data.name,
              description: data.description,
              criteria: Object.entries(data.criteria)
                .filter(([_, value]) => value)
                .map(([key, value]) => `${key}: ${value}`)
                .join(', '),
              lastUpdated: new Date().toISOString().split('T')[0],
            }
          : segment
      ))
      setSelectedSegment(null)
    } else if (isCreating) {
      // Create new segment
      const newSegment = {
        id: segments.length + 1,
        name: data.name,
        description: data.description,
        criteria: Object.entries(data.criteria)
          .filter(([_, value]) => value)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', '),
        memberCount: 0,
        lastUpdated: new Date().toISOString().split('T')[0],
      }
      setSegments([...segments, newSegment])
      setIsCreating(false)
    }
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this segment?')) {
      setSegments(segments.filter(segment => segment.id !== id))
    }
  }

  const selectedSegmentData = selectedSegment
    ? segments.find(segment => segment.id === selectedSegment)
    : undefined

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
                {selectedSegment || isCreating ? (
                  <EditSegmentForm
                    segment={selectedSegmentData}
                    onClose={() => {
                      setSelectedSegment(null)
                      setIsCreating(false)
                    }}
                    onSave={handleSave}
                  />
                ) : (
                  <div>
                    <div className="flex items-center justify-between">
                      <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100">
                        Audience Segments
                      </Dialog.Title>
                      <div className="flex space-x-3">
                        <button
                          type="button"
                          onClick={() => setIsCreating(true)}
                          className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
                        >
                          <PlusIcon className="h-4 w-4 mr-1" />
                          New Segment
                        </button>
                        <button
                          type="button"
                          className="rounded-md text-gray-400 hover:text-gray-500"
                          onClick={onClose}
                        >
                          <span className="sr-only">Close</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-900/50">
                            <tr>
                              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                                Segment Name
                              </th>
                              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                                Description
                              </th>
                              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                                Members
                              </th>
                              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                                Last Updated
                              </th>
                              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                            {segments.map((segment) => (
                              <tr key={segment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                  {segment.name}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                  {segment.description}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                  {segment.memberCount.toLocaleString()}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                  {new Date(segment.lastUpdated).toLocaleDateString()}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedSegment(segment.id)}
                                    className="inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-2.5 py-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 mr-2"
                                  >
                                    <PencilIcon className="h-4 w-4 mr-1" />
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDelete(segment.id)}
                                    className="inline-flex items-center rounded-md bg-red-50 dark:bg-red-900/20 px-2.5 py-1.5 text-sm font-semibold text-red-700 dark:text-red-400 shadow-sm ring-1 ring-inset ring-red-600/20 dark:ring-red-600/40 hover:bg-red-100 dark:hover:bg-red-900/40"
                                  >
                                    <TrashIcon className="h-4 w-4 mr-1" />
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Segment Details</h4>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          Select a segment to view detailed information and edit criteria.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
} 