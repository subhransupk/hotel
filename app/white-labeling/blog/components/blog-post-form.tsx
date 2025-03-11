'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button, TextInput, Textarea, Card, Text } from '@tremor/react'
import { CalendarIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { format, parseISO } from 'date-fns'
import { cn } from '@/lib/utils'
import { BlogPost, BlogPostFormData } from '../types'

// Define the form schema with Zod
const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  content: z.string().min(50, { message: 'Content must be at least 50 characters' }),
  date: z.string().min(1, { message: 'Date is required' }),
  readTime: z.string().min(1, { message: 'Read time is required' }),
  tags: z.string().min(1, { message: 'At least one tag is required' }),
  author: z.string().min(1, { message: 'Author name is required' }),
  authorDesignation: z.string().min(1, { message: 'Author designation is required' }),
  // Image is handled separately
})

interface BlogPostFormProps {
  initialData?: BlogPost
  onCancel: () => void
  onSave: (data: BlogPost) => void
}

export function BlogPostForm({ initialData, onCancel, onSave }: BlogPostFormProps) {
  const [image, setImage] = useState<string | null>(initialData?.image || null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Format the initial date to YYYY-MM-DD for the date input
  const formatInitialDate = (dateString?: string) => {
    if (!dateString) return format(new Date(), 'yyyy-MM-dd');
    try {
      return format(parseISO(dateString), 'yyyy-MM-dd');
    } catch (e) {
      return format(new Date(), 'yyyy-MM-dd');
    }
  };
  
  // Initialize the form with default values
  const form = useForm<BlogPostFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || '',
      content: initialData?.content || '',
      date: formatInitialDate(initialData?.date),
      readTime: initialData?.readTime || '',
      tags: initialData?.tags ? initialData.tags.join(', ') : '',
      author: initialData?.author || '',
      authorDesignation: initialData?.authorDesignation || '',
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this to a server
      // For now, we'll create a local URL
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)
    }
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const onSubmit = (data: any) => {
    // Ensure date is in YYYY-MM-DD format
    const formattedDate = data.date;

    // Combine form data with image
    const formData: BlogPost = {
      ...data,
      date: formattedDate,
      image: image || '/images/blog/default.jpg', // Fallback to default image
      tags: data.tags.split(',').map((tag: string) => tag.trim()),
      id: initialData?.id || Date.now().toString(),
    }
    onSave(formData)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Upload */}
        <div className="space-y-2">
          <Text className="text-sm font-medium">Featured Image</Text>
          <div 
            onClick={handleImageClick}
            className={cn(
              "border-2 border-dashed rounded-lg p-4 h-[200px] flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors",
              image ? "border-blue-500" : "border-gray-300"
            )}
          >
            {image ? (
              <div className="relative w-full h-full">
                <Image
                  src={image}
                  alt="Blog post image"
                  fill
                  className="object-cover rounded-md"
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
                  Click to upload an image
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
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Text className="text-sm font-medium">Title</Text>
            <TextInput 
              placeholder="Enter blog post title" 
              {...form.register('title')}
              error={!!form.formState.errors.title}
              errorMessage={form.formState.errors.title?.message}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Date */}
            <div className="space-y-2">
              <Text className="text-sm font-medium">Publication Date</Text>
              <input 
                type="date" 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                {...form.register('date', { 
                  setValueAs: (value) => value // Keep as string
                })}
              />
              {form.formState.errors.date && (
                <Text className="text-sm text-red-500">{form.formState.errors.date.message}</Text>
              )}
            </div>

            {/* Read Time */}
            <div className="space-y-2">
              <Text className="text-sm font-medium">Read Time</Text>
              <TextInput 
                placeholder="e.g. 5 min" 
                {...form.register('readTime')}
                error={!!form.formState.errors.readTime}
                errorMessage={form.formState.errors.readTime?.message}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Text className="text-sm font-medium">Tags</Text>
        <TextInput 
          placeholder="Enter tags separated by commas" 
          {...form.register('tags')}
          error={!!form.formState.errors.tags}
          errorMessage={form.formState.errors.tags?.message}
        />
        <Text className="text-xs text-gray-500">
          Separate tags with commas (e.g. Design, Marketing, Tips)
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Author */}
        <div className="space-y-2">
          <Text className="text-sm font-medium">Author Name</Text>
          <TextInput 
            placeholder="Enter author name" 
            {...form.register('author')}
            error={!!form.formState.errors.author}
            errorMessage={form.formState.errors.author?.message}
          />
        </div>

        {/* Author Designation */}
        <div className="space-y-2">
          <Text className="text-sm font-medium">Author Designation</Text>
          <TextInput 
            placeholder="e.g. Content Strategist" 
            {...form.register('authorDesignation')}
            error={!!form.formState.errors.authorDesignation}
            errorMessage={form.formState.errors.authorDesignation?.message}
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Text className="text-sm font-medium">Content</Text>
        <Textarea 
          placeholder="Write your blog post content here..." 
          className="min-h-[200px]" 
          {...form.register('content')}
          error={!!form.formState.errors.content}
          errorMessage={form.formState.errors.content?.message}
        />
      </div>

      <div className="flex justify-end space-x-4">
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
          {initialData ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </form>
  )
} 