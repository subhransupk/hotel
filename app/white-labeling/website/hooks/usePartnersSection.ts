import { useState } from 'react';

// Define the partner type
export type PartnerType = {
  name: string;
  logo: string;
  website: string;
};

// Define the partners section type
export type PartnersSectionType = {
  heading: string;
  subheading: string;
  partners: PartnerType[];
};

// Default values for the partners section
const defaultPartnersSection: PartnersSectionType = {
  heading: 'Our Trusted Partners',
  subheading: 'We work with industry leaders to provide the best experience',
  partners: [
    {
      name: 'Amazon',
      logo: '/images/amazon-logo.png',
      website: 'https://amazon.com'
    },
    {
      name: 'Apple',
      logo: '/images/apple-logo.png',
      website: 'https://apple.com'
    },
    {
      name: 'Spotify',
      logo: '/images/spotify-logo.png',
      website: 'https://spotify.com'
    },
    {
      name: 'Netflix',
      logo: '/images/netflix-logo.png',
      website: 'https://netflix.com'
    },
    {
      name: 'Uber',
      logo: '/images/uber-logo.png',
      website: 'https://uber.com'
    }
  ]
};

export const usePartnersSection = (initialState?: Partial<PartnersSectionType>) => {
  const [partnersSection, setPartnersSection] = useState<PartnersSectionType>({
    ...defaultPartnersSection,
    ...initialState
  });

  // Function to update the partners section
  const updatePartnersSection = (updates: Partial<PartnersSectionType>) => {
    setPartnersSection(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Function to update a specific partner
  const updatePartner = (index: number, updates: Partial<PartnerType>) => {
    const updatedPartners = [...partnersSection.partners];
    updatedPartners[index] = {
      ...updatedPartners[index],
      ...updates
    };
    
    updatePartnersSection({ partners: updatedPartners });
  };

  // Function to add a new partner
  const addPartner = () => {
    const newPartners = [
      ...partnersSection.partners,
      {
        name: 'New Partner',
        logo: '',
        website: 'https://'
      }
    ];
    
    updatePartnersSection({ partners: newPartners });
  };

  // Function to remove a partner
  const removePartner = (index: number) => {
    const updatedPartners = [...partnersSection.partners];
    
    // Clean up blob URL if it exists
    if (updatedPartners[index].logo && updatedPartners[index].logo.startsWith('blob:')) {
      URL.revokeObjectURL(updatedPartners[index].logo);
    }
    
    updatedPartners.splice(index, 1);
    updatePartnersSection({ partners: updatedPartners });
  };

  // Function to handle partner logo upload
  const uploadPartnerLogo = (index: number, file: File): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        resolve({ success: false, error: 'Invalid file type. Please upload a JPEG, PNG, GIF, WebP, or SVG image.' });
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
            const updatedPartners = [...partnersSection.partners];
            
            // Clean up previous blob URL if it exists
            if (updatedPartners[index].logo && updatedPartners[index].logo.startsWith('blob:')) {
              URL.revokeObjectURL(updatedPartners[index].logo);
            }
            
            updatedPartners[index].logo = imageUrl;
            
            updatePartnersSection({ partners: updatedPartners });
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

  // Function to remove a partner logo
  const removePartnerLogo = (index: number) => {
    const updatedPartners = [...partnersSection.partners];
    
    // Clean up blob URL if it exists
    if (updatedPartners[index].logo && updatedPartners[index].logo.startsWith('blob:')) {
      URL.revokeObjectURL(updatedPartners[index].logo);
    }
    
    updatedPartners[index].logo = '';
    updatePartnersSection({ partners: updatedPartners });
  };

  return {
    partnersSection,
    updatePartnersSection,
    updatePartner,
    addPartner,
    removePartner,
    uploadPartnerLogo,
    removePartnerLogo
  };
}; 