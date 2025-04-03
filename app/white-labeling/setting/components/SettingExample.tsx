'use client'

import { useState } from 'react'
import { Card, Title, Text, Flex } from '@tremor/react'
import { SettingItem } from './setting-item'
import { AdvancedSetting, SettingType } from '../types'

export default function SettingExample() {
  const [setting, setSetting] = useState<AdvancedSetting>({
    id: 'example_setting',
    key: 'example_key',
    name: 'Example Setting',
    description: 'This is an example setting to demonstrate the SettingItem component',
    value: 'default value',
    defaultValue: 'default value',
    type: 'string' as SettingType,
    category: 'customization',
    options: [],
    lastUpdated: new Date().toISOString()
  })

  const handleSave = (value: any) => {
    setSetting(prev => ({
      ...prev,
      value,
      lastUpdated: new Date().toISOString()
    }))
  }

  const handleReset = () => {
    setSetting(prev => ({
      ...prev,
      value: prev.defaultValue,
      lastUpdated: new Date().toISOString()
    }))
  }

  const handleEdit = () => {
    console.log('Edit clicked')
  }

  return (
    <Card className="max-w-2xl mx-auto my-8">
      <Title>Setting Item Example</Title>
      <Text className="mb-4">This example demonstrates how to use the SettingItem component</Text>
      
      <div className="bg-gray-50 p-4 rounded-md">
        <SettingItem 
          setting={setting}
          onSave={handleSave}
          onReset={handleReset}
          onEdit={handleEdit}
          onDelete={() => alert('Delete clicked')}
        />
      </div>

      <Flex className="mt-4 p-4 bg-blue-50 rounded-md">
        <div>
          <Text className="font-medium">Current Setting State:</Text>
          <pre className="text-xs mt-2 overflow-auto">
            {JSON.stringify(setting, null, 2)}
          </pre>
        </div>
      </Flex>
    </Card>
  )
} 