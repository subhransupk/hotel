'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '../../../components/ui/button'
import { Text } from '../../../components/ui/text'
import { Title } from '../../../components/ui/title'
import { DatePicker } from '../../../components/ui/date-picker'
import { calculateNetSalary, calculateTaxBracket, calculateInsuranceDeduction } from './utils/calculations'

interface AddPayrollModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: PayrollEntry) => void
}

interface PayrollEntry {
  staffId: string
  salaryPeriod: {
    year: number
    month: number
  }
  paymentDate: Date
  baseSalary: number
  hoursWorked: number
  overtimeHours: number
  performanceBonus: number
  holidayBonus: number
  otherBonuses: number
  deductions: {
    tax: number
    insurance: number
    other: number
  }
  notes: string
}

// Mock staff data (replace with actual staff data from your API)
const mockStaffList = [
  { id: '1', name: 'James Wilson', position: 'Manager', baseSalary: 65000 },
  { id: '2', name: 'Emily Chen', position: 'Receptionist', baseSalary: 42000 },
  { id: '3', name: 'Robert Martinez', position: 'Chef', baseSalary: 55000 },
]

export default function AddPayrollModal({
  isOpen,
  onClose,
  onSave
}: AddPayrollModalProps) {
  const [selectedStaff, setSelectedStaff] = useState('')
  const [salaryYear, setSalaryYear] = useState(new Date().getFullYear())
  const [salaryMonth, setSalaryMonth] = useState(new Date().getMonth() + 1)
  const [paymentDate, setPaymentDate] = useState(new Date())
  const [hoursWorked, setHoursWorked] = useState(160)
  const [overtimeHours, setOvertimeHours] = useState(0)
  const [performanceBonus, setPerformanceBonus] = useState(0)
  const [holidayBonus, setHolidayBonus] = useState(0)
  const [otherBonuses, setOtherBonuses] = useState(0)
  const [otherDeductions, setOtherDeductions] = useState(0)
  const [notes, setNotes] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const selectedStaffMember = mockStaffList.find(staff => staff.id === selectedStaff)
  const hourlyRate = selectedStaffMember ? selectedStaffMember.baseSalary / (12 * 160) : 0

  // Generate year options (current year and 2 years back)
  const yearOptions = Array.from({ length: 3 }, (_, i) => new Date().getFullYear() - i)

  // Month options
  const monthOptions = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedStaffMember) return

    setIsProcessing(true)
    
    try {
      const taxRate = calculateTaxBracket(selectedStaffMember.baseSalary)
      const insuranceDeduction = calculateInsuranceDeduction(selectedStaffMember.baseSalary / 12)

      const salary = calculateNetSalary({
        baseSalary: selectedStaffMember.baseSalary / 12,
        hoursWorked,
        hourlyRate,
        overtimeHours,
        overtimeRate: 1.5,
        performanceBonus,
        holidayBonus,
        otherBonuses,
        taxRate,
        insuranceDeduction,
        otherDeductions
      })

      const payrollEntry: PayrollEntry = {
        staffId: selectedStaff,
        salaryPeriod: {
          year: salaryYear,
          month: salaryMonth
        },
        paymentDate,
        baseSalary: selectedStaffMember.baseSalary / 12,
        hoursWorked,
        overtimeHours,
        performanceBonus,
        holidayBonus,
        otherBonuses,
        deductions: {
          tax: salary.taxAmount,
          insurance: insuranceDeduction,
          other: otherDeductions
        },
        notes
      }

      await onSave(payrollEntry)
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100">
                    Add New Payroll Entry
                  </Dialog.Title>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Enter payroll details for the selected staff member
                  </p>
                </div>

                <div className="px-6 py-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Staff Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Staff Member
                      </label>
                      <select
                        value={selectedStaff}
                        onChange={(e) => setSelectedStaff(e.target.value)}
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        required
                      >
                        <option value="">Select a staff member</option>
                        {mockStaffList.map(staff => (
                          <option key={staff.id} value={staff.id}>
                            {staff.name} - {staff.position}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Salary Period */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Salary Year
                        </label>
                        <select
                          value={salaryYear}
                          onChange={(e) => setSalaryYear(Number(e.target.value))}
                          className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                          required
                        >
                          {yearOptions.map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Salary Month
                        </label>
                        <select
                          value={salaryMonth}
                          onChange={(e) => setSalaryMonth(Number(e.target.value))}
                          className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                          required
                        >
                          {monthOptions.map(month => (
                          <option key={month.value} value={month.value}>
                            {month.label}
                          </option>
                        ))}
                        </select>
                      </div>
                    </div>

                    {/* Payment Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Payment Date
                      </label>
                      <DatePicker
                        value={paymentDate.toISOString()}
                        onChange={(date) => setPaymentDate(new Date(date))}
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        required
                      />
                    </div>

                    {/* Hours */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Hours Worked
                        </label>
                        <input
                          type="number"
                          value={hoursWorked}
                          onChange={(e) => setHoursWorked(Number(e.target.value))}
                          className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Overtime Hours
                        </label>
                        <input
                          type="number"
                          value={overtimeHours}
                          onChange={(e) => setOvertimeHours(Number(e.target.value))}
                          className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        />
                      </div>
                    </div>

                    {/* Bonuses */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bonuses
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        <input
                          type="number"
                          value={performanceBonus}
                          onChange={(e) => setPerformanceBonus(Number(e.target.value))}
                          placeholder="Performance"
                          className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        />
                        <input
                          type="number"
                          value={holidayBonus}
                          onChange={(e) => setHolidayBonus(Number(e.target.value))}
                          placeholder="Holiday"
                          className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        />
                        <input
                          type="number"
                          value={otherBonuses}
                          onChange={(e) => setOtherBonuses(Number(e.target.value))}
                          placeholder="Other"
                          className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        />
                      </div>
                    </div>

                    {/* Deductions */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Additional Deductions
                      </label>
                      <input
                        type="number"
                        value={otherDeductions}
                        onChange={(e) => setOtherDeductions(Number(e.target.value))}
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Notes
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        placeholder="Add any additional notes..."
                      />
                    </div>

                    {/* Summary */}
                    {selectedStaffMember && (
                      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">Payment Summary</h4>
                        <dl className="space-y-3">
                          <div className="flex justify-between">
                            <dt className="text-sm text-gray-500 dark:text-gray-400">Base Salary</dt>
                            <dd className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              ${(selectedStaffMember.baseSalary / 12).toLocaleString()}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm text-gray-500 dark:text-gray-400">Total Bonuses</dt>
                            <dd className="text-sm font-medium text-green-600 dark:text-green-400">
                              +${(performanceBonus + holidayBonus + otherBonuses).toLocaleString()}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm text-gray-500 dark:text-gray-400">Deductions</dt>
                            <dd className="text-sm font-medium text-red-600 dark:text-red-400">
                              -${otherDeductions.toLocaleString()}
                            </dd>
                          </div>
                          <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                            <div className="flex justify-between">
                              <dt className="text-sm font-medium text-gray-900 dark:text-gray-100">Net Amount</dt>
                              <dd className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                                ${((selectedStaffMember.baseSalary / 12) + performanceBonus + holidayBonus + otherBonuses - otherDeductions).toLocaleString()}
                              </dd>
                            </div>
                          </div>
                        </dl>
                      </div>
                    )}
                  </form>
                </div>

                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex flex-row-reverse gap-3">
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isProcessing}
                      onClick={handleSubmit}
                    >
                      Save Payroll Entry
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={onClose}
                      disabled={isProcessing}
                    >
                      Cancel
                    </Button>
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