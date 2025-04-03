'use client'

import { useState } from 'react'
import { 
  Card, 
  Title,
  Text,
  Button,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@tremor/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { SmsTemplateList } from './components/sms-template-list'
import { SmsTemplateForm } from './components/sms-template-form'
import { SmsTemplate } from './types'

export default function WhiteLabelingSmsPage() {
  const [isCreating, setIsCreating] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<SmsTemplate | undefined>(undefined)
  const [activeTab, setActiveTab] = useState(0)

  const handleCreateNew = () => {
    setEditingTemplate(undefined)
    setIsCreating(true)
  }

  const handleEditTemplate = (template: SmsTemplate) => {
    setEditingTemplate(template)
    setIsCreating(true)
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingTemplate(undefined)
  }

  const handleSave = (template: SmsTemplate) => {
    // Save logic would go here
    // In a real app, you would make an API call to save the template
    console.log('Saving template:', template)
    setIsCreating(false)
    setEditingTemplate(undefined)
  }

  const templateCategories = [
    { name: 'Transactional', value: 0 },
    { name: 'Marketing', value: 1 },
    { name: 'Notifications', value: 2 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Title>SMS Templates</Title>
          <Text className="text-gray-500">
            Customize SMS templates for your white-labeled platform
          </Text>
        </div>
        {!isCreating && (
          <Button 
            icon={PlusIcon}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleCreateNew}
          >
            Create New Template
          </Button>
        )}
      </div>

      {isCreating ? (
        <Card>
          <SmsTemplateForm 
            initialData={editingTemplate} 
            onCancel={handleCancel} 
            onSave={handleSave} 
          />
        </Card>
      ) : (
        <Card>
          <TabGroup 
            index={activeTab} 
            onIndexChange={setActiveTab}
          >
            <TabList className="mb-6">
              {templateCategories.map((category) => (
                <Tab key={category.value}>{category.name}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {templateCategories.map((category) => (
                <TabPanel key={category.value}>
                  <SmsTemplateList 
                    category={category.name.toLowerCase()} 
                    onEdit={handleEditTemplate} 
                  />
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </Card>
      )}
    </div>
  )
} 