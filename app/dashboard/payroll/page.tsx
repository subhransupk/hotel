'use client'

import { useState, useEffect, Fragment, Suspense } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  BanknotesIcon,
  CalendarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ArrowPathIcon,
  FunnelIcon,
  XMarkIcon
} from "@heroicons/react/24/outline"
import { Card } from "../../../components/ui/card"
import { Text } from "../../../components/ui/text"
import { Title } from "../../../components/ui/title"
import { Button } from "../../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../../../components/ui/table"
import { TabGroup, TabList, Tab } from "../../../components/ui/tabs"
import { DatePicker } from "../../../components/ui/date-picker"
import PayrollDetailsModal from './payroll-details-modal'
import ProcessPayrollModal from './process-payroll-modal'
import AddPayrollModal from './add-payroll-modal'
import { useRouter, useSearchParams } from 'next/navigation'

// Types for payroll management
type PayrollStatus = 'pending' | 'processing' | 'completed' | 'failed'
type PaymentMethod = 'bank_transfer' | 'check' | 'cash'

interface PayrollRecord {
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
  paymentMethod: PaymentMethod
  status: PayrollStatus
}

interface ProcessPayrollData {
  paymentDate: Date
  includeBonuses: boolean
  includeOvertime: boolean
  notes: string
}

// Mock data for payroll records
const mockPayrollRecords: PayrollRecord[] = [
  {
    id: "PR001",
    employeeId: "1",
    employeeName: "James Wilson",
    position: "Manager",
    baseSalary: 65000,
    overtime: 1200,
    bonus: 2000,
    deductions: 800,
    netSalary: 67400,
    paymentDate: "2024-02-25",
    paymentMethod: "bank_transfer",
    status: "completed"
  },
  {
    id: "PR002",
    employeeId: "2",
    employeeName: "Emily Chen",
    position: "Receptionist",
    baseSalary: 42000,
    overtime: 800,
    bonus: 500,
    deductions: 400,
    netSalary: 42900,
    paymentDate: "2024-02-25",
    paymentMethod: "bank_transfer",
    status: "pending"
  }
]

// Stats cards data
const stats = [
  {
    name: 'Total Payroll This Month',
    value: '$157,890',
    icon: BanknotesIcon,
  },
  {
    name: 'Pending Payments',
    value: '12',
    icon: CalendarIcon,
  },
  {
    name: 'Total Staff',
    value: '45',
    icon: UserGroupIcon,
  },
  {
    name: 'Average Salary',
    value: '$3,508',
    icon: ChartBarIcon,
  },
]

interface TabButtonProps {
  selected: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ selected, children, onClick }) => (
  <button
    onClick={onClick}
    className={`
      w-full rounded-lg py-2.5 text-sm font-medium leading-5 
      ${selected 
        ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow'
        : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
      } ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
    `}
  >
    {children}
  </button>
)

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: typeof initialFilterState) => void
  initialFilters: typeof initialFilterState
}

const initialFilterState = {
  status: '',
  dateRange: 'all',
  department: '',
  salaryRange: {
    min: '',
    max: ''
  },
  salaryPeriod: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  }
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
  initialFilters
}) => {
  const [filters, setFilters] = useState(initialFilters)

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

  const handleApply = () => {
    onApply(filters)
    onClose()
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
                      Filter Payroll
                    </Dialog.Title>
                    
                    <div className="mt-4 space-y-4">
                      {/* Salary Period Filter */}
                      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Salary Period
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Year
                            </label>
                            <select
                              value={filters.salaryPeriod.year}
                              onChange={(e) => setFilters(prev => ({
                                ...prev,
                                salaryPeriod: {
                                  ...prev.salaryPeriod,
                                  year: Number(e.target.value)
                                }
                              }))}
                              className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                            >
                              {yearOptions.map(year => (
                                <option key={year} value={year}>{year}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Month
                            </label>
                            <select
                              value={filters.salaryPeriod.month}
                              onChange={(e) => setFilters(prev => ({
                                ...prev,
                                salaryPeriod: {
                                  ...prev.salaryPeriod,
                                  month: Number(e.target.value)
                                }
                              }))}
                              className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                            >
                              {monthOptions.map(month => (
                                <option key={month.value} value={month.value}>
                                  {month.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Status Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Status
                        </label>
                        <select
                          value={filters.status}
                          onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                          className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                        >
                          <option value="">All Status</option>
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                          <option value="failed">Failed</option>
                        </select>
                      </div>

                      {/* Department Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Department
                        </label>
                        <select
                          value={filters.department}
                          onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
                          className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                        >
                          <option value="">All Departments</option>
                          <option value="management">Management</option>
                          <option value="reception">Reception</option>
                          <option value="housekeeping">Housekeeping</option>
                          <option value="kitchen">Kitchen</option>
                          <option value="maintenance">Maintenance</option>
                        </select>
                      </div>

                      {/* Salary Range Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Salary Range
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="number"
                            placeholder="Min"
                            value={filters.salaryRange.min}
                            onChange={(e) => setFilters(prev => ({
                              ...prev,
                              salaryRange: { ...prev.salaryRange, min: e.target.value }
                            }))}
                            className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                          />
                          <input
                            type="number"
                            placeholder="Max"
                            value={filters.salaryRange.max}
                            onChange={(e) => setFilters(prev => ({
                              ...prev,
                              salaryRange: { ...prev.salaryRange, max: e.target.value }
                            }))}
                            className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <Button
                    variant="primary"
                    onClick={handleApply}
                    className="w-full sm:w-auto sm:ml-3"
                  >
                    Apply Filters
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={onClose}
                    className="mt-3 w-full sm:w-auto sm:mt-0"
                  >
                    Cancel
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

// Create a client component that uses useSearchParams
function PayrollPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Rest of the component logic
  const [activeTab, setActiveTab] = useState(0)
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<PayrollRecord | null>(null)
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>(mockPayrollRecords)
  const [filters, setFilters] = useState(initialFilterState)
  const [filteredRecords, setFilteredRecords] = useState<PayrollRecord[]>(mockPayrollRecords)
  
  // Use the tab parameter from URL if available
  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab) {
      const tabIndex = parseInt(tab)
      if (!isNaN(tabIndex) && tabIndex >= 0 && tabIndex <= 2) {
        setActiveTab(tabIndex)
      }
    }
  }, [searchParams])
  
  // ... rest of the component methods and render logic ...
  
  const handleTabChange = (index: number) => {
    setActiveTab(index)
    // Update URL with tab parameter
    router.push(`/dashboard/payroll?tab=${index}`)
  }
  
  const handleProcessPayroll = () => {
    setIsProcessModalOpen(true)
  }
  
  const handleViewDetails = (record: PayrollRecord) => {
    setSelectedRecord(record)
    setIsDetailsModalOpen(true)
  }
  
  const handleAddPayroll = () => {
    setIsAddModalOpen(true)
  }
  
  const handleFilter = () => {
    setIsFilterModalOpen(true)
  }
  
  const handleExportReport = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Convert data to CSV
      const csv = convertToCSV(filteredRecords)
      
      // Create a blob and download
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.setAttribute('hidden', '')
      a.setAttribute('href', url)
      a.setAttribute('download', `payroll_report_${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (error) {
      console.error('Failed to export report:', error)
    }
  }
  
  const handleExportHistory = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Convert data to CSV
      const csv = convertToCSV(filteredRecords)
      
      // Create a blob and download
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.setAttribute('hidden', '')
      a.setAttribute('href', url)
      a.setAttribute('download', `payroll_history_${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (error) {
      console.error('Failed to export history:', error)
    }
  }
  
  const handleSaveSettings = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Show success message
      alert('Payroll settings saved successfully!')
    } catch (error) {
      console.error('Failed to save settings:', error)
    }
  }
  
  const convertToCSV = (data: any[]) => {
    const headers = Object.keys(data[0]).join(',')
    const rows = data.map(item => Object.values(item).join(','))
    return [headers, ...rows].join('\n')
  }
  
  const applyFilters = (filters: typeof initialFilterState) => {
    setFilters(filters)
    
    let filtered = [...payrollRecords]
    
    // Filter by status
    if (filters.status) {
      filtered = filtered.filter(record => record.status === filters.status)
    }
    
    // Filter by date range
    if (filters.dateRange !== 'all') {
      filtered = filtered.filter(record => {
        const recordDate = new Date(record.paymentDate)
        const today = new Date()
        
        switch (filters.dateRange) {
          case 'today':
            return isSameDay(recordDate, today)
          case 'this_week':
            return isThisWeek(recordDate)
          case 'this_month':
            return isThisMonth(recordDate)
          case 'last_month':
            return isLastMonth(recordDate)
          default:
            return true
        }
      })
    }
    
    // Filter by department
    if (filters.department) {
      filtered = filtered.filter(record => {
        const department = getDepartmentFromPosition(record.position)
        return department === filters.department
      })
    }
    
    // Filter by salary range
    if (filters.salaryRange.min || filters.salaryRange.max) {
      filtered = filtered.filter(record => {
        const min = filters.salaryRange.min ? parseFloat(filters.salaryRange.min) : 0
        const max = filters.salaryRange.max ? parseFloat(filters.salaryRange.max) : Infinity
        return record.netSalary >= min && record.netSalary <= max
      })
    }
    
    setFilteredRecords(filtered)
  }
  
  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
  }
  
  const isThisWeek = (date: Date) => {
    const now = new Date()
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()))
    const endOfWeek = new Date(now.setDate(now.getDate() + 6))
    return date >= startOfWeek && date <= endOfWeek
  }
  
  const isThisMonth = (date: Date) => {
    const now = new Date()
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  }
  
  const isLastMonth = (date: Date) => {
    const now = new Date()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1)
    return date.getMonth() === lastMonth.getMonth() && date.getFullYear() === lastMonth.getFullYear()
  }
  
  const getDepartmentFromPosition = (position: string): string => {
    const positionToDepartment: Record<string, string> = {
      'Manager': 'Management',
      'Receptionist': 'Front Desk',
      'Housekeeper': 'Housekeeping',
      'Chef': 'Food & Beverage',
      'Waiter': 'Food & Beverage'
    }
    return positionToDepartment[position] || 'Other'
  }
  
  const renderCurrentPayroll = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Title>Current Payroll</Title>
          <Text>Manage and process current payroll for all employees</Text>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={handleFilter}
            icon={FunnelIcon}
          >
            Filter
          </Button>
          <Button 
            variant="outline" 
            onClick={handleExportReport}
            icon={DocumentTextIcon}
          >
            Export
          </Button>
          <Button 
            onClick={handleProcessPayroll}
            icon={ArrowPathIcon}
          >
            Process Payroll
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-4">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <Text className="text-sm text-gray-500 dark:text-gray-400">{stat.name}</Text>
                <Title className="text-xl">{stat.value}</Title>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Employee</TableHeaderCell>
                <TableHeaderCell>Position</TableHeaderCell>
                <TableHeaderCell>Base Salary</TableHeaderCell>
                <TableHeaderCell>Overtime</TableHeaderCell>
                <TableHeaderCell>Bonus</TableHeaderCell>
                <TableHeaderCell>Deductions</TableHeaderCell>
                <TableHeaderCell>Net Salary</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.employeeName}</TableCell>
                  <TableCell>{record.position}</TableCell>
                  <TableCell>${record.baseSalary.toLocaleString()}</TableCell>
                  <TableCell>${record.overtime.toLocaleString()}</TableCell>
                  <TableCell>${record.bonus.toLocaleString()}</TableCell>
                  <TableCell>${record.deductions.toLocaleString()}</TableCell>
                  <TableCell className="font-medium">${record.netSalary.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      record.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      record.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      record.status === 'processing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(record)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
  
  const renderPaymentHistory = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Title>Payment History</Title>
          <Text>View and export past payroll records</Text>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={handleFilter}
            icon={FunnelIcon}
          >
            Filter
          </Button>
          <Button 
            variant="outline" 
            onClick={handleExportHistory}
            icon={DocumentTextIcon}
          >
            Export
          </Button>
          <Button 
            onClick={handleAddPayroll}
          >
            Add Record
          </Button>
        </div>
      </div>
      
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>Employee</TableHeaderCell>
                <TableHeaderCell>Payment Date</TableHeaderCell>
                <TableHeaderCell>Payment Method</TableHeaderCell>
                <TableHeaderCell>Net Salary</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.id}</TableCell>
                  <TableCell>{record.employeeName}</TableCell>
                  <TableCell>{record.paymentDate}</TableCell>
                  <TableCell>{record.paymentMethod.replace('_', ' ')}</TableCell>
                  <TableCell className="font-medium">${record.netSalary.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      record.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      record.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      record.status === 'processing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(record)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
  
  const renderSettings = () => (
    <div className="space-y-6">
      <div>
        <Title>Payroll Settings</Title>
        <Text>Configure payroll processing settings</Text>
      </div>
      
      <Card className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Default Payment Method
              </label>
              <select className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
                <option value="bank_transfer">Bank Transfer</option>
                <option value="check">Check</option>
                <option value="cash">Cash</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Payment Day
              </label>
              <select className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
                <option value="1">1st of month</option>
                <option value="15">15th of month</option>
                <option value="last">Last day of month</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                id="auto_process"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="auto_process" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Automatically process payroll on payment day
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Tax Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Default Tax Rate (%)
              </label>
              <input
                type="number"
                className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                defaultValue="20"
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="include_tax"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked
              />
              <label htmlFor="include_tax" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Include tax calculations in payroll
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                id="notify_employees"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked
              />
              <label htmlFor="notify_employees" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Send email notifications to employees
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="notify_managers"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked
              />
              <label htmlFor="notify_managers" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Send email notifications to managers
              </label>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button onClick={handleSaveSettings}>
            Save Settings
          </Button>
        </div>
      </Card>
    </div>
  )
  
  return (
    <div className="space-y-6 p-6">
      <TabGroup defaultIndex={activeTab} onChange={handleTabChange}>
        <TabList>
          <Tab>Current Payroll</Tab>
          <Tab>Payment History</Tab>
          <Tab>Settings</Tab>
        </TabList>
        
        <div className="mt-6">
          {activeTab === 0 && renderCurrentPayroll()}
          {activeTab === 1 && renderPaymentHistory()}
          {activeTab === 2 && renderSettings()}
        </div>
      </TabGroup>
      
      {/* Modals */}
      {selectedRecord && (
        <PayrollDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          payrollRecord={selectedRecord}
        />
      )}
      
      <ProcessPayrollModal
        isOpen={isProcessModalOpen}
        onClose={() => setIsProcessModalOpen(false)}
        onProcess={(data) => {
          console.log('Processing payroll with data:', data);
          // Implement actual processing logic here
          setTimeout(() => {
            setIsProcessModalOpen(false);
          }, 1000);
        }}
      />
      
      <AddPayrollModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={(data) => {
          console.log('Saving payroll data:', data);
          // Implement actual save logic here
          setTimeout(() => {
            setIsAddModalOpen(false);
          }, 1000);
        }}
      />
      
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={applyFilters}
        initialFilters={filters}
      />
    </div>
  )
}

// Main component with Suspense boundary
export default function PayrollPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading payroll data...</div>}>
      <PayrollPageContent />
    </Suspense>
  )
} 