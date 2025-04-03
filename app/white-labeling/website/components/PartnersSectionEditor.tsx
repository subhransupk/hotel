'use client'

import {
  Title,
  Text,
  TextInput,
  Textarea,
  Button,
  Flex,
  Card,
  Divider,
  Grid,
  Col
} from '@tremor/react'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { usePartnersSection, useUIState, useFileUpload } from '../hooks'

export default function PartnersSectionEditor() {
  const { 
    partnersSection, 
    updatePartnersSection, 
    addPartner, 
    removePartner, 
    updatePartner 
  } = usePartnersSection()
  
  const { showNotification } = useUIState()
  const { triggerFileUpload } = useFileUpload()

  const handleLogoUpload = (index: number) => {
    triggerFileUpload(
      { maxSize: 2 * 1024 * 1024, allowedTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'] },
      (url) => {
        updatePartner(index, { logo: url })
        showNotification('Partner logo uploaded successfully!', 'success')
      },
      (error) => {
        showNotification(`Error uploading logo: ${error}`, 'error')
      }
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <Title className="mb-2">Partners Section</Title>
        <Text>Edit your partners and their logos to display on your website.</Text>
      </div>

      <Divider />
      
      {/* Main Content */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section Heading
          </label>
          <TextInput
            placeholder="Our Partners"
            value={partnersSection.heading}
            onChange={(e) => updatePartnersSection({ heading: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section Subheading
          </label>
          <Textarea
            placeholder="We work with industry leaders to provide the best experience"
            value={partnersSection.subheading}
            rows={2}
            onChange={(e) => updatePartnersSection({ subheading: e.target.value })}
          />
        </div>
      </div>
      
      <Divider />
      
      {/* Partners */}
      <div className="space-y-4">
        <Flex justifyContent="between" alignItems="center">
          <Title className="text-lg">Partners</Title>
          <Button 
            icon={PlusIcon} 
            variant="secondary"
            onClick={() => addPartner()}
          >
            Add Partner
          </Button>
        </Flex>
        
        <Grid numItemsMd={3} className="gap-4">
          {partnersSection.partners.map((partner, index) => (
            <Col key={index}>
              <Card className="p-4 h-full">
                <div className="space-y-4">
                  {partner.logo ? (
                    <div className="relative w-full h-32 bg-gray-50 rounded-md overflow-hidden flex items-center justify-center p-4">
                      <img 
                        src={partner.logo} 
                        alt={partner.name} 
                        className="max-w-full max-h-full object-contain"
                      />
                      <Button
                        size="xs"
                        variant="secondary"
                        className="absolute bottom-2 right-2"
                        onClick={() => handleLogoUpload(index)}
                      >
                        Change Logo
                      </Button>
                    </div>
                  ) : (
                    <div 
                      className="w-full h-32 bg-gray-50 rounded-md flex items-center justify-center cursor-pointer"
                      onClick={() => handleLogoUpload(index)}
                    >
                      <Text className="text-gray-500">Click to upload logo</Text>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <TextInput
                      placeholder="Partner Name"
                      value={partner.name}
                      onChange={(e) => updatePartner(index, { name: e.target.value })}
                    />
                    
                    <TextInput
                      placeholder="Website URL"
                      value={partner.website}
                      onChange={(e) => updatePartner(index, { website: e.target.value })}
                    />
                  </div>
                  
                  <Flex justifyContent="end">
                    <Button
                      icon={TrashIcon}
                      variant="light"
                      color="red"
                      onClick={() => removePartner(index)}
                    >
                      Remove
                    </Button>
                  </Flex>
                </div>
              </Card>
            </Col>
          ))}
        </Grid>
        
        {partnersSection.partners.length === 0 && (
          <Card className="p-6 text-center">
            <Text className="text-gray-500">No partners added yet. Click "Add Partner" to get started.</Text>
          </Card>
        )}
      </div>
    </div>
  )
} 