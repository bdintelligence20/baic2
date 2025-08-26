import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

// Styled components for the image container
const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const BaseImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.$objectFit || 'cover'};
  transition: opacity 0.3s ease-in-out;
  opacity: ${props => props.$loaded ? 1 : 0};
`;

const BlurPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #f0f0f0 25%, #e0e0e0 25%, #e0e0e0 50%, #f0f0f0 50%);
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
  z-index: 1;
`;

const ResponsiveImage = ({
  src,
  alt,
  className,
  objectFit = 'cover',
  lazy = true,
  preload = false,
  priority = false,
  sizes = '100vw',
  quality = 80,
  onLoad,
  onError,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(!lazy || priority);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const [fallbackUsed, setFallbackUsed] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Generate optimized image paths with fallback
  const getOptimizedPath = (originalPath, size = '', format = '') => {
    if (!originalPath) return '';
    
    // If it's already an optimized path, return as is
    if (originalPath.includes('/optimized/')) {
      return originalPath;
    }
    
    // For now, return original path if optimization fails
    // This ensures images still load while optimization is being set up
    try {
      // Convert regular image path to optimized path
      const pathWithoutPublic = originalPath.replace(/^\/?(public\/)?/, '');
      const pathWithoutImages = pathWithoutPublic.replace(/^images\//, '');
      
      // Extract filename and extension
      const lastSlashIndex = pathWithoutImages.lastIndexOf('/');
      const directory = pathWithoutImages.substring(0, lastSlashIndex);
      const filename = pathWithoutImages.substring(lastSlashIndex + 1);
      const [name, ext] = filename.split('.');
      
      const sizePrefix = size ? `-${size}` : '';
      const newExt = format || ext;
      
      return `/images/optimized/${directory}/${name}${sizePrefix}.${newExt}`;
    } catch (e) {
      // Fallback to original path if processing fails
      return originalPath;
    }
  };

  // Fallback to original image path
  const getFallbackPath = (originalPath) => {
    if (!originalPath) return '';
    return originalPath.startsWith('/') ? originalPath : `/${originalPath}`;
  };

  // Generate srcSet for responsive images
  const generateSrcSet = (basePath, format = 'webp') => {
    const sizes = ['sm', 'md', 'lg'];
    const srcSet = sizes.map(size => {
      const path = getOptimizedPath(basePath, size, format);
      const width = size === 'sm' ? 640 : size === 'md' ? 1024 : 1920;
      return `${path} ${width}w`;
    }).join(', ');
    
    // Also include the base size
    const basePath_optimized = getOptimizedPath(basePath, '', format);
    return `${basePath_optimized} 1920w, ${srcSet}`;
  };

  // Check if WebP is supported
  const supportsWebP = () => {
    if (typeof window === 'undefined') return false;
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before the image enters viewport
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
      observerRef.current = observer;
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [lazy, priority]);

  // Determine the best image source to use
  useEffect(() => {
    if (!src || !inView) return;

    let isCancelled = false;

    const tryLoadImage = async () => {
      const imagesToTry = [
        // Try optimized WebP first if supported
        ...(supportsWebP() ? [getOptimizedPath(src, '', 'webp')] : []),
        // Try optimized JPG
        getOptimizedPath(src, '', 'jpg'),
        // Fallback to original image
        getFallbackPath(src)
      ];

      for (const imageSrc of imagesToTry) {
        if (isCancelled) return;
        
        try {
          await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = imageSrc;
          });
          
          // If we get here, the image loaded successfully
          if (!isCancelled) {
            setCurrentSrc(imageSrc);
            setFallbackUsed(imageSrc === getFallbackPath(src));
            return;
          }
        } catch (error) {
          // Image failed to load, try the next one
          continue;
        }
      }

      // If all images failed to load
      if (!isCancelled) {
        setError(true);
      }
    };

    tryLoadImage();

    return () => {
      isCancelled = true;
    };
  }, [src, inView]);

  // Handle image load
  const handleLoad = (e) => {
    setLoaded(true);
    setError(false);
    if (onLoad) onLoad(e);
  };

  // Handle image error - this shouldn't happen with our fallback logic
  const handleError = (e) => {
    setError(true);
    if (onError) onError(e);
  };

  // Preload critical images
  useEffect(() => {
    if (preload && src) {
      const img = new Image();
      const optimizedSrc = supportsWebP() ? getOptimizedPath(src, '', 'webp') : getOptimizedPath(src, '', 'jpg');
      img.src = optimizedSrc;
      // Also preload original as fallback
      img.onerror = () => {
        const fallbackImg = new Image();
        fallbackImg.src = getFallbackPath(src);
      };
    }
  }, [preload, src]);

  if (!inView && lazy && !priority) {
    return (
      <ImageContainer ref={imgRef} className={className} {...props}>
        <BlurPlaceholder $visible={true} />
      </ImageContainer>
    );
  }

  return (
    <ImageContainer ref={imgRef} className={className} {...props}>
      <BlurPlaceholder $visible={!loaded && !error} />
      
      {currentSrc && (
        <BaseImage
          src={currentSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          $loaded={loaded}
          $objectFit={objectFit}
          {...props}
        />
      )}
    </ImageContainer>
  );
};

export default ResponsiveImage;
