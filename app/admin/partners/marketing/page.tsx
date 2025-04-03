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
  Col,
  Flex,
  Metric,
  TextInput,
  Textarea,
  DatePicker,
  DatePickerValue,
} from '@tremor/react'
import {
  ArrowDownTrayIcon,
  PlusIcon,
  DocumentIcon,
  PhotoIcon,
  VideoCameraIcon,
  PresentationChartBarIcon,
  LinkIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon,
  MegaphoneIcon,
  CalendarDaysIcon,
  TagIcon,
  ArrowPathIcon,
  DocumentDuplicateIcon,
  ShareIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

// Define types for marketing resources
type ResourceCategory = 'templates' | 'images' | 'videos' | 'presentations' | 'guides'
type ResourceStatus = 'active' | 'archived' | 'draft'

type MarketingResource = {
  id: string
  title: string
  description: string
  category: ResourceCategory
  fileType: string
  fileSize: string
  downloadCount: number
  lastUpdated: string
  status: ResourceStatus
  featured: boolean
  tags: string[]
  thumbnailUrl?: string
  downloadUrl: string
}

type MarketingCampaign = {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  status: 'active' | 'scheduled' | 'completed' | 'draft'
  resources: string[]
  targetAudience: string
  goals: string
}

// Mock data for marketing resources
const marketingResources: MarketingResource[] = [
  {
    id: 'res-001',
    title: 'Hotel Booking Email Template',
    description: 'Professional email template for promoting hotel bookings to clients',
    category: 'templates',
    fileType: 'HTML/CSS',
    fileSize: '245 KB',
    downloadCount: 156,
    lastUpdated: '2024-03-15',
    status: 'active',
    featured: true,
    tags: ['email', 'template', 'booking'],
    thumbnailUrl: '/assets/thumbnails/email-template.jpg',
    downloadUrl: '/assets/resources/hotel-booking-email.zip',
  },
  {
    id: 'res-002',
    title: 'Luxury Suite Photo Collection',
    description: 'High-resolution photos of our luxury suites for marketing materials',
    category: 'images',
    fileType: 'JPG/PNG',
    fileSize: '24.5 MB',
    downloadCount: 89,
    lastUpdated: '2024-02-28',
    status: 'active',
    featured: true,
    tags: ['photos', 'luxury', 'suites'],
    thumbnailUrl: '/assets/thumbnails/luxury-suite.jpg',
    downloadUrl: '/assets/resources/luxury-suite-photos.zip',
  },
  {
    id: 'res-003',
    title: 'Hotel Amenities Video Tour',
    description: 'Promotional video showcasing all hotel amenities and facilities',
    category: 'videos',
    fileType: 'MP4',
    fileSize: '156 MB',
    downloadCount: 42,
    lastUpdated: '2024-03-05',
    status: 'active',
    featured: false,
    tags: ['video', 'amenities', 'tour'],
    thumbnailUrl: '/assets/thumbnails/amenities-video.jpg',
    downloadUrl: '/assets/resources/hotel-amenities-tour.mp4',
  },
  {
    id: 'res-004',
    title: 'Partner Marketing Strategy Guide',
    description: 'Comprehensive guide on marketing strategies for hotel partners',
    category: 'guides',
    fileType: 'PDF',
    fileSize: '3.2 MB',
    downloadCount: 215,
    lastUpdated: '2024-01-20',
    status: 'active',
    featured: true,
    tags: ['guide', 'strategy', 'marketing'],
    thumbnailUrl: '/assets/thumbnails/strategy-guide.jpg',
    downloadUrl: '/assets/resources/partner-marketing-guide.pdf',
  },
  {
    id: 'res-005',
    title: 'Seasonal Promotion Presentation',
    description: 'Ready-to-use presentation for seasonal hotel promotions',
    category: 'presentations',
    fileType: 'PPTX',
    fileSize: '8.7 MB',
    downloadCount: 76,
    lastUpdated: '2024-02-10',
    status: 'active',
    featured: false,
    tags: ['presentation', 'seasonal', 'promotion'],
    thumbnailUrl: '/assets/thumbnails/seasonal-promo.jpg',
    downloadUrl: '/assets/resources/seasonal-promotion.pptx',
  },
  {
    id: 'res-006',
    title: 'Social Media Content Calendar',
    description: 'Monthly content calendar template for hotel social media marketing',
    category: 'templates',
    fileType: 'XLSX',
    fileSize: '1.8 MB',
    downloadCount: 124,
    lastUpdated: '2024-03-01',
    status: 'active',
    featured: false,
    tags: ['social media', 'calendar', 'content'],
    thumbnailUrl: '/assets/thumbnails/content-calendar.jpg',
    downloadUrl: '/assets/resources/social-media-calendar.xlsx',
  },
  {
    id: 'res-007',
    title: 'Hotel Branding Guidelines',
    description: 'Official branding guidelines including logos, colors, and typography',
    category: 'guides',
    fileType: 'PDF',
    fileSize: '5.4 MB',
    downloadCount: 98,
    lastUpdated: '2024-01-15',
    status: 'active',
    featured: true,
    tags: ['branding', 'guidelines', 'logo'],
    thumbnailUrl: '/assets/thumbnails/branding-guide.jpg',
    downloadUrl: '/assets/resources/hotel-branding-guidelines.pdf',
  },
]

// Mock data for marketing campaigns
const marketingCampaigns: MarketingCampaign[] = [
  {
    id: 'camp-001',
    title: 'Summer Getaway Promotion',
    description: 'Special summer packages with discounted rates for family vacations',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    status: 'scheduled',
    resources: ['res-002', 'res-003', 'res-005'],
    targetAudience: 'Families and leisure travelers',
    goals: 'Increase summer bookings by 25% compared to last year',
  },
  {
    id: 'camp-002',
    title: 'Business Travel Program',
    description: 'Exclusive benefits for corporate clients and business travelers',
    startDate: '2024-04-15',
    endDate: '2024-12-15',
    status: 'active',
    resources: ['res-001', 'res-004', 'res-007'],
    targetAudience: 'Corporate clients and business travelers',
    goals: 'Acquire 50 new corporate accounts and increase business bookings by 30%',
  },
  {
    id: 'camp-003',
    title: 'Holiday Season Packages',
    description: 'Special holiday packages including New Year celebrations',
    startDate: '2024-11-15',
    endDate: '2025-01-10',
    status: 'draft',
    resources: ['res-005', 'res-006'],
    targetAudience: 'Holiday travelers and celebration seekers',
    goals: 'Achieve 90% occupancy during the holiday season',
  },
]

export default function MarketingResourcesPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddResourceModal, setShowAddResourceModal] = useState(false)
  const [showAddCampaignModal, setShowAddCampaignModal] = useState(false)
  
  // Form states for new resource
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    category: 'templates' as ResourceCategory,
    fileType: '',
    fileSize: '',
    tags: '',
    featured: false,
    status: 'active' as ResourceStatus
  })
  
  // Form states for new campaign
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    description: '',
    startDate: new Date() as DatePickerValue,
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)) as DatePickerValue,
    status: 'draft' as 'active' | 'scheduled' | 'completed' | 'draft',
    targetAudience: '',
    goals: '',
    selectedResources: [] as string[]
  })

  // Filter resources based on selected category and search query
  const filteredResources = marketingResources
    .filter(resource => 
      selectedCategory === 'all' || resource.category === selectedCategory
    )
    .filter(resource => 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  // Handler for downloading a resource
  const handleDownload = (resourceId: string) => {
    console.log(`Downloading resource: ${resourceId}`)
  }

  // Handler for adding a new resource
  const handleAddResource = () => {
    setShowAddResourceModal(true)
  }

  // Handler for adding a new campaign
  const handleAddCampaign = () => {
    setShowAddCampaignModal(true)
  }
  
  // Handler for submitting a new resource
  const handleSubmitResource = () => {
    console.log('Submitting new resource:', newResource)
    // Here you would typically make an API call to save the resource
    
    // Reset form and close modal
    setNewResource({
      title: '',
      description: '',
      category: 'templates',
      fileType: '',
      fileSize: '',
      tags: '',
      featured: false,
      status: 'active'
    })
    setShowAddResourceModal(false)
  }
  
  // Handler for submitting a new campaign
  const handleSubmitCampaign = () => {
    console.log('Submitting new campaign:', newCampaign)
    // Here you would typically make an API call to save the campaign
    
    // Reset form and close modal
    setNewCampaign({
      title: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
      status: 'draft',
      targetAudience: '',
      goals: '',
      selectedResources: []
    })
    setShowAddCampaignModal(false)
  }
  
  // Handler for toggling resource selection in campaign form
  const toggleResourceSelection = (resourceId: string) => {
    setNewCampaign(prev => {
      if (prev.selectedResources.includes(resourceId)) {
        return {
          ...prev,
          selectedResources: prev.selectedResources.filter(id => id !== resourceId)
        }
      } else {
        return {
          ...prev,
          selectedResources: [...prev.selectedResources, resourceId]
        }
      }
    })
  }

  // Get icon based on resource category
  const getCategoryIcon = (category: ResourceCategory) => {
    switch (category) {
      case 'templates':
        return <DocumentIcon className="h-5 w-5" />
      case 'images':
        return <PhotoIcon className="h-5 w-5" />
      case 'videos':
        return <VideoCameraIcon className="h-5 w-5" />
      case 'presentations':
        return <PresentationChartBarIcon className="h-5 w-5" />
      case 'guides':
        return <DocumentIcon className="h-5 w-5" />
      default:
        return <DocumentIcon className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Title className="text-2xl font-bold">Partner Marketing Resources</Title>
          <Text className="mt-1 text-gray-600">
            Access and manage marketing materials for hotel partners
          </Text>
        </div>
        <div className="flex items-center gap-2">
          <Button
            icon={PlusIcon}
            color="blue"
            onClick={activeTab === 0 ? handleAddResource : handleAddCampaign}
          >
            {activeTab === 0 ? 'Add Resource' : 'Create Campaign'}
          </Button>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Card>
        <TabGroup index={activeTab} onIndexChange={setActiveTab}>
          <TabList className="mb-6">
            <Tab icon={DocumentIcon}>Marketing Resources</Tab>
            <Tab icon={MegaphoneIcon}>Marketing Campaigns</Tab>
          </TabList>
          <TabPanels>
            {/* Marketing Resources Tab */}
            <TabPanel>
              <div className="space-y-6">
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                    className="max-w-xs"
                  >
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="templates">Templates</SelectItem>
                    <SelectItem value="images">Images</SelectItem>
                    <SelectItem value="videos">Videos</SelectItem>
                    <SelectItem value="presentations">Presentations</SelectItem>
                    <SelectItem value="guides">Guides</SelectItem>
                  </Select>
                  <TextInput
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-xs"
                    icon={EyeIcon}
                  />
                </div>

                {/* Featured Resources */}
                <div>
                  <Title className="mb-4">Featured Resources</Title>
                  <Grid numItemsMd={2} numItemsLg={3} className="gap-6">
                    {filteredResources
                      .filter(resource => resource.featured)
                      .map(resource => (
                        <Card key={resource.id} className="p-4 flex flex-col h-full">
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center">
                                <div className={`
                                  p-2 rounded-md mr-3
                                  ${resource.category === 'templates' ? 'bg-blue-50 text-blue-500' : ''}
                                  ${resource.category === 'images' ? 'bg-amber-50 text-amber-500' : ''}
                                  ${resource.category === 'videos' ? 'bg-rose-50 text-rose-500' : ''}
                                  ${resource.category === 'presentations' ? 'bg-emerald-50 text-emerald-500' : ''}
                                  ${resource.category === 'guides' ? 'bg-purple-50 text-purple-500' : ''}
                                `}>
                                  {getCategoryIcon(resource.category)}
                                </div>
                                <Badge color="amber" size="sm">Featured</Badge>
                              </div>
                              <Text className="text-xs text-gray-500">
                                {formatDate(resource.lastUpdated)}
                              </Text>
                            </div>
                            <Title className="mt-2 text-lg">{resource.title}</Title>
                            <Text className="mt-1 text-gray-600 line-clamp-2">{resource.description}</Text>
                            <div className="mt-3 flex flex-wrap gap-1">
                              {resource.tags.map(tag => (
                                <Badge key={tag} color="gray" size="xs">{tag}</Badge>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                            <div>
                              <Text className="text-xs text-gray-500">{resource.fileType} • {resource.fileSize}</Text>
                              <Text className="text-xs text-gray-500">{resource.downloadCount} downloads</Text>
                            </div>
                            <Button
                              icon={ArrowDownTrayIcon}
                              variant="secondary"
                              color="blue"
                              size="xs"
                              onClick={() => handleDownload(resource.id)}
                            >
                              Download
                            </Button>
                          </div>
                        </Card>
                      ))}
                  </Grid>
                </div>

                {/* All Resources Table */}
                <div>
                  <Title className="mb-4">All Resources</Title>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Resource</TableHeaderCell>
                        <TableHeaderCell>Category</TableHeaderCell>
                        <TableHeaderCell>File Info</TableHeaderCell>
                        <TableHeaderCell>Downloads</TableHeaderCell>
                        <TableHeaderCell>Last Updated</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                        <TableHeaderCell>Actions</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredResources.map(resource => (
                        <TableRow key={resource.id}>
                          <TableCell>
                            <div>
                              <Text className="font-medium">{resource.title}</Text>
                              <Text className="text-xs text-gray-500 line-clamp-1">{resource.description}</Text>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {resource.tags.map(tag => (
                                  <Badge key={tag} color="gray" size="xs">{tag}</Badge>
                                ))}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              color={
                                resource.category === 'templates' 
                                  ? 'blue' 
                                  : resource.category === 'images' 
                                    ? 'amber' 
                                    : resource.category === 'videos'
                                      ? 'rose'
                                      : resource.category === 'presentations'
                                        ? 'emerald'
                                        : 'purple'
                              } 
                              size="sm"
                            >
                              {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Text>{resource.fileType}</Text>
                            <Text className="text-xs text-gray-500">{resource.fileSize}</Text>
                          </TableCell>
                          <TableCell>{resource.downloadCount}</TableCell>
                          <TableCell>{formatDate(resource.lastUpdated)}</TableCell>
                          <TableCell>
                            <Badge 
                              color={
                                resource.status === 'active' 
                                  ? 'emerald' 
                                  : resource.status === 'archived' 
                                    ? 'gray' 
                                    : 'amber'
                              } 
                              size="sm"
                            >
                              {resource.status.charAt(0).toUpperCase() + resource.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Flex justifyContent="start" className="gap-2">
                              <Button
                                icon={ArrowDownTrayIcon}
                                variant="secondary"
                                color="gray"
                                size="xs"
                                onClick={() => handleDownload(resource.id)}
                              >
                                Download
                              </Button>
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
                            </Flex>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabPanel>

            {/* Marketing Campaigns Tab */}
            <TabPanel>
              <div className="space-y-6">
                {/* Active Campaigns */}
                <div>
                  <Title className="mb-4">Active & Upcoming Campaigns</Title>
                  <Grid numItemsMd={2} className="gap-6">
                    {marketingCampaigns
                      .filter(campaign => campaign.status === 'active' || campaign.status === 'scheduled')
                      .map(campaign => (
                        <Card key={campaign.id} className="p-4">
                          <div className="flex items-start justify-between">
                            <Badge 
                              color={
                                campaign.status === 'active' 
                                  ? 'emerald' 
                                  : campaign.status === 'scheduled' 
                                    ? 'blue' 
                                    : campaign.status === 'completed'
                                      ? 'gray'
                                      : 'amber'
                              } 
                              size="sm"
                            >
                              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                            </Badge>
                            <div className="flex gap-1">
                              <Button
                                icon={PencilIcon}
                                variant="light"
                                color="gray"
                                size="xs"
                              />
                              <Button
                                icon={DocumentDuplicateIcon}
                                variant="light"
                                color="gray"
                                size="xs"
                              />
                            </div>
                          </div>
                          <Title className="mt-2">{campaign.title}</Title>
                          <Text className="mt-1 text-gray-600">{campaign.description}</Text>
                          
                          <div className="mt-4 flex items-center text-gray-500 text-sm">
                            <CalendarDaysIcon className="h-4 w-4 mr-1" />
                            <Text>
                              {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                            </Text>
                          </div>
                          
                          <div className="mt-4">
                            <Text className="font-medium">Target Audience:</Text>
                            <Text className="text-gray-600">{campaign.targetAudience}</Text>
                          </div>
                          
                          <div className="mt-2">
                            <Text className="font-medium">Goals:</Text>
                            <Text className="text-gray-600">{campaign.goals}</Text>
                          </div>
                          
                          <div className="mt-4">
                            <Text className="font-medium">Resources:</Text>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {campaign.resources.map(resId => {
                                const resource = marketingResources.find(r => r.id === resId)
                                return resource ? (
                                  <Badge 
                                    key={resId} 
                                    color={
                                      resource.category === 'templates' 
                                        ? 'blue' 
                                        : resource.category === 'images' 
                                          ? 'amber' 
                                          : resource.category === 'videos'
                                            ? 'rose'
                                            : resource.category === 'presentations'
                                              ? 'emerald'
                                              : 'purple'
                                    } 
                                    size="sm"
                                  >
                                    {resource.title}
                                  </Badge>
                                ) : null
                              })}
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                            <Button
                              icon={ShareIcon}
                              variant="secondary"
                              color="blue"
                              size="sm"
                            >
                              Share Campaign
                            </Button>
                          </div>
                        </Card>
                      ))}
                  </Grid>
                </div>

                {/* All Campaigns Table */}
                <div>
                  <Title className="mb-4">All Marketing Campaigns</Title>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Campaign</TableHeaderCell>
                        <TableHeaderCell>Timeline</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                        <TableHeaderCell>Target Audience</TableHeaderCell>
                        <TableHeaderCell>Resources</TableHeaderCell>
                        <TableHeaderCell>Actions</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {marketingCampaigns.map(campaign => (
                        <TableRow key={campaign.id}>
                          <TableCell>
                            <div>
                              <Text className="font-medium">{campaign.title}</Text>
                              <Text className="text-xs text-gray-500 line-clamp-1">{campaign.description}</Text>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <CalendarDaysIcon className="h-4 w-4 mr-1 text-gray-500" />
                              <div>
                                <Text>{formatDate(campaign.startDate)}</Text>
                                <Text>to {formatDate(campaign.endDate)}</Text>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              color={
                                campaign.status === 'active' 
                                  ? 'emerald' 
                                  : campaign.status === 'scheduled' 
                                    ? 'blue' 
                                    : campaign.status === 'completed'
                                      ? 'gray'
                                      : 'amber'
                              } 
                              size="sm"
                            >
                              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{campaign.targetAudience}</TableCell>
                          <TableCell>
                            <Text>{campaign.resources.length} resources</Text>
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
                            </Flex>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Campaign Analytics Summary */}
                <Card>
                  <Title>Campaign Performance Summary</Title>
                  <Text>Overview of marketing campaign effectiveness</Text>
                  <Grid numItemsMd={2} numItemsLg={4} className="gap-6 mt-4">
                    <Card decoration="top" decorationColor="blue">
                      <Flex justifyContent="start" className="space-x-4">
                        <div className="p-2 bg-blue-50 rounded-md">
                          <EyeIcon className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                          <Text>Total Impressions</Text>
                          <Metric className="text-2xl font-bold">245,721</Metric>
                          <Text className="text-sm text-green-500">+18% from last quarter</Text>
                        </div>
                      </Flex>
                    </Card>
                    <Card decoration="top" decorationColor="emerald">
                      <Flex justifyContent="start" className="space-x-4">
                        <div className="p-2 bg-emerald-50 rounded-md">
                          <LinkIcon className="h-6 w-6 text-emerald-500" />
                        </div>
                        <div>
                          <Text>Click-through Rate</Text>
                          <Metric className="text-2xl font-bold">4.8%</Metric>
                          <Text className="text-sm text-green-500">+0.6% from last quarter</Text>
                        </div>
                      </Flex>
                    </Card>
                    <Card decoration="top" decorationColor="amber">
                      <Flex justifyContent="start" className="space-x-4">
                        <div className="p-2 bg-amber-50 rounded-md">
                          <ArrowDownTrayIcon className="h-6 w-6 text-amber-500" />
                        </div>
                        <div>
                          <Text>Resource Downloads</Text>
                          <Metric className="text-2xl font-bold">1,842</Metric>
                          <Text className="text-sm text-green-500">+24% from last quarter</Text>
                        </div>
                      </Flex>
                    </Card>
                    <Card decoration="top" decorationColor="rose">
                      <Flex justifyContent="start" className="space-x-4">
                        <div className="p-2 bg-rose-50 rounded-md">
                          <TagIcon className="h-6 w-6 text-rose-500" />
                        </div>
                        <div>
                          <Text>Conversion Rate</Text>
                          <Metric className="text-2xl font-bold">2.7%</Metric>
                          <Text className="text-sm text-green-500">+0.3% from last quarter</Text>
                        </div>
                      </Flex>
                    </Card>
                  </Grid>
                </Card>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
      
      {/* Add Resource Modal */}
      {showAddResourceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <Title>Add New Marketing Resource</Title>
                <Button
                  icon={XMarkIcon}
                  variant="light"
                  color="gray"
                  onClick={() => setShowAddResourceModal(false)}
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <Text className="mb-2">Resource Title</Text>
                  <TextInput
                    placeholder="Enter resource title"
                    value={newResource.title}
                    onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <Text className="mb-2">Description</Text>
                  <Textarea
                    placeholder="Enter resource description"
                    value={newResource.description}
                    onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                  />
                </div>
                
                <div>
                  <Text className="mb-2">Category</Text>
                  <Select
                    value={newResource.category}
                    onValueChange={(value) => setNewResource({...newResource, category: value as ResourceCategory})}
                  >
                    <SelectItem value="templates">Templates</SelectItem>
                    <SelectItem value="images">Images</SelectItem>
                    <SelectItem value="videos">Videos</SelectItem>
                    <SelectItem value="presentations">Presentations</SelectItem>
                    <SelectItem value="guides">Guides</SelectItem>
                  </Select>
                </div>
                
                <Grid numItemsMd={2} className="gap-4">
                  <div>
                    <Text className="mb-2">File Type</Text>
                    <TextInput
                      placeholder="e.g., PDF, DOCX, JPG"
                      value={newResource.fileType}
                      onChange={(e) => setNewResource({...newResource, fileType: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Text className="mb-2">File Size</Text>
                    <TextInput
                      placeholder="e.g., 2.5 MB"
                      value={newResource.fileSize}
                      onChange={(e) => setNewResource({...newResource, fileSize: e.target.value})}
                    />
                  </div>
                </Grid>
                
                <div>
                  <Text className="mb-2">Tags (comma separated)</Text>
                  <TextInput
                    placeholder="e.g., brochure, promotion, summer"
                    value={newResource.tags}
                    onChange={(e) => setNewResource({...newResource, tags: e.target.value})}
                  />
                </div>
                
                <Grid numItemsMd={2} className="gap-4">
                  <div>
                    <Text className="mb-2">Status</Text>
                    <Select
                      value={newResource.status}
                      onValueChange={(value) => setNewResource({...newResource, status: value as ResourceStatus})}
                    >
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </Select>
                  </div>
                  
                  <div className="flex items-center h-full pt-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 rounded"
                        checked={newResource.featured}
                        onChange={(e) => setNewResource({...newResource, featured: e.target.checked})}
                      />
                      <span className="ml-2">Featured Resource</span>
                    </label>
                  </div>
                </Grid>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Text className="mb-4">Upload Resource File</Text>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <DocumentIcon className="h-10 w-10 mx-auto text-gray-400" />
                    <Text className="mt-2">Drag and drop your file here, or click to browse</Text>
                    <Text className="text-xs text-gray-500 mt-1">Supports all file types up to 100MB</Text>
                    <Button
                      variant="secondary"
                      color="gray"
                      className="mt-4"
                    >
                      Browse Files
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-3">
                <Button
                  variant="secondary"
                  color="gray"
                  onClick={() => setShowAddResourceModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  color="blue"
                  onClick={handleSubmitResource}
                >
                  Add Resource
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Campaign Modal */}
      {showAddCampaignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <Title>Create New Marketing Campaign</Title>
                <Button
                  icon={XMarkIcon}
                  variant="light"
                  color="gray"
                  onClick={() => setShowAddCampaignModal(false)}
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <Text className="mb-2">Campaign Title</Text>
                  <TextInput
                    placeholder="Enter campaign title"
                    value={newCampaign.title}
                    onChange={(e) => setNewCampaign({...newCampaign, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <Text className="mb-2">Description</Text>
                  <Textarea
                    placeholder="Enter campaign description"
                    value={newCampaign.description}
                    onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})}
                  />
                </div>
                
                <Grid numItemsMd={2} className="gap-4">
                  <div>
                    <Text className="mb-2">Start Date</Text>
                    <DatePicker
                      value={newCampaign.startDate}
                      onValueChange={(date) => setNewCampaign({...newCampaign, startDate: date})}
                    />
                  </div>
                  
                  <div>
                    <Text className="mb-2">End Date</Text>
                    <DatePicker
                      value={newCampaign.endDate}
                      onValueChange={(date) => setNewCampaign({...newCampaign, endDate: date})}
                    />
                  </div>
                </Grid>
                
                <div>
                  <Text className="mb-2">Status</Text>
                  <Select
                    value={newCampaign.status}
                    onValueChange={(value) => setNewCampaign({...newCampaign, status: value as 'active' | 'scheduled' | 'completed' | 'draft'})}
                  >
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </Select>
                </div>
                
                <div>
                  <Text className="mb-2">Target Audience</Text>
                  <TextInput
                    placeholder="e.g., Business travelers, Families with children"
                    value={newCampaign.targetAudience}
                    onChange={(e) => setNewCampaign({...newCampaign, targetAudience: e.target.value})}
                  />
                </div>
                
                <div>
                  <Text className="mb-2">Campaign Goals</Text>
                  <Textarea
                    placeholder="Enter campaign goals and KPIs"
                    value={newCampaign.goals}
                    onChange={(e) => setNewCampaign({...newCampaign, goals: e.target.value})}
                  />
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Text className="mb-4">Select Resources for Campaign</Text>
                  <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
                    {marketingResources.map(resource => (
                      <div 
                        key={resource.id} 
                        className={`flex items-center p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 ${
                          newCampaign.selectedResources.includes(resource.id) ? 'bg-blue-50' : ''
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 rounded mr-3"
                          checked={newCampaign.selectedResources.includes(resource.id)}
                          onChange={() => toggleResourceSelection(resource.id)}
                        />
                        <div className="flex-1">
                          <Text className="font-medium">{resource.title}</Text>
                          <Text className="text-xs text-gray-500">{resource.category.charAt(0).toUpperCase() + resource.category.slice(1)} • {resource.fileType}</Text>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-3">
                <Button
                  variant="secondary"
                  color="gray"
                  onClick={() => setShowAddCampaignModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  color="blue"
                  onClick={handleSubmitCampaign}
                >
                  Create Campaign
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 