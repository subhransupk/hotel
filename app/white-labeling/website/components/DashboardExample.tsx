'use client'

import { useState } from 'react'
import { Card, Title, Text, Button, Flex, Grid } from '@tremor/react'
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon, 
  InformationCircleIcon 
} from '@heroicons/react/24/outline'
import { useUIState } from '../hooks'
import Notification from './Notification'

export default function DashboardExample() {
  const { showNotification } = useUIState()
  const [counter, setCounter] = useState(0)

  const handleSuccessClick = () => {
    showNotification(
      `Success notification ${counter}: Operation completed successfully!`,
      'success',
      5000
    )
    setCounter(prev => prev + 1)
  }

  const handleErrorClick = () => {
    showNotification(
      `Error notification ${counter}: Something went wrong.`,
      'error',
      5000
    )
    setCounter(prev => prev + 1)
  }

  const handleInfoClick = () => {
    showNotification(
      `Info notification ${counter}: Here's some information you might find useful.`,
      'info',
      5000
    )
    setCounter(prev => prev + 1)
  }

  const handlePersistentClick = () => {
    showNotification(
      `Persistent notification ${counter}: This will stay until dismissed.`,
      'info',
      0 // 0 means it won't auto-dismiss
    )
    setCounter(prev => prev + 1)
  }

  return (
    <div className="p-6">
      <Notification />
      
      <Title>Notification System Example</Title>
      <Text className="mb-6">Click the buttons below to trigger different types of notifications</Text>
      
      <Grid numItemsMd={2} className="gap-6 mb-6">
        <Card>
          <Title>Notification Controls</Title>
          <Text className="mb-4">Test different notification types</Text>
          
          <Flex className="gap-2 flex-wrap">
            <Button 
              icon={CheckCircleIcon}
              onClick={handleSuccessClick}
              color="green"
            >
              Success
            </Button>
            
            <Button 
              icon={ExclamationCircleIcon}
              onClick={handleErrorClick}
              color="red"
            >
              Error
            </Button>
            
            <Button 
              icon={InformationCircleIcon}
              onClick={handleInfoClick}
              color="blue"
            >
              Info
            </Button>
            
            <Button 
              variant="secondary"
              onClick={handlePersistentClick}
            >
              Persistent
            </Button>
          </Flex>
        </Card>
        
        <Card>
          <Title>How It Works</Title>
          <Text>
            This example demonstrates the notification system using the <code>useUIState</code> hook.
            The notifications are managed through a central state and can be triggered from anywhere
            in the application.
          </Text>
          <div className="mt-4 p-3 bg-amber-50 rounded-md text-amber-800 text-sm">
            <p>
              <strong>Note:</strong> Notifications can be configured with different types, messages,
              and durations. Setting duration to 0 creates a persistent notification that must be
              manually dismissed.
            </p>
          </div>
        </Card>
      </Grid>
    </div>
  )
} 