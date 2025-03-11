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
  Grid,
  Flex,
  Metric,
  TextInput,
  Textarea,
  DateRangePicker,
  DateRangePickerValue,
} from '@tremor/react'
import {
  EnvelopeIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  MegaphoneIcon,
  PaperAirplaneIcon,
  UserGroupIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  DocumentDuplicateIcon,
  CalendarDaysIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'

// Define types for communication
type CommunicationType = 'email' | 'notification' | 'announcement'
type CommunicationStatus = 'draft' | 'scheduled' | 'sent' | 'cancelled'
type PartnerTier = 'All' | 'Gold' | 'Silver' | 'Bronze'

type Communication = {
  id: string
  title: string
  content: string
  type: CommunicationType
  status: CommunicationStatus
  createdAt: string
  scheduledFor?: string
  sentAt?: string
  targetAudience: PartnerTier[]
  recipients: number
  openRate?: number
  clickRate?: number
  author: string
}

type Template = {
  id: string
  title: string
  type: CommunicationType
  description: string
  lastUsed?: string
  createdAt: string
}

// Mock data for communications
const communications: Communication[] = [
  {
    id: 'comm-001',
    title: 'Summer Promotion Announcement',
    content: 'Dear Partners, We are excited to announce our summer promotion package...',
    type: 'email',
    status: 'sent',
    createdAt: '2024-03-15',
    sentAt: '2024-03-16',
    targetAudience: ['All'],
    recipients: 156,
    openRate: 68,
    clickRate: 24,
    author: 'Jane Smith',
  },
  {
    id: 'comm-002',
    title: 'New Booking System Update',
    content: 'Important: We are updating our booking system on July 15th...',
    type: 'notification',
    status: 'scheduled',
    createdAt: '2024-04-05',
    scheduledFor: '2024-07-10',
    targetAudience: ['Gold', 'Silver'],
    recipients: 89,
    author: 'John Davis',
  },
  {
    id: 'comm-003',
    title: 'Partner Program Changes',
    content: 'We are making some exciting changes to our partner program...',
    type: 'announcement',
    status: 'draft',
    createdAt: '2024-04-08',
    targetAudience: ['All'],
    recipients: 156,
    author: 'Michael Johnson',
  },
  {
    id: 'comm-004',
    title: 'Holiday Season Preparation',
    content: 'Start preparing for the holiday season with these special offers...',
    type: 'email',
    status: 'sent',
    createdAt: '2024-03-20',
    sentAt: '2024-03-22',
    targetAudience: ['Gold'],
    recipients: 28,
    openRate: 82,
    clickRate: 45,
    author: 'Sarah Williams',
  },
  {
    id: 'comm-005',
    title: 'Urgent: System Maintenance',
    content: 'Our system will be undergoing maintenance on April 30th...',
    type: 'notification',
    status: 'scheduled',
    createdAt: '2024-04-10',
    scheduledFor: '2024-04-28',
    targetAudience: ['All'],
    recipients: 156,
    author: 'Tech Support Team',
  },
]

// Mock data for templates
const templates: Template[] = [
  {
    id: 'temp-001',
    title: 'Welcome Email',
    type: 'email',
    description: 'Standard welcome email for new partners',
    lastUsed: '2024-03-10',
    createdAt: '2023-05-15',
  },
  {
    id: 'temp-002',
    title: 'Promotion Announcement',
    type: 'announcement',
    description: 'Template for announcing new promotions',
    lastUsed: '2024-03-16',
    createdAt: '2023-06-22',
  },
  {
    id: 'temp-003',
    title: 'System Update Notification',
    type: 'notification',
    description: 'Template for system update notifications',
    lastUsed: '2024-02-28',
    createdAt: '2023-07-05',
  },
  {
    id: 'temp-004',
    title: 'Monthly Newsletter',
    type: 'email',
    description: 'Monthly newsletter template with performance stats',
    lastUsed: '2024-04-01',
    createdAt: '2023-08-12',
  },
]

// Mock data for communication stats
const communicationStats = [
  {
    month: 'Jan',
    'Emails Sent': 45,
    'Notifications': 12,
    'Announcements': 3,
  },
  {
    month: 'Feb',
    'Emails Sent': 52,
    'Notifications': 15,
    'Announcements': 2,
  },
  {
    month: 'Mar',
    'Emails Sent': 58,
    'Notifications': 18,
    'Announcements': 4,
  },
  {
    month: 'Apr',
    'Emails Sent': 42,
    'Notifications': 10,
    'Announcements': 1,
  },
]

export default function PartnerCommunicationPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedType, setSelectedType] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: new Date(new Date().getFullYear(), new Date().getMonth() - 3, 1),
    to: new Date(),
  })
  const [showNewCommunicationForm, setShowNewCommunicationForm] = useState(false)
  const [showNewTemplateForm, setShowNewTemplateForm] = useState(false)

  // Filter communications based on selected type and search query
  const filteredCommunications = communications
    .filter(comm => 
      selectedType === 'all' || comm.type === selectedType
    )
    .filter(comm => 
      comm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comm.content.toLowerCase().includes(searchQuery.toLowerCase())
    )

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  // Get icon based on communication type
  const getTypeIcon = (type: CommunicationType) => {
    switch (type) {
      case 'email':
        return <EnvelopeIcon className="h-5 w-5" />
      case 'notification':
        return <BellIcon className="h-5 w-5" />
      case 'announcement':
        return <MegaphoneIcon className="h-5 w-5" />
      default:
        return <EnvelopeIcon className="h-5 w-5" />
    }
  }

  // Handler for creating a new communication
  const handleNewCommunication = () => {
    setShowNewCommunicationForm(true)
  }

  // Handler for creating a new template
  const handleNewTemplate = () => {
    setShowNewTemplateForm(true)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Title className="text-2xl font-bold">Partner Communication</Title>
          <Text className="mt-1 text-gray-600">
            Manage all communications with hotel partners
          </Text>
        </div>
        <div className="flex items-center gap-2">
          <DateRangePicker
            className="max-w-md"
            value={dateRange}
            onValueChange={setDateRange}
            selectPlaceholder="Select date range"
            color="blue"
          />
          <Button
            icon={PlusIcon}
            color="blue"
            onClick={activeTab === 0 ? handleNewCommunication : handleNewTemplate}
          >
            {activeTab === 0 ? 'New Communication' : 'New Template'}
          </Button>
        </div>
      </div>

      {/* Communication Stats Cards */}
      <Grid numItemsMd={2} numItemsLg={4} className="gap-6">
        <Card decoration="top" decorationColor="blue">
          <Flex justifyContent="start" className="space-x-4">
            <div className="p-2 bg-blue-50 rounded-md">
              <EnvelopeIcon className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <Text>Total Emails</Text>
              <Metric className="text-2xl font-bold">197</Metric>
              <Text className="text-sm text-green-500">+12% from last quarter</Text>
            </div>
          </Flex>
        </Card>
        <Card decoration="top" decorationColor="amber">
          <Flex justifyContent="start" className="space-x-4">
            <div className="p-2 bg-amber-50 rounded-md">
              <BellIcon className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <Text>Notifications</Text>
              <Metric className="text-2xl font-bold">55</Metric>
              <Text className="text-sm text-green-500">+8% from last quarter</Text>
            </div>
          </Flex>
        </Card>
        <Card decoration="top" decorationColor="emerald">
          <Flex justifyContent="start" className="space-x-4">
            <div className="p-2 bg-emerald-50 rounded-md">
              <MegaphoneIcon className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <Text>Announcements</Text>
              <Metric className="text-2xl font-bold">10</Metric>
              <Text className="text-sm text-green-500">+2 from last quarter</Text>
            </div>
          </Flex>
        </Card>
        <Card decoration="top" decorationColor="purple">
          <Flex justifyContent="start" className="space-x-4">
            <div className="p-2 bg-purple-50 rounded-md">
              <UserGroupIcon className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <Text>Avg. Open Rate</Text>
              <Metric className="text-2xl font-bold">72%</Metric>
              <Text className="text-sm text-green-500">+5% from last quarter</Text>
            </div>
          </Flex>
        </Card>
      </Grid>

      {/* Main Content Tabs */}
      <Card>
        <TabGroup index={activeTab} onIndexChange={setActiveTab}>
          <TabList className="mb-6">
            <Tab icon={ChatBubbleLeftRightIcon}>Communications</Tab>
            <Tab icon={DocumentDuplicateIcon}>Templates</Tab>
            <Tab icon={ChartBarIcon}>Analytics</Tab>
          </TabList>
          <TabPanels>
            {/* Communications Tab */}
            <TabPanel>
              <div className="space-y-6">
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <Select
                    value={selectedType}
                    onValueChange={setSelectedType}
                    className="max-w-xs"
                  >
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="email">Emails</SelectItem>
                    <SelectItem value="notification">Notifications</SelectItem>
                    <SelectItem value="announcement">Announcements</SelectItem>
                  </Select>
                  <TextInput
                    placeholder="Search communications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-xs"
                    icon={EyeIcon}
                  />
                </div>

                {/* Communications Table */}
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Communication</TableHeaderCell>
                      <TableHeaderCell>Type</TableHeaderCell>
                      <TableHeaderCell>Status</TableHeaderCell>
                      <TableHeaderCell>Target Audience</TableHeaderCell>
                      <TableHeaderCell>Created</TableHeaderCell>
                      <TableHeaderCell>Scheduled/Sent</TableHeaderCell>
                      <TableHeaderCell>Performance</TableHeaderCell>
                      <TableHeaderCell>Actions</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredCommunications.map(comm => (
                      <TableRow key={comm.id}>
                        <TableCell>
                          <div>
                            <Text className="font-medium">{comm.title}</Text>
                            <Text className="text-xs text-gray-500 line-clamp-1">{comm.content}</Text>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            color={
                              comm.type === 'email' 
                                ? 'blue' 
                                : comm.type === 'notification' 
                                  ? 'amber' 
                                  : 'emerald'
                            } 
                            size="sm"
                          >
                            <Flex justifyContent="start" className="gap-1">
                              {getTypeIcon(comm.type)}
                              <span>{comm.type.charAt(0).toUpperCase() + comm.type.slice(1)}</span>
                            </Flex>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            color={
                              comm.status === 'sent' 
                                ? 'emerald' 
                                : comm.status === 'scheduled' 
                                  ? 'blue' 
                                  : comm.status === 'draft'
                                    ? 'gray'
                                    : 'rose'
                            } 
                            size="sm"
                          >
                            {comm.status.charAt(0).toUpperCase() + comm.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {comm.targetAudience.map(audience => (
                              <Badge 
                                key={audience} 
                                color={
                                  audience === 'Gold' 
                                    ? 'amber' 
                                    : audience === 'Silver' 
                                      ? 'gray' 
                                      : audience === 'Bronze'
                                        ? 'orange'
                                        : 'blue'
                                } 
                                size="xs"
                              >
                                {audience}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(comm.createdAt)}</TableCell>
                        <TableCell>{formatDate(comm.sentAt || comm.scheduledFor)}</TableCell>
                        <TableCell>
                          {comm.status === 'sent' ? (
                            <div>
                              <Text className="text-xs">Open: {comm.openRate}%</Text>
                              <Text className="text-xs">Click: {comm.clickRate}%</Text>
                            </div>
                          ) : (
                            <Text className="text-xs text-gray-500">-</Text>
                          )}
                        </TableCell>
                        <TableCell>
                          <Flex justifyContent="start" className="gap-2">
                            <Button
                              icon={EyeIcon}
                              variant="secondary"
                              color="gray"
                              size="xs"
                            >
                              View
                            </Button>
                            {comm.status === 'draft' && (
                              <>
                                <Button
                                  icon={PencilIcon}
                                  variant="light"
                                  color="gray"
                                  size="xs"
                                />
                                <Button
                                  icon={TrashIcon}
                                  variant="light"
                                  color="gray"
                                  size="xs"
                                />
                              </>
                            )}
                          </Flex>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabPanel>

            {/* Templates Tab */}
            <TabPanel>
              <div className="space-y-6">
                <Grid numItemsMd={2} numItemsLg={3} className="gap-6">
                  {templates.map(template => (
                    <Card key={template.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <Badge 
                          color={
                            template.type === 'email' 
                              ? 'blue' 
                              : template.type === 'notification' 
                                ? 'amber' 
                                : 'emerald'
                          } 
                          size="sm"
                        >
                          <Flex justifyContent="start" className="gap-1">
                            {getTypeIcon(template.type)}
                            <span>{template.type.charAt(0).toUpperCase() + template.type.slice(1)}</span>
                          </Flex>
                        </Badge>
                        <div className="flex gap-1">
                          <Button
                            icon={PencilIcon}
                            variant="light"
                            color="gray"
                            size="xs"
                          />
                          <Button
                            icon={TrashIcon}
                            variant="light"
                            color="gray"
                            size="xs"
                          />
                        </div>
                      </div>
                      <Title className="mt-2">{template.title}</Title>
                      <Text className="mt-1 text-gray-600">{template.description}</Text>
                      
                      <div className="mt-4 flex items-center text-gray-500 text-sm">
                        <CalendarDaysIcon className="h-4 w-4 mr-1" />
                        <Text>
                          Created: {formatDate(template.createdAt)}
                        </Text>
                      </div>
                      
                      {template.lastUsed && (
                        <div className="mt-1 flex items-center text-gray-500 text-sm">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          <Text>
                            Last used: {formatDate(template.lastUsed)}
                          </Text>
                        </div>
                      )}
                      
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                        <Button
                          icon={PaperAirplaneIcon}
                          variant="secondary"
                          color="blue"
                          size="sm"
                        >
                          Use Template
                        </Button>
                      </div>
                    </Card>
                  ))}
                </Grid>
              </div>
            </TabPanel>

            {/* Analytics Tab */}
            <TabPanel>
              <div className="space-y-6">
                <Card>
                  <Title>Communication Volume</Title>
                  <Text>Monthly breakdown of communication types</Text>
                  <div className="h-80 mt-4">
                    {/* This would be a chart component */}
                    <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg">
                      <Text>Communication Volume Chart</Text>
                    </div>
                  </div>
                </Card>

                <Grid numItemsMd={2} className="gap-6">
                  <Card>
                    <Title>Engagement Metrics</Title>
                    <Text>Open and click rates by partner tier</Text>
                    <div className="h-60 mt-4">
                      {/* This would be a chart component */}
                      <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg">
                        <Text>Engagement Metrics Chart</Text>
                      </div>
                    </div>
                  </Card>
                  <Card>
                    <Title>Best Performing Communications</Title>
                    <Text>Top 5 communications by engagement</Text>
                    <Table className="mt-4">
                      <TableHead>
                        <TableRow>
                          <TableHeaderCell>Title</TableHeaderCell>
                          <TableHeaderCell>Type</TableHeaderCell>
                          <TableHeaderCell>Open Rate</TableHeaderCell>
                          <TableHeaderCell>Click Rate</TableHeaderCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {communications
                          .filter(comm => comm.status === 'sent' && comm.openRate !== undefined)
                          .sort((a, b) => (b.openRate || 0) - (a.openRate || 0))
                          .slice(0, 5)
                          .map(comm => (
                            <TableRow key={comm.id}>
                              <TableCell>{comm.title}</TableCell>
                              <TableCell>
                                <Badge 
                                  color={
                                    comm.type === 'email' 
                                      ? 'blue' 
                                      : comm.type === 'notification' 
                                        ? 'amber' 
                                        : 'emerald'
                                  } 
                                  size="sm"
                                >
                                  {comm.type.charAt(0).toUpperCase() + comm.type.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>{comm.openRate}%</TableCell>
                              <TableCell>{comm.clickRate}%</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </Card>
                </Grid>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>

      {/* New Communication Form (would be a modal in a real implementation) */}
      {showNewCommunicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <Title>Create New Communication</Title>
                <Button
                  icon={XCircleIcon}
                  variant="light"
                  color="gray"
                  onClick={() => setShowNewCommunicationForm(false)}
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <Text className="mb-2">Title</Text>
                  <TextInput placeholder="Enter communication title" />
                </div>
                
                <div>
                  <Text className="mb-2">Type</Text>
                  <Select defaultValue="email">
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="notification">Notification</SelectItem>
                    <SelectItem value="announcement">Announcement</SelectItem>
                  </Select>
                </div>
                
                <div>
                  <Text className="mb-2">Content</Text>
                  <Textarea placeholder="Enter communication content" rows={6} />
                </div>
                
                <div>
                  <Text className="mb-2">Target Audience</Text>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span>All Partners</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>Gold</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>Silver</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>Bronze</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <Text className="mb-2">Schedule</Text>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center">
                      <input type="radio" name="schedule" className="mr-2" defaultChecked />
                      <span>Send immediately</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="schedule" className="mr-2" />
                      <span>Schedule for later</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-3">
                <Button
                  variant="secondary"
                  color="gray"
                  onClick={() => setShowNewCommunicationForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  color="blue"
                  onClick={() => setShowNewCommunicationForm(false)}
                >
                  Send Communication
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Template Form (would be a modal in a real implementation) */}
      {showNewTemplateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <Title>Create New Template</Title>
                <Button
                  icon={XCircleIcon}
                  variant="light"
                  color="gray"
                  onClick={() => setShowNewTemplateForm(false)}
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <Text className="mb-2">Template Title</Text>
                  <TextInput placeholder="Enter template title" />
                </div>
                
                <div>
                  <Text className="mb-2">Type</Text>
                  <Select defaultValue="email">
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="notification">Notification</SelectItem>
                    <SelectItem value="announcement">Announcement</SelectItem>
                  </Select>
                </div>
                
                <div>
                  <Text className="mb-2">Description</Text>
                  <TextInput placeholder="Enter template description" />
                </div>
                
                <div>
                  <Text className="mb-2">Content</Text>
                  <Textarea placeholder="Enter template content" rows={8} />
                </div>
                
                <div className="mt-4">
                  <Text className="mb-2">Variables</Text>
                  <Text className="text-xs text-gray-500">
                    Use these variables in your template: {'{partner_name}'}, {'{company_name}'}, {'{tier}'}, {'{date}'}
                  </Text>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-3">
                <Button
                  variant="secondary"
                  color="gray"
                  onClick={() => setShowNewTemplateForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  color="blue"
                  onClick={() => setShowNewTemplateForm(false)}
                >
                  Save Template
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 