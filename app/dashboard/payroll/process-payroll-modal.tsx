'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '../../../components/ui/button'
import { Text } from '../../../components/ui/text'
import { Title } from '../../../components/ui/title'
import { DatePicker } from '../../../components/ui/date-picker'

interface ProcessPayrollModalProps {
  isOpen: boolean
  onClose: () => void
  onProcess: (data: {
    paymentDate: Date
    includeBonuses: boolean
    includeOvertime: boolean
    notes: string
  }) => void
}

export default function ProcessPayrollModal({
  isOpen,
  onClose,
  onProcess
}: ProcessPayrollModalProps) {
  const [paymentDate, setPaymentDate] = useState<Date>(new Date())
  const [includeBonuses, setIncludeBonuses] = useState(true)
  const [includeOvertime, setIncludeOvertime] = useState(true)
  const [notes, setNotes] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  // Format date as YYYY-MM-DD for the date picker
  const formatDateForPicker = (date: Date): string => {
    return date.toISOString().split('T')[0]
  }

  // Parse date string from picker to Date object
  const parseDateFromPicker = (dateString: string): Date => {
    return new Date(dateString)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    try {
      await onProcess({
        paymentDate,
        includeBonuses,
        includeOvertime,
        notes
      })
      onClose()
    } catch (error) {
      console.error('Error processing payroll:', error)
    } finally {
      setIsProcessing(false)
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
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
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6">
                      Process Payroll
                    </Dialog.Title>
                    <div className="mt-2">
                      <Text className="text-sm text-gray-500">
                        Review and confirm payroll processing details.
                      </Text>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Payment Date
                        </label>
                        <DatePicker
                          value={formatDateForPicker(paymentDate)}
                          onChange={(dateString) => setPaymentDate(parseDateFromPicker(dateString))}
                          className="mt-1 block w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="relative flex items-start">
                          <div className="flex h-6 items-center">
                            <input
                              id="bonuses"
                              type="checkbox"
                              checked={includeBonuses}
                              onChange={(e) => setIncludeBonuses(e.target.checked)}
                              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                            />
                          </div>
                          <div className="ml-3">
                            <label htmlFor="bonuses" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Include Bonuses
                            </label>
                          </div>
                        </div>

                        <div className="relative flex items-start">
                          <div className="flex h-6 items-center">
                            <input
                              id="overtime"
                              type="checkbox"
                              checked={includeOvertime}
                              onChange={(e) => setIncludeOvertime(e.target.checked)}
                              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                            />
                          </div>
                          <div className="ml-3">
                            <label htmlFor="overtime" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Include Overtime
                            </label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Notes
                        </label>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                          placeholder="Add any additional notes..."
                        />
                      </div>

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <Button
                          type="submit"
                          variant="primary"
                          isLoading={isProcessing}
                          className="w-full sm:w-auto sm:ml-3"
                        >
                          Process Payroll
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={onClose}
                          className="mt-3 w-full sm:w-auto sm:mt-0"
                          disabled={isProcessing}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
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