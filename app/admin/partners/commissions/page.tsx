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
  TextInput,
  NumberInput,
  Select,
  SelectItem,
  Divider,
  Grid,
  Col,
  Flex,
  Switch,
  DateRangePicker,
  DateRangePickerValue,
  BarChart,
  DonutChart,
} from '@tremor/react'
import {
  CurrencyDollarIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  CheckIcon,
  XMarkIcon,
  ArrowPathIcon,
  CalendarIcon,
  DocumentTextIcon,
  ChartBarIcon,
  AdjustmentsHorizontalIcon,
  ArrowDownTrayIcon,
  StarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

// Define commission types
type CommissionTier = {
  id: string;
  name: string;
  baseRate: number;
  bonusRate: number;
  minimumRevenue: number;
  color: string;
}

type CommissionRule = {
  id: string;
  name: string;
  description: string;
  productCategory: string;
  rate: number;
  tierId: string;
  isActive: boolean;
}

type CommissionPayment = {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerTier: string;
  amount: number;
  status: 'pending' | 'processed' | 'failed';
  period: string;
  generatedDate: string;
  processedDate?: string;
  bookings: number;
}

// Mock data for commission tiers
const commissionTiers: CommissionTier[] = [
  {
    id: '1',
    name: 'Gold',
    baseRate: 15,
    bonusRate: 5,
    minimumRevenue: 50000,
    color: 'amber',
  },
  {
    id: '2',
    name: 'Silver',
    baseRate: 12,
    bonusRate: 3,
    minimumRevenue: 25000,
    color: 'slate',
  },
  {
    id: '3',
    name: 'Bronze',
    baseRate: 10,
    bonusRate: 2,
    minimumRevenue: 10000,
    color: 'orange',
  },
]

// Mock data for commission rules
const commissionRules: CommissionRule[] = [
  {
    id: '1',
    name: 'Standard Room Booking',
    description: 'Commission for standard room bookings',
    productCategory: 'Standard Rooms',
    rate: 10,
    tierId: '3',
    isActive: true,
  },
  {
    id: '2',
    name: 'Luxury Suite Booking',
    description: 'Commission for luxury suite bookings',
    productCategory: 'Luxury Suites',
    rate: 15,
    tierId: '3',
    isActive: true,
  },
  {
    id: '3',
    name: 'Extended Stay Bonus',
    description: 'Additional commission for bookings over 7 days',
    productCategory: 'All Rooms',
    rate: 5,
    tierId: '2',
    isActive: true,
  },
  {
    id: '4',
    name: 'Premium Partner Rate',
    description: 'Special rate for gold tier partners',
    productCategory: 'All Products',
    rate: 18,
    tierId: '1',
    isActive: true,
  },
  {
    id: '5',
    name: 'Seasonal Promotion',
    description: 'Increased commission during peak season',
    productCategory: 'All Rooms',
    rate: 20,
    tierId: '1',
    isActive: false,
  },
]

// Mock data for commission payments
const commissionPayments: CommissionPayment[] = [
  {
    id: 'CP-2024-001',
    partnerId: 'P001',
    partnerName: 'TravelTech Solutions',
    partnerTier: 'Gold',
    amount: 12450.75,
    status: 'processed',
    period: 'March 2024',
    generatedDate: '2024-04-01',
    processedDate: '2024-04-05',
    bookings: 42,
  },
  {
    id: 'CP-2024-002',
    partnerId: 'P002',
    partnerName: 'Global Bookings Inc',
    partnerTier: 'Silver',
    amount: 8320.50,
    status: 'processed',
    period: 'March 2024',
    generatedDate: '2024-04-01',
    processedDate: '2024-04-05',
    bookings: 31,
  },
  {
    id: 'CP-2024-003',
    partnerId: 'P003',
    partnerName: 'StayFinder',
    partnerTier: 'Bronze',
    amount: 4150.25,
    status: 'pending',
    period: 'March 2024',
    generatedDate: '2024-04-01',
    bookings: 18,
  },
  {
    id: 'CP-2024-004',
    partnerId: 'P004',
    partnerName: 'HotelConnect',
    partnerTier: 'Silver',
    amount: 7890.00,
    status: 'pending',
    period: 'March 2024',
    generatedDate: '2024-04-01',
    bookings: 27,
  },
  {
    id: 'CP-2024-005',
    partnerId: 'P005',
    partnerName: 'Luxury Stays',
    partnerTier: 'Gold',
    amount: 15780.25,
    status: 'failed',
    period: 'March 2024',
    generatedDate: '2024-04-01',
    bookings: 35,
  },
]

// Mock data for commission analytics
const commissionTrends = [
  {
    month: 'Jan',
    'Total Commission': 32500,
    'Partner Count': 120,
  },
  {
    month: 'Feb',
    'Total Commission': 38700,
    'Partner Count': 132,
  },
  {
    month: 'Mar',
    'Total Commission': 42300,
    'Partner Count': 145,
  },
  {
    month: 'Apr',
    'Total Commission': 48500,
    'Partner Count': 156,
  },
]

const commissionByTier = [
  { name: 'Gold', value: 45 },
  { name: 'Silver', value: 35 },
  { name: 'Bronze', value: 20 },
]

export default function CommissionManagementPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
    to: new Date(),
  })
  const [selectedRule, setSelectedRule] = useState<CommissionRule | null>(null)
  const [isEditingRule, setIsEditingRule] = useState(false)
  const [newRule, setNewRule] = useState<Partial<CommissionRule>>({
    name: '',
    description: '',
    productCategory: '',
    rate: 10,
    tierId: '3',
    isActive: true,
  })

  // Handler for editing a commission rule
  const handleEditRule = (rule: CommissionRule) => {
    setSelectedRule(rule)
    setNewRule({
      name: rule.name,
      description: rule.description,
      productCategory: rule.productCategory,
      rate: rule.rate,
      tierId: rule.tierId,
      isActive: rule.isActive,
    })
    setIsEditingRule(true)
  }

  // Handler for saving a commission rule
  const handleSaveRule = () => {
    // In a real application, this would update the database
    console.log('Saving rule:', newRule)
    setIsEditingRule(false)
    setSelectedRule(null)
    setNewRule({
      name: '',
      description: '',
      productCategory: '',
      rate: 10,
      tierId: '3',
      isActive: true,
    })
  }

  // Handler for canceling rule edit
  const handleCancelEdit = () => {
    setIsEditingRule(false)
    setSelectedRule(null)
    setNewRule({
      name: '',
      description: '',
      productCategory: '',
      rate: 10,
      tierId: '3',
      isActive: true,
    })
  }

  // Handler for processing a payment
  const handleProcessPayment = (paymentId: string) => {
    // In a real application, this would process the payment
    console.log('Processing payment:', paymentId)
  }

  // Handler for downloading a commission report
  const handleDownloadReport = (paymentId: string) => {
    // In a real application, this would download a report
    console.log('Downloading report for payment:', paymentId)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Title className="text-2xl font-bold">Commission Management</Title>
          <Text className="mt-1 text-gray-600">
            Manage partner commission rates, rules, and payments
          </Text>
        </div>
        <div className="flex items-center gap-2">
          <DateRangePicker
            className="max-w-md mx-auto"
            value={dateRange}
            onValueChange={setDateRange}
            selectPlaceholder="Select date range"
            color="blue"
          />
          <Button
            icon={ArrowPathIcon}
            variant="secondary"
            color="gray"
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Commission Overview Cards */}
      <Grid numItemsMd={2} numItemsLg={4} className="gap-6">
        <Card decoration="top" decorationColor="blue">
          <Flex justifyContent="start" className="space-x-4">
            <div className="p-2 bg-blue-50 rounded-md">
              <CurrencyDollarIcon className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <Text>Total Commission (MTD)</Text>
              <Title className="text-2xl font-bold">$48,591.75</Title>
              <Text className="text-sm text-green-500">+12% from last month</Text>
            </div>
          </Flex>
        </Card>
        <Card decoration="top" decorationColor="emerald">
          <Flex justifyContent="start" className="space-x-4">
            <div className="p-2 bg-emerald-50 rounded-md">
              <UserGroupIcon className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <Text>Active Partners</Text>
              <Title className="text-2xl font-bold">156</Title>
              <Text className="text-sm text-green-500">+8 new this month</Text>
            </div>
          </Flex>
        </Card>
        <Card decoration="top" decorationColor="amber">
          <Flex justifyContent="start" className="space-x-4">
            <div className="p-2 bg-amber-50 rounded-md">
              <StarIcon className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <Text>Avg. Commission Rate</Text>
              <Title className="text-2xl font-bold">12.5%</Title>
              <Text className="text-sm text-gray-500">Across all tiers</Text>
            </div>
          </Flex>
        </Card>
        <Card decoration="top" decorationColor="purple">
          <Flex justifyContent="start" className="space-x-4">
            <div className="p-2 bg-purple-50 rounded-md">
              <DocumentTextIcon className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <Text>Pending Payments</Text>
              <Title className="text-2xl font-bold">12</Title>
              <Text className="text-sm text-amber-500">$32,450.25 total</Text>
            </div>
          </Flex>
        </Card>
      </Grid>

      {/* Main Content Tabs */}
      <Card>
        <TabGroup index={activeTab} onIndexChange={setActiveTab}>
          <TabList className="mb-6">
            <Tab icon={ChartBarIcon}>Overview</Tab>
            <Tab icon={AdjustmentsHorizontalIcon}>Commission Rules</Tab>
            <Tab icon={CurrencyDollarIcon}>Payments</Tab>
          </TabList>
          <TabPanels>
            {/* Overview Tab */}
            <TabPanel>
              <div className="space-y-6">
                <Grid numItemsMd={2} className="gap-6">
                  <Card>
                    <Title>Commission Trends</Title>
                    <Text>Monthly commission and partner growth</Text>
                    <BarChart
                      className="mt-4 h-80"
                      data={commissionTrends}
                      index="month"
                      categories={["Total Commission", "Partner Count"]}
                      colors={["blue", "emerald"]}
                      valueFormatter={(number) => 
                        number > 1000 ? `$${(number/1000).toFixed(1)}K` : number.toString()
                      }
                      yAxisWidth={60}
                      showLegend
                    />
                  </Card>
                  <Card>
                    <Title>Commission by Tier</Title>
                    <Text>Distribution of commission by partner tier</Text>
                    <DonutChart
                      className="mt-4 h-80"
                      data={commissionByTier}
                      category="value"
                      index="name"
                      valueFormatter={(value) => `${value}%`}
                      colors={["amber", "slate", "orange"]}
                      showLabel
                      showAnimation
                    />
                  </Card>
                </Grid>

                <Card>
                  <Title>Commission Tiers</Title>
                  <Text>Base commission rates by partner tier</Text>
                  <Table className="mt-4">
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Tier</TableHeaderCell>
                        <TableHeaderCell>Base Rate</TableHeaderCell>
                        <TableHeaderCell>Bonus Rate</TableHeaderCell>
                        <TableHeaderCell>Minimum Revenue</TableHeaderCell>
                        <TableHeaderCell>Partners</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {commissionTiers.map((tier) => (
                        <TableRow key={tier.id}>
                          <TableCell>
                            <Badge color={tier.color as any} size="sm">
                              {tier.name}
                            </Badge>
                          </TableCell>
                          <TableCell>{tier.baseRate}%</TableCell>
                          <TableCell>+{tier.bonusRate}%</TableCell>
                          <TableCell>${tier.minimumRevenue.toLocaleString()}</TableCell>
                          <TableCell>
                            {tier.name === 'Gold' ? '28' : tier.name === 'Silver' ? '47' : '81'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            </TabPanel>

            {/* Commission Rules Tab */}
            <TabPanel>
              <div className="space-y-6">
                <Flex justifyContent="between" alignItems="center">
                  <Title>Commission Rules</Title>
                  <Button 
                    icon={PlusIcon} 
                    color="blue"
                    onClick={() => setIsEditingRule(true)}
                  >
                    Add Rule
                  </Button>
                </Flex>

                {isEditingRule && (
                  <Card className="bg-gray-50 border border-gray-200">
                    <Title className="mb-4">
                      {selectedRule ? 'Edit Commission Rule' : 'Create New Commission Rule'}
                    </Title>
                    <Grid numItemsMd={2} className="gap-4 mb-4">
                      <div>
                        <Text className="mb-2">Rule Name</Text>
                        <TextInput
                          placeholder="Enter rule name"
                          value={newRule.name}
                          onChange={(e) => setNewRule({...newRule, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Text className="mb-2">Product Category</Text>
                        <TextInput
                          placeholder="Enter product category"
                          value={newRule.productCategory}
                          onChange={(e) => setNewRule({...newRule, productCategory: e.target.value})}
                        />
                      </div>
                      <div>
                        <Text className="mb-2">Commission Rate (%)</Text>
                        <NumberInput
                          placeholder="Enter rate"
                          value={newRule.rate}
                          onChange={(e) => setNewRule({...newRule, rate: typeof e === 'number' ? e : parseFloat(e.target.value) || 0})}
                          min={0}
                          max={100}
                          step={0.5}
                        />
                      </div>
                      <div>
                        <Text className="mb-2">Applicable Tier</Text>
                        <Select
                          value={newRule.tierId}
                          onValueChange={(value) => setNewRule({...newRule, tierId: value})}
                        >
                          {commissionTiers.map((tier) => (
                            <SelectItem key={tier.id} value={tier.id}>
                              {tier.name}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                      <div className="col-span-2">
                        <Text className="mb-2">Description</Text>
                        <TextInput
                          placeholder="Enter rule description"
                          value={newRule.description}
                          onChange={(e) => setNewRule({...newRule, description: e.target.value})}
                        />
                      </div>
                      <div className="col-span-2">
                        <Flex justifyContent="start" alignItems="center" className="space-x-2">
                          <Switch
                            checked={newRule.isActive}
                            onChange={() => setNewRule({...newRule, isActive: !newRule.isActive})}
                          />
                          <Text>{newRule.isActive ? 'Active' : 'Inactive'}</Text>
                        </Flex>
                      </div>
                    </Grid>
                    <Flex justifyContent="end" className="space-x-2 mt-4">
                      <Button
                        variant="secondary"
                        color="gray"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                      <Button
                        color="blue"
                        onClick={handleSaveRule}
                      >
                        Save Rule
                      </Button>
                    </Flex>
                  </Card>
                )}

                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Rule Name</TableHeaderCell>
                      <TableHeaderCell>Category</TableHeaderCell>
                      <TableHeaderCell>Rate</TableHeaderCell>
                      <TableHeaderCell>Tier</TableHeaderCell>
                      <TableHeaderCell>Status</TableHeaderCell>
                      <TableHeaderCell>Actions</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {commissionRules.map((rule) => (
                      <TableRow key={rule.id}>
                        <TableCell>
                          <div>
                            <Text className="font-medium">{rule.name}</Text>
                            <Text className="text-xs text-gray-500">{rule.description}</Text>
                          </div>
                        </TableCell>
                        <TableCell>{rule.productCategory}</TableCell>
                        <TableCell>{rule.rate}%</TableCell>
                        <TableCell>
                          <Badge 
                            color={
                              commissionTiers.find(t => t.id === rule.tierId)?.color as any
                            } 
                            size="sm"
                          >
                            {commissionTiers.find(t => t.id === rule.tierId)?.name}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            color={rule.isActive ? 'emerald' : 'gray'} 
                            size="sm"
                          >
                            {rule.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Flex justifyContent="end" className="space-x-2">
                            <Button
                              icon={PencilIcon}
                              variant="light"
                              color="blue"
                              tooltip="Edit rule"
                              onClick={() => handleEditRule(rule)}
                            />
                            <Button
                              icon={TrashIcon}
                              variant="light"
                              color="red"
                              tooltip="Delete rule"
                            />
                          </Flex>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabPanel>

            {/* Payments Tab */}
            <TabPanel>
              <div className="space-y-6">
                <Flex justifyContent="between" alignItems="center">
                  <Title>Commission Payments</Title>
                  <Button 
                    icon={ArrowDownTrayIcon} 
                    variant="secondary"
                    color="gray"
                  >
                    Export All
                  </Button>
                </Flex>

                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Payment ID</TableHeaderCell>
                      <TableHeaderCell>Partner</TableHeaderCell>
                      <TableHeaderCell>Amount</TableHeaderCell>
                      <TableHeaderCell>Period</TableHeaderCell>
                      <TableHeaderCell>Bookings</TableHeaderCell>
                      <TableHeaderCell>Status</TableHeaderCell>
                      <TableHeaderCell>Actions</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {commissionPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.id}</TableCell>
                        <TableCell>
                          <div>
                            <Text className="font-medium">{payment.partnerName}</Text>
                            <Badge 
                              color={
                                payment.partnerTier === 'Gold' 
                                  ? 'amber' 
                                  : payment.partnerTier === 'Silver' 
                                    ? 'slate' 
                                    : 'orange'
                              } 
                              size="xs"
                            >
                              {payment.partnerTier}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>${payment.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                        <TableCell>{payment.period}</TableCell>
                        <TableCell>{payment.bookings}</TableCell>
                        <TableCell>
                          <Badge 
                            color={
                              payment.status === 'processed' 
                                ? 'emerald' 
                                : payment.status === 'pending' 
                                  ? 'amber' 
                                  : 'red'
                            } 
                            size="sm"
                          >
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Flex justifyContent="end" className="space-x-2">
                            {payment.status === 'pending' && (
                              <Button
                                icon={CheckIcon}
                                variant="light"
                                color="emerald"
                                tooltip="Process payment"
                                onClick={() => handleProcessPayment(payment.id)}
                              />
                            )}
                            <Button
                              icon={DocumentTextIcon}
                              variant="light"
                              color="blue"
                              tooltip="Download report"
                              onClick={() => handleDownloadReport(payment.id)}
                            />
                          </Flex>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    </div>
  )
} 