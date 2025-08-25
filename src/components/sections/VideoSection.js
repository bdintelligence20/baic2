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

const VideoFacade = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.thumbnail});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    &::before {
      opacity: 0.8;
    }
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
    opacity: 0.5;
  }
`;

const PlayButton = styled.div`
  position: relative;
  z-index: 2;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
  }
  
  &::after {
    content: '';
    width: 0;
    height: 0;
    border-left: 20px solid #e60012;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    margin-left: 4px;
  }
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    
    &::after {
      border-left: 15px solid #e60012;
      border-top: 9px solid transparent;
      border-bottom: 9px solid transparent;
      margin-left: 3px;
    }
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #e60012;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const VideoSection = () => {
  // BAIC promotional video ID
  const videoId = "Q_9DAG8x0Jk";
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);
  
  // Generate YouTube thumbnail URL
  const getThumbnailUrl = (videoId) => {
    // Use maxresdefault for highest quality, fallback to hqdefault
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePlayVideo = () => {
    if (isPlaying) return;
    
    setIsLoading(true);
    
    // Analytics tracking
    if (window.gtag) {
      window.gtag('event', 'video_play', {
        event_category: 'Video',
        event_label: 'BAIC Experience Video',
        video_id: videoId
      });
    }
    
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'video_play',
        video_title: 'BAIC Experience Video',
        video_id: videoId
      });
    }
    
    // Small delay to show loading state
    setTimeout(() => {
      setIsLoading(false);
      setIsPlaying(true);
    }, 500);
  };
  
  return (
    <SectionContainer>
      <ContentWrapper>
        <SectionTitle>Experience BAIC</SectionTitle>
        
        <VideoContainer ref={containerRef}>
          {!isPlaying && inView && (
            <VideoFacade 
              thumbnail={getThumbnailUrl(videoId)}
              onClick={handlePlayVideo}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePlayVideo();
                }
              }}
              aria-label="Play BAIC Experience Video"
            >
              <PlayButton />
            </VideoFacade>
          )}
          
          {isLoading && (
            <LoadingOverlay>
              <LoadingSpinner />
            </LoadingOverlay>
          )}
          
          {isPlaying && (
            <VideoPlayer
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1&showinfo=0`}
              title="BAIC Experience Video"
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
