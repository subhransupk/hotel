'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import {
  Card,
  Title,
  Text,
  TextInput,
  Button,
  Divider,
} from '@tremor/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

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
  const { user, isLoaded, isSignedIn } = useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      hotelName: '',
      phoneNumber: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    },
  });

  // Update form with user data when loaded
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        hotelName: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
      });
      
      setDebugInfo(`User loaded: ${user.id}, ${user.firstName} ${user.lastName}, ${user.emailAddresses[0]?.emailAddress}`);
    }
  }, [user, reset]);

  const onSubmit = async (data: OnboardingFormValues) => {
    if (!user) {
      setError('User not authenticated. Please sign in again.');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    setDebugInfo(`Submitting form for user: ${user.id}`);

    try {
      // Submit the onboarding data
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          ...data,
        }),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        setDebugInfo(`Error response: ${JSON.stringify(responseData)}`);
        throw new Error(responseData.message || 'Failed to complete onboarding');
      }

      setDebugInfo(`Success response: ${JSON.stringify(responseData)}`);
      
      // Show success message before redirecting
      setDebugInfo('Onboarding completed successfully! Redirecting to dashboard...');
      
      // Add a longer delay before redirecting to ensure state is updated in Supabase
      setTimeout(() => {
        // Use window.location for a full page refresh to ensure state is reset
        window.location.href = '/dashboard';
      }, 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setDebugInfo(`Error: ${errorMessage}`);
      setIsSubmitting(false);
    }
  };

  // If user is not loaded or not signed in, show loading state
  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading...</h2>
          <p className="mt-2 text-gray-600">Please wait while we prepare your onboarding.</p>
        </div>
      </div>
    );
  }

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
                    State/Province (Optional)
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
                    Postal Code (Optional)
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
                loading={isSubmitting}
                disabled={isSubmitting}
                className="w-full md:w-auto"
              >
                Complete Setup
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
} 