'use client'

import { useState } from 'react'
import {
  Card,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  Badge,
  Select,
  SelectItem,
  Dialog,
} from '@tremor/react'
import {
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  CheckBadgeIcon,
  XCircleIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  StarIcon,
} from '@heroicons/react/24/outline'

interface Customer {
  id: number
  name: string
  owner: string
  email: string
  phone: string
  location: string
  subscription: 'Enterprise' | 'Professional' | 'Basic'
  status: 'active' | 'inactive' | 'pending'
  lastActive: string
  properties: number
  joinDate: string
  hotels: Array<{
    id: number
    name: string
    location: string
    rooms: number
    rating: number
    status: 'operational' | 'maintenance' | 'closed'
  }>
}

// Mock data for hotels/customers
const initialCustomers: Customer[] = [
  {
    id: 1,
    name: 'Luxury Resort & Spa',
    owner: 'John Smith',
    email: 'john@luxuryresort.com',
    phone: '+1 (555) 123-4567',
    location: 'Miami, FL',
    subscription: 'Enterprise',
    status: 'active',
    lastActive: '2 minutes ago',
    properties: 3,
    joinDate: 'Jan 15, 2024',
    hotels: [
      {
        id: 101,
        name: 'Luxury Resort Miami Beach',
        location: 'Miami Beach, FL',
        rooms: 250,
        rating: 4.8,
        status: 'operational'
      },
      {
        id: 102,
        name: 'Luxury Resort Downtown',
        location: 'Miami Downtown, FL',
        rooms: 180,
        rating: 4.6,
        status: 'operational'
      },
      {
        id: 103,
        name: 'Luxury Resort Keys',
        location: 'Key West, FL',
        rooms: 120,
        rating: 4.7,
        status: 'maintenance'
      }
    ]
  },
  {
    id: 2,
    name: 'Oceanview Hotels Group',
    owner: 'Sarah Johnson',
    email: 'sarah@oceanview.com',
    phone: '+1 (555) 234-5678',
    location: 'Los Angeles, CA',
    subscription: 'Professional',
    status: 'active',
    lastActive: '1 hour ago',
    properties: 5,
    joinDate: 'Dec 10, 2023',
    hotels: [
      {
        id: 201,
        name: 'Oceanview Santa Monica',
        location: 'Santa Monica, CA',
        rooms: 200,
        rating: 4.5,
        status: 'operational'
      },
      {
        id: 202,
        name: 'Oceanview Venice Beach',
        location: 'Venice Beach, CA',
        rooms: 150,
        rating: 4.3,
        status: 'operational'
      },
      {
        id: 203,
        name: 'Oceanview Malibu',
        location: 'Malibu, CA',
        rooms: 100,
        rating: 4.9,
        status: 'operational'
      },
      {
        id: 204,
        name: 'Oceanview Long Beach',
        location: 'Long Beach, CA',
        rooms: 180,
        rating: 4.4,
        status: 'maintenance'
      },
      {
        id: 205,
        name: 'Oceanview Newport',
        location: 'Newport Beach, CA',
        rooms: 160,
        rating: 4.7,
        status: 'operational'
      }
    ]
  },
  {
    id: 3,
    name: 'Mountain Lodge Chain',
    owner: 'Michael Brown',
    email: 'michael@mountainlodge.com',
    phone: '+1 (555) 345-6789',
    location: 'Denver, CO',
    subscription: 'Basic',
    status: 'inactive',
    lastActive: '3 days ago',
    properties: 2,
    joinDate: 'Feb 1, 2024',
    hotels: [
      {
        id: 301,
        name: 'Mountain Lodge Aspen',
        location: 'Aspen, CO',
        rooms: 120,
        rating: 4.6,
        status: 'closed'
      },
      {
        id: 302,
        name: 'Mountain Lodge Vail',
        location: 'Vail, CO',
        rooms: 150,
        rating: 4.8,
        status: 'operational'
      }
    ]
  },
  // Add more mock data as needed
]

const statusColors = {
  active: 'emerald',
  inactive: 'red',
  pending: 'yellow',
} as const

const subscriptionColors = {
  Enterprise: 'indigo',
  Professional: 'violet',
  Basic: 'blue',
} as const

export default function CustomersPage() {
  const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterSubscription, setFilterSubscription] = useState('all')
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [confirmAction, setConfirmAction] = useState<{
    type: 'activate' | 'deactivate'
    customerId: number
  } | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  const filteredCustomers = customers.filter(customer => {
    if (filterStatus !== 'all' && customer.status !== filterStatus) return false
    if (filterSubscription !== 'all' && customer.subscription !== filterSubscription) return false
    return true
  })

  // Handle status change
  const handleStatusChange = (customerId: number, newStatus: 'active' | 'inactive') => {
    setCustomers(prevCustomers =>
      prevCustomers.map(customer =>
        customer.id === customerId
          ? { ...customer, status: newStatus }
          : customer
      )
    )
    setIsConfirmDialogOpen(false)
    setConfirmAction(null)
  }

  // Handle refresh
  const handleRefresh = (customerId: number) => {
    // Here you would typically fetch updated data from the server
    console.log('Refreshing customer:', customerId)
  }

  // Handle view details
  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsDetailsModalOpen(true)
  }

  const CustomerCard = ({ customer }: { customer: Customer }) => (
    <Card className="relative group hover:shadow-lg transition-all duration-200 pb-16">
      {/* Status Badges */}
      <div className="absolute top-4 right-4 flex space-x-2">
        <Badge size="xs" color={statusColors[customer.status as keyof typeof statusColors]}>
          {customer.status}
        </Badge>
        <Badge size="xs" color={subscriptionColors[customer.subscription as keyof typeof subscriptionColors]}>
          {customer.subscription}
        </Badge>
      </div>
      
      {/* Header Section */}
      <div className="flex items-start space-x-4 mb-6 pt-2">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <BuildingOfficeIcon className="w-6 h-6 text-gray-500" />
        </div>
        <div className="flex-1 min-w-0 pr-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
            {customer.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            Owned by {customer.owner}
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <div className="min-w-0">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-2">
            <EnvelopeIcon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{customer.email}</span>
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-2">
            <PhoneIcon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{customer.phone}</span>
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-2">
            <MapPinIcon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{customer.location}</span>
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-2">
            <ClockIcon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Last active {customer.lastActive}</span>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex justify-between items-center text-sm">
          <Text className="font-medium">{customer.properties} Properties</Text>
          <Text className="text-gray-500">Joined {customer.joinDate}</Text>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white to-transparent dark:from-gray-800 dark:via-gray-800 dark:to-transparent">
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleViewDetails(customer)}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              View Details
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleRefresh(customer.id)}
              className="p-1.5 rounded-full text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Refresh"
            >
              <ArrowPathIcon className="w-5 h-5" />
            </button>
            {customer.status === 'active' ? (
              <button
                onClick={() => {
                  setConfirmAction({ type: 'deactivate', customerId: customer.id })
                  setIsConfirmDialogOpen(true)
                }}
                className="p-1.5 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                title="Deactivate"
              >
                <XCircleIcon className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setConfirmAction({ type: 'activate', customerId: customer.id })
                  setIsConfirmDialogOpen(true)
                }}
                className="p-1.5 rounded-full text-gray-500 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                title="Activate"
              >
                <CheckBadgeIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )

  const CustomerDetailsModal = ({ customer }: { customer: Customer }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <BuildingOfficeIcon className="w-8 h-8 text-gray-500" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {customer.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Owned by {customer.owner}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDetailsModalOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Status and Subscription */}
        <div className="flex space-x-4 mb-6">
          <Badge
            size="lg"
            color={statusColors[customer.status as keyof typeof statusColors]}
          >
            {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
          </Badge>
          <Badge
            size="lg"
            color={subscriptionColors[customer.subscription as keyof typeof subscriptionColors]}
          >
            {customer.subscription} Plan
          </Badge>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                <PhoneIcon className="w-5 h-5 text-gray-400" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                <MapPinIcon className="w-5 h-5 text-gray-400" />
                <span>{customer.location}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Account Details
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">Properties</span>
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  {customer.properties}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">Join Date</span>
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  {customer.joinDate}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">Last Active</span>
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  {customer.lastActive}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hotels Section */}
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Hotels & Properties
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {customer?.hotels?.length > 0 ? (
              customer.hotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="text-base font-medium text-gray-900 dark:text-gray-100">
                        {hotel.name}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPinIcon className="w-4 h-4" />
                          {hotel.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <BuildingOfficeIcon className="w-4 h-4" />
                          {hotel.rooms} Rooms
                        </span>
                        <span className="flex items-center gap-1">
                          <StarIcon className="w-4 h-4 text-yellow-400" />
                          {hotel.rating}
                        </span>
                      </div>
                    </div>
                    <Badge
                      size="sm"
                      color={
                        hotel.status === 'operational'
                          ? 'emerald'
                          : hotel.status === 'maintenance'
                          ? 'yellow'
                          : 'red'
                      }
                    >
                      {hotel.status}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                No hotels found for this customer.
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setIsDetailsModalOpen(false)
                  if (customer.status === 'active') {
                    setConfirmAction({ type: 'deactivate', customerId: customer.id })
                  } else {
                    setConfirmAction({ type: 'activate', customerId: customer.id })
                  }
                  setIsConfirmDialogOpen(true)
                }}
                className={`px-4 py-2 rounded-lg text-white transition-colors ${
                  customer.status === 'active'
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-emerald-500 hover:bg-emerald-600'
                }`}
              >
                {customer.status === 'active' ? 'Deactivate Account' : 'Activate Account'}
              </button>
              <button
                onClick={() => handleRefresh(customer.id)}
                className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Refresh Data
              </button>
            </div>
            <button
              onClick={() => setIsDetailsModalOpen(false)}
              className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const CustomerListItem = ({ customer }: { customer: Customer }) => (
    <div className="relative group hover:bg-gray-50 dark:hover:bg-gray-800/50 p-4 rounded-xl transition-colors">
      <div className="flex items-center gap-4">
        {/* Customer Icon and Basic Info */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <BuildingOfficeIcon className="w-6 h-6 text-gray-500" />
        </div>
        
        {/* Main Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
              {customer.name}
            </h3>
            <Badge size="xs" color={statusColors[customer.status as keyof typeof statusColors]}>
              {customer.status}
            </Badge>
            <Badge size="xs" color={subscriptionColors[customer.subscription as keyof typeof subscriptionColors]}>
              {customer.subscription}
            </Badge>
          </div>
          <div className="mt-1 flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <EnvelopeIcon className="w-4 h-4" />
              <span className="truncate">{customer.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <MapPinIcon className="w-4 h-4" />
              <span className="truncate">{customer.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <ClockIcon className="w-4 h-4" />
              <span className="truncate">Last active {customer.lastActive}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleViewDetails(customer)}
            className="px-3 py-1.5 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            View Details
          </button>
          <button
            onClick={() => handleRefresh(customer.id)}
            className="p-1.5 rounded-full text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Refresh"
          >
            <ArrowPathIcon className="w-5 h-5" />
          </button>
          {customer.status === 'active' ? (
            <button
              onClick={() => {
                setConfirmAction({ type: 'deactivate', customerId: customer.id })
                setIsConfirmDialogOpen(true)
              }}
              className="p-1.5 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              title="Deactivate"
            >
              <XCircleIcon className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => {
                setConfirmAction({ type: 'activate', customerId: customer.id })
                setIsConfirmDialogOpen(true)
              }}
              className="p-1.5 rounded-full text-gray-500 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
              title="Activate"
            >
              <CheckBadgeIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Title>Customer Management</Title>
            <Text>Manage your hotel properties and their owners</Text>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Add New Customer
          </button>
        </div>

        <Card className="overflow-visible">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <TabGroup 
              className="sm:w-1/3"
              index={selectedView === 'grid' ? 0 : 1}
              onIndexChange={(index) => setSelectedView(index === 0 ? 'grid' : 'list')}
            >
              <TabList variant="solid">
                <Tab icon={BuildingOfficeIcon}>Grid</Tab>
                <Tab icon={BuildingOfficeIcon}>List</Tab>
              </TabList>
            </TabGroup>

            <div className="flex flex-col sm:flex-row gap-4">
              <Select
                value={filterStatus}
                onValueChange={setFilterStatus}
                className="w-full sm:w-40"
              >
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </Select>

              <Select
                value={filterSubscription}
                onValueChange={setFilterSubscription}
                className="w-full sm:w-48"
              >
                <SelectItem value="all">All Subscriptions</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Basic">Basic</SelectItem>
              </Select>
            </div>
          </div>

          {selectedView === 'grid' ? (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCustomers.map((customer) => (
                <CustomerCard key={customer.id} customer={customer} />
              ))}
            </div>
          ) : (
            <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCustomers.map((customer) => (
                <CustomerListItem key={customer.id} customer={customer} />
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Details Modal - Render at root level */}
      {isDetailsModalOpen && selectedCustomer && (
        <CustomerDetailsModal customer={selectedCustomer} />
      )}

      {/* Confirmation Dialog - Render at root level */}
      {isConfirmDialogOpen && confirmAction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 text-yellow-500 dark:text-yellow-400">
              <ExclamationTriangleIcon className="h-6 w-6" />
              <h3 className="text-lg font-semibold">Confirm Action</h3>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Are you sure you want to {confirmAction.type === 'activate' ? 'activate' : 'deactivate'} this customer?
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsConfirmDialogOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatusChange(
                  confirmAction.customerId,
                  confirmAction.type === 'activate' ? 'active' : 'inactive'
                )}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                  confirmAction.type === 'activate'
                    ? 'bg-emerald-500 hover:bg-emerald-600'
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 