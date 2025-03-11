'use client';

import { useState } from 'react';
import {
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import {
  Card,
  Text,
  TextInput,
  Button,
  Badge,
} from '@tremor/react';

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifications = [
    {
      id: 1,
      title: 'New Booking',
      message: 'Room 205 booked for John Doe',
      time: '5 min ago',
      type: 'booking'
    },
    {
      id: 2,
      title: 'Checkout Reminder',
      message: 'Room 304 checkout at 11:00 AM',
      time: '10 min ago',
      type: 'reminder'
    },
    {
      id: 3,
      title: 'Maintenance Alert',
      message: 'AC maintenance required in Room 402',
      time: '15 min ago',
      type: 'alert'
    }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Button
            icon={Bars3Icon}
            variant="light"
            onClick={toggleSidebar}
            className="lg:hidden"
          />
          <div className="relative hidden md:block">
            <TextInput
              icon={MagnifyingGlassIcon}
              placeholder="Search in dashboard..."
              className="min-w-[300px] pl-11"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <Button
              icon={BellIcon}
              variant="light"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Badge
                size="xs"
                color="red"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-2"
              >
                {notifications.length}
              </Badge>
            </Button>

            {/* Notifications Dropdown */}
            {showNotifications && (
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
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer border-b border-gray-200 dark:border-gray-700 last:border-0"
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
                        <div className="flex-1">
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

          {/* Profile Menu */}
          <div className="relative">
            <Button
              icon={UserCircleIcon}
              variant="light"
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2"
            >
              <span className="hidden sm:inline-block font-medium">John Doe</span>
            </Button>

            {/* Profile Dropdown */}
            {showProfile && (
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
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
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
      <div className="p-4 md:hidden">
        <TextInput
          icon={MagnifyingGlassIcon}
          placeholder="Search in dashboard..."
          className="w-full"
        />
      </div>
    </header>
  );
} 