'use client'

import { 
  Card, 
  Title, 
  Text, 
  Divider, 
  Button, 
  Flex, 
  TextInput,
  Textarea
} from '@tremor/react'
import { PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { useFeaturesSection, useUIState, useFileUpload, useIconSelector } from '../hooks'

export default function FeaturesSectionEditor() {
  // Use custom hooks for state management
  const { uiState, showNotification } = useUIState();
  
  const { 
    featuresSection, 
    updateFeaturesSection, 
    addFeature, 
    updateFeature, 
    removeFeature, 
    uploadFeatureImage, 
    removeFeatureImage 
  } = useFeaturesSection();
  
  const { 
    triggerFileUpload
  } = useFileUpload();
  
  const { 
    searchTerm,
    setSearchTerm,
    selectedType,
    selectedIndex,
    selectorRef,
    filteredIcons,
    openIconSelector,
    closeIconSelector
  } = useIconSelector();

  // Function to handle feature image upload
  const handleFeatureImageUpload = (index: number) => {
    triggerFileUpload(
      { maxSize: 5 * 1024 * 1024, allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] },
      async (url) => {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          const file = new File([blob], 'feature.jpg', { type: blob.type });
          
          await uploadFeatureImage(index, file);
          showNotification('Feature image uploaded successfully!', 'success');
        } catch (error) {
          showNotification('Failed to process image', 'error');
        }
      },
      (error) => {
        showNotification(error, 'error');
      }
    );
  };

  return (
    <Card>
      <Flex justifyContent="between" alignItems="center">
        <div>
          <Title>Features Section</Title>
          <Text>Highlight the key features of your product</Text>
        </div>
        <Button 
          variant="secondary" 
          icon={PlusIcon} 
          onClick={addFeature}
        >
          Add Feature
        </Button>
      </Flex>
      <Divider />
      
      <div className="space-y-4 mt-4">
        <div>
          <Text>Section Heading</Text>
          <TextInput 
            placeholder="Enter heading" 
            value={featuresSection.heading} 
            onChange={(e) => updateFeaturesSection({ heading: e.target.value })} 
          />
        </div>
        
        <div>
          <Text>Section Subheading</Text>
          <TextInput 
            placeholder="Enter subheading" 
            value={featuresSection.subheading} 
            onChange={(e) => updateFeaturesSection({ subheading: e.target.value })} 
          />
        </div>
        
        <div className="mt-6">
          <Text className="mb-2">Features</Text>
          <div className="space-y-6">
            {featuresSection.features.map((feature, index) => (
              <Card key={index} className="p-4">
                <Flex justifyContent="between" alignItems="start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span 
                        className="text-2xl mr-2 cursor-pointer" 
                        onClick={() => openIconSelector('feature', index)}
                      >
                        {feature.icon}
                      </span>
                      <TextInput 
                        placeholder="Feature title" 
                        value={feature.title} 
                        onChange={(e) => updateFeature(index, { title: e.target.value })} 
                        className="flex-1"
                      />
                    </div>
                    
                    <Textarea 
                      placeholder="Feature description" 
                      value={feature.description} 
                      onChange={(e) => updateFeature(index, { description: e.target.value })} 
                      className="mt-2"
                    />
                    
                    <div className="mt-4">
                      {feature.image ? (
                        <div className="relative">
                          <img 
                            src={feature.image} 
                            alt={feature.title} 
                            className="w-full h-40 object-cover rounded-md"
                          />
                          <button 
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                            onClick={() => removeFeatureImage(index)}
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <Button 
                          variant="light" 
                          onClick={() => handleFeatureImageUpload(index)}
                          icon={PlusIcon}
                          className="w-full h-20 border-2 border-dashed border-gray-300"
                        >
                          Add Image
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    variant="light" 
                    color="red" 
                    icon={TrashIcon} 
                    onClick={() => removeFeature(index)}
                  />
                </Flex>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Icon Selector */}
      {selectedType && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeIconSelector}
        >
          <div 
            ref={selectorRef}
            className="bg-white p-4 rounded-lg w-96 max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4">
              <Text>Select an Icon</Text>
              <TextInput 
                placeholder="Search icons..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="mt-2"
              />
            </div>
            
            <div className="grid grid-cols-6 gap-2">
              {filteredIcons.map((icon) => (
                <button 
                  key={icon} 
                  className="text-2xl p-2 hover:bg-gray-100 rounded-md"
                  onClick={() => {
                    if (selectedType === 'feature' && selectedIndex !== null) {
                      updateFeature(selectedIndex, { icon });
                    }
                    closeIconSelector();
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  )
} 