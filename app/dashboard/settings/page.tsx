'use client';

import { useState } from 'react';
import {
  Cog6ToothIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  BellIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  SwatchIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  KeyIcon,
  DocumentIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import {
  Card,
  Title,
  Text,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TextInput,
  Select,
  SelectItem,
  Switch,
  Button,
  Grid,
  Col,
} from '@tremor/react';

interface SettingsSection {
  id: string;
  name: string;
  icon: any;
  description: string;
}

const settingsSections: SettingsSection[] = [
  {
    id: 'general',
    name: 'General Settings',
    icon: Cog6ToothIcon,
    description: 'Basic hotel information and preferences'
  },
  {
    id: 'hotel',
    name: 'Hotel Profile',
    icon: BuildingOfficeIcon,
    description: 'Hotel details and business information'
  },
  {
    id: 'billing',
    name: 'Billing & Payments',
    icon: CurrencyDollarIcon,
    description: 'Payment methods and billing preferences'
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: BellIcon,
    description: 'Alert and notification preferences'
  },
  {
    id: 'staff',
    name: 'Staff Settings',
    icon: UserGroupIcon,
    description: 'Staff roles and permissions'
  },
  {
    id: 'security',
    name: 'Security',
    icon: ShieldCheckIcon,
    description: 'Security and privacy settings'
  },
];

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'];
const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'];
const timeZones = ['UTC-8', 'UTC-7', 'UTC-6', 'UTC-5', 'UTC-4', 'UTC', 'UTC+1', 'UTC+2', 'UTC+8'];

export default function SettingsPage() {
  const [selectedView, setSelectedView] = useState(0);
  const [hotelName, setHotelName] = useState('Grand Hotel');
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('English');
  const [timeZone, setTimeZone] = useState('UTC');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div>
        <Title>Settings</Title>
        <Text>Manage your hotel preferences and configurations</Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {settingsSections.map((section) => (
          <Card 
            key={section.id}
            className="cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => setSelectedView(settingsSections.findIndex(s => s.id === section.id))}
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <section.icon className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <Text className="font-medium">{section.name}</Text>
                <Text className="text-sm text-gray-500 mt-1">{section.description}</Text>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <TabGroup index={selectedView} onIndexChange={setSelectedView}>
          <TabList>
            {settingsSections.map((section) => (
              <Tab key={section.id} icon={section.icon}>
                {section.name}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="mt-6 space-y-6">
                <Grid numItemsMd={2} className="gap-6">
                  <Col>
                    <div className="space-y-2">
                      <Text>Hotel Name</Text>
                      <TextInput
                        placeholder="Enter hotel name"
                        value={hotelName}
                        onChange={(e) => setHotelName(e.target.value)}
                      />
                    </div>
                  </Col>
                  <Col>
                    <div className="space-y-2">
                      <Text>Default Language</Text>
                      <Select value={language} onValueChange={setLanguage}>
                        {languages.map((lang) => (
                          <SelectItem key={lang} value={lang}>
                            {lang}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </Col>
                  <Col>
                    <div className="space-y-2">
                      <Text>Time Zone</Text>
                      <Select value={timeZone} onValueChange={setTimeZone}>
                        {timeZones.map((zone) => (
                          <SelectItem key={zone} value={zone}>
                            {zone}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </Col>
                  <Col>
                    <div className="space-y-2">
                      <Text>Default Currency</Text>
                      <Select value={currency} onValueChange={setCurrency}>
                        {currencies.map((curr) => (
                          <SelectItem key={curr} value={curr}>
                            {curr}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </Col>
                </Grid>

                <div className="space-y-4">
                  <Title className="text-base">Appearance</Title>
                  <div className="flex items-center justify-between">
                    <div>
                      <Text>Dark Mode</Text>
                      <Text className="text-sm text-gray-500">
                        Use dark theme for the dashboard
                      </Text>
                    </div>
                    <Switch
                      checked={darkMode}
                      onChange={setDarkMode}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    Save Changes
                  </Button>
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="mt-6 space-y-6">
                <Grid numItemsMd={2} className="gap-6">
                  <Col>
                    <div className="space-y-2">
                      <Text>Legal Business Name</Text>
                      <TextInput placeholder="Enter legal business name" />
                    </div>
                  </Col>
                  <Col>
                    <div className="space-y-2">
                      <Text>Tax ID / VAT Number</Text>
                      <TextInput placeholder="Enter tax ID" />
                    </div>
                  </Col>
                  <Col className="md:col-span-2">
                    <div className="space-y-2">
                      <Text>Business Address</Text>
                      <TextInput placeholder="Enter business address" />
                    </div>
                  </Col>
                  <Col>
                    <div className="space-y-2">
                      <Text>Contact Email</Text>
                      <TextInput placeholder="Enter contact email" />
                    </div>
                  </Col>
                  <Col>
                    <div className="space-y-2">
                      <Text>Contact Phone</Text>
                      <TextInput placeholder="Enter contact phone" />
                    </div>
                  </Col>
                </Grid>
                <div className="flex justify-end">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    Update Profile
                  </Button>
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="mt-6 space-y-6">
                <Grid numItemsMd={2} className="gap-6">
                  <Col>
                    <Card>
                      <Title className="text-base">Payment Methods</Title>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <Text>Accept Credit Cards</Text>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Text>Accept Digital Wallets</Text>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Text>Accept Bank Transfers</Text>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Title className="text-base">Invoice Settings</Title>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <Text>Automatic Invoicing</Text>
                          <Switch defaultChecked />
                        </div>
                        <div className="space-y-2">
                          <Text>Invoice Prefix</Text>
                          <TextInput placeholder="INV-" />
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Grid>
                <div className="flex justify-end">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    Save Payment Settings
                  </Button>
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="mt-6 space-y-6">
                <Card>
                  <Title className="text-base">Notification Preferences</Title>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Text className="flex items-center gap-2">
                          <EnvelopeIcon className="h-5 w-5" />
                          Email Notifications
                        </Text>
                        <Text className="text-sm text-gray-500">
                          Receive notifications via email
                        </Text>
                      </div>
                      <Switch
                        checked={emailNotifications}
                        onChange={setEmailNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Text className="flex items-center gap-2">
                          <DevicePhoneMobileIcon className="h-5 w-5" />
                          SMS Notifications
                        </Text>
                        <Text className="text-sm text-gray-500">
                          Receive notifications via SMS
                        </Text>
                      </div>
                      <Switch
                        checked={smsNotifications}
                        onChange={setSmsNotifications}
                      />
                    </div>
                  </div>
                </Card>
                <Card>
                  <Title className="text-base">Notification Events</Title>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <Text>New Bookings</Text>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Text>Booking Cancellations</Text>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Text>Payment Received</Text>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Text>Low Inventory Alerts</Text>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </Card>
                <div className="flex justify-end">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    Update Notifications
                  </Button>
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="mt-6 space-y-6">
                <Grid numItemsMd={2} className="gap-6">
                  <Col>
                    <Card>
                      <Title className="text-base">Role Management</Title>
                      <div className="mt-4 space-y-4">
                        <div className="space-y-2">
                          <Text>Default Role for New Staff</Text>
                          <Select defaultValue="staff">
                            <SelectItem value="admin">Administrator</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="staff">Staff</SelectItem>
                            <SelectItem value="receptionist">Receptionist</SelectItem>
                          </Select>
                        </div>
                      </div>
                    </Card>
                    <Card className="mt-6">
                      <Title className="text-base">Role Permissions</Title>
                      <div className="mt-4 space-y-6">
                        <div>
                          <Text className="font-medium mb-3">Administrator</Text>
                          <div className="space-y-2 ml-4">
                            <Text className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                              <ShieldCheckIcon className="h-4 w-4" />
                              Full system access
                            </Text>
                            <Text className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                              <KeyIcon className="h-4 w-4" />
                              Manage roles and permissions
                            </Text>
                            <Text className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                              <Cog6ToothIcon className="h-4 w-4" />
                              Configure system settings
                            </Text>
                          </div>
                        </div>
                        <div>
                          <Text className="font-medium mb-3">Manager</Text>
                          <div className="space-y-2 ml-4">
                            <Text className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                              <UserGroupIcon className="h-4 w-4" />
                              Manage staff
                            </Text>
                            <Text className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                              <DocumentIcon className="h-4 w-4" />
                              Access reports
                            </Text>
                            <Text className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                              <CurrencyDollarIcon className="h-4 w-4" />
                              Handle billing
                            </Text>
                          </div>
                        </div>
                        <div>
                          <Text className="font-medium mb-3">Staff</Text>
                          <div className="space-y-2 ml-4">
                            <Text className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                              <CalendarIcon className="h-4 w-4" />
                              Manage bookings
                            </Text>
                            <Text className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                              <ClipboardDocumentListIcon className="h-4 w-4" />
                              Handle guest requests
                            </Text>
                          </div>
                        </div>
                        <div>
                          <Text className="font-medium mb-3">Receptionist</Text>
                          <div className="space-y-2 ml-4">
                            <Text className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                              <BuildingOfficeIcon className="h-4 w-4" />
                              Check-in/Check-out
                            </Text>
                            <Text className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                              <CalendarIcon className="h-4 w-4" />
                              View bookings
                            </Text>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Title className="text-base">Access Control</Title>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Text>Two-Factor Authentication</Text>
                            <Text className="text-sm text-gray-500">
                              Require 2FA for all staff members
                            </Text>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Text>Staff Activity Logging</Text>
                            <Text className="text-sm text-gray-500">
                              Track all staff actions
                            </Text>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Text>IP Restriction</Text>
                            <Text className="text-sm text-gray-500">
                              Limit access to specific IP addresses
                            </Text>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </Card>
                    <Card className="mt-6">
                      <Title className="text-base">Module Access</Title>
                      <div className="mt-4 space-y-4">
                        <div className="space-y-2">
                          <Text className="font-medium">Receptionist Access</Text>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Text className="text-sm">Booking Management</Text>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <Text className="text-sm">Guest Profiles</Text>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <Text className="text-sm">Room Management</Text>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <Text className="text-sm">Billing Access</Text>
                              <Switch />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Text className="font-medium">Staff Access</Text>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Text className="text-sm">Inventory Management</Text>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <Text className="text-sm">Maintenance Requests</Text>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <Text className="text-sm">Staff Schedule</Text>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <Text className="text-sm">Reports Access</Text>
                              <Switch />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Grid>
                <div className="flex justify-end">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    Save Staff Settings
                  </Button>
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="mt-6 space-y-6">
                <Card>
                  <Title className="text-base">Security Settings</Title>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Text>Password Expiry</Text>
                        <Text className="text-sm text-gray-500">
                          Require password change every 90 days
                        </Text>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Text>Login Attempts</Text>
                        <Text className="text-sm text-gray-500">
                          Lock account after 5 failed attempts
                        </Text>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Text>Session Timeout</Text>
                        <Text className="text-sm text-gray-500">
                          Automatically logout after 30 minutes of inactivity
                        </Text>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </Card>
                <Card>
                  <Title className="text-base">Data Protection</Title>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Text>Data Encryption</Text>
                        <Text className="text-sm text-gray-500">
                          Enable end-to-end encryption for sensitive data
                        </Text>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Text>Automatic Backups</Text>
                        <Text className="text-sm text-gray-500">
                          Daily backup of all system data
                        </Text>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </Card>
                <div className="flex justify-end">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    Update Security Settings
                  </Button>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    </div>
  );
} 