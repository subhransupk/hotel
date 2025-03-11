import ImageKit from "imagekit";

// Client-side configuration
export const imagekitClient = {
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '',
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

// Server-side configuration
export const imagekitServer = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || ''
});

// Helper function for image URLs
export const getOptimizedImageUrl = (
    imageUrl: string | null, 
    transformation: Array<Object> = []
) => {
    if (!imageUrl) return '';
    
    // If it's already an ImageKit URL, return with transformations
    if (imageUrl.includes(process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '')) {
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