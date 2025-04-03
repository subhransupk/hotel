'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const campaignSchema = z.object({
  name: z.string().min(1, 'Campaign name is required'),
  type: z.enum(['Email', 'Social Media', 'Multi-channel']),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  description: z.string().min(1, 'Description is required'),
  targetAudience: z.enum(['All Guests', 'Past Guests', 'Corporate', 'Leisure']),
  budget: z.string().min(1, 'Budget is required'),
  goals: z.string().min(1, 'Goals are required'),
})

type CampaignFormData = z.infer<typeof campaignSchema>

interface CreateCampaignModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateCampaignModal({ isOpen, onClose }: CreateCampaignModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
  })

  const onSubmit = async (data: CampaignFormData) => {
    try {
      // TODO: Implement campaign creation API call
      console.log('Campaign data:', data)
      reset()
      onClose()
    } catch (error) {
      console.error('Error creating campaign:', error)
    }
  }

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100">
                      Create New Campaign
                    </Dialog.Title>
                    <div className="mt-4">
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Campaign Name
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
                          <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Campaign Type
                          </label>
                          <select
                            {...register('type')}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          >
                            <option value="Email">Email</option>
                            <option value="Social Media">Social Media</option>
                            <option value="Multi-channel">Multi-channel</option>
                          </select>
                          {errors.type && (
                            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Start Date
                            </label>
                            <input
                              type="date"
                              {...register('startDate')}
                              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            {errors.startDate && (
                              <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              End Date
                            </label>
                            <input
                              type="date"
                              {...register('endDate')}
                              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            {errors.endDate && (
                              <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
                            )}
                          </div>
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

                        <div>
                          <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Target Audience
                          </label>
                          <select
                            {...register('targetAudience')}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          >
                            <option value="All Guests">All Guests</option>
                            <option value="Past Guests">Past Guests</option>
                            <option value="Corporate">Corporate</option>
                            <option value="Leisure">Leisure</option>
                          </select>
                          {errors.targetAudience && (
                            <p className="mt-1 text-sm text-red-600">{errors.targetAudience.message}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Budget
                          </label>
                          <input
                            type="number"
                            {...register('budget')}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                          {errors.budget && (
                            <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="goals" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Campaign Goals
                          </label>
                          <textarea
                            {...register('goals')}
                            rows={2}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                          {errors.goals && (
                            <p className="mt-1 text-sm text-red-600">{errors.goals.message}</p>
                          )}
                        </div>

                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 sm:ml-3 sm:w-auto"
                          >
                            Create Campaign
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
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
} 