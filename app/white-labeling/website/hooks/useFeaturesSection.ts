import { useState, useEffect } from 'react';

// Define the feature type
export type FeatureType = {
  title: string;
  description: string;
  icon: string;
  image: string;
};

// Define the features section type
export type FeaturesSectionType = {
  heading: string;
  subheading: string;
  features: FeatureType[];
};

// Default values for the features section
const defaultFeaturesSection: FeaturesSectionType = {
  heading: 'Powerful Features',
  subheading: 'Everything you need to manage your property',
  features: [
    { 
      title: 'Booking Management', 
      description: 'Streamline your reservation process', 
      icon: '📅',
      image: ''
    },
    { 
      title: 'Guest Services', 
      description: 'Enhance guest experience', 
      icon: '👥',
      image: ''
    },
    { 
      title: 'Revenue Management', 
      description: 'Optimize your pricing strategy', 
      icon: '💰',
      image: ''
    },
    { 
      title: 'Reporting & Analytics', 
      description: 'Data-driven insights', 
      icon: '📊',
      image: ''
    }
  ]
};

export const useFeaturesSection = (initialState?: Partial<FeaturesSectionType>) => {
  const [featuresSection, setFeaturesSection] = useState<FeaturesSectionType>({
    ...defaultFeaturesSection,
    ...initialState
  });

  // Cleanup function for object URLs when component unmounts
  useEffect(() => {
    return () => {
      // Cleanup any blob URLs when component unmounts
      featuresSection.features.forEach(feature => {
        if (feature.image && feature.image.startsWith('blob:')) {
          URL.revokeObjectURL(feature.image);
        }
      });
    };
  }, [featuresSection.features]);

  // Function to update the features section
  const updateFeaturesSection = (updates: Partial<FeaturesSectionType>) => {
    setFeaturesSection(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Function to add a new feature
  const addFeature = () => {
    const newFeatures = [
      ...featuresSection.features,
      { 
        title: 'New Feature', 
        description: 'Description here', 
        icon: '✨',
        image: '' 
      }
    ];
    
    updateFeaturesSection({ features: newFeatures });
  };

  // Function to update a specific feature
  const updateFeature = (index: number, updates: Partial<FeatureType>) => {
    const updatedFeatures = [...featuresSection.features];
    updatedFeatures[index] = {
      ...updatedFeatures[index],
      ...updates
    };
    
    updateFeaturesSection({ features: updatedFeatures });
  };

  // Function to remove a feature
  const removeFeature = (index: number) => {
    const updatedFeatures = [...featuresSection.features];
    
    // Clean up blob URL if it exists
    if (updatedFeatures[index].image && updatedFeatures[index].image.startsWith('blob:')) {
      URL.revokeObjectURL(updatedFeatures[index].image);
    }
    
    updatedFeatures.splice(index, 1);
    updateFeaturesSection({ features: updatedFeatures });
  };

  // Function to handle feature image upload
  const uploadFeatureImage = (index: number, file: File): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        resolve({ success: false, error: 'Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.' });
        return;
      }
      
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        resolve({ success: false, error: 'File too large. Please upload an image smaller than 5MB.' });
        return;
      }
      
      try {
        // Create a local URL for the selected image
        const imageUrl = URL.createObjectURL(file);
        
        // Simulate network delay
        setTimeout(() => {
          try {
            const updatedFeatures = [...featuresSection.features];
            
            // Clean up previous blob URL if it exists
            if (updatedFeatures[index].image && updatedFeatures[index].image.startsWith('blob:')) {
              URL.revokeObjectURL(updatedFeatures[index].image);
            }
            
            updatedFeatures[index].image = imageUrl;
            
            updateFeaturesSection({ features: updatedFeatures });
            resolve({ success: true });
          } catch (error) {
            resolve({ success: false, error: 'Failed to process image.' });
          }
        }, 1000);
      } catch (error) {
        resolve({ success: false, error: 'Failed to upload image.' });
      }
    });
  };

  // Function to remove a feature image
  const removeFeatureImage = (index: number) => {
    const updatedFeatures = [...featuresSection.features];
    
    // Clean up blob URL if it exists
    if (updatedFeatures[index].image && updatedFeatures[index].image.startsWith('blob:')) {
      URL.revokeObjectURL(updatedFeatures[index].image);
    }
    
    updatedFeatures[index].image = '';
    updateFeaturesSection({ features: updatedFeatures });
  };

  return {
    featuresSection,
    updateFeaturesSection,
    addFeature,
    updateFeature,
    removeFeature,
    uploadFeatureImage,
    removeFeatureImage
  };
}; 