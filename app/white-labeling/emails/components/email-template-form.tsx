'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { 
  Button, 
  TextInput, 
  Textarea, 
  Text, 
  Card,
  Select,
  SelectItem,
  Switch,
} from '@tremor/react'
import { XMarkIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { EmailTemplate, EmailTemplateFormData } from '../types'

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters' }),
  category: z.string().min(1, { message: 'Category is required' }),
  content: z.string().min(20, { message: 'Content must be at least 20 characters' }),
  variables: z.string().optional(),
  isActive: z.boolean().default(true),
})

interface EmailTemplateFormProps {
  initialData?: EmailTemplate
  onCancel: () => void
  onSave: (data: EmailTemplate) => void
}

// Default placeholder images for email templates
const DEFAULT_PREVIEW_IMAGES = {
  transactional: '/images/emails/default-transactional.jpg',
  marketing: '/images/emails/default-marketing.jpg',
  notifications: '/images/emails/default-notification.jpg',
}

export function EmailTemplateForm({ initialData, onCancel, onSave }: EmailTemplateFormProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [imageError, setImageError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Initialize the form with default values
  const form = useForm<EmailTemplateFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      subject: initialData?.subject || '',
      category: initialData?.category || 'transactional',
      content: initialData?.content || '',
      variables: initialData?.variables ? initialData.variables.join(', ') : '',
      isActive: initialData?.isActive ?? true,
    },
  })

  // Set initial preview image when component mounts or initialData changes
  useEffect(() => {
    if (initialData?.previewImage) {
      setPreviewImage(initialData.previewImage);
    } else {
      // Set default image based on selected category
      const category = form.watch('category') as keyof typeof DEFAULT_PREVIEW_IMAGES;
      setPreviewImage(DEFAULT_PREVIEW_IMAGES[category] || DEFAULT_PREVIEW_IMAGES.transactional);
    }
  }, [initialData, form]);

  // Update preview image when category changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'category' && !initialData?.previewImage && !previewImage?.startsWith('blob:')) {
        const category = value.category as keyof typeof DEFAULT_PREVIEW_IMAGES;
        setPreviewImage(DEFAULT_PREVIEW_IMAGES[category] || DEFAULT_PREVIEW_IMAGES.transactional);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form, initialData, previewImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setImageError(null)
    
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setImageError('Image size must be less than 2MB')
        return
      }
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']
      if (!validTypes.includes(file.type)) {
        setImageError('Image must be JPG, PNG, GIF, or SVG')
        return
      }
      
      setIsImageLoading(true)
      
      // In a real app, you would upload this to a server
      // For now, we'll create a local URL
      const imageUrl = URL.createObjectURL(file)
      
      // Set the preview image directly without pre-loading
      setPreviewImage(imageUrl)
      setIsImageLoading(false)
    }
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    
    // If we're removing a blob URL, revoke it to prevent memory leaks
    if (previewImage?.startsWith('blob:')) {
      URL.revokeObjectURL(previewImage)
    }
    
    // Set default image based on selected category
    const category = form.watch('category') as keyof typeof DEFAULT_PREVIEW_IMAGES;
    setPreviewImage(DEFAULT_PREVIEW_IMAGES[category] || DEFAULT_PREVIEW_IMAGES.transactional);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const onSubmit = (data: EmailTemplateFormData) => {
    // Combine form data with image
    const formData: EmailTemplate = {
      ...data,
      id: initialData?.id || Date.now().toString(),
      previewImage: previewImage || DEFAULT_PREVIEW_IMAGES.transactional,
      variables: data.variables ? data.variables.split(',').map(v => v.trim()) : [],
      lastUpdated: format(new Date(), 'yyyy-MM-dd'),
    }
    onSave(formData)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Back Button */}
      <div>
        <Button
          type="button"
          variant="light"
          icon={ArrowLeftIcon}
          onClick={onCancel}
          className="mb-4"
        >
          Back to Templates
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Template Name */}
          <div className="space-y-2">
            <Text className="text-sm font-medium">Template Name</Text>
            <TextInput 
              placeholder="Enter template name" 
              {...form.register('name')}
              error={!!form.formState.errors.name}
              errorMessage={form.formState.errors.name?.message}
            />
          </div>

          {/* Subject Line */}
          <div className="space-y-2">
            <Text className="text-sm font-medium">Subject Line</Text>
            <TextInput 
              placeholder="Enter email subject" 
              {...form.register('subject')}
              error={!!form.formState.errors.subject}
              errorMessage={form.formState.errors.subject?.message}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Text className="text-sm font-medium">Category</Text>
            <Select
              value={form.watch('category')}
              onValueChange={(value) => form.setValue('category', value)}
              placeholder="Select a category"
              error={!!form.formState.errors.category}
              errorMessage={form.formState.errors.category?.message}
            >
              <SelectItem value="transactional">Transactional</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="notifications">Notifications</SelectItem>
            </Select>
          </div>

          {/* Variables */}
          <div className="space-y-2">
            <Text className="text-sm font-medium">Template Variables</Text>
            <TextInput 
              placeholder="Enter variables separated by commas" 
              {...form.register('variables')}
              error={!!form.formState.errors.variables}
              errorMessage={form.formState.errors.variables?.message}
            />
            <Text className="text-xs text-gray-500">
              Separate variables with commas (e.g. user_name, company_name, login_url)
            </Text>
          </div>

          {/* Active Status */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch 
                checked={form.watch('isActive')} 
                onChange={(checked) => form.setValue('isActive', checked)}
              />
              <Text className="text-sm font-medium">
                {form.watch('isActive') ? 'Active' : 'Inactive'}
              </Text>
            </div>
            <Text className="text-xs text-gray-500">
              Inactive templates won't be sent to users
            </Text>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Preview Image */}
          <div className="space-y-2">
            <Text className="text-sm font-medium">Preview Image</Text>
            <div 
              onClick={handleImageClick}
              className={cn(
                "border-2 border-dashed rounded-lg p-4 h-[150px] flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors",
                previewImage ? "border-blue-500" : "border-gray-300",
                isImageLoading ? "opacity-50" : ""
              )}
            >
              {isImageLoading ? (
                <div className="text-center">
                  <Text className="text-sm text-gray-500">Loading image...</Text>
                </div>
              ) : previewImage ? (
                <div className="relative w-full h-full">
                  <Image
                    src={previewImage}
                    alt="Email template preview"
                    fill
                    className="object-cover rounded-md"
                    onError={() => setImageError('Failed to load image')}
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Text className="text-sm text-gray-500">
                    Click to upload a preview image
                  </Text>
                  <Text className="text-xs text-gray-500 mt-1">
                    SVG, PNG, JPG or GIF (max. 2MB)
                  </Text>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/jpeg,image/png,image/gif,image/svg+xml"
                className="hidden"
              />
            </div>
            {imageError && (
              <Text className="text-sm text-red-500">{imageError}</Text>
            )}
          </div>

          {/* Email Content */}
          <div className="space-y-2">
            <Text className="text-sm font-medium">Email Content (HTML)</Text>
            <Textarea 
              placeholder="Enter HTML content for your email template" 
              className="min-h-[250px] font-mono text-sm" 
              {...form.register('content')}
              error={!!form.formState.errors.content}
              errorMessage={form.formState.errors.content?.message}
            />
            <Text className="text-xs text-gray-500">
              Use HTML to format your email. Variables can be included using {'{variable_name}'} syntax.
            </Text>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          {initialData ? 'Update Template' : 'Create Template'}
        </Button>
      </div>
    </form>
  )
} 