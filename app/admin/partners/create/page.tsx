'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  Title,
  Text,
  Button,
  TextInput,
  Select,
  SelectItem,
  Divider,
} from '@tremor/react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

// Form schema
const partnerSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  companyName: z.string().min(2, 'Company name is required'),
  partnerType: z.enum(['technology', 'hospitality_consultant', 'enterprise_chains', 'others']),
  website: z.string().url('Valid URL is required').optional().or(z.literal('')),
  description: z.string().optional(),
})

type PartnerFormValues = z.infer<typeof partnerSchema>

export default function CreatePartnerPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [apiResponse, setApiResponse] = useState<any>(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      companyName: '',
      partnerType: 'technology',
      website: '',
      description: '',
    },
  })

  const onSubmit = async (data: PartnerFormValues) => {
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)
    setApiResponse(null)

    try {
      console.log('Submitting form data:', data)
      
      // Create partner
      const response = await fetch('/api/admin/create-partner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()
      setApiResponse(responseData)
      
      console.log('API response:', responseData)

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to create partner')
      }

      toast.success('Partner created successfully!')
      setSuccess(`Partner created successfully! Partner ID: ${responseData.partnerId}`)
      reset()
    } catch (err) {
      console.error('Error creating partner:', err)
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      toast.error(errorMessage)
      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <Title>Create Partner Account</Title>
        <Text>Register a new partner to the platform</Text>
      </div>

      <Card className="max-w-2xl">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
            <p className="font-medium">Error: {error}</p>
            {apiResponse && apiResponse.error && (
              <p className="mt-1 text-sm">Details: {apiResponse.error}</p>
            )}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <TextInput
              id="email"
              placeholder="partner@example.com"
              error={!!errors.email}
              errorMessage={errors.email?.message}
              {...register('email')}
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <TextInput
              id="companyName"
              placeholder="Partner Company Ltd."
              error={!!errors.companyName}
              errorMessage={errors.companyName?.message}
              {...register('companyName')}
            />
          </div>

          <div>
            <label htmlFor="partnerType" className="block text-sm font-medium text-gray-700 mb-1">
              Partner Type
            </label>
            <Controller
              name="partnerType"
              control={control}
              render={({ field }) => (
                <Select
                  id="partnerType"
                  placeholder="Select partner type"
                  value={field.value}
                  onValueChange={field.onChange}
                  error={!!errors.partnerType}
                  errorMessage={errors.partnerType?.message}
                >
                  <SelectItem value="technology">Technology Provider</SelectItem>
                  <SelectItem value="hospitality_consultant">Hospitality Consultant</SelectItem>
                  <SelectItem value="enterprise_chains">Enterprise/Hotel Chains</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </Select>
              )}
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
              Website (Optional)
            </label>
            <TextInput
              id="website"
              placeholder="https://example.com"
              error={!!errors.website}
              errorMessage={errors.website?.message}
              {...register('website')}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              id="description"
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Brief description of the partner's services"
              {...register('description')}
            />
          </div>

          <Divider />

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Create Partner
            </Button>
          </div>
        </form>
        
        {apiResponse && (
          <div className="mt-6 p-3 bg-gray-50 border border-gray-200 rounded-md text-sm">
            <p className="font-medium mb-2">API Response:</p>
            <pre className="whitespace-pre-wrap overflow-auto max-h-60">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          </div>
        )}
      </Card>
    </div>
  )
} 