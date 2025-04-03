'use client'

import { useState } from 'react'
import { 
  Card, 
  Title, 
  Text, 
  Button, 
  TextInput,
  Textarea,
  Select,
  SelectItem,
  Switch,
  NumberInput,
  Flex,
  Divider,
} from '@tremor/react'
import { 
  PlusCircleIcon, 
  TrashIcon,
  KeyIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'
import { AdvancedSetting, AdvancedSettingFormData, SettingCategory, SettingType } from '../types'
import { z } from 'zod'

interface SettingFormProps {
  setting?: AdvancedSetting;
  onSave: (setting: AdvancedSettingFormData) => void;
  onCancel: () => void;
}

const SETTING_CATEGORIES: { value: SettingCategory; label: string }[] = [
  { value: 'security', label: 'Security' },
  { value: 'performance', label: 'Performance' },
  { value: 'customization', label: 'Customization' },
  { value: 'integration', label: 'Integration' },
  { value: 'experimental', label: 'Experimental' },
];

const SETTING_TYPES: { value: SettingType; label: string }[] = [
  { value: 'string', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'boolean', label: 'Toggle' },
  { value: 'select', label: 'Dropdown' },
];

const settingSchema = z.object({
  key: z.string().min(3).max(50),
  name: z.string().min(3).max(50),
  description: z.string().min(10).max(200),
  value: z.any(),
  defaultValue: z.any(),
  type: z.enum(['string', 'number', 'boolean', 'select']),
  category: z.enum(['security', 'performance', 'customization', 'integration', 'experimental']),
  isSecret: z.boolean().optional(),
  options: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ).optional(),
});

export function SettingForm({ setting, onSave, onCancel }: SettingFormProps) {
  const isEditing = !!setting;
  
  const [formData, setFormData] = useState<AdvancedSettingFormData>(
    setting 
      ? { 
          key: setting.key,
          name: setting.name,
          description: setting.description,
          value: setting.value,
          defaultValue: setting.defaultValue,
          type: setting.type,
          category: setting.category,
          isSecret: setting.isSecret || false,
          options: setting.options || [],
        } 
      : {
          key: '',
          name: '',
          description: '',
          value: '',
          defaultValue: '',
          type: 'string',
          category: 'customization',
          isSecret: false,
          options: [],
        }
  );
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  
  const handleChange = (field: keyof AdvancedSettingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    
    // Handle special case for type changes
    if (field === 'type') {
      // Reset value and defaultValue based on new type
      let newValue, newDefaultValue;
      
      switch (value) {
        case 'boolean':
          newValue = false;
          newDefaultValue = false;
          break;
        case 'number':
          newValue = 0;
          newDefaultValue = 0;
          break;
        case 'select':
          newValue = '';
          newDefaultValue = '';
          // Initialize options if empty
          if (!formData.options || formData.options.length === 0) {
            setFormData(prev => ({
              ...prev,
              options: [{ label: 'Option 1', value: 'option1' }],
            }));
          }
          break;
        default: // string
          newValue = '';
          newDefaultValue = '';
      }
      
      setFormData(prev => ({
        ...prev,
        value: newValue,
        defaultValue: newDefaultValue,
      }));
    }
  };
  
  const handleOptionChange = (index: number, field: 'label' | 'value', value: string) => {
    setFormData(prev => {
      const newOptions = [...(prev.options || [])];
      newOptions[index] = { ...newOptions[index], [field]: value };
      return { ...prev, options: newOptions };
    });
  };
  
  const addOption = () => {
    setFormData(prev => {
      const newOptions = [...(prev.options || [])];
      newOptions.push({ label: `Option ${newOptions.length + 1}`, value: `option${newOptions.length + 1}` });
      return { ...prev, options: newOptions };
    });
  };
  
  const removeOption = (index: number) => {
    setFormData(prev => {
      const newOptions = [...(prev.options || [])];
      newOptions.splice(index, 1);
      return { ...prev, options: newOptions };
    });
  };
  
  const validateForm = (): boolean => {
    try {
      settingSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          const field = err.path[0] as string;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };
  
  const handleSubmit = () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave(formData);
      setIsSaving(false);
    }, 500);
  };
  
  return (
    <Card>
      <div className="mb-6">
        <Title>{isEditing ? 'Edit Setting' : 'Add New Setting'}</Title>
        <Text className="mt-1">
          {isEditing 
            ? 'Modify the properties of this setting' 
            : 'Configure a new setting for your application'}
        </Text>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Text className="font-medium mb-2">Setting Key</Text>
            <TextInput
              placeholder="e.g., max_upload_size"
              value={formData.key}
              onChange={(e) => handleChange('key', e.target.value)}
              icon={KeyIcon}
              error={!!errors.key}
              errorMessage={errors.key}
              disabled={isEditing}
            />
            <Text className="text-xs text-gray-500 mt-1">
              Unique identifier for this setting (snake_case)
            </Text>
          </div>
          
          <div>
            <Text className="font-medium mb-2">Display Name</Text>
            <TextInput
              placeholder="e.g., Maximum Upload Size"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={!!errors.name}
              errorMessage={errors.name}
            />
            <Text className="text-xs text-gray-500 mt-1">
              User-friendly name shown in the UI
            </Text>
          </div>
        </div>
        
        <div>
          <Text className="font-medium mb-2">Description</Text>
          <Textarea
            placeholder="Describe what this setting controls and its impact..."
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            error={!!errors.description}
            errorMessage={errors.description}
          />
          <Text className="text-xs text-gray-500 mt-1">
            Helpful explanation for users
          </Text>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Text className="font-medium mb-2">Category</Text>
            <Select
              value={formData.category}
              onValueChange={(value) => handleChange('category', value)}
              error={!!errors.category}
              errorMessage={errors.category}
            >
              {SETTING_CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          
          <div>
            <Text className="font-medium mb-2">Setting Type</Text>
            <Select
              value={formData.type}
              onValueChange={(value) => handleChange('type', value as SettingType)}
              error={!!errors.type}
              errorMessage={errors.type}
              disabled={isEditing}
            >
              {SETTING_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </Select>
            {isEditing && (
              <Text className="text-xs text-gray-500 mt-1">
                Type cannot be changed after creation
              </Text>
            )}
          </div>
        </div>
        
        <Divider />
        
        <div>
          <Text className="font-medium mb-4">Setting Values</Text>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Text className="mb-2">Default Value</Text>
              {formData.type === 'string' && (
                <TextInput
                  placeholder="Default value"
                  value={formData.defaultValue}
                  onChange={(e) => handleChange('defaultValue', e.target.value)}
                />
              )}
              {formData.type === 'number' && (
                <NumberInput
                  placeholder="Default value"
                  value={formData.defaultValue}
                  onValueChange={(value) => handleChange('defaultValue', value)}
                />
              )}
              {formData.type === 'boolean' && (
                <Switch
                  checked={!!formData.defaultValue}
                  onChange={() => handleChange('defaultValue', !formData.defaultValue)}
                />
              )}
              {formData.type === 'select' && formData.options && formData.options.length > 0 && (
                <Select
                  value={formData.defaultValue}
                  onValueChange={(value) => handleChange('defaultValue', value)}
                >
                  {formData.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>
              )}
            </div>
            
            <div>
              <Text className="mb-2">Current Value</Text>
              {formData.type === 'string' && (
                <TextInput
                  placeholder="Current value"
                  value={formData.value}
                  onChange={(e) => handleChange('value', e.target.value)}
                />
              )}
              {formData.type === 'number' && (
                <NumberInput
                  placeholder="Current value"
                  value={formData.value}
                  onValueChange={(value) => handleChange('value', value)}
                />
              )}
              {formData.type === 'boolean' && (
                <Switch
                  checked={!!formData.value}
                  onChange={() => handleChange('value', !formData.value)}
                />
              )}
              {formData.type === 'select' && formData.options && formData.options.length > 0 && (
                <Select
                  value={formData.value}
                  onValueChange={(value) => handleChange('value', value)}
                >
                  {formData.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>
              )}
            </div>
          </div>
        </div>
        
        {formData.type === 'select' && (
          <div>
            <Flex justifyContent="between" alignItems="center" className="mb-3">
              <Text className="font-medium">Options</Text>
              <Button 
                size="xs" 
                variant="secondary" 
                icon={PlusCircleIcon}
                onClick={addOption}
              >
                Add Option
              </Button>
            </Flex>
            
            {formData.options && formData.options.length > 0 ? (
              <div className="space-y-3">
                {formData.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <TextInput
                      placeholder="Label"
                      value={option.label}
                      onChange={(e) => handleOptionChange(index, 'label', e.target.value)}
                      className="flex-1"
                    />
                    <TextInput
                      placeholder="Value"
                      value={option.value}
                      onChange={(e) => handleOptionChange(index, 'value', e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      size="xs"
                      variant="light"
                      color="red"
                      icon={TrashIcon}
                      onClick={() => removeOption(index)}
                      disabled={formData.options?.length === 1}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Text className="text-gray-500">No options defined</Text>
            )}
          </div>
        )}
        
        <div>
          <Flex alignItems="center">
            <Switch
              checked={!!formData.isSecret}
              onChange={() => handleChange('isSecret', !formData.isSecret)}
            />
            <div className="ml-2">
              <Text className="font-medium">Sensitive Setting</Text>
              <Text className="text-xs text-gray-500">
                Mask this value in the UI and logs
              </Text>
            </div>
            <ShieldCheckIcon className="h-5 w-5 text-gray-400 ml-2" />
          </Flex>
        </div>
        
        <Divider />
        
        <div className="flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isSaving}
            loading={isSaving}
          >
            {isEditing ? 'Save Changes' : 'Create Setting'}
          </Button>
        </div>
      </div>
    </Card>
  );
} 