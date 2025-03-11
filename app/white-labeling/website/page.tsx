'use client'

import { useState, useEffect } from 'react'
import { 
  Title, 
  Text, 
  TabGroup, 
  TabList, 
  Tab, 
  TabPanels, 
  TabPanel, 
  Button, 
  Card,
  Flex
} from '@tremor/react'
import { 
  ArrowDownTrayIcon, 
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline'

import { 
  useHeroSection,
  useFeaturesSection,
  useAboutSection,
  useHowItWorksSection,
  useTestimonialsSection,
  usePricingSection,
  usePartnersSection,
  useUIState,
  useFileUpload,
  useWebsiteContent
} from './hooks'

import HeroSectionEditor from './components/HeroSectionEditor'
import FeaturesSectionEditor from './components/FeaturesSectionEditor'
import AboutSectionEditor from './components/AboutSectionEditor'
import HowItWorksSectionEditor from './components/HowItWorksSectionEditor'
import TestimonialsSectionEditor from './components/TestimonialsSectionEditor'
import PricingSectionEditor from './components/PricingSectionEditor'
import PartnersSectionEditor from './components/PartnersSectionEditor'
import Notification from './components/Notification'
import SetupDatabaseButton from './components/SetupDatabaseButton'

export default function WebsiteContentPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  
  // Use custom hooks for state management
  const { uiState, showNotification, setUploading } = useUIState()
  const { heroSection, updateHeroSection } = useHeroSection()
  const { 
    featuresSection, 
    updateFeaturesSection
  } = useFeaturesSection()
  
  const { aboutSection, updateAboutSection } = useAboutSection()
  const { howItWorksSection, updateHowItWorksSection } = useHowItWorksSection()
  const { testimonialsSection, updateTestimonialsSection } = useTestimonialsSection()
  const { pricingSection, updatePricingSection } = usePricingSection()
  const { partnersSection, updatePartnersSection } = usePartnersSection()
  
  const { triggerFileUpload } = useFileUpload()
  const { 
    saveWebsiteContent, 
    exportWebsiteContent, 
    importWebsiteContent, 
    loadWebsiteContent,
    isLoading
  } = useWebsiteContent()

  // Load website content from database when component mounts
  useEffect(() => {
    const fetchWebsiteContent = async () => {
      setUploading(true);
      try {
        const result = await loadWebsiteContent();
        
        if (result.success && result.content) {
          // Update all section states with the loaded content
          updateHeroSection(result.content.hero);
          updateFeaturesSection(result.content.features);
          updateAboutSection(result.content.about);
          updateHowItWorksSection(result.content.howItWorks);
          updateTestimonialsSection(result.content.testimonials);
          updatePricingSection(result.content.pricing);
          updatePartnersSection(result.content.partners);
          
          if (result.content.lastSaved) {
            setLastSaved(new Date(result.content.lastSaved));
          }
          
          showNotification('Website content loaded successfully!', 'success');
        } else if (result.error) {
          // Only show notification for actual errors, not for "No content found"
          if (result.error !== 'No website content found') {
            showNotification(`Error loading content: ${result.error}`, 'error');
          }
        }
      } catch (error) {
        console.error('Load error:', error);
        showNotification('Error loading website content', 'error');
      } finally {
        setUploading(false);
      }
    };
    
    fetchWebsiteContent();
    // Only run this effect once when the component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup function for object URLs when component unmounts
  useEffect(() => {
    return () => {
      // Cleanup any blob URLs when component unmounts
      featuresSection.features.forEach(feature => {
        if (feature.image && feature.image.startsWith('blob:')) {
          URL.revokeObjectURL(feature.image)
        }
      })
    }
  }, [featuresSection.features])

  // Function to handle saving changes
  const handleSaveChanges = async () => {
    try {
      setUploading(true)
      
      const websiteContent = {
        hero: heroSection,
        features: featuresSection,
        about: aboutSection,
        howItWorks: howItWorksSection,
        testimonials: testimonialsSection,
        pricing: pricingSection,
        partners: partnersSection,
        lastSaved: new Date()
      }
      
      const result = await saveWebsiteContent(websiteContent)
      
      if (result.success) {
        setLastSaved(new Date())
        showNotification('All changes saved successfully!', 'success')
      } else {
        showNotification(`Error saving changes: ${result.error}`, 'error')
      }
    } catch (error) {
      showNotification('An unexpected error occurred while saving', 'error')
      console.error('Save error:', error)
    } finally {
      setUploading(false)
    }
  }

  // Function to handle export
  const handleExport = () => {
    const websiteContent = {
      hero: heroSection,
      features: featuresSection,
      about: aboutSection,
      howItWorks: howItWorksSection,
      testimonials: testimonialsSection,
      pricing: pricingSection,
      partners: partnersSection,
      lastSaved: lastSaved || new Date()
    }
    
    exportWebsiteContent(websiteContent)
    showNotification('Website content exported successfully!', 'success')
  }

  // Function to handle import
  const handleImport = () => {
    triggerFileUpload(
      { maxSize: 10 * 1024 * 1024, allowedTypes: ['application/json'] },
      async (url) => {
        try {
          const file = new File([await fetch(url).then(r => r.blob())], 'import.json')
          const result = await importWebsiteContent(file)
          
          if (result.success && result.content) {
            // Update all section states with the imported content
            updateHeroSection(result.content.hero)
            updateFeaturesSection(result.content.features)
            updateAboutSection(result.content.about)
            updateHowItWorksSection(result.content.howItWorks)
            updateTestimonialsSection(result.content.testimonials)
            updatePricingSection(result.content.pricing)
            updatePartnersSection(result.content.partners)
            
            setLastSaved(result.content.lastSaved ? new Date(result.content.lastSaved) : new Date())
            showNotification('Website content imported successfully!', 'success')
          } else {
            showNotification(`Error importing content: ${result.error}`, 'error')
          }
        } catch (error) {
          showNotification('Error processing import file', 'error')
          console.error('Import error:', error)
        }
      },
      (error) => {
        showNotification(`Error selecting file: ${error}`, 'error')
      }
    )
  }

  return (
    <div className="p-4">
      {/* Database Setup Button */}
      <SetupDatabaseButton />
      
      {/* Notification component */}
      <Notification />
      
      {/* Header */}
      <Flex justifyContent="between" alignItems="center" className="mb-6">
        <div>
          <Title>Website Content</Title>
          <Text>Customize your website content and appearance</Text>
        </div>
        
        <Flex className="space-x-2">
          {lastSaved && (
            <Text className="text-gray-500">
              Last saved: {lastSaved.toLocaleTimeString()}
            </Text>
          )}
          
          <Button 
            variant="secondary" 
            icon={ArrowDownTrayIcon}
            onClick={handleExport}
          >
            Export
          </Button>
          
          <Button
            variant="secondary"
            icon={ArrowUpTrayIcon}
            onClick={handleImport}
          >
            Import
          </Button>
          
          <Button
            onClick={handleSaveChanges}
            loading={uiState.isUploading}
          >
            Save Changes
          </Button>
        </Flex>
      </Flex>
      
      {/* Main Content */}
      <TabGroup index={activeTab} onIndexChange={setActiveTab}>
        <TabList>
          <Tab>Hero</Tab>
          <Tab>Features</Tab>
          <Tab>About</Tab>
          <Tab>How It Works</Tab>
          <Tab>Testimonials</Tab>
          <Tab>Pricing</Tab>
          <Tab>Partners</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            <Card>
              <HeroSectionEditor />
            </Card>
          </TabPanel>
          
          <TabPanel>
            <Card>
              <FeaturesSectionEditor />
            </Card>
          </TabPanel>
          
          <TabPanel>
            <Card>
              <AboutSectionEditor />
            </Card>
          </TabPanel>
          
          <TabPanel>
            <Card>
              <HowItWorksSectionEditor />
            </Card>
          </TabPanel>
          
          <TabPanel>
            <Card>
              <TestimonialsSectionEditor />
            </Card>
          </TabPanel>
          
          <TabPanel>
            <Card>
              <PricingSectionEditor />
            </Card>
          </TabPanel>
          
          <TabPanel>
            <Card>
              <PartnersSectionEditor />
            </Card>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  )
} 