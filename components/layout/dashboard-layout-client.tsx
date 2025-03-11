'use client'

import { ReactNode, useState } from 'react'
import { Navigation } from './navigation'
import Image from 'next/image'
import {
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  UserCircleIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { TextInput, Badge, Text } from '@tremor/react'
import { useClerk } from '@clerk/nextjs'

interface DashboardLayoutClientProps {
  children: ReactNode
}

// Sample notifications
const notifications = [
  {
    id: 1,
    title: 'New Booking',
    message: 'Room 304 has been booked by John Doe',
    time: '5 minutes ago',
    type: 'booking',
    isRead: false,
  },
  {
    id: 2,
    title: 'Check-in Reminder',
    message: 'Guest arriving in 1 hour - Room 205',
    time: '30 minutes ago',
    type: 'reminder',
    isRead: false,
  },
  {
    id: 3,
    title: 'Maintenance Alert',
    message: 'Room 402 AC maintenance required',
    time: '1 hour ago',
    type: 'alert',
    isRead: true,
  },
]

export function DashboardLayoutClient({ children }: DashboardLayoutClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const { signOut } = useClerk();

  const unreadNotifications = notifications.filter(n => !n.isRead).length

  const handleSignOut = () => {
    signOut(() => {
      window.location.href = '/sign-in';
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
            >
              {isSidebarOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8">
                <Image
                  src="/logo.svg"
                  alt="Hotel Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="hidden md:block text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Hotel Management
              </span>
            </div>

            <div className="hidden lg:block ml-8">
              <TextInput
                icon={MagnifyingGlassIcon}
                placeholder="Search in dashboard..."
                className="min-w-[300px]"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full focus:outline-none"
              >
                <BellIcon className="h-6 w-6" />
                {unreadNotifications > 0 && (
                  <Badge
                    size="xs"
                    color="red"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-2"
                  >
                    {unreadNotifications}
                  </Badge>
                )}
              </button>
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <Text className="font-semibold">Notifications</Text>
                      <Text className="text-sm text-blue-500 cursor-pointer hover:text-blue-600">
                        Mark all as read
                      </Text>
                    </div>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer border-b border-gray-200 dark:border-gray-700 ${
                          !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className={`p-2 rounded-lg ${
                            notification.type === 'booking' 
                              ? 'bg-blue-50 dark:bg-blue-900' 
                              : notification.type === 'reminder'
                              ? 'bg-yellow-50 dark:bg-yellow-900'
                              : 'bg-red-50 dark:bg-red-900'
                          }`}>
                            <BellIcon className={`h-5 w-5 ${
                              notification.type === 'booking'
                                ? 'text-blue-500'
                                : notification.type === 'reminder'
                                ? 'text-yellow-500'
                                : 'text-red-500'
                            }`} />
                          </div>
                          <div>
                            <Text className="font-medium">{notification.title}</Text>
                            <Text className="text-sm text-gray-500 dark:text-gray-400">
                              {notification.message}
                            </Text>
                            <Text className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              {notification.time}
                            </Text>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 text-center">
                    <Text className="text-sm text-blue-500 cursor-pointer hover:text-blue-600">
                      View all notifications
                    </Text>
                  </div>
                </div>
              )}
            </div>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full focus:outline-none"
              >
                <UserCircleIcon className="h-8 w-8" />
                <span className="hidden sm:block font-medium">John Doe</span>
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <Text className="font-medium">John Doe</Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400">Hotel Manager</Text>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <Cog6ToothIcon className="h-5 w-5" />
                      Settings
                    </button>
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <QuestionMarkCircleIcon className="h-5 w-5" />
                      Help & Support
                    </button>
                    <div className="my-2 border-t border-gray-200 dark:border-gray-700" />
                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="p-4 md:hidden border-t border-gray-200 dark:border-gray-700">
          <TextInput
            icon={MagnifyingGlassIcon}
            placeholder="Search in dashboard..."
            className="w-full"
          />
        </div>
      </header>

      {/* Main content */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <Navigation isOpen={isSidebarOpen} />

        {/* Content */}
        <main className={`flex-1 p-6 lg:px-8 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-16'
        }`}>
          {children}
        </main>
      </div>

      {/* Backdrop for dropdowns */}
      {(isUserMenuOpen || isNotificationsOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsUserMenuOpen(false)
            setIsNotificationsOpen(false)
          }}
        />
      )}
    </div>
  )
} 