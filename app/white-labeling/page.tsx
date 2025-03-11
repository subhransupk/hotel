'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Card,
  Title,
  Text,
  Grid,
  Col,
  Button,
  Flex,
  Metric,
  ProgressBar,
} from '@tremor/react'
import {
  SwatchIcon,
  DocumentTextIcon,
  PhotoIcon,
  GlobeAltIcon,
  Cog6ToothIcon,
  PaintBrushIcon,
  LanguageIcon,
  BuildingStorefrontIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  DocumentDuplicateIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  NewspaperIcon,
} from '@heroicons/react/24/outline'

// Sample data for white labeling progress
const brandingProgress = [
  { name: 'Colors & Themes', href: '/white-labeling/colors', icon: PaintBrushIcon, progress: 75, status: 'In Progress' },
  { name: 'Logo & Images', href: '/white-labeling/logos', icon: PhotoIcon, progress: 100, status: 'Complete' },
  { name: 'Typography', href: '/white-labeling/typography', icon: DocumentTextIcon, progress: 50, status: 'In Progress' },
]

const contentProgress = [
  { name: 'Website Content', href: '/white-labeling/website', icon: GlobeAltIcon, progress: 60, status: 'In Progress' },
  { name: 'Blog Management', href: '/white-labeling/blog', icon: NewspaperIcon, progress: 0, status: 'Not Started' },
  { name: 'Email Templates', href: '/white-labeling/emails', icon: EnvelopeIcon, progress: 30, status: 'In Progress' },
  { name: 'SMS Templates', href: '/white-labeling/sms', icon: DevicePhoneMobileIcon, progress: 0, status: 'Not Started' },
  { name: 'Documents', href: '/white-labeling/documents', icon: DocumentDuplicateIcon, progress: 0, status: 'Not Started' },
]

const configProgress = [
  { name: 'Domain Settings', href: '/white-labeling/domains', icon: BuildingStorefrontIcon, progress: 100, status: 'Complete' },
  { name: 'Languages', href: '/white-labeling/languages', icon: LanguageIcon, progress: 0, status: 'Not Started' },
  { name: 'Advanced Settings', href: '/white-labeling/settings', icon: Cog6ToothIcon, progress: 25, status: 'In Progress' },
]

// Calculate overall progress
const calculateOverallProgress = () => {
  const allItems = [...brandingProgress, ...contentProgress, ...configProgress];
  const totalProgress = allItems.reduce((sum, item) => sum + item.progress, 0);
  return Math.round(totalProgress / allItems.length);
};

export default function WhiteLabelingPage() {
  const overallProgress = calculateOverallProgress();

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Title>White Labeling</Title>
          <Text>Customize your hotel branding and appearance</Text>
        </div>
        <Button 
          icon={Cog6ToothIcon} 
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Apply Changes
        </Button>
      </div>

      {/* Progress Overview */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <Text>Overall Progress</Text>
            <Metric>{overallProgress}%</Metric>
            <ProgressBar value={overallProgress} color="blue" className="mt-3" />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="secondary" 
              icon={DocumentDuplicateIcon}
            >
              Export Settings
            </Button>
            <Button 
              variant="secondary" 
              icon={DocumentDuplicateIcon}
            >
              Import Settings
            </Button>
          </div>
        </div>
      </Card>

      {/* Preview Card */}
      <Card>
        <Title>Live Preview</Title>
        <Text className="mb-4">See how your branding changes will look</Text>
        
        <div className="relative h-[300px] w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <Text className="text-gray-500 dark:text-gray-400">Preview will appear here as you make changes</Text>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button 
            variant="light" 
            icon={ArrowRightIcon} 
            iconPosition="right"
          >
            Open Full Preview
          </Button>
        </div>
      </Card>

      {/* Branding Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <SwatchIcon className="h-5 w-5 text-blue-500" />
          <Title className="text-xl">Branding</Title>
        </div>
        <Grid numItemsMd={2} numItemsLg={3} className="gap-6">
          {brandingProgress.map((item) => (
            <Card key={item.name} className="hover:shadow-md transition-shadow">
              <Flex alignItems="start">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <item.icon className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3 flex-1">
                  <Text className="font-medium">{item.name}</Text>
                  <div className="flex items-center mt-1">
                    <Text className="text-sm text-gray-500 dark:text-gray-400">
                      {item.status}
                    </Text>
                    {item.progress === 100 ? (
                      <CheckCircleIcon className="ml-2 h-4 w-4 text-green-500" />
                    ) : item.progress === 0 ? (
                      <ExclamationCircleIcon className="ml-2 h-4 w-4 text-gray-400" />
                    ) : null}
                  </div>
                  <ProgressBar value={item.progress} color="blue" className="mt-2" />
                </div>
              </Flex>
              <div className="mt-4">
                <Link 
                  href={item.href}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                >
                  Configure
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </Card>
          ))}
        </Grid>
      </div>

      {/* Content Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <DocumentTextIcon className="h-5 w-5 text-blue-500" />
          <Title className="text-xl">Content</Title>
        </div>
        <Grid numItemsMd={2} numItemsLg={3} className="gap-6">
          {contentProgress.map((item) => (
            <Card key={item.name} className="hover:shadow-md transition-shadow">
              <Flex alignItems="start">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <item.icon className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3 flex-1">
                  <Text className="font-medium">{item.name}</Text>
                  <div className="flex items-center mt-1">
                    <Text className="text-sm text-gray-500 dark:text-gray-400">
                      {item.status}
                    </Text>
                    {item.progress === 100 ? (
                      <CheckCircleIcon className="ml-2 h-4 w-4 text-green-500" />
                    ) : item.progress === 0 ? (
                      <ExclamationCircleIcon className="ml-2 h-4 w-4 text-gray-400" />
                    ) : null}
                  </div>
                  <ProgressBar value={item.progress} color="blue" className="mt-2" />
                </div>
              </Flex>
              <div className="mt-4">
                <Link 
                  href={item.href}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                >
                  Configure
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </Card>
          ))}
        </Grid>
      </div>

      {/* Configuration Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Cog6ToothIcon className="h-5 w-5 text-blue-500" />
          <Title className="text-xl">Configuration</Title>
        </div>
        <Grid numItemsMd={2} numItemsLg={3} className="gap-6">
          {configProgress.map((item) => (
            <Card key={item.name} className="hover:shadow-md transition-shadow">
              <Flex alignItems="start">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <item.icon className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3 flex-1">
                  <Text className="font-medium">{item.name}</Text>
                  <div className="flex items-center mt-1">
                    <Text className="text-sm text-gray-500 dark:text-gray-400">
                      {item.status}
                    </Text>
                    {item.progress === 100 ? (
                      <CheckCircleIcon className="ml-2 h-4 w-4 text-green-500" />
                    ) : item.progress === 0 ? (
                      <ExclamationCircleIcon className="ml-2 h-4 w-4 text-gray-400" />
                    ) : null}
                  </div>
                  <ProgressBar value={item.progress} color="blue" className="mt-2" />
                </div>
              </Flex>
              <div className="mt-4">
                <Link 
                  href={item.href}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                >
                  Configure
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </Card>
          ))}
        </Grid>
      </div>
    </div>
  )
} 