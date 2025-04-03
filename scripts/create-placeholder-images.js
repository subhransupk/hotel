const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const directories = [
  'public/images',
  'public/images/testimonials',
  'public/images/features',
  'public/images/team',
  'public/images/partners'
];

directories.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Create testimonial placeholder images
const testimonialImages = [
  { name: 'testimonial-1.jpg', color: '#3498db', text: 'Testimonial 1' },
  { name: 'testimonial-2.jpg', color: '#2ecc71', text: 'Testimonial 2' },
  { name: 'testimonial-3.jpg', color: '#e74c3c', text: 'Testimonial 3' }
];

testimonialImages.forEach(img => {
  const filePath = path.join(process.cwd(), 'public/images/testimonials', img.name);
  
  // Create SVG content
  const svgContent = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${img.color}" />
  <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">
    ${img.text}
  </text>
</svg>`;
  
  // Write SVG file
  fs.writeFileSync(filePath.replace('.jpg', '.svg'), svgContent);
  console.log(`Created placeholder image: ${img.name.replace('.jpg', '.svg')}`);
});

// Create hero background placeholder
const heroPath = path.join(process.cwd(), 'public/images', 'hero-background.svg');
const heroSvgContent = `<svg width="1200" height="600" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#34495e" />
  <text x="50%" y="50%" font-family="Arial" font-size="32" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">
    Hero Background
  </text>
</svg>`;

fs.writeFileSync(heroPath, heroSvgContent);
console.log('Created placeholder hero image: hero-background.svg');

console.log('All placeholder images created successfully!'); 