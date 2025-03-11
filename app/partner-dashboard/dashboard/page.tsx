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
  Badge,
  List,
  ListItem,
  Button,
} from '@tremor/react'
import {
  ArrowUpIcon,
  ArrowDownIcon,
  UserPlusIcon,
  CurrencyDollarIcon,
  BuildingStorefrontIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'

// Sample data
const commissionData = [
  {
    month: 'Jan',
    Commissions: 4200,
  },
  {
    month: 'Feb',
    Commissions: 4800,
  },
  {
    month: 'Mar',
    Commissions: 5100,
  },
  {
    month: 'Apr',
    Commissions: 4900,
  },
  {
    month: 'May',
    Commissions: 5600,
  },
  {
    month: 'Jun',
    Commissions: 6200,
  },
]

const clientsData = [
  {
    month: 'Jan',
    'New Clients': 2,
    'Total Clients': 12,
  },
  {
    month: 'Feb',
    'New Clients': 3,
    'Total Clients': 15,
  },
  {
    month: 'Mar',
    'New Clients': 5,
    'Total Clients': 20,
  },
  {
    month: 'Apr',
    'New Clients': 2,
    'Total Clients': 22,
  },
  {
    month: 'May',
    'New Clients': 4,
    'Total Clients': 26,
  },
  {
    month: 'Jun',
    'New Clients': 6,
    'Total Clients': 32,
  },
]

const clientTypeData = [
  {
    name: 'Small Hotels',
    value: 14,
  },
  {
    name: 'Mid-size Hotels',
    value: 10,
  },
  {
    name: 'Luxury Resorts',
    value: 5,
  },
  {
    name: 'Boutique Hotels',
    value: 3,
  },
]

const recentClients = [
  {
    name: 'Oceanview Resort',
    date: 'Jun 15, 2023',
    status: 'Active',
    value: '$450/month',
  },
  {
    name: 'Mountain Lodge',
    date: 'Jun 10, 2023',
    status: 'Active',
    value: '$350/month',
  },
  {
    name: 'City Center Hotel',
    date: 'May 28, 2023',
    status: 'Active',
    value: '$550/month',
  },
  {
    name: 'Sunset Beach Resort',
    date: 'May 15, 2023',
    status: 'Active',
    value: '$650/month',
  },
]

const upcomingPayments = [
  {
    client: 'Oceanview Resort',
    date: 'Jul 15, 2023',
    amount: '$1,350',
  },
  {
    client: 'Mountain Lodge',
    date: 'Jul 10, 2023',
    amount: '$1,050',
  },
  {
    client: 'City Center Hotel',
    date: 'Jul 28, 2023',
    amount: '$1,650',
  },
]

export default function PartnerDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly')

  return (
    <div className="space-y-8">
      <div>
        <Title>Partner Dashboard</Title>
        <Text>Welcome back! Here's an overview of your partnership performance.</Text>
      </div>

      {/* KPI Cards */}
      <Grid numItemsMd={2} numItemsLg={4} className="gap-6">
        <Card decoration="top" decorationColor="blue">
          <Flex justifyContent="between" alignItems="center">
            <div>
              <Text>Total Commissions</Text>
              <Metric>$26,800</Metric>
            </div>
            <CurrencyDollarIcon className="h-8 w-8 text-blue-500" />
          </Flex>
          <Flex className="mt-4 space-x-2">
            <Badge color="green" icon={ArrowUpIcon}>
              12.5%
            </Badge>
            <Text className="text-gray-500">vs last period</Text>
          </Flex>
        </Card>
        
        <Card decoration="top" decorationColor="green">
          <Flex justifyContent="between" alignItems="center">
            <div>
              <Text>Active Clients</Text>
              <Metric>32</Metric>
            </div>
            <UserPlusIcon className="h-8 w-8 text-green-500" />
          </Flex>
          <Flex className="mt-4 space-x-2">
            <Badge color="green" icon={ArrowUpIcon}>
              23.1%
            </Badge>
            <Text className="text-gray-500">vs last period</Text>
          </Flex>
        </Card>
        
        <Card decoration="top" decorationColor="amber">
          <Flex justifyContent="between" alignItems="center">
            <div>
              <Text>Conversion Rate</Text>
              <Metric>18.4%</Metric>
            </div>
            <BuildingStorefrontIcon className="h-8 w-8 text-amber-500" />
          </Flex>
          <Flex className="mt-4 space-x-2">
            <Badge color="green" icon={ArrowUpIcon}>
              2.3%
            </Badge>
            <Text className="text-gray-500">vs last period</Text>
          </Flex>
        </Card>
        
        <Card decoration="top" decorationColor="indigo">
          <Flex justifyContent="between" alignItems="center">
            <div>
              <Text>Avg. Client Value</Text>
              <Metric>$837</Metric>
            </div>
            <ClockIcon className="h-8 w-8 text-indigo-500" />
          </Flex>
          <Flex className="mt-4 space-x-2">
            <Badge color="red" icon={ArrowDownIcon}>
              3.2%
            </Badge>
            <Text className="text-gray-500">vs last period</Text>
          </Flex>
        </Card>
      </Grid>

      {/* Charts */}
      <TabGroup>
        <TabList className="mb-8">
          <Tab>Overview</Tab>
          <Tab>Commissions</Tab>
          <Tab>Clients</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} className="gap-6 mb-6">
              <Card>
                <Title>Commission Trend</Title>
                <Text>Monthly commission earnings</Text>
                <AreaChart
                  className="h-72 mt-4"
                  data={commissionData}
                  index="month"
                  categories={["Commissions"]}
                  colors={["blue"]}
                  valueFormatter={(number: number) => `$${number.toLocaleString()}`}
                />
              </Card>
              
              <Card>
                <Title>Client Growth</Title>
                <Text>New and total clients</Text>
                <BarChart
                  className="h-72 mt-4"
                  data={clientsData}
                  index="month"
                  categories={["New Clients", "Total Clients"]}
                  colors={["green", "blue"]}
                  stack={false}
                />
              </Card>
            </Grid>
            
            <Grid numItemsMd={2} className="gap-6">
              <Card>
                <Title>Client Types</Title>
                <Text>Distribution by property type</Text>
                <DonutChart
                  className="h-52 mt-4"
                  data={clientTypeData}
                  category="value"
                  index="name"
                  colors={["blue", "cyan", "indigo", "violet"]}
                />
                <Legend 
                  className="mt-3" 
                  categories={clientTypeData.map(item => item.name)}
                  colors={["blue", "cyan", "indigo", "violet"]}
                />
              </Card>
              
              <Card>
                <Title>Recent Clients</Title>
                <Text>New clients in the last 30 days</Text>
                <List className="mt-4">
                  {recentClients.map((client) => (
                    <ListItem key={client.name}>
                      <div>
                        <Text className="font-medium">{client.name}</Text>
                        <Text className="text-gray-500">{client.date}</Text>
                      </div>
                      <div className="text-right">
                        <Badge color="green">{client.status}</Badge>
                        <Text className="font-medium">{client.value}</Text>
                      </div>
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Grid>
          </TabPanel>
          
          <TabPanel>
            <Card>
              <Title>Commission Trend</Title>
              <Text>Monthly commission earnings</Text>
              <AreaChart
                className="h-96 mt-4"
                data={commissionData}
                index="month"
                categories={["Commissions"]}
                colors={["blue"]}
                valueFormatter={(number: number) => `$${number.toLocaleString()}`}
              />
            </Card>
            
            <Card className="mt-6">
              <Title>Upcoming Commission Payments</Title>
              <Text>Scheduled payments for the next 30 days</Text>
              <List className="mt-4">
                {upcomingPayments.map((payment) => (
                  <ListItem key={payment.client}>
                    <div>
                      <Text className="font-medium">{payment.client}</Text>
                      <Text className="text-gray-500">{payment.date}</Text>
                    </div>
                    <div>
                      <Text className="font-medium">{payment.amount}</Text>
                    </div>
                  </ListItem>
                ))}
              </List>
            </Card>
          </TabPanel>
          
          <TabPanel>
            <Card>
              <Title>Client Growth</Title>
              <Text>New and total clients</Text>
              <BarChart
                className="h-96 mt-4"
                data={clientsData}
                index="month"
                categories={["New Clients", "Total Clients"]}
                colors={["green", "blue"]}
                stack={false}
              />
            </Card>
            
            <Grid numItemsMd={2} className="gap-6 mt-6">
              <Card>
                <Title>Client Types</Title>
                <Text>Distribution by property type</Text>
                <DonutChart
                  className="h-64 mt-4"
                  data={clientTypeData}
                  category="value"
                  index="name"
                  colors={["blue", "cyan", "indigo", "violet"]}
                />
                <Legend 
                  className="mt-3" 
                  categories={clientTypeData.map(item => item.name)}
                  colors={["blue", "cyan", "indigo", "violet"]}
                />
              </Card>
              
              <Card>
                <Title>Recent Clients</Title>
                <Text>New clients in the last 30 days</Text>
                <List className="mt-4">
                  {recentClients.map((client) => (
                    <ListItem key={client.name}>
                      <div>
                        <Text className="font-medium">{client.name}</Text>
                        <Text className="text-gray-500">{client.date}</Text>
                      </div>
                      <div className="text-right">
                        <Badge color="green">{client.status}</Badge>
                        <Text className="font-medium">{client.value}</Text>
                      </div>
                    </ListItem>
                  ))}
                </List>
                <div className="mt-4">
                  <Button size="sm" variant="secondary" className="w-full">View All Clients</Button>
                </div>
              </Card>
            </Grid>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  )
} 