export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  category: string;
  content: string;
  previewImage: string;
  lastUpdated: string;
  variables: string[];
  isActive: boolean;
}

export interface EmailTemplateFormData {
  name: string;
  subject: string;
  category: string;
  content: string;
  variables: string;
  isActive: boolean;
} 