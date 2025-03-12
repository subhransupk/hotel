'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  Title,
  TextInput,
  Button,
  Divider,
} from '@tremor/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Form schema
const onboardingSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  hotelName: z.string().min(2, 'Hotel name is required'),
  phoneNumber: z.string().min(10, 'Valid phone number is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().optional(),
  country: z.string().min(2, 'Country is required'),
  postalCode: z.string().optional(),
});

type OnboardingFormValues = z.infer<typeof onboardingSchema>

export default function OnboardingPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      firstName: 'John',
      lastName: 'Doe',
      hotelName: 'Demo Hotel',
      phoneNumber: '1234567890',
      address: '123 Main St',
      city: 'Demo City',
      state: 'Demo State',
      country: 'Demo Country',
      postalCode: '12345',
    },
  });

  const onSubmit = async (data: OnboardingFormValues) => {
    setIsSubmitting(true);
    setError(null);
    setDebugInfo(`Submitting form`);

    try {
      // Simulate successful submission
      setTimeout(() => {
        setDebugInfo('Onboarding completed successfully! Redirecting to dashboard...');
        
        // Redirect to dashboard
        window.location.href = '/dashboard';
      }, 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setDebugInfo(`Error: ${errorMessage}`);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Complete Your Profile</h1>
          <p className="mt-2 text-gray-600">
            Please provide your hotel information to get started
          </p>
        </div>

        <Card>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          {debugInfo && process.env.NODE_ENV === 'development' && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-md text-xs">
              <strong>Debug Info:</strong> {debugInfo}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Title className="text-xl mb-4">Personal Information</Title>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <TextInput
                    id="firstName"
                    placeholder="John"
                    error={!!errors.firstName}
                    errorMessage={errors.firstName?.message}
                    {...register('firstName')}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <TextInput
                    id="lastName"
                    placeholder="Doe"
                    error={!!errors.lastName}
                    errorMessage={errors.lastName?.message}
                    {...register('lastName')}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <TextInput
                  id="phoneNumber"
                  placeholder="+1 (555) 123-4567"
                  error={!!errors.phoneNumber}
                  errorMessage={errors.phoneNumber?.message}
                  {...register('phoneNumber')}
                />
              </div>
            </div>

            <Divider />

            <div>
              <Title className="text-xl mb-4">Hotel Information</Title>
              <div>
                <label htmlFor="hotelName" className="block text-sm font-medium text-gray-700 mb-1">
                  Hotel Name
                </label>
                <TextInput
                  id="hotelName"
                  placeholder="Sunset Resort & Spa"
                  error={!!errors.hotelName}
                  errorMessage={errors.hotelName?.message}
                  {...register('hotelName')}
                />
              </div>

              <div className="mt-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <TextInput
                  id="address"
                  placeholder="123 Main Street"
                  error={!!errors.address}
                  errorMessage={errors.address?.message}
                  {...register('address')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <TextInput
                    id="city"
                    placeholder="New York"
                    error={!!errors.city}
                    errorMessage={errors.city?.message}
                    {...register('city')}
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province
                  </label>
                  <TextInput
                    id="state"
                    placeholder="NY"
                    error={!!errors.state}
                    errorMessage={errors.state?.message}
                    {...register('state')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <TextInput
                    id="country"
                    placeholder="United States"
                    error={!!errors.country}
                    errorMessage={errors.country?.message}
                    {...register('country')}
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <TextInput
                    id="postalCode"
                    placeholder="10001"
                    error={!!errors.postalCode}
                    errorMessage={errors.postalCode?.message}
                    {...register('postalCode')}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                color="blue"
                size="lg"
                loading={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Complete Onboarding'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
} 