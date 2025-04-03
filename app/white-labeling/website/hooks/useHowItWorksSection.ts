import { useState } from 'react';

// Define the step type
export type StepType = {
  title: string;
  description: string;
  number: number;
  icon: string;
  image: string;
};

// Define the "How It Works" section type
export type HowItWorksSectionType = {
  heading: string;
  steps: StepType[];
};

// Default values for the "How It Works" section
const defaultHowItWorksSection: HowItWorksSectionType = {
  heading: 'How It Works',
  steps: [
    { title: 'Sign Up', description: 'Create your account in minutes', number: 1, icon: '📝', image: '' },
    { title: 'Customize', description: 'Set up your property details', number: 2, icon: '⚙️', image: '' },
    { title: 'Integrate', description: 'Connect with your existing systems', number: 3, icon: '🔄', image: '' }
  ]
};

export const useHowItWorksSection = (initialState?: Partial<HowItWorksSectionType>) => {
  const [howItWorksSection, setHowItWorksSection] = useState<HowItWorksSectionType>({
    ...defaultHowItWorksSection,
    ...initialState
  });

  // Function to update the "How It Works" section
  const updateHowItWorksSection = (updates: Partial<HowItWorksSectionType>) => {
    setHowItWorksSection(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Function to update a specific step
  const updateStep = (index: number, updates: Partial<StepType>) => {
    const updatedSteps = [...howItWorksSection.steps];
    updatedSteps[index] = {
      ...updatedSteps[index],
      ...updates
    };
    
    updateHowItWorksSection({ steps: updatedSteps });
  };

  // Function to add a new step
  const addStep = () => {
    const newSteps = [...howItWorksSection.steps];
    const newStepNumber = newSteps.length > 0 ? Math.max(...newSteps.map(step => step.number)) + 1 : 1;
    
    newSteps.push({
      title: 'New Step',
      description: 'Description here',
      number: newStepNumber,
      icon: '✨',
      image: ''
    });
    
    updateHowItWorksSection({ steps: newSteps });
  };

  // Function to remove a step
  const removeStep = (index: number) => {
    const updatedSteps = [...howItWorksSection.steps];
    
    // Clean up blob URL if it exists
    if (updatedSteps[index].image && updatedSteps[index].image.startsWith('blob:')) {
      URL.revokeObjectURL(updatedSteps[index].image);
    }
    
    updatedSteps.splice(index, 1);
    
    // Renumber the steps
    updatedSteps.forEach((step, i) => {
      step.number = i + 1;
    });
    
    updateHowItWorksSection({ steps: updatedSteps });
  };

  // Function to handle step image upload
  const uploadStepImage = (index: number, file: File): Promise<{ success: boolean; error?: string }> => {
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
            const updatedSteps = [...howItWorksSection.steps];
            
            // Clean up previous blob URL if it exists
            if (updatedSteps[index].image && updatedSteps[index].image.startsWith('blob:')) {
              URL.revokeObjectURL(updatedSteps[index].image);
            }
            
            updatedSteps[index].image = imageUrl;
            
            updateHowItWorksSection({ steps: updatedSteps });
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

  // Function to remove a step image
  const removeStepImage = (index: number) => {
    const updatedSteps = [...howItWorksSection.steps];
    
    // Clean up blob URL if it exists
    if (updatedSteps[index].image && updatedSteps[index].image.startsWith('blob:')) {
      URL.revokeObjectURL(updatedSteps[index].image);
    }
    
    updatedSteps[index].image = '';
    updateHowItWorksSection({ steps: updatedSteps });
  };

  return {
    howItWorksSection,
    updateHowItWorksSection,
    updateStep,
    addStep,
    removeStep,
    uploadStepImage,
    removeStepImage
  };
}; 