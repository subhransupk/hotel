'use client'

import { useState } from 'react'
import { 
  Card, 
  Title, 
  Text, 
  Button,
  Flex,
  Grid,
  Col,
} from '@tremor/react'
import { PlusIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import { Domain, DomainFormData } from './types'
import { DomainList } from './components/domain-list'
import { DomainForm } from './components/domain-form'

export default function WhiteLabelingDomainsPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingDomain, setEditingDomain] = useState<Domain | undefined>(undefined);
  const [primaryDomain, setPrimaryDomain] = useState('app.hotelplatform.com');
  
  const handleCreateNew = () => {
    setEditingDomain(undefined);
    setIsCreating(true);
  };
  
  const handleEdit = (domain: Domain) => {
    setEditingDomain(domain);
    setIsCreating(true);
  };
  
  const handleCancel = () => {
    setIsCreating(false);
    setEditingDomain(undefined);
  };
  
  const handleSave = (data: DomainFormData) => {
    // In a real app, this would save to an API
    console.log('Saving domain:', data);
    
    // Reset the form state
    setIsCreating(false);
    setEditingDomain(undefined);
  };
  
  return (
    <div className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="mb-8">
        <Title>Domain Settings</Title>
        <Text>
          Configure custom domains to create a branded experience for your customers.
        </Text>
      </div>
      
      {isCreating ? (
        <DomainForm 
          initialData={editingDomain}
          onCancel={handleCancel}
          onSave={handleSave}
        />
      ) : (
        <>
          <Grid numItems={1} numItemsMd={3} className="gap-6 mb-6">
            <Col numColSpan={1} numColSpanMd={1}>
              <Card decoration="top" decorationColor="blue">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-50 rounded-full">
                    <GlobeAltIcon className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Text className="text-sm text-gray-500">Primary Domain</Text>
                    <Text className="font-medium truncate">{primaryDomain}</Text>
                  </div>
                </div>
              </Card>
            </Col>
            
            <Col numColSpan={1} numColSpanMd={2}>
              <Card>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <Title className="text-base">Custom Domains</Title>
                    <Text className="text-sm text-gray-500">
                      Connect your own domains to create a seamless branded experience
                    </Text>
                  </div>
                  <Button
                    icon={PlusIcon}
                    onClick={handleCreateNew}
                    className="self-start"
                  >
                    Add Domain
                  </Button>
                </div>
              </Card>
            </Col>
          </Grid>
          
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <DomainList onEdit={handleEdit} />
            </div>
          </Card>
          
          <div className="mt-6">
            <Text className="text-sm text-gray-500">
              Need help setting up your domain? Check out our <a href="#" className="text-blue-500 hover:underline">documentation</a> or <a href="#" className="text-blue-500 hover:underline">contact support</a>.
            </Text>
          </div>
        </>
      )}
    </div>
  )
} 