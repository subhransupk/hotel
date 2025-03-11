import { useState } from 'react';
import { 
  HeroSectionType, 
  FeaturesSectionType, 
  AboutSectionType, 
  HowItWorksSectionType, 
  TestimonialsSectionType, 
  PricingSectionType, 
  PartnersSectionType 
} from './index';
import { WebsiteContentService } from '../../../../lib/services/website-content-service';

export type WebsiteContentType = {
  hero: HeroSectionType;
  features: FeaturesSectionType;
  about: AboutSectionType;
  howItWorks: HowItWorksSectionType;
  testimonials: TestimonialsSectionType;
  pricing: PricingSectionType;
  partners: PartnersSectionType;
  lastSaved?: Date;
};

export const useWebsiteContent = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Function to save website content
  const saveWebsiteContent = async (content: WebsiteContentType): Promise<{ success: boolean; error?: string }> => {
    setIsSaving(true);
    setError(null);
    
    try {
      // Save to database using the service
      const result = await WebsiteContentService.saveWebsiteContent(content);
      
      if (result.success) {
        const savedDate = new Date();
        setLastSaved(savedDate);
      } else if (result.error) {
        setError(result.error);
      }
      
      setIsSaving(false);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save website content';
      setError(errorMessage);
      setIsSaving(false);
      
      return { success: false, error: errorMessage };
    }
  };

  // Function to load website content
  const loadWebsiteContent = async (): Promise<{ success: boolean; content?: WebsiteContentType; error?: string }> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Load from database using the service
      const result = await WebsiteContentService.getWebsiteContent();
      
      if (result.success && result.content) {
        if (result.content.lastSaved) {
          setLastSaved(new Date(result.content.lastSaved));
        }
      } else if (result.error) {
        setError(result.error);
      }
      
      setIsLoading(false);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load website content';
      setError(errorMessage);
      setIsLoading(false);
      
      return { success: false, error: errorMessage };
    }
  };

  // Function to export website content
  const exportWebsiteContent = (content: WebsiteContentType): void => {
    try {
      // Create a JSON blob
      const contentWithTimestamp = {
        ...content,
        exportedAt: new Date()
      };
      
      const blob = new Blob([JSON.stringify(contentWithTimestamp, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create a download link
      const a = document.createElement('a');
      a.href = url;
      a.download = `website-content-${new Date().toISOString().split('T')[0]}.json`;
      
      // Trigger the download
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to export website content';
      setError(errorMessage);
    }
  };

  // Function to import website content
  const importWebsiteContent = (file: File): Promise<{ success: boolean; content?: WebsiteContentType; error?: string }> => {
    return new Promise((resolve) => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Validate file type
        if (file.type !== 'application/json') {
          setError('Invalid file type. Please upload a JSON file.');
          setIsLoading(false);
          resolve({ success: false, error: 'Invalid file type. Please upload a JSON file.' });
          return;
        }
        
        // Read the file
        const reader = new FileReader();
        
        reader.onload = (e) => {
          try {
            const content = JSON.parse(e.target?.result as string) as WebsiteContentType;
            
            // Validate the content structure
            if (!content.hero || !content.features || !content.about || 
                !content.howItWorks || !content.testimonials || !content.pricing || 
                !content.partners) {
              setError('Invalid content structure. The file does not contain all required sections.');
              setIsLoading(false);
              resolve({ success: false, error: 'Invalid content structure. The file does not contain all required sections.' });
              return;
            }
            
            setIsLoading(false);
            resolve({ success: true, content });
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to parse JSON file';
            setError(errorMessage);
            setIsLoading(false);
            resolve({ success: false, error: errorMessage });
          }
        };
        
        reader.onerror = () => {
          setError('Failed to read file');
          setIsLoading(false);
          resolve({ success: false, error: 'Failed to read file' });
        };
        
        reader.readAsText(file);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to import website content';
        setError(errorMessage);
        setIsLoading(false);
        resolve({ success: false, error: errorMessage });
      }
    });
  };

  return {
    isSaving,
    isLoading,
    error,
    lastSaved,
    saveWebsiteContent,
    loadWebsiteContent,
    exportWebsiteContent,
    importWebsiteContent,
    setError
  };
}; 