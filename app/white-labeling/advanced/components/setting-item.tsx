'use client'

import { useState } from 'react'
import { 
  Card, 
  Text, 
  TextInput, 
  NumberInput,
  Switch,
  Button,
  Select,
  SelectItem,
  Badge,
  Flex,
} from '@tremor/react'
import { 
  InformationCircleIcon, 
  ExclamationTriangleIcon,
  KeyIcon,
  ArrowPathIcon,
  LockClosedIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { AdvancedSetting, AdvancedSettingFormData } from '../types'

interface SettingItemProps {
  setting: AdvancedSetting;
  onSave: (value: any) => void;
  onReset: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function SettingItem({ setting, onSave, onReset, onEdit, onDelete }: SettingItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<any>(setting.value);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleQuickEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setValue(setting.value);
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave(value);
      setIsEditing(false);
      setIsSaving(false);
    }, 500);
  };

  const handleReset = () => {
    onReset();
    setValue(setting.defaultValue);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    
    // Simulate API call
    setTimeout(() => {
      onDelete();
      setIsDeleting(false);
    }, 500);
  };

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  const renderInputField = () => {
    if (setting.isSecret && !isEditing) {
      return (
        <div className="flex items-center">
          <div className="bg-gray-100 px-3 py-2 rounded-md flex-1">
            <Text className="text-gray-500">••••••••••••••••</Text>
          </div>
        </div>
      );
    }

    switch (setting.type) {
      case 'boolean':
        return (
          <Switch
            id={`setting-${setting.id}`}
            checked={value as boolean}
            onChange={handleChange}
            disabled={!isEditing}
          />
        );
      case 'number':
        return (
          <NumberInput
            placeholder="Enter value"
            value={value as number}
            onValueChange={handleChange}
            disabled={!isEditing}
            min={0}
            className="max-w-xs"
          />
        );
      case 'select':
        return (
          <Select
            value={value as string}
            onValueChange={handleChange}
            disabled={!isEditing}
            className="max-w-xs"
          >
            {setting.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        );
      case 'string':
      default:
        return (
          <TextInput
            placeholder="Enter value"
            value={value as string}
            onChange={(e) => handleChange(e.target.value)}
            disabled={!isEditing}
            type={setting.isSecret && isEditing ? 'password' : 'text'}
            className="max-w-xs"
          />
        );
    }
  };

  const getCategoryColor = (category: string): "slate" | "gray" | "zinc" | "neutral" | "stone" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose" => {
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

  const isModified = setting.value !== setting.defaultValue;

  return (
    <div className="py-4">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Text className="font-medium">{setting.name}</Text>
            <Badge color={getCategoryColor(setting.category)} size="xs">
              {setting.category}
            </Badge>
            {setting.isSecret && (
              <Badge color="gray" size="xs" icon={LockClosedIcon}>
                Secret
              </Badge>
            )}
          </div>
          
          <Text className="text-sm text-gray-600 mb-2">{setting.description}</Text>
          
          <div className="flex items-center text-xs text-gray-500 mb-4">
            <KeyIcon className="h-3 w-3 mr-1" />
            <code>{setting.key}</code>
          </div>
          
          {isModified && !isEditing && (
            <div className="flex items-start mt-2 mb-4 p-2 bg-blue-50 rounded-md">
              <InformationCircleIcon className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <Text className="text-xs text-blue-700">
                This setting has been modified from its default value.
              </Text>
            </div>
          )}
        </div>
        
        <div className="flex flex-col space-y-4">
          <div className="w-full md:w-64">
            {renderInputField()}
          </div>
          
          <div className="flex justify-end space-x-2">
            {isEditing ? (
              <>
                <Button
                  variant="secondary"
                  color="gray"
                  onClick={handleCancel}
                  size="xs"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  loading={isSaving}
                  disabled={isSaving}
                  size="xs"
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                {isModified && (
                  <Button
                    variant="light"
                    color="gray"
                    onClick={handleReset}
                    size="xs"
                    icon={ArrowPathIcon}
                  >
                    Reset
                  </Button>
                )}
                <Button
                  variant="light"
                  color="blue"
                  onClick={handleQuickEdit}
                  size="xs"
                  icon={PencilIcon}
                >
                  Quick Edit
                </Button>
                <Button
                  variant="light"
                  color="blue"
                  onClick={onEdit}
                  size="xs"
                  icon={PencilIcon}
                >
                  Advanced
                </Button>
                <Button
                  variant="light"
                  color="red"
                  onClick={handleDelete}
                  size="xs"
                  icon={TrashIcon}
                  loading={isDeleting}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 