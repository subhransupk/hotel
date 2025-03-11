'use client'

import { useState } from 'react'
import { Dialog } from "@headlessui/react"
import {
  Card,
  Title,
  Text,
  TabGroup,
  TabList,
  Tab,
  Badge,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@tremor/react'
import {
  MagnifyingGlassIcon,
  PlusIcon,
  FunnelIcon,
  ArrowPathIcon,
  UserGroupIcon,
  CheckCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChartBarIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import { LeadForm, LeadFormData } from '@/components/leads/lead-form'
import { LeadDetails, Lead } from '@/components/leads/lead-details'

// Mock data - replace with actual data fetching
const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@email.com',
    phone: '+1 234 567 8900',
    status: 'new',
    source: 'website',
    notes: 'Ocean view room for family vacation',
    budget: 5000,
    preferredContactMethod: 'email',
    followUpDate: '2024-04-15',
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah@email.com',
    phone: '+1 345 678 9012',
    status: 'qualified',
    source: 'referral',
    notes: 'Business stay with meeting room access',
    budget: 3000,
    preferredContactMethod: 'phone',
    followUpDate: '2024-05-20',
    createdAt: '2024-03-14T10:00:00Z',
    updatedAt: '2024-03-14T15:00:00Z'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@email.com',
    phone: '+1 456 789 0123',
    status: 'proposal',
    source: 'social_media',
    notes: 'Luxury stay with all amenities',
    budget: 10000,
    preferredContactMethod: 'email',
    followUpDate: '2024-06-01',
    createdAt: '2024-03-13T10:00:00Z',
    updatedAt: '2024-03-13T16:30:00Z'
  },
]

const statusColors = {
  new: 'blue',
  contacted: 'yellow',
  qualified: 'emerald',
  proposal: 'purple',
  negotiation: 'orange',
  won: 'green',
  lost: 'red',
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

export default function LeadsPage() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const filteredLeads = mockLeads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const stats = {
    totalLeads: mockLeads.length,
    qualifiedLeads: mockLeads.filter((l) => l.status === 'qualified').length,
    followUpsToday: 3,
    newInquiries: mockLeads.filter((l) => l.status === 'new').length,
  }

  const handleAddNewLead = () => {
    setSelectedLead(null)
    setIsAddModalOpen(true)
  }

  const handleSubmitLead = (data: LeadFormData) => {
    console.log('Submitting lead:', data)
    setIsAddModalOpen(false)
    setIsEditModalOpen(false)
  }

  const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
    console.log(`Lead ${leadId} status updated to ${newStatus}`)
    setIsViewModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="mb-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Title className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Leads Management
              </Title>
              <Text className="mt-2 text-gray-600">
                Track and manage your sales pipeline efficiently
              </Text>
            </div>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 rounded-full px-6"
              onClick={handleAddNewLead}
              icon={PlusIcon}
            >
              Add New Lead
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 px-4 sm:px-0">
            <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
              <div className="flex items-center p-2">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shrink-0">
                  <UserGroupIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4 min-w-0">
                  <Text className="text-sm font-medium text-gray-500 truncate">Total Leads</Text>
                  <div className="flex items-center gap-2">
                    <Title className="text-2xl font-bold text-gray-900">
                      {stats.totalLeads}
                    </Title>
                    <ChartBarIcon className="h-5 w-5 text-blue-500 shrink-0" />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
              <div className="flex items-center p-2">
                <div className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg shrink-0">
                  <CheckCircleIcon className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="ml-4 min-w-0">
                  <Text className="text-sm font-medium text-gray-500 truncate">Qualified Leads</Text>
                  <div className="flex items-center gap-2">
                    <Title className="text-2xl font-bold text-gray-900">
                      {stats.qualifiedLeads}
                    </Title>
                    <span className="text-sm text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                      {Math.round((stats.qualifiedLeads / stats.totalLeads) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
              <div className="flex items-center p-2">
                <div className="p-3 bg-gradient-to-br from-violet-50 to-violet-100 rounded-lg shrink-0">
                  <PhoneIcon className="h-6 w-6 text-violet-600" />
                </div>
                <div className="ml-4 min-w-0">
                  <Text className="text-sm font-medium text-gray-500 truncate">Follow-ups Today</Text>
                  <div className="flex items-center gap-2">
                    <Title className="text-2xl font-bold text-gray-900">
                      {stats.followUpsToday}
                    </Title>
                    <span className="text-sm text-violet-600 animate-pulse shrink-0">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
              <div className="flex items-center p-2">
                <div className="p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shrink-0">
                  <EnvelopeIcon className="h-6 w-6 text-amber-600" />
                </div>
                <div className="ml-4 min-w-0">
                  <Text className="text-sm font-medium text-gray-500 truncate">New Inquiries</Text>
                  <div className="flex items-center gap-2">
                    <Title className="text-2xl font-bold text-gray-900">
                      {stats.newInquiries}
                    </Title>
                    <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full shrink-0">
                      New
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
        <Card className="mt-6 bg-white rounded-xl shadow-lg">
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2 flex-1">
              <div className="relative w-full md:w-[400px] lg:w-[500px]">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 h-11 text-sm border border-gray-200 rounded-xl bg-white shadow-sm 
                    focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 
                    hover:border-gray-300 transition-all duration-200 
                    placeholder-gray-400 text-gray-600"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500 transition-colors duration-200" />
                  </div>
                  {searchTerm && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        onClick={() => setSearchTerm('')}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                icon={FunnelIcon}
                className="hidden md:flex hover:bg-gray-100 transition-all duration-200 rounded-full px-4 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
              >
                Filter
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={ArrowPathIcon}
                className="hidden md:flex hover:bg-gray-100 transition-all duration-200 rounded-full px-4 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
              >
                Refresh
              </Button>
            </div>

            <TabGroup
              className="mt-2 md:mt-0"
              onIndexChange={(index) => {
                const statuses = ['all', 'new', 'contacted', 'qualified']
                setSelectedStatus(statuses[index])
              }}
            >
              <TabList variant="solid" className="w-full md:w-auto bg-gray-100 p-1 rounded-lg">
                <Tab className="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200">All</Tab>
                <Tab className="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200">New</Tab>
                <Tab className="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200">Contacted</Tab>
                <Tab className="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200">Qualified</Tab>
              </TabList>
            </TabGroup>
          </div>

          {/* Leads Table */}
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <Table>
                  <TableHead>
                    <TableRow className="bg-gray-50">
                      <TableHeaderCell className="font-semibold whitespace-nowrap">Name</TableHeaderCell>
                      <TableHeaderCell className="font-semibold whitespace-nowrap max-w-[200px]">Room Preference</TableHeaderCell>
                      <TableHeaderCell className="font-semibold whitespace-nowrap">Status</TableHeaderCell>
                      <TableHeaderCell className="font-semibold whitespace-nowrap">Check-in Date</TableHeaderCell>
                      <TableHeaderCell className="font-semibold whitespace-nowrap">Mobile Number</TableHeaderCell>
                      <TableHeaderCell className="font-semibold whitespace-nowrap">Last Contact</TableHeaderCell>
                      <TableHeaderCell className="text-right font-semibold whitespace-nowrap">Actions</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredLeads.map((lead) => (
                      <TableRow 
                        key={lead.id} 
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <TableCell className="whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedLead(lead)
                              setIsViewModalOpen(true)
                            }}
                            className="text-left group"
                          >
                            <span className="font-medium text-blue-600 group-hover:text-blue-800 transition-colors duration-200">
                              {lead.name}
                            </span>
                            <div className="text-sm font-normal text-gray-500">
                              {lead.email}
                            </div>
                          </button>
                        </TableCell>
                        <TableCell className="max-w-[200px]">
                          <span className="inline-flex items-center gap-1 text-gray-700 truncate">
                            {lead.notes}
                          </span>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div className="flex items-center">
                            <span
                              className={`
                                px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap
                                ${lead.status === 'new' ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20' : ''}
                                ${lead.status === 'contacted' ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20' : ''}
                                ${lead.status === 'qualified' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20' : ''}
                                ${lead.status === 'proposal' ? 'bg-violet-50 text-violet-700 ring-1 ring-violet-600/20' : ''}
                                ${lead.status === 'negotiation' ? 'bg-orange-50 text-orange-700 ring-1 ring-orange-600/20' : ''}
                                ${lead.status === 'won' ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20' : ''}
                                ${lead.status === 'lost' ? 'bg-rose-50 text-rose-700 ring-1 ring-rose-600/20' : ''}
                              `}
                            >
                              {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <span className="text-gray-600">
                            {lead.followUpDate ? formatDate(lead.followUpDate) : '-'}
                          </span>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 text-gray-600">
                            {lead.phone || '-'}
                          </span>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {lead.createdAt
                            ? formatDate(lead.createdAt)
                            : '-'}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="light"
                              size="xs"
                              onClick={() => {
                                setSelectedLead(lead)
                                setIsEditModalOpen(true)
                              }}
                              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 transition-all duration-200 rounded-lg px-4 py-2 border border-blue-200 hover:border-blue-600 shadow-sm hover:shadow whitespace-nowrap"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="light"
                              size="xs"
                              onClick={() => {
                                setSelectedLead(lead)
                                setIsViewModalOpen(true)
                              }}
                              className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-white bg-gray-50 hover:bg-gray-600 transition-all duration-200 rounded-lg px-4 py-2 border border-gray-200 hover:border-gray-600 shadow-sm hover:shadow whitespace-nowrap"
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
            </div>
          </div>
        </Card>
      </div>

      {/* Add Lead Modal */}
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
                New Lead
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
              <LeadForm
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleSubmitLead}
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* View Lead Modal */}
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
                Lead Details
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
              {selectedLead && (
                <LeadDetails 
                  lead={selectedLead}
                  onStatusChange={handleStatusChange}
                />
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Edit Lead Modal */}
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
                Edit Lead
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
              <LeadForm
                initialData={selectedLead}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleSubmitLead}
                mode="edit"
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
} 