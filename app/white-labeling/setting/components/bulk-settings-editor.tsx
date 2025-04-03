'use client'

import { useState } from 'react'
import { 
  Card, 
  Title, 
  Text, 
  Button, 
  Divider, 
  TextInput, 
  Textarea,
  Badge,
} from '@tremor/react'
import { 
  ArrowPathIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  DocumentDuplicateIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline'
import { AdvancedSetting } from '../types'

interface BulkSettingsEditorProps {
  settings: AdvancedSetting[];
  onSave: (settings: AdvancedSetting[]) => void;
  onCancel: () => void;
}

export function BulkSettingsEditor({ settings, onSave, onCancel }: BulkSettingsEditorProps) {
  const [jsonValue, setJsonValue] = useState<string>(() => {
    return JSON.stringify(settings, null, 2);
  });
  
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isFormatted, setIsFormatted] = useState(false);
  
  // Validate JSON
  const validateJson = (json: string): boolean => {
    try {
      const parsed = JSON.parse(json);
      
      if (!Array.isArray(parsed)) {
        setErrorMessage('The JSON must be an array of settings.');
        return false;
      }
      
      // Check if each item has the required fields
      for (const item of parsed) {
        if (!item.id || !item.key || !item.name || item.value === undefined) {
          setErrorMessage('Each setting must have id, key, name, and value fields.');
          return false;
        }
      }
      
      setErrorMessage('');
      return true;
    } catch (error) {
      setErrorMessage(`Invalid JSON: ${(error as Error).message}`);
      return false;
    }
  };
  
  // Handle JSON change
  const handleJsonChange = (value: string) => {
    setJsonValue(value);
    setIsValid(validateJson(value));
    setIsFormatted(false);
  };
  
  // Format JSON
  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonValue);
      setJsonValue(JSON.stringify(parsed, null, 2));
      setIsValid(true);
      setErrorMessage('');
      setIsFormatted(true);
      
      // Reset the formatted status after a delay
      setTimeout(() => {
        setIsFormatted(false);
      }, 2000);
    } catch (error) {
      setErrorMessage(`Invalid JSON: ${(error as Error).message}`);
      setIsValid(false);
    }
  };
  
  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(jsonValue);
    setIsCopied(true);
    
    // Reset the copied status after a delay
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  
  // Reset to original
  const handleReset = () => {
    setJsonValue(JSON.stringify(settings, null, 2));
    setIsValid(true);
    setErrorMessage('');
  };
  
  // Save changes
  const handleSave = () => {
    if (validateJson(jsonValue)) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        const updatedSettings = JSON.parse(jsonValue) as AdvancedSetting[];
        onSave(updatedSettings);
        setIsSubmitting(false);
      }, 1000);
    }
  };
  
  return (
    <Card className="max-w-4xl mx-auto">
      <div className="space-y-6">
        <div>
          <Title>Bulk Edit Settings</Title>
          <Text className="text-gray-500">
            Edit multiple settings at once by modifying the JSON representation.
          </Text>
        </div>
        
        <Divider />
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="jsonEditor" className="block text-sm font-medium text-gray-700">
              Settings JSON
            </label>
            <div className="flex space-x-2">
              <Button
                size="xs"
                variant="light"
                icon={DocumentDuplicateIcon}
                onClick={handleCopy}
                color={isCopied ? 'green' : 'gray'}
              >
                {isCopied ? 'Copied!' : 'Copy'}
              </Button>
              <Button
                size="xs"
                variant="light"
                icon={DocumentCheckIcon}
                onClick={handleFormat}
                color={isFormatted ? 'green' : 'gray'}
              >
                {isFormatted ? 'Formatted!' : 'Format'}
              </Button>
              <Button
                size="xs"
                variant="light"
                icon={ArrowPathIcon}
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </div>
          
          <Textarea
            id="jsonEditor"
            placeholder="Paste JSON here..."
            value={jsonValue}
            onChange={(e) => handleJsonChange(e.target.value)}
            rows={20}
            className="font-mono text-sm"
          />
          
          {!isValid && (
            <div className="mt-2 text-red-500 text-sm flex items-start">
              <ExclamationTriangleIcon className="h-5 w-5 mr-1 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
          
          {isValid && (
            <div className="mt-2 text-green-500 text-sm flex items-start">
              <CheckCircleIcon className="h-5 w-5 mr-1 flex-shrink-0" />
              <span>JSON is valid</span>
            </div>
          )}
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
          <div className="flex">
            <ExclamationTriangleIcon className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
            <div>
              <Text className="font-medium text-amber-800">
                Caution: Bulk Editing
              </Text>
              <Text className="text-sm text-amber-700">
                Bulk editing allows you to modify multiple settings at once. Be careful when making changes as this will override all settings with the provided values. Make sure your JSON is valid before saving.
              </Text>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!isValid}
            loading={isSubmitting}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Card>
  );
} 