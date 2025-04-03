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
  DateRangePicker,
  DateRangePickerValue,
  BarChart,
  LineChart,
  DonutChart,
  Grid,
  Col,
  Flex,
  Metric,
  ProgressBar,
} from '@tremor/react'
import {
  ArrowPathIcon,
  ArrowDownTrayIcon,
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ClockIcon,
  StarIcon,
  TrophyIcon,
  ArrowTrendingUpIcon,
  BuildingStorefrontIcon,
  EyeIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'

// Define types for partner performance data
type PartnerPerformance = {
  id: string;
  name: string;
  tier: 'Gold' | 'Silver' | 'Bronze';
  revenue: number;
  bookings: number;
  conversionRate: number;
  avgBookingValue: number;
  clients: number;
  status: 'active' | 'inactive' | 'probation';
  lastActivity: string;
  joinDate: string;
  targetCompletion: number;
}

type PerformanceMetric = {
  month: string;
  revenue: number;
  bookings: number;
  clients: number;
}

type PartnerActivity = {
  id: string;
  partnerId: string;
  partnerName: string;
  activityType: 'booking' | 'client_added' | 'login' | 'commission_paid' | 'tier_change';
  description: string;
  date: string;
  value?: number;
}

// Mock data for partner performance
const partnerPerformanceData: PartnerPerformance[] = [
  {
    id: 'P001',
    name: 'TravelTech Solutions',
    tier: 'Gold',
    revenue: 125750,
    bookings: 42,
    conversionRate: 8.5,
    avgBookingValue: 2994.05,
    clients: 38,
    status: 'active',
    lastActivity: '2024-04-10',
    joinDate: '2023-06-15',
    targetCompletion: 92,
  },
  {
    id: 'P002',
    name: 'Global Bookings Inc',
    tier: 'Silver',
    revenue: 83250,
    bookings: 31,
    conversionRate: 6.2,
    avgBookingValue: 2685.48,
    clients: 27,
    status: 'active',
    lastActivity: '2024-04-08',
    joinDate: '2023-08-22',
    targetCompletion: 78,
  },
  {
    id: 'P003',
    name: 'StayFinder',
    tier: 'Bronze',
    revenue: 41500,
    bookings: 18,
    conversionRate: 4.5,
    avgBookingValue: 2305.56,
    clients: 15,
    status: 'active',
    lastActivity: '2024-04-05',
    joinDate: '2023-11-10',
    targetCompletion: 65,
  },
  {
    id: 'P004',
    name: 'HotelConnect',
    tier: 'Silver',
    revenue: 78900,
    bookings: 27,
    conversionRate: 5.8,
    avgBookingValue: 2922.22,
    clients: 24,
    status: 'active',
    lastActivity: '2024-04-09',
    joinDate: '2023-07-18',
    targetCompletion: 82,
  },
  {
    id: 'P005',
    name: 'Luxury Stays',
    tier: 'Gold',
    revenue: 157800,
    bookings: 35,
    conversionRate: 9.2,
    avgBookingValue: 4508.57,
    clients: 32,
    status: 'active',
    lastActivity: '2024-04-11',
    joinDate: '2023-05-05',
    targetCompletion: 95,
  },
  {
    id: 'P006',
    name: 'Budget Bookings',
    tier: 'Bronze',
    revenue: 28500,
    bookings: 22,
    conversionRate: 3.8,
    avgBookingValue: 1295.45,
    clients: 19,
    status: 'probation',
    lastActivity: '2024-03-28',
    joinDate: '2023-12-05',
    targetCompletion: 45,
  },
  {
    id: 'P007',
    name: 'TravelEase',
    tier: 'Silver',
    revenue: 68400,
    bookings: 24,
    conversionRate: 5.5,
    avgBookingValue: 2850.00,
    clients: 21,
    status: 'active',
    lastActivity: '2024-04-07',
    joinDate: '2023-09-12',
    targetCompletion: 75,
  },
]

// Mock data for performance trends
const performanceTrends = [
  {
    month: 'Jan',
    'Total Revenue': 320000,
    'Total Bookings': 110,
    'New Clients': 95,
  },
  {
    month: 'Feb',
    'Total Revenue': 380000,
    'Total Bookings': 135,
    'New Clients': 112,
  },
  {
    month: 'Mar',
    'Total Revenue': 425000,
    'Total Bookings': 148,
    'New Clients': 125,
  },
  {
    month: 'Apr',
    'Total Revenue': 485000,
    'Total Bookings': 162,
    'New Clients': 138,
  },
]

// Mock data for partner activities
const partnerActivities: PartnerActivity[] = [
  {
    id: 'ACT-001',
    partnerId: 'P001',
    partnerName: 'TravelTech Solutions',
    activityType: 'booking',
    description: 'Completed a luxury suite booking for 5 nights',
    date: '2024-04-10',
    value: 4250,
  },
  {
    id: 'ACT-002',
    partnerId: 'P005',
    partnerName: 'Luxury Stays',
    activityType: 'client_added',
    description: 'Added a new corporate client',
    date: '2024-04-11',
  },
  {
    id: 'ACT-003',
    partnerId: 'P002',
    partnerName: 'Global Bookings Inc',
    activityType: 'commission_paid',
    description: 'Received commission payment for March 2024',
    date: '2024-04-08',
    value: 8320.50,
  },
  {
    id: 'ACT-004',
    partnerId: 'P006',
    partnerName: 'Budget Bookings',
    activityType: 'tier_change',
    description: 'Moved from Silver to Bronze tier due to performance',
    date: '2024-03-28',
  },
  {
    id: 'ACT-005',
    partnerId: 'P004',
    partnerName: 'HotelConnect',
    activityType: 'booking',
    description: 'Completed a standard room booking for 3 nights',
    date: '2024-04-09',
    value: 1850,
  },
]

// Mock data for conversion rates by tier
const conversionRatesByTier = [
  { name: 'Gold', value: 8.7 },
  { name: 'Silver', value: 5.9 },
  { name: 'Bronze', value: 4.2 },
]

export default function PartnerPerformancePage() {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedTier, setSelectedTier] = useState<string>('all')
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: new Date(new Date().getFullYear(), new Date().getMonth() - 3, 1),
    to: new Date(),
  })
  const [selectedPartner, setSelectedPartner] = useState<string>('all')

  // Filter partners based on selected tier
  const filteredPartners = selectedTier === 'all'
    ? partnerPerformanceData
    : partnerPerformanceData.filter(partner => partner.tier.toLowerCase() === selectedTier.toLowerCase())

  // Calculate summary metrics
  const totalRevenue = partnerPerformanceData.reduce((sum, partner) => sum + partner.revenue, 0)
  const totalBookings = partnerPerformanceData.reduce((sum, partner) => sum + partner.bookings, 0)
  const totalClients = partnerPerformanceData.reduce((sum, partner) => sum + partner.clients, 0)
  const avgConversionRate = partnerPerformanceData.reduce((sum, partner) => sum + partner.conversionRate, 0) / partnerPerformanceData.length

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  // Handler for exporting performance data
  const handleExportData = () => {
    console.log('Exporting performance data')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Title className="text-2xl font-bold">Partner Performance Tracking</Title>
          <Text className="mt-1 text-gray-600">
            Monitor and analyze partner performance metrics
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

      {/* Performance Overview Cards */}
      <Grid numItemsMd={2} numItemsLg={4} className="gap-6">
        <Card decoration="top" decorationColor="blue">
          <Flex justifyContent="start" className="space-x-4">
            <div className="p-2 bg-blue-50 rounded-md">
              <CurrencyDollarIcon className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <Text>Total Partner Revenue</Text>
              <Metric className="text-2xl font-bold">${totalRevenue.toLocaleString()}</Metric>
              <Text className="text-sm text-green-500">+15% from last quarter</Text>
            </div>
          </Flex>
        </Card>
        <Card decoration="top" decorationColor="emerald">
          <Flex justifyContent="start" className="space-x-4">
            <div className="p-2 bg-emerald-50 rounded-md">
              <BuildingStorefrontIcon className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <Text>Total Bookings</Text>
              <Metric className="text-2xl font-bold">{totalBookings}</Metric>
              <Text className="text-sm text-green-500">+8% from last quarter</Text>
            </div>
          </Flex>
        </Card>
        <Card decoration="top" decorationColor="amber">
          <Flex justifyContent="start" className="space-x-4">
            <div className="p-2 bg-amber-50 rounded-md">
              <UsersIcon className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <Text>Total Clients Acquired</Text>
              <Metric className="text-2xl font-bold">{totalClients}</Metric>
              <Text className="text-sm text-green-500">+12% from last quarter</Text>
            </div>
          </Flex>
        </Card>
        <Card decoration="top" decorationColor="purple">
          <Flex justifyContent="start" className="space-x-4">
            <div className="p-2 bg-purple-50 rounded-md">
              <ArrowTrendingUpIcon className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <Text>Avg. Conversion Rate</Text>
              <Metric className="text-2xl font-bold">{avgConversionRate.toFixed(1)}%</Metric>
              <Text className="text-sm text-green-500">+1.2% from last quarter</Text>
            </div>
          </Flex>
        </Card>
      </Grid>

      {/* Main Content Tabs */}
      <Card>
        <TabGroup index={activeTab} onIndexChange={setActiveTab}>
          <TabList className="mb-6">
            <Tab icon={ChartBarIcon}>Performance Overview</Tab>
            <Tab icon={UserGroupIcon}>Partner Rankings</Tab>
            <Tab icon={ClockIcon}>Recent Activity</Tab>
          </TabList>
          <TabPanels>
            {/* Performance Overview Tab */}
            <TabPanel>
              <div className="space-y-6">
                <Grid numItemsMd={2} className="gap-6">
                  <Card>
                    <Title>Revenue & Bookings Trend</Title>
                    <Text>Quarterly performance metrics</Text>
                    <LineChart
                      className="mt-4 h-80"
                      data={performanceTrends}
                      index="month"
                      categories={["Total Revenue", "Total Bookings"]}
                      colors={["blue", "emerald"]}
                      valueFormatter={(number) => 
                        number > 1000 ? `$${(number/1000).toFixed(1)}K` : number.toString()
                      }
                      yAxisWidth={60}
                      showLegend
                      showAnimation
                    />
                  </Card>
                  <Card>
                    <Title>Conversion Rate by Tier</Title>
                    <Text>Average conversion rates by partner tier</Text>
                    <DonutChart
                      className="mt-4 h-80"
                      data={conversionRatesByTier}
                      category="value"
                      index="name"
                      valueFormatter={(value) => `${value}%`}
                      colors={["amber", "slate", "orange"]}
                      showLabel
                      showAnimation
                    />
                  </Card>
                </Grid>

                <div>
                  <Flex justifyContent="between" alignItems="center" className="mb-4">
                    <Title>Performance by Partner Tier</Title>
                    <Select
                      value={selectedTier}
                      onValueChange={setSelectedTier}
                      className="max-w-xs"
                    >
                      <SelectItem value="all">All Tiers</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="bronze">Bronze</SelectItem>
                    </Select>
                  </Flex>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Partner</TableHeaderCell>
                        <TableHeaderCell>Tier</TableHeaderCell>
                        <TableHeaderCell>Revenue</TableHeaderCell>
                        <TableHeaderCell>Bookings</TableHeaderCell>
                        <TableHeaderCell>Conversion Rate</TableHeaderCell>
                        <TableHeaderCell>Avg. Booking Value</TableHeaderCell>
                        <TableHeaderCell>Target Completion</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredPartners.map((partner) => (
                        <TableRow key={partner.id}>
                          <TableCell>
                            <div>
                              <Text className="font-medium">{partner.name}</Text>
                              <Text className="text-xs text-gray-500">ID: {partner.id}</Text>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              color={
                                partner.tier === 'Gold' 
                                  ? 'amber' 
                                  : partner.tier === 'Silver' 
                                    ? 'slate' 
                                    : 'orange'
                              } 
                              size="sm"
                            >
                              {partner.tier}
                            </Badge>
                          </TableCell>
                          <TableCell>${partner.revenue.toLocaleString()}</TableCell>
                          <TableCell>{partner.bookings}</TableCell>
                          <TableCell>{partner.conversionRate}%</TableCell>
                          <TableCell>${partner.avgBookingValue.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="w-full">
                              <Flex justifyContent="between" className="mb-1">
                                <Text className="text-xs">{partner.targetCompletion}%</Text>
                              </Flex>
                              <ProgressBar 
                                value={partner.targetCompletion} 
                                color={
                                  partner.targetCompletion >= 80 
                                    ? 'emerald' 
                                    : partner.targetCompletion >= 50 
                                      ? 'amber' 
                                      : 'rose'
                                }
                                className="h-1.5"
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabPanel>

            {/* Partner Rankings Tab */}
            <TabPanel>
              <div className="space-y-6">
                <Flex justifyContent="between" alignItems="center" className="mb-4">
                  <Title>Partner Performance Rankings</Title>
                  <Button 
                    icon={ArrowDownTrayIcon} 
                    variant="secondary"
                    color="gray"
                    onClick={handleExportData}
                  >
                    Export Rankings
                  </Button>
                </Flex>

                <Grid numItemsMd={2} numItemsLg={3} className="gap-6">
                  <Card className="p-4">
                    <Flex justifyContent="start" className="space-x-4">
                      <div className="p-3 bg-amber-50 rounded-full">
                        <TrophyIcon className="h-8 w-8 text-amber-500" />
                      </div>
                      <div>
                        <Text className="text-gray-500">Top Revenue Generator</Text>
                        <Title className="text-xl">{partnerPerformanceData.sort((a, b) => b.revenue - a.revenue)[0].name}</Title>
                        <Text className="text-amber-500 font-medium">
                          ${partnerPerformanceData.sort((a, b) => b.revenue - a.revenue)[0].revenue.toLocaleString()}
                        </Text>
                      </div>
                    </Flex>
                  </Card>
                  <Card className="p-4">
                    <Flex justifyContent="start" className="space-x-4">
                      <div className="p-3 bg-emerald-50 rounded-full">
                        <CheckCircleIcon className="h-8 w-8 text-emerald-500" />
                      </div>
                      <div>
                        <Text className="text-gray-500">Highest Conversion Rate</Text>
                        <Title className="text-xl">{partnerPerformanceData.sort((a, b) => b.conversionRate - a.conversionRate)[0].name}</Title>
                        <Text className="text-emerald-500 font-medium">
                          {partnerPerformanceData.sort((a, b) => b.conversionRate - a.conversionRate)[0].conversionRate}%
                        </Text>
                      </div>
                    </Flex>
                  </Card>
                  <Card className="p-4">
                    <Flex justifyContent="start" className="space-x-4">
                      <div className="p-3 bg-blue-50 rounded-full">
                        <StarIcon className="h-8 w-8 text-blue-500" />
                      </div>
                      <div>
                        <Text className="text-gray-500">Most Bookings</Text>
                        <Title className="text-xl">{partnerPerformanceData.sort((a, b) => b.bookings - a.bookings)[0].name}</Title>
                        <Text className="text-blue-500 font-medium">
                          {partnerPerformanceData.sort((a, b) => b.bookings - a.bookings)[0].bookings} bookings
                        </Text>
                      </div>
                    </Flex>
                  </Card>
                </Grid>

                <Card>
                  <Title>Performance Rankings</Title>
                  <Text>Partners ranked by overall performance</Text>
                  <Table className="mt-4">
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Rank</TableHeaderCell>
                        <TableHeaderCell>Partner</TableHeaderCell>
                        <TableHeaderCell>Tier</TableHeaderCell>
                        <TableHeaderCell>Revenue</TableHeaderCell>
                        <TableHeaderCell>Bookings</TableHeaderCell>
                        <TableHeaderCell>Clients</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                        <TableHeaderCell>Target Completion</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {partnerPerformanceData
                        .sort((a, b) => b.revenue - a.revenue)
                        .map((partner, index) => (
                          <TableRow key={partner.id}>
                            <TableCell>
                              <Badge 
                                color={
                                  index === 0 
                                    ? 'amber' 
                                    : index === 1 
                                      ? 'slate' 
                                      : index === 2 
                                        ? 'orange' 
                                        : 'gray'
                                } 
                                size="sm"
                              >
                                #{index + 1}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div>
                                <Text className="font-medium">{partner.name}</Text>
                                <Text className="text-xs text-gray-500">Since {formatDate(partner.joinDate)}</Text>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                color={
                                  partner.tier === 'Gold' 
                                    ? 'amber' 
                                    : partner.tier === 'Silver' 
                                      ? 'slate' 
                                      : 'orange'
                                } 
                                size="sm"
                              >
                                {partner.tier}
                              </Badge>
                            </TableCell>
                            <TableCell>${partner.revenue.toLocaleString()}</TableCell>
                            <TableCell>{partner.bookings}</TableCell>
                            <TableCell>{partner.clients}</TableCell>
                            <TableCell>
                              <Badge 
                                color={
                                  partner.status === 'active' 
                                    ? 'emerald' 
                                    : partner.status === 'inactive' 
                                      ? 'gray' 
                                      : 'amber'
                                } 
                                size="sm"
                              >
                                {partner.status.charAt(0).toUpperCase() + partner.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="w-full">
                                <Flex justifyContent="between" className="mb-1">
                                  <Text className="text-xs">{partner.targetCompletion}%</Text>
                                </Flex>
                                <ProgressBar 
                                  value={partner.targetCompletion} 
                                  color={
                                    partner.targetCompletion >= 80 
                                      ? 'emerald' 
                                      : partner.targetCompletion >= 50 
                                        ? 'amber' 
                                        : 'rose'
                                  }
                                  className="h-1.5"
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            </TabPanel>

            {/* Recent Activity Tab */}
            <TabPanel>
              <div className="space-y-6">
                <Flex justifyContent="between" alignItems="center" className="mb-4">
                  <Title>Recent Partner Activities</Title>
                  <Select
                    value={selectedPartner}
                    onValueChange={setSelectedPartner}
                    className="max-w-xs"
                  >
                    <SelectItem value="all">All Partners</SelectItem>
                    {partnerPerformanceData.map(partner => (
                      <SelectItem key={partner.id} value={partner.id}>
                        {partner.name}
                      </SelectItem>
                    ))}
                  </Select>
                </Flex>

                <Card>
                  <div className="space-y-6">
                    {partnerActivities
                      .filter(activity => selectedPartner === 'all' || activity.partnerId === selectedPartner)
                      .map((activity) => (
                        <div 
                          key={activity.id} 
                          className="flex items-start p-4 border-b border-gray-100 last:border-0"
                        >
                          <div className={`
                            p-2 rounded-full mr-4 flex-shrink-0
                            ${activity.activityType === 'booking' ? 'bg-blue-50' : ''}
                            ${activity.activityType === 'client_added' ? 'bg-emerald-50' : ''}
                            ${activity.activityType === 'login' ? 'bg-gray-50' : ''}
                            ${activity.activityType === 'commission_paid' ? 'bg-amber-50' : ''}
                            ${activity.activityType === 'tier_change' ? 'bg-purple-50' : ''}
                          `}>
                            {activity.activityType === 'booking' && (
                              <CalendarDaysIcon className="h-5 w-5 text-blue-500" />
                            )}
                            {activity.activityType === 'client_added' && (
                              <UsersIcon className="h-5 w-5 text-emerald-500" />
                            )}
                            {activity.activityType === 'login' && (
                              <EyeIcon className="h-5 w-5 text-gray-500" />
                            )}
                            {activity.activityType === 'commission_paid' && (
                              <CurrencyDollarIcon className="h-5 w-5 text-amber-500" />
                            )}
                            {activity.activityType === 'tier_change' && (
                              <StarIcon className="h-5 w-5 text-purple-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <Flex justifyContent="between" alignItems="start">
                              <div>
                                <Text className="font-medium">{activity.partnerName}</Text>
                                <Text className="text-gray-600">{activity.description}</Text>
                                {activity.value && (
                                  <Text className="text-sm font-medium text-blue-600">
                                    ${activity.value.toLocaleString()}
                                  </Text>
                                )}
                              </div>
                              <Text className="text-sm text-gray-500">{formatDate(activity.date)}</Text>
                            </Flex>
                          </div>
                        </div>
                      ))}
                  </div>
                </Card>

                <Card>
                  <Title>Partner Activity Summary</Title>
                  <Text>Activity breakdown by type</Text>
                  <BarChart
                    className="mt-4 h-60"
                    data={[
                      { type: 'Bookings', count: 156 },
                      { type: 'Client Additions', count: 87 },
                      { type: 'Logins', count: 245 },
                      { type: 'Commission Payments', count: 42 },
                      { type: 'Tier Changes', count: 12 },
                    ]}
                    index="type"
                    categories={["count"]}
                    colors={["blue"]}
                    valueFormatter={(value) => `${value}`}
                    yAxisWidth={48}
                    showAnimation
                  />
                </Card>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    </div>
  )
} 