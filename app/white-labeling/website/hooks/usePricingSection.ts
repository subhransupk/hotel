import { useState } from 'react';

// Define the pricing plan type
export type PricingPlanType = {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  popular: boolean;
};

// Define the pricing section type
export type PricingSectionType = {
  heading: string;
  subheading: string;
  plans: PricingPlanType[];
};

// Default values for the pricing section
const defaultPricingSection: PricingSectionType = {
  heading: 'Simple, Transparent Pricing',
  subheading: 'Choose the plan that works for your business',
  plans: [
    {
      name: 'Basic',
      price: '$49',
      period: 'per month',
      features: [
        'Up to 20 rooms',
        'Booking management',
        'Basic reporting',
        'Email support'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Professional',
      price: '$99',
      period: 'per month',
      features: [
        'Up to 50 rooms',
        'Advanced analytics',
        'API access',
        'Priority support'
      ],
      cta: 'Get Started',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: 'per month',
      features: [
        'Unlimited rooms',
        'Custom integrations',
        'Dedicated account manager',
        '24/7 phone support'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ]
};

export const usePricingSection = (initialState?: Partial<PricingSectionType>) => {
  const [pricingSection, setPricingSection] = useState<PricingSectionType>({
    ...defaultPricingSection,
    ...initialState
  });

  // Function to update the pricing section
  const updatePricingSection = (updates: Partial<PricingSectionType>) => {
    setPricingSection(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Function to update a specific plan
  const updatePlan = (index: number, updates: Partial<PricingPlanType>) => {
    const updatedPlans = [...pricingSection.plans];
    updatedPlans[index] = {
      ...updatedPlans[index],
      ...updates
    };
    
    // If this plan is marked as popular, make sure other plans are not popular
    if (updates.popular === true) {
      updatedPlans.forEach((plan, i) => {
        if (i !== index) {
          plan.popular = false;
        }
      });
    }
    
    updatePricingSection({ plans: updatedPlans });
  };

  // Function to add a new plan
  const addPlan = () => {
    const newPlans = [
      ...pricingSection.plans,
      {
        name: 'New Plan',
        price: '$0',
        period: 'per month',
        features: [
          'Feature 1',
          'Feature 2',
          'Feature 3',
          'Feature 4'
        ],
        cta: 'Get Started',
        popular: false
      }
    ];
    
    updatePricingSection({ plans: newPlans });
  };

  // Function to remove a plan
  const removePlan = (index: number) => {
    const updatedPlans = [...pricingSection.plans];
    updatedPlans.splice(index, 1);
    updatePricingSection({ plans: updatedPlans });
  };

  // Function to add a feature to a plan
  const addFeatureToPlan = (planIndex: number, feature: string = 'New feature') => {
    const updatedPlans = [...pricingSection.plans];
    updatedPlans[planIndex].features.push(feature);
    updatePricingSection({ plans: updatedPlans });
  };

  // Function to update a feature in a plan
  const updatePlanFeature = (planIndex: number, featureIndex: number, feature: string) => {
    const updatedPlans = [...pricingSection.plans];
    updatedPlans[planIndex].features[featureIndex] = feature;
    updatePricingSection({ plans: updatedPlans });
  };

  // Function to remove a feature from a plan
  const removePlanFeature = (planIndex: number, featureIndex: number) => {
    const updatedPlans = [...pricingSection.plans];
    updatedPlans[planIndex].features.splice(featureIndex, 1);
    updatePricingSection({ plans: updatedPlans });
  };

  return {
    pricingSection,
    updatePricingSection,
    updatePlan,
    addPlan,
    removePlan,
    addFeatureToPlan,
    updatePlanFeature,
    removePlanFeature
  };
}; 