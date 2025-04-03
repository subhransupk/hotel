export interface SmsTemplate {
  id: string;
  name: string;
  content: string;
  category: string;
  characterCount: number;
  lastUpdated: string;
  variables: string[];
  isActive: boolean;
}

export interface SmsTemplateFormData {
  name: string;
  content: string;
  category: string;
  variables: string;
  isActive: boolean;
} 