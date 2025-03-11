'use client'

import { Fragment, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  UsersIcon,
  CurrencyDollarIcon,
  DocumentChartBarIcon,
  LinkIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
  PaintBrushIcon,
} from '@heroicons/react/24/outline'

// Custom Tooltip component
interface TooltipProps {
  text: string
  children: React.ReactNode
}

function Tooltip({ text, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md whitespace-nowrap">
          {text}
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-0 h-0 border-t-4 border-r-4 border-b-4 border-transparent border-r-gray-900"></div>
        </div>
      )}
    </div>
  )
}

interface NavigationItem {
  name: string
  href: string
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>
  current: boolean
}

interface NavigationGroup {
  name: string
  items: NavigationItem[]
}

interface NavigationProps {
  isOpen: boolean
}

export default function PartnerNavigation({ isOpen }: NavigationProps) {
  const pathname = usePathname()

  const navigation: NavigationGroup[] = [
    {
      name: "Dashboard",
      items: [
        {
          name: "Overview",
          href: "/partner-dashboard/dashboard",
          icon: HomeIcon,
          current: pathname === "/partner-dashboard/dashboard",
        },
        {
          name: "Clients",
          href: "/partner-dashboard/clients",
          icon: UsersIcon,
          current: pathname === "/partner-dashboard/clients",
        },
        {
          name: "Commissions",
          href: "/partner-dashboard/commissions",
          icon: CurrencyDollarIcon,
          current: pathname === "/partner-dashboard/commissions",
        },
        {
          name: "Reports",
          href: "/partner-dashboard/reports",
          icon: DocumentChartBarIcon,
          current: pathname === "/partner-dashboard/reports",
        },
      ],
    },
    {
      name: "Marketing",
      items: [
        {
          name: "Branding",
          href: "/partner-dashboard/branding",
          icon: PaintBrushIcon,
          current: pathname === "/partner-dashboard/branding",
        },
        {
          name: "Referral Links",
          href: "/partner-dashboard/referral-links",
          icon: LinkIcon,
          current: pathname === "/partner-dashboard/referral-links",
        },
        {
          name: "Marketing Materials",
          href: "/partner-dashboard/marketing-materials",
          icon: BuildingStorefrontIcon,
          current: pathname === "/partner-dashboard/marketing-materials",
        },
        {
          name: "Leads",
          href: "/partner-dashboard/leads",
          icon: UserGroupIcon,
          current: pathname === "/partner-dashboard/leads",
        },
      ],
    },
    {
      name: "Account",
      items: [
        {
          name: "Settings",
          href: "/partner-dashboard/settings",
          icon: Cog6ToothIcon,
          current: pathname === "/partner-dashboard/settings",
        },
        {
          name: "Help & Support",
          href: "/partner-dashboard/help-support",
          icon: QuestionMarkCircleIcon,
          current: pathname === "/partner-dashboard/help-support",
        },
      ],
    },
  ]

  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 pt-16 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="h-full flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-6">
          {navigation.map((group) => (
            <div key={group.name} className="space-y-1">
              {isOpen && (
                <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {group.name}
                </h3>
              )}
              {group.items.map((item) => (
                <Fragment key={item.name}>
                  {isOpen ? (
                    <Link
                      href={item.href}
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        item.current
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 flex-shrink-0 ${
                          item.current
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ) : (
                    <Tooltip text={item.name}>
                      <Link
                        href={item.href}
                        className={`group flex items-center justify-center p-2 text-sm font-medium rounded-md ${
                          item.current
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                        }`}
                      >
                        <item.icon
                          className={`h-5 w-5 flex-shrink-0 ${
                            item.current
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                          }`}
                          aria-hidden="true"
                        />
                      </Link>
                    </Tooltip>
                  )}
                </Fragment>
              ))}
            </div>
          ))}
        </nav>
        
        {isOpen && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-semibold">P</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Partner Program</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Tier: Gold</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 