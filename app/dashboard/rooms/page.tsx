'use client'

import { useState } from 'react'
import { Dialog } from "@headlessui/react"
import {
  ArrowPathIcon,
  CurrencyDollarIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
  HomeIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline"
import { Card } from "../../../components/ui/card"
import { Text } from "../../../components/ui/text"
import { Title } from "../../../components/ui/title"
import { Button } from "../../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../../../components/ui/table"
import { TabGroup, TabList, Tab } from "../../../components/ui/tabs"
import { RoomForm } from "../../../components/rooms/room-form"
import { RoomDetails } from "../../../components/rooms/room-details"
import type { Room } from "../../../types"

// Mock data
const mockRooms: Room[] = [
  {
    id: "1",
    number: "101",
    type: "Deluxe Suite",
    status: "available",
    floor: 1,
    capacity: 2,
    price: 299,
    amenities: ["Ocean View", "King Bed", "Mini Bar", "Balcony"],
    bedType: "King",
    size: "45 m²",
    description: "Luxurious suite with ocean view and private balcony",
    maxOccupancy: 3,
    basePrice: 299,
    weekendPrice: 349,
    seasonalPrice: 399
  },
  {
    id: "2",
    number: "205",
    type: "Executive Room",
    status: "occupied",
    floor: 2,
    capacity: 2,
    price: 199,
    amenities: ["City View", "Queen Bed", "Work Desk"],
    bedType: "Queen",
    size: "35 m²",
    description: "Comfortable room with modern amenities and city view",
    maxOccupancy: 2,
    basePrice: 199,
    weekendPrice: 249,
    seasonalPrice: 299
  },
  {
    id: "3",
    number: "304",
    type: "Presidential Suite",
    status: "maintenance",
    floor: 3,
    capacity: 4,
    price: 599,
    amenities: ["Ocean View", "King Bed", "Jacuzzi", "Kitchen", "Living Room"],
    bedType: "King",
    size: "120 m²",
    description: "Our finest suite with separate living area and premium amenities",
    maxOccupancy: 6,
    basePrice: 599,
    weekendPrice: 699,
    seasonalPrice: 799
  },
]

const statusColors = {
  available: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    ring: 'ring-1 ring-green-600/20'
  },
  occupied: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    ring: 'ring-1 ring-blue-600/20'
  },
  maintenance: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    ring: 'ring-1 ring-amber-600/20'
  },
  cleaning: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    ring: 'ring-1 ring-purple-600/20'
  },
  reserved: {
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    ring: 'ring-1 ring-violet-600/20'
  }
} as const

// Add date formatting utility
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export default function RoomsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  const filteredRooms = mockRooms.filter((room) => {
    const matchesSearch =
      room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === 'all' || room.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const stats = {
    totalRooms: mockRooms.length,
    availableRooms: mockRooms.filter((r) => r.status === 'available').length,
    occupiedRooms: mockRooms.filter((r) => r.status === 'occupied').length,
    maintenanceRooms: mockRooms.filter((r) => r.status === 'maintenance').length,
  }

  const handleAddRoom = (data: Partial<Room>) => {
    // Handle adding new room
    console.log("Adding new room:", data)
  }

  const handleEditRoom = (data: Partial<Room>) => {
    // Handle editing room
    console.log("Editing room:", data)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Rooms Management</h1>
              <p className="mt-1 text-sm text-gray-500">Manage your hotel rooms and their availability</p>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
            >
              <PlusIcon className="h-5 w-5" />
              Add New Room
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
              <div className="flex items-center p-6">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <HomeIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <Text className="text-sm font-medium text-gray-500">Total Rooms</Text>
                  <div className="flex items-center gap-2">
                    <Title className="text-2xl font-bold text-gray-900">
                      {stats.totalRooms}
                    </Title>
                    <span className="text-sm text-blue-600">Units</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
              <div className="flex items-center p-6">
                <div className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg">
                  <CheckCircleIcon className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="ml-4">
                  <Text className="text-sm font-medium text-gray-500">Available</Text>
                  <div className="flex items-center gap-2">
                    <Title className="text-2xl font-bold text-gray-900">
                      {stats.availableRooms}
                    </Title>
                    <span className="text-sm text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {Math.round((stats.availableRooms / stats.totalRooms) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
              <div className="flex items-center p-6">
                <div className="p-3 bg-gradient-to-br from-violet-50 to-violet-100 rounded-lg">
                  <ClockIcon className="h-6 w-6 text-violet-600" />
                </div>
                <div className="ml-4">
                  <Text className="text-sm font-medium text-gray-500">Occupied</Text>
                  <div className="flex items-center gap-2">
                    <Title className="text-2xl font-bold text-gray-900">
                      {stats.occupiedRooms}
                    </Title>
                    <span className="text-sm text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
              <div className="flex items-center p-6">
                <div className="p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
                  <WrenchScrewdriverIcon className="h-6 w-6 text-amber-600" />
                </div>
                <div className="ml-4">
                  <Text className="text-sm font-medium text-gray-500">Maintenance</Text>
                  <div className="flex items-center gap-2">
                    <Title className="text-2xl font-bold text-gray-900">
                      {stats.maintenanceRooms}
                    </Title>
                    <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                      In Progress
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
                  placeholder="Search by room number or type..."
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
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
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
                const statuses = ['all', 'available', 'occupied', 'maintenance', 'cleaning']
                setSelectedStatus(statuses[index])
              }}
            >
              <TabList variant="solid" className="bg-gray-100 p-1 rounded-lg overflow-x-auto">
                <Tab index={0}>All</Tab>
                <Tab index={1}>Available</Tab>
                <Tab index={2}>Occupied</Tab>
                <Tab index={3}>Maintenance</Tab>
                <Tab index={4}>Cleaning</Tab>
              </TabList>
            </TabGroup>
          </div>

          {/* Rooms Table */}
          <div className="overflow-hidden">
            <Table>
              <TableHead>
                <TableRow className="bg-gray-50">
                  <TableHeaderCell className="font-semibold">Room</TableHeaderCell>
                  <TableHeaderCell className="font-semibold">Type</TableHeaderCell>
                  <TableHeaderCell className="font-semibold">Status</TableHeaderCell>
                  <TableHeaderCell className="font-semibold">Floor</TableHeaderCell>
                  <TableHeaderCell className="font-semibold">Capacity</TableHeaderCell>
                  <TableHeaderCell className="font-semibold">Price</TableHeaderCell>
                  <TableHeaderCell className="text-right font-semibold">Actions</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRooms.map((room) => (
                  <TableRow 
                    key={room.id} 
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <TableCell className="max-w-[200px]">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">Room {room.number}</span>
                        <span className="text-sm text-gray-500 truncate">
                          {room.amenities.slice(0, 2).join(', ')}
                          {room.amenities.length > 2 && '...'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[150px]">
                      <span className="text-gray-900 truncate block">{room.type}</span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`
                          inline-flex px-3 py-1 rounded-full text-sm font-medium
                          ${statusColors[room.status].bg}
                          ${statusColors[room.status].text}
                          ${statusColors[room.status].ring}
                        `}
                      >
                        {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600">Floor {room.floor}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600">{room.capacity} Guests</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <CurrencyDollarIcon className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-900 font-medium">{room.price}</span>
                        <span className="text-gray-500 text-sm">/night</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="light"
                          size="xs"
                          onClick={() => {
                            setSelectedRoom(room)
                            setIsEditModalOpen(true)
                          }}
                          className="text-sm font-medium text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 transition-all duration-200 rounded-lg px-3 py-1.5 border border-blue-200 hover:border-blue-600 shadow-sm hover:shadow"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="light"
                          size="xs"
                          onClick={() => {
                            setSelectedRoom(room)
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

      {/* Add Room Modal */}
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
                New Room
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
              <RoomForm
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddRoom}
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* View Room Modal */}
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
                Room Details
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
              {selectedRoom && (
                <RoomDetails 
                  room={selectedRoom}
                  onStatusChange={(roomId, newStatus) => {
                    console.log(`Room ${roomId} status updated to ${newStatus}`)
                    setIsViewModalOpen(false)
                  }}
                />
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Edit Room Modal */}
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
                Edit Room
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
              <RoomForm
                initialData={selectedRoom || undefined}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleEditRoom}
                mode="edit"
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
} 