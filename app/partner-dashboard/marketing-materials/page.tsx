'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Card,
  Title,
  Text,
  Button,
  TextInput,
  Select,
  SelectItem,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Grid,
  Badge,
  Divider,
  Flex,
} from '@tremor/react'
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon,
  PhotoIcon,
  VideoCameraIcon,
  PresentationChartBarIcon,
  EnvelopeIcon,
  TagIcon,
  StarIcon,
  ArrowPathIcon,
  EyeIcon,
  BookmarkIcon,
  BookmarkSlashIcon,
} from '@heroicons/react/24/outline'

// Sample marketing materials data
const marketingMaterials = [
  {
    id: 'brochure-1',
    title: 'Hotel Management System Overview',
    type: 'brochure',
    format: 'PDF',
    size: '3.2 MB',
    thumbnail: '/marketing/brochure-thumb.jpg',
    description: 'A comprehensive overview of our hotel management system features and benefits.',
    downloadUrl: '#',
    category: 'Product Information',
    tags: ['overview', 'features', 'benefits'],
    dateAdded: '2023-06-15',
    popular: true,
  },
  {
    id: 'flyer-1',
    title: 'Increase Revenue with Smart Pricing',
    type: 'flyer',
    format: 'PDF',
    size: '1.8 MB',
    thumbnail: '/marketing/flyer-thumb.jpg',
    description: 'One-page flyer highlighting how our dynamic pricing engine increases hotel revenue.',
    downloadUrl: '#',
    category: 'Sales Materials',
    tags: ['revenue', 'pricing', 'ROI'],
    dateAdded: '2023-07-02',
    popular: true,
  },
  {
    id: 'presentation-1',
    title: 'Hotel Management System Presentation',
    type: 'presentation',
    format: 'PPTX',
    size: '8.5 MB',
    thumbnail: '/marketing/presentation-thumb.jpg',
    description: 'Editable presentation for pitching the hotel management system to potential clients.',
    downloadUrl: '#',
    category: 'Sales Materials',
    tags: ['presentation', 'pitch', 'editable'],
    dateAdded: '2023-05-20',
    popular: false,
  },
  {
    id: 'image-1',
    title: 'Product Screenshot Collection',
    type: 'image',
    format: 'ZIP (PNG)',
    size: '12.4 MB',
    thumbnail: '/marketing/screenshots-thumb.jpg',
    description: 'High-resolution screenshots of the hotel management system interface.',
    downloadUrl: '#',
    category: 'Visual Assets',
    tags: ['screenshots', 'UI', 'interface'],
    dateAdded: '2023-06-28',
    popular: false,
  },
  {
    id: 'video-1',
    title: 'Product Demo Video',
    type: 'video',
    format: 'MP4',
    size: '45.7 MB',
    thumbnail: '/marketing/video-thumb.jpg',
    description: 'A 3-minute demo video showcasing the key features of our hotel management system.',
    downloadUrl: '#',
    category: 'Visual Assets',
    tags: ['demo', 'video', 'features'],
    dateAdded: '2023-04-15',
    popular: true,
  },
  {
    id: 'case-study-1',
    title: 'Luxury Resort Success Story',
    type: 'case-study',
    format: 'PDF',
    size: '4.1 MB',
    thumbnail: '/marketing/case-study-thumb.jpg',
    description: 'Case study on how a luxury resort increased efficiency by 35% using our system.',
    downloadUrl: '#',
    category: 'Case Studies',
    tags: ['success story', 'luxury', 'efficiency'],
    dateAdded: '2023-07-10',
    popular: true,
  },
  {
    id: 'email-template-1',
    title: 'Client Outreach Email Templates',
    type: 'email-template',
    format: 'DOCX',
    size: '1.2 MB',
    thumbnail: '/marketing/email-thumb.jpg',
    description: 'Customizable email templates for reaching out to potential hotel clients.',
    downloadUrl: '#',
    category: 'Email Marketing',
    tags: ['email', 'templates', 'outreach'],
    dateAdded: '2023-06-05',
    popular: false,
  },
  {
    id: 'infographic-1',
    title: 'ROI Infographic',
    type: 'infographic',
    format: 'PDF & PNG',
    size: '5.3 MB',
    thumbnail: '/marketing/infographic-thumb.jpg',
    description: 'Visual infographic showing the ROI of implementing our hotel management system.',
    downloadUrl: '#',
    category: 'Visual Assets',
    tags: ['ROI', 'infographic', 'benefits'],
    dateAdded: '2023-05-12',
    popular: true,
  },
  {
    id: 'guide-1',
    title: 'Partner Sales Playbook',
    type: 'guide',
    format: 'PDF',
    size: '6.8 MB',
    thumbnail: '/marketing/guide-thumb.jpg',
    description: 'Comprehensive guide on how to effectively sell the hotel management system.',
    downloadUrl: '#',
    category: 'Sales Materials',
    tags: ['sales', 'playbook', 'guide'],
    dateAdded: '2023-04-28',
    popular: false,
  },
  {
    id: 'social-1',
    title: 'Social Media Graphics Pack',
    type: 'social-media',
    format: 'ZIP (PNG & JPG)',
    size: '18.2 MB',
    thumbnail: '/marketing/social-thumb.jpg',
    description: 'Ready-to-use graphics for promoting the hotel management system on social media.',
    downloadUrl: '#',
    category: 'Social Media',
    tags: ['social media', 'graphics', 'promotion'],
    dateAdded: '2023-07-05',
    popular: false,
  },
]

// Material type icons mapping
const typeIcons: Record<string, any> = {
  'brochure': DocumentTextIcon,
  'flyer': DocumentTextIcon,
  'presentation': PresentationChartBarIcon,
  'image': PhotoIcon,
  'video': VideoCameraIcon,
  'case-study': DocumentTextIcon,
  'email-template': EnvelopeIcon,
  'infographic': PresentationChartBarIcon,
  'guide': DocumentTextIcon,
  'social-media': PhotoIcon,
}

// Categories for filtering
const categories = [
  { name: 'All Categories', value: 'all' },
  { name: 'Product Information', value: 'Product Information' },
  { name: 'Sales Materials', value: 'Sales Materials' },
  { name: 'Visual Assets', value: 'Visual Assets' },
  { name: 'Case Studies', value: 'Case Studies' },
  { name: 'Email Marketing', value: 'Email Marketing' },
  { name: 'Social Media', value: 'Social Media' },
]

// Material types for filtering
const materialTypes = [
  { name: 'All Types', value: 'all' },
  { name: 'Brochures & Flyers', value: 'document' },
  { name: 'Presentations', value: 'presentation' },
  { name: 'Images & Graphics', value: 'image' },
  { name: 'Videos', value: 'video' },
  { name: 'Case Studies', value: 'case-study' },
  { name: 'Email Templates', value: 'email-template' },
  { name: 'Guides & Playbooks', value: 'guide' },
]

export default function MarketingMaterialsPage() {
  // State for filtering and search
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [activeTab, setActiveTab] = useState('all')
  const [savedMaterials, setSavedMaterials] = useState<string[]>([])

  // Function to handle saving/unsaving materials
  const toggleSave = (id: string) => {
    if (savedMaterials.includes(id)) {
      setSavedMaterials(savedMaterials.filter(materialId => materialId !== id))
    } else {
      setSavedMaterials([...savedMaterials, id])
    }
  }

  // Function to download a material
  const downloadMaterial = (id: string, title: string) => {
    // In a real app, this would trigger an actual download
    alert(`Downloading ${title}...`)
  }

  // Filter materials based on search, category, type, and active tab
  const filteredMaterials = marketingMaterials.filter(material => {
    // Filter by search query
    const matchesSearch = 
      searchQuery === '' || 
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    // Filter by category
    const matchesCategory = 
      selectedCategory === 'all' || 
      material.category === selectedCategory
    
    // Filter by type
    const matchesType = 
      selectedType === 'all' || 
      (selectedType === 'document' && (material.type === 'brochure' || material.type === 'flyer')) ||
      (selectedType === 'image' && (material.type === 'image' || material.type === 'infographic' || material.type === 'social-media')) ||
      material.type === selectedType
    
    // Filter by tab
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'popular' && material.popular) ||
      (activeTab === 'saved' && savedMaterials.includes(material.id))
    
    return matchesSearch && matchesCategory && matchesType && matchesTab
  })

  return (
    <div className="space-y-8">
      <div>
        <Title>Marketing Materials</Title>
        <Text>Access and download marketing resources to promote our hotel management system</Text>
      </div>

      {/* Filters and Search */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="w-full md:w-auto">
            <TextInput
              icon={MagnifyingGlassIcon}
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="w-full sm:w-48"
            >
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.name}
                </SelectItem>
              ))}
            </Select>
            <Select
              value={selectedType}
              onValueChange={setSelectedType}
              className="w-full sm:w-48"
            >
              {materialTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.name}
                </SelectItem>
              ))}
            </Select>
            <Button
              icon={ArrowPathIcon}
              variant="secondary"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setSelectedType('all')
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <TabGroup index={activeTab === 'all' ? 0 : activeTab === 'popular' ? 1 : 2} onIndexChange={(index) => setActiveTab(index === 0 ? 'all' : index === 1 ? 'popular' : 'saved')}>
        <TabList className="mt-4">
          <Tab icon={DocumentTextIcon}>All Materials</Tab>
          <Tab icon={StarIcon}>Popular</Tab>
          <Tab icon={BookmarkIcon}>Saved ({savedMaterials.length})</Tab>
        </TabList>
      </TabGroup>

      {/* Materials Grid */}
      {filteredMaterials.length > 0 ? (
        <Grid numItemsMd={2} numItemsLg={3} className="gap-6">
          {filteredMaterials.map((material) => {
            const TypeIcon = typeIcons[material.type] || DocumentTextIcon
            const isSaved = savedMaterials.includes(material.id)
            
            return (
              <Card key={material.id} className="flex flex-col h-full">
                <div className="relative mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-video">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <TypeIcon className="h-12 w-12 text-gray-400" />
                  </div>
                  {/* In a real app, you would use actual thumbnails */}
                  {/* <Image 
                    src={material.thumbnail} 
                    alt={material.title}
                    fill
                    className="object-cover"
                  /> */}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <Title className="text-lg">{material.title}</Title>
                      <Badge color="blue" className="mt-1">{material.type}</Badge>
                      {material.popular && <Badge color="amber" className="mt-1 ml-2">Popular</Badge>}
                    </div>
                    <Button
                      size="xs"
                      variant="light"
                      color={isSaved ? "red" : "gray"}
                      icon={isSaved ? BookmarkSlashIcon : BookmarkIcon}
                      onClick={() => toggleSave(material.id)}
                    >
                      {isSaved ? "Unsave" : "Save"}
                    </Button>
                  </div>
                  
                  <Text className="mt-2 line-clamp-2">{material.description}</Text>
                  
                  <div className="mt-3 flex flex-wrap gap-1">
                    {material.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Divider className="my-4" />
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium">{material.format}</span> · {material.size}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="xs"
                      variant="light"
                      icon={EyeIcon}
                      onClick={() => alert(`Preview ${material.title}`)}
                    >
                      Preview
                    </Button>
                    <Button
                      size="xs"
                      color="blue"
                      icon={ArrowDownTrayIcon}
                      onClick={() => downloadMaterial(material.id, material.title)}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </Grid>
      ) : (
        <Card className="py-12">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <MagnifyingGlassIcon className="h-12 w-12" />
            </div>
            <Title className="mt-4">No materials found</Title>
            <Text className="mt-2">Try adjusting your search or filter criteria</Text>
            <Button
              className="mt-6"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setSelectedType('all')
                setActiveTab('all')
              }}
            >
              Clear all filters
            </Button>
          </div>
        </Card>
      )}

      {/* Request Materials Section */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
        <Flex>
          <div className="flex-1">
            <Title className="text-blue-800 dark:text-blue-300">Need custom marketing materials?</Title>
            <Text className="mt-2 text-blue-700 dark:text-blue-400">
              We can create customized marketing materials tailored to your specific audience and needs.
            </Text>
          </div>
          <Button color="blue">Request Custom Materials</Button>
        </Flex>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <Title>Marketing Materials Usage Guidelines</Title>
        <Text className="mt-2">
          Please follow these guidelines when using our marketing materials:
        </Text>
        
        <div className="mt-4 space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <div className="flex-1 min-w-0">
              <Text className="font-medium">Do not alter our logo or brand elements</Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Please use our logo and brand elements as provided without altering colors, proportions, or effects.
              </Text>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold">2</span>
            </div>
            <div className="flex-1 min-w-0">
              <Text className="font-medium">Customize editable materials with your branding</Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Editable materials like presentations and email templates can be customized with your company information.
              </Text>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold">3</span>
            </div>
            <div className="flex-1 min-w-0">
              <Text className="font-medium">Always use the most recent versions</Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Marketing materials are regularly updated. Always check for the most recent versions before distribution.
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
          Download Complete Brand Guidelines
        </Button>
      </Card>
    </div>
  )
} 