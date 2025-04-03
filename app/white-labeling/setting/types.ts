export type SettingCategory = 
  | 'security' 
  | 'performance' 
  | 'customization' 
  | 'integration' 
  | 'experimental';

export type SettingType = 
  | 'string' 
  | 'number' 
  | 'boolean' 
  | 'select';

export interface AdvancedSetting {
  id: string;
  key: string;
  name: string;
  description: string;
  value: string | number | boolean;
  defaultValue: string | number | boolean;
  type: SettingType;
  category: SettingCategory;
  isSecret?: boolean;
  options: string[];
  lastUpdated: string;
}

export interface SettingExport {
  version: string;
  timestamp: string;
  settings: AdvancedSetting[];
}

export interface SettingImport {
  version?: string;
  settings: AdvancedSetting[];
}

export interface AdvancedSettingFormData {
  key: string;
  name: string;
  description: string;
  value: string | number | boolean;
  defaultValue: string | number | boolean;
  type: SettingType;
  category: SettingCategory;
  isSecret: boolean;
  options: string[];
} 