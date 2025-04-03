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
import { PlusIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { EmailTemplateList } from './components/email-template-list'
import { EmailTemplateForm } from './components/email-template-form'
import { EmailTemplate } from './types'

export default function WhiteLabelingEmailsPage() {
  const [isCreating, setIsCreating] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null)
  const [activeTab, setActiveTab] = useState(0)

  const handleCreateNew = () => {
    setEditingTemplate(null)
    setIsCreating(true)
  }

  const handleEditTemplate = (template: EmailTemplate) => {
    setEditingTemplate(template)
    setIsCreating(true)
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingTemplate(null)
  }

  const handleSave = (template: EmailTemplate) => {
    // Save logic would go here
    // In a real app, you would make an API call to save the template
    console.log('Saving template:', template)
    setIsCreating(false)
    setEditingTemplate(null)
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
          <Title>Email Templates</Title>
          <Text className="text-gray-500">
            Customize email templates for your white-labeled platform
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
          <EmailTemplateForm 
            initialData={editingTemplate || undefined} 
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
                  <EmailTemplateList 
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