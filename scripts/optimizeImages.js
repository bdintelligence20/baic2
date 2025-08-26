const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  inputDir: path.join(__dirname, '../public/images'),
  outputDir: path.join(__dirname, '../public/images/optimized'),
  sizes: {
    sm: 640,
    md: 1024,
    lg: 1920
  },
  quality: {
    webp: 85,
    jpeg: 90,
    png: 90
  },
  formats: ['webp', 'original'],
  excludePatterns: [
    /optimized/, // Don't re-optimize already optimized images
    /\.svg$/, // Skip SVG files
    /logos.*\.png$/, // Skip logo files that need to stay as PNG
    /favicon/ // Skip favicon files
  ]
};

// Utility functions
function shouldSkipFile(filePath) {
  return config.excludePatterns.some(pattern => pattern.test(filePath));
}

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function getRelativePath(fullPath, basePath) {
  return path.relative(basePath, fullPath);
}

function getOutputPath(inputPath, outputDir, inputDir) {
  const relativePath = getRelativePath(inputPath, inputDir);
  return path.join(outputDir, relativePath);
}

async function optimizeImage(inputPath, outputPath, size = null, format = null) {
  try {
    const parsedPath = path.parse(outputPath);
    const sizeModifier = size ? `-${size}` : '';
    
    let pipeline = sharp(inputPath);
    
    // Resize if size is specified
    if (size && config.sizes[size]) {
      pipeline = pipeline.resize(config.sizes[size], null, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    // Determine output format and quality
    let outputFormat = format;
    let quality = config.quality.jpeg;
    
    if (format === 'webp') {
      pipeline = pipeline.webp({ quality: config.quality.webp });
      outputFormat = 'webp';
    } else {
      // Keep original format
      const originalExt = parsedPath.ext.toLowerCase();
      if (originalExt === '.png') {
        pipeline = pipeline.png({ quality: config.quality.png, compressionLevel: 9 });
        outputFormat = 'png';
      } else {
        pipeline = pipeline.jpeg({ quality: config.quality.jpeg, progressive: true });
        outputFormat = 'jpg';
      }
    }
    
    // Generate output filename
    const extension = format === 'webp' ? '.webp' : parsedPath.ext;
    const outputFilename = `${parsedPath.name}${sizeModifier}${extension}`;
    const finalOutputPath = path.join(parsedPath.dir, outputFilename);
    
    // Ensure output directory exists
    ensureDirectoryExists(path.dirname(finalOutputPath));
    
    // Save the optimized image
    await pipeline.toFile(finalOutputPath);
    
    // Get file sizes for reporting
    const originalStats = fs.statSync(inputPath);
    const optimizedStats = fs.statSync(finalOutputPath);
    const savings = ((originalStats.size - optimizedStats.size) / originalStats.size * 100).toFixed(1);
    
    return {
      input: inputPath,
      output: finalOutputPath,
      originalSize: originalStats.size,
      optimizedSize: optimizedStats.size,
      savings: `${savings}%`
    };
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
    return null;
  }
}

async function processDirectory(inputDir, outputDir) {
  const results = [];
  
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext) && !shouldSkipFile(fullPath)) {
          const outputPath = getOutputPath(fullPath, outputDir, inputDir);
          
          // Generate base optimized image
          results.push(optimizeImage(fullPath, outputPath, null, 'original'));
          results.push(optimizeImage(fullPath, outputPath, null, 'webp'));
          
          // Generate responsive sizes
          for (const [sizeName] of Object.entries(config.sizes)) {
            results.push(optimizeImage(fullPath, outputPath, sizeName, 'original'));
            results.push(optimizeImage(fullPath, outputPath, sizeName, 'webp'));
          }
        }
      }
    }
  }
  
  scanDirectory(inputDir);
  return Promise.all(results);
}

async function generateReport(results) {
  const successful = results.filter(r => r !== null);
  const failed = results.length - successful.length;
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  successful.forEach(result => {
    totalOriginalSize += result.originalSize;
    totalOptimizedSize += result.optimizedSize;
  });
  
  const totalSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
  
  console.log('\n=== IMAGE OPTIMIZATION REPORT ===');
  console.log(`✅ Successfully optimized: ${successful.length} images`);
  console.log(`❌ Failed: ${failed} images`);
  console.log(`📦 Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`🗜️  Total optimized size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`💾 Total savings: ${totalSavings}%`);
  console.log(`🚀 Space saved: ${((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(2)} MB`);
  
  // Generate detailed report file
  const reportPath = path.join(__dirname, '../OPTIMIZATION_REPORT.md');
  let reportContent = `# Image Optimization Report\n\n`;
  reportContent += `**Generated:** ${new Date().toISOString()}\n\n`;
  reportContent += `## Summary\n`;
  reportContent += `- Successfully optimized: ${successful.length} images\n`;
  reportContent += `- Failed: ${failed} images\n`;
  reportContent += `- Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB\n`;
  reportContent += `- Total optimized size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB\n`;
  reportContent += `- Total savings: ${totalSavings}%\n`;
  reportContent += `- Space saved: ${((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(2)} MB\n\n`;
  
  reportContent += `## Configuration\n`;
  reportContent += `- Sizes: ${Object.entries(config.sizes).map(([name, width]) => `${name}(${width}px)`).join(', ')}\n`;
  reportContent += `- Formats: ${config.formats.join(', ')}\n`;
  reportContent += `- WebP Quality: ${config.quality.webp}%\n`;
  reportContent += `- JPEG Quality: ${config.quality.jpeg}%\n`;
  reportContent += `- PNG Quality: ${config.quality.png}%\n\n`;
  
  reportContent += `## Detailed Results\n\n`;
  successful.forEach((result, index) => {
    if (index < 50) { // Limit to first 50 results to keep report manageable
      reportContent += `### ${path.basename(result.input)}\n`;
      reportContent += `- **Original:** ${(result.originalSize / 1024).toFixed(1)} KB\n`;
      reportContent += `- **Optimized:** ${(result.optimizedSize / 1024).toFixed(1)} KB\n`;
      reportContent += `- **Savings:** ${result.savings}\n\n`;
    }
  });
  
  fs.writeFileSync(reportPath, reportContent);
  console.log(`📄 Detailed report saved to: ${reportPath}`);
}

async function main() {
  console.log('🚀 Starting image optimization...');
  console.log(`📁 Input directory: ${config.inputDir}`);
  console.log(`📁 Output directory: ${config.outputDir}`);
  
  try {
    // Ensure output directory exists
    ensureDirectoryExists(config.outputDir);
    
    // Process all images
    const results = await processDirectory(config.inputDir, config.outputDir);
    
    // Generate report
    await generateReport(results);
    
    console.log('\n✨ Image optimization completed successfully!');
  } catch (error) {
    console.error('❌ Image optimization failed:', error);
    process.exit(1);
  }
}

// Run the optimization if this script is executed directly
if (require.main === module) {
  main();
}

module.exports = { optimizeImage, processDirectory, config };
