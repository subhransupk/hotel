import { 
  HeroSectionType, 
  FeaturesSectionType, 
  AboutSectionType, 
  HowItWorksSectionType, 
  TestimonialsSectionType, 
  PricingSectionType, 
  PartnersSectionType,
  WebsiteContentType
} from '../../app/white-labeling/website/hooks';

// Mock service for handling website content
export const WebsiteContentService = {
  // Get website content (mock implementation)
  getWebsiteContent: async (): Promise<{ success: boolean; content?: WebsiteContentType; error?: string }> => {
    console.log('Mock: Getting website content');
    
    // Return default content
    return { 
      success: true, 
      content: createDefaultWebsiteContent() 
    };
  },
  
  // Save website content (mock implementation)
  saveWebsiteContent: async (content: WebsiteContentType): Promise<{ success: boolean; error?: string }> => {
    console.log('Mock: Saving website content', content);
    
    // Simulate a successful save
    return { success: true };
  }
};

// Helper function to create default website content
function createDefaultWebsiteContent(): WebsiteContentType {
  return {
    hero: {
      heading: 'Welcome to Your Hotel',
      subheading: 'Luxury and comfort at your fingertips',
      ctaText: 'Book Now',
      ctaSecondaryText: 'Learn More',
      backgroundImage: '/images/hero-background.jpg',
      introductionVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    features: {
      heading: 'Our Features',
      subheading: 'What makes us special',
      features: [
        { 
          title: 'Booking Management', 
          description: 'Streamline your reservation process', 
          icon: '📅',
          image: '/images/features/booking.jpg'
        },
        { 
          title: 'Guest Services', 
          description: 'Enhance guest experience', 
          icon: '👥',
          image: '/images/features/guest.jpg'
        },
        { 
          title: 'Revenue Management', 
          description: 'Optimize your pricing strategy', 
          icon: '💰',
          image: '/images/features/revenue.jpg'
        }
      ]
    },
    about: {
      heroTitle: 'About Us',
      heroSubtitle: 'Our Story',
      heading: 'About Our Hotel',
      content: 'Welcome to our hotel, where luxury meets comfort.',
      image: '/images/about-image.jpg',
      counters: [
        { count: '10+', title: 'Years Experience', subtitle: 'In the industry' },
        { count: '500+', title: 'Hotels', subtitle: 'Using our platform' }
      ],
      journey: {
        image: '/images/journey.jpg',
        description: 'Our journey began with a vision to create the perfect hotel experience.'
      },
      values: [
        { icon: '💡', title: 'Innovation', description: 'We constantly push the boundaries.' },
        { icon: '🤝', title: 'Partnership', description: 'We work closely with our clients.' }
      ],
      team: [
        { 
          name: 'John Smith', 
          designation: 'CEO & Founder', 
          experience: 15, 
          image: '/images/team/john.jpg',
          bio: 'John has over 15 years of experience in the hospitality industry.'
        }
      ]
    },
    howItWorks: {
      heading: 'How It Works',
      steps: [
        { title: 'Sign Up', description: 'Create your account in minutes', number: 1, icon: '📝', image: '' },
        { title: 'Customize', description: 'Set up your property details', number: 2, icon: '⚙️', image: '' }
      ]
    },
    testimonials: {
      heading: 'What Our Guests Say',
      testimonials: [
        {
          quote: 'Amazing experience! Will definitely come back.',
          author: 'Jane Doe',
          position: 'Business Traveler',
          company: 'ABC Corp',
          avatar: '/images/testimonials/testimonial-1.jpg'
        }
      ]
    },
    pricing: {
      heading: 'Our Pricing',
      subheading: 'Choose the perfect plan for you',
      plans: [
        {
          name: 'Basic',
          price: '99',
          period: 'monthly',
          popular: false,
          cta: 'Get Started',
          features: [
            'Up to 20 rooms',
            'Basic booking management'
          ]
        }
      ]
    },
    partners: {
      heading: 'Our Partners',
      subheading: 'Companies we work with',
      partners: [
        {
          name: 'Partner 1',
          logo: '/images/partners/partner1.jpg',
          website: 'https://example.com'
        },
        {
          name: 'Partner 2',
          logo: '/images/partners/partner2.jpg',
          website: 'https://example.com'
        }
      ]
    },
    lastSaved: new Date()
  };
} 