const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting production build with performance optimizations...\n');

// Step 1: Clean previous builds
console.log('🧹 Cleaning previous builds...');
if (fs.existsSync('build')) {
  execSync('rm -rf build', { stdio: 'inherit' });
}

// Step 2: Build the application
console.log('📦 Building React application...');
try {
  execSync('npm run build', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Step 3: Add cache headers configuration for common hosting providers
console.log('⚡ Adding cache headers configuration...');

// Netlify _headers file
const netlifyHeaders = `
# Cache static assets for 1 year
/static/*
  Cache-Control: public, max-age=31536000, immutable

# Cache images for 1 month
/images/*
  Cache-Control: public, max-age=2592000

# Cache optimized images for 1 year
/images/*/optimized/*
  Cache-Control: public, max-age=31536000, immutable

# Cache fonts for 1 year
*.woff2
  Cache-Control: public, max-age=31536000, immutable

# Service Worker - no cache
/sw.js
  Cache-Control: public, max-age=0, must-revalidate

# HTML files - cache for 1 hour with revalidation
/*.html
  Cache-Control: public, max-age=3600, must-revalidate

# API endpoints - no cache
/api/*
  Cache-Control: no-cache, no-store, must-revalidate
`;

fs.writeFileSync('build/_headers', netlifyHeaders.trim());

// Apache .htaccess file
const htaccess = `
<IfModule mod_expires.c>
  ExpiresActive on

  # Images
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/jpg "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/gif "access plus 1 month"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 month"

  # Fonts
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"

  # CSS and JavaScript
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType application/x-javascript "access plus 1 year"

  # Service Worker
  ExpiresByType application/javascript "access plus 0 seconds"
  <Files "sw.js">
    ExpiresByType application/javascript "access plus 0 seconds"
  </Files>
</IfModule>

<IfModule mod_headers.c>
  # Security headers
  Header always set X-Content-Type-Options nosniff
  Header always set X-Frame-Options DENY
  Header always set X-XSS-Protection "1; mode=block"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"

  # Performance headers
  <FilesMatch "\\.(js|css|png|jpg|jpeg|gif|webp|woff|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  
  <FilesMatch "sw.js">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
  </FilesMatch>
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
`;

fs.writeFileSync('build/.htaccess', htaccess.trim());

// Step 4: Create performance report
console.log('📊 Creating performance report...');
const buildPath = path.join(__dirname, '..', 'build');
const stats = {
  totalFiles: 0,
  totalSize: 0,
  jsFiles: 0,
  jsSize: 0,
  cssFiles: 0,
  cssSize: 0,
  imageFiles: 0,
  imageSize: 0
};

function analyzeDirectory(dir, prefix = '') {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.')) {
      analyzeDirectory(filePath, prefix + file + '/');
    } else if (stat.isFile()) {
      stats.totalFiles++;
      stats.totalSize += stat.size;
      
      const ext = path.extname(file).toLowerCase();
      if (ext === '.js') {
        stats.jsFiles++;
        stats.jsSize += stat.size;
      } else if (ext === '.css') {
        stats.cssFiles++;
        stats.cssSize += stat.size;
      } else if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)) {
        stats.imageFiles++;
        stats.imageSize += stat.size;
      }
    }
  });
}

analyzeDirectory(buildPath);

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

console.log('\n📈 Build Performance Report:');
console.log('================================');
console.log(`Total Files: ${stats.totalFiles}`);
console.log(`Total Size: ${formatBytes(stats.totalSize)}`);
console.log(`JavaScript: ${stats.jsFiles} files, ${formatBytes(stats.jsSize)}`);
console.log(`CSS: ${stats.cssFiles} files, ${formatBytes(stats.cssSize)}`);
console.log(`Images: ${stats.imageFiles} files, ${formatBytes(stats.imageSize)}`);
console.log('================================\n');

// Step 5: Copy optimized images to build directory
console.log('🖼️  Copying optimized images to build directory...');
const copyOptimizedImages = (src, dest) => {
  if (!fs.existsSync(src)) return;
  
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const items = fs.readdirSync(src);
  
  items.forEach(item => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      copyOptimizedImages(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
};

// Copy optimized images
if (fs.existsSync('public/images/optimized')) {
  copyOptimizedImages('public/images/optimized', 'build/images/optimized');
}

console.log('✅ Production build completed successfully!');
console.log('\n🎯 Performance Optimizations Applied:');
console.log('• Image optimization (WebP + responsive)');
console.log('• Code splitting and lazy loading');
console.log('• Service worker caching');
console.log('• Third-party script optimization');
console.log('• Cache headers configuration');
console.log('• Bundle size optimization');
console.log('\n🚀 Ready for deployment!');
