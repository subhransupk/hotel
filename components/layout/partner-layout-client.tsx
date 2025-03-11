'use client'

import { ReactNode, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
import PartnerNavigation from './partner-navigation'
import { useClerk } from '@clerk/nextjs'

interface PartnerLayoutClientProps {
  children: ReactNode
}

export default function PartnerLayoutClient({ children }: PartnerLayoutClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const { signOut } = useClerk();

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
                Partner Portal
              </span>
            </div>

            <div className="hidden lg:block ml-8">
              <TextInput
                icon={MagnifyingGlassIcon}
                placeholder="Search clients, commissions..."
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
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full focus:outline-none relative"
              >
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <Text className="font-medium">Notifications</Text>
                      <Badge color="red">3 new</Badge>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <Text className="font-medium">New client signed up</Text>
                      <Text className="text-sm text-gray-500 dark:text-gray-400">Luxury Resort Inc. has registered through your referral link</Text>
                      <Text className="text-xs text-gray-400 dark:text-gray-500 mt-1">10 minutes ago</Text>
                    </div>
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <Text className="font-medium">Commission payment processed</Text>
                      <Text className="text-sm text-gray-500 dark:text-gray-400">$1,250.00 has been transferred to your account</Text>
                      <Text className="text-xs text-gray-400 dark:text-gray-500 mt-1">2 hours ago</Text>
                    </div>
                    <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <Text className="font-medium">New feature available</Text>
                      <Text className="text-sm text-gray-500 dark:text-gray-400">Mobile check-in is now available for your clients</Text>
                      <Text className="text-xs text-gray-400 dark:text-gray-500 mt-1">1 day ago</Text>
                    </div>
                  </div>
                  <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                    <Link href="/partner-dashboard/notifications" className="block text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-2">
                      View all notifications
                    </Link>
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
                <span className="hidden sm:block font-medium">Partner</span>
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <Text className="font-medium">Partner Account</Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400">partner@example.com</Text>
                  </div>
                  <div className="p-2">
                    <Link href="/partner-dashboard/settings" className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <Cog6ToothIcon className="h-5 w-5" />
                      Account Settings
                    </Link>
                    <Link href="/partner-dashboard/help" className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <QuestionMarkCircleIcon className="h-5 w-5" />
                      Help & Support
                    </Link>
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
            placeholder="Search clients, commissions..."
            className="w-full"
          />
        </div>
      </header>

      {/* Main content */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <PartnerNavigation isOpen={isSidebarOpen} />

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