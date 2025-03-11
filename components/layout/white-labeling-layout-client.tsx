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
import WhiteLabelingNavigation from './white-labeling-navigation'
import { useClerk } from '@clerk/nextjs'

interface WhiteLabelingLayoutClientProps {
  children: ReactNode
}

export default function WhiteLabelingLayoutClient({ children }: WhiteLabelingLayoutClientProps) {
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
                White Labeling
              </span>
            </div>

            <div className="hidden lg:block ml-8">
              <TextInput
                icon={MagnifyingGlassIcon}
                placeholder="Search settings..."
                className="min-w-[300px]"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full focus:outline-none"
              >
                <UserCircleIcon className="h-8 w-8" />
                <span className="hidden sm:block font-medium">Admin</span>
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <Text className="font-medium">Admin</Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400">admin@hotelsaas.com</Text>
                  </div>
                  <div className="p-2">
                    <Link href="/dashboard/settings" className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <Cog6ToothIcon className="h-5 w-5" />
                      Settings
                    </Link>
                    <Link href="/help" className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
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
            placeholder="Search settings..."
            className="w-full"
          />
        </div>
      </header>

      {/* Main content */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <WhiteLabelingNavigation isOpen={isSidebarOpen} />

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