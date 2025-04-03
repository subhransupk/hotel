'use client'

import { useState } from 'react'
import { 
  Text, 
  Badge, 
  Button, 
  TextInput, 
  NumberInput, 
  Select, 
  SelectItem, 
  Switch,
} from '@tremor/react'
import { 
  PencilIcon, 
  TrashIcon, 
  ArrowPathIcon, 
  CheckIcon, 
  XMarkIcon, 
  EyeIcon, 
  EyeSlashIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import { AdvancedSetting } from '../types'

interface SettingItemProps {
  setting: AdvancedSetting;
  onSave: (value: any) => void;
  onReset: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function SettingItem({ setting, onSave, onReset, onEdit, onDelete }: SettingItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editValue, setEditValue] = useState<any>(setting.value);
  const [showSecret, setShowSecret] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  
  // Check if value is modified from default
  const isModified = setting.value !== setting.defaultValue;
  
  // Format the last updated date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  // Handle quick edit
  const handleQuickEdit = () => {
    setEditValue(setting.value);
    setIsEditing(true);
  };
  
  // Handle cancel
  const handleCancel = () => {
    setIsEditing(false);
    setIsDeleting(false);
  };
  
  // Handle save
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave(editValue);
      setIsEditing(false);
      setIsSaving(false);
    }, 500);
  };
  
  // Handle reset
  const handleReset = () => {
    setIsResetting(true);
    
    // Simulate API call
    setTimeout(() => {
      onReset();
      setIsResetting(false);
    }, 500);
  };
  
  // Handle delete
  const handleDelete = () => {
    setIsDeleting(true);
    
    // Simulate API call
    setTimeout(() => {
      onDelete();
    }, 500);
  };
  
  // Handle change for different input types
  const handleChange = (value: any) => {
    setEditValue(value);
  };
  
  // Get category color
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
  
  return (
    <div className="py-2">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Text className="font-medium">{setting.name}</Text>
            <Badge color={getCategoryColor(setting.category)} size="xs">
              {setting.category}
            </Badge>
            {isModified && (
              <Badge color="blue" size="xs">
                Modified
              </Badge>
            )}
            {setting.isSecret && (
              <Badge color="red" size="xs">
                Secret
              </Badge>
            )}
          </div>
          
          <Text className="text-sm text-gray-500 mb-2">
            {setting.description}
          </Text>
          
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Key: <code className="bg-gray-100 px-1 py-0.5 rounded">{setting.key}</code></span>
            <span>•</span>
            <span>Last updated: {formatDate(setting.lastUpdated)}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:items-end gap-2">
          {!isEditing && !isDeleting ? (
            <div className="flex flex-wrap gap-2">
              <Button
                size="xs"
                variant="light"
                icon={PencilIcon}
                onClick={handleQuickEdit}
              >
                Quick Edit
              </Button>
              <Button
                size="xs"
                variant="light"
                color="blue"
                onClick={onEdit}
              >
                Advanced
              </Button>
              {isModified && (
                <Button
                  size="xs"
                  variant="light"
                  icon={ArrowPathIcon}
                  onClick={handleReset}
                  loading={isResetting}
                  color="amber"
                >
                  Reset
                </Button>
              )}
              <Button
                size="xs"
                variant="light"
                icon={TrashIcon}
                onClick={() => setIsDeleting(true)}
                color="red"
              >
                Delete
              </Button>
            </div>
          ) : isDeleting ? (
            <div className="flex items-center gap-2 bg-red-50 p-2 rounded-md">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
              <Text className="text-sm text-red-700">Delete this setting?</Text>
              <div className="flex gap-1">
                <Button
                  size="xs"
                  variant="light"
                  color="red"
                  onClick={handleDelete}
                >
                  Yes
                </Button>
                <Button
                  size="xs"
                  variant="light"
                  onClick={handleCancel}
                >
                  No
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-full sm:w-auto">
                {setting.type === 'string' && (
                  <div className="relative">
                    {setting.isSecret ? (
                      <>
                        <TextInput
                          value={editValue as string}
                          onChange={(e) => handleChange(e.target.value)}
                          type={showSecret ? 'text' : 'password'}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowSecret(!showSecret)}
                        >
                          {showSecret ? (
                            <EyeSlashIcon className="h-4 w-4 text-gray-400" />
                          ) : (
                            <EyeIcon className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </>
                    ) : (
                      <TextInput
                        value={editValue as string}
                        onChange={(e) => handleChange(e.target.value)}
                      />
                    )}
                  </div>
                )}
                
                {setting.type === 'number' && (
                  <NumberInput
                    value={editValue as number}
                    onValueChange={handleChange}
                  />
                )}
                
                {setting.type === 'boolean' && (
                  <Switch
                    checked={editValue as boolean}
                    onChange={() => handleChange(!editValue)}
                  />
                )}
                
                {setting.type === 'select' && (
                  <Select
                    value={editValue as string}
                    onValueChange={handleChange}
                  >
                    {setting.options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              </div>
              
              <Button
                size="xs"
                variant="light"
                color="green"
                icon={CheckIcon}
                onClick={handleSave}
                loading={isSaving}
              >
                Save
              </Button>
              
              <Button
                size="xs"
                variant="light"
                color="red"
                icon={XMarkIcon}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          )}
          
          <div className="flex items-center gap-1">
            <Text className="text-xs text-gray-500">
              Current value:
            </Text>
            <Badge color="gray" size="xs">
              {setting.isSecret && !showSecret
                ? '••••••••'
                : setting.type === 'boolean'
                  ? setting.value ? 'True' : 'False'
                  : String(setting.value)}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
} 