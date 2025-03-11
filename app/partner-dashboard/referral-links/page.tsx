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
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
  Grid,
  Metric,
  Flex,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  AreaChart,
} from '@tremor/react'
import {
  LinkIcon,
  PlusIcon,
  ArrowPathIcon,
  ClipboardIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  QrCodeIcon,
  ChartBarIcon,
  TagIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline'

// Sample data for referral links
const referralLinks = [
  {
    id: 'ref-001',
    name: 'Summer Promotion 2023',
    url: 'https://hotelmanagement.com/ref/summer2023',
    campaign: 'Summer 2023',
    discount: '15%',
    clicks: 245,
    signups: 32,
    conversion: '13.1%',
    revenue: '$4,800',
    status: 'Active',
    created: 'Jun 1, 2023',
  },
  {
    id: 'ref-002',
    name: 'Boutique Hotels',
    url: 'https://hotelmanagement.com/ref/boutique',
    campaign: 'Specialty Hotels',
    discount: '10%',
    clicks: 189,
    signups: 24,
    conversion: '12.7%',
    revenue: '$3,600',
    status: 'Active',
    created: 'May 15, 2023',
  },
  {
    id: 'ref-003',
    name: 'Resort Package',
    url: 'https://hotelmanagement.com/ref/resort',
    campaign: 'Specialty Hotels',
    discount: '20%',
    clicks: 156,
    signups: 18,
    conversion: '11.5%',
    revenue: '$5,400',
    status: 'Active',
    created: 'May 10, 2023',
  },
  {
    id: 'ref-004',
    name: 'Business Hotels',
    url: 'https://hotelmanagement.com/ref/business',
    campaign: 'Business Solutions',
    discount: '10%',
    clicks: 132,
    signups: 15,
    conversion: '11.4%',
    revenue: '$2,250',
    status: 'Active',
    created: 'Apr 22, 2023',
  },
  {
    id: 'ref-005',
    name: 'Spring Conference 2023',
    url: 'https://hotelmanagement.com/ref/conference2023',
    campaign: 'Events 2023',
    discount: '25%',
    clicks: 98,
    signups: 8,
    conversion: '8.2%',
    revenue: '$1,600',
    status: 'Inactive',
    created: 'Mar 5, 2023',
  },
]

// Sample data for performance chart
const performanceData = [
  {
    date: 'Jan 2023',
    Clicks: 120,
    Signups: 14,
    Revenue: 2100,
  },
  {
    date: 'Feb 2023',
    Clicks: 145,
    Signups: 18,
    Revenue: 2700,
  },
  {
    date: 'Mar 2023',
    Clicks: 190,
    Signups: 22,
    Revenue: 3300,
  },
  {
    date: 'Apr 2023',
    Clicks: 210,
    Signups: 25,
    Revenue: 3750,
  },
  {
    date: 'May 2023',
    Clicks: 345,
    Signups: 42,
    Revenue: 6300,
  },
  {
    date: 'Jun 2023',
    Clicks: 420,
    Signups: 56,
    Revenue: 8400,
  },
]

// Sample campaigns
const campaigns = [
  { name: 'Summer 2023', value: 'summer-2023' },
  { name: 'Specialty Hotels', value: 'specialty-hotels' },
  { name: 'Business Solutions', value: 'business-solutions' },
  { name: 'Events 2023', value: 'events-2023' },
]

// Sample discount options
const discountOptions = [
  { name: 'No Discount', value: 'none' },
  { name: '5% Off', value: '5' },
  { name: '10% Off', value: '10' },
  { name: '15% Off', value: '15' },
  { name: '20% Off', value: '20' },
  { name: '25% Off', value: '25' },
]

const valueFormatter = (number: number) => 
  `$${Intl.NumberFormat('us').format(number).toString()}`

export default function ReferralLinksPage() {
  // State for new referral link form
  const [linkName, setLinkName] = useState('')
  const [campaign, setCampaign] = useState('')
  const [discount, setDiscount] = useState('')
  const [showNewLinkForm, setShowNewLinkForm] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Function to handle form submission
  const handleCreateLink = () => {
    // In a real app, this would create a new referral link
    alert('New referral link created!')
    setLinkName('')
    setCampaign('')
    setDiscount('')
    setShowNewLinkForm(false)
  }

  // Function to copy link to clipboard
  const copyToClipboard = (id: string, url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Function to generate QR code
  const generateQRCode = (id: string) => {
    // In a real app, this would generate and download a QR code
    alert(`Generating QR code for link ID: ${id}`)
  }

  // Function to delete a link
  const deleteLink = (id: string) => {
    // In a real app, this would delete the referral link
    alert(`Deleting link ID: ${id}`)
  }

  return (
    <div className="space-y-8 max-w-full overflow-hidden">
      <div>
        <Title>Referral Links</Title>
        <Text>Create and manage your referral links to track conversions and revenue</Text>
      </div>

      {/* Performance Overview */}
      <Grid numItemsMd={3} numItemsSm={2} numItems={1} className="gap-6">
        <Card decoration="top" decorationColor="blue">
          <Flex alignItems="start">
            <div>
              <Text>Total Clicks</Text>
              <Metric>1,230</Metric>
            </div>
            <Badge color="blue" icon={GlobeAltIcon}>+12.3%</Badge>
          </Flex>
        </Card>
        
        <Card decoration="top" decorationColor="indigo">
          <Flex alignItems="start">
            <div>
              <Text>Conversions</Text>
              <Metric>97</Metric>
            </div>
            <Badge color="indigo" icon={TagIcon}>+8.7%</Badge>
          </Flex>
        </Card>
        
        <Card decoration="top" decorationColor="green">
          <Flex alignItems="start">
            <div>
              <Text>Revenue Generated</Text>
              <Metric>$17,650</Metric>
            </div>
            <Badge color="green" icon={CurrencyDollarIcon}>+15.2%</Badge>
          </Flex>
        </Card>
      </Grid>

      {/* Performance Chart */}
      <Card>
        <Title>Referral Performance</Title>
        <Text>6-month trend of clicks, signups, and revenue</Text>
        
        <TabGroup>
          <TabList className="mt-4">
            <Tab icon={ChartBarIcon}>Clicks & Signups</Tab>
            <Tab icon={CurrencyDollarIcon}>Revenue</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel>
              <div className="overflow-x-auto -mx-4 px-4">
                <AreaChart
                  className="mt-4 h-72 min-w-[500px]"
                  data={performanceData}
                  index="date"
                  categories={["Clicks", "Signups"]}
                  colors={["blue", "indigo"]}
                  showLegend={true}
                  showGridLines={true}
                  showAnimation={true}
                />
              </div>
            </TabPanel>
            
            <TabPanel>
              <div className="overflow-x-auto -mx-4 px-4">
                <AreaChart
                  className="mt-4 h-72 min-w-[500px]"
                  data={performanceData}
                  index="date"
                  categories={["Revenue"]}
                  colors={["green"]}
                  valueFormatter={valueFormatter}
                  showLegend={true}
                  showGridLines={true}
                  showAnimation={true}
                />
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>

      {/* Referral Links Management */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <Title>Your Referral Links</Title>
            <Text>Manage and track your referral links</Text>
          </div>
          
          <div className="flex gap-2">
            <Button 
              icon={PlusIcon} 
              color="blue"
              onClick={() => setShowNewLinkForm(!showNewLinkForm)}
            >
              {showNewLinkForm ? 'Cancel' : 'Create New Link'}
            </Button>
            
            <Button
              icon={ArrowPathIcon}
              variant="secondary"
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* New Link Form */}
        {showNewLinkForm && (
          <Card className="mb-6 border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20">
            <Title className="text-blue-800 dark:text-blue-300">Create New Referral Link</Title>
            
            <div className="mt-4 space-y-4">
              <div>
                <Text className="mb-2">Link Name</Text>
                <TextInput
                  placeholder="e.g., Summer Promotion 2023"
                  value={linkName}
                  onChange={(e) => setLinkName(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Text className="mb-2">Campaign</Text>
                  <Select
                    placeholder="Select a campaign"
                    value={campaign}
                    onValueChange={setCampaign}
                  >
                    {campaigns.map((camp) => (
                      <SelectItem key={camp.value} value={camp.value}>
                        {camp.name}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                
                <div>
                  <Text className="mb-2">Discount Offer</Text>
                  <Select
                    placeholder="Select a discount"
                    value={discount}
                    onValueChange={setDiscount}
                  >
                    {discountOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setShowNewLinkForm(false)}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  color="blue"
                  onClick={handleCreateLink}
                  disabled={!linkName || !campaign}
                  className="w-full sm:w-auto"
                >
                  Create Link
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Links Filter Tabs */}
        <TabGroup className="mt-4" onIndexChange={(index) => setActiveTab(index === 0 ? 'all' : index === 1 ? 'active' : 'inactive')}>
          <TabList>
            <Tab>All Links</Tab>
            <Tab>Active</Tab>
            <Tab>Inactive</Tab>
          </TabList>
        </TabGroup>

        {/* Links Table */}
        <div className="overflow-x-auto -mx-6 px-6">
          <Table className="mt-6 w-full">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell className="hidden md:table-cell">Campaign</TableHeaderCell>
                <TableHeaderCell className="hidden md:table-cell">Discount</TableHeaderCell>
                <TableHeaderCell>Clicks</TableHeaderCell>
                <TableHeaderCell>Signups</TableHeaderCell>
                <TableHeaderCell className="hidden lg:table-cell">Conversion</TableHeaderCell>
                <TableHeaderCell>Revenue</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {referralLinks
                .filter(link => {
                  if (activeTab === 'all') return true;
                  if (activeTab === 'active') return link.status === 'Active';
                  if (activeTab === 'inactive') return link.status === 'Inactive';
                  return true;
                })
                .map((link) => (
                  <TableRow key={link.id}>
                    <TableCell>
                      <div className="font-medium">{link.name}</div>
                      <div className="text-xs text-gray-500 truncate max-w-[150px] md:max-w-[200px]">{link.url}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{link.campaign}</TableCell>
                    <TableCell className="hidden md:table-cell">{link.discount}</TableCell>
                    <TableCell>{link.clicks}</TableCell>
                    <TableCell>{link.signups}</TableCell>
                    <TableCell className="hidden lg:table-cell">{link.conversion}</TableCell>
                    <TableCell>{link.revenue}</TableCell>
                    <TableCell>
                      <Badge color={link.status === 'Active' ? 'green' : 'gray'}>
                        {link.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <Button
                          size="xs"
                          variant="light"
                          color="blue"
                          icon={copiedId === link.id ? undefined : ClipboardIcon}
                          onClick={() => copyToClipboard(link.id, link.url)}
                        >
                          {copiedId === link.id ? 'Copied!' : 'Copy'}
                        </Button>
                        <div className="flex gap-2">
                          <Button
                            size="xs"
                            variant="light"
                            icon={QrCodeIcon}
                            onClick={() => generateQRCode(link.id)}
                          >
                            QR
                          </Button>
                          <Button
                            size="xs"
                            variant="light"
                            color="red"
                            icon={TrashIcon}
                            onClick={() => deleteLink(link.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Tips and Best Practices */}
      <Card>
        <Title>Tips for Effective Referral Links</Title>
        <Text>Maximize your conversions with these best practices</Text>
        
        <div className="mt-4 space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <div className="flex-1 min-w-0">
              <Text className="font-medium">Use descriptive names</Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Create link names that clearly identify the campaign or target audience to easily track performance.
              </Text>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold">2</span>
            </div>
            <div className="flex-1 min-w-0">
              <Text className="font-medium">Offer targeted discounts</Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Different hotel types may respond to different discount levels. Test various offers to find what works best.
              </Text>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold">3</span>
            </div>
            <div className="flex-1 min-w-0">
              <Text className="font-medium">Share QR codes at events</Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Generate QR codes for your referral links to share at industry events, conferences, and in-person meetings.
              </Text>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold">4</span>
            </div>
            <div className="flex-1 min-w-0">
              <Text className="font-medium">Track and optimize</Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Regularly review your link performance and adjust your strategy based on conversion rates and revenue.
              </Text>
            </div>
          </div>
        </div>
        
        <Button
          className="mt-6"
          variant="light"
          color="blue"
          icon={ArrowDownTrayIcon}
        >
          Download Referral Marketing Guide
        </Button>
      </Card>
    </div>
  )
} 