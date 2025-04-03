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
  TextInput,
  Select,
  SelectItem,
  Button,
  Badge,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  MultiSelect,
  MultiSelectItem,
} from '@tremor/react'
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ArrowPathIcon,
  EllipsisHorizontalIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'

// Sample data
const clients = [
  {
    id: 1,
    name: 'Oceanview Resort',
    location: 'Miami, FL',
    type: 'Resort',
    status: 'Active',
    subscription: 'Premium',
    revenue: '$5,400',
    lastPayment: 'Jun 15, 2023',
    nextPayment: 'Jul 15, 2023',
  },
  {
    id: 2,
    name: 'Mountain Lodge',
    location: 'Aspen, CO',
    type: 'Lodge',
    status: 'Active',
    subscription: 'Standard',
    revenue: '$4,200',
    lastPayment: 'Jun 10, 2023',
    nextPayment: 'Jul 10, 2023',
  },
  {
    id: 3,
    name: 'City Center Hotel',
    location: 'New York, NY',
    type: 'Hotel',
    status: 'Active',
    subscription: 'Premium',
    revenue: '$6,600',
    lastPayment: 'May 28, 2023',
    nextPayment: 'Jun 28, 2023',
  },
  {
    id: 4,
    name: 'Sunset Beach Resort',
    location: 'San Diego, CA',
    type: 'Resort',
    status: 'Active',
    subscription: 'Enterprise',
    revenue: '$7,800',
    lastPayment: 'May 15, 2023',
    nextPayment: 'Jun 15, 2023',
  },
  {
    id: 5,
    name: 'Downtown Boutique',
    location: 'Chicago, IL',
    type: 'Boutique',
    status: 'Pending',
    subscription: 'Standard',
    revenue: '$0',
    lastPayment: '-',
    nextPayment: 'Jul 01, 2023',
  },
  {
    id: 6,
    name: 'Harbor View Inn',
    location: 'Seattle, WA',
    type: 'Inn',
    status: 'Inactive',
    subscription: 'Standard',
    revenue: '$2,100',
    lastPayment: 'Apr 05, 2023',
    nextPayment: '-',
  },
  {
    id: 7,
    name: 'Golden Gate Lodge',
    location: 'San Francisco, CA',
    type: 'Lodge',
    status: 'Active',
    subscription: 'Premium',
    revenue: '$5,100',
    lastPayment: 'Jun 02, 2023',
    nextPayment: 'Jul 02, 2023',
  },
  {
    id: 8,
    name: 'Lakeside Retreat',
    location: 'Minneapolis, MN',
    type: 'Resort',
    status: 'Active',
    subscription: 'Standard',
    revenue: '$3,900',
    lastPayment: 'Jun 08, 2023',
    nextPayment: 'Jul 08, 2023',
  },
]

const statusColorMap: Record<string, string> = {
  Active: 'green',
  Pending: 'yellow',
  Inactive: 'red',
}

const subscriptionColorMap: Record<string, string> = {
  Standard: 'blue',
  Premium: 'purple',
  Enterprise: 'indigo',
}

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>([])

  // Filter clients based on search and filters
  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(client.status)
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(client.type)
    const matchesSubscription = selectedSubscriptions.length === 0 || selectedSubscriptions.includes(client.subscription)
    
    return matchesSearch && matchesStatus && matchesType && matchesSubscription
  })

  return (
    <div className="space-y-8">
      <div>
        <Title>Client Management</Title>
        <Text>View and manage your hotel clients</Text>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <TextInput 
              icon={MagnifyingGlassIcon} 
              placeholder="Search clients..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              icon={PlusIcon} 
              size="sm" 
              color="blue"
            >
              Add Client
            </Button>
            <Button 
              icon={ArrowPathIcon} 
              size="sm" 
              variant="secondary"
              onClick={() => {
                setSearchTerm('')
                setSelectedStatuses([])
                setSelectedTypes([])
                setSelectedSubscriptions([])
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <MultiSelect
            className="max-w-xs"
            onValueChange={setSelectedStatuses}
            placeholder="Filter by status"
            value={selectedStatuses}
          >
            <MultiSelectItem value="Active">Active</MultiSelectItem>
            <MultiSelectItem value="Pending">Pending</MultiSelectItem>
            <MultiSelectItem value="Inactive">Inactive</MultiSelectItem>
          </MultiSelect>

          <MultiSelect
            className="max-w-xs"
            onValueChange={setSelectedTypes}
            placeholder="Filter by type"
            value={selectedTypes}
          >
            <MultiSelectItem value="Hotel">Hotel</MultiSelectItem>
            <MultiSelectItem value="Resort">Resort</MultiSelectItem>
            <MultiSelectItem value="Lodge">Lodge</MultiSelectItem>
            <MultiSelectItem value="Inn">Inn</MultiSelectItem>
            <MultiSelectItem value="Boutique">Boutique</MultiSelectItem>
          </MultiSelect>

          <MultiSelect
            className="max-w-xs"
            onValueChange={setSelectedSubscriptions}
            placeholder="Filter by subscription"
            value={selectedSubscriptions}
          >
            <MultiSelectItem value="Standard">Standard</MultiSelectItem>
            <MultiSelectItem value="Premium">Premium</MultiSelectItem>
            <MultiSelectItem value="Enterprise">Enterprise</MultiSelectItem>
          </MultiSelect>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Client Name</TableHeaderCell>
              <TableHeaderCell>Location</TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Subscription</TableHeaderCell>
              <TableHeaderCell>Revenue</TableHeaderCell>
              <TableHeaderCell>Last Payment</TableHeaderCell>
              <TableHeaderCell>Next Payment</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.location}</TableCell>
                <TableCell>{client.type}</TableCell>
                <TableCell>
                  <Badge 
                    color={statusColorMap[client.status] as any} 
                    icon={client.status === 'Active' ? CheckCircleIcon : 
                          client.status === 'Pending' ? ClockIcon : 
                          ExclamationCircleIcon}
                  >
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge color={subscriptionColorMap[client.subscription] as any}>
                    {client.subscription}
                  </Badge>
                </TableCell>
                <TableCell>{client.revenue}</TableCell>
                <TableCell>{client.lastPayment}</TableCell>
                <TableCell>{client.nextPayment}</TableCell>
                <TableCell>
                  <Button 
                    icon={EllipsisHorizontalIcon} 
                    variant="light" 
                    size="xs"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredClients.length === 0 && (
          <div className="text-center py-10">
            <Text>No clients found matching your filters.</Text>
            <Button 
              className="mt-4" 
              variant="secondary" 
              size="sm"
              onClick={() => {
                setSearchTerm('')
                setSelectedStatuses([])
                setSelectedTypes([])
                setSelectedSubscriptions([])
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
} 