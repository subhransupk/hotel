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
  value: any;
  defaultValue: any;
  type: SettingType;
  category: SettingCategory;
  isSecret?: boolean;
  options?: { label: string; value: string }[];
  lastUpdated: string;
}

export interface SettingExport {
  settings: AdvancedSetting[];
  exportedAt: string;
  version: string;
}

export interface SettingImport {
  settings: AdvancedSetting[];
  importedAt: string;
  source?: string;
}

export interface AdvancedSettingFormData {
  key: string;
  name: string;
  description: string;
  value: any;
  defaultValue: any;
  type: SettingType;
  category: SettingCategory;
  isSecret?: boolean;
  options?: { label: string; value: string }[];
} 