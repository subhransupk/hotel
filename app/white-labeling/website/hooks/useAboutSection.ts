import { useState } from 'react';

// Define types for the about section
export type CounterType = {
  count: string;
  title: string;
  subtitle: string;
};

export type JourneyType = {
  image: string;
  description: string;
};

export type ValueType = {
  icon: string;
  title: string;
  description: string;
};

export type TeamMemberType = {
  name: string;
  designation: string;
  experience: number;
  image: string;
  bio: string;
};

export type AboutSectionType = {
  heroTitle: string;
  heroSubtitle: string;
  heading: string;
  content: string;
  image: string;
  counters: CounterType[];
  journey: JourneyType;
  values: ValueType[];
  team: TeamMemberType[];
};

// Default values for the about section
const defaultAboutSection: AboutSectionType = {
  // Hero section
  heroTitle: 'About Our Company',
  heroSubtitle: 'Leading the way in hotel management solutions',
  
  // Original content
  heading: 'About Our Platform',
  content: 'We provide cutting-edge hotel management software designed to simplify operations and enhance guest experiences. With over 10 years in the industry, we understand the challenges hoteliers face.',
  image: '',
  
  // Counters section
  counters: [
    { count: '10+', title: 'Years Experience', subtitle: 'In the industry' },
    { count: '500+', title: 'Hotels', subtitle: 'Using our platform' },
    { count: '50k+', title: 'Users', subtitle: 'Worldwide' },
    { count: '24/7', title: 'Support', subtitle: 'Always available' }
  ],
  
  // Journey section
  journey: {
    image: '',
    description: 'Our journey began in 2012 with a simple idea: to create a hotel management system that actually works for hoteliers, not against them. Since then, we\'ve grown from a small startup to an industry leader, serving hotels of all sizes across the globe. Our mission remains the same - to simplify hotel operations and enhance guest experiences through innovative technology solutions.'
  },
  
  // Values section
  values: [
    { icon: '💡', title: 'Innovation', description: 'We constantly push the boundaries of what\'s possible in hotel management technology.' },
    { icon: '🤝', title: 'Partnership', description: 'We work closely with our clients to ensure their success is our success.' },
    { icon: '🔒', title: 'Reliability', description: 'Our platform is built to be dependable, secure, and always available when you need it.' },
    { icon: '🌱', title: 'Sustainability', description: 'We\'re committed to helping hotels reduce their environmental impact through smart technology.' }
  ],
  
  // Team section
  team: [
    { 
      name: 'John Smith', 
      designation: 'CEO & Founder', 
      experience: 15, 
      image: '',
      bio: 'John has over 15 years of experience in the hospitality industry and technology sector.'
    },
    { 
      name: 'Sarah Johnson', 
      designation: 'CTO', 
      experience: 12, 
      image: '',
      bio: 'Sarah leads our technology team with 12 years of experience in software development.'
    },
    { 
      name: 'Michael Brown', 
      designation: 'Head of Customer Success', 
      experience: 8, 
      image: '',
      bio: 'Michael ensures our clients get the most out of our platform with his 8 years in customer success.'
    },
    { 
      name: 'Emily Chen', 
      designation: 'Lead Designer', 
      experience: 10, 
      image: '',
      bio: 'Emily brings 10 years of UX/UI design experience to create our intuitive user interfaces.'
    }
  ]
};

export const useAboutSection = (initialState?: Partial<AboutSectionType>) => {
  const [aboutSection, setAboutSection] = useState<AboutSectionType>({
    ...defaultAboutSection,
    ...initialState
  });

  // Function to update the about section
  const updateAboutSection = (updates: Partial<AboutSectionType>) => {
    setAboutSection(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Function to update a counter
  const updateCounter = (index: number, updates: Partial<CounterType>) => {
    const updatedCounters = [...aboutSection.counters];
    updatedCounters[index] = {
      ...updatedCounters[index],
      ...updates
    };
    
    updateAboutSection({ counters: updatedCounters });
  };

  // Function to add a counter
  const addCounter = () => {
    const newCounters = [
      ...aboutSection.counters,
      { count: '0', title: 'New Counter', subtitle: 'Description here' }
    ];
    
    updateAboutSection({ counters: newCounters });
  };

  // Function to remove a counter
  const removeCounter = (index: number) => {
    const updatedCounters = [...aboutSection.counters];
    updatedCounters.splice(index, 1);
    updateAboutSection({ counters: updatedCounters });
  };

  // Function to update a value
  const updateValue = (index: number, updates: Partial<ValueType>) => {
    const updatedValues = [...aboutSection.values];
    updatedValues[index] = {
      ...updatedValues[index],
      ...updates
    };
    
    updateAboutSection({ values: updatedValues });
  };

  // Function to add a value
  const addValue = () => {
    const newValues = [
      ...aboutSection.values,
      { icon: '✨', title: 'New Value', description: 'Description here' }
    ];
    
    updateAboutSection({ values: newValues });
  };

  // Function to remove a value
  const removeValue = (index: number) => {
    const updatedValues = [...aboutSection.values];
    updatedValues.splice(index, 1);
    updateAboutSection({ values: updatedValues });
  };

  // Function to update a team member
  const updateTeamMember = (index: number, updates: Partial<TeamMemberType>) => {
    const updatedTeam = [...aboutSection.team];
    updatedTeam[index] = {
      ...updatedTeam[index],
      ...updates
    };
    
    updateAboutSection({ team: updatedTeam });
  };

  // Function to add a team member
  const addTeamMember = () => {
    const newTeam = [
      ...aboutSection.team,
      { 
        name: 'New Team Member', 
        designation: 'Position', 
        experience: 0, 
        image: '',
        bio: 'Bio here'
      }
    ];
    
    updateAboutSection({ team: newTeam });
  };

  // Function to remove a team member
  const removeTeamMember = (index: number) => {
    const updatedTeam = [...aboutSection.team];
    updatedTeam.splice(index, 1);
    updateAboutSection({ team: updatedTeam });
  };

  // Function to update the journey
  const updateJourney = (updates: Partial<JourneyType>) => {
    updateAboutSection({ 
      journey: {
        ...aboutSection.journey,
        ...updates
      }
    });
  };

  return {
    aboutSection,
    updateAboutSection,
    updateCounter,
    addCounter,
    removeCounter,
    updateValue,
    addValue,
    removeValue,
    updateTeamMember,
    addTeamMember,
    removeTeamMember,
    updateJourney
  };
}; 