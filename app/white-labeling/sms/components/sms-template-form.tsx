'use client'

import { useState, useEffect } from 'react'
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
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { SmsTemplate, SmsTemplateFormData } from '../types'

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  content: z.string().min(5, { message: 'Content must be at least 5 characters' }),
  category: z.string().min(1, { message: 'Category is required' }),
  variables: z.string().optional(),
  isActive: z.boolean().default(true),
})

interface SmsTemplateFormProps {
  initialData?: SmsTemplate
  onCancel: () => void
  onSave: (data: SmsTemplate) => void
}

export function SmsTemplateForm({ initialData, onCancel, onSave }: SmsTemplateFormProps) {
  const [characterCount, setCharacterCount] = useState(0);
  
  // Initialize the form with default values
  const form = useForm<SmsTemplateFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      content: initialData?.content || '',
      category: initialData?.category || 'transactional',
      variables: initialData?.variables ? initialData.variables.join(', ') : '',
      isActive: initialData?.isActive ?? true,
    },
  })

  // Update character count when content changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.content) {
        setCharacterCount(value.content.length);
      } else {
        setCharacterCount(0);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);

  // Extract variables from content
  const extractVariables = (content: string) => {
    const regex = /\{\{([^}]+)\}\}/g;
    const matches = content.match(regex) || [];
    return matches.map(match => match.replace(/\{\{|\}\}/g, ''));
  };

  // Insert variable at cursor position
  const insertVariable = (variable: string) => {
    const contentField = form.getValues('content');
    const textarea = document.getElementById('sms-content') as HTMLTextAreaElement;
    
    if (!textarea) return;
    
    const cursorPos = textarea.selectionStart;
    const textBefore = contentField.substring(0, cursorPos);
    const textAfter = contentField.substring(cursorPos);
    
    const newContent = `${textBefore}{{${variable}}}${textAfter}`;
    form.setValue('content', newContent, { shouldValidate: true });
    
    // Update variables field with extracted variables
    const extractedVars = extractVariables(newContent);
    form.setValue('variables', extractedVars.join(', '), { shouldValidate: true });
    
    // Set focus back to textarea and place cursor after inserted variable
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = cursorPos + variable.length + 4; // +4 for {{ and }}
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const onSubmit = (data: SmsTemplateFormData) => {
    // Extract variables from content if not manually specified
    let variables = data.variables ? data.variables.split(',').map(v => v.trim()) : [];
    
    if (variables.length === 0) {
      variables = extractVariables(data.content);
    }
    
    // Combine form data
    const formData: SmsTemplate = {
      ...data,
      id: initialData?.id || Date.now().toString(),
      variables,
      characterCount: data.content.length,
      lastUpdated: format(new Date(), 'yyyy-MM-dd'),
    }
    onSave(formData)
  }

  // Common variables for SMS templates
  const commonVariables = [
    'hotel_name',
    'customer_name',
    'check_in_date',
    'check_out_date',
    'confirmation_code',
    'booking_details',
    'amount',
    'transaction_id',
  ];

  // Format SMS content for preview by highlighting variables
  const formatSmsPreview = (content: string) => {
    return content.replace(/\{\{([^}]+)\}\}/g, (_, variable) => (
      `<span class="text-blue-500 font-medium">[${variable}]</span>`
    ));
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
          Back to Templates
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Basic Info */}
        <div className="space-y-6 md:col-span-1">
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
          
          {/* Common Variables */}
          <div className="space-y-2">
            <Text className="text-sm font-medium">Common Variables</Text>
            <div className="flex flex-wrap gap-1">
              {commonVariables.map((variable) => (
                <Badge 
                  key={variable} 
                  color="blue" 
                  size="sm"
                  className="cursor-pointer hover:bg-blue-600"
                  onClick={() => insertVariable(variable)}
                >
                  {variable}
                </Badge>
              ))}
            </div>
            <Text className="text-xs text-gray-500">
              Click on a variable to insert it at cursor position
            </Text>
          </div>
        </div>

        {/* Right Column - SMS Content */}
        <div className="space-y-6 md:col-span-2">
          {/* SMS Content */}
          <div className="space-y-2">
            <Text className="text-sm font-medium">SMS Content</Text>
            <Textarea 
              id="sms-content"
              placeholder="Enter SMS content. Use {{variable_name}} for dynamic content." 
              className="min-h-[200px]" 
              {...form.register('content')}
              error={!!form.formState.errors.content}
              errorMessage={form.formState.errors.content?.message}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Character count: {characterCount}</span>
              <span>
                {Math.ceil(characterCount / 160)} SMS segment(s)
                {characterCount > 160 && (
                  <span className="text-red-500 ml-1">
                    (Exceeds single SMS limit)
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* Variables */}
          <div className="space-y-2">
            <Text className="text-sm font-medium">Detected Variables</Text>
            <div className="min-h-[40px] p-2 border rounded-md bg-gray-50">
              {extractVariables(form.watch('content')).length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {extractVariables(form.watch('content')).map((variable) => (
                    <Badge key={variable} color="blue" size="sm">
                      {variable}
                    </Badge>
                  ))}
                </div>
              ) : (
                <Text className="text-sm text-gray-500">
                  No variables detected. Use {'{{'}<span className="text-blue-500">variable_name</span>{'}'} syntax in your content.
                </Text>
              )}
            </div>
            <Text className="text-xs text-gray-500">
              Variables are automatically detected from your content
            </Text>
          </div>
          
          {/* Preview */}
          <div className="space-y-2">
            <Text className="text-sm font-medium">Preview</Text>
            <div className="border rounded-md p-4 bg-gray-100 min-h-[100px]">
              {form.watch('content') ? (
                <div dangerouslySetInnerHTML={{ __html: formatSmsPreview(form.watch('content')) }} />
              ) : (
                <Text className="text-sm text-gray-500">
                  Enter content to see preview
                </Text>
              )}
            </div>
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