import { useState } from 'react';

// Define the testimonial type
export type TestimonialType = {
  quote: string;
  author: string;
  position: string;
  company: string;
  avatar: string;
};

// Define the testimonials section type
export type TestimonialsSectionType = {
  heading: string;
  testimonials: TestimonialType[];
};

// Default avatar for testimonials
const DEFAULT_AVATAR = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2NjY2NjYyI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MyLjY3IDAgOCAyLjEzIDggN3YyYzAgMi4xMy00IDMtOCAzcy04LS44Ny04LTN2LTJjMC00Ljg3IDUuMzMtNyA4LTd6bTAgMmMtMS4yNSAwLTIuNSAxLjI1LTIuNSAyLjVTMTAuNzUgMTIgMTIgMTJzMi41LTEuMjUgMi41LTIuNVMxMy4yNSA3IDEyIDd6Ii8+PC9zdmc+';

// Default values for the testimonials section
const defaultTestimonialsSection: TestimonialsSectionType = {
  heading: 'What Our Customers Say',
  testimonials: [
    { 
      quote: 'This platform has transformed our operations. We\'ve seen a 30% increase in efficiency.',
      author: 'Jane Smith',
      position: 'Hotel Manager',
      company: 'Grand Hotel',
      avatar: '/images/testimonial-1.jpg'
    },
    { 
      quote: 'The best hotel management software we\'ve used. Intuitive and powerful.',
      author: 'John Davis',
      position: 'Operations Director',
      company: 'Luxury Resorts',
      avatar: '/images/testimonial-2.jpg'
    },
    { 
      quote: 'Customer support is exceptional. They\'re always there when we need them.',
      author: 'Sarah Johnson',
      position: 'Front Desk Manager',
      company: 'Boutique Inn',
      avatar: '/images/testimonial-3.jpg'
    }
  ]
};

export const useTestimonialsSection = (initialState?: Partial<TestimonialsSectionType>) => {
  const [testimonialsSection, setTestimonialsSection] = useState<TestimonialsSectionType>({
    ...defaultTestimonialsSection,
    ...initialState
  });

  // Function to update the testimonials section
  const updateTestimonialsSection = (updates: Partial<TestimonialsSectionType>) => {
    setTestimonialsSection(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Function to update a specific testimonial
  const updateTestimonial = (index: number, updates: Partial<TestimonialType>) => {
    const updatedTestimonials = [...testimonialsSection.testimonials];
    updatedTestimonials[index] = {
      ...updatedTestimonials[index],
      ...updates
    };
    
    updateTestimonialsSection({ testimonials: updatedTestimonials });
  };

  // Function to add a new testimonial
  const addTestimonial = () => {
    const newTestimonials = [
      ...testimonialsSection.testimonials,
      { 
        quote: 'New testimonial quote here.',
        author: 'Customer Name',
        position: 'Position',
        company: 'Company Name',
        avatar: DEFAULT_AVATAR
      }
    ];
    
    updateTestimonialsSection({ testimonials: newTestimonials });
  };

  // Function to remove a testimonial
  const removeTestimonial = (index: number) => {
    const updatedTestimonials = [...testimonialsSection.testimonials];
    
    // Clean up blob URL if it exists
    if (updatedTestimonials[index].avatar && updatedTestimonials[index].avatar.startsWith('blob:')) {
      URL.revokeObjectURL(updatedTestimonials[index].avatar);
    }
    
    updatedTestimonials.splice(index, 1);
    updateTestimonialsSection({ testimonials: updatedTestimonials });
  };

  // Function to handle testimonial avatar upload
  const uploadTestimonialAvatar = (index: number, file: File): Promise<{ success: boolean; error?: string }> => {
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
            const updatedTestimonials = [...testimonialsSection.testimonials];
            
            // Clean up previous blob URL if it exists
            if (updatedTestimonials[index].avatar && updatedTestimonials[index].avatar.startsWith('blob:')) {
              URL.revokeObjectURL(updatedTestimonials[index].avatar);
            }
            
            updatedTestimonials[index].avatar = imageUrl;
            
            updateTestimonialsSection({ testimonials: updatedTestimonials });
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

  // Function to remove a testimonial avatar
  const removeTestimonialAvatar = (index: number) => {
    const updatedTestimonials = [...testimonialsSection.testimonials];
    
    // Clean up blob URL if it exists
    if (updatedTestimonials[index].avatar && updatedTestimonials[index].avatar.startsWith('blob:')) {
      URL.revokeObjectURL(updatedTestimonials[index].avatar);
    }
    
    updatedTestimonials[index].avatar = DEFAULT_AVATAR;
    updateTestimonialsSection({ testimonials: updatedTestimonials });
  };

  return {
    testimonialsSection,
    updateTestimonialsSection,
    updateTestimonial,
    addTestimonial,
    removeTestimonial,
    uploadTestimonialAvatar,
    removeTestimonialAvatar,
    DEFAULT_AVATAR
  };
}; 