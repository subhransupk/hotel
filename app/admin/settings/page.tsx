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
  Switch,
  Button,
  Badge,
} from '@tremor/react'
import {
  Cog6ToothIcon,
  BellIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  SwatchIcon,
  CurrencyDollarIcon,
  CloudArrowUpIcon,
  KeyIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

// Types
interface EmailTemplate {
  id: string
  name: string
  subject: string
  status: 'active' | 'inactive'
  lastModified: string
}

interface IntegrationConfig {
  id: string
  name: string
  status: 'connected' | 'disconnected'
  lastSync: string
  icon: string
}

// Mock data
const emailTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Welcome Email',
    subject: 'Welcome to Our Hotel Management Platform',
    status: 'active',
    lastModified: '2 days ago',
  },
  {
    id: '2',
    name: 'Booking Confirmation',
    subject: 'Your Booking Confirmation #{booking_id}',
    status: 'active',
    lastModified: '5 days ago',
  },
  {
    id: '3',
    name: 'Payment Receipt',
    subject: 'Payment Receipt for Booking #{booking_id}',
    status: 'active',
    lastModified: '1 week ago',
  },
  {
    id: '4',
    name: 'Feedback Request',
    subject: 'How was your stay? Share your feedback',
    status: 'inactive',
    lastModified: '2 weeks ago',
  },
]

const integrations: IntegrationConfig[] = [
  {
    id: '1',
    name: 'Payment Gateway',
    status: 'connected',
    lastSync: '5 minutes ago',
    icon: '💳',
  },
  {
    id: '2',
    name: 'Email Service',
    status: 'connected',
    lastSync: '1 hour ago',
    icon: '📧',
  },
  {
    id: '3',
    name: 'Cloud Storage',
    status: 'disconnected',
    lastSync: '3 days ago',
    icon: '☁️',
  },
  {
    id: '4',
    name: 'Analytics',
    status: 'connected',
    lastSync: '10 minutes ago',
    icon: '📊',
  },
]

export default function SettingsPage() {
  // State for various settings
  const [selectedView, setSelectedView] = useState('general')
  const [companyName, setCompanyName] = useState('Hotel Management SaaS')
  const [supportEmail, setSupportEmail] = useState('support@hotelmanagement.com')
  const [timezone, setTimezone] = useState('UTC-5')
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY')
  const [currency, setCurrency] = useState('USD')
  const [language, setLanguage] = useState('en')
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [browserNotifications, setBrowserNotifications] = useState(true)
  const [maintenanceAlerts, setMaintenanceAlerts] = useState(true)
  const [securityAlerts, setSecurityAlerts] = useState(true)
  const [bookingNotifications, setBookingNotifications] = useState(true)

  return (
    <div className="space-y-6">
      <div>
        <Title>Platform Settings</Title>
        <Text>Configure and customize your platform preferences</Text>
      </div>

      {/* Main Content */}
      <Card>
        <TabGroup
          index={
            selectedView === 'general'
              ? 0
              : selectedView === 'notifications'
              ? 1
              : selectedView === 'email'
              ? 2
              : selectedView === 'integrations'
              ? 3
              : 4
          }
          onIndexChange={(index) =>
            setSelectedView(
              index === 0
                ? 'general'
                : index === 1
                ? 'notifications'
                : index === 2
                ? 'email'
                : index === 3
                ? 'integrations'
                : 'branding'
            )
          }
        >
          <TabList variant="solid">
            <Tab icon={Cog6ToothIcon}>General</Tab>
            <Tab icon={BellIcon}>Notifications</Tab>
            <Tab icon={EnvelopeIcon}>Email</Tab>
            <Tab icon={GlobeAltIcon}>Integrations</Tab>
            <Tab icon={SwatchIcon}>Branding</Tab>
          </TabList>

          <TabPanels>
            {/* General Settings Panel */}
            <TabPanel>
              <div className="mt-6 space-y-6">
                <Card>
                  <Title>General Settings</Title>
                  <Text>Basic platform configuration</Text>
                  
                  <div className="mt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Text>Company Name</Text>
                        <TextInput
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Enter company name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Text>Support Email</Text>
                        <TextInput
                          value={supportEmail}
                          onChange={(e) => setSupportEmail(e.target.value)}
                          placeholder="Enter support email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Text>Timezone</Text>
                        <Select value={timezone} onValueChange={setTimezone}>
                          <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                          <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                          <SelectItem value="UTC+0">UTC</SelectItem>
                          <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Text>Date Format</Text>
                        <Select value={dateFormat} onValueChange={setDateFormat}>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Text>Currency</Text>
                        <Select value={currency} onValueChange={setCurrency}>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Text>Language</Text>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </Select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        icon={CheckIcon}
                        color="blue"
                        className="text-white dark:text-white"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </TabPanel>

            {/* Notifications Panel */}
            <TabPanel>
              <div className="mt-6 space-y-6">
                <Card>
                  <Title>Notification Preferences</Title>
                  <Text>Configure how you receive notifications</Text>

                  <div className="mt-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="space-y-0.5">
                          <Text className="font-medium">Email Notifications</Text>
                          <Text className="text-gray-500 text-sm">
                            Receive notifications via email
                          </Text>
                        </div>
                        <Switch
                          checked={emailNotifications}
                          onChange={setEmailNotifications}
                        />
                      </div>

                      <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="space-y-0.5">
                          <Text className="font-medium">Browser Notifications</Text>
                          <Text className="text-gray-500 text-sm">
                            Show desktop notifications
                          </Text>
                        </div>
                        <Switch
                          checked={browserNotifications}
                          onChange={setBrowserNotifications}
                        />
                      </div>

                      <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="space-y-0.5">
                          <Text className="font-medium">Maintenance Alerts</Text>
                          <Text className="text-gray-500 text-sm">
                            System maintenance and updates
                          </Text>
                        </div>
                        <Switch
                          checked={maintenanceAlerts}
                          onChange={setMaintenanceAlerts}
                        />
                      </div>

                      <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="space-y-0.5">
                          <Text className="font-medium">Security Alerts</Text>
                          <Text className="text-gray-500 text-sm">
                            Important security notifications
                          </Text>
                        </div>
                        <Switch
                          checked={securityAlerts}
                          onChange={setSecurityAlerts}
                        />
                      </div>

                      <div className="flex items-center justify-between py-3">
                        <div className="space-y-0.5">
                          <Text className="font-medium">Booking Notifications</Text>
                          <Text className="text-gray-500 text-sm">
                            New bookings and cancellations
                          </Text>
                        </div>
                        <Switch
                          checked={bookingNotifications}
                          onChange={setBookingNotifications}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        icon={CheckIcon}
                        color="blue"
                        className="text-white dark:text-white"
                      >
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </TabPanel>

            {/* Email Templates Panel */}
            <TabPanel>
              <div className="mt-6 space-y-6">
                <Card>
                  <Title>Email Templates</Title>
                  <Text>Manage your email templates and notifications</Text>

                  <div className="mt-6 space-y-6">
                    <div className="overflow-hidden">
                      <div className="space-y-4">
                        {emailTemplates.map((template) => (
                          <div
                            key={template.id}
                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                          >
                            <div className="space-y-1">
                              <Text className="font-medium">{template.name}</Text>
                              <Text className="text-sm text-gray-500">
                                {template.subject}
                              </Text>
                              <Text className="text-xs text-gray-400">
                                Last modified: {template.lastModified}
                              </Text>
                            </div>
                            <div className="flex items-center gap-4">
                              <Badge
                                color={template.status === 'active' ? 'emerald' : 'gray'}
                                size="sm"
                              >
                                {template.status}
                              </Badge>
                              <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                <Cog6ToothIcon className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        icon={DocumentTextIcon}
                        color="blue"
                        className="text-white dark:text-white"
                      >
                        Add Template
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </TabPanel>

            {/* Integrations Panel */}
            <TabPanel>
              <div className="mt-6 space-y-6">
                <Card>
                  <Title>Platform Integrations</Title>
                  <Text>Manage your third-party integrations and connections</Text>

                  <div className="mt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {integrations.map((integration) => (
                        <div
                          key={integration.id}
                          className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{integration.icon}</div>
                              <div>
                                <Text className="font-medium">
                                  {integration.name}
                                </Text>
                                <Text className="text-sm text-gray-500">
                                  Last sync: {integration.lastSync}
                                </Text>
                              </div>
                            </div>
                            <Badge
                              color={
                                integration.status === 'connected'
                                  ? 'emerald'
                                  : 'gray'
                              }
                              size="sm"
                            >
                              {integration.status}
                            </Badge>
                          </div>
                          <div className="flex justify-end">
                            <Button
                              size="sm"
                              color={
                                integration.status === 'connected'
                                  ? 'red'
                                  : 'emerald'
                              }
                              variant="secondary"
                            >
                              {integration.status === 'connected'
                                ? 'Disconnect'
                                : 'Connect'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </TabPanel>

            {/* Branding Panel */}
            <TabPanel>
              <div className="mt-6 space-y-6">
                <Card>
                  <Title>Branding Settings</Title>
                  <Text>Customize your platform's appearance</Text>

                  <div className="mt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Logo Upload */}
                      <div className="col-span-full">
                        <Text className="font-medium mb-2">Logo</Text>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                            <BuildingOfficeIcon className="w-8 h-8 text-gray-400" />
                          </div>
                          <Button
                            icon={CloudArrowUpIcon}
                            variant="secondary"
                            color="gray"
                          >
                            Upload New Logo
                          </Button>
                        </div>
                      </div>

                      {/* Color Scheme */}
                      <div className="space-y-2">
                        <Text>Primary Color</Text>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary" />
                          <TextInput
                            value="#6366F1"
                            placeholder="Enter hex color"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Text>Secondary Color</Text>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-500" />
                          <TextInput
                            value="#6B7280"
                            placeholder="Enter hex color"
                          />
                        </div>
                      </div>

                      {/* Font Settings */}
                      <div className="space-y-2">
                        <Text>Primary Font</Text>
                        <Select defaultValue="inter">
                          <SelectItem value="inter">Inter</SelectItem>
                          <SelectItem value="roboto">Roboto</SelectItem>
                          <SelectItem value="opensans">Open Sans</SelectItem>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Text>Font Size Scale</Text>
                        <Select defaultValue="default">
                          <SelectItem value="compact">Compact</SelectItem>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="comfortable">Comfortable</SelectItem>
                        </Select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        icon={CheckIcon}
                        color="blue"
                        className="text-white dark:text-white"
                      >
                        Save Branding
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    </div>
  )
} 