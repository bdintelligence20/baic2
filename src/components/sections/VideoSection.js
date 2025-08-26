import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const SectionContainer = styled.section`
  padding: 6rem 0;
  background-color: #f8f8f8;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 3rem;
  color: #222;
  font-weight: 700;
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: #e60012;
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  background-color: #000;
`;

const VideoPlayer = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const VideoPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$thumbnail});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
  
  &:hover::before {
    opacity: 0.8;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    transition: opacity 0.3s ease;
  }
`;

const PlayButton = styled.div`
  position: relative;
  z-index: 2;
  width: 80px;
  height: 80px;
  background: rgba(230, 0, 18, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(230, 0, 18, 1);
    transform: scale(1.1);
  }
  
  &::after {
    content: '';
    width: 0;
    height: 0;
    border-left: 24px solid white;
    border-top: 14px solid transparent;
    border-bottom: 14px solid transparent;
    margin-left: 4px;
  }
`;

const LoadingSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #e60012;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  z-index: 3;
  
  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

const VideoSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  
  // BAIC promotional video ID
  const videoId = "Q_9DAG8x0Jk";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  
  // Set up intersection observer for preloading thumbnail
  useEffect(() => {
    if (containerRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Preload thumbnail image when video comes into view
            const img = new Image();
            img.src = thumbnailUrl;
            
            // Disconnect observer after preloading
            if (observerRef.current) {
              observerRef.current.disconnect();
            }
          }
        },
        {
          rootMargin: '100px',
          threshold: 0.1
        }
      );

      observerRef.current.observe(containerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [thumbnailUrl]);
  
  const handlePlayClick = () => {
    setIsLoading(true);
    
    // Small delay to show loading state
    setTimeout(() => {
      setIsLoaded(true);
      setIsLoading(false);
      
      // Track video play event
      if (window.gtag) {
        window.gtag('event', 'video_play', {
          event_category: 'Video',
          event_label: 'BAIC Experience Video',
          video_id: videoId
        });
      }
      
      // Send to GTM dataLayer
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'video_play',
          video_title: 'BAIC Experience Video',
          video_id: videoId
        });
      }
    }, 500);
  };
  
  return (
    <SectionContainer>
      <ContentWrapper>
        <SectionTitle>Experience BAIC</SectionTitle>
        
        <VideoContainer ref={containerRef}>
          {!isLoaded && !isLoading && (
            <VideoPlaceholder $thumbnail={thumbnailUrl} onClick={handlePlayClick}>
              <PlayButton />
            </VideoPlaceholder>
          )}
          
          {isLoading && <LoadingSpinner />}
          
          {isLoaded && (
            <VideoPlayer
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1&showinfo=0`}
              title="BAIC Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            />
          )}
        </VideoContainer>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default VideoSection;
