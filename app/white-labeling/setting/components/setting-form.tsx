'use client'

import { useState, useEffect } from 'react'
import { 
  Card, 
  Title, 
  Text, 
  TextInput, 
  NumberInput, 
  Select, 
  SelectItem, 
  Switch, 
  Button, 
  Badge,
  Divider,
} from '@tremor/react'
import { 
  ExclamationTriangleIcon, 
  EyeIcon, 
  EyeSlashIcon,
  ShieldCheckIcon,
  BoltIcon,
  PaintBrushIcon,
  LinkIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline'
import { AdvancedSetting, AdvancedSettingFormData, SettingCategory } from '../types'

interface SettingFormProps {
  setting?: AdvancedSetting;
  onSave: (data: AdvancedSettingFormData) => void;
  onCancel: () => void;
  isNew?: boolean;
}

export function SettingForm({ setting, onSave, onCancel, isNew = false }: SettingFormProps) {
  const [formData, setFormData] = useState<AdvancedSettingFormData>({
    key: setting?.key || '',
    name: setting?.name || '',
    description: setting?.description || '',
    value: setting?.value || '',
    defaultValue: setting?.defaultValue || '',
    type: setting?.type || 'string',
    category: setting?.category || 'customization',
    isSecret: setting?.isSecret || false,
    options: setting?.options || [],
  });
  
  const [showSecret, setShowSecret] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate form data
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.key) newErrors.key = 'Key is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (formData.type === 'select' && (!formData.options || formData.options.length === 0)) {
      newErrors.options = 'Options are required for select type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        onSave(formData);
        setIsSubmitting(false);
      }, 1000);
    }
  };

  // Handle form field changes
  const handleChange = (field: keyof AdvancedSettingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for the field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    
    // Special handling for type changes
    if (field === 'type') {
      // Reset value based on type
      let newValue: any = '';
      
      switch (value) {
        case 'boolean':
          newValue = false;
          break;
        case 'number':
          newValue = 0;
          break;
        case 'select':
          newValue = '';
          break;
        default:
          newValue = '';
      }
      
      setFormData(prev => ({ 
        ...prev, 
        value: newValue,
        defaultValue: newValue,
      }));
    }
  };

  // Handle options management for select type
  const [newOption, setNewOption] = useState('');
  
  const addOption = () => {
    if (newOption && !formData.options.includes(newOption)) {
      setFormData(prev => ({
        ...prev,
        options: [...prev.options, newOption]
      }));
      setNewOption('');
    }
  };
  
  const removeOption = (option: string) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter(o => o !== option)
    }));
  };

  const getCategoryIcon = (category: SettingCategory) => {
    switch (category) {
      case 'security':
        return <ShieldCheckIcon className="h-5 w-5" />;
      case 'performance':
        return <BoltIcon className="h-5 w-5" />;
      case 'customization':
        return <PaintBrushIcon className="h-5 w-5" />;
      case 'integration':
        return <LinkIcon className="h-5 w-5" />;
      case 'experimental':
        return <BeakerIcon className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: SettingCategory): "slate" | "gray" | "zinc" | "neutral" | "stone" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose" => {
    switch (category) {
      case 'security':
        return 'rose';
      case 'performance':
        return 'amber';
      case 'customization':
        return 'blue';
      case 'integration':
        return 'emerald';
      case 'experimental':
        return 'slate';
      default:
        return 'gray';
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <Title>{isNew ? 'Create New Setting' : 'Edit Setting'}</Title>
            <Text className="text-gray-500">
              {isNew 
                ? 'Add a new configuration setting to your application.' 
                : 'Modify the existing configuration setting.'}
            </Text>
          </div>

          <Divider />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label htmlFor="key" className="block text-sm font-medium text-gray-700">
                  Setting Key
                </label>
                <TextInput
                  id="key"
                  placeholder="e.g. app_timeout_seconds"
                  value={formData.key}
                  onChange={(e) => handleChange('key', e.target.value)}
                  error={!!errors.key}
                  errorMessage={errors.key}
                  disabled={!isNew}
                />
                <Text className="text-xs text-gray-500 mt-1">
                  Unique identifier used in code. Use snake_case.
                </Text>
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Display Name
                </label>
                <TextInput
                  id="name"
                  placeholder="e.g. Application Timeout"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  error={!!errors.name}
                  errorMessage={errors.name}
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <TextInput
                  id="description"
                  placeholder="Describe what this setting controls..."
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                />
              </div>
            </div>
            
            {/* Type and Category */}
            <div className="space-y-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Setting Type
                </label>
                <Select
                  id="type"
                  value={formData.type}
                  onValueChange={(value) => handleChange('type', value)}
                  disabled={!isNew}
                >
                  <SelectItem value="string">Text</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="boolean">Boolean</SelectItem>
                  <SelectItem value="select">Select</SelectItem>
                </Select>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <Select
                  id="category"
                  value={formData.category}
                  onValueChange={(value) => handleChange('category', value as SettingCategory)}
                >
                  <SelectItem value="security" icon={ShieldCheckIcon}>Security</SelectItem>
                  <SelectItem value="performance" icon={BoltIcon}>Performance</SelectItem>
                  <SelectItem value="customization" icon={PaintBrushIcon}>Customization</SelectItem>
                  <SelectItem value="integration" icon={LinkIcon}>Integration</SelectItem>
                  <SelectItem value="experimental" icon={BeakerIcon}>Experimental</SelectItem>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="isSecret"
                  checked={formData.isSecret}
                  onChange={() => handleChange('isSecret', !formData.isSecret)}
                />
                <label htmlFor="isSecret" className="text-sm font-medium text-gray-700">
                  Sensitive Information
                </label>
                <Badge color="red" size="xs">
                  Secret
                </Badge>
              </div>
            </div>
          </div>
          
          <Divider />
          
          {/* Value Section */}
          <div className="space-y-4">
            <Title className="text-lg">Setting Values</Title>
            
            {/* Current Value */}
            <div>
              <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                Current Value
              </label>
              
              {formData.type === 'string' && (
                <div className="relative">
                  {formData.isSecret ? (
                    <>
                      <TextInput
                        id="value"
                        type={showSecret ? 'text' : 'password'}
                        value={formData.value as string}
                        onChange={(e) => handleChange('value', e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowSecret(!showSecret)}
                      >
                        {showSecret ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </>
                  ) : (
                    <TextInput
                      id="value"
                      value={formData.value as string}
                      onChange={(e) => handleChange('value', e.target.value)}
                    />
                  )}
                </div>
              )}
              
              {formData.type === 'number' && (
                <NumberInput
                  id="value"
                  value={formData.value as number}
                  onValueChange={(value) => handleChange('value', value)}
                />
              )}
              
              {formData.type === 'boolean' && (
                <Switch
                  id="value"
                  checked={formData.value as boolean}
                  onChange={() => handleChange('value', !(formData.value as boolean))}
                />
              )}
              
              {formData.type === 'select' && (
                <Select
                  id="value"
                  value={formData.value as string}
                  onValueChange={(value) => handleChange('value', value)}
                  placeholder="Select a value"
                  error={formData.options.length === 0}
                  errorMessage="No options available"
                >
                  {formData.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </Select>
              )}
            </div>
            
            {/* Default Value */}
            <div>
              <label htmlFor="defaultValue" className="block text-sm font-medium text-gray-700">
                Default Value
              </label>
              
              {formData.type === 'string' && (
                <div className="relative">
                  {formData.isSecret ? (
                    <>
                      <TextInput
                        id="defaultValue"
                        type={showSecret ? 'text' : 'password'}
                        value={formData.defaultValue as string}
                        onChange={(e) => handleChange('defaultValue', e.target.value)}
                      />
                    </>
                  ) : (
                    <TextInput
                      id="defaultValue"
                      value={formData.defaultValue as string}
                      onChange={(e) => handleChange('defaultValue', e.target.value)}
                    />
                  )}
                </div>
              )}
              
              {formData.type === 'number' && (
                <NumberInput
                  id="defaultValue"
                  value={formData.defaultValue as number}
                  onValueChange={(value) => handleChange('defaultValue', value)}
                />
              )}
              
              {formData.type === 'boolean' && (
                <Switch
                  id="defaultValue"
                  checked={formData.defaultValue as boolean}
                  onChange={() => handleChange('defaultValue', !(formData.defaultValue as boolean))}
                />
              )}
              
              {formData.type === 'select' && (
                <Select
                  id="defaultValue"
                  value={formData.defaultValue as string}
                  onValueChange={(value) => handleChange('defaultValue', value)}
                  placeholder="Select a default value"
                  error={formData.options.length === 0}
                  errorMessage="No options available"
                >
                  {formData.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </Select>
              )}
            </div>
            
            {/* Options Management for Select Type */}
            {formData.type === 'select' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Options
                </label>
                <div className="flex space-x-2">
                  <TextInput
                    placeholder="Add new option"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    error={!!errors.options}
                    errorMessage={errors.options}
                  />
                  <Button type="button" onClick={addOption}>
                    Add
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.options.map((option) => (
                    <Badge
                      key={option}
                      color="blue"
                      className="flex items-center space-x-1"
                    >
                      <span>{option}</span>
                      <button
                        type="button"
                        className="ml-1 text-blue-700 hover:text-blue-900"
                        onClick={() => removeOption(option)}
                      >
                        &times;
                      </button>
                    </Badge>
                  ))}
                  
                  {formData.options.length === 0 && (
                    <Text className="text-sm text-gray-500">
                      No options added yet
                    </Text>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Warning for Experimental Category */}
          {formData.category === 'experimental' && (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-start">
              <ExclamationTriangleIcon className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
              <div>
                <Text className="font-medium text-amber-800">
                  Experimental Setting
                </Text>
                <Text className="text-sm text-amber-700">
                  This setting is marked as experimental and may change or be removed in future versions.
                  Use with caution in production environments.
                </Text>
              </div>
            </div>
          )}
          
          {/* Form Actions */}
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
            >
              {isNew ? 'Create Setting' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
} 