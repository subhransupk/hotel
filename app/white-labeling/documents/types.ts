export interface Document {
  id: string;
  name: string;
  description: string;
  category: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  lastUpdated: string;
  version: string;
  isActive: boolean;
  tags: string[];
}

export interface DocumentFormData {
  name: string;
  description: string;
  category: string;
  version: string;
  isActive: boolean;
  tags: string;
} 