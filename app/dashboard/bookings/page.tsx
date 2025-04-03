'use client'

import { useState } from 'react'
import { Dialog } from "@headlessui/react"
import {
  ArrowPathIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  CheckBadgeIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline"
import { Card } from "../../../components/ui/card"
import { Text } from "../../../components/ui/text"
import { Title } from "../../../components/ui/title"
import { Button } from "../../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../../../components/ui/table"
import { TabGroup, TabList, Tab } from "../../../components/ui/tabs"
import { BookingForm, BookingFormData } from "../../../components/bookings/booking-form"
import { BookingDetails } from "../../../components/bookings/booking-details"

interface Booking extends BookingFormData {
  id: string
  status: 'confirmed' | 'pending' | 'checked-in' | 'checked-out' | 'cancelled'
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded'
}

// Mock data for bookings
const mockBookings: Booking[] = [
  {
    id: "1",
    guestName: "John Smith",
    roomNumber: "101",
    roomType: "Deluxe Suite",
    checkIn: "2024-03-20",
    checkOut: "2024-03-25",
    status: "confirmed",
    guests: 2,
    totalAmount: 1495,
    paymentStatus: "paid",
    specialRequests: "Early check-in requested",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567"
  },
  {
    id: "2",
    guestName: "Sarah Johnson",
    roomNumber: "205",
    roomType: "Executive Room",
    checkIn: "2024-03-22",
    checkOut: "2024-03-24",
    status: "pending",
    guests: 1,
    totalAmount: 398,
    paymentStatus: "pending",
    specialRequests: "High floor preferred",
    email: "sarah.j@example.com",
    phone: "+1 (555) 987-6543"
  },
  {
    id: "3",
    guestName: "Michael Brown",
    roomNumber: "304",
    roomType: "Presidential Suite",
    checkIn: "2024-03-18",
    checkOut: "2024-03-21",
    status: "checked-in",
    guests: 4,
    totalAmount: 1797,
    paymentStatus: "paid",
    specialRequests: "Airport transfer needed",
    email: "michael.b@example.com",
    phone: "+1 (555) 456-7890"
  },
]

const statusColors = {
  confirmed: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    ring: 'ring-1 ring-green-600/20'
  },
  pending: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    ring: 'ring-1 ring-yellow-600/20'
  },
  'checked-in': {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    ring: 'ring-1 ring-blue-600/20'
  },
  'checked-out': {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    ring: 'ring-1 ring-gray-600/20'
  },
  cancelled: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    ring: 'ring-1 ring-red-600/20'
  }
} as const

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<'all' | Booking['status']>('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomType.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const stats = {
    totalBookings: mockBookings.length,
    confirmedBookings: mockBookings.filter((b) => b.status === 'confirmed').length,
    checkedInGuests: mockBookings.filter((b) => b.status === 'checked-in').length,
    pendingBookings: mockBookings.filter((b) => b.status === 'pending').length,
  }

  const handleAddBooking = (data: any) => {
    console.log('Adding new booking:', data)
    setIsAddModalOpen(false)
  }

  const handleEditBooking = (data: any) => {
    console.log('Editing booking:', data)
    setIsEditModalOpen(false)
  }

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    // In a real app, this would make an API call to update the status
    const updatedBookings = mockBookings.map(booking => {
      if (booking.id === bookingId) {
        return {
          ...booking,
          status: newStatus as Booking['status']
        }
      }
      return booking
    })
    
    // For demo purposes, we'll just log the change
    console.log(`Booking ${bookingId} status updated to ${newStatus}`)
    setIsViewModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bookings Management</h1>
              <p className="mt-1 text-sm text-gray-500">Manage your hotel bookings and reservations</p>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
            >
              <PlusIcon className="h-5 w-5" />
              New Booking
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
              <div className="flex items-center p-6">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <CalendarDaysIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <Text className="text-sm font-medium text-gray-500">Total Bookings</Text>
                  <div className="flex items-center gap-2">
                    <Title className="text-2xl font-bold text-gray-900">
                      {stats.totalBookings}
                    </Title>
                    <span className="text-sm text-blue-600">Bookings</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
              <div className="flex items-center p-6">
                <div className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg">
                  <CheckBadgeIcon className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="ml-4">
                  <Text className="text-sm font-medium text-gray-500">Confirmed</Text>
                  <div className="flex items-center gap-2">
                    <Title className="text-2xl font-bold text-gray-900">
                      {stats.confirmedBookings}
                    </Title>
                    <span className="text-sm text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
              <div className="flex items-center p-6">
                <div className="p-3 bg-gradient-to-br from-violet-50 to-violet-100 rounded-lg">
                  <UserGroupIcon className="h-6 w-6 text-violet-600" />
                </div>
                <div className="ml-4">
                  <Text className="text-sm font-medium text-gray-500">Checked In</Text>
                  <div className="flex items-center gap-2">
                    <Title className="text-2xl font-bold text-gray-900">
                      {stats.checkedInGuests}
                    </Title>
                    <span className="text-sm text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
                      Guests
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
                  <Text className="text-sm font-medium text-gray-500">Pending</Text>
                  <div className="flex items-center gap-2">
                    <Title className="text-2xl font-bold text-gray-900">
                      {stats.pendingBookings}
                    </Title>
                    <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                      Awaiting
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
                  placeholder="Search by guest, room number..."
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
                const statuses = ['all', 'confirmed', 'pending', 'checked-in', 'checked-out', 'cancelled']
                setSelectedStatus(statuses[index] as Booking['status'])
              }}
            >
              <TabList variant="solid" className="bg-gray-100 p-1 rounded-lg overflow-x-auto">
                <Tab index={0}>All</Tab>
                <Tab index={1}>Confirmed</Tab>
                <Tab index={2}>Pending</Tab>
                <Tab index={3}>Checked In</Tab>
                <Tab index={4}>Checked Out</Tab>
                <Tab index={5}>Cancelled</Tab>
              </TabList>
            </TabGroup>
          </div>

          {/* Bookings Table */}
          <div className="overflow-hidden">
            <Table>
              <TableHead>
                <TableRow className="bg-gray-50">
                  <TableHeaderCell className="font-semibold">Guest</TableHeaderCell>
                  <TableHeaderCell className="font-semibold">Room</TableHeaderCell>
                  <TableHeaderCell className="font-semibold">Check In</TableHeaderCell>
                  <TableHeaderCell className="font-semibold">Check Out</TableHeaderCell>
                  <TableHeaderCell className="font-semibold">Status</TableHeaderCell>
                  <TableHeaderCell className="font-semibold">Payment</TableHeaderCell>
                  <TableHeaderCell className="text-right font-semibold">Actions</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow 
                    key={booking.id} 
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <TableCell className="max-w-[200px]">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{booking.guestName}</span>
                        <span className="text-sm text-gray-500 truncate">{booking.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-gray-900">Room {booking.roomNumber}</span>
                        <span className="text-sm text-gray-500">{booking.roomType}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-900">{new Date(booking.checkIn).toLocaleDateString()}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-900">{new Date(booking.checkOut).toLocaleDateString()}</span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`
                          inline-flex px-3 py-1 rounded-full text-sm font-medium
                          ${statusColors[booking.status as keyof typeof statusColors].bg}
                          ${statusColors[booking.status as keyof typeof statusColors].text}
                          ${statusColors[booking.status as keyof typeof statusColors].ring}
                        `}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <CurrencyDollarIcon className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-900 font-medium">{booking.totalAmount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="light"
                          size="xs"
                          onClick={() => {
                            setSelectedBooking(booking)
                            setIsEditModalOpen(true)
                          }}
                          className="text-sm font-medium text-gray-600 hover:text-white bg-gray-50 hover:bg-blue-600 transition-all duration-200 rounded-lg px-3 py-1.5 border border-gray-200 hover:border-blue-600 shadow-sm hover:shadow"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="light"
                          size="xs"
                          onClick={() => {
                            setSelectedBooking(booking)
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

      {/* Add Booking Modal */}
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
                New Booking
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
              <BookingForm
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddBooking}
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* View Booking Modal */}
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
                Booking Details
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
              {selectedBooking && (
                <BookingDetails 
                  booking={selectedBooking} 
                  onStatusChange={handleStatusChange}
                />
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Edit Booking Modal */}
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
                Edit Booking
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
              <BookingForm
                initialData={selectedBooking || undefined}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleEditBooking}
                mode="edit"
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
} 