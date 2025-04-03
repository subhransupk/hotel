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
import { useHowItWorksSection, useUIState, useFileUpload } from '../hooks'

export default function HowItWorksSectionEditor() {
  const { 
    howItWorksSection, 
    updateHowItWorksSection, 
    addStep, 
    removeStep, 
    updateStep,
    uploadStepImage,
    removeStepImage
  } = useHowItWorksSection()
  
  const { showNotification } = useUIState()
  const { triggerFileUpload } = useFileUpload()

  const handleImageUpload = (index: number) => {
    triggerFileUpload(
      { maxSize: 5 * 1024 * 1024, allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] },
      (url) => {
        updateStep(index, { image: url })
        showNotification('Step image uploaded successfully!', 'success')
      },
      (error) => {
        showNotification(`Error uploading image: ${error}`, 'error')
      }
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <Title className="mb-2">How It Works Section</Title>
        <Text>Edit the process steps that explain how your product or service works.</Text>
      </div>

      <Divider />
      
      {/* Main Content */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section Heading
          </label>
          <TextInput
            placeholder="How It Works"
            value={howItWorksSection.heading}
            onChange={(e) => updateHowItWorksSection({ heading: e.target.value })}
          />
        </div>
      </div>
      
      <Divider />
      
      {/* Steps */}
      <div className="space-y-4">
        <Flex justifyContent="between" alignItems="center">
          <Title className="text-lg">Process Steps</Title>
          <Button 
            icon={PlusIcon} 
            variant="secondary"
            onClick={() => addStep()}
          >
            Add Step
          </Button>
        </Flex>
        
        {howItWorksSection.steps.map((step, index) => (
          <Card key={index} className="p-4">
            <Grid numItemsMd={6} className="gap-4">
              <Col numColSpanMd={1} className="flex items-center justify-center">
                <div 
                  className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center"
                >
                  <Text className="text-blue-500 font-bold">{step.number}</Text>
                </div>
              </Col>
              
              <Col numColSpanMd={4}>
                <div className="space-y-3">
                  <TextInput
                    placeholder="Step Title"
                    value={step.title}
                    onChange={(e) => updateStep(index, { title: e.target.value })}
                  />
                  
                  <Textarea
                    placeholder="Step Description"
                    value={step.description}
                    rows={2}
                    onChange={(e) => updateStep(index, { description: e.target.value })}
                  />
                  
                  <div className="flex items-center gap-2">
                    <TextInput
                      placeholder="Icon (emoji)"
                      value={step.icon}
                      onChange={(e) => updateStep(index, { icon: e.target.value })}
                      className="w-24"
                    />
                    <Text className="text-gray-500 text-sm">Use an emoji as icon (e.g. 📝, ⚙️, 🔄)</Text>
                  </div>
                  
                  {step.image ? (
                    <div className="relative mt-2">
                      <img 
                        src={step.image} 
                        alt={step.title} 
                        className="w-full h-40 object-cover rounded-md"
                      />
                      <div className="absolute bottom-2 right-2 flex gap-2">
                        <Button
                          size="xs"
                          variant="secondary"
                          onClick={() => handleImageUpload(index)}
                        >
                          Change
                        </Button>
                        <Button
                          size="xs"
                          variant="secondary"
                          color="red"
                          onClick={() => removeStepImage(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="light"
                      className="mt-2"
                      onClick={() => handleImageUpload(index)}
                    >
                      Upload Image
                    </Button>
                  )}
                </div>
              </Col>
              
              <Col numColSpanMd={1}>
                <Flex justifyContent="end" className="h-full items-center">
                  <Button
                    icon={TrashIcon}
                    variant="light"
                    color="red"
                    onClick={() => removeStep(index)}
                  >
                    Remove
                  </Button>
                </Flex>
              </Col>
            </Grid>
          </Card>
        ))}
        
        {howItWorksSection.steps.length === 0 && (
          <Card className="p-6 text-center">
            <Text className="text-gray-500">No steps added yet. Click "Add Step" to get started.</Text>
          </Card>
        )}
      </div>
    </div>
  )
} 