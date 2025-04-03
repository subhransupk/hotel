'use client'

import { useState } from 'react'
import { z } from 'zod'
import { 
  Card,
  Text,
  TextInput,
  Button,
  Switch,
  Title,
  Subtitle,
  Grid,
  Col,
  Select,
  SelectItem,
  Flex,
} from '@tremor/react'
import { 
  ArrowLeftIcon,
  LanguageIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  ArrowsRightLeftIcon,
} from '@heroicons/react/24/outline'
import { Language, LanguageFormData } from '../types'

// Form validation schema
const formSchema = z.object({
  code: z.string().min(2, 'Language code is required').max(5, 'Language code should be 2-5 characters'),
  name: z.string().min(1, 'Language name is required'),
  nativeName: z.string().min(1, 'Native name is required'),
  isDefault: z.boolean().default(false),
  isActive: z.boolean().default(true),
  direction: z.enum(['ltr', 'rtl']).default('ltr'),
});

type FormErrors = {
  [K in keyof z.infer<typeof formSchema>]?: string;
};

interface LanguageFormProps {
  initialData?: Language;
  onCancel: () => void;
  onSave: (data: LanguageFormData) => void;
  existingLanguages: Language[];
}

// Common language options for the dropdown
const COMMON_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', direction: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', direction: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', direction: 'ltr' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', direction: 'ltr' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', direction: 'ltr' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', direction: 'ltr' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', direction: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', direction: 'ltr' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', direction: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', direction: 'rtl' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', direction: 'ltr' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', direction: 'ltr' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', direction: 'ltr' },
];

export function LanguageForm({ initialData, onCancel, onSave, existingLanguages }: LanguageFormProps) {
  const [formData, setFormData] = useState<LanguageFormData>({
    code: initialData?.code || '',
    name: initialData?.name || '',
    nativeName: initialData?.nativeName || '',
    isDefault: initialData?.isDefault ?? false,
    isActive: initialData?.isActive ?? true,
    direction: initialData?.direction || 'ltr',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (field: keyof LanguageFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when field is edited
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };
  
  const handleLanguageSelect = (code: string) => {
    const selectedLanguage = COMMON_LANGUAGES.find(lang => lang.code === code);
    if (selectedLanguage) {
      setFormData(prev => ({
        ...prev,
        code: selectedLanguage.code,
        name: selectedLanguage.name,
        nativeName: selectedLanguage.nativeName,
        direction: selectedLanguage.direction as 'ltr' | 'rtl',
      }));
      
      // Clear errors for updated fields
      setErrors({});
    }
  };
  
  const validateForm = (): boolean => {
    try {
      formSchema.parse(formData);
      
      // Check if language code already exists (except for the current language being edited)
      if (!initialData && existingLanguages.some(lang => lang.code === formData.code)) {
        setErrors({ code: 'This language code already exists' });
        return false;
      }
      
      if (initialData && formData.code !== initialData.code && 
          existingLanguages.some(lang => lang.code === formData.code)) {
        setErrors({ code: 'This language code already exists' });
        return false;
      }
      
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.errors.forEach(err => {
          const path = err.path[0] as keyof FormErrors;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave(formData);
      setIsSubmitting(false);
    }, 500);
  };
  
  // Filter out languages that are already added
  const availableLanguages = COMMON_LANGUAGES.filter(
    lang => !existingLanguages.some(existing => existing.code === lang.code) || 
           (initialData && initialData.code === lang.code)
  );
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 flex items-center">
        <Button
          variant="light"
          icon={ArrowLeftIcon}
          onClick={onCancel}
          className="mr-4"
        >
          Back
        </Button>
        <div>
          <Title>{initialData ? 'Edit Language' : 'Add New Language'}</Title>
          <Subtitle>
            {initialData 
              ? 'Update language settings and translations' 
              : 'Add a new language to your platform'}
          </Subtitle>
        </div>
      </div>
      
      <Grid numItems={1} numItemsMd={2} className="gap-6 mt-6">
        <Col numColSpan={1} numColSpanMd={2}>
          <Card>
            <Title>Quick Add</Title>
            <Text className="mt-2">
              Select from common languages to automatically fill in the details
            </Text>
            
            <div className="mt-4">
              <Select 
                placeholder="Select a language..."
                onValueChange={handleLanguageSelect}
              >
                {availableLanguages.map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    <div className="flex items-center">
                      <span>{language.name}</span>
                      <span className="ml-2 text-gray-500">({language.nativeName})</span>
                      {language.direction === 'rtl' && (
                        <ArrowsRightLeftIcon className="ml-2 h-4 w-4 text-amber-500" />
                      )}
                    </div>
                  </SelectItem>
                ))}
              </Select>
            </div>
          </Card>
        </Col>
        
        <Col numColSpan={1} numColSpanMd={1}>
          <Card>
            <Title>Language Information</Title>
            <Text className="mt-2">
              Configure the basic settings for this language
            </Text>
            
            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                  Language Code
                </label>
                <TextInput
                  id="code"
                  placeholder="en"
                  value={formData.code}
                  onChange={(e) => handleChange('code', e.target.value)}
                  error={!!errors.code}
                  errorMessage={errors.code}
                  disabled={initialData?.isDefault} // Cannot change code of default language
                />
                <Text className="text-xs text-gray-500 mt-1">
                  ISO language code (e.g., en, es, fr)
                </Text>
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Language Name
                </label>
                <TextInput
                  id="name"
                  placeholder="English"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  error={!!errors.name}
                  errorMessage={errors.name}
                />
                <Text className="text-xs text-gray-500 mt-1">
                  The name of the language in English
                </Text>
              </div>
              
              <div>
                <label htmlFor="nativeName" className="block text-sm font-medium text-gray-700 mb-1">
                  Native Name
                </label>
                <TextInput
                  id="nativeName"
                  placeholder="English"
                  value={formData.nativeName}
                  onChange={(e) => handleChange('nativeName', e.target.value)}
                  error={!!errors.nativeName}
                  errorMessage={errors.nativeName}
                />
                <Text className="text-xs text-gray-500 mt-1">
                  The name of the language in its native form
                </Text>
              </div>
            </div>
          </Card>
        </Col>
        
        <Col numColSpan={1} numColSpanMd={1}>
          <Card>
            <Title>Display Settings</Title>
            <Text className="mt-2">
              Configure how this language is displayed and used
            </Text>
            
            <div className="mt-6 space-y-6">
              <div>
                <label htmlFor="direction" className="block text-sm font-medium text-gray-700 mb-1">
                  Text Direction
                </label>
                <Select
                  id="direction"
                  value={formData.direction}
                  onValueChange={(value) => handleChange('direction', value)}
                >
                  <SelectItem value="ltr">
                    <Flex alignItems="center" justifyContent="start">
                      <ArrowsRightLeftIcon className="h-5 w-5 text-gray-500 mr-2" />
                      <span>Left to Right (LTR)</span>
                    </Flex>
                  </SelectItem>
                  <SelectItem value="rtl">
                    <Flex alignItems="center" justifyContent="start">
                      <ArrowsRightLeftIcon className="h-5 w-5 text-amber-500 mr-2" />
                      <span>Right to Left (RTL)</span>
                    </Flex>
                  </SelectItem>
                </Select>
                <Text className="text-xs text-gray-500 mt-1">
                  The reading direction for this language
                </Text>
              </div>
              
              <div className="pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="font-medium">Active Status</Text>
                    <Text className="text-xs text-gray-500">
                      Enable this language for users
                    </Text>
                  </div>
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(value) => handleChange('isActive', value)}
                    disabled={formData.isDefault} // Cannot deactivate default language
                  />
                </div>
                {!formData.isActive && (
                  <div className="flex items-start mt-2 p-2 bg-yellow-50 rounded-md">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                    <Text className="text-xs text-yellow-700">
                      Inactive languages won't be available to users in the language selector.
                    </Text>
                  </div>
                )}
              </div>
              
              <div className="pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="font-medium">Default Language</Text>
                    <Text className="text-xs text-gray-500">
                      Set as the default language for all users
                    </Text>
                  </div>
                  <Switch
                    id="isDefault"
                    checked={formData.isDefault}
                    onChange={(value) => {
                      handleChange('isDefault', value);
                      if (value) {
                        // If setting as default, ensure it's active
                        handleChange('isActive', true);
                      }
                    }}
                    disabled={initialData?.isDefault || !formData.isActive} // Cannot change default status if it's already default or if it's inactive
                  />
                </div>
                {formData.isDefault && (
                  <div className="flex items-start mt-2 p-2 bg-blue-50 rounded-md">
                    <InformationCircleIcon className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <Text className="text-xs text-blue-700">
                      This will be the fallback language when a user's preferred language is not available.
                    </Text>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </Col>
      </Grid>
      
      <div className="mt-6 flex justify-end space-x-3">
        <Button
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {initialData ? 'Update Language' : 'Add Language'}
        </Button>
      </div>
    </form>
  )
} 