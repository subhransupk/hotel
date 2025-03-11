export interface Language {
  id: string;
  code: string;
  name: string;
  nativeName: string;
  isDefault: boolean;
  isActive: boolean;
  direction: 'ltr' | 'rtl';
  completionPercentage: number;
  lastUpdated: string;
}

export interface LanguageFormData {
  code: string;
  name: string;
  nativeName: string;
  isDefault: boolean;
  isActive: boolean;
  direction: 'ltr' | 'rtl';
}

export interface TranslationCategory {
  id: string;
  name: string;
  description: string;
  count: number;
  completionPercentage: number;
}

export interface Translation {
  id: string;
  key: string;
  defaultText: string;
  translatedText: string;
  context?: string;
  lastUpdated: string | null;
} 