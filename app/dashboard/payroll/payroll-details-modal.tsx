'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '../../../components/ui/button'
import { Text } from '../../../components/ui/text'
import { Title } from '../../../components/ui/title'

interface PayrollDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  payrollRecord: {
    id: string
    employeeId: string
    employeeName: string
    position: string
    baseSalary: number
    overtime: number
    bonus: number
    deductions: number
    netSalary: number
    paymentDate: string
    paymentMethod: string
    status: string
    salaryPeriod?: {
      month: number
      year: number
    }
    deductionDetails?: {
      tax: number
      insurance: number
      other: number
    }
    bonusDetails?: {
      performance: number
      holiday: number
      other: number
    }
  }
}

export default function PayrollDetailsModal({
  isOpen,
  onClose,
  payrollRecord
}: PayrollDetailsModalProps) {
  // Helper function to get month name
  const getMonthName = (month: number) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return months[month - 1]
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
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
                      Payroll Details - {payrollRecord.employeeName}
                    </Dialog.Title>
                    
                    <div className="mt-4 border-t border-gray-200 dark:border-gray-700">
                      <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Employee ID</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">{payrollRecord.employeeId}</dd>
                        </div>
                        
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Position</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">{payrollRecord.position}</dd>
                        </div>

                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Salary Period</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">
                            {payrollRecord.salaryPeriod ? (
                              `${getMonthName(payrollRecord.salaryPeriod.month)} ${payrollRecord.salaryPeriod.year}`
                            ) : (
                              new Date(payrollRecord.paymentDate).toLocaleDateString('en-US', { 
                                month: 'long',
                                year: 'numeric'
                              })
                            )}
                          </dd>
                        </div>

                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Date</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">
                            {new Date(payrollRecord.paymentDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </dd>
                        </div>

                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Method</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0 capitalize">
                            {payrollRecord.paymentMethod.replace('_', ' ')}
                          </dd>
                        </div>

                        <div className="py-4">
                          <Title className="text-sm mb-4">Salary Breakdown</Title>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Text className="text-sm text-gray-500 dark:text-gray-400">Base Salary</Text>
                              <Text className="text-sm font-medium">${payrollRecord.baseSalary.toLocaleString()}</Text>
                            </div>
                            <div className="flex justify-between">
                              <Text className="text-sm text-gray-500 dark:text-gray-400">Overtime</Text>
                              <Text className="text-sm font-medium">${payrollRecord.overtime.toLocaleString()}</Text>
                            </div>
                            <div className="flex justify-between">
                              <Text className="text-sm text-gray-500 dark:text-gray-400">Bonus</Text>
                              <Text className="text-sm font-medium">${payrollRecord.bonus.toLocaleString()}</Text>
                            </div>
                            <div className="flex justify-between">
                              <Text className="text-sm text-gray-500 dark:text-gray-400">Deductions</Text>
                              <Text className="text-sm font-medium text-red-600">-${payrollRecord.deductions.toLocaleString()}</Text>
                            </div>
                            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                              <div className="flex justify-between">
                                <Text className="text-sm font-medium">Net Salary</Text>
                                <Text className="text-sm font-bold">${payrollRecord.netSalary.toLocaleString()}</Text>
                              </div>
                            </div>
                          </div>
                        </div>

                        {payrollRecord.deductionDetails && (
                          <div className="py-4">
                            <Title className="text-sm mb-4">Deduction Details</Title>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <Text className="text-sm text-gray-500 dark:text-gray-400">Tax</Text>
                                <Text className="text-sm font-medium text-red-600">-${payrollRecord.deductionDetails.tax.toLocaleString()}</Text>
                              </div>
                              <div className="flex justify-between">
                                <Text className="text-sm text-gray-500 dark:text-gray-400">Insurance</Text>
                                <Text className="text-sm font-medium text-red-600">-${payrollRecord.deductionDetails.insurance.toLocaleString()}</Text>
                              </div>
                              <div className="flex justify-between">
                                <Text className="text-sm text-gray-500 dark:text-gray-400">Other</Text>
                                <Text className="text-sm font-medium text-red-600">-${payrollRecord.deductionDetails.other.toLocaleString()}</Text>
                              </div>
                            </div>
                          </div>
                        )}

                        {payrollRecord.bonusDetails && (
                          <div className="py-4">
                            <Title className="text-sm mb-4">Bonus Details</Title>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <Text className="text-sm text-gray-500 dark:text-gray-400">Performance</Text>
                                <Text className="text-sm font-medium">${payrollRecord.bonusDetails.performance.toLocaleString()}</Text>
                              </div>
                              <div className="flex justify-between">
                                <Text className="text-sm text-gray-500 dark:text-gray-400">Holiday</Text>
                                <Text className="text-sm font-medium">${payrollRecord.bonusDetails.holiday.toLocaleString()}</Text>
                              </div>
                              <div className="flex justify-between">
                                <Text className="text-sm text-gray-500 dark:text-gray-400">Other</Text>
                                <Text className="text-sm font-medium">${payrollRecord.bonusDetails.other.toLocaleString()}</Text>
                              </div>
                            </div>
                          </div>
                        )}
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <Button
                    variant="primary"
                    onClick={() => {/* Handle download payslip */}}
                    className="w-full sm:w-auto sm:ml-3"
                  >
                    Download Payslip
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={onClose}
                    className="mt-3 w-full sm:w-auto sm:mt-0"
                  >
                    Close
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
} 