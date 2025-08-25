import React from 'react';
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

const VideoSection = () => {
  // BAIC promotional video ID
  const videoId = "Q_9DAG8x0Jk";
  
  return (
    <SectionContainer>
      <ContentWrapper>
        <SectionTitle>Experience BAIC</SectionTitle>
        
        <VideoContainer>
          <VideoPlayer
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=0&rel=0&modestbranding=1&showinfo=0&loop=1&playlist=${videoId}`}
            title="BAIC Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          />
        </VideoContainer>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default VideoSection;
