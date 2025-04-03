const fs = require('fs');
const path = require('path');

// Define the directories to create
const directories = [
  'public/images',
  'public/images/testimonials',
  'public/images/features',
  'public/images/team',
  'public/images/partners'
];

// Create the directories
directories.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(fullPath, { recursive: true });
  } else {
    console.log(`Directory already exists: ${dir}`);
  }
});

// Create placeholder images for testimonials
const testimonialImages = [
  'public/images/testimonials/testimonial-1.jpg',
  'public/images/testimonials/testimonial-2.jpg',
  'public/images/testimonials/testimonial-3.jpg'
];

// Simple 1x1 pixel JPEG base64 encoded
const placeholderImageData = '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKAP/2Q==';

testimonialImages.forEach(imagePath => {
  const fullPath = path.join(process.cwd(), imagePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`Creating placeholder image: ${imagePath}`);
    const imageBuffer = Buffer.from(placeholderImageData, 'base64');
    fs.writeFileSync(fullPath, imageBuffer);
  } else {
    console.log(`Image already exists: ${imagePath}`);
  }
});

// Create a placeholder hero background image
const heroBackgroundPath = path.join(process.cwd(), 'public/images/hero-background.jpg');
if (!fs.existsSync(heroBackgroundPath)) {
  console.log('Creating placeholder hero background image');
  const imageBuffer = Buffer.from(placeholderImageData, 'base64');
  fs.writeFileSync(heroBackgroundPath, imageBuffer);
} else {
  console.log('Hero background image already exists');
}

console.log('Image directories and placeholder images created successfully!'); 