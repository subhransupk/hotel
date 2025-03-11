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
import { DocumentList } from './components/document-list'
import { DocumentForm } from './components/document-form'
import { Document } from './types'

export default function WhiteLabelingDocumentsPage() {
  const [isCreating, setIsCreating] = useState(false)
  const [editingDocument, setEditingDocument] = useState<Document | undefined>(undefined)
  const [activeTab, setActiveTab] = useState(0)

  const handleCreateNew = () => {
    setEditingDocument(undefined)
    setIsCreating(true)
  }

  const handleEditDocument = (document: Document) => {
    setEditingDocument(document)
    setIsCreating(true)
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingDocument(undefined)
  }

  const handleSave = (document: Document) => {
    // Save logic would go here
    // In a real app, you would make an API call to save the document
    console.log('Saving document:', document)
    setIsCreating(false)
    setEditingDocument(undefined)
  }

  const documentCategories = [
    { name: 'Legal', value: 0 },
    { name: 'Templates', value: 1 },
    { name: 'Marketing', value: 2 },
    { name: 'Operational', value: 3 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Title>Documents</Title>
          <Text className="text-gray-500">
            Manage documents for your white-labeled platform
          </Text>
        </div>
        {!isCreating && (
          <Button 
            icon={PlusIcon}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleCreateNew}
          >
            Upload New Document
          </Button>
        )}
      </div>

      {isCreating ? (
        <Card>
          <DocumentForm 
            initialData={editingDocument} 
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
              {documentCategories.map((category) => (
                <Tab key={category.value}>{category.name}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {documentCategories.map((category) => (
                <TabPanel key={category.value}>
                  <DocumentList 
                    category={category.name.toLowerCase()} 
                    onEdit={handleEditDocument} 
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