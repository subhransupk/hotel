'use client';

import { useState, useCallback } from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';
import { imagekitClient } from '@/lib/imagekit';

interface ImageKitUploaderProps {
    folder?: string;
    onUploadStart?: () => void;
    onUploadSuccess?: (url: string, fileId: string) => void;
    onUploadError?: (error: any) => void;
    allowedFileTypes?: string[];
    validateFile?: (file: File) => boolean;
}

export default function ImageKitUploader({
    folder = 'website-content',
    onUploadStart,
    onUploadSuccess,
    onUploadError,
    allowedFileTypes = ['image/jpeg', 'image/png', 'image/webp'],
    validateFile
}: ImageKitUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSuccess = useCallback((response: any) => {
        setIsUploading(false);
        setError(null);
        if (onUploadSuccess) {
            onUploadSuccess(response.url, response.fileId);
        }
    }, [onUploadSuccess]);

    const onError = useCallback((error: any) => {
        setIsUploading(false);
        setError(error.message);
        if (onUploadError) {
            onUploadError(error);
        }
    }, [onUploadError]);

    const onValidate = useCallback((file: File) => {
        // Check file type
        if (!allowedFileTypes.includes(file.type)) {
            setError('Invalid file type. Please upload an image file.');
            return false;
        }

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('File size too large. Maximum size is 5MB.');
            return false;
        }

        // Custom validation if provided
        if (validateFile && !validateFile(file)) {
            return false;
        }

        setError(null);
        return true;
    }, [allowedFileTypes, validateFile]);

    return (
        <div className="w-full">
            <IKContext 
                publicKey={imagekitClient.publicKey} 
                urlEndpoint={imagekitClient.urlEndpoint} 
                authenticator={imagekitClient.authenticator}
            >
                <IKUpload
                    fileName="image.jpg"
                    folder={folder}
                    validateFile={onValidate}
                    onUploadStart={() => {
                        setIsUploading(true);
                        setError(null);
                        if (onUploadStart) onUploadStart();
                    }}
                    onSuccess={onSuccess}
                    onError={onError}
                />
            </IKContext>
            
            {isUploading && (
                <div className="mt-2 text-sm text-gray-600">
                    Uploading...
                </div>
            )}
            
            {error && (
                <div className="mt-2 text-sm text-red-600">
                    {error}
                </div>
            )}
        </div>
    );
}