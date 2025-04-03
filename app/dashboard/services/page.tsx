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
} from '@tremor/react'
import {
  SparklesIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  ShieldCheckIcon,
  TruckIcon,
  HeartIcon,
  PlusIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'
import { ServiceCard } from '@/components/services/service-card'
import { ServiceStats } from '@/components/services/service-stats'
import { AddServiceModal } from '@/components/services/add-service-modal'

// Service Categories
const categories = [
  { id: 'all', name: 'All Services' },
  { id: 'room', name: 'Room Services' },
  { id: 'housekeeping', name: 'Housekeeping' },
  { id: 'maintenance', name: 'Maintenance' },
  { id: 'amenities', name: 'Amenities' },
  { id: 'events', name: 'Events' },
]

// Services Data
const services = [
  {
    id: 1,
    title: 'Room Cleaning',
    description: 'Standard room cleaning service',
    icon: SparklesIcon,
    category: 'housekeeping',
    status: 'available',
    metrics: [
      { label: 'Avg. Time', value: '45 mins' },
      { label: 'Price', value: '$30' },
      { label: 'Rating', value: '4.8/5' },
    ],
  },
  {
    id: 2,
    title: 'AC Maintenance',
    description: 'Air conditioning system check and maintenance',
    icon: WrenchScrewdriverIcon,
    category: 'maintenance',
    status: 'busy',
    metrics: [
      { label: 'Avg. Time', value: '2 hrs' },
      { label: 'Price', value: '$80' },
      { label: 'Rating', value: '4.7/5' },
    ],
  },
  {
    id: 3,
    title: 'In-Room Dining',
    description: '24/7 room service dining',
    icon: TruckIcon,
    category: 'room',
    status: 'available',
    metrics: [
      { label: 'Delivery Time', value: '30 mins' },
      { label: 'Min. Order', value: '$20' },
      { label: 'Rating', value: '4.9/5' },
    ],
  },
  {
    id: 4,
    title: 'Spa Treatment',
    description: 'Relaxing spa and massage services',
    icon: HeartIcon,
    category: 'amenities',
    status: 'available',
    metrics: [
      { label: 'Duration', value: '60 mins' },
      { label: 'Price', value: '$120' },
      { label: 'Rating', value: '4.9/5' },
    ],
  },
  {
    id: 5,
    title: 'Event Setup',
    description: 'Conference and event room setup',
    icon: UserGroupIcon,
    category: 'events',
    status: 'scheduled',
    metrics: [
      { label: 'Setup Time', value: '3 hrs' },
      { label: 'Price', value: '$200' },
      { label: 'Rating', value: '4.8/5' },
    ],
  },
  {
    id: 6,
    title: 'Security Patrol',
    description: '24/7 security monitoring and patrol',
    icon: ShieldCheckIcon,
    category: 'security',
    status: 'available',
    metrics: [
      { label: 'Coverage', value: '24/7' },
      { label: 'Response Time', value: '3 mins' },
      { label: 'Rating', value: '4.9/5' },
    ],
  },
]

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredServices = services.filter(
    service => selectedCategory === 'all' || service.category === selectedCategory
  )

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Title>Services Management</Title>
          <Text>Manage and monitor all hotel services</Text>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="secondary" 
            icon={ArrowPathIcon}
            onClick={() => {
              // Refresh services logic
            }}
          >
            Refresh
          </Button>
          <Button 
            icon={PlusIcon}
            onClick={() => setShowAddModal(true)}
          >
            Add Service
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <ServiceStats />

      {/* Main Content */}
      <Card>
        <TabGroup 
          index={categories.findIndex(c => c.id === selectedCategory)}
          onIndexChange={(index) => setSelectedCategory(categories[index].id)}
        >
          <TabList className="mt-2">
            {categories.map((category) => (
              <Tab 
                key={category.id}
                value={category.id}
              >
                {category.name}
              </Tab>
            ))}
          </TabList>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                category={service.category}
                status={service.status as 'available' | 'busy' | 'scheduled' | 'maintenance'}
                metrics={service.metrics}
              />
            ))}
            {filteredServices.length === 0 && (
              <div className="col-span-full text-center py-8">
                <Text>No services found in this category</Text>
              </div>
            )}
          </div>
        </TabGroup>
      </Card>

      {/* Add Service Modal */}
      <AddServiceModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
      />
    </div>
  )
} 