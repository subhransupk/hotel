'use client'

import { Fragment, useState } from 'react'
import Image from 'next/image'
import { Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ArrowLeftOnRectangleIcon,
  SunIcon,
  MoonIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import { TextInput } from '@tremor/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useClerk } from '@clerk/nextjs'

interface AdminHeaderProps {
  onMenuClick: () => void
}

// Mock notifications data
const notifications = [
  {
    id: 1,
    title: 'New Hotel Registration',
    message: 'Luxury Hotel & Spa just registered',
    time: '5 minutes ago',
    type: 'success',
    read: false,
  },
  {
    id: 2,
    title: 'System Alert',
    message: 'High CPU usage detected',
    time: '10 minutes ago',
    type: 'warning',
    read: false,
  },
  {
    id: 3,
    title: 'Payment Failed',
    message: 'Subscription payment failed for Beach Resort',
    time: '1 hour ago',
    type: 'error',
    read: false,
  },
  {
    id: 4,
    title: 'New Feature Deployed',
    message: 'Mobile check-in feature is now live',
    time: '2 hours ago',
    type: 'info',
    read: true,
  },
]

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [unreadCount, setUnreadCount] = useState(
    notifications.filter((n) => !n.read).length
  )
  const { signOut } = useClerk();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return (
          <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
        )
      case 'warning':
        return (
          <ExclamationCircleIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        )
      case 'error':
        return (
          <ExclamationCircleIcon
            className="h-5 w-5 text-red-400"
            aria-hidden="true"
          />
        )
      default:
        return (
          <InformationCircleIcon
            className="h-5 w-5 text-blue-400"
            aria-hidden="true"
          />
        )
    }
  }

  const handleSignOut = () => {
    signOut(() => {
      window.location.href = '/sign-in';
    });
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border-b border-gray-200 dark:border-gray-700">
      <div className="flex h-16 items-center gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-200 lg:hidden"
          onClick={onMenuClick}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 lg:hidden" aria-hidden="true" />

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          {/* Search */}
          <div className="flex flex-1 items-center">
            <div className="w-full lg:max-w-lg">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full rounded-xl border-0 bg-white/50 dark:bg-gray-900/50 py-2.5 pl-10 pr-3 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6"
                  placeholder="Search..."
                  type="search"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-x-4 lg:gap-x-6">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            {/* Notifications */}
            <Menu as="div" className="relative">
              <Menu.Button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="sr-only">View notifications</span>
                <div className="relative">
                  <BellIcon className="h-5 w-5" aria-hidden="true" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2.5 w-80 origin-top-right rounded-xl bg-white dark:bg-gray-800 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <Menu.Item key={notification.id}>
                        {({ active }) => (
                          <div
                            className={`
                              px-4 py-3 flex gap-x-4 ${
                                active
                                  ? 'bg-gray-50 dark:bg-gray-700/50'
                                  : ''
                              }
                              ${
                                !notification.read
                                  ? 'bg-blue-50/50 dark:bg-blue-900/20'
                                  : ''
                              }
                            `}
                          >
                            <div className="flex-shrink-0 pt-0.5">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setUnreadCount(0)}
                      className="text-sm text-primary hover:text-primary/80 font-medium"
                    >
                      Mark all as read
                    </button>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Separator */}
            <div
              className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 dark:lg:bg-gray-700"
              aria-hidden="true"
            />

            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-x-3 rounded-lg p-2 text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                <UserCircleIcon
                  className="h-8 w-8 text-gray-400 dark:text-gray-500"
                  aria-hidden="true"
                />
                <span className="hidden lg:flex lg:items-center">
                  <span
                    className="text-sm font-medium"
                    aria-hidden="true"
                  >
                    Admin User
                  </span>
                  <ChevronDownIcon
                    className="ml-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2.5 w-56 origin-top-right rounded-xl bg-white dark:bg-gray-800 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`
                          flex items-center px-4 py-2 text-sm gap-x-3
                          ${active ? 'bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-200'}
                        `}
                      >
                        <Cog6ToothIcon className="h-5 w-5 text-gray-400" />
                        Settings
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`
                          flex items-center px-4 py-2 text-sm gap-x-3
                          ${active ? 'bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-200'}
                        `}
                      >
                        <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400" />
                        Help Center
                      </a>
                    )}
                  </Menu.Item>
                  <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleSignOut}
                        className={`
                          w-full flex items-center px-4 py-2 text-sm gap-x-3 text-red-700 dark:text-red-400
                          ${active ? 'bg-red-50 dark:bg-red-900/20' : ''}
                        `}
                      >
                        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  )
} 