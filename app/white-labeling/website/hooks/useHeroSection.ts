import { useState } from 'react';

// Define the hero section type
export type HeroSectionType = {
  heading: string;
  subheading: string;
  ctaText: string;
  ctaSecondaryText: string;
  backgroundImage: string;
  introductionVideoUrl: string;
};

// Default values for the hero section
const defaultHeroSection: HeroSectionType = {
  heading: 'Streamline Your Hotel Management',
  subheading: 'All-in-one solution for modern hoteliers',
  ctaText: 'Get Started',
  ctaSecondaryText: 'Learn More',
  backgroundImage: '/images/hero-background.jpg',
  introductionVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
};

export const useHeroSection = (initialState?: Partial<HeroSectionType>) => {
  const [heroSection, setHeroSection] = useState<HeroSectionType>({
    ...defaultHeroSection,
    ...initialState
  });

  // Function to validate YouTube URL
  const isValidYouTubeUrl = (url: string): boolean => {
    if (!url) return false;
    
    // Regular expression to match YouTube URLs
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return youtubeRegex.test(url);
  };

  // Function to update the hero section
  const updateHeroSection = (updates: Partial<HeroSectionType>) => {
    setHeroSection(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Function to update the video URL
  const updateVideoUrl = (url: string): { success: boolean; error?: string } => {
    if (!isValidYouTubeUrl(url)) {
      return { success: false, error: 'Please enter a valid YouTube URL' };
    }
    
    updateHeroSection({ introductionVideoUrl: url });
    return { success: true };
  };

  return {
    heroSection,
    updateHeroSection,
    updateVideoUrl,
    isValidYouTubeUrl
  };
}; 