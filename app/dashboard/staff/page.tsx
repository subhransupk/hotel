'use client'

import { useState } from 'react'
import { Dialog } from "@headlessui/react"
import {
  ArrowPathIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ClockIcon,
  CalendarIcon,
  XCircleIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline"
import { Card } from "../../../components/ui/card"
import { Text } from "../../../components/ui/text"
import { Title } from "../../../components/ui/title"
import { Button } from "../../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../../../components/ui/table"
import { TabGroup, TabList, Tab } from "../../../components/ui/tabs"
import { z } from 'zod'
import { StaffForm } from '../../../components/staff/staff-form'
import { StaffDetails } from '../../../components/staff/staff-details'
import { Label } from "../../../components/ui/label"
import { DatePicker } from "../../../components/ui/date-picker"
import { Textarea } from "../../../components/ui/textarea"

const staffSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  position: z.enum(['manager', 'receptionist', 'housekeeper', 'maintenance', 'chef', 'waiter']),
  department: z.enum(['management', 'front_desk', 'housekeeping', 'maintenance', 'restaurant', 'security']),
  status: z.enum(['active', 'on_leave', 'terminated']),
  joinDate: z.string(),
  schedule: z.enum(['morning', 'afternoon', 'night', 'flexible']),
  salary: z.number(),
  address: z.string(),
  emergencyContact: z.string(),
  documents: z.array(z.string()),
  notes: z.string().optional(),
})

type Staff = z.infer<typeof staffSchema>

// Mock data for staff members
const mockStaff: Staff[] = [
  {
    id: "1",
    name: "James Wilson",
    email: "james.wilson@hotel.com",
    phone: "+1 (555) 123-4567",
    position: "manager",
    department: "management",
    status: "active",
    joinDate: "2023-01-15",
    schedule: "flexible",
    salary: 65000,
    address: "123 Park Avenue, New York, NY",
    emergencyContact: "+1 (555) 987-6543",
    documents: ["contract", "id", "certifications"],
    notes: "Department Head, Management Training Certified"
  },
  {
    id: "2",
    name: "Emily Chen",
    email: "emily.chen@hotel.com",
    phone: "+1 (555) 234-5678",
    position: "receptionist",
    department: "front_desk",
    status: "active",
    joinDate: "2023-06-01",
    schedule: "morning",
    salary: 42000,
    address: "456 Broadway, New York, NY",
    emergencyContact: "+1 (555) 876-5432",
    documents: ["contract", "id"],
    notes: "Fluent in Mandarin and English"
  },
  {
    id: "3",
    name: "Robert Martinez",
    email: "robert.m@hotel.com",
    phone: "+1 (555) 345-6789",
    position: "chef",
    department: "restaurant",
    status: "on_leave",
    joinDate: "2023-03-15",
    schedule: "afternoon",
    salary: 55000,
    address: "789 5th Street, New York, NY",
    emergencyContact: "+1 (555) 765-4321",
    documents: ["contract", "id", "food_safety_cert"],
    notes: "Executive Chef, Specializes in French Cuisine"
  },
]

const statusColors = {
  active: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    ring: 'ring-1 ring-green-600/20'
  },
  on_leave: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    ring: 'ring-1 ring-yellow-600/20'
  },
  terminated: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    ring: 'ring-1 ring-red-600/20'
  }
} as const

const departmentColors = {
  management: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    ring: 'ring-1 ring-purple-600/20'
  },
  front_desk: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    ring: 'ring-1 ring-blue-600/20'
  },
  housekeeping: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    ring: 'ring-1 ring-green-600/20'
  },
  maintenance: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    ring: 'ring-1 ring-orange-600/20'
  },
  restaurant: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    ring: 'ring-1 ring-red-600/20'
  },
  security: {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    ring: 'ring-1 ring-gray-600/20'
  }
} as const

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'on_leave' | 'terminated'>('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isTerminateModalOpen, setIsTerminateModalOpen] = useState(false)
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false)
  const [leaveStartDate, setLeaveStartDate] = useState('')
  const [leaveEndDate, setLeaveEndDate] = useState('')
  const [leaveReason, setLeaveReason] = useState('')
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)

  const handleEditStaff = (data: Omit<Staff, 'id' | 'documents'>) => {
    if (selectedStaff) {
      const updatedStaff: Staff = {
        ...data,
        id: selectedStaff.id,
        documents: selectedStaff.documents,
      }
      console.log('Edit staff:', updatedStaff)
      setIsEditModalOpen(false)
    }
  }

  const handleRequestLeave = (staff: Staff) => {
    setSelectedStaff(staff)
    setIsLeaveModalOpen(true)
  }

  const handleTerminate = (staff: Staff) => {
    setSelectedStaff(staff)
    setIsTerminateModalOpen(true)
  }

  const confirmTermination = () => {
    if (selectedStaff) {
      console.log('Terminating staff:', selectedStaff)
      // TODO: Implement actual termination logic
      setIsTerminateModalOpen(false)
    }
  }

  const submitLeaveRequest = () => {
    if (selectedStaff && leaveStartDate && leaveEndDate) {
      console.log('Submitting leave request:', {
        staff: selectedStaff,
        startDate: leaveStartDate,
        endDate: leaveEndDate,
        reason: leaveReason,
      })
      // TODO: Implement actual leave request logic
      setIsLeaveModalOpen(false)
      setLeaveStartDate('')
      setLeaveEndDate('')
      setLeaveReason('')
    }
  }

  const filteredStaff = mockStaff.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.position.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === 'all' || staff.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const stats = {
    totalStaff: mockStaff.length,
    activeStaff: mockStaff.filter((s) => s.status === 'active').length,
    onLeave: mockStaff.filter((s) => s.status === 'on_leave').length,
    departments: new Set(mockStaff.map((s) => s.department)).size,
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
              <p className="mt-1 text-sm text-gray-500">Manage your hotel staff and their information</p>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
            >
              <PlusIcon className="h-5 w-5" />
              Add Staff Member
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
              <div className="flex items-center p-6">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <UserGroupIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <Text className="text-sm font-medium text-gray-500">Total Staff</Text>
                  <div className="flex items-center gap-2">
                    <Title className="text-2xl font-bold text-gray-900">
                      {stats.totalStaff}
                    </Title>
                    <span className="text-sm text-blue-600">Members</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
              <div className="flex items-center p-6">
                <div className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg">
                  <BriefcaseIcon className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="ml-4">
                  <Text className="text-sm font-medium text-gray-500">Active Staff</Text>
                  <div className="flex items-center gap-2">
                    <Title className="text-2xl font-bold text-gray-900">
                      {stats.activeStaff}
                    </Title>
                    <span className="text-sm text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Working
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
              <div className="flex items-center p-6">
                <div className="p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
                  <CalendarIcon className="h-6 w-6 text-amber-600" />
                </div>
                <div className="ml-4">
                  <Text className="text-sm font-medium text-gray-500">On Leave</Text>
                  <div className="flex items-center gap-2">
                    <Title className="text-2xl font-bold text-gray-900">
                      {stats.onLeave}
                    </Title>
                    <span className="text-sm text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                      Away
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
              <div className="flex items-center p-6">
                <div className="p-3 bg-gradient-to-br from-violet-50 to-violet-100 rounded-lg">
                  <BuildingOfficeIcon className="h-6 w-6 text-violet-600" />
                </div>
                <div className="ml-4">
                  <Text className="text-sm font-medium text-gray-500">Departments</Text>
                  <div className="flex items-center gap-2">
                    <Title className="text-2xl font-bold text-gray-900">
                      {stats.departments}
                    </Title>
                    <span className="text-xs text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="relative overflow-hidden">
          {/* Search and Filters */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:space-x-4 w-full md:w-auto">
                <div className="relative w-full md:w-96">
                  <input
                    type="text"
                    placeholder="Search by name, position, email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-xl bg-white shadow-sm 
                    focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 
                    hover:border-gray-300 transition-all duration-200 
                    placeholder-gray-400 text-gray-600"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                    >
                      <XCircleIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={FunnelIcon}
                    className="hover:bg-gray-100 transition-all duration-200 rounded-full px-4 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  >
                    Filter
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={ArrowPathIcon}
                    className="hover:bg-gray-100 transition-all duration-200 rounded-full px-4 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  >
                    Refresh
                  </Button>
                </div>
              </div>

              <TabGroup
                className="w-full md:w-auto"
                onChange={(index) => {
                  const statuses = ['all', 'active', 'on_leave', 'terminated']
                  setSelectedStatus(statuses[index] as 'all' | 'active' | 'on_leave' | 'terminated')
                }}
              >
                <TabList variant="solid" className="bg-gray-100 p-1 rounded-lg overflow-x-auto">
                  <Tab index={0}>All</Tab>
                  <Tab index={1}>Active</Tab>
                  <Tab index={2}>On Leave</Tab>
                  <Tab index={3}>Terminated</Tab>
                </TabList>
              </TabGroup>
            </div>
          </div>

          {/* Staff Table */}
          <div className="relative w-full">
            <div className="overflow-x-auto border-t border-gray-200">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                  <Table>
                    <TableHead>
                      <TableRow className="bg-gray-50">
                        <TableHeaderCell className="min-w-[200px] max-w-[250px] font-semibold">Staff Member</TableHeaderCell>
                        <TableHeaderCell className="min-w-[200px] max-w-[250px] font-semibold">Contact</TableHeaderCell>
                        <TableHeaderCell className="min-w-[120px] max-w-[150px] font-semibold">Position</TableHeaderCell>
                        <TableHeaderCell className="min-w-[120px] max-w-[150px] font-semibold">Department</TableHeaderCell>
                        <TableHeaderCell className="min-w-[120px] max-w-[150px] font-semibold">Status</TableHeaderCell>
                        <TableHeaderCell className="min-w-[120px] max-w-[150px] font-semibold">Schedule</TableHeaderCell>
                        <TableHeaderCell className="min-w-[200px] max-w-[250px] text-right font-semibold">Actions</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredStaff.map((staff) => (
                        <TableRow 
                          key={staff.id} 
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <TableCell className="min-w-[200px] max-w-[250px]">
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-900 truncate">{staff.name}</span>
                              <span className="text-sm text-gray-500 truncate">ID: {staff.id}</span>
                            </div>
                          </TableCell>
                          <TableCell className="min-w-[200px] max-w-[250px]">
                            <div className="flex flex-col">
                              <span className="text-gray-900 truncate">{staff.email}</span>
                              <span className="text-sm text-gray-500 truncate">{staff.phone}</span>
                            </div>
                          </TableCell>
                          <TableCell className="min-w-[120px] max-w-[150px]">
                            <span className="text-gray-900 capitalize truncate">
                              {staff.position.replace('_', ' ')}
                            </span>
                          </TableCell>
                          <TableCell className="min-w-[120px] max-w-[150px]">
                            <span
                              className={`
                                inline-flex px-3 py-1 rounded-full text-sm font-medium truncate
                                ${departmentColors[staff.department].bg}
                                ${departmentColors[staff.department].text}
                                ${departmentColors[staff.department].ring}
                              `}
                            >
                              {staff.department.replace('_', ' ').toUpperCase()}
                            </span>
                          </TableCell>
                          <TableCell className="min-w-[120px] max-w-[150px]">
                            <span
                              className={`
                                inline-flex px-3 py-1 rounded-full text-sm font-medium truncate
                                ${statusColors[staff.status].bg}
                                ${statusColors[staff.status].text}
                                ${statusColors[staff.status].ring}
                              `}
                            >
                              {staff.status.replace('_', ' ').charAt(0).toUpperCase() + 
                               staff.status.replace('_', ' ').slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="min-w-[120px] max-w-[150px]">
                            <div className="flex items-center gap-2">
                              <ClockIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                              <span className="text-gray-900 capitalize truncate">{staff.schedule}</span>
                            </div>
                          </TableCell>
                          <TableCell className="min-w-[200px] max-w-[250px]">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="light"
                                size="xs"
                                onClick={() => {
                                  setSelectedStaff(staff)
                                  setIsViewModalOpen(true)
                                }}
                                className="text-sm font-medium text-gray-600 hover:text-white bg-gray-50 hover:bg-gray-600 transition-all duration-200 rounded-lg px-3 py-1.5 border border-gray-200 hover:border-gray-600 shadow-sm hover:shadow"
                              >
                                View Details
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Add Staff Modal */}
      <Dialog
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative mx-auto max-w-3xl w-full bg-white rounded-xl shadow-lg max-h-[90vh] flex flex-col">
            <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-200 rounded-t-xl flex items-center justify-between">
              <Dialog.Title className="text-xl font-semibold text-gray-900">
                Add New Staff Member
              </Dialog.Title>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              <StaffForm
                onSubmit={(data) => {
                  console.log('Add staff:', data)
                  setIsAddModalOpen(false)
                }}
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* View Staff Modal */}
      <Dialog
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative mx-auto max-w-3xl w-full bg-white rounded-xl shadow-lg max-h-[90vh] flex flex-col">
            <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-200 rounded-t-xl flex items-center justify-between">
              <Dialog.Title className="text-xl font-semibold text-gray-900">
                Staff Member Details
              </Dialog.Title>
              <div className="flex items-center gap-3">
                {selectedStaff && selectedStaff.status !== 'terminated' && (
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => {
                      setIsViewModalOpen(false)
                      setIsTerminateModalOpen(true)
                    }}
                    className="text-sm font-medium text-red-600 hover:text-white bg-red-50 hover:bg-red-600 transition-all duration-200 rounded-lg px-3 py-1.5 border border-red-200 hover:border-red-600 shadow-sm hover:shadow"
                  >
                    Terminate
                  </Button>
                )}
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="overflow-y-auto flex-1">
              {selectedStaff && (
                <StaffDetails
                  staff={selectedStaff}
                  onEdit={() => setIsEditModalOpen(true)}
                />
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Edit Staff Modal */}
      <Dialog
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative mx-auto max-w-3xl w-full bg-white rounded-xl shadow-lg max-h-[90vh] flex flex-col">
            <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-200 rounded-t-xl flex items-center justify-between">
              <Dialog.Title className="text-xl font-semibold text-gray-900">
                Edit Staff Member
              </Dialog.Title>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              {selectedStaff && (
                <StaffForm
                  initialData={selectedStaff}
                  onSubmit={(data) => {
                    handleEditStaff(data)
                  }}
                />
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Terminate Confirmation Modal */}
      <Dialog
        open={isTerminateModalOpen}
        onClose={() => setIsTerminateModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative mx-auto max-w-md w-full bg-white rounded-xl shadow-lg p-6">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Confirm Termination
            </Dialog.Title>
            <div className="mt-4">
              <p className="text-gray-600">
                Are you sure you want to terminate {selectedStaff?.name}? This action cannot be undone.
              </p>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setIsTerminateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={confirmTermination}
                className="bg-red-600 hover:bg-red-700"
              >
                Confirm Termination
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Leave Request Modal */}
      <Dialog
        open={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative mx-auto max-w-md w-full bg-white rounded-xl shadow-lg p-6">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Request Leave
            </Dialog.Title>
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <DatePicker
                  id="startDate"
                  value={leaveStartDate}
                  onChange={setLeaveStartDate}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <DatePicker
                  id="endDate"
                  value={leaveEndDate}
                  onChange={setLeaveEndDate}
                />
              </div>
              <div>
                <Label htmlFor="reason">Reason for Leave</Label>
                <Textarea
                  id="reason"
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  placeholder="Please provide a reason for your leave request..."
                  className="h-24"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => {
                  setIsLeaveModalOpen(false)
                  setLeaveStartDate('')
                  setLeaveEndDate('')
                  setLeaveReason('')
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={submitLeaveRequest}
                disabled={!leaveStartDate || !leaveEndDate}
              >
                Submit Request
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
} 