import { useState } from 'react';

export type FileValidationOptions = {
  maxSize?: number; // in bytes
  allowedTypes?: string[];
};

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Default validation options
  const defaultValidationOptions: FileValidationOptions = {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
  };

  // Function to validate a file
  const validateFile = (file: File, options: FileValidationOptions = defaultValidationOptions): { valid: boolean; error?: string } => {
    // Validate file type
    if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
      return { 
        valid: false, 
        error: `Invalid file type. Allowed types: ${options.allowedTypes.map(type => type.replace('image/', '')).join(', ')}` 
      };
    }
    
    // Validate file size
    if (options.maxSize && file.size > options.maxSize) {
      const maxSizeMB = Math.round(options.maxSize / (1024 * 1024));
      return { 
        valid: false, 
        error: `File too large. Maximum size: ${maxSizeMB}MB` 
      };
    }
    
    return { valid: true };
  };

  // Function to handle file upload
  const uploadFile = async (
    file: File, 
    options: FileValidationOptions = defaultValidationOptions,
    onSuccess?: (url: string) => void,
    onError?: (error: string) => void
  ): Promise<{ success: boolean; url?: string; error?: string }> => {
    setIsUploading(true);
    setError(null);
    
    try {
      // Validate the file
      const validation = validateFile(file, options);
      if (!validation.valid) {
        setError(validation.error || 'Invalid file');
        setIsUploading(false);
        
        if (onError) {
          onError(validation.error || 'Invalid file');
        }
        
        return { success: false, error: validation.error };
      }
      
      // In a real implementation, you would upload the file to a server here
      // For now, we'll create a local URL for the selected file
      const url = URL.createObjectURL(file);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsUploading(false);
      
      if (onSuccess) {
        onSuccess(url);
      }
      
      return { success: true, url };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload file';
      setError(errorMessage);
      setIsUploading(false);
      
      if (onError) {
        onError(errorMessage);
      }
      
      return { success: false, error: errorMessage };
    }
  };

  // Function to create a file input and trigger it
  const triggerFileUpload = (
    options: FileValidationOptions = defaultValidationOptions,
    onSuccess?: (url: string) => void,
    onError?: (error: string) => void
  ): void => {
    // Create a file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = options.allowedTypes?.join(',') || 'image/*';
    
    // Handle file selection
    fileInput.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      
      if (!file) {
        const errorMessage = 'No file selected';
        setError(errorMessage);
        
        if (onError) {
          onError(errorMessage);
        }
        
        return;
      }
      
      await uploadFile(file, options, onSuccess, onError);
    };
    
    // Trigger the file input
    fileInput.click();
  };

  // Function to clean up a blob URL
  const cleanupBlobUrl = (url: string): void => {
    if (url && url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  };

  return {
    isUploading,
    error,
    validateFile,
    uploadFile,
    triggerFileUpload,
    cleanupBlobUrl,
    setError
  };
}; 