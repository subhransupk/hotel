'use client'

import { useState, Fragment, useEffect } from 'react'
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
  AreaChart,
  BarChart,
  DonutChart,
  Legend,
  Metric,
  TextInput,
  Select,
  SelectItem,
} from '@tremor/react'
import {
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  InboxIcon,
  UserIcon,
  BuildingOfficeIcon,
  ArrowTrendingUpIcon,
  StarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  PaperAirplaneIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
  XMarkIcon,
  EyeIcon,
  ArrowPathIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import { Menu, Transition, Dialog } from '@headlessui/react'
import { createPortal } from 'react-dom'

// Types
interface Ticket {
  id: string
  customer: string
  hotel: string
  subject: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: string
  assignee: string
  created: string
  lastUpdate: string
}

interface SupportAgent {
  id: number
  name: string
  avatar: string
  role: string
  status: 'online' | 'offline' | 'busy'
  tickets: number
  resolution: number
  satisfaction: number
}

// Mock data for support metrics
const supportMetrics = [
  {
    title: 'Open Tickets',
    metric: '42',
    trend: '+5%',
    icon: InboxIcon,
    color: 'blue' as const,
  },
  {
    title: 'Avg Response Time',
    metric: '2.5h',
    trend: '-12%',
    icon: ClockIcon,
    color: 'violet' as const,
  },
  {
    title: 'Resolution Rate',
    metric: '94%',
    trend: '+2%',
    icon: CheckCircleIcon,
    color: 'emerald' as const,
  },
  {
    title: 'Customer Satisfaction',
    metric: '4.8/5',
    trend: '+0.3',
    icon: StarIcon,
    color: 'amber' as const,
  },
]

// Mock data for tickets
const tickets: Ticket[] = [
  {
    id: 'TKT-001',
    customer: 'John Smith',
    hotel: 'Luxury Resort & Spa',
    subject: 'Booking System Error',
    status: 'open',
    priority: 'high',
    category: 'Technical',
    assignee: 'Sarah Johnson',
    created: '2 hours ago',
    lastUpdate: '15 minutes ago',
  },
  {
    id: 'TKT-002',
    customer: 'Emma Wilson',
    hotel: 'Oceanview Hotels',
    subject: 'Payment Integration Issue',
    status: 'in_progress',
    priority: 'urgent',
    category: 'Billing',
    assignee: 'Mike Brown',
    created: '5 hours ago',
    lastUpdate: '30 minutes ago',
  },
  {
    id: 'TKT-003',
    customer: 'David Lee',
    hotel: 'Mountain Lodge',
    subject: 'Feature Request',
    status: 'open',
    priority: 'medium',
    category: 'Feature',
    assignee: 'Unassigned',
    created: '1 day ago',
    lastUpdate: '2 hours ago',
  },
  {
    id: 'TKT-004',
    customer: 'Lisa Anderson',
    hotel: 'City Suites',
    subject: 'Account Access',
    status: 'resolved',
    priority: 'high',
    category: 'Access',
    assignee: 'Tom Wilson',
    created: '2 days ago',
    lastUpdate: '1 hour ago',
  },
]

// Mock data for support agents
const supportAgents: SupportAgent[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'SJ',
    role: 'Senior Support',
    status: 'online',
    tickets: 15,
    resolution: 95,
    satisfaction: 4.9,
  },
  {
    id: 2,
    name: 'Mike Brown',
    avatar: 'MB',
    role: 'Technical Support',
    status: 'busy',
    tickets: 12,
    resolution: 92,
    satisfaction: 4.7,
  },
  {
    id: 3,
    name: 'Tom Wilson',
    avatar: 'TW',
    role: 'Customer Success',
    status: 'online',
    tickets: 8,
    resolution: 88,
    satisfaction: 4.8,
  },
  {
    id: 4,
    name: 'Emily Davis',
    avatar: 'ED',
    role: 'Support Specialist',
    status: 'offline',
    tickets: 10,
    resolution: 90,
    satisfaction: 4.6,
  },
]

// Mock data for satisfaction trend
const satisfactionTrend = [
  { date: '2024-01', satisfaction: 4.5 },
  { date: '2024-02', satisfaction: 4.6 },
  { date: '2024-03', satisfaction: 4.7 },
  { date: '2024-04', satisfaction: 4.6 },
  { date: '2024-05', satisfaction: 4.8 },
  { date: '2024-06', satisfaction: 4.7 },
  { date: '2024-07', satisfaction: 4.8 },
  { date: '2024-08', satisfaction: 4.9 },
]

// Mock data for ticket categories
const ticketCategories = [
  { name: 'Technical', value: 35 },
  { name: 'Billing', value: 25 },
  { name: 'Feature', value: 20 },
  { name: 'Access', value: 15 },
  { name: 'Other', value: 5 },
]

const statusColors = {
  open: 'blue',
  in_progress: 'amber',
  resolved: 'emerald',
  closed: 'gray',
  low: 'gray',
  medium: 'blue',
  high: 'amber',
  urgent: 'red',
  online: 'emerald',
  offline: 'gray',
  busy: 'amber',
} as const

export default function SupportPage() {
  const [selectedView, setSelectedView] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  
  // Modal states
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  // New state variables
  const [selectedAgent, setSelectedAgent] = useState('')
  const [newStatus, setNewStatus] = useState('')

  useEffect(() => {
    if (selectedTicket) {
      setNewStatus(selectedTicket.status)
    }
  }, [selectedTicket])

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.hotel.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleViewDetails = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setIsDetailsModalOpen(true)
  }

  const handleAssign = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setIsAssignModalOpen(true)
  }

  const handleChangeStatus = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setIsStatusModalOpen(true)
  }

  const handleDeleteTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <Title>Support & Success</Title>
        <Text>Manage customer support tickets and monitor team performance</Text>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {supportMetrics.map((metric) => (
          <Card key={metric.title} className="relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className={`p-2 bg-${metric.color}-50 dark:bg-${metric.color}-900/20 rounded-lg`}>
                <metric.icon className={`w-6 h-6 text-${metric.color}-500`} />
              </div>
              <div>
                <Text>{metric.title}</Text>
                <div className="flex items-baseline gap-2">
                  <Metric>{metric.metric}</Metric>
                  <span className={`text-sm text-${metric.color}-500`}>{metric.trend}</span>
                </div>
              </div>
            </div>
            {/* Decorative background pattern */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10">
              <metric.icon className={`w-full h-full text-${metric.color}-500`} />
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Card>
        <TabGroup
          index={selectedView === 'overview' ? 0 : selectedView === 'tickets' ? 1 : 2}
          onIndexChange={(index) =>
            setSelectedView(index === 0 ? 'overview' : index === 1 ? 'tickets' : 'team')
          }
        >
          <TabList variant="solid">
            <Tab icon={ChartBarIcon}>Overview</Tab>
            <Tab icon={ChatBubbleLeftRightIcon}>Tickets</Tab>
            <Tab icon={UserGroupIcon}>Team</Tab>
          </TabList>

          <TabPanels>
            {/* Overview Panel */}
            <TabPanel>
              <div className="mt-6 space-y-6">
                {/* Satisfaction Trend */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Title>Customer Satisfaction Trend</Title>
                      <Text>Average satisfaction score over time</Text>
                    </div>
                    <Badge size="xl" color="emerald">
                      Excellent
                    </Badge>
                  </div>
                  <Card>
                    <AreaChart
                      className="h-72"
                      data={satisfactionTrend}
                      index="date"
                      categories={['satisfaction']}
                      colors={['amber']}
                      valueFormatter={(number) => number.toFixed(1)}
                      showLegend={false}
                    />
                  </Card>
                </div>

                {/* Ticket Categories */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <Title>Ticket Categories</Title>
                    <Text>Distribution of support tickets by category</Text>
                    <DonutChart
                      className="h-60 mt-4"
                      data={ticketCategories}
                      category="value"
                      index="name"
                      valueFormatter={(value) => `${value}%`}
                      colors={['blue', 'violet', 'indigo', 'rose', 'cyan']}
                    />
                    <Legend
                      className="mt-4"
                      categories={ticketCategories.map((item) => item.name)}
                      colors={['blue', 'violet', 'indigo', 'rose', 'cyan']}
                    />
                  </Card>

                  {/* Team Performance */}
                  <Card>
                    <Title>Team Performance</Title>
                    <Text>Support team metrics and ratings</Text>
                    <BarChart
                      className="h-60 mt-4"
                      data={supportAgents}
                      index="name"
                      categories={['resolution']}
                      colors={['violet']}
                      valueFormatter={(value) => `${value}%`}
                    />
                  </Card>
                </div>
              </div>
            </TabPanel>

            {/* Tickets Panel */}
            <TabPanel>
              <div className="mt-6">
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search tickets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 pl-10"
                      />
                      <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                  <div className="relative z-[60]">
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                      className="w-full sm:w-40"
                    >
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </Select>
                  </div>
                  <div className="relative z-[60]">
                    <Select
                      value={priorityFilter}
                      onValueChange={setPriorityFilter}
                      className="w-full sm:w-40"
                    >
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </Select>
                  </div>
                </div>

                {/* Tickets List */}
                <div className="space-y-4">
                  {filteredTickets.map((ticket) => (
                    <Card key={ticket.id}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                            <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-blue-500" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Text className="font-medium">{ticket.subject}</Text>
                              <Badge color={statusColors[ticket.status]}>{ticket.status}</Badge>
                              <Badge color={statusColors[ticket.priority]}>{ticket.priority}</Badge>
                            </div>
                            <div className="mt-1 space-y-1">
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <UserIcon className="w-4 h-4" />
                                  {ticket.customer}
                                </span>
                                <span className="flex items-center gap-1">
                                  <BuildingOfficeIcon className="w-4 h-4" />
                                  {ticket.hotel}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <ClockIcon className="w-4 h-4" />
                                  Created {ticket.created}
                                </span>
                                <span>•</span>
                                <span>Last update {ticket.lastUpdate}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <UserGroupIcon className="w-4 h-4" />
                                  {ticket.assignee}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Menu as="div" className="relative z-50">
                          <Menu.Button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <EllipsisVerticalIcon className="w-5 h-5 text-gray-500" />
                          </Menu.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[60]">
                              <div className="px-1 py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => handleViewDetails(ticket)}
                                      className={`${
                                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 dark:text-gray-100`}
                                    >
                                      <EyeIcon className="mr-2 h-5 w-5" />
                                      View Details
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => handleAssign(ticket)}
                                      className={`${
                                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 dark:text-gray-100`}
                                    >
                                      <UserPlusIcon className="mr-2 h-5 w-5" />
                                      Assign
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => handleChangeStatus(ticket)}
                                      className={`${
                                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 dark:text-gray-100`}
                                    >
                                      <ArrowPathIcon className="mr-2 h-5 w-5" />
                                      Change Status
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                              <div className="px-1 py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => handleDeleteTicket(ticket)}
                                      className={`${
                                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-600 dark:text-red-400`}
                                    >
                                      <TrashIcon className="mr-2 h-5 w-5" />
                                      Delete
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabPanel>

            {/* Team Panel */}
            <TabPanel>
              <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {supportAgents.map((agent) => (
                    <Card key={agent.id}>
                      <div className="flex flex-col items-center text-center">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl font-semibold">
                            {agent.avatar}
                          </div>
                          <div
                            className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white dark:border-gray-900 bg-${
                              statusColors[agent.status]
                            }-500`}
                          />
                        </div>
                        <div className="mt-4">
                          <Text className="font-medium">{agent.name}</Text>
                          <Text className="text-sm text-gray-500">{agent.role}</Text>
                        </div>
                        <div className="w-full grid grid-cols-3 gap-4 mt-6">
                          <div>
                            <Text className="text-2xl font-semibold">{agent.tickets}</Text>
                            <Text className="text-sm text-gray-500">Tickets</Text>
                          </div>
                          <div>
                            <Text className="text-2xl font-semibold">{agent.resolution}%</Text>
                            <Text className="text-sm text-gray-500">Resolution</Text>
                          </div>
                          <div>
                            <Text className="text-2xl font-semibold">{agent.satisfaction}</Text>
                            <Text className="text-sm text-gray-500">Rating</Text>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>

      {/* Add Modals */}
      {selectedTicket && (
        <>
          <Dialog open={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} className="relative z-[100]">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-2xl rounded-xl bg-white dark:bg-gray-800 p-6 relative z-[110]">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Ticket Details
                    </Dialog.Title>
                    <Text className="text-gray-500">#{selectedTicket.id}</Text>
                  </div>
                  <button
                    onClick={() => setIsDetailsModalOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <Text className="font-medium">Subject</Text>
                    <p className="mt-1 text-gray-900 dark:text-gray-100">{selectedTicket.subject}</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <Badge color={statusColors[selectedTicket.status]}>{selectedTicket.status}</Badge>
                    <Badge color={statusColors[selectedTicket.priority]}>{selectedTicket.priority}</Badge>
                    <Badge color="blue">{selectedTicket.category}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Text className="font-medium">Customer</Text>
                      <p className="mt-1 text-gray-900 dark:text-gray-100">{selectedTicket.customer}</p>
                    </div>
                    <div>
                      <Text className="font-medium">Hotel</Text>
                      <p className="mt-1 text-gray-900 dark:text-gray-100">{selectedTicket.hotel}</p>
                    </div>
                    <div>
                      <Text className="font-medium">Created</Text>
                      <p className="mt-1 text-gray-900 dark:text-gray-100">{selectedTicket.created}</p>
                    </div>
                    <div>
                      <Text className="font-medium">Last Update</Text>
                      <p className="mt-1 text-gray-900 dark:text-gray-100">{selectedTicket.lastUpdate}</p>
                    </div>
                    <div>
                      <Text className="font-medium">Assignee</Text>
                      <p className="mt-1 text-gray-900 dark:text-gray-100">{selectedTicket.assignee}</p>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>

          <Dialog open={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} className="relative z-[100]">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 p-6">
                <div className="flex justify-between items-start mb-6">
                  <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Assign Ticket
                  </Dialog.Title>
                  <button
                    onClick={() => setIsAssignModalOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <Text className="mb-2">Select Agent</Text>
                    <Menu as="div" className="relative w-full">
                      <Menu.Button className="w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <span>{selectedAgent ? supportAgents.find(a => a.id.toString() === selectedAgent)?.name || 'Select an agent' : 'Select an agent'}</span>
                        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute z-[150] mt-1 w-full rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 focus:outline-none overflow-hidden">
                          {supportAgents.map((agent) => (
                            <Menu.Item key={agent.id}>
                              {({ active }) => (
                                <button
                                  onClick={() => setSelectedAgent(agent.id.toString())}
                                  className={`${
                                    active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                  } w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-100`}
                                >
                                  {`${agent.name} - ${agent.role}`}
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setIsAssignModalOpen(false)}
                      className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setIsAssignModalOpen(false)}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Assign
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>

          <Dialog open={isStatusModalOpen} onClose={() => setIsStatusModalOpen(false)} className="relative z-[100]">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 p-6">
                <div className="flex justify-between items-start mb-6">
                  <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Change Status
                  </Dialog.Title>
                  <button
                    onClick={() => setIsStatusModalOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <Text className="mb-2">Select Status</Text>
                    <Menu as="div" className="relative w-full">
                      <Menu.Button className="w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <span className="capitalize">{newStatus || selectedTicket.status}</span>
                        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute z-[150] mt-1 w-full rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 focus:outline-none overflow-hidden">
                          {['open', 'in_progress', 'resolved', 'closed'].map((status) => (
                            <Menu.Item key={status}>
                              {({ active }) => (
                                <button
                                  onClick={() => setNewStatus(status)}
                                  className={`${
                                    active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                  } w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-100 capitalize`}
                                >
                                  {status.replace('_', ' ')}
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setIsStatusModalOpen(false)}
                      className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setIsStatusModalOpen(false)}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>

          <Dialog open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} className="relative z-[100]">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 p-6 relative z-[110]">
                <div className="flex items-center space-x-3 text-red-500 dark:text-red-400 mb-6">
                  <ExclamationTriangleIcon className="h-6 w-6" />
                  <Dialog.Title className="text-lg font-semibold">Delete Ticket</Dialog.Title>
                </div>

                <p className="text-gray-600 dark:text-gray-300">
                  Are you sure you want to delete this ticket? This action cannot be undone.
                </p>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        </>
      )}
    </div>
  )
} 