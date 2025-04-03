'use client'

import { useState } from 'react'
import { 
  Card, 
  Title, 
  Text, 
  Grid, 
  Col, 
  Button, 
  Flex,
  Divider,
  Badge,
} from '@tremor/react'
import { 
  PhotoIcon, 
  ArrowLeftIcon,
  CheckIcon,
  ArrowUpTrayIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'

// Sample image data
const sampleImages = {
  logo: {
    url: 'https://placehold.co/200x80/3b82f6/ffffff?text=Your+Logo',
    name: 'company-logo.png',
    size: '24KB',
    dimensions: '200 x 80px',
    uploaded: 'Sep 15, 2023',
  },
  favicon: {
    url: 'https://placehold.co/64x64/3b82f6/ffffff?text=Icon',
    name: 'favicon.ico',
    size: '8KB',
    dimensions: '64 x 64px',
    uploaded: 'Sep 15, 2023',
  },
  loginBackground: {
    url: 'https://placehold.co/1200x800/111827/3b82f6?text=Login+Background',
    name: 'login-bg.jpg',
    size: '120KB',
    dimensions: '1200 x 800px',
    uploaded: 'Sep 15, 2023',
  },
  emailHeader: {
    url: 'https://placehold.co/600x200/3b82f6/ffffff?text=Email+Header',
    name: 'email-header.png',
    size: '45KB',
    dimensions: '600 x 200px',
    uploaded: 'Sep 15, 2023',
  },
}

export default function LogosPage() {
  const [activeTab, setActiveTab] = useState('logo')
  const [isDragging, setIsDragging] = useState(false)
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }
  
  const handleDragLeave = () => {
    setIsDragging(false)
  }
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    // Handle file drop logic here
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link href="/white-labeling" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <div>
            <Title>Logo & Images</Title>
            <Text>Customize your brand logos and images</Text>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            icon={CheckIcon} 
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Save Changes
          </Button>
        </div>
      </div>

      {/* Image Type Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
        {Object.keys(sampleImages).map((key) => (
          <Button
            key={key}
            variant={activeTab === key ? 'primary' : 'secondary'}
            onClick={() => setActiveTab(key)}
            size="xs"
          >
            {key === 'logo' && 'Main Logo'}
            {key === 'favicon' && 'Favicon'}
            {key === 'loginBackground' && 'Login Background'}
            {key === 'emailHeader' && 'Email Header'}
          </Button>
        ))}
      </div>

      <Grid numItemsMd={2} className="gap-6">
        {/* Upload Section */}
        <Col>
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <PhotoIcon className="h-5 w-5 text-blue-500" />
              <Title className="text-lg">
                {activeTab === 'logo' && 'Main Logo'}
                {activeTab === 'favicon' && 'Favicon'}
                {activeTab === 'loginBackground' && 'Login Background'}
                {activeTab === 'emailHeader' && 'Email Header'}
              </Title>
            </div>
            
            <div className="space-y-4">
              {/* Current Image */}
              <div>
                <Text className="mb-2">Current Image</Text>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="relative">
                    <Image 
                      src={sampleImages[activeTab as keyof typeof sampleImages].url}
                      alt={`Current ${activeTab}`}
                      width={activeTab === 'logo' ? 200 : activeTab === 'favicon' ? 64 : activeTab === 'loginBackground' ? 300 : 200}
                      height={activeTab === 'logo' ? 80 : activeTab === 'favicon' ? 64 : activeTab === 'loginBackground' ? 200 : 100}
                      className="rounded-md"
                    />
                  </div>
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <div>
                    <Text className="font-medium">{sampleImages[activeTab as keyof typeof sampleImages].name}</Text>
                    <Text className="text-xs text-gray-500">
                      {sampleImages[activeTab as keyof typeof sampleImages].dimensions} • 
                      {sampleImages[activeTab as keyof typeof sampleImages].size}
                    </Text>
                  </div>
                  <Button 
                    variant="light" 
                    color="red" 
                    icon={TrashIcon}
                    size="xs"
                  >
                    Remove
                  </Button>
                </div>
              </div>
              
              <Divider />
              
              {/* Upload New Image */}
              <div>
                <Text className="mb-2">Upload New Image</Text>
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragging 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('fileInput')?.click()}
                >
                  <ArrowUpTrayIcon className="h-10 w-10 mx-auto text-gray-400" />
                  <Text className="mt-2">Drag and drop your file here, or click to browse</Text>
                  <Text className="text-xs text-gray-500 mt-1">
                    {activeTab === 'logo' && 'PNG, SVG or JPG (max 1MB) • Recommended size: 200 x 80px'}
                    {activeTab === 'favicon' && 'ICO, PNG or SVG (max 500KB) • Recommended size: 64 x 64px'}
                    {activeTab === 'loginBackground' && 'JPG or PNG (max 2MB) • Recommended size: 1920 x 1080px'}
                    {activeTab === 'emailHeader' && 'PNG or JPG (max 1MB) • Recommended size: 600 x 200px'}
                  </Text>
                  <input 
                    type="file" 
                    id="fileInput" 
                    className="hidden" 
                    accept={activeTab === 'favicon' ? '.ico,.png,.svg' : '.jpg,.jpeg,.png,.svg'}
                  />
                </div>
              </div>
              
              {/* Guidelines */}
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex gap-2">
                  <ExclamationTriangleIcon className="h-5 w-5 text-amber-500 flex-shrink-0" />
                  <div>
                    <Text className="font-medium text-amber-800 dark:text-amber-200">Image Guidelines</Text>
                    <ul className="text-sm text-amber-700 dark:text-amber-300 mt-1 list-disc list-inside space-y-1">
                      {activeTab === 'logo' && (
                        <>
                          <li>Use a transparent background for best results</li>
                          <li>Keep the logo simple and recognizable at smaller sizes</li>
                          <li>Ensure adequate contrast with background colors</li>
                        </>
                      )}
                      {activeTab === 'favicon' && (
                        <>
                          <li>Use a simple design that is recognizable at small sizes</li>
                          <li>Square dimensions work best (1:1 aspect ratio)</li>
                          <li>ICO format supports multiple sizes in one file</li>
                        </>
                      )}
                      {activeTab === 'loginBackground' && (
                        <>
                          <li>Choose an image that isn't too busy or distracting</li>
                          <li>Ensure text will be readable when overlaid on the image</li>
                          <li>Consider how the image will look on different screen sizes</li>
                        </>
                      )}
                      {activeTab === 'emailHeader' && (
                        <>
                          <li>Keep the design simple and on-brand</li>
                          <li>Ensure the image looks good in email clients</li>
                          <li>Consider how it will appear on mobile devices</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Preview Section */}
        <Col>
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <InformationCircleIcon className="h-5 w-5 text-blue-500" />
              <Title className="text-lg">Preview</Title>
            </div>
            
            {activeTab === 'logo' && (
              <div className="space-y-6">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
                    <Image 
                      src={sampleImages.logo.url}
                      alt="Logo in header"
                      width={120}
                      height={48}
                    />
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600"></div>
                      <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600"></div>
                    </div>
                  </div>
                  <div className="h-40 flex items-center justify-center">
                    <Text className="text-gray-400">Dashboard content preview</Text>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-900 rounded-lg">
                  <div className="flex items-center justify-between p-3 border-b border-gray-700">
                    <Image 
                      src={sampleImages.logo.url}
                      alt="Logo in dark header"
                      width={120}
                      height={48}
                    />
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-gray-600"></div>
                      <div className="w-6 h-6 rounded-full bg-gray-600"></div>
                    </div>
                  </div>
                  <div className="h-40 flex items-center justify-center">
                    <Text className="text-gray-400">Dark mode preview</Text>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'favicon' && (
              <div className="space-y-6">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 p-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="flex items-center gap-2">
                        <Image 
                          src={sampleImages.favicon.url}
                          alt="Favicon in browser tab"
                          width={16}
                          height={16}
                        />
                        <Text className="text-xs">Your Hotel Dashboard</Text>
                      </div>
                    </div>
                  </div>
                  <div className="h-40 flex items-center justify-center">
                    <Text className="text-gray-400">Browser tab preview</Text>
                  </div>
                </div>
                
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <Text className="mb-2">Bookmarks Bar</Text>
                  <div className="flex items-center gap-3 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                    <div className="flex items-center gap-1">
                      <Image 
                        src={sampleImages.favicon.url}
                        alt="Favicon in bookmarks"
                        width={16}
                        height={16}
                      />
                      <Text className="text-xs">Dashboard</Text>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded bg-gray-400"></div>
                      <Text className="text-xs">Gmail</Text>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded bg-gray-400"></div>
                      <Text className="text-xs">Drive</Text>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'loginBackground' && (
              <div className="space-y-6">
                <div className="relative rounded-lg overflow-hidden">
                  <Image 
                    src={sampleImages.loginBackground.url}
                    alt="Login background preview"
                    width={600}
                    height={400}
                    className="w-full"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-80 shadow-lg">
                      <div className="flex justify-center mb-4">
                        <Image 
                          src={sampleImages.logo.url}
                          alt="Logo on login screen"
                          width={120}
                          height={48}
                        />
                      </div>
                      <div className="space-y-3">
                        <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded"></div>
                        <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded"></div>
                        <div className="h-10 bg-blue-500 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex gap-2">
                    <InformationCircleIcon className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    <Text className="text-sm text-blue-700 dark:text-blue-300">
                      The login background appears behind your login form. Choose an image that enhances your brand experience while ensuring the login form remains clearly visible.
                    </Text>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'emailHeader' && (
              <div className="space-y-6">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 flex justify-between items-center">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                      </div>
                      <Text className="text-xs">youremail@example.com</Text>
                    </div>
                    <div className="p-4">
                      <div className="mb-3">
                        <Text className="text-xs text-gray-500">From: Your Hotel {`<no-reply@yourhotel.com>`}</Text>
                        <Text className="text-xs text-gray-500">Subject: Your Reservation Confirmation</Text>
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                        <Image 
                          src={sampleImages.emailHeader.url}
                          alt="Email header preview"
                          width={600}
                          height={200}
                          className="w-full rounded-t-lg"
                        />
                        <div className="p-4 border border-gray-200 dark:border-gray-700 border-t-0 rounded-b-lg">
                          <Text className="font-medium">Dear Guest,</Text>
                          <Text className="text-sm mt-2">Thank you for your reservation at Your Hotel. We're looking forward to welcoming you...</Text>
                          <div className="h-20 flex items-end justify-end">
                            <div className="h-10 w-32 bg-blue-500 rounded flex items-center justify-center">
                              <Text className="text-white text-sm">View Details</Text>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex gap-2">
                    <InformationCircleIcon className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    <Text className="text-sm text-blue-700 dark:text-blue-300">
                      This header will appear at the top of all transactional emails sent to your guests. It should be consistent with your brand identity.
                    </Text>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </Col>
      </Grid>
    </div>
  )
} 