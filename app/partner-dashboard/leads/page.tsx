'use client'

import { useState } from 'react'
import {
  Card,
  Title,
  Text,
  Button,
  TextInput,
  Select,
  SelectItem,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
  MultiSelect,
  MultiSelectItem,
  DateRangePicker,
  DateRangePickerValue,
  Grid,
  Metric,
  Flex,
  ProgressBar,
} from '@tremor/react'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  UserPlusIcon,
  ArrowPathIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  UserIcon,
  PencilSquareIcon,
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  EllipsisHorizontalIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  BriefcaseIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  LinkIcon,
} from '@heroicons/react/24/outline'

// Sample lead data
const leadsData = [
  {
    id: 'lead-001',
    name: 'Grand Plaza Hotel',
    contact: 'Sarah Johnson',
    email: 'sarah.johnson@grandplaza.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    hotelType: 'Luxury',
    rooms: 120,
    status: 'New',
    source: 'Referral',
    value: 24000,
    lastContact: '2023-07-15',
    nextFollowUp: '2023-07-22',
    notes: 'Interested in full suite with revenue management. Currently using legacy system.',
    assignedTo: 'You',
    created: '2023-07-10',
  },
  {
    id: 'lead-002',
    name: 'Seaside Resort & Spa',
    contact: 'Michael Chen',
    email: 'mchen@seasideresort.com',
    phone: '+1 (555) 987-6543',
    location: 'Miami, FL',
    hotelType: 'Resort',
    rooms: 85,
    status: 'Qualified',
    source: 'Website',
    value: 18000,
    lastContact: '2023-07-12',
    nextFollowUp: '2023-07-20',
    notes: 'Looking for better booking management and spa integration. Demo scheduled.',
    assignedTo: 'You',
    created: '2023-07-05',
  },
  {
    id: 'lead-003',
    name: 'Downtown Boutique Inn',
    contact: 'Emily Rodriguez',
    email: 'emily@downtownboutique.com',
    phone: '+1 (555) 234-5678',
    location: 'Chicago, IL',
    hotelType: 'Boutique',
    rooms: 32,
    status: 'Proposal',
    source: 'Trade Show',
    value: 8500,
    lastContact: '2023-07-18',
    nextFollowUp: '2023-07-25',
    notes: 'Small property looking for all-in-one solution. Very interested in mobile app features.',
    assignedTo: 'Partner Team',
    created: '2023-06-28',
  },
  {
    id: 'lead-004',
    name: 'Mountain View Lodge',
    contact: 'David Wilson',
    email: 'david@mountainviewlodge.com',
    phone: '+1 (555) 345-6789',
    location: 'Denver, CO',
    hotelType: 'Lodge',
    rooms: 45,
    status: 'Negotiation',
    source: 'Google Ads',
    value: 12000,
    lastContact: '2023-07-14',
    nextFollowUp: '2023-07-21',
    notes: 'Seasonal business with specific reporting needs. Price negotiation in progress.',
    assignedTo: 'You',
    created: '2023-06-20',
  },
  {
    id: 'lead-005',
    name: 'Harborview Hotel',
    contact: 'Jessica Brown',
    email: 'jbrown@harborview.com',
    phone: '+1 (555) 456-7890',
    location: 'Seattle, WA',
    hotelType: 'Business',
    rooms: 78,
    status: 'Closed Won',
    source: 'Referral Link',
    value: 15600,
    lastContact: '2023-07-10',
    nextFollowUp: '2023-08-01',
    notes: 'Contract signed! Implementation starting next month. Upsell opportunity for revenue management.',
    assignedTo: 'You',
    created: '2023-06-15',
  },
  {
    id: 'lead-006',
    name: 'Sunset Beach Motel',
    contact: 'Robert Taylor',
    email: 'rtaylor@sunsetbeach.com',
    phone: '+1 (555) 567-8901',
    location: 'San Diego, CA',
    hotelType: 'Motel',
    rooms: 28,
    status: 'Closed Lost',
    source: 'Email Campaign',
    value: 5600,
    lastContact: '2023-07-05',
    nextFollowUp: null,
    notes: 'Decided to go with competitor due to pricing. Follow up in 6 months when contract expires.',
    assignedTo: 'Partner Team',
    created: '2023-06-10',
  },
  {
    id: 'lead-007',
    name: 'City Center Suites',
    contact: 'Amanda Lee',
    email: 'alee@citycentersuites.com',
    phone: '+1 (555) 678-9012',
    location: 'Boston, MA',
    hotelType: 'Extended Stay',
    rooms: 60,
    status: 'New',
    source: 'LinkedIn',
    value: 12000,
    lastContact: '2023-07-17',
    nextFollowUp: '2023-07-24',
    notes: 'New construction opening in 6 months. Looking for complete hotel management system.',
    assignedTo: 'You',
    created: '2023-07-16',
  },
  {
    id: 'lead-008',
    name: 'Historic Grand Hotel',
    contact: 'Thomas Martin',
    email: 'tmartin@historicgrand.com',
    phone: '+1 (555) 789-0123',
    location: 'Charleston, SC',
    hotelType: 'Historic',
    rooms: 52,
    status: 'Qualified',
    source: 'Referral',
    value: 10400,
    lastContact: '2023-07-13',
    nextFollowUp: '2023-07-23',
    notes: 'Historic property with unique requirements. Very interested in customization options.',
    assignedTo: 'Partner Team',
    created: '2023-07-08',
  },
];

// Status options with colors
const statusOptions = [
  { name: 'New', value: 'New', color: 'blue' },
  { name: 'Qualified', value: 'Qualified', color: 'indigo' },
  { name: 'Proposal', value: 'Proposal', color: 'purple' },
  { name: 'Negotiation', value: 'Negotiation', color: 'amber' },
  { name: 'Closed Won', value: 'Closed Won', color: 'green' },
  { name: 'Closed Lost', value: 'Closed Lost', color: 'red' },
];

// Hotel type options
const hotelTypeOptions = [
  { name: 'All Types', value: 'all' },
  { name: 'Luxury', value: 'Luxury' },
  { name: 'Resort', value: 'Resort' },
  { name: 'Boutique', value: 'Boutique' },
  { name: 'Business', value: 'Business' },
  { name: 'Extended Stay', value: 'Extended Stay' },
  { name: 'Motel', value: 'Motel' },
  { name: 'Lodge', value: 'Lodge' },
  { name: 'Historic', value: 'Historic' },
];

// Lead source options
const sourceOptions = [
  { name: 'All Sources', value: 'all' },
  { name: 'Website', value: 'Website' },
  { name: 'Referral', value: 'Referral' },
  { name: 'Referral Link', value: 'Referral Link' },
  { name: 'Trade Show', value: 'Trade Show' },
  { name: 'Google Ads', value: 'Google Ads' },
  { name: 'LinkedIn', value: 'LinkedIn' },
  { name: 'Email Campaign', value: 'Email Campaign' },
];

export default function LeadsPage() {
  // State for filtering and search
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedHotelType, setSelectedHotelType] = useState('all')
  const [selectedSource, setSelectedSource] = useState('all')
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({ from: undefined, to: undefined })
  const [activeTab, setActiveTab] = useState('all')
  const [sortField, setSortField] = useState('created')
  const [sortDirection, setSortDirection] = useState('desc')
  
  // State for lead details
  const [selectedLead, setSelectedLead] = useState<string | null>(null)
  const [showNewLeadForm, setShowNewLeadForm] = useState(false)
  
  // Function to handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }
  
  // Filter leads based on search, filters, and active tab
  const filteredLeads = leadsData.filter(lead => {
    // Filter by search query
    const matchesSearch = 
      searchQuery === '' || 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Filter by status
    const matchesStatus = 
      selectedStatuses.length === 0 || 
      selectedStatuses.includes(lead.status)
    
    // Filter by hotel type
    const matchesHotelType = 
      selectedHotelType === 'all' || 
      lead.hotelType === selectedHotelType
    
    // Filter by source
    const matchesSource = 
      selectedSource === 'all' || 
      lead.source === selectedSource
    
    // Filter by date range
    const matchesDateRange = 
      !dateRange.from || !dateRange.to ||
      (new Date(lead.created) >= dateRange.from && new Date(lead.created) <= dateRange.to)
    
    // Filter by tab
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'mine' && lead.assignedTo === 'You') ||
      (activeTab === 'team' && lead.assignedTo === 'Partner Team') ||
      (activeTab === 'won' && lead.status === 'Closed Won') ||
      (activeTab === 'lost' && lead.status === 'Closed Lost')
    
    return matchesSearch && matchesStatus && matchesHotelType && matchesSource && matchesDateRange && matchesTab
  })
  
  // Sort filtered leads
  const sortedLeads = [...filteredLeads].sort((a, b) => {
    if (sortField === 'name') {
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name)
    } else if (sortField === 'value') {
      return sortDirection === 'asc' 
        ? a.value - b.value 
        : b.value - a.value
    } else if (sortField === 'rooms') {
      return sortDirection === 'asc' 
        ? a.rooms - b.rooms 
        : b.rooms - a.rooms
    } else if (sortField === 'created') {
      return sortDirection === 'asc' 
        ? new Date(a.created).getTime() - new Date(b.created).getTime() 
        : new Date(b.created).getTime() - new Date(a.created).getTime()
    } else if (sortField === 'lastContact') {
      if (!a.lastContact) return sortDirection === 'asc' ? -1 : 1
      if (!b.lastContact) return sortDirection === 'asc' ? 1 : -1
      return sortDirection === 'asc' 
        ? new Date(a.lastContact).getTime() - new Date(b.lastContact).getTime() 
        : new Date(b.lastContact).getTime() - new Date(a.lastContact).getTime()
    }
    return 0
  })
  
  // Calculate lead statistics
  const totalLeads = leadsData.length
  const newLeads = leadsData.filter(lead => lead.status === 'New').length
  const qualifiedLeads = leadsData.filter(lead => lead.status === 'Qualified' || lead.status === 'Proposal' || lead.status === 'Negotiation').length
  const closedWonLeads = leadsData.filter(lead => lead.status === 'Closed Won').length
  const conversionRate = totalLeads > 0 ? Math.round((closedWonLeads / totalLeads) * 100) : 0
  const totalValue = leadsData.reduce((sum, lead) => sum + lead.value, 0)
  
  // Format numbers in a consistent way to avoid hydration errors
  const formatNumber = (num: number) => {
    // Use a simple approach that will be consistent between server and client
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  
  // Format dates in a consistent way to avoid hydration errors
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    
    // Use a fixed format that will be consistent between server and client
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    
    return `${year}-${month}-${day}`
  }
  
  // Render status color indicators separately to avoid nesting issues
  const StatusColorIndicators = () => (
    <div className="mt-2 flex flex-wrap gap-2">
      {statusOptions.map((status) => (
        <div key={status.value} className="flex items-center gap-1 text-xs text-gray-500">
          <div className={`inline-block h-2 w-2 rounded-full bg-${status.color}-500`}></div>
          <span className="truncate">{status.name}</span>
        </div>
      ))}
    </div>
  )
  
  return (
    <div className="space-y-8 w-full max-w-[95vw] overflow-x-hidden px-2">
      <div>
        <Title>Lead Management</Title>
        <Text>Track and manage your potential hotel clients</Text>
      </div>
      
      {/* Lead Statistics */}
      <Grid numItemsMd={2} numItemsLg={5} className="gap-2 sm:gap-3 md:gap-4 overflow-hidden">
        <Card decoration="top" decorationColor="blue" className="overflow-hidden">
          <Text>Total Leads</Text>
          <Metric>{totalLeads}</Metric>
        </Card>
        <Card decoration="top" decorationColor="indigo" className="overflow-hidden">
          <Text>New Leads</Text>
          <Metric>{newLeads}</Metric>
        </Card>
        <Card decoration="top" decorationColor="purple" className="overflow-hidden">
          <Text>Qualified Leads</Text>
          <Metric>{qualifiedLeads}</Metric>
        </Card>
        <Card decoration="top" decorationColor="green" className="overflow-hidden">
          <Text>Conversion Rate</Text>
          <Metric>{conversionRate}%</Metric>
        </Card>
        <Card decoration="top" decorationColor="amber" className="overflow-hidden">
          <Text>Total Value</Text>
          <Metric>${formatNumber(totalValue)}</Metric>
        </Card>
      </Grid>
      
      {/* Sales Pipeline */}
      <Card className="overflow-hidden">
        <Title>Sales Pipeline</Title>
        <Text>Distribution of leads by stage</Text>
        
        <div className="mt-4 space-y-2 overflow-hidden">
          <div className="flex items-center justify-between overflow-hidden">
            <Text className="truncate pr-2">New ({leadsData.filter(lead => lead.status === 'New').length})</Text>
            <Text className="text-right whitespace-nowrap">{Math.round((leadsData.filter(lead => lead.status === 'New').length / totalLeads) * 100)}%</Text>
          </div>
          <ProgressBar value={leadsData.filter(lead => lead.status === 'New').length / totalLeads * 100} color="blue" />
          
          <div className="flex items-center justify-between overflow-hidden">
            <Text className="truncate pr-2">Qualified ({leadsData.filter(lead => lead.status === 'Qualified').length})</Text>
            <Text className="text-right whitespace-nowrap">{Math.round((leadsData.filter(lead => lead.status === 'Qualified').length / totalLeads) * 100)}%</Text>
          </div>
          <ProgressBar value={leadsData.filter(lead => lead.status === 'Qualified').length / totalLeads * 100} color="indigo" />
          
          <div className="flex items-center justify-between overflow-hidden">
            <Text className="truncate pr-2">Proposal ({leadsData.filter(lead => lead.status === 'Proposal').length})</Text>
            <Text className="text-right whitespace-nowrap">{Math.round((leadsData.filter(lead => lead.status === 'Proposal').length / totalLeads) * 100)}%</Text>
          </div>
          <ProgressBar value={leadsData.filter(lead => lead.status === 'Proposal').length / totalLeads * 100} color="purple" />
          
          <div className="flex items-center justify-between overflow-hidden">
            <Text className="truncate pr-2">Negotiation ({leadsData.filter(lead => lead.status === 'Negotiation').length})</Text>
            <Text className="text-right whitespace-nowrap">{Math.round((leadsData.filter(lead => lead.status === 'Negotiation').length / totalLeads) * 100)}%</Text>
          </div>
          <ProgressBar value={leadsData.filter(lead => lead.status === 'Negotiation').length / totalLeads * 100} color="amber" />
          
          <div className="flex items-center justify-between overflow-hidden">
            <Text className="truncate pr-2">Closed Won ({leadsData.filter(lead => lead.status === 'Closed Won').length})</Text>
            <Text className="text-right whitespace-nowrap">{Math.round((leadsData.filter(lead => lead.status === 'Closed Won').length / totalLeads) * 100)}%</Text>
          </div>
          <ProgressBar value={leadsData.filter(lead => lead.status === 'Closed Won').length / totalLeads * 100} color="green" />
          
          <div className="flex items-center justify-between overflow-hidden">
            <Text className="truncate pr-2">Closed Lost ({leadsData.filter(lead => lead.status === 'Closed Lost').length})</Text>
            <Text className="text-right whitespace-nowrap">{Math.round((leadsData.filter(lead => lead.status === 'Closed Lost').length / totalLeads) * 100)}%</Text>
          </div>
          <ProgressBar value={leadsData.filter(lead => lead.status === 'Closed Lost').length / totalLeads * 100} color="red" />
        </div>
      </Card>
      
      {/* Filters and Search */}
      <Card className="overflow-hidden">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="w-full md:w-auto">
            <TextInput
              icon={MagnifyingGlassIcon}
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              icon={UserPlusIcon}
              color="blue"
              onClick={() => setShowNewLeadForm(!showNewLeadForm)}
            >
              Add New Lead
            </Button>
            <Button
              icon={FunnelIcon}
              variant="secondary"
              onClick={() => {
                // Toggle filter visibility in a real app
              }}
            >
              Filters
            </Button>
            <Button
              icon={ArrowPathIcon}
              variant="light"
              onClick={() => {
                setSearchQuery('')
                setSelectedStatuses([])
                setSelectedHotelType('all')
                setSelectedSource('all')
                setDateRange({ from: undefined, to: undefined })
              }}
            >
              Reset
            </Button>
          </div>
        </div>
        
        {/* Advanced Filters */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 overflow-hidden">
          <div>
            <Text className="mb-2">Status</Text>
            <MultiSelect
              value={selectedStatuses}
              onValueChange={setSelectedStatuses}
              placeholder="Select statuses"
            >
              {statusOptions.map((status) => (
                <MultiSelectItem key={status.value} value={status.value}>
                  {status.name}
                </MultiSelectItem>
              ))}
            </MultiSelect>
            <StatusColorIndicators />
          </div>
          
          <div>
            <Text className="mb-2">Hotel Type</Text>
            <Select
              value={selectedHotelType}
              onValueChange={setSelectedHotelType}
            >
              {hotelTypeOptions.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          
          <div>
            <Text className="mb-2">Lead Source</Text>
            <Select
              value={selectedSource}
              onValueChange={setSelectedSource}
            >
              {sourceOptions.map((source) => (
                <SelectItem key={source.value} value={source.value}>
                  {source.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          
          <div>
            <Text className="mb-2">Created Date</Text>
            <DateRangePicker
              value={dateRange}
              onValueChange={setDateRange}
              selectPlaceholder="Select dates"
            />
          </div>
        </div>
      </Card>
      
      {/* Tabs */}
      <TabGroup index={activeTab === 'all' ? 0 : activeTab === 'mine' ? 1 : activeTab === 'team' ? 2 : activeTab === 'won' ? 3 : 4} onIndexChange={(index) => setActiveTab(index === 0 ? 'all' : index === 1 ? 'mine' : index === 2 ? 'team' : index === 3 ? 'won' : 'lost')}>
        <TabList className="mt-4 overflow-x-auto flex-nowrap w-full max-w-full">
          <Tab icon={UserGroupIcon} className="whitespace-nowrap">All Leads</Tab>
          <Tab icon={UserIcon} className="whitespace-nowrap">My Leads</Tab>
          <Tab icon={BriefcaseIcon} className="whitespace-nowrap">Team Leads</Tab>
          <Tab icon={CheckCircleIcon} className="whitespace-nowrap">Won</Tab>
          <Tab icon={XCircleIcon} className="whitespace-nowrap">Lost</Tab>
        </TabList>
      </TabGroup>
      
      {/* Leads Table */}
      {sortedLeads.length > 0 ? (
        <Card className="overflow-hidden">
          <div className="w-full overflow-x-auto">
            <Table className="w-full">
              <TableHead>
                <TableRow>
                  <TableHeaderCell className="cursor-pointer max-w-[150px]" onClick={() => handleSort('name')}>
                    <div className="flex items-center gap-1">
                      <span className="truncate">Hotel Name</span>
                      {sortField === 'name' && (
                        sortDirection === 'asc' ? <ChevronUpIcon className="h-4 w-4 flex-shrink-0" /> : <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
                      )}
                    </div>
                  </TableHeaderCell>
                  <TableHeaderCell className="max-w-[150px]">Contact</TableHeaderCell>
                  <TableHeaderCell className="hidden md:table-cell max-w-[150px]">Location</TableHeaderCell>
                  <TableHeaderCell className="hidden lg:table-cell max-w-[100px]">Type</TableHeaderCell>
                  <TableHeaderCell className="hidden lg:table-cell cursor-pointer max-w-[80px]" onClick={() => handleSort('rooms')}>
                    <div className="flex items-center gap-1">
                      <span className="truncate">Rooms</span>
                      {sortField === 'rooms' && (
                        sortDirection === 'asc' ? <ChevronUpIcon className="h-4 w-4 flex-shrink-0" /> : <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
                      )}
                    </div>
                  </TableHeaderCell>
                  <TableHeaderCell className="max-w-[100px]">Status</TableHeaderCell>
                  <TableHeaderCell className="hidden md:table-cell max-w-[120px]">Source</TableHeaderCell>
                  <TableHeaderCell className="cursor-pointer max-w-[100px]" onClick={() => handleSort('value')}>
                    <div className="flex items-center gap-1">
                      <span className="truncate">Value</span>
                      {sortField === 'value' && (
                        sortDirection === 'asc' ? <ChevronUpIcon className="h-4 w-4 flex-shrink-0" /> : <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
                      )}
                    </div>
                  </TableHeaderCell>
                  <TableHeaderCell className="hidden md:table-cell cursor-pointer max-w-[120px]" onClick={() => handleSort('lastContact')}>
                    <div className="flex items-center gap-1">
                      <span className="truncate">Last Contact</span>
                      {sortField === 'lastContact' && (
                        sortDirection === 'asc' ? <ChevronUpIcon className="h-4 w-4 flex-shrink-0" /> : <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
                      )}
                    </div>
                  </TableHeaderCell>
                  <TableHeaderCell className="max-w-[100px]">Actions</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedLeads.map((lead) => {
                  const statusOption = statusOptions.find(option => option.value === lead.status)
                  const statusColor = statusOption ? statusOption.color : 'gray'
                  
                  return (
                    <TableRow key={lead.id} className={selectedLead === lead.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}>
                      <TableCell className="truncate max-w-[150px]">
                        <div className="font-medium truncate">{lead.name}</div>
                      </TableCell>
                      <TableCell className="max-w-[150px]">
                        <div className="truncate">{lead.contact}</div>
                        <div className="text-xs text-gray-500 truncate">{lead.email}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell truncate max-w-[150px]">{lead.location}</TableCell>
                      <TableCell className="hidden lg:table-cell truncate max-w-[100px]">{lead.hotelType}</TableCell>
                      <TableCell className="hidden lg:table-cell max-w-[80px]">{lead.rooms}</TableCell>
                      <TableCell className="max-w-[100px]">
                        <Badge color={statusColor as any}>
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell truncate max-w-[120px]">{lead.source}</TableCell>
                      <TableCell className="max-w-[100px]">${formatNumber(lead.value)}</TableCell>
                      <TableCell className="hidden md:table-cell truncate max-w-[120px]">
                        {formatDate(lead.lastContact)}
                      </TableCell>
                      <TableCell className="max-w-[100px]">
                        <Button
                          size="xs"
                          variant="light"
                          color="blue"
                          icon={EllipsisHorizontalIcon}
                          onClick={() => setSelectedLead(selectedLead === lead.id ? null : lead.id)}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </Card>
      ) : (
        <Card className="py-12">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <UserGroupIcon className="h-12 w-12" />
            </div>
            <Title className="mt-4">No leads found</Title>
            <Text className="mt-2">Try adjusting your search or filter criteria</Text>
            <Button
              className="mt-6"
              onClick={() => {
                setSearchQuery('')
                setSelectedStatuses([])
                setSelectedHotelType('all')
                setSelectedSource('all')
                setDateRange({ from: undefined, to: undefined })
                setActiveTab('all')
              }}
            >
              Clear all filters
            </Button>
          </div>
        </Card>
      )}
      
      {/* Lead Details */}
      {selectedLead && (
        <Card className="overflow-hidden">
          {(() => {
            const lead = leadsData.find(l => l.id === selectedLead)
            if (!lead) return null
            
            return (
              <div className="overflow-hidden">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="max-w-full overflow-hidden">
                    <Title className="break-words">{lead.name}</Title>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <Badge color={statusOptions.find(option => option.value === lead.status)?.color as any}>
                        {lead.status}
                      </Badge>
                      <Text>{lead.hotelType} Hotel • {lead.rooms} Rooms</Text>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="xs"
                      variant="light"
                      icon={PencilSquareIcon}
                    >
                      Edit
                    </Button>
                    <Button
                      size="xs"
                      variant="light"
                      color="red"
                      icon={TrashIcon}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="min-w-0 overflow-hidden">
                    <Text className="font-medium">Contact Information</Text>
                    <div className="mt-2 space-y-3">
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        <Text className="truncate">{lead.contact}</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <EnvelopeIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        <Text className="truncate">{lead.email}</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <PhoneIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        <Text className="truncate">{lead.phone}</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        <Text className="truncate">{lead.location}</Text>
                      </div>
                    </div>
                    
                    <Text className="font-medium mt-6">Lead Details</Text>
                    <div className="mt-2 space-y-3">
                      <div className="flex items-center gap-2">
                        <BuildingOfficeIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        <Text className="truncate">{lead.hotelType} Hotel • {lead.rooms} Rooms</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <CurrencyDollarIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        <Text className="truncate">Estimated Value: ${formatNumber(lead.value)}</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <LinkIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        <Text className="truncate">Source: {lead.source}</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        <Text className="truncate">Created: {formatDate(lead.created)}</Text>
                      </div>
                    </div>
                  </div>
                  
                  <div className="min-w-0 overflow-hidden">
                    <Text className="font-medium">Activity</Text>
                    <div className="mt-2 space-y-3">
                      <div className="flex items-start gap-2">
                        <ClockIcon className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <Text className="truncate">Last Contact: {formatDate(lead.lastContact)}</Text>
                          {lead.nextFollowUp && (
                            <Text className="text-sm text-gray-500 truncate">
                              Next Follow-up: {formatDate(lead.nextFollowUp)}
                            </Text>
                          )}
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <UserIcon className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <Text className="truncate">Assigned To: {lead.assignedTo}</Text>
                        </div>
                      </div>
                    </div>
                    
                    <Text className="font-medium mt-6">Notes</Text>
                    <Card className="mt-2 bg-gray-50 dark:bg-gray-800 overflow-hidden">
                      <Text className="break-words">{lead.notes}</Text>
                    </Card>
                    
                    <div className="mt-6 flex flex-wrap gap-2">
                      <Button
                        icon={PhoneIcon}
                        color="blue"
                        size="sm"
                      >
                        Call
                      </Button>
                      <Button
                        icon={EnvelopeIcon}
                        variant="secondary"
                        size="sm"
                      >
                        Email
                      </Button>
                      <Button
                        icon={CalendarIcon}
                        variant="secondary"
                        size="sm"
                      >
                        Schedule
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}
        </Card>
      )}
      
      {/* New Lead Form */}
      {showNewLeadForm && (
        <Card className="border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20 overflow-hidden">
          <Title className="text-blue-800 dark:text-blue-300 break-words">Add New Lead</Title>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 min-w-0 overflow-hidden">
              <div>
                <Text className="mb-2">Hotel Name</Text>
                <TextInput placeholder="e.g., Grand Plaza Hotel" />
              </div>
              
              <div>
                <Text className="mb-2">Contact Person</Text>
                <TextInput placeholder="e.g., John Smith" />
              </div>
              
              <div>
                <Text className="mb-2">Email</Text>
                <TextInput placeholder="e.g., john@example.com" />
              </div>
              
              <div>
                <Text className="mb-2">Phone</Text>
                <TextInput placeholder="e.g., +1 (555) 123-4567" />
              </div>
              
              <div>
                <Text className="mb-2">Location</Text>
                <TextInput placeholder="e.g., New York, NY" />
              </div>
            </div>
            
            <div className="space-y-4 min-w-0 overflow-hidden">
              <div>
                <Text className="mb-2">Hotel Type</Text>
                <Select placeholder="Select hotel type">
                  {hotelTypeOptions.filter(type => type.value !== 'all').map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              
              <div>
                <Text className="mb-2">Number of Rooms</Text>
                <TextInput placeholder="e.g., 120" type="number" />
              </div>
              
              <div>
                <Text className="mb-2">Lead Status</Text>
                <Select placeholder="Select status">
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.name}
                    </SelectItem>
                  ))}
                </Select>
                <StatusColorIndicators />
              </div>
              
              <div>
                <Text className="mb-2">Lead Source</Text>
                <Select placeholder="Select source">
                  {sourceOptions.filter(source => source.value !== 'all').map((source) => (
                    <SelectItem key={source.value} value={source.value}>
                      {source.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              
              <div>
                <Text className="mb-2">Estimated Value ($)</Text>
                <TextInput placeholder="e.g., 10000" type="number" />
              </div>
            </div>
          </div>
          
          <div>
            <Text className="mb-2 mt-4">Notes</Text>
            <TextInput placeholder="Add any relevant notes about this lead..." />
          </div>
          
          <div className="flex flex-wrap justify-end gap-2 mt-6">
            <Button
              variant="secondary"
              onClick={() => setShowNewLeadForm(false)}
            >
              Cancel
            </Button>
            <Button
              color="blue"
              onClick={() => {
                // In a real app, this would save the new lead
                alert('New lead added!')
                setShowNewLeadForm(false)
              }}
            >
              Add Lead
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
} 