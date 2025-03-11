'use client'

import { 
  Card, 
  Title, 
  Text, 
  Divider, 
  Button, 
  Flex, 
  TextInput
} from '@tremor/react'

import { useHeroSection, useUIState } from '../hooks'

export default function HeroSectionEditor() {
  // Use custom hooks for state management
  const { uiState, showNotification } = useUIState();
  const { heroSection, updateHeroSection, updateVideoUrl } = useHeroSection();

  // Function to handle video URL update
  const handleVideoUrlUpdate = (url: string) => {
    const result = updateVideoUrl(url);
    
    if (result.success) {
      showNotification('Video URL saved successfully!', 'success');
    } else {
      showNotification(result.error || 'Failed to update video URL', 'error');
    }
  };

  return (
    <Card>
      <Title>Hero Section</Title>
      <Text>Configure the main hero section of your website</Text>
      <Divider />
      
      <div className="space-y-4 mt-4">
        <div>
          <Text>Heading</Text>
          <TextInput 
            placeholder="Enter heading" 
            value={heroSection.heading} 
            onChange={(e) => updateHeroSection({ heading: e.target.value })} 
          />
        </div>
        
        <div>
          <Text>Subheading</Text>
          <TextInput 
            placeholder="Enter subheading" 
            value={heroSection.subheading} 
            onChange={(e) => updateHeroSection({ subheading: e.target.value })} 
          />
        </div>
        
        <div>
          <Text>Primary CTA Text</Text>
          <TextInput 
            placeholder="Enter CTA text" 
            value={heroSection.ctaText} 
            onChange={(e) => updateHeroSection({ ctaText: e.target.value })} 
          />
        </div>
        
        <div>
          <Text>Secondary CTA Text</Text>
          <TextInput 
            placeholder="Enter secondary CTA text" 
            value={heroSection.ctaSecondaryText} 
            onChange={(e) => updateHeroSection({ ctaSecondaryText: e.target.value })} 
          />
        </div>
        
        <div>
          <Text>Video URL</Text>
          <Flex>
            <TextInput 
              placeholder="Enter YouTube URL" 
              value={heroSection.introductionVideoUrl} 
              onChange={(e) => updateHeroSection({ introductionVideoUrl: e.target.value })} 
              className="flex-1 mr-2"
            />
            <Button 
              variant="secondary" 
              onClick={() => handleVideoUrlUpdate(heroSection.introductionVideoUrl)}
            >
              Validate & Save
            </Button>
          </Flex>
        </div>
      </div>
    </Card>
  )
} 