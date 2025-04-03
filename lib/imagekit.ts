import ImageKit from "imagekit";

// Get environment variables
const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '';
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || '';
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '';

// Check if required environment variables are set
const hasRequiredEnvVars = publicKey && privateKey && urlEndpoint;

// Client-side configuration
export const imagekitClient = {
    publicKey,
    urlEndpoint,
    authenticator: async () => {
        try {
            const response = await fetch('/api/imagekit/auth');
            if (!response.ok) {
                throw new Error('Failed to get authentication');
            }
            return await response.json();
        } catch (error) {
            console.error('ImageKit authentication error:', error);
            return { signature: '', token: '', expire: 0 };
        }
    }
};

// Server-side configuration - only create if environment variables are available
export const imagekitServer = hasRequiredEnvVars 
    ? new ImageKit({
        publicKey,
        privateKey,
        urlEndpoint
      })
    : null;

// Helper function for image URLs
export const getOptimizedImageUrl = (
    imageUrl: string | null, 
    transformation: Array<Object> = []
) => {
    if (!imageUrl) return '';
    
    // If ImageKit is not configured or it's already an ImageKit URL, return as is
    if (!imagekitServer || imageUrl.includes(urlEndpoint)) {
        return imageUrl;
    }

    // Default transformations for optimization
    const defaultTransformation = [
        {
            quality: 90,
            format: 'auto'
        },
        ...transformation
    ];

    return imagekitServer.url({
        src: imageUrl,
        transformation: defaultTransformation
    });
};