'use client'

import { useState } from 'react'
import { Dialog } from "@headlessui/react"
import {
  ArrowPathIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  UserGroupIcon,
  StarIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  XCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"
import { Card } from "../../../components/ui/card"
import { Text } from "../../../components/ui/text"
import { Title } from "../../../components/ui/title"
import { Button } from "../../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../../../components/ui/table"
import { TabGroup, TabList, Tab } from "../../../components/ui/tabs"
import { GuestForm, GuestFormData, guestFormSchema } from "../../../components/guests/guest-form"
import { GuestDetails } from "../../../components/guests/guest-details"
import { z } from 'zod'

const guestSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  status: z.enum(['active', 'inactive']),
  totalStays: z.number(),
  totalSpent: z.number(),
  lastStay: z.string(),
  nextStay: z.string().nullable(),
  type: z.enum(['regular', 'vip', 'occasional']),
  nationality: z.string(),
  address: z.string(),
  preferences: z.array(z.string()),
  notes: z.string(),
})

type Guest = z.infer<typeof guestSchema>

// Mock data for guests
const mockGuests: Guest[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    totalStays: 5,
    totalSpent: 2495,
    lastStay: "2024-03-15",
    nextStay: "2024-04-20",
    type: "regular",
    nationality: "USA",
    address: "123 Main St, New York, NY",
    preferences: ["High Floor", "Non-Smoking", "King Bed"],
    notes: "VIP guest, prefers room 501",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 987-6543",
    status: "inactive",
    totalStays: 2,
    totalSpent: 898,
    lastStay: "2023-12-10",
    nextStay: null,
    type: "occasional",
    nationality: "Canada",
    address: "456 Oak Ave, Toronto, ON",
    preferences: ["Quiet Room", "Extra Pillows"],
    notes: "Allergic to feathers",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "+1 (555) 456-7890",
    status: "active",
    totalStays: 12,
    totalSpent: 8997,
    lastStay: "2024-03-01",
    nextStay: "2024-05-15",
    type: "vip",
    nationality: "UK",
    address: "789 Park Lane, London",
    preferences: ["Suite Only", "Airport Transfer", "Late Checkout"],
    notes: "Corporate account, requires invoice",
  },
]

const statusColors = {
  active: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    ring: 'ring-1 ring-green-600/20'
  },
  inactive: {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    ring: 'ring-1 ring-gray-600/20'
  },
} as const

const guestTypeColors = {
  vip: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    ring: 'ring-1 ring-purple-600/20'
  },
  regular: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    ring: 'ring-1 ring-blue-600/20'
  },
  occasional: {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    ring: 'ring-1 ring-gray-600/20'
  },
} as const

export default function GuestsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)

  const filteredGuests = mockGuests.filter((guest) => {
    const matchesSearch =
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.phone.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === 'all' || guest.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const stats = {
    totalGuests: mockGuests.length,
    activeGuests: mockGuests.filter((g) => g.status === 'active').length,
    vipGuests: mockGuests.filter((g) => g.type === 'vip').length,
    upcomingStays: mockGuests.filter((g) => g.nextStay).length,
  }

  const handleAddGuest = (data: GuestFormData) => {
    // Here you would typically make an API call to save the guest
    console.log('New guest data:', data)
    setIsAddModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Guest Management</h1>
              <p className="mt-1 text-sm text-gray-500">Manage your hotel guests and their profiles</p>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
            >
              <PlusIcon className="h-5 w-5" />
              Add Guest
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
              <div className="flex items-center p-6">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <UserGroupIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <Text className="text-sm font-medium text-gray-500">Total Guests</Text>
                  <div className="flex items-center gap-2">
                    <Title className="text-2xl font-bold text-gray-900">
                      {stats.totalGuests}
                    </Title>
                    <span className="text-sm text-blue-600">Guests</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
              <div className="flex items-center p-6">
                <div className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg">
                  <BuildingOfficeIcon className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="ml-4">
                  <Text className="text-sm font-medium text-gray-500">Active</Text>
                  <div className="flex items-center gap-2">
                    <Title className="text-2xl font-bold text-gray-900">
                      {stats.activeGuests}
                    </Title>
                    <span className="text-sm text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Current
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
              <div className="flex items-center p-6">
                <div className="p-3 bg-gradient-to-br from-violet-50 to-violet-100 rounded-lg">
                  <StarIcon className="h-6 w-6 text-violet-600" />
                </div>
                <div className="ml-4">
                  <Text className="text-sm font-medium text-gray-500">VIP Guests</Text>
                  <div className="flex items-center gap-2">
                    <Title className="text-2xl font-bold text-gray-900">
                      {stats.vipGuests}
                    </Title>
                    <span className="text-sm text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
                      Premium
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
              <div className="flex items-center p-6">
                <div className="p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
                  <ClockIcon className="h-6 w-6 text-amber-600" />
                </div>
                <div className="ml-4">
                  <Text className="text-sm font-medium text-gray-500">Upcoming Stays</Text>
                  <div className="flex items-center gap-2">
                    <Title className="text-2xl font-bold text-gray-900">
                      {stats.upcomingStays}
                    </Title>
                    <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                      Booked
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="mt-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 border-b border-gray-200">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative w-full md:max-w-md">
                <input
                  type="text"
                  placeholder="Search by name, email, phone..."
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
              <div className="hidden md:flex gap-2">
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
                const statuses = ['all', 'active', 'inactive']
                setSelectedStatus(statuses[index] as 'all' | 'active' | 'inactive')
              }}
            >
              <TabList variant="solid" className="bg-gray-100 p-1 rounded-lg overflow-x-auto">
                <Tab index={0}>All</Tab>
                <Tab index={1}>Active</Tab>
                <Tab index={2}>Inactive</Tab>
              </TabList>
            </TabGroup>
          </div>

          {/* Guests Table */}
          <div className="overflow-hidden">
            <Table>
              <TableHead>
                <TableRow className="bg-gray-50">
                  <TableHeaderCell className="font-semibold">Guest</TableHeaderCell>
                  <TableHeaderCell className="font-semibold">Contact</TableHeaderCell>
                  <TableHeaderCell className="font-semibold">Status</TableHeaderCell>
                  <TableHeaderCell className="font-semibold">Type</TableHeaderCell>
                  <TableHeaderCell className="font-semibold">Stays</TableHeaderCell>
                  <TableHeaderCell className="font-semibold">Total Spent</TableHeaderCell>
                  <TableHeaderCell className="text-right font-semibold">Actions</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredGuests.map((guest) => (
                  <TableRow 
                    key={guest.id} 
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <TableCell className="max-w-[200px]">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{guest.name}</span>
                        <span className="text-sm text-gray-500 truncate">{guest.nationality}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-gray-900 truncate">{guest.email}</span>
                        <span className="text-sm text-gray-500">{guest.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`
                          inline-flex px-3 py-1 rounded-full text-sm font-medium
                          ${statusColors[guest.status as keyof typeof statusColors].bg}
                          ${statusColors[guest.status as keyof typeof statusColors].text}
                          ${statusColors[guest.status as keyof typeof statusColors].ring}
                        `}
                      >
                        {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`
                          inline-flex px-3 py-1 rounded-full text-sm font-medium
                          ${guestTypeColors[guest.type as keyof typeof guestTypeColors].bg}
                          ${guestTypeColors[guest.type as keyof typeof guestTypeColors].text}
                          ${guestTypeColors[guest.type as keyof typeof guestTypeColors].ring}
                        `}
                      >
                        {guest.type.toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-900">{guest.totalStays} stays</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-900 font-medium">${guest.totalSpent}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="light"
                          size="xs"
                          onClick={() => {
                            setSelectedGuest(guest)
                            setIsViewModalOpen(true)
                          }}
                          className="text-sm font-medium text-gray-600 hover:text-white bg-gray-50 hover:bg-gray-600 transition-all duration-200 rounded-lg px-3 py-1.5 border border-gray-200 hover:border-gray-600 shadow-sm hover:shadow"
                        >
                          View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Add Guest Modal */}
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
                Add New Guest
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
              <GuestForm
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddGuest}
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* View Guest Modal */}
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
                Guest Details
              </Dialog.Title>
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
            <div className="overflow-y-auto flex-1">
              {selectedGuest && <GuestDetails guest={selectedGuest} />}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
} 