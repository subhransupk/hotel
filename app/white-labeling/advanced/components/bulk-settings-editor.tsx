'use client'

import { useState } from 'react'
import { 
  Card, 
  Title, 
  Text, 
  Button, 
  Textarea,
  Flex,
  Badge,
} from '@tremor/react'
import { 
  CodeBracketIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import { AdvancedSetting } from '../types'

interface BulkSettingsEditorProps {
  settings: AdvancedSetting[];
  onSave: (settings: AdvancedSetting[]) => void;
  onCancel: () => void;
}

export function BulkSettingsEditor({ settings, onSave, onCancel }: BulkSettingsEditorProps) {
  // Convert settings to JSON string for editing
  const initialJson = JSON.stringify(
    settings.map(({ id, key, value, type }) => ({ id, key, value, type })), 
    null, 
    2
  );
  
  const [jsonValue, setJsonValue] = useState(initialJson);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const handleChange = (value: string) => {
    setJsonValue(value);
    
    try {
      JSON.parse(value);
      setIsValid(true);
      setError(null);
    } catch (err) {
      setIsValid(false);
      setError('Invalid JSON format');
    }
  };
  
  const handleSave = () => {
    if (!isValid) return;
    
    try {
      const parsedSettings = JSON.parse(jsonValue);
      
      // Validate the structure of the parsed settings
      if (!Array.isArray(parsedSettings)) {
        setError('Settings must be an array');
        return;
      }
      
      // Check if all required fields are present
      const invalidSettings = parsedSettings.filter(
        (setting: any) => !setting.id || !setting.key || setting.value === undefined
      );
      
      if (invalidSettings.length > 0) {
        setError('All settings must have id, key, and value fields');
        return;
      }
      
      // Check if all settings exist in the original settings
      const validIds = new Set(settings.map(s => s.id));
      const invalidIds = parsedSettings.filter(
        (setting: any) => !validIds.has(setting.id)
      );
      
      if (invalidIds.length > 0) {
        setError(`Invalid setting IDs: ${invalidIds.map((s: any) => s.id).join(', ')}`);
        return;
      }
      
      setIsSaving(true);
      
      // Merge the parsed settings with the original settings
      const updatedSettings = settings.map(originalSetting => {
        const updatedSetting = parsedSettings.find(
          (s: any) => s.id === originalSetting.id
        );
        
        if (updatedSetting) {
          return {
            ...originalSetting,
            value: updatedSetting.value,
            lastUpdated: new Date().toISOString(),
          };
        }
        
        return originalSetting;
      });
      
      // Simulate API call
      setTimeout(() => {
        onSave(updatedSettings);
        setIsSaving(false);
      }, 500);
    } catch (err) {
      setError('Failed to parse settings');
    }
  };
  
  return (
    <Card>
      <div className="mb-4">
        <Title>Bulk Edit Settings</Title>
        <Text className="mt-1">
          Edit multiple settings at once by modifying the JSON below. Only modify the "value" field for each setting.
        </Text>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 rounded-md">
          <Flex alignItems="center">
            <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
            <Text className="text-red-700">{error}</Text>
          </Flex>
        </div>
      )}
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <Text className="font-medium">JSON Editor</Text>
          <Badge color={isValid ? 'emerald' : 'red'}>
            {isValid ? 'Valid JSON' : 'Invalid JSON'}
          </Badge>
        </div>
        <div className="relative">
          <CodeBracketIcon className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
          <Textarea
            placeholder="Edit settings JSON..."
            value={jsonValue}
            onChange={(e) => handleChange(e.target.value)}
            rows={20}
            className="font-mono text-sm pl-10"
          />
        </div>
      </div>
      
      <div className="flex items-start p-3 bg-amber-50 rounded-md mb-4">
        <ExclamationTriangleIcon className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
        <Text className="text-sm text-amber-700">
          Warning: Bulk editing settings can have system-wide effects. Only modify settings you understand.
          Changes will take effect immediately after saving.
        </Text>
      </div>
      
      <div className="flex justify-end space-x-3">
        <Button
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={!isValid || isSaving}
          loading={isSaving}
          icon={CheckCircleIcon}
        >
          Save Changes
        </Button>
      </div>
    </Card>
  );
} 