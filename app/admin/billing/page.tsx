'use client'

import { useState, Fragment } from 'react'
import {
  Card,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  Badge,
  AreaChart,
  DonutChart,
  Legend,
  Metric,
} from '@tremor/react'
import { Menu, Transition } from '@headlessui/react'
import {
  CreditCardIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  BuildingLibraryIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  PlusIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  StarIcon,
  ArchiveBoxXMarkIcon,
  UsersIcon,
  XMarkIcon,
  UserIcon,
  EnvelopeIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'

// Add type definition for a plan
interface Plan {
  name: string
  price: number
  description: string
  features: string[]
  color: string
  popular?: boolean
}

// Mock data for revenue metrics
const revenueData = [
  {
    date: '2024-01',
    'Monthly Recurring Revenue': 125000,
    'One-time Revenue': 15000,
  },
  {
    date: '2024-02',
    'Monthly Recurring Revenue': 140000,
    'One-time Revenue': 12000,
  },
  {
    date: '2024-03',
    'Monthly Recurring Revenue': 155000,
    'One-time Revenue': 18000,
  },
]

// Mock data for subscription distribution
const subscriptionData = [
  { name: 'Enterprise', value: 45 },
  { name: 'Professional', value: 35 },
  { name: 'Basic', value: 20 },
]

// Mock data for recent transactions
const transactions = [
  {
    id: 1,
    customer: 'Luxury Resort & Spa',
    amount: 2999,
    status: 'successful',
    type: 'subscription',
    plan: 'Enterprise',
    date: '2 hours ago',
  },
  {
    id: 2,
    customer: 'Oceanview Hotels Group',
    amount: 1999,
    status: 'successful',
    type: 'subscription',
    plan: 'Professional',
    date: '5 hours ago',
  },
  {
    id: 3,
    customer: 'Mountain Lodge Chain',
    amount: 499,
    status: 'failed',
    type: 'one-time',
    date: '1 day ago',
  },
  {
    id: 4,
    customer: 'City Suites Inc',
    amount: 999,
    status: 'pending',
    type: 'subscription',
    plan: 'Basic',
    date: '1 day ago',
  },
]

// Update the plans array type
const plans: Plan[] = [
  {
    name: 'Basic',
    price: 999,
    description: 'Perfect for small hotels and B&Bs',
    features: [
      'Up to 50 rooms',
      'Basic booking management',
      'Email support',
      'Standard analytics',
      '2 staff accounts',
    ],
    color: 'blue',
  },
  {
    name: 'Professional',
    price: 1999,
    description: 'Ideal for growing hotel businesses',
    features: [
      'Up to 200 rooms',
      'Advanced booking system',
      'Priority support',
      'Advanced analytics',
      '10 staff accounts',
      'API access',
    ],
    color: 'violet',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 2999,
    description: 'For large hotel chains and resorts',
    features: [
      'Unlimited rooms',
      'Custom solutions',
      '24/7 dedicated support',
      'Custom analytics',
      'Unlimited staff accounts',
      'API access',
      'White-label option',
    ],
    color: 'indigo',
  },
]

// Add mock subscribers data after other mock data
const mockSubscribers = {
  'Basic': [
    { id: 1, name: 'City Inn Hotels', email: 'manager@cityinn.com', joinDate: '2024-01-15', status: 'active' },
    { id: 2, name: 'Sunset B&B', email: 'owner@sunsetbb.com', joinDate: '2024-02-01', status: 'active' },
    { id: 3, name: 'Harbor View Inn', email: 'contact@harborview.com', joinDate: '2024-01-20', status: 'inactive' },
  ],
  'Professional': [
    { id: 4, name: 'Oceanview Hotels Group', email: 'sarah@oceanview.com', joinDate: '2023-12-10', status: 'active' },
    { id: 5, name: 'Urban Stays Corp', email: 'management@urbanstays.com', joinDate: '2024-01-05', status: 'active' },
    { id: 6, name: 'Riverside Hotels', email: 'info@riversidehotels.com', joinDate: '2024-02-15', status: 'active' },
  ],
  'Enterprise': [
    { id: 7, name: 'Luxury Resort & Spa', email: 'john@luxuryresort.com', joinDate: '2024-01-15', status: 'active' },
    { id: 8, name: 'Global Hotels Chain', email: 'operations@globalhotels.com', joinDate: '2024-01-25', status: 'active' },
    { id: 9, name: 'Premium Resorts Inc', email: 'admin@premiumresorts.com', joinDate: '2024-02-10', status: 'active' },
  ],
}

interface MenuItemProps {
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const MenuItem = ({ active, children, onClick, className = '' }: MenuItemProps) => (
  <button
    onClick={onClick}
    className={`
      flex w-full items-center px-4 py-2 text-sm gap-2
      ${active ? 'bg-gray-50 dark:bg-gray-700/50' : ''}
      ${className}
    `}
  >
    {children}
  </button>
)

export default function BillingPage() {
  const [selectedView, setSelectedView] = useState('overview')
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isSubscribersModalOpen, setIsSubscribersModalOpen] = useState(false)
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [plans, setPlans] = useState<Plan[]>([
    {
      name: 'Basic',
      price: 999,
      description: 'Perfect for small hotels and B&Bs',
      features: [
        'Up to 50 rooms',
        'Basic booking management',
        'Email support',
        'Standard analytics',
        '2 staff accounts',
      ],
      color: 'blue',
    },
    {
      name: 'Professional',
      price: 1999,
      description: 'Ideal for growing hotel businesses',
      features: [
        'Up to 200 rooms',
        'Advanced booking system',
        'Priority support',
        'Advanced analytics',
        '10 staff accounts',
        'API access',
      ],
      color: 'violet',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 2999,
      description: 'For large hotel chains and resorts',
      features: [
        'Unlimited rooms',
        'Custom solutions',
        '24/7 dedicated support',
        'Custom analytics',
        'Unlimited staff accounts',
        'API access',
        'White-label option',
      ],
      color: 'indigo',
    },
  ])

  const handleEditPlan = (plan: Plan) => {
    setSelectedPlan(plan)
    setIsEditModalOpen(true)
  }

  const handleViewSubscribers = (plan: Plan) => {
    setSelectedPlan(plan)
    setIsSubscribersModalOpen(true)
  }

  const handleViewAnalytics = (plan: Plan) => {
    setSelectedPlan(plan)
    setIsAnalyticsModalOpen(true)
  }

  const handleTogglePopular = (planToUpdate: Plan) => {
    setPlans(currentPlans =>
      currentPlans.map(plan => {
        if (plan.name === planToUpdate.name) {
          return { ...plan, popular: !plan.popular }
        }
        // Remove popular from other plans
        return { ...plan, popular: false }
      })
    )
  }

  const handleArchivePlan = (planToArchive: Plan) => {
    setPlans(currentPlans =>
      currentPlans.filter(plan => plan.name !== planToArchive.name)
    )
  }

  const EditPlanModal = ({ plan }: { plan: Plan }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <Title>Edit Plan: {plan.name}</Title>
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Plan Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Plan Name
            </label>
            <input
              type="text"
              defaultValue={plan.name}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Monthly Price (USD)
            </label>
            <input
              type="number"
              defaultValue={plan.price}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              defaultValue={plan.description}
              rows={3}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2"
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Features
            </label>
            <div className="space-y-2">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    defaultValue={feature}
                    className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2"
                  />
                  <button
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                    title="Remove feature"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                className="w-full py-2 px-4 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary text-gray-500 hover:text-primary transition-colors"
              >
                Add Feature
              </button>
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Theme Color
            </label>
            <select
              defaultValue={plan.color}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2"
            >
              <option value="blue">Blue</option>
              <option value="violet">Violet</option>
              <option value="indigo">Indigo</option>
            </select>
          </div>

          {/* Popular Badge */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="popular"
              defaultChecked={plan.popular}
              className="rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary"
            />
            <label
              htmlFor="popular"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Mark as Popular Plan
            </label>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Here you would typically save the changes
              setIsEditModalOpen(false)
            }}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )

  const SubscribersModal = ({ plan }: { plan: Plan }) => {
    const subscribers = mockSubscribers[plan.name as keyof typeof mockSubscribers] || []
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    const filteredSubscribers = subscribers.filter(sub => {
      const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sub.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || sub.status === statusFilter
      return matchesSearch && matchesStatus
    })

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <Title>Subscribers - {plan.name} Plan</Title>
              <Text>Manage subscribers for this plan</Text>
            </div>
            <button
              onClick={() => setIsSubscribersModalOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search subscribers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 pl-10"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Subscribers List */}
          <div className="space-y-4">
            {filteredSubscribers.map((subscriber) => (
              <Card key={subscriber.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {subscriber.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {subscriber.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge
                        color={subscriber.status === 'active' ? 'emerald' : 'red'}
                        size="sm"
                      >
                        {subscriber.status}
                      </Badge>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Joined {subscriber.joinDate}
                      </p>
                    </div>
                    <Menu as="div" className="relative">
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <MenuItem active={active}>
                                  <UserIcon className="w-4 h-4" />
                                  View Profile
                                </MenuItem>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <MenuItem active={active}>
                                  <EnvelopeIcon className="w-4 h-4" />
                                  Send Email
                                </MenuItem>
                              )}
                            </Menu.Item>
                            <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
                            <Menu.Item>
                              {({ active }) => (
                                <MenuItem
                                  active={active}
                                  className="text-red-600 dark:text-red-400"
                                >
                                  <XCircleIcon className="w-4 h-4" />
                                  Remove Access
                                </MenuItem>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredSubscribers.length === 0 && (
            <div className="text-center py-12">
              <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No subscribers found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  const PlanAnalyticsModal = ({ plan }: { plan: Plan }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <Title>Plan Analytics: {plan.name}</Title>
            <Text>View detailed analytics for this subscription plan</Text>
          </div>
          <button
            onClick={() => setIsAnalyticsModalOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="p-6">
            <Text>Active Subscribers</Text>
            <Metric>1,234</Metric>
          </Card>
          <Card className="p-6">
            <Text>Monthly Revenue</Text>
            <Metric>$45,678</Metric>
          </Card>
          <Card className="p-6">
            <Text>Growth Rate</Text>
            <Metric>+12.3%</Metric>
          </Card>
        </div>

        <Card>
          <Title>Subscription Growth</Title>
          <AreaChart
            className="h-72 mt-4"
            data={[
              { date: '2024-01', subscribers: 980 },
              { date: '2024-02', subscribers: 1100 },
              { date: '2024-03', subscribers: 1234 },
            ]}
            index="date"
            categories={['subscribers']}
            colors={['blue']}
            valueFormatter={(number) => number.toString()}
          />
        </Card>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setIsAnalyticsModalOpen(false)}
            className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <Title>Subscription & Billing</Title>
        <Text>Manage your subscription, billing, and payment settings</Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CurrencyDollarIcon className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <Text>Monthly Revenue</Text>
              <Metric>$173,000</Metric>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <BuildingLibraryIcon className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <Text>Active Subscriptions</Text>
              <Metric>2,345</Metric>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
              <ArrowTrendingUpIcon className="w-6 h-6 text-violet-500" />
            </div>
            <div>
              <Text>Growth Rate</Text>
              <Metric>+15.2%</Metric>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <Text>Avg. Revenue/Sub</Text>
              <Metric>$1,890</Metric>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <TabGroup
          index={selectedView === 'overview' ? 0 : selectedView === 'plans' ? 1 : 2}
          onIndexChange={(index) =>
            setSelectedView(index === 0 ? 'overview' : index === 1 ? 'plans' : 'transactions')
          }
        >
          <TabList variant="solid">
            <Tab icon={ChartBarIcon}>Overview</Tab>
            <Tab icon={CreditCardIcon}>Plans</Tab>
            <Tab icon={CurrencyDollarIcon}>Transactions</Tab>
          </TabList>
        </TabGroup>

        {selectedView === 'overview' && (
          <div className="mt-6 space-y-6">
            <div>
              <Title className="mb-4">Revenue Overview</Title>
              <Card>
                <AreaChart
                  className="h-72 mt-4"
                  data={revenueData}
                  index="date"
                  categories={['Monthly Recurring Revenue', 'One-time Revenue']}
                  colors={['blue', 'indigo']}
                  valueFormatter={(number) =>
                    new Intl.NumberFormat('us', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(number)
                  }
                />
              </Card>
            </div>

            <div>
              <Title className="mb-4">Subscription Distribution</Title>
              <Card>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <DonutChart
                    className="h-60"
                    data={subscriptionData}
                    category="value"
                    index="name"
                    valueFormatter={(value) => `${value}%`}
                    colors={['indigo', 'violet', 'blue']}
                  />
                  <Legend
                    className="max-w-xs mx-auto"
                    categories={subscriptionData.map((item) => item.name)}
                    colors={['indigo', 'violet', 'blue']}
                  />
                </div>
              </Card>
            </div>
          </div>
        )}

        {selectedView === 'plans' && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <Title>Subscription Plans</Title>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                <PlusIcon className="w-5 h-5" />
                Create New Plan
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card key={plan.name} className={plan.popular ? 'ring-2 ring-primary' : ''}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      {plan.popular && (
                        <Badge color="primary" className="mb-2">
                          Most Popular
                        </Badge>
                      )}
                      <Title>{plan.name}</Title>
                    </div>
                    <Menu as="div" className="relative">
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <MenuItem active={active} onClick={() => handleEditPlan(plan)}>
                                  <PencilIcon className="w-4 h-4" />
                                  Edit Plan
                                </MenuItem>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <MenuItem active={active} onClick={() => handleViewAnalytics(plan)}>
                                  <ChartBarIcon className="w-4 h-4" />
                                  View Analytics
                                </MenuItem>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <MenuItem active={active} onClick={() => handleTogglePopular(plan)}>
                                  <StarIcon className="w-4 h-4" />
                                  {plan.popular ? 'Remove Popular Badge' : 'Mark as Popular'}
                                </MenuItem>
                              )}
                            </Menu.Item>
                            <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
                            <Menu.Item>
                              {({ active }) => (
                                <MenuItem
                                  active={active}
                                  onClick={() => handleArchivePlan(plan)}
                                  className="text-red-600 dark:text-red-400"
                                >
                                  <ArchiveBoxXMarkIcon className="w-4 h-4" />
                                  Archive Plan
                                </MenuItem>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-gray-500 dark:text-gray-400">/month</span>
                  </div>
                  <Text className="mt-2">{plan.description}</Text>
                  <div className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircleIcon className={`w-5 h-5 text-${plan.color}-500`} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-2">
                    <button
                      onClick={() => handleViewSubscribers(plan)}
                      className="flex-1 py-2 px-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <UsersIcon className="w-4 h-4" />
                      Subscribers
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'transactions' && (
          <div className="mt-6">
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <Card key={transaction.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-lg ${
                          transaction.status === 'successful'
                            ? 'bg-green-50 dark:bg-green-900/20'
                            : transaction.status === 'failed'
                            ? 'bg-red-50 dark:bg-red-900/20'
                            : 'bg-yellow-50 dark:bg-yellow-900/20'
                        }`}
                      >
                        {transaction.status === 'successful' ? (
                          <CheckCircleIcon
                            className="w-6 h-6 text-green-500"
                            aria-hidden="true"
                          />
                        ) : transaction.status === 'failed' ? (
                          <XCircleIcon className="w-6 h-6 text-red-500" aria-hidden="true" />
                        ) : (
                          <ClockIcon className="w-6 h-6 text-yellow-500" aria-hidden="true" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {transaction.customer}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <span>{transaction.type}</span>
                          {transaction.plan && (
                            <>
                              <span>•</span>
                              <span>{transaction.plan}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        ${transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Edit Plan Modal */}
      {isEditModalOpen && selectedPlan && (
        <EditPlanModal plan={selectedPlan} />
      )}

      {/* Subscribers Modal */}
      {isSubscribersModalOpen && selectedPlan && (
        <SubscribersModal plan={selectedPlan} />
      )}

      {/* Plan Analytics Modal */}
      {isAnalyticsModalOpen && selectedPlan && (
        <PlanAnalyticsModal plan={selectedPlan} />
      )}
    </div>
  )
} 