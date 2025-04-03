'use client'

import { useState, useEffect } from 'react'
import { Card, Title, Text, Button, Flex, Grid } from '@tremor/react'
import { ArrowPathIcon, PlusIcon } from '@heroicons/react/24/outline'
import { SettingsList } from './components/settings-list'
import { SAMPLE_SETTINGS } from './data'
import { AdvancedSetting } from './types'

export default function SettingsPage() {
  const [settings, setSettings] = useState<AdvancedSetting[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Simulate loading settings from an API
  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true)
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSettings(SAMPLE_SETTINGS)
      setIsLoading(false)
    }

    loadSettings()
  }, [])

  const handleEditSetting = (setting: AdvancedSetting) => {
    // This would typically open a modal to edit the setting
    alert(`Edit setting: ${setting.name}`)
  }

  const handleDeleteSetting = (settingId: string) => {
    setSettings(prevSettings => prevSettings.filter(setting => setting.id !== settingId))
    setLastSaved(new Date())
  }

  const handleRefreshSettings = async () => {
    setIsLoading(true)
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    setSettings(SAMPLE_SETTINGS)
    setIsLoading(false)
  }

  const handleAddSetting = () => {
    // This would typically open a modal to add a new setting
    alert('Add setting functionality would be implemented here')
  }

  return (
    <div className="p-6">
      <Flex justifyContent="between" alignItems="center" className="mb-6">
        <div>
          <Title>Application Settings</Title>
          <Text>Manage and configure your application settings</Text>
        </div>
        <Flex className="space-x-2">
          {lastSaved && (
            <Text className="text-gray-500">
              Last saved: {lastSaved.toLocaleTimeString()}
            </Text>
          )}
          <Button 
            icon={ArrowPathIcon} 
            variant="secondary" 
            onClick={handleRefreshSettings}
            loading={isLoading}
          >
            Refresh
          </Button>
          <Button 
            icon={PlusIcon} 
            onClick={handleAddSetting}
          >
            Add Setting
          </Button>
        </Flex>
      </Flex>

      <Card>
        <SettingsList 
          settings={settings}
          onEdit={handleEditSetting}
          onDelete={handleDeleteSetting}
        />
      </Card>
    </div>
  )
} 