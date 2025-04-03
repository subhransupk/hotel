'use client'

import { useState, useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { 
  Button, 
  TextInput, 
  Textarea, 
  Text, 
  Select,
  SelectItem,
  Switch,
  Badge,
} from '@tremor/react'
import { 
  ArrowLeftIcon, 
  XMarkIcon, 
  DocumentIcon,
  DocumentTextIcon,
  DocumentChartBarIcon,
  PhotoIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { Document, DocumentFormData } from '../types'
import { cn } from '@/lib/utils'

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  description: z.string().min(5, { message: 'Description must be at least 5 characters' }),
  category: z.string().min(1, { message: 'Category is required' }),
  version: z.string().min(1, { message: 'Version is required' }),
  tags: z.string().optional(),
  isActive: z.boolean().default(true),
})

interface DocumentFormProps {
  initialData?: Document
  onCancel: () => void
  onSave: (data: Document) => void
}

export function DocumentForm({ initialData, onCancel, onSave }: DocumentFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Initialize the form with default values
  const form = useForm<DocumentFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      category: initialData?.category || 'legal',
      version: initialData?.version || '1.0',
      tags: initialData?.tags ? initialData.tags.join(', ') : '',
      isActive: initialData?.isActive ?? true,
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFileError(null);
    
    if (selectedFile) {
      // Validate file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setFileError('File size must be less than 10MB');
        return;
      }
      
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/jpeg', 'image/png'];
      if (!validTypes.includes(selectedFile.type)) {
        setFileError('File must be PDF, DOC, DOCX, XLS, XLSX, JPG, or PNG');
        return;
      }
      
      setFile(selectedFile);
      
      // Auto-fill name if empty
      if (!form.getValues('name')) {
        const fileName = selectedFile.name.split('.')[0];
        form.setValue('name', fileName, { shouldValidate: true });
      }
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = (data: DocumentFormData) => {
    // Simulate file upload
    if (!initialData && !file) {
      setFileError('Please select a file to upload');
      return;
    }
    
    setIsUploading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // In a real app, you would upload the file to a server and get a URL back
      const fileUrl = initialData?.fileUrl || `/documents/${file?.name || 'document.pdf'}`;
      const fileType = initialData?.fileType || file?.name.split('.').pop() || 'pdf';
      const fileSize = initialData?.fileSize || file?.size || 0;
      
      // Combine form data with file info
      const formData: Document = {
        ...data,
        id: initialData?.id || Date.now().toString(),
        fileUrl,
        fileType,
        fileSize,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
        lastUpdated: format(new Date(), 'yyyy-MM-dd'),
      };
      
      setIsUploading(false);
      onSave(formData);
    }, 1000);
  };

  // Get appropriate icon for file type
  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return <DocumentTextIcon className="h-10 w-10 text-red-500" />;
      case 'docx':
      case 'doc':
        return <DocumentIcon className="h-10 w-10 text-blue-500" />;
      case 'xlsx':
      case 'xls':
        return <DocumentChartBarIcon className="h-10 w-10 text-green-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <PhotoIcon className="h-10 w-10 text-purple-500" />;
      default:
        return <DocumentIcon className="h-10 w-10 text-gray-500" />;
    }
  };

  // Format file size to human-readable format
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

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
          Back to Documents
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - File Upload */}
        <div className="space-y-6 md:col-span-1">
          {/* File Upload */}
          <div className="space-y-2">
            <Text className="text-sm font-medium">Document File</Text>
            <div 
              onClick={handleFileClick}
              className={cn(
                "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors",
                file || initialData ? "border-blue-500" : "border-gray-300",
                isUploading ? "opacity-50" : ""
              )}
            >
              {isUploading ? (
                <div className="text-center">
                  <Text className="text-sm text-gray-500">Uploading document...</Text>
                </div>
              ) : file || initialData ? (
                <div className="relative w-full text-center">
                  <div className="flex flex-col items-center">
                    {getFileIcon(file?.name.split('.').pop() || initialData?.fileType || 'pdf')}
                    <Text className="mt-2 font-medium truncate max-w-full">
                      {file?.name || initialData?.name}
                    </Text>
                    <Text className="text-xs text-gray-500 mt-1">
                      {formatFileSize(file?.size || initialData?.fileSize || 0)}
                    </Text>
                  </div>
                  {!initialData && (
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <ArrowUpTrayIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <Text className="text-sm text-gray-500">
                    Click to upload a document
                  </Text>
                  <Text className="text-xs text-gray-500 mt-1">
                    PDF, DOC, DOCX, XLS, XLSX, JPG or PNG (max. 10MB)
                  </Text>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                className="hidden"
                disabled={!!initialData}
              />
            </div>
            {fileError && (
              <Text className="text-sm text-red-500">{fileError}</Text>
            )}
            {initialData && (
              <Text className="text-xs text-gray-500">
                To replace this document, please delete it and upload a new one.
              </Text>
            )}
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
              <SelectItem value="legal">Legal</SelectItem>
              <SelectItem value="templates">Templates</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="operational">Operational</SelectItem>
            </Select>
          </div>

          {/* Version */}
          <div className="space-y-2">
            <Text className="text-sm font-medium">Version</Text>
            <TextInput 
              placeholder="e.g. 1.0" 
              {...form.register('version')}
              error={!!form.formState.errors.version}
              errorMessage={form.formState.errors.version?.message}
            />
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
              Inactive documents won't be available to users
            </Text>
          </div>
        </div>

        {/* Right Column - Document Details */}
        <div className="space-y-6 md:col-span-2">
          {/* Document Name */}
          <div className="space-y-2">
            <Text className="text-sm font-medium">Document Name</Text>
            <TextInput 
              placeholder="Enter document name" 
              {...form.register('name')}
              error={!!form.formState.errors.name}
              errorMessage={form.formState.errors.name?.message}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Text className="text-sm font-medium">Description</Text>
            <Textarea 
              placeholder="Enter document description" 
              className="min-h-[120px]" 
              {...form.register('description')}
              error={!!form.formState.errors.description}
              errorMessage={form.formState.errors.description?.message}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Text className="text-sm font-medium">Tags</Text>
            <TextInput 
              placeholder="Enter tags separated by commas" 
              {...form.register('tags')}
            />
            <Text className="text-xs text-gray-500">
              Separate tags with commas (e.g. legal, terms, policy)
            </Text>
            {form.watch('tags') && (
              <div className="flex flex-wrap gap-1 mt-2">
                {form.watch('tags').split(',').map((tag, index) => (
                  tag.trim() && (
                    <Badge key={index} color="gray" size="sm">
                      {tag.trim()}
                    </Badge>
                  )
                ))}
              </div>
            )}
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
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : initialData ? 'Update Document' : 'Upload Document'}
        </Button>
      </div>
    </form>
  )
} 