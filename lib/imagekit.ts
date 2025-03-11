import ImageKit from "imagekit";

// Client-side configuration
export const imagekitClient = {
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '',
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