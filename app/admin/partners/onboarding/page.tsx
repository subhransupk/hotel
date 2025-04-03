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
  Button,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Select,
  SelectItem,
  TextInput,
  Divider,
} from '@tremor/react'
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowPathIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  UserIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'

// Mock data for partner applications
const partnerApplications = [
  {
    id: 'PA-2024-001',
    companyName: 'TravelTech Solutions',
    contactName: 'Emily Johnson',
    email: 'emily@traveltechsolutions.com',
    phone: '+1 (555) 123-4567',
    website: 'traveltechsolutions.com',
    location: 'New York, NY',
    businessType: 'Travel Agency',
    partnershipType: 'Referral Partner',
    applicationDate: '2024-02-25',
    status: 'pending' as const,
    notes: 'Large travel agency with 50+ agents. Looking to refer hotel clients.',
  },
  {
    id: 'PA-2024-002',
    companyName: 'Global Hospitality Consultants',
    contactName: 'Michael Chen',
    email: 'mchen@ghconsultants.com',
    phone: '+1 (555) 234-5678',
    website: 'ghconsultants.com',
    location: 'San Francisco, CA',
    businessType: 'Consulting Firm',
    partnershipType: 'Technology Partner',
    applicationDate: '2024-02-23',
    status: 'pending' as const,
    notes: 'Consulting firm specializing in hotel tech implementation.',
  },
  {
    id: 'PA-2024-003',
    companyName: 'Vacation Experts Inc.',
    contactName: 'Sarah Williams',
    email: 'sarah@vacationexperts.com',
    phone: '+1 (555) 345-6789',
    website: 'vacationexperts.com',
    location: 'Miami, FL',
    businessType: 'Travel Agency',
    partnershipType: 'Referral Partner',
    applicationDate: '2024-02-20',
    status: 'approved' as const,
    notes: 'Approved for Bronze tier. Specializes in luxury vacation packages.',
  },
  {
    id: 'PA-2024-004',
    companyName: 'Hotel Tech Integrators',
    contactName: 'David Rodriguez',
    email: 'david@hoteltechintegrators.com',
    phone: '+1 (555) 456-7890',
    website: 'hoteltechintegrators.com',
    location: 'Austin, TX',
    businessType: 'Technology Provider',
    partnershipType: 'Technology Partner',
    applicationDate: '2024-02-18',
    status: 'rejected' as const,
    notes: 'Rejected due to competing product offerings.',
  },
  {
    id: 'PA-2024-005',
    companyName: 'Boutique Hotel Association',
    contactName: 'Jennifer Lee',
    email: 'jennifer@boutiquehotels.org',
    phone: '+1 (555) 567-8901',
    website: 'boutiquehotels.org',
    location: 'Portland, OR',
    businessType: 'Industry Association',
    partnershipType: 'Strategic Partner',
    applicationDate: '2024-02-15',
    status: 'approved' as const,
    notes: 'Approved for Silver tier. Association representing 200+ boutique hotels.',
  },
]

type ApplicationStatus = 'pending' | 'approved' | 'rejected';

const statusColors = {
  pending: 'yellow',
  approved: 'emerald',
  rejected: 'red',
} as const

export default function PartnerOnboardingPage() {
  const [applications, setApplications] = useState(partnerApplications)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedApplication, setSelectedApplication] = useState<typeof partnerApplications[0] | null>(null)
  const [notes, setNotes] = useState('')

  // Filter applications based on search term and status
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Handle application approval
  const handleApprove = (id: string) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: 'approved' as const } : app
      )
    )
    if (selectedApplication?.id === id) {
      setSelectedApplication({ ...selectedApplication, status: 'approved' as const })
    }
  }

  // Handle application rejection
  const handleReject = (id: string) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: 'rejected' as const } : app
      )
    )
    if (selectedApplication?.id === id) {
      setSelectedApplication({ ...selectedApplication, status: 'rejected' as const })
    }
  }

  // Handle saving notes
  const handleSaveNotes = () => {
    if (!selectedApplication) return
    
    setApplications(
      applications.map((app) =>
        app.id === selectedApplication.id ? { ...app, notes } : app
      )
    )
    setSelectedApplication({ ...selectedApplication, notes })
  }

  return (
    <div className="space-y-6">
      <div>
        <Title>Partner Onboarding</Title>
        <Text>Review and manage partner applications</Text>
      </div>

      <Card>
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex w-full max-w-md items-center space-x-2">
            <TextInput
              icon={MagnifyingGlassIcon}
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
              className="w-40"
            >
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </Select>
          </div>
          <Text className="text-right text-sm text-gray-500">
            {filteredApplications.length} applications found
          </Text>
        </div>

        <div className="mt-6">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>Company</TableHeaderCell>
                <TableHeaderCell>Contact</TableHeaderCell>
                <TableHeaderCell>Type</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow 
                  key={application.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedApplication(application)}
                >
                  <TableCell>{application.id}</TableCell>
                  <TableCell>{application.companyName}</TableCell>
                  <TableCell>{application.contactName}</TableCell>
                  <TableCell>{application.partnershipType}</TableCell>
                  <TableCell>{application.applicationDate}</TableCell>
                  <TableCell>
                    <Badge color={statusColors[application.status]}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="xs"
                        variant="secondary"
                        color="emerald"
                        icon={CheckCircleIcon}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleApprove(application.id)
                        }}
                        disabled={application.status === 'approved'}
                      >
                        Approve
                      </Button>
                      <Button
                        size="xs"
                        variant="secondary"
                        color="red"
                        icon={XCircleIcon}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleReject(application.id)
                        }}
                        disabled={application.status === 'rejected'}
                      >
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {selectedApplication && (
        <Card>
          <div className="flex items-center justify-between">
            <Title>Application Details</Title>
            <Badge color={statusColors[selectedApplication.status]}>
              {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
            </Badge>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Text className="font-semibold">Company Information</Text>
              <div className="mt-2 space-y-3">
                <div className="flex items-start">
                  <BuildingOfficeIcon className="mr-2 h-5 w-5 text-gray-500" />
                  <div>
                    <Text className="font-medium">{selectedApplication.companyName}</Text>
                    <Text className="text-sm text-gray-500">{selectedApplication.businessType}</Text>
                  </div>
                </div>
                <div className="flex items-center">
                  <GlobeAltIcon className="mr-2 h-5 w-5 text-gray-500" />
                  <Text>{selectedApplication.website}</Text>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="mr-2 h-5 w-5 text-gray-500" />
                  <Text>{selectedApplication.location}</Text>
                </div>
              </div>
            </div>

            <div>
              <Text className="font-semibold">Contact Information</Text>
              <div className="mt-2 space-y-3">
                <div className="flex items-center">
                  <UserIcon className="mr-2 h-5 w-5 text-gray-500" />
                  <Text>{selectedApplication.contactName}</Text>
                </div>
                <div className="flex items-center">
                  <EnvelopeIcon className="mr-2 h-5 w-5 text-gray-500" />
                  <Text>{selectedApplication.email}</Text>
                </div>
                <div className="flex items-center">
                  <PhoneIcon className="mr-2 h-5 w-5 text-gray-500" />
                  <Text>{selectedApplication.phone}</Text>
                </div>
              </div>
            </div>
          </div>

          <Divider className="my-6" />

          <div>
            <Text className="font-semibold">Application Details</Text>
            <div className="mt-2 space-y-3">
              <div className="flex items-center">
                <UserGroupIcon className="mr-2 h-5 w-5 text-gray-500" />
                <Text>Partnership Type: {selectedApplication.partnershipType}</Text>
              </div>
              <div className="flex items-center">
                <ClockIcon className="mr-2 h-5 w-5 text-gray-500" />
                <Text>Application Date: {selectedApplication.applicationDate}</Text>
              </div>
            </div>
          </div>

          <Divider className="my-6" />

          <div>
            <div className="flex items-center justify-between">
              <Text className="font-semibold">Notes</Text>
              <Button 
                size="xs" 
                variant="secondary"
                onClick={handleSaveNotes}
                disabled={notes === selectedApplication.notes}
              >
                Save Notes
              </Button>
            </div>
            <textarea
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              rows={4}
              value={notes || selectedApplication.notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            {selectedApplication.status !== 'approved' && (
              <Button
                color="emerald"
                icon={CheckCircleIcon}
                onClick={() => handleApprove(selectedApplication.id)}
              >
                Approve Application
              </Button>
            )}
            {selectedApplication.status !== 'rejected' && (
              <Button
                color="red"
                icon={XCircleIcon}
                onClick={() => handleReject(selectedApplication.id)}
              >
                Reject Application
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  )
} 