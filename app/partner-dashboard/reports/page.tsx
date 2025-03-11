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
  Metric,
  AreaChart,
  BarChart,
  DonutChart,
  Legend,
  Flex,
  Grid,
  Col,
  Button,
  Select,
  SelectItem,
  DateRangePicker,
  DateRangePickerValue,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
  List,
  ListItem,
} from '@tremor/react'
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  CalendarIcon,
  ChartBarIcon,
  ChartPieIcon,
  DocumentTextIcon,
  FunnelIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

// Sample data for charts
const revenueData = [
  {
    date: 'Jan 2023',
    'Commission Revenue': 4200,
    'Referral Bonus': 1100,
    'Total Revenue': 5300,
  },
  {
    date: 'Feb 2023',
    'Commission Revenue': 4800,
    'Referral Bonus': 1300,
    'Total Revenue': 6100,
  },
  {
    date: 'Mar 2023',
    'Commission Revenue': 5100,
    'Referral Bonus': 1400,
    'Total Revenue': 6500,
  },
  {
    date: 'Apr 2023',
    'Commission Revenue': 5600,
    'Referral Bonus': 1500,
    'Total Revenue': 7100,
  },
  {
    date: 'May 2023',
    'Commission Revenue': 6200,
    'Referral Bonus': 1700,
    'Total Revenue': 7900,
  },
  {
    date: 'Jun 2023',
    'Commission Revenue': 6800,
    'Referral Bonus': 1800,
    'Total Revenue': 8600,
  },
  {
    date: 'Jul 2023',
    'Commission Revenue': 7300,
    'Referral Bonus': 2000,
    'Total Revenue': 9300,
  },
  {
    date: 'Aug 2023',
    'Commission Revenue': 7800,
    'Referral Bonus': 2100,
    'Total Revenue': 9900,
  },
  {
    date: 'Sep 2023',
    'Commission Revenue': 8400,
    'Referral Bonus': 2300,
    'Total Revenue': 10700,
  },
  {
    date: 'Oct 2023',
    'Commission Revenue': 9100,
    'Referral Bonus': 2500,
    'Total Revenue': 11600,
  },
  {
    date: 'Nov 2023',
    'Commission Revenue': 9800,
    'Referral Bonus': 2700,
    'Total Revenue': 12500,
  },
  {
    date: 'Dec 2023',
    'Commission Revenue': 10500,
    'Referral Bonus': 2900,
    'Total Revenue': 13400,
  },
]

const clientAcquisitionData = [
  {
    month: 'Jan',
    'New Clients': 5,
  },
  {
    month: 'Feb',
    'New Clients': 7,
  },
  {
    month: 'Mar',
    'New Clients': 8,
  },
  {
    month: 'Apr',
    'New Clients': 10,
  },
  {
    month: 'May',
    'New Clients': 12,
  },
  {
    month: 'Jun',
    'New Clients': 15,
  },
  {
    month: 'Jul',
    'New Clients': 18,
  },
  {
    month: 'Aug',
    'New Clients': 20,
  },
  {
    month: 'Sep',
    'New Clients': 22,
  },
  {
    month: 'Oct',
    'New Clients': 25,
  },
  {
    month: 'Nov',
    'New Clients': 28,
  },
  {
    month: 'Dec',
    'New Clients': 30,
  },
]

const clientDistributionData = [
  {
    name: 'Luxury Hotels',
    value: 35,
  },
  {
    name: 'Boutique Hotels',
    value: 25,
  },
  {
    name: 'Business Hotels',
    value: 20,
  },
  {
    name: 'Resorts',
    value: 15,
  },
  {
    name: 'Other',
    value: 5,
  },
]

const revenueByClientData = [
  {
    name: 'Grand Luxury Resort',
    revenue: 2450,
    commission: 245,
  },
  {
    name: 'City Center Hotel',
    revenue: 1950,
    commission: 195,
  },
  {
    name: 'Seaside Boutique',
    revenue: 1850,
    commission: 185,
  },
  {
    name: 'Mountain View Lodge',
    revenue: 1650,
    commission: 165,
  },
  {
    name: 'Business Plaza Hotel',
    revenue: 1450,
    commission: 145,
  },
  {
    name: 'Urban Luxury Suites',
    revenue: 1350,
    commission: 135,
  },
  {
    name: 'Riverside Inn',
    revenue: 1250,
    commission: 125,
  },
  {
    name: 'Harbor View Hotel',
    revenue: 1150,
    commission: 115,
  },
]

const topPerformingClientsData = [
  {
    name: 'Grand Luxury Resort',
    location: 'Miami, FL',
    revenue: '$24,500',
    commission: '$2,450',
    status: 'Active',
  },
  {
    name: 'City Center Hotel',
    location: 'New York, NY',
    revenue: '$19,500',
    commission: '$1,950',
    status: 'Active',
  },
  {
    name: 'Seaside Boutique',
    location: 'San Diego, CA',
    revenue: '$18,500',
    commission: '$1,850',
    status: 'Active',
  },
  {
    name: 'Mountain View Lodge',
    location: 'Denver, CO',
    revenue: '$16,500',
    commission: '$1,650',
    status: 'Active',
  },
  {
    name: 'Business Plaza Hotel',
    location: 'Chicago, IL',
    revenue: '$14,500',
    commission: '$1,450',
    status: 'Active',
  },
]

const valueFormatter = (number: number) => 
  `$${Intl.NumberFormat('us').format(number).toString()}`

export default function ReportsPage() {
  // State for date range picker
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: new Date(2023, 0, 1),
    to: new Date(2023, 11, 31),
  })
  
  // State for report type selection
  const [reportType, setReportType] = useState('revenue')
  
  // State for time period selection
  const [timePeriod, setTimePeriod] = useState('yearly')
  
  // Function to refresh data
  const refreshData = () => {
    // In a real app, this would fetch fresh data from the API
    alert('Data refreshed!')
  }
  
  // Function to export data
  const exportData = (format: string) => {
    // In a real app, this would generate and download a file
    alert(`Exporting data as ${format}...`)
  }
  
  return (
    <div className="space-y-8">
      <div>
        <Title>Partner Reports</Title>
        <Text>Analyze your performance, revenue, and client data</Text>
      </div>
      
      {/* Filters and Controls */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <DateRangePicker
              className="max-w-md"
              value={dateRange}
              onValueChange={setDateRange}
              selectPlaceholder="Select date range"
              color="blue"
            />
            
            <Select
              className="max-w-xs"
              value={timePeriod}
              onValueChange={setTimePeriod}
              icon={CalendarIcon}
            >
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button
              icon={ArrowPathIcon}
              variant="secondary"
              onClick={refreshData}
            >
              Refresh
            </Button>
            
            <Select
              className="max-w-xs"
              defaultValue="none"
              icon={ArrowDownTrayIcon}
              onValueChange={(value) => exportData(value)}
            >
              <SelectItem value="none">
                Export As...
              </SelectItem>
              <SelectItem value="pdf">PDF Report</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
            </Select>
          </div>
        </div>
      </Card>
      
      {/* Report Tabs */}
      <TabGroup>
        <TabList className="mb-8">
          <Tab icon={ChartBarIcon} onClick={() => setReportType('revenue')}>
            Revenue
          </Tab>
          <Tab icon={UserGroupIcon} onClick={() => setReportType('clients')}>
            Clients
          </Tab>
          <Tab icon={ChartPieIcon} onClick={() => setReportType('performance')}>
            Performance
          </Tab>
          <Tab icon={DocumentTextIcon} onClick={() => setReportType('custom')}>
            Custom Reports
          </Tab>
        </TabList>
        
        <TabPanels>
          {/* Revenue Tab */}
          <TabPanel>
            <div className="space-y-8">
              {/* Revenue Overview */}
              <Grid numItemsMd={3} className="gap-6">
                <Card decoration="top" decorationColor="blue">
                  <Text>Total Revenue</Text>
                  <Metric>$134,400</Metric>
                  <Text className="mt-2 text-sm text-green-600">+24% from previous year</Text>
                </Card>
                
                <Card decoration="top" decorationColor="indigo">
                  <Text>Commission Revenue</Text>
                  <Metric>$105,600</Metric>
                  <Text className="mt-2 text-sm text-green-600">+22% from previous year</Text>
                </Card>
                
                <Card decoration="top" decorationColor="purple">
                  <Text>Referral Bonuses</Text>
                  <Metric>$28,800</Metric>
                  <Text className="mt-2 text-sm text-green-600">+32% from previous year</Text>
                </Card>
              </Grid>
              
              {/* Revenue Chart */}
              <Card>
                <Title>Revenue Trends</Title>
                <Text>Monthly breakdown of revenue sources</Text>
                
                <AreaChart
                  className="mt-6 h-80"
                  data={revenueData}
                  index="date"
                  categories={['Commission Revenue', 'Referral Bonus', 'Total Revenue']}
                  colors={['blue', 'indigo', 'purple']}
                  valueFormatter={valueFormatter}
                  showLegend={true}
                  showGridLines={true}
                  showAnimation={true}
                />
              </Card>
              
              {/* Revenue by Client */}
              <Card>
                <Title>Revenue by Client</Title>
                <Text>Top clients by revenue generation</Text>
                
                <BarChart
                  className="mt-6 h-80"
                  data={revenueByClientData}
                  index="name"
                  categories={['revenue']}
                  colors={['blue']}
                  valueFormatter={valueFormatter}
                  showLegend={false}
                  showGridLines={true}
                  showAnimation={true}
                />
              </Card>
            </div>
          </TabPanel>
          
          {/* Clients Tab */}
          <TabPanel>
            <div className="space-y-8">
              {/* Client Overview */}
              <Grid numItemsMd={3} className="gap-6">
                <Card decoration="top" decorationColor="blue">
                  <Text>Total Clients</Text>
                  <Metric>200</Metric>
                  <Text className="mt-2 text-sm text-green-600">+45% from previous year</Text>
                </Card>
                
                <Card decoration="top" decorationColor="indigo">
                  <Text>New Clients (This Year)</Text>
                  <Metric>30</Metric>
                  <Text className="mt-2 text-sm text-green-600">+20% from previous year</Text>
                </Card>
                
                <Card decoration="top" decorationColor="purple">
                  <Text>Average Revenue per Client</Text>
                  <Metric>$672</Metric>
                  <Text className="mt-2 text-sm text-red-600">-5% from previous year</Text>
                </Card>
              </Grid>
              
              {/* Client Acquisition Chart */}
              <Card>
                <Title>Client Acquisition</Title>
                <Text>Monthly new client sign-ups</Text>
                
                <BarChart
                  className="mt-6 h-80"
                  data={clientAcquisitionData}
                  index="month"
                  categories={['New Clients']}
                  colors={['blue']}
                  showLegend={false}
                  showGridLines={true}
                  showAnimation={true}
                />
              </Card>
              
              {/* Client Distribution */}
              <Grid numItemsMd={2} className="gap-6">
                <Card>
                  <Title>Client Distribution</Title>
                  <Text>Breakdown by hotel type</Text>
                  
                  <DonutChart
                    className="mt-6 h-60"
                    data={clientDistributionData}
                    category="value"
                    index="name"
                    colors={['blue', 'indigo', 'violet', 'purple', 'fuchsia']}
                    showAnimation={true}
                    showTooltip={true}
                  />
                  <Legend
                    className="mt-6"
                    categories={clientDistributionData.map((item) => item.name)}
                    colors={['blue', 'indigo', 'violet', 'purple', 'fuchsia']}
                  />
                </Card>
                
                <Card>
                  <Title>Top Performing Clients</Title>
                  <Text>Clients with highest revenue</Text>
                  
                  <List className="mt-4">
                    {topPerformingClientsData.map((client, index) => (
                      <ListItem key={index}>
                        <div className="flex justify-between items-center">
                          <div>
                            <Text className="font-medium">{client.name}</Text>
                            <Text className="text-sm text-gray-500">{client.location}</Text>
                          </div>
                          <div className="text-right">
                            <Text className="font-medium">{client.commission}</Text>
                            <Text className="text-sm text-gray-500">Commission</Text>
                          </div>
                        </div>
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Grid>
            </div>
          </TabPanel>
          
          {/* Performance Tab */}
          <TabPanel>
            <div className="space-y-8">
              {/* Performance Metrics */}
              <Grid numItemsMd={4} className="gap-6">
                <Card decoration="top" decorationColor="blue">
                  <Text>Conversion Rate</Text>
                  <Metric>24.8%</Metric>
                  <Text className="mt-2 text-sm text-green-600">+3.2% from previous year</Text>
                </Card>
                
                <Card decoration="top" decorationColor="indigo">
                  <Text>Client Retention</Text>
                  <Metric>92%</Metric>
                  <Text className="mt-2 text-sm text-green-600">+2% from previous year</Text>
                </Card>
                
                <Card decoration="top" decorationColor="purple">
                  <Text>Average Deal Size</Text>
                  <Metric>$4,800</Metric>
                  <Text className="mt-2 text-sm text-green-600">+12% from previous year</Text>
                </Card>
                
                <Card decoration="top" decorationColor="fuchsia">
                  <Text>Commission Rate</Text>
                  <Metric>10%</Metric>
                  <Text className="mt-2 text-sm">No change from previous year</Text>
                </Card>
              </Grid>
              
              {/* Detailed Performance Table */}
              <Card>
                <Title>Detailed Performance</Title>
                <Text>Monthly performance metrics</Text>
                
                <Table className="mt-6">
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Month</TableHeaderCell>
                      <TableHeaderCell>Revenue</TableHeaderCell>
                      <TableHeaderCell>Commission</TableHeaderCell>
                      <TableHeaderCell>New Clients</TableHeaderCell>
                      <TableHeaderCell>Conversion Rate</TableHeaderCell>
                      <TableHeaderCell>Performance</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {revenueData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>${item['Total Revenue'].toLocaleString()}</TableCell>
                        <TableCell>${item['Commission Revenue'].toLocaleString()}</TableCell>
                        <TableCell>{clientAcquisitionData[index]['New Clients']}</TableCell>
                        <TableCell>
                          {(20 + Math.floor(Math.random() * 10)).toString()}%
                        </TableCell>
                        <TableCell>
                          <Badge color={index % 3 === 0 ? 'green' : index % 3 === 1 ? 'blue' : 'yellow'}>
                            {index % 3 === 0 ? 'Excellent' : index % 3 === 1 ? 'Good' : 'Average'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </TabPanel>
          
          {/* Custom Reports Tab */}
          <TabPanel>
            <div className="space-y-8">
              <Card>
                <Title>Custom Reports</Title>
                <Text>Create and save custom reports based on your specific needs</Text>
                
                <div className="mt-6 space-y-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Text className="font-medium">Quarterly Revenue Report</Text>
                        <Text className="text-sm text-gray-500">Last generated: Jan 15, 2023</Text>
                      </div>
                      <div className="flex gap-2">
                        <Button size="xs" variant="secondary" icon={ArrowPathIcon}>
                          Refresh
                        </Button>
                        <Button size="xs" variant="primary" icon={ArrowDownTrayIcon}>
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Text className="font-medium">Client Acquisition Funnel</Text>
                        <Text className="text-sm text-gray-500">Last generated: Feb 3, 2023</Text>
                      </div>
                      <div className="flex gap-2">
                        <Button size="xs" variant="secondary" icon={ArrowPathIcon}>
                          Refresh
                        </Button>
                        <Button size="xs" variant="primary" icon={ArrowDownTrayIcon}>
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Text className="font-medium">Annual Performance Summary</Text>
                        <Text className="text-sm text-gray-500">Last generated: Dec 31, 2022</Text>
                      </div>
                      <div className="flex gap-2">
                        <Button size="xs" variant="secondary" icon={ArrowPathIcon}>
                          Refresh
                        </Button>
                        <Button size="xs" variant="primary" icon={ArrowDownTrayIcon}>
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button icon={FunnelIcon} color="blue">
                    Create New Custom Report
                  </Button>
                </div>
              </Card>
              
              <Card>
                <Title>Report Templates</Title>
                <Text>Pre-built report templates you can customize</Text>
                
                <Grid numItemsMd={3} className="gap-4 mt-6">
                  <Card decoration="left" decorationColor="blue">
                    <Flex justifyContent="start" className="space-x-4">
                      <ChartBarIcon className="h-8 w-8 text-blue-500" />
                      <div>
                        <Title className="text-base">Revenue Analysis</Title>
                        <Text>Detailed breakdown of revenue sources</Text>
                      </div>
                    </Flex>
                    <Button className="mt-4" variant="light" size="xs">
                      Use Template
                    </Button>
                  </Card>
                  
                  <Card decoration="left" decorationColor="indigo">
                    <Flex justifyContent="start" className="space-x-4">
                      <UserGroupIcon className="h-8 w-8 text-indigo-500" />
                      <div>
                        <Title className="text-base">Client Insights</Title>
                        <Text>Client acquisition and retention metrics</Text>
                      </div>
                    </Flex>
                    <Button className="mt-4" variant="light" size="xs">
                      Use Template
                    </Button>
                  </Card>
                  
                  <Card decoration="left" decorationColor="purple">
                    <Flex justifyContent="start" className="space-x-4">
                      <ChartPieIcon className="h-8 w-8 text-purple-500" />
                      <div>
                        <Title className="text-base">Performance Dashboard</Title>
                        <Text>Key performance indicators and trends</Text>
                      </div>
                    </Flex>
                    <Button className="mt-4" variant="light" size="xs">
                      Use Template
                    </Button>
                  </Card>
                </Grid>
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  )
} 