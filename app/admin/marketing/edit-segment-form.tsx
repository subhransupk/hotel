'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { XMarkIcon } from '@heroicons/react/24/outline'

const segmentSchema = z.object({
  name: z.string().min(1, 'Segment name is required'),
  description: z.string().min(1, 'Description is required'),
  criteria: z.object({
    bookingValue: z.string().optional(),
    stayLength: z.string().optional(),
    groupSize: z.string().optional(),
    purpose: z.string().optional(),
    checkInDays: z.array(z.string()).optional(),
    hasChildren: z.boolean().optional(),
  }),
})

type SegmentFormData = z.infer<typeof segmentSchema>

interface EditSegmentFormProps {
  segment?: {
    id: number
    name: string
    description: string
    criteria: string
    memberCount: number
    lastUpdated: string
  }
  onClose: () => void
  onSave: (data: SegmentFormData) => void
}

export function EditSegmentForm({ segment, onClose, onSave }: EditSegmentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SegmentFormData>({
    resolver: zodResolver(segmentSchema),
    defaultValues: segment
      ? {
          name: segment.name,
          description: segment.description,
          criteria: {
            bookingValue: '',
            stayLength: '',
            groupSize: '',
            purpose: '',
            checkInDays: [],
            hasChildren: false,
          },
        }
      : undefined,
  })

  const onSubmit = (data: SegmentFormData) => {
    onSave(data)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {segment ? 'Edit Segment' : 'Create New Segment'}
        </h3>
        <button
          type="button"
          className="rounded-md text-gray-400 hover:text-gray-500"
          onClick={onClose}
        >
          <span className="sr-only">Close</span>
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Segment Name
          </label>
          <input
            type="text"
            {...register('name')}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-gray-100">Segment Criteria</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="bookingValue" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Minimum Booking Value
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  {...register('criteria.bookingValue')}
                  className="pl-7 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="stayLength" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Minimum Stay Length (Days)
              </label>
              <input
                type="number"
                {...register('criteria.stayLength')}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="3"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Minimum Group Size
              </label>
              <input
                type="number"
                {...register('criteria.groupSize')}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="2"
              />
            </div>

            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Stay Purpose
              </label>
              <select
                {...register('criteria.purpose')}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Any</option>
                <option value="business">Business</option>
                <option value="leisure">Leisure</option>
                <option value="event">Event</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Check-in Days
            </label>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <label key={day} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    {...register('criteria.checkInDays')}
                    value={day}
                    className="rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{day}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                {...register('criteria.hasChildren')}
                className="rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Traveling with Children
              </span>
            </label>
          </div>
        </div>

        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 sm:ml-3 sm:w-auto"
          >
            {segment ? 'Save Changes' : 'Create Segment'}
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 sm:mt-0 sm:w-auto"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
} 