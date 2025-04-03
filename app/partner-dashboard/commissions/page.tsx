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
  DateRangePicker,
  DateRangePickerValue,
  AreaChart,
  BarList,
  Bold,
  Flex,
  Metric,
  Grid,
} from '@tremor/react'
import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  BanknotesIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline'

// Sample data
const commissions = [
  {
    id: 1,
    client: 'Oceanview Resort',
    amount: '$1,350',
    status: 'Paid',
    date: 'Jun 15, 2023',
    type: 'Monthly',
    referenceId: 'COM-2023-06-001',
  },
  {
    id: 2,
    client: 'Mountain Lodge',
    amount: '$1,050',
    status: 'Paid',
    date: 'Jun 10, 2023',
    type: 'Monthly',
    referenceId: 'COM-2023-06-002',
  },
  {
    id: 3,
    client: 'City Center Hotel',
    amount: '$1,650',
    status: 'Pending',
    date: 'Jun 28, 2023',
    type: 'Monthly',
    referenceId: 'COM-2023-06-003',
  },
  {
    id: 4,
    client: 'Sunset Beach Resort',
    amount: '$1,950',
    status: 'Paid',
    date: 'May 15, 2023',
    type: 'Monthly',
    referenceId: 'COM-2023-05-001',
  },
  {
    id: 5,
    client: 'Golden Gate Lodge',
    amount: '$1,275',
    status: 'Paid',
    date: 'Jun 02, 2023',
    type: 'Monthly',
    referenceId: 'COM-2023-06-004',
  },
  {
    id: 6,
    client: 'Lakeside Retreat',
    amount: '$975',
    status: 'Paid',
    date: 'Jun 08, 2023',
    type: 'Monthly',
    referenceId: 'COM-2023-06-005',
  },
  {
    id: 7,
    client: 'Mountain Lodge',
    amount: '$2,500',
    status: 'Paid',
    date: 'Apr 15, 2023',
    type: 'Bonus',
    referenceId: 'COM-2023-04-BON-001',
  },
  {
    id: 8,
    client: 'Oceanview Resort',
    amount: '$3,000',
    status: 'Processing',
    date: 'Jun 20, 2023',
    type: 'Bonus',
    referenceId: 'COM-2023-06-BON-001',
  },
]

const commissionTrend = [
  {
    month: 'Jan',
    'Monthly Commissions': 4200,
    'Bonus Commissions': 1000,
  },
  {
    month: 'Feb',
    'Monthly Commissions': 4800,
    'Bonus Commissions': 1500,
  },
  {
    month: 'Mar',
    'Monthly Commissions': 5100,
    'Bonus Commissions': 2000,
  },
  {
    month: 'Apr',
    'Monthly Commissions': 4900,
    'Bonus Commissions': 2500,
  },
  {
    month: 'May',
    'Monthly Commissions': 5600,
    'Bonus Commissions': 1800,
  },
  {
    month: 'Jun',
    'Monthly Commissions': 6200,
    'Bonus Commissions': 3000,
  },
]

const clientCommissions = [
  {
    name: 'Oceanview Resort',
    value: 4350,
  },
  {
    name: 'Mountain Lodge',
    value: 3550,
  },
  {
    name: 'City Center Hotel',
    value: 1650,
  },
  {
    name: 'Sunset Beach Resort',
    value: 1950,
  },
  {
    name: 'Golden Gate Lodge',
    value: 1275,
  },
]

const statusColorMap: Record<string, string> = {
  Paid: 'green',
  Pending: 'yellow',
  Processing: 'blue',
  Failed: 'red',
}

export default function CommissionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: undefined,
    to: undefined,
  })

  // Filter commissions based on search and filters
  const filteredCommissions = commissions.filter((commission) => {
    const matchesSearch = commission.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commission.referenceId.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === '' || commission.status === selectedStatus
    const matchesType = selectedType === '' || commission.type === selectedType
    
    // Date filtering logic
    let matchesDate = true
    if (dateRange.from && dateRange.to) {
      const commissionDate = new Date(commission.date)
      const fromDate = new Date(dateRange.from)
      const toDate = new Date(dateRange.to)
      matchesDate = commissionDate >= fromDate && commissionDate <= toDate
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesDate
  })

  // Calculate totals
  const totalCommissions = filteredCommissions.reduce((sum, commission) => {
    return sum + parseFloat(commission.amount.replace('$', '').replace(',', ''))
  }, 0)

  return (
    <div className="space-y-8">
      <div>
        <Title>Commission Management</Title>
        <Text>Track and manage your commission earnings</Text>
      </div>

      {/* Summary Cards */}
      <Grid numItemsMd={2} numItemsLg={3} className="gap-6">
        <Card decoration="top" decorationColor="blue">
          <Flex justifyContent="between" alignItems="center">
            <div>
              <Text>Total Commissions (YTD)</Text>
              <Metric>$26,800</Metric>
            </div>
            <BanknotesIcon className="h-8 w-8 text-blue-500" />
          </Flex>
          <Flex className="mt-4 space-x-2">
            <Badge color="green" icon={ArrowUpIcon}>
              18.2%
            </Badge>
            <Text className="text-gray-500">vs last year</Text>
          </Flex>
        </Card>
        
        <Card decoration="top" decorationColor="green">
          <Flex justifyContent="between" alignItems="center">
            <div>
              <Text>Pending Commissions</Text>
              <Metric>$1,650</Metric>
            </div>
            <ClockIcon className="h-8 w-8 text-green-500" />
          </Flex>
          <Text className="mt-4 text-gray-500">Expected within 7 days</Text>
        </Card>
        
        <Card decoration="top" decorationColor="amber">
          <Flex justifyContent="between" alignItems="center">
            <div>
              <Text>Next Payout</Text>
              <Metric>$4,250</Metric>
            </div>
            <BanknotesIcon className="h-8 w-8 text-amber-500" />
          </Flex>
          <Text className="mt-4 text-gray-500">Scheduled for Jul 15, 2023</Text>
        </Card>
      </Grid>

      <TabGroup>
        <TabList className="mb-8">
          <Tab>Transactions</Tab>
          <Tab>Analytics</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            <Card>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="relative w-full sm:w-64">
                  <TextInput 
                    icon={MagnifyingGlassIcon} 
                    placeholder="Search commissions..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    icon={ArrowDownTrayIcon} 
                    size="sm" 
                    variant="secondary"
                  >
                    Export CSV
                  </Button>
                  <Button 
                    icon={ArrowPathIcon} 
                    size="sm" 
                    variant="secondary"
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedStatus('')
                      setSelectedType('')
                      setDateRange({ from: undefined, to: undefined })
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <Select
                  className="max-w-xs"
                  onValueChange={setSelectedStatus}
                  placeholder="Filter by status"
                  value={selectedStatus}
                >
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                </Select>

                <Select
                  className="max-w-xs"
                  onValueChange={setSelectedType}
                  placeholder="Filter by type"
                  value={selectedType}
                >
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Bonus">Bonus</SelectItem>
                </Select>

                <DateRangePicker
                  className="max-w-md"
                  value={dateRange}
                  onValueChange={setDateRange}
                  placeholder="Filter by date range"
                />
              </div>

              <div className="mb-4">
                <Text>
                  <Bold>Total:</Bold> ${totalCommissions.toLocaleString()} from {filteredCommissions.length} transactions
                </Text>
              </div>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Reference ID</TableHeaderCell>
                    <TableHeaderCell>Client</TableHeaderCell>
                    <TableHeaderCell>Amount</TableHeaderCell>
                    <TableHeaderCell>Type</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Date</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCommissions.map((commission) => (
                    <TableRow key={commission.id}>
                      <TableCell className="font-medium">{commission.referenceId}</TableCell>
                      <TableCell>{commission.client}</TableCell>
                      <TableCell>{commission.amount}</TableCell>
                      <TableCell>{commission.type}</TableCell>
                      <TableCell>
                        <Badge 
                          color={statusColorMap[commission.status] as any} 
                          icon={commission.status === 'Paid' ? CheckCircleIcon : 
                                commission.status === 'Pending' ? ClockIcon : 
                                commission.status === 'Processing' ? ClockIcon :
                                ExclamationCircleIcon}
                        >
                          {commission.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{commission.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredCommissions.length === 0 && (
                <div className="text-center py-10">
                  <Text>No commissions found matching your filters.</Text>
                  <Button 
                    className="mt-4" 
                    variant="secondary" 
                    size="sm"
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedStatus('')
                      setSelectedType('')
                      setDateRange({ from: undefined, to: undefined })
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </Card>
          </TabPanel>
          
          <TabPanel>
            <Grid numItemsMd={1} numItemsLg={2} className="gap-6 mb-6">
              <Card>
                <Title>Commission Trend</Title>
                <Text>Monthly and bonus commissions</Text>
                <AreaChart
                  className="h-72 mt-4"
                  data={commissionTrend}
                  index="month"
                  categories={["Monthly Commissions", "Bonus Commissions"]}
                  colors={["blue", "green"]}
                  valueFormatter={(number: number) => `$${number.toLocaleString()}`}
                  stack={true}
                />
              </Card>
              
              <Card>
                <Title>Top Earning Clients</Title>
                <Text>Total commissions by client (YTD)</Text>
                <BarList
                  className="mt-4"
                  data={clientCommissions}
                  valueFormatter={(number: number) => `$${number.toLocaleString()}`}
                  color="blue"
                />
              </Card>
            </Grid>
            
            <Card>
              <Title>Commission Breakdown</Title>
              <Text>Analysis of commission sources and trends</Text>
              
              <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
                <div>
                  <Text><Bold>By Client Type</Bold></Text>
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <Text>Resorts</Text>
                      <Text>42%</Text>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <Text>Hotels</Text>
                      <Text>28%</Text>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <Text>Lodges</Text>
                      <Text>18%</Text>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <Text>Others</Text>
                      <Text>12%</Text>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Text><Bold>By Subscription</Bold></Text>
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <Text>Premium</Text>
                      <Text>45%</Text>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <Text>Standard</Text>
                      <Text>35%</Text>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <Text>Enterprise</Text>
                      <Text>20%</Text>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Text><Bold>By Commission Type</Bold></Text>
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <Text>Monthly</Text>
                      <Text>75%</Text>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <Text>Bonus</Text>
                      <Text>25%</Text>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Card>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  )
} 