'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  HomeIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
  ClipboardDocumentCheckIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline'

interface NavigationProps {
  isOpen: boolean
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Calendar',
    href: '/dashboard/calendar',
    icon: CalendarIcon,
  },
  {
    name: 'Bookings',
    href: '/dashboard/bookings',
    icon: ClipboardDocumentListIcon,
  },
  {
    name: 'Rooms',
    href: '/dashboard/rooms',
    icon: BuildingOfficeIcon,
  },
  {
    name: 'Leads',
    href: '/dashboard/leads',
    icon: UserGroupIcon,
  },
  {
    name: 'Guests',
    href: '/dashboard/guests',
    icon: UsersIcon,
  },
  {
    name: 'Staff',
    href: '/dashboard/staff',
    icon: UsersIcon,
  },
  {
    name: 'Payroll',
    href: '/dashboard/payroll',
    icon: BanknotesIcon,
  },
  {
    name: 'Services',
    href: '/dashboard/services',
    icon: WrenchScrewdriverIcon,
  },
  {
    name: 'Inventory',
    href: '/dashboard/inventory',
    icon: ClipboardDocumentCheckIcon,
  },
  {
    name: 'Finance',
    href: '/dashboard/finance',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Messages',
    href: '/dashboard/messages',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Reports',
    href: '/dashboard/reports',
    icon: ChartBarIcon,
  },
  {
    name: 'Documents',
    href: '/dashboard/documents',
    icon: DocumentTextIcon,
  },
  {
    name: 'Security',
    href: '/dashboard/security',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Cog6ToothIcon,
  },
]

export function Navigation({ isOpen }: NavigationProps) {
  const pathname = usePathname()

  return (
    <nav
      className={`fixed left-0 top-16 bottom-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Scrollable container with modern scrollbar */}
        <div 
          className={`
            flex-1 overflow-y-auto overflow-x-hidden py-4
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-gray-200
            dark:[&::-webkit-scrollbar-thumb]:bg-gray-700
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-gray-300
            dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-600
            [&::-webkit-scrollbar-thumb]:transition-colors
            [&::-webkit-scrollbar-thumb]:duration-200
          `}
        >
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2 my-1 mx-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {isOpen && <span className="ml-3 truncate">{item.name}</span>}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
} 