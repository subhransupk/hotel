'use client'

import { Flex } from '@tremor/react'
import { CheckCircleIcon, XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { useUIState } from '../hooks'

export default function Notification() {
  const { uiState, hideNotification } = useUIState();
  
  if (!uiState.notification.visible) {
    return null;
  }
  
  return (
    <div className={`mb-4 p-3 rounded-md ${
      uiState.notification.type === 'success' ? 'bg-green-100 text-green-800' : 
      uiState.notification.type === 'error' ? 'bg-red-100 text-red-800' : 
      'bg-blue-100 text-blue-800'
    }`}>
      <Flex justifyContent="between" alignItems="center">
        <Flex alignItems="center" className="space-x-2">
          {uiState.notification.type === 'success' && <CheckCircleIcon className="h-5 w-5" />}
          {uiState.notification.type === 'error' && <XMarkIcon className="h-5 w-5" />}
          {uiState.notification.type === 'info' && <InformationCircleIcon className="h-5 w-5" />}
          <span>{uiState.notification.message}</span>
        </Flex>
        <button onClick={hideNotification} className="text-gray-500 hover:text-gray-700">
          <XMarkIcon className="h-5 w-5" />
        </button>
      </Flex>
    </div>
  )
} 