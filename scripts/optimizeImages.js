const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Image optimization configuration
const config = {
  webp: {
    quality: 85,
    effort: 6
  },
  jpeg: {
    quality: 85,
    progressive: true
  },
  png: {
    quality: 85,
    compressionLevel: 9
  }
};

// Responsive breakpoints
const breakpoints = [
  { width: 1920, suffix: '' },
  { width: 1200, suffix: '-lg' },
  { width: 768, suffix: '-md' },
  { width: 480, suffix: '-sm' }
];

// Critical images that need optimization based on performance audit
const criticalImages = [
  'public/images/hero/web banners/WEBSITE LANDSCAPE88.jpg',
  'public/images/hero/web banners/WEBSITE LANDSCAPE82.jpg', 
  'public/images/promotions/WEBSITE LANDSCAPE (2).jpg',
  'public/images/promotions/WEBSITE LANDSCAPE (1).jpg',
  'public/images/homehero/WEBSITE LANDSCAPE3 (1) (1).png',
  'public/images/homehero/WEBSITE LANDSCAPE2 (1).jpg',
  'public/images/homehero/WEBSITE LANDSCAPE4 (1).jpg',
  'public/images/hero/COMPANY OVERVIEW (1).jpg',
  'public/images/owners/WEBSITE LANDSCAPE11.jpg'
];

async function ensureDirectory(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

async function optimizeImage(inputPath, outputDir, filename) {
  console.log(`Optimizing: ${inputPath}`);
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Create output directory
    await ensureDirectory(outputDir);
    
    // Generate responsive sizes
    for (const breakpoint of breakpoints) {
      if (breakpoint.width >= metadata.width && breakpoint.suffix !== '') continue;
      
      const baseFilename = path.parse(filename).name;
      const ext = path.parse(filename).ext;
      
      // Generate WebP version
      const webpFilename = `${baseFilename}${breakpoint.suffix}.webp`;
      await image
        .resize(breakpoint.width, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp(config.webp)
        .toFile(path.join(outputDir, webpFilename));
      
      // Generate optimized fallback
      const fallbackFilename = `${baseFilename}${breakpoint.suffix}${ext}`;
      if (ext.toLowerCase() === '.jpg' || ext.toLowerCase() === '.jpeg') {
        await image
          .resize(breakpoint.width, null, { 
            withoutEnlargement: true,
            fit: 'inside'
          })
          .jpeg(config.jpeg)
          .toFile(path.join(outputDir, fallbackFilename));
      } else if (ext.toLowerCase() === '.png') {
        await image
          .resize(breakpoint.width, null, { 
            withoutEnlargement: true,
            fit: 'inside'
          })
          .png(config.png)
          .toFile(path.join(outputDir, fallbackFilename));
      }
    }
    
    console.log(`✅ Optimized: ${filename}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
  }
}

async function optimizeImagesInDirectory(inputDir, outputDir) {
  try {
    const files = await fs.readdir(inputDir);
    
    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      const stat = await fs.stat(inputPath);
      
      if (stat.isDirectory()) {
        // Recursively process subdirectories
        const subOutputDir = path.join(outputDir, file);
        await optimizeImagesInDirectory(inputPath, subOutputDir);
      } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
        // Check file size to prioritize large images
        const fileSizeKB = stat.size / 1024;
        if (fileSizeKB > 50) { // Only optimize images larger than 50KB
          await optimizeImage(inputPath, outputDir, file);
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${inputDir}:`, error.message);
  }
}

async function optimizeCriticalImages() {
  console.log('🚀 Starting critical image optimization...');
  
  for (const imagePath of criticalImages) {
    if (await fs.access(imagePath).then(() => true).catch(() => false)) {
      const inputDir = path.dirname(imagePath);
      const filename = path.basename(imagePath);
      const outputDir = inputDir.replace('/images/', '/images/optimized/');
      
      await optimizeImage(imagePath, outputDir, filename);
    } else {
      console.log(`⚠️  Image not found: ${imagePath}`);
    }
  }
}

async function optimizeAllImages() {
  console.log('🖼️  Starting comprehensive image optimization...');
  
  const imageDirectories = [
    'public/images/hero',
    'public/images/homehero', 
    'public/images/promotions',
    'public/images/vehicles',
    'public/images/colors',
    'public/images/models',
    'public/images/owners'
  ];
  
  for (const dir of imageDirectories) {
    const outputDir = dir.replace('/images/', '/images/optimized/');
    await optimizeImagesInDirectory(dir, outputDir);
  }
}

async function main() {
  const mode = process.argv[2] || 'critical';
  
  console.log(`Starting image optimization in ${mode} mode...`);
  
  if (mode === 'critical') {
    await optimizeCriticalImages();
  } else if (mode === 'all') {
    await optimizeAllImages();
  }
  
  console.log('✨ Image optimization complete!');
}

if (require.main === module) {
  main().catch(console.error);
}
