'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  NewspaperIcon,
} from '@heroicons/react/24/outline'

// Simple custom tooltip component
const Tooltip = ({ children, text }: { children: React.ReactNode; text: string }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!text) return <>{children}</>;

  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded z-50 whitespace-nowrap">
          {text}
        </div>
      )}
    </div>
  );
};

interface NavigationItem {
  name: string
  href: string
  icon: any
  current?: boolean
}

interface NavigationGroup {
  name: string
  items: NavigationItem[]
}

interface NavigationProps {
  isOpen: boolean
}

export default function WhiteLabelingNavigation({ isOpen }: NavigationProps) {
  const pathname = usePathname()

  const navigation: NavigationGroup[] = [
    {
      name: 'Branding',
      items: [
        {
          name: 'Overview',
          href: '/white-labeling',
          icon: SwatchIcon,
          current: pathname === '/white-labeling',
        },
        {
          name: 'Colors & Themes',
          href: '/white-labeling/colors',
          icon: PaintBrushIcon,
          current: pathname === '/white-labeling/colors',
        },
        {
          name: 'Logo & Images',
          href: '/white-labeling/logos',
          icon: PhotoIcon,
          current: pathname === '/white-labeling/logos',
        },
        {
          name: 'Typography',
          href: '/white-labeling/typography',
          icon: DocumentTextIcon,
          current: pathname === '/white-labeling/typography',
        },
      ],
    },
    {
      name: 'Content',
      items: [
        {
          name: 'Website Content',
          href: '/white-labeling/website',
          icon: GlobeAltIcon,
          current: pathname === '/white-labeling/website',
        },
        {
          name: 'Blog Management',
          href: '/white-labeling/blog',
          icon: NewspaperIcon,
          current: pathname === '/white-labeling/blog',
        },
        {
          name: 'Email Templates',
          href: '/white-labeling/emails',
          icon: EnvelopeIcon,
          current: pathname === '/white-labeling/emails',
        },
        {
          name: 'SMS Templates',
          href: '/white-labeling/sms',
          icon: DevicePhoneMobileIcon,
          current: pathname === '/white-labeling/sms',
        },
        {
          name: 'Documents',
          href: '/white-labeling/documents',
          icon: DocumentDuplicateIcon,
          current: pathname === '/white-labeling/documents',
        },
      ],
    },
    {
      name: 'Configuration',
      items: [
        {
          name: 'Domain Settings',
          href: '/white-labeling/domain',
          icon: BuildingStorefrontIcon,
          current: pathname === '/white-labeling/domain',
        },
        {
          name: 'Languages',
          href: '/white-labeling/languages',
          icon: LanguageIcon,
          current: pathname === '/white-labeling/languages',
        },
        {
          name: 'Advanced Settings',
          href: '/white-labeling/settings',
          icon: Cog6ToothIcon,
          current: pathname === '/white-labeling/settings',
        },
      ],
    },
  ]

  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 transform bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 pt-16 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto py-5 px-3">
          {navigation.map((group) => (
            <div key={group.name} className="mb-6">
              {isOpen && (
                <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {group.name}
                </h3>
              )}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Tooltip key={item.name} text={!isOpen ? item.name : ''}>
                    <Link
                      href={item.href}
                      className={`flex items-center ${
                        isOpen ? 'px-3' : 'justify-center px-3'
                      } py-2 text-sm font-medium rounded-lg ${
                        item.current
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <item.icon
                        className={`h-5 w-5 ${
                          item.current
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                        aria-hidden="true"
                      />
                      {isOpen && <span className="ml-3">{item.name}</span>}
                    </Link>
                  </Tooltip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 