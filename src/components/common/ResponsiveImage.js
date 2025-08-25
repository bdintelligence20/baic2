import React, { useState, useRef, useEffect, memo } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
  overflow: hidden;
  transition: opacity 0.3s ease;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
  transition: opacity 0.3s ease;
  opacity: ${props => props.loaded ? 1 : 0};
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.loaded ? 0 : 1};
  transition: opacity 0.3s ease;
  pointer-events: none;
  
  &::before {
    content: '';
    width: 40px;
    height: 40px;
    border: 3px solid #ddd;
    border-top-color: #999;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// Generate srcSet for different breakpoints
const generateSrcSet = (basePath, filename, ext, format = null) => {
  const baseFilename = filename.replace(/\.[^/.]+$/, ""); // Remove extension
  const actualExt = format || ext;
  const breakpoints = [
    { width: 480, suffix: '-sm' },
    { width: 768, suffix: '-md' },
    { width: 1200, suffix: '-lg' },
    { width: 1920, suffix: '' }
  ];
  
  return breakpoints
    .map(bp => `${basePath}optimized/${baseFilename}${bp.suffix}.${actualExt} ${bp.width}w`)
    .join(', ');
};

// Generate sizes attribute based on usage context
const generateSizes = (sizes) => {
  if (typeof sizes === 'string') return sizes;
  
  // Default responsive sizes
  return '(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px';
};

const ResponsiveImage = ({
  src,
  alt,
  className,
  sizes,
  priority = false,
  lazy = true,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(!lazy || priority);
  const imgRef = useRef(null);
  
  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || inView) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => observer.disconnect();
  }, [lazy, priority, inView]);
  
  // Parse image path
  const pathParts = src.split('/');
  const filename = pathParts.pop();
  const basePath = pathParts.join('/') + '/';
  const ext = filename.split('.').pop().toLowerCase();
  
  const handleLoad = () => {
    setLoaded(true);
  };
  
  const handleError = (e) => {
    console.warn('Image failed to load:', src);
    // Fallback to original image
    e.target.src = src;
    setLoaded(true);
  };
  
  // Don't render anything until in view (for lazy loading)
  if (!inView) {
    return <ImageContainer ref={imgRef} className={className} {...props} />;
  }
  
  // Check if optimized images exist (assume they do after optimization)
  const webpSrcSet = generateSrcSet(basePath, filename, ext, 'webp');
  const fallbackSrcSet = generateSrcSet(basePath, filename, ext);
  const sizesAttr = generateSizes(sizes);
  
  return (
    <ImageContainer ref={imgRef} className={className}>
      <picture>
        {/* Modern WebP format */}
        <source
          srcSet={webpSrcSet}
          sizes={sizesAttr}
          type="image/webp"
        />
        {/* Fallback format */}
        <source
          srcSet={fallbackSrcSet}
          sizes={sizesAttr}
          type={`image/${ext === 'jpg' ? 'jpeg' : ext}`}
        />
        {/* Final fallback */}
        <Image
          src={src}
          alt={alt}
          loaded={loaded}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          {...props}
        />
      </picture>
      {!loaded && <Placeholder loaded={loaded} />}
    </ImageContainer>
  );
};

export default memo(ResponsiveImage);
