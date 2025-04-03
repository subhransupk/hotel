'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import {
  Card,
  Title,
  Text,
  Button,
  Grid,
  Col,
  Flex,
  Divider,
  Badge,
  Select,
  SelectItem,
  TextInput,
} from '@tremor/react'
import {
  ArrowUpTrayIcon,
  TrashIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  PaintBrushIcon,
  DocumentTextIcon,
  PhotoIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'

export default function BrandingPage() {
  // State for logo management
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>('/logo.svg')
  const [logoUploading, setLogoUploading] = useState(false)
  const [logoError, setLogoError] = useState<string | null>(null)
  
  // State for favicon management
  const [faviconFile, setFaviconFile] = useState<File | null>(null)
  const [faviconPreview, setFaviconPreview] = useState<string | null>('/favicon.ico')
  const [faviconUploading, setFaviconUploading] = useState(false)
  
  // State for branding colors
  const [primaryColor, setPrimaryColor] = useState('#3b82f6')
  const [secondaryColor, setSecondaryColor] = useState('#1e40af')
  const [accentColor, setAccentColor] = useState('#f97316')
  
  // State for company information
  const [companyName, setCompanyName] = useState('Your Company')
  const [companyTagline, setCompanyTagline] = useState('Hotel Management Solutions')
  
  // Refs for file inputs
  const logoInputRef = useRef<HTMLInputElement>(null)
  const faviconInputRef = useRef<HTMLInputElement>(null)
  
  // Handle logo file selection
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml']
    if (!validTypes.includes(file.type)) {
      setLogoError('Please upload a valid image file (JPG, PNG, or SVG)')
      return
    }
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setLogoError('Logo file size must be less than 2MB')
      return
    }
    
    setLogoFile(file)
    setLogoError(null)
    
    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setLogoPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }
  
  // Handle favicon file selection
  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setFaviconFile(file)
    
    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setFaviconPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }
  
  // Simulate logo upload
  const uploadLogo = () => {
    if (!logoFile) return
    
    setLogoUploading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLogoUploading(false)
      // In a real app, you would handle the response from your API here
    }, 2000)
  }
  
  // Simulate favicon upload
  const uploadFavicon = () => {
    if (!faviconFile) return
    
    setFaviconUploading(true)
    
    // Simulate API call
    setTimeout(() => {
      setFaviconUploading(false)
      // In a real app, you would handle the response from your API here
    }, 2000)
  }
  
  // Handle drag over event
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.classList.add('border-blue-500', 'bg-blue-50', 'dark:bg-blue-900/20')
  }
  
  // Handle drag leave event
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50', 'dark:bg-blue-900/20')
  }
  
  // Handle drop event for logo
  const handleLogoDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50', 'dark:bg-blue-900/20')
    
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml']
    if (!validTypes.includes(file.type)) {
      setLogoError('Please upload a valid image file (JPG, PNG, or SVG)')
      return
    }
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setLogoError('Logo file size must be less than 2MB')
      return
    }
    
    setLogoFile(file)
    setLogoError(null)
    
    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setLogoPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }
  
  // Save all branding settings
  const saveAllSettings = () => {
    // In a real app, you would send all settings to your API
    alert('All branding settings saved successfully!')
  }
  
  return (
    <div className="space-y-8">
      <div>
        <Title>Branding Settings</Title>
        <Text>Customize how your hotel management system looks to your clients</Text>
      </div>
      
      <Grid numItemsMd={2} className="gap-6">
        {/* Logo Upload Section */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <Title className="text-lg">Company Logo</Title>
              <Text>This logo will appear in the dashboard and client portal</Text>
            </div>
            {logoPreview && (
              <Button 
                variant="light" 
                color="red" 
                icon={TrashIcon}
                onClick={() => {
                  setLogoPreview(null)
                  setLogoFile(null)
                  if (logoInputRef.current) logoInputRef.current.value = ''
                }}
              >
                Remove
              </Button>
            )}
          </div>
          
          <div 
            className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 transition-colors duration-200 ease-in-out"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleLogoDrop}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              {logoPreview ? (
                <div className="relative h-32 w-full flex items-center justify-center">
                  <Image
                    src={logoPreview}
                    alt="Logo Preview"
                    width={128}
                    height={128}
                    className="max-h-32 w-auto object-contain"
                  />
                </div>
              ) : (
                <div className="h-32 w-full flex items-center justify-center">
                  <PhotoIcon className="h-16 w-16 text-gray-400" />
                </div>
              )}
              
              <div className="text-center">
                <Button
                  onClick={() => logoInputRef.current?.click()}
                  icon={ArrowUpTrayIcon}
                  color="blue"
                  className="mb-2"
                >
                  {logoPreview ? 'Change Logo' : 'Upload Logo'}
                </Button>
                <input
                  type="file"
                  ref={logoInputRef}
                  onChange={handleLogoChange}
                  accept="image/png, image/jpeg, image/svg+xml"
                  className="hidden"
                />
                <Text className="text-sm text-gray-500 dark:text-gray-400">
                  Drag and drop or click to upload. SVG, PNG or JPG (max. 2MB)
                </Text>
              </div>
            </div>
          </div>
          
          {logoError && (
            <div className="mt-2 text-red-500 text-sm flex items-center">
              <ExclamationCircleIcon className="h-4 w-4 mr-1" />
              {logoError}
            </div>
          )}
          
          <div className="mt-4">
            <Button
              color="blue"
              disabled={!logoFile || logoUploading}
              loading={logoUploading}
              onClick={uploadLogo}
              className="w-full"
            >
              {logoUploading ? 'Uploading...' : 'Save Logo'}
            </Button>
          </div>
        </Card>
        
        {/* Favicon Upload Section */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <Title className="text-lg">Favicon</Title>
              <Text>This icon will appear in browser tabs</Text>
            </div>
            {faviconPreview && (
              <Button 
                variant="light" 
                color="red" 
                icon={TrashIcon}
                onClick={() => {
                  setFaviconPreview(null)
                  setFaviconFile(null)
                  if (faviconInputRef.current) faviconInputRef.current.value = ''
                }}
              >
                Remove
              </Button>
            )}
          </div>
          
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              {faviconPreview ? (
                <div className="relative h-16 w-full flex items-center justify-center">
                  <Image
                    src={faviconPreview}
                    alt="Favicon Preview"
                    width={64}
                    height={64}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
              ) : (
                <div className="h-16 w-full flex items-center justify-center">
                  <PhotoIcon className="h-10 w-10 text-gray-400" />
                </div>
              )}
              
              <div className="text-center">
                <Button
                  onClick={() => faviconInputRef.current?.click()}
                  icon={ArrowUpTrayIcon}
                  color="blue"
                  className="mb-2"
                >
                  {faviconPreview ? 'Change Favicon' : 'Upload Favicon'}
                </Button>
                <input
                  type="file"
                  ref={faviconInputRef}
                  onChange={handleFaviconChange}
                  accept="image/png, image/x-icon"
                  className="hidden"
                />
                <Text className="text-sm text-gray-500 dark:text-gray-400">
                  PNG or ICO format recommended (32x32px)
                </Text>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Button
              color="blue"
              disabled={!faviconFile || faviconUploading}
              loading={faviconUploading}
              onClick={uploadFavicon}
              className="w-full"
            >
              {faviconUploading ? 'Uploading...' : 'Save Favicon'}
            </Button>
          </div>
        </Card>
      </Grid>
      
      {/* Company Information Section */}
      <Card>
        <Title className="text-lg mb-4">Company Information</Title>
        
        <div className="space-y-4">
          <div>
            <Text className="mb-1">Company Name</Text>
            <TextInput
              placeholder="Enter your company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          
          <div>
            <Text className="mb-1">Tagline</Text>
            <TextInput
              placeholder="Enter a short tagline"
              value={companyTagline}
              onChange={(e) => setCompanyTagline(e.target.value)}
            />
            <Text className="mt-1 text-xs text-gray-500">
              This will appear on the login page and other client-facing areas
            </Text>
          </div>
        </div>
      </Card>
      
      {/* Color Scheme Section */}
      <Card>
        <Title className="text-lg mb-4">Color Scheme</Title>
        <Text className="mb-4">Customize the colors to match your brand</Text>
        
        <Grid numItemsMd={3} className="gap-4">
          <div>
            <Text className="mb-1">Primary Color</Text>
            <div className="flex items-center space-x-2">
              <div 
                className="h-10 w-10 rounded-md border border-gray-300 dark:border-gray-700"
                style={{ backgroundColor: primaryColor }}
              />
              <TextInput
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                placeholder="#3b82f6"
              />
            </div>
          </div>
          
          <div>
            <Text className="mb-1">Secondary Color</Text>
            <div className="flex items-center space-x-2">
              <div 
                className="h-10 w-10 rounded-md border border-gray-300 dark:border-gray-700"
                style={{ backgroundColor: secondaryColor }}
              />
              <TextInput
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                placeholder="#1e40af"
              />
            </div>
          </div>
          
          <div>
            <Text className="mb-1">Accent Color</Text>
            <div className="flex items-center space-x-2">
              <div 
                className="h-10 w-10 rounded-md border border-gray-300 dark:border-gray-700"
                style={{ backgroundColor: accentColor }}
              />
              <TextInput
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                placeholder="#f97316"
              />
            </div>
          </div>
        </Grid>
        
        <div className="mt-6">
          <Title className="text-base mb-2">Preview</Title>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-4 mb-4">
              {logoPreview && (
                <Image
                  src={logoPreview}
                  alt="Logo Preview"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
              )}
              <span className="font-semibold text-lg" style={{ color: primaryColor }}>
                {companyName}
              </span>
            </div>
            
            <div className="flex space-x-2 mb-4">
              <Button style={{ backgroundColor: primaryColor, borderColor: primaryColor }}>
                Primary Button
              </Button>
              <Button variant="secondary" style={{ color: secondaryColor, borderColor: secondaryColor }}>
                Secondary Button
              </Button>
              <Button variant="light" style={{ color: accentColor }}>
                Text Button
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Badge color="blue" style={{ backgroundColor: primaryColor }}>Primary Badge</Badge>
              <Badge color="gray">Default Badge</Badge>
              <Badge color="orange" style={{ backgroundColor: accentColor }}>Accent Badge</Badge>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Save All Settings Button */}
      <div className="flex justify-end">
        <Button 
          size="lg" 
          color="blue" 
          icon={CheckCircleIcon}
          onClick={saveAllSettings}
        >
          Save All Branding Settings
        </Button>
      </div>
      
      {/* Additional Resources */}
      <Card>
        <Title className="text-lg mb-4">Additional Branding Resources</Title>
        <Text className="mb-4">Explore more ways to customize your hotel management system</Text>
        
        <Grid numItemsMd={3} className="gap-4">
          <Card decoration="top" decorationColor="blue">
            <Flex justifyContent="start" className="space-x-4">
              <PaintBrushIcon className="h-8 w-8 text-blue-500" />
              <div>
                <Title className="text-base">Advanced Theming</Title>
                <Text>Customize CSS and theme settings</Text>
              </div>
            </Flex>
          </Card>
          
          <Card decoration="top" decorationColor="indigo">
            <Flex justifyContent="start" className="space-x-4">
              <DocumentTextIcon className="h-8 w-8 text-indigo-500" />
              <div>
                <Title className="text-base">Email Templates</Title>
                <Text>Customize client communications</Text>
              </div>
            </Flex>
          </Card>
          
          <Card decoration="top" decorationColor="purple">
            <Flex justifyContent="start" className="space-x-4">
              <EyeIcon className="h-8 w-8 text-purple-500" />
              <div>
                <Title className="text-base">Preview Mode</Title>
                <Text>See how clients will view your system</Text>
              </div>
            </Flex>
          </Card>
        </Grid>
      </Card>
    </div>
  )
} 