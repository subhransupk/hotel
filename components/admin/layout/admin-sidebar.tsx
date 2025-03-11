'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Dialog, Transition } from '@headlessui/react'
import {
  XMarkIcon,
  HomeIcon,
  BuildingLibraryIcon,
  CreditCardIcon,
  ServerStackIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ChartBarIcon,
  CogIcon,
  RocketLaunchIcon,
  PuzzlePieceIcon,
  DocumentTextIcon,
  WrenchIcon,
  UsersIcon,
  SwatchIcon,
  NewspaperIcon,
} from '@heroicons/react/24/outline'

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
}

type NavItemIcon = typeof HomeIcon;

interface SubNavItem {
  name: string;
  href: string;
  icon: NavItemIcon;
}

interface NavItem {
  name: string;
  href: string;
  icon: NavItemIcon;
  subItems?: SubNavItem[];
}

const navigation: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: HomeIcon,
  },
  {
    name: 'Customer Management',
    href: '/admin/customers',
    icon: BuildingLibraryIcon,
  },
  {
    name: 'Partner Management',
    href: '/admin/partners',
    icon: UsersIcon,
  },
  {
    name: 'Subscription & Billing',
    href: '/admin/billing',
    icon: CreditCardIcon,
  },
  {
    name: 'Platform Monitoring',
    href: '/admin/monitoring',
    icon: ServerStackIcon,
  },
  {
    name: 'Security Management',
    href: '/admin/security',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Support & Success',
    href: '/admin/support',
    icon: UserGroupIcon,
  },
  {
    name: 'Analytics & Reports',
    href: '/admin/analytics',
    icon: ChartBarIcon,
  },
  {
    name: 'Platform Settings',
    href: '/admin/settings',
    icon: CogIcon,
  },
  {
    name: 'White Labeling',
    href: '/white-labeling',
    icon: SwatchIcon,
  },
  {
    name: 'Marketing Tools',
    href: '/admin/marketing',
    icon: RocketLaunchIcon,
  },
  {
    name: 'Feature Management',
    href: '/admin/features',
    icon: PuzzlePieceIcon,
  },
  {
    name: 'API & Developer',
    href: '/admin/developer',
    icon: WrenchIcon,
  },
  {
    name: 'Documentation',
    href: '/admin/documentation',
    icon: DocumentTextIcon,
  },
]

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  const renderNavigation = () => (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.subItems && item.subItems.some(subItem => pathname === subItem.href))
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`
                      group flex items-center gap-x-3 rounded-xl p-2 text-sm font-semibold leading-6
                      transition-all duration-150 ease-in-out
                      ${
                        isActive
                          ? 'bg-primary/10 dark:bg-primary/20 text-primary'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary'
                      }
                    `}
                  >
                    <item.icon
                      className={`h-5 w-5 shrink-0 transition-colors duration-150 ease-in-out ${
                        isActive
                          ? 'text-primary'
                          : 'text-gray-400 group-hover:text-primary'
                      }`}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                    {item.name === 'Support & Success' && (
                      <span className="ml-auto rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-500 dark:bg-red-500/20">
                        5
                      </span>
                    )}
                  </Link>
                  
                  {/* Render sub-items if they exist */}
                  {item.subItems && (
                    <ul className="mt-1 ml-8 space-y-1">
                      {item.subItems.map((subItem) => {
                        const isSubItemActive = pathname === subItem.href
                        return (
                          <li key={subItem.name}>
                            <Link
                              href={subItem.href}
                              className={`
                                group flex items-center gap-x-3 rounded-xl p-2 text-sm font-medium leading-6
                                transition-all duration-150 ease-in-out
                                ${
                                  isSubItemActive
                                    ? 'bg-primary/10 dark:bg-primary/20 text-primary'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary'
                                }
                              `}
                            >
                              <subItem.icon
                                className={`h-4 w-4 shrink-0 transition-colors duration-150 ease-in-out ${
                                  isSubItemActive
                                    ? 'text-primary'
                                    : 'text-gray-400 group-hover:text-primary'
                                }`}
                                aria-hidden="true"
                              />
                              <span className="truncate">{subItem.name}</span>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </li>
      </ul>
    </nav>
  )

  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>

                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-900 px-6 pb-2">
                  <div className="flex h-16 shrink-0 items-center">
                    <Image
                      src="/logo.svg"
                      alt="Logo"
                      width={32}
                      height={32}
                      className="h-8 w-auto"
                    />
                  </div>
                  {renderNavigation()}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 px-6">
          <div className="flex h-16 shrink-0 items-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
          </div>
          {renderNavigation()}
          
          {/* System Status */}
          <div className="mt-auto pb-4">
            <div className="rounded-2xl bg-green-50 dark:bg-green-900/20 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                    All Systems Operational
                  </h3>
                  <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                    Uptime: 99.99%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 