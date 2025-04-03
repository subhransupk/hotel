'use client'

import { useState } from 'react'
import {
  Card,
  Title,
  Text,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TextInput,
  Select,
  SelectItem,
  Button,
  Switch,
  Grid,
  Divider,
} from '@tremor/react'
import {
  Cog6ToothIcon,
  UserIcon,
  BuildingOfficeIcon,
  BellIcon,
  ShieldCheckIcon,
  KeyIcon,
  CreditCardIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  PhotoIcon,
  PlusIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function SettingsPage() {
  // State for form values
  const [profileImage, setProfileImage] = useState('/placeholder-avatar.jpg')
  const [firstName, setFirstName] = useState('John')
  const [lastName, setLastName] = useState('Partner')
  const [email, setEmail] = useState('partner@example.com')
  const [phone, setPhone] = useState('+1 (555) 123-4567')
  const [timezone, setTimezone] = useState('America/New_York')
  const [language, setLanguage] = useState('en')
  
  // Company information
  const [companyName, setCompanyName] = useState('Partner Agency LLC')
  const [companyWebsite, setCompanyWebsite] = useState('https://www.partneragency.com')
  const [companyAddress, setCompanyAddress] = useState('123 Main Street')
  const [companyCity, setCompanyCity] = useState('New York')
  const [companyState, setCompanyState] = useState('NY')
  const [companyZip, setCompanyZip] = useState('10001')
  const [companyCountry, setCompanyCountry] = useState('United States')
  
  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [newLeadNotifications, setNewLeadNotifications] = useState(true)
  const [commissionsNotifications, setCommissionsNotifications] = useState(true)
  const [marketingNotifications, setMarketingNotifications] = useState(false)
  
  // Security settings
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState('30')
  
  // Payment information
  const [paymentMethod, setPaymentMethod] = useState('bank')
  const [bankName, setBankName] = useState('Chase Bank')
  const [accountNumber, setAccountNumber] = useState('****6789')
  const [routingNumber, setRoutingNumber] = useState('****4321')
  const [taxIdType, setTaxIdType] = useState('EIN')
  const [taxId, setTaxId] = useState('XX-XXXXXXX')
  
  // API keys
  const [apiKeys, setApiKeys] = useState([
    { name: 'Production Key', key: 'pk_live_****************************************************************', created: '2023-05-15', active: true },
    { name: 'Test Key', key: 'pk_test_****************************************************************', created: '2023-05-15', active: true },
  ])
  
  // Theme preferences
  const [darkMode, setDarkMode] = useState(false)
  const [colorScheme, setColorScheme] = useState('blue')
  
  // Handle profile image change
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would save the settings to the server
    alert('Settings saved successfully!')
  }
  
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <Title>Account Settings</Title>
        <Text>Manage your account preferences and settings</Text>
      </div>
      
      <TabGroup>
        <TabList className="mt-8">
          <Tab icon={UserIcon}>Profile</Tab>
          <Tab icon={BuildingOfficeIcon}>Company</Tab>
          <Tab icon={BellIcon}>Notifications</Tab>
          <Tab icon={ShieldCheckIcon}>Security</Tab>
          <Tab icon={CreditCardIcon}>Payments</Tab>
          <Tab icon={KeyIcon}>API & Integrations</Tab>
          <Tab icon={Cog6ToothIcon}>Preferences</Tab>
        </TabList>
        
        <TabPanels>
          {/* Profile Settings */}
          <TabPanel>
            <Card className="mt-6">
              <Title>Personal Information</Title>
              <Text>Update your personal details and profile image</Text>
              
              <div className="mt-6 flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="h-32 w-32 mx-auto rounded-full overflow-hidden relative">
                      <Image
                        src={profileImage}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
                      <PhotoIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <Text className="mt-4 text-gray-500">Upload a new photo</Text>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleProfileImageChange} 
                    className="hidden" 
                    id="profile-image-upload" 
                  />
                  <label 
                    htmlFor="profile-image-upload" 
                    className="mt-2 cursor-pointer text-blue-600 hover:text-blue-800"
                  >
                    Change Photo
                  </label>
                </div>
                
                <div className="flex-1">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Grid numItemsMd={2} className="gap-4">
                      <div>
                        <Text className="mb-2">First Name</Text>
                        <TextInput 
                          placeholder="First Name" 
                          value={firstName} 
                          onChange={(e) => setFirstName(e.target.value)} 
                        />
                      </div>
                      <div>
                        <Text className="mb-2">Last Name</Text>
                        <TextInput 
                          placeholder="Last Name" 
                          value={lastName} 
                          onChange={(e) => setLastName(e.target.value)} 
                        />
                      </div>
                    </Grid>
                    
                    <div>
                      <Text className="mb-2">Email Address</Text>
                      <TextInput 
                        placeholder="Email Address" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        type="email"
                      />
                    </div>
                    
                    <div>
                      <Text className="mb-2">Phone Number</Text>
                      <TextInput 
                        placeholder="Phone Number" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        type="tel"
                      />
                    </div>
                    
                    <Grid numItemsMd={2} className="gap-4">
                      <div>
                        <Text className="mb-2">Timezone</Text>
                        <Select 
                          value={timezone} 
                          onValueChange={setTimezone}
                        >
                          <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                          <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                          <SelectItem value="America/Anchorage">Alaska Time (AKT)</SelectItem>
                          <SelectItem value="Pacific/Honolulu">Hawaii Time (HT)</SelectItem>
                        </Select>
                      </div>
                      <div>
                        <Text className="mb-2">Language</Text>
                        <Select 
                          value={language} 
                          onValueChange={setLanguage}
                        >
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="pt">Portuguese</SelectItem>
                        </Select>
                      </div>
                    </Grid>
                    
                    <div className="flex justify-end">
                      <Button type="submit" color="blue">Save Changes</Button>
                    </div>
                  </form>
                </div>
              </div>
            </Card>
          </TabPanel>
          
          {/* Company Settings */}
          <TabPanel>
            <Card className="mt-6">
              <Title>Company Information</Title>
              <Text>Update your company details and business information</Text>
              
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <Text className="mb-2">Company Name</Text>
                  <TextInput 
                    placeholder="Company Name" 
                    value={companyName} 
                    onChange={(e) => setCompanyName(e.target.value)} 
                  />
                </div>
                
                <div>
                  <Text className="mb-2">Company Website</Text>
                  <TextInput 
                    placeholder="https://www.example.com" 
                    value={companyWebsite} 
                    onChange={(e) => setCompanyWebsite(e.target.value)} 
                    type="url"
                  />
                </div>
                
                <Divider>Business Address</Divider>
                
                <div>
                  <Text className="mb-2">Street Address</Text>
                  <TextInput 
                    placeholder="Street Address" 
                    value={companyAddress} 
                    onChange={(e) => setCompanyAddress(e.target.value)} 
                  />
                </div>
                
                <Grid numItemsMd={3} className="gap-4">
                  <div>
                    <Text className="mb-2">City</Text>
                    <TextInput 
                      placeholder="City" 
                      value={companyCity} 
                      onChange={(e) => setCompanyCity(e.target.value)} 
                    />
                  </div>
                  <div>
                    <Text className="mb-2">State/Province</Text>
                    <TextInput 
                      placeholder="State/Province" 
                      value={companyState} 
                      onChange={(e) => setCompanyState(e.target.value)} 
                    />
                  </div>
                  <div>
                    <Text className="mb-2">ZIP/Postal Code</Text>
                    <TextInput 
                      placeholder="ZIP/Postal Code" 
                      value={companyZip} 
                      onChange={(e) => setCompanyZip(e.target.value)} 
                    />
                  </div>
                </Grid>
                
                <div>
                  <Text className="mb-2">Country</Text>
                  <Select 
                    value={companyCountry} 
                    onValueChange={setCompanyCountry}
                  >
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="Spain">Spain</SelectItem>
                    <SelectItem value="Italy">Italy</SelectItem>
                    <SelectItem value="Japan">Japan</SelectItem>
                    <SelectItem value="China">China</SelectItem>
                  </Select>
                </div>
                
                <Card className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                      <DocumentTextIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <Text className="font-medium">Business Verification</Text>
                      <Text className="text-sm text-gray-600 dark:text-gray-400">
                        Your business has been verified. To update your business documentation or tax information, please contact support.
                      </Text>
                    </div>
                  </div>
                </Card>
                
                <div className="flex justify-end">
                  <Button type="submit" color="blue">Save Changes</Button>
                </div>
              </form>
            </Card>
          </TabPanel>
          
          {/* Notification Settings */}
          <TabPanel>
            <Card className="mt-6">
              <Title>Notification Preferences</Title>
              <Text>Manage how and when you receive notifications</Text>
              
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <Text className="font-medium">Email Notifications</Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</Text>
                  </div>
                  <Switch 
                    checked={emailNotifications} 
                    onChange={setEmailNotifications} 
                  />
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <Text className="font-medium">SMS Notifications</Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via SMS</Text>
                  </div>
                  <Switch 
                    checked={smsNotifications} 
                    onChange={setSmsNotifications} 
                  />
                </div>
                
                <Divider>Notification Types</Divider>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <Text className="font-medium">New Lead Alerts</Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400">Get notified when you receive a new lead</Text>
                  </div>
                  <Switch 
                    checked={newLeadNotifications} 
                    onChange={setNewLeadNotifications} 
                  />
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <Text className="font-medium">Commission Payouts</Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400">Get notified about commission payments</Text>
                  </div>
                  <Switch 
                    checked={commissionsNotifications} 
                    onChange={setCommissionsNotifications} 
                  />
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <Text className="font-medium">Marketing Updates</Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400">Receive updates about marketing materials and campaigns</Text>
                  </div>
                  <Switch 
                    checked={marketingNotifications} 
                    onChange={setMarketingNotifications} 
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" color="blue">Save Preferences</Button>
                </div>
              </form>
            </Card>
          </TabPanel>
          
          {/* Security Settings */}
          <TabPanel>
            <Card className="mt-6">
              <Title>Security Settings</Title>
              <Text>Manage your account security and authentication</Text>
              
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <Card className="bg-gray-50 dark:bg-gray-800">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <Text className="font-medium">Password</Text>
                      <Text className="text-sm text-gray-500 dark:text-gray-400">Last changed 30 days ago</Text>
                    </div>
                    <Button variant="secondary" size="sm">Change Password</Button>
                  </div>
                </Card>
                
                <Card className="bg-gray-50 dark:bg-gray-800">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <Text className="font-medium">Two-Factor Authentication</Text>
                      <Text className="text-sm text-gray-500 dark:text-gray-400">
                        {twoFactorEnabled ? 'Enabled' : 'Not enabled'} - Add an extra layer of security to your account
                      </Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={twoFactorEnabled} 
                        onChange={setTwoFactorEnabled} 
                      />
                      <Text>{twoFactorEnabled ? 'Enabled' : 'Disabled'}</Text>
                    </div>
                  </div>
                </Card>
                
                <div>
                  <Text className="mb-2">Session Timeout (minutes)</Text>
                  <Select 
                    value={sessionTimeout} 
                    onValueChange={setSessionTimeout}
                  >
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                    <SelectItem value="480">8 hours</SelectItem>
                  </Select>
                </div>
                
                <Divider>Login History</Divider>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <Text className="font-medium">Current Session</Text>
                      <Text className="text-sm text-gray-500 dark:text-gray-400">
                        New York, USA • Chrome on Windows • IP: 192.168.1.1
                      </Text>
                      <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Started: Today, 10:30 AM
                      </Text>
                    </div>
                    <div className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs flex items-center">
                      <CheckCircleIcon className="h-3 w-3 mr-1" />
                      Active
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <Text className="font-medium">Previous Session</Text>
                      <Text className="text-sm text-gray-500 dark:text-gray-400">
                        New York, USA • Safari on macOS • IP: 192.168.1.2
                      </Text>
                      <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Yesterday, 5:45 PM
                      </Text>
                    </div>
                    <div className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-full text-xs flex items-center">
                      <XCircleIcon className="h-3 w-3 mr-1" />
                      Ended
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" color="blue">Save Security Settings</Button>
                </div>
              </form>
            </Card>
          </TabPanel>
          
          {/* Payment Settings */}
          <TabPanel>
            <Card className="mt-6">
              <Title>Payment Information</Title>
              <Text>Manage your payment methods and tax information</Text>
              
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <Text className="mb-2">Payment Method</Text>
                  <Select 
                    value={paymentMethod} 
                    onValueChange={setPaymentMethod}
                  >
                    <SelectItem value="bank">Bank Transfer (ACH)</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="wire">Wire Transfer</SelectItem>
                  </Select>
                </div>
                
                {paymentMethod === 'bank' && (
                  <div className="space-y-4">
                    <div>
                      <Text className="mb-2">Bank Name</Text>
                      <TextInput 
                        placeholder="Bank Name" 
                        value={bankName} 
                        onChange={(e) => setBankName(e.target.value)} 
                      />
                    </div>
                    
                    <Grid numItemsMd={2} className="gap-4">
                      <div>
                        <Text className="mb-2">Account Number</Text>
                        <TextInput 
                          placeholder="Account Number" 
                          value={accountNumber} 
                          onChange={(e) => setAccountNumber(e.target.value)} 
                          type="password"
                        />
                      </div>
                      <div>
                        <Text className="mb-2">Routing Number</Text>
                        <TextInput 
                          placeholder="Routing Number" 
                          value={routingNumber} 
                          onChange={(e) => setRoutingNumber(e.target.value)} 
                          type="password"
                        />
                      </div>
                    </Grid>
                  </div>
                )}
                
                {paymentMethod === 'paypal' && (
                  <div>
                    <Text className="mb-2">PayPal Email</Text>
                    <TextInput 
                      placeholder="PayPal Email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      type="email"
                    />
                  </div>
                )}
                
                <Divider>Tax Information</Divider>
                
                <div>
                  <Text className="mb-2">Tax ID Type</Text>
                  <Select 
                    value={taxIdType} 
                    onValueChange={setTaxIdType}
                  >
                    <SelectItem value="SSN">Social Security Number (SSN)</SelectItem>
                    <SelectItem value="EIN">Employer Identification Number (EIN)</SelectItem>
                    <SelectItem value="ITIN">Individual Taxpayer Identification Number (ITIN)</SelectItem>
                  </Select>
                </div>
                
                <div>
                  <Text className="mb-2">Tax ID Number</Text>
                  <TextInput 
                    placeholder="Tax ID Number" 
                    value={taxId} 
                    onChange={(e) => setTaxId(e.target.value)} 
                    type="password"
                  />
                </div>
                
                <Card className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-800 rounded-lg">
                      <DocumentTextIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <Text className="font-medium">Tax Forms</Text>
                      <Text className="text-sm text-gray-600 dark:text-gray-400">
                        Your W-9 form is on file. You will receive a 1099 form by January 31st each year for the previous year's earnings.
                      </Text>
                    </div>
                  </div>
                </Card>
                
                <div className="flex justify-end">
                  <Button type="submit" color="blue">Save Payment Information</Button>
                </div>
              </form>
            </Card>
          </TabPanel>
          
          {/* API Settings */}
          <TabPanel>
            <Card className="mt-6">
              <Title>API Keys & Integrations</Title>
              <Text>Manage your API keys and third-party integrations</Text>
              
              <div className="mt-6 space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <Text className="font-medium">API Keys</Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400">
                      Generate and manage API keys for your applications
                    </Text>
                  </div>
                  <Button size="sm" icon={PlusIcon}>Generate New Key</Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="py-4 px-2 text-sm font-medium text-gray-500 dark:text-gray-400">Name</th>
                        <th className="py-4 px-2 text-sm font-medium text-gray-500 dark:text-gray-400">API Key</th>
                        <th className="py-4 px-2 text-sm font-medium text-gray-500 dark:text-gray-400">Created</th>
                        <th className="py-4 px-2 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                        <th className="py-4 px-2 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiKeys.map((key, index) => (
                        <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                          <td className="py-4 px-2">{key.name}</td>
                          <td className="py-4 px-2 font-mono text-xs">{key.key}</td>
                          <td className="py-4 px-2">{key.created}</td>
                          <td className="py-4 px-2">
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              key.active ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                              {key.active ? 'Active' : 'Inactive'}
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex gap-2">
                              <Button size="xs" variant="light">Revoke</Button>
                              <Button size="xs" variant="light">Copy</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <Divider>Third-Party Integrations</Divider>
                
                <div className="space-y-4">
                  <Card className="bg-gray-50 dark:bg-gray-800 p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                          <GlobeAltIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <Text className="font-medium">Website Tracking</Text>
                          <Text className="text-sm text-gray-500 dark:text-gray-400">
                            Track referrals from your website
                          </Text>
                        </div>
                      </div>
                      <Switch checked={true} />
                    </div>
                  </Card>
                  
                  <Card className="bg-gray-50 dark:bg-gray-800 p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                          <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </div>
                        <div>
                          <Text className="font-medium">Facebook Ads</Text>
                          <Text className="text-sm text-gray-500 dark:text-gray-400">
                            Track conversions from Facebook ads
                          </Text>
                        </div>
                      </div>
                      <Switch checked={false} />
                    </div>
                  </Card>
                  
                  <Card className="bg-gray-50 dark:bg-gray-800 p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                          <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7.3 21.7c-5.1-2.7-6.6-8.3-3.9-13.4 1.4-2.7 3.8-4.7 6.7-5.5l-.4 2.1c-4.4 1.7-6.6 6.6-4.9 11 .5 1.4 1.4 2.6 2.5 3.5l.8-2.7zm5.1-15.6c.2 0 .4.1.5.2l5.5 7c.3.4.2.8-.1 1.1l-5.5 7c-.2.2-.4.3-.6.3-.2 0-.4-.1-.5-.2-.3-.2-.4-.7-.2-1l5.2-6.6-5.1-6.6c-.3-.3-.2-.8.1-1 .1-.1.3-.2.5-.2z" />
                          </svg>
                        </div>
                        <div>
                          <Text className="font-medium">Google Ads</Text>
                          <Text className="text-sm text-gray-500 dark:text-gray-400">
                            Track conversions from Google ads
                          </Text>
                        </div>
                      </div>
                      <Switch checked={true} />
                    </div>
                  </Card>
                </div>
                
                <div className="flex justify-end">
                  <Button color="blue">Save Integration Settings</Button>
                </div>
              </div>
            </Card>
          </TabPanel>
          
          {/* Preferences */}
          <TabPanel>
            <Card className="mt-6">
              <Title>Application Preferences</Title>
              <Text>Customize your experience with the platform</Text>
              
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <Text className="font-medium">Dark Mode</Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark themes</Text>
                  </div>
                  <Switch 
                    checked={darkMode} 
                    onChange={setDarkMode} 
                  />
                </div>
                
                <div>
                  <Text className="mb-2">Color Scheme</Text>
                  <Select 
                    value={colorScheme} 
                    onValueChange={setColorScheme}
                  >
                    <SelectItem value="blue">Blue (Default)</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="amber">Amber</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                  </Select>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <Text className="font-medium">Compact View</Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400">Display more items per page</Text>
                  </div>
                  <Switch 
                    checked={true} 
                    onChange={() => {}} 
                  />
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <Text className="font-medium">Auto-refresh Dashboard</Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400">Automatically refresh dashboard data</Text>
                  </div>
                  <Switch 
                    checked={false} 
                    onChange={() => {}} 
                  />
                </div>
                
                <div>
                  <Text className="mb-2">Default Dashboard View</Text>
                  <Select defaultValue="overview">
                    <SelectItem value="overview">Overview</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="clients">Clients</SelectItem>
                    <SelectItem value="commissions">Commissions</SelectItem>
                  </Select>
                </div>
                
                <Divider>Data Export Preferences</Divider>
                
                <div>
                  <Text className="mb-2">Default Export Format</Text>
                  <Select defaultValue="csv">
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                  </Select>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" color="blue">Save Preferences</Button>
                </div>
              </form>
            </Card>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  )
} 