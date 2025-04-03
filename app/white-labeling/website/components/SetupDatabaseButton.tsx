'use client'

import { useState } from 'react'
import { Button } from '@tremor/react'
import { ServerIcon as DatabaseIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function SetupDatabaseButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [setupComplete, setSetupComplete] = useState(false)

  const setupDatabase = async () => {
    setIsLoading(true)
    setMessage(null)
    setError(null)

    try {
      // Step 1: Set up the database (mock)
      setMessage('Setting up database tables...')
      const dbResponse = await fetch('/api/setup-database')
      const dbData = await dbResponse.json()

      if (!dbResponse.ok) {
        setError(dbData.error || 'Failed to set up database')
        setIsLoading(false)
        return
      }

      // Step 2: Create image directories (mock)
      setMessage('Creating image directories...')
      const imagesResponse = await fetch('/api/create-images')
      const imagesData = await imagesResponse.json()

      if (!imagesResponse.ok) {
        setError(imagesData.error || 'Failed to create image directories')
        setIsLoading(false)
        return
      }

      // Success
      setMessage('Setup completed successfully! (Mock implementation - no actual database operations performed)')
      setSetupComplete(true)
    } catch (err) {
      setError('An error occurred while setting up the database')
      console.error('Error setting up database:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-lg font-medium mb-2">Database Setup</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        If you're seeing errors about missing tables or permissions, you need to set up the database first.
        This will create the necessary tables and image directories.
        <br />
        <strong>Note: This is a mock implementation. No actual database operations will be performed.</strong>
      </p>
      
      {!setupComplete ? (
        <Button
          icon={DatabaseIcon}
          onClick={setupDatabase}
          loading={isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          {isLoading ? 'Setting Up...' : 'Set Up Database (Mock)'}
        </Button>
      ) : (
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircleIcon className="h-5 w-5" />
          <span>Setup complete (Mock)</span>
        </div>
      )}
      
      {message && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
          {message}
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md">
          {error}
        </div>
      )}
    </div>
  )
} 